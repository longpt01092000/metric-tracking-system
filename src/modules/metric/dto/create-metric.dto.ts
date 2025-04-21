import { MetricType } from '@enums/metric-type.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsUnitMatchingType } from '@validators/unit.validator';
import {
  IsString,
  IsNumber,
  IsDateString,
  IsEnum,
  IsNotEmpty,
} from 'class-validator';

export class CreateMetricDto {
  @ApiProperty({ example: 'user_123', description: 'ID of the user' })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    example: 'distance',
    enum: MetricType,
    description: 'Type of the metric',
  })
  @IsNotEmpty()
  @IsEnum(MetricType)
  type: MetricType;

  @ApiProperty({ example: 100, description: 'Value of the metric' })
  @IsNumber()
  @IsNotEmpty()
  value: number;

  @ApiProperty({
    example: 'meter',
    description: 'Unit of the metric (depends on type)',
  })
  @IsString()
  @IsNotEmpty()
  @IsUnitMatchingType()
  unit: string;

  @ApiProperty({
    example: '2025-04-21T10:00:00.000Z',
    description: 'Date of the metric (ISO string)',
  })
  @IsNotEmpty()
  @IsDateString()
  date: string;
}
