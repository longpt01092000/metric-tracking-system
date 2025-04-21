import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Metric, MetricDocument } from './schema/metric.schema';
import { CreateMetricDto } from './dto/create-metric.dto';
import { QueryMetricChartDto, QueryMetricDto } from './dto/query-metric.dto';
import { MetricModel } from './model';
import { MetricPeriod } from '@enums/metric-period.enum';
import { PlainToInstance } from '@helpers/response.helpers';

@Injectable()
export class MetricService {
  constructor(
    @InjectModel(Metric.name) private metricModel: Model<MetricDocument>,
  ) {}

  async create(createMetricDto: CreateMetricDto): Promise<MetricModel> {
    const savedMetric = await this.metricModel.create(createMetricDto);
    return PlainToInstance(MetricModel, savedMetric);
  }

  async findAll(query: QueryMetricDto): Promise<MetricModel[]> {
    const metrics = await this.metricModel
      .find({ userId: query.userId, ...(query.type && { type: query.type }) })
      .exec();

    if (query.unit) {
      const mapped = metrics.map((metric) => {
        const metricObject = metric.toObject();
        const unit = query.unit ?? metricObject.unit;
        const value =
          metricObject.unit === unit
            ? metricObject.value
            : (metricObject.convertedValues?.[unit] ?? null);

        return { ...metricObject, value, unit };
      });
      console.log(mapped);

      return PlainToInstance(MetricModel, mapped);
    }
    return PlainToInstance(MetricModel, metrics);
  }

  async findForChart(query: QueryMetricChartDto): Promise<MetricModel[]> {
    let periodInDays: number;

    switch (query.period) {
      case MetricPeriod.TWO_MONTHS:
        periodInDays = 60;
        break;
      case MetricPeriod.ONE_MONTH:
      default:
        periodInDays = 30;
        break;
    }

    const since = new Date();
    since.setDate(since.getDate() - periodInDays);

    const result = await this.metricModel.aggregate([
      {
        $match: {
          userId: query.userId,
          type: query.type,
          date: { $gte: since, $lte: new Date() },
        },
      },
      {
        $sort: { date: -1 },
      },
      {
        $group: {
          _id: {
            day: { $dayOfMonth: '$date' },
            month: { $month: '$date' },
            year: { $year: '$date' },
          },
          latest: { $first: '$$ROOT' },
        },
      },
      {
        $replaceRoot: { newRoot: '$latest' },
      },
      {
        $sort: { date: 1 },
      },
    ]);

    if (query.unit) {
      const mapped = result.map((metric) => {
        const unit = query.unit ?? metric.unit;
        const value =
          metric.unit === unit
            ? metric.value
            : (metric.convertedValues?.[unit] ?? null);

        return { ...metric, value, unit };
      });
      console.log(mapped);

      return PlainToInstance(MetricModel, mapped);
    }

    return PlainToInstance(MetricModel, result);
  }
}
