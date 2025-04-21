import { MetricType } from '@enums/metric-type.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class MetricModel {
  @ApiProperty({
    description: 'The identifier of the metric.',
    type: String,
  })
  @Expose()
  _id: string;

  @ApiProperty({
    description: 'The value of the metric.',
    type: Number,
  })
  @Expose()
  value: number;

  @ApiProperty({
    description: 'The unit of the metric.',
    type: String,
  })
  @Expose()
  unit: string;

  @ApiProperty({
    description: 'The date when the metric was recorded.',
    type: String,
    format: 'date-time',
  })
  @Expose()
  date: Date;

  @ApiProperty({
    description: 'The type of metric (distance or temperature).',
    enum: MetricType,
    type: String,
  })
  @Expose()
  type: string;

  @ApiProperty({
    description: 'The userId of metric.',
    type: String,
  })
  @Expose()
  userId: string;
}
