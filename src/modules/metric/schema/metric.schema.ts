import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as convert from 'convert-units';

import { MetricType } from '@enums/metric-type.enum';
import { allowedUnits } from '@constants/metric-units';
import { BadRequestException } from '@nestjs/common';

export type MetricDocument = Metric & Document;

@Schema()
export class Metric {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true, enum: MetricType })
  type: MetricType;

  @Prop({ required: true })
  value: number;

  @Prop({ required: true })
  unit: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ type: Object, required: false })
  convertedValues: Record<string, number>;
}
export const MetricSchema = SchemaFactory.createForClass(Metric);

MetricSchema.pre('save', function (next) {
  if (allowedUnits[this.type]) {
    const converted = {};

    const units = allowedUnits[this.type];

    if (units.includes(this.unit)) {
      units.forEach((unit) => {
        converted[unit] = convert(this.value).from(this.unit).to(unit);
      });

      this.convertedValues = converted;
    } else {
      throw new BadRequestException(
        `Invalid unit for type ${this.type}: ${this.unit}`,
      );
    }
  }

  next();
});
