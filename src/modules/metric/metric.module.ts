import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MetricController } from './metric.controller';
import { MetricService } from './metric.service';
import { Metric, MetricSchema } from '../metric/schema/metric.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Metric.name, schema: MetricSchema }]),
  ],
  controllers: [MetricController],
  providers: [MetricService],
})
export class MetricModule {}
