import { MetricType } from '../enums/metric-type.enum';

export const allowedUnits = {
  [MetricType.DISTANCE]: ['m', 'cm', 'in', 'ft', 'yd'],
  [MetricType.TEMPERATURE]: ['C', 'F', 'K'],
};
