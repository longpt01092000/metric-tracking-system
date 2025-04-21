import { MetricPeriod } from '@enums/metric-period.enum';
import { MetricType } from '@enums/metric-type.enum';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsUnitAllowedOnlyIfTypeExists,
  IsUnitMatchingType,
} from '@validators/unit.validator';
import { IsOptional, IsString, IsEnum, IsNotEmpty } from 'class-validator';

export class QueryMetricDto {
  @ApiProperty({ example: 'user_123', description: 'ID of the user' })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    example: 'temperature',
    enum: MetricType,
    description: 'Optional filter by metric type',
    required: false,
  })
  @IsOptional()
  @IsEnum(MetricType)
  type?: MetricType;

  @ApiProperty({
    example: 'meter',
    description: 'Unit of the metric (depends on type)',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsUnitAllowedOnlyIfTypeExists()
  @IsUnitMatchingType()
  unit?: string;
}

export class QueryMetricChartDto {
  @ApiProperty({ example: 'user_123', description: 'ID of the user' })
  @IsString()
  @IsNotEmpty()
  userId: string;

  @ApiProperty({
    example: 'temperature',
    enum: MetricType,
    description: 'Optional filter by metric type',
    required: false,
  })
  @IsOptional()
  @IsEnum(MetricType)
  type?: MetricType;

  @ApiProperty({
    example: 'meter',
    description: 'Unit of the metric (depends on type)',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsUnitAllowedOnlyIfTypeExists()
  @IsUnitMatchingType()
  unit?: string;

  @ApiProperty({
    example: '1m',
    description: 'Optional time period for chart query',
    required: false,
  })
  @IsNotEmpty()
  @IsEnum(MetricPeriod)
  period: MetricPeriod;
}
