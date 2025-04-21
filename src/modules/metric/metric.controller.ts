import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { MetricService } from './metric.service';
import { CreateMetricDto } from './dto/create-metric.dto';
import { QueryMetricChartDto, QueryMetricDto } from './dto/query-metric.dto';
import { MetricModel } from './model/index';

@ApiTags('Metrics')
@Controller('metrics')
export class MetricController {
  constructor(private readonly metricService: MetricService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new Metric' })
  @ApiResponse({
    status: 201,
    description: 'The Metric has been successfully created.',
    type: MetricModel,
  })
  async create(@Body() createMetricDto: CreateMetricDto) {
    return await this.metricService.create(createMetricDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all Metrics' })
  @ApiQuery({
    name: 'type',
    required: false,
    description: 'Filter by metric type (distance or temperature)',
  })
  @ApiResponse({
    status: 200,
    description: 'Return all Metrics of the specified type.',
    type: [MetricModel],
  })
  async getMetrics(@Query() query: QueryMetricDto) {
    return await this.metricService.findAll(query);
  }

  @Get('chart')
  @ApiOperation({ summary: 'Get Metric chart data' })
  @ApiQuery({
    name: 'type',
    required: false,
    description: 'Filter by metric type for chart',
    enum: ['distance', 'temperature'],
  })
  @ApiQuery({
    name: 'period',
    required: false,
    description: 'Time period for the chart (e.g., 1 month, 2 months)',
    type: String,
  })
  @ApiResponse({
    status: 200,
    description: 'Return data for the chart.',
    type: [MetricModel],
  })
  async getChartData(@Query() query: QueryMetricChartDto) {
    return await this.metricService.findForChart(query);
  }
}
