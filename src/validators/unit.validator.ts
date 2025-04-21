import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
} from 'class-validator';
import { allowedUnits } from '@constants/metric-units';

export function IsUnitMatchingType(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isUnitMatchingType',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(unit: string, args: ValidationArguments) {
          const obj = args.object as any;
          const type = obj.type as string;

          if (!type || !allowedUnits[type]) return false;

          return allowedUnits[type].includes(unit);
        },
        defaultMessage(args: ValidationArguments) {
          const obj = args.object as any;
          const type = obj.type as string;
          const validUnits = allowedUnits[type]?.join(', ') || 'unknown';
          return `Unit must be one of: ${validUnits} for type "${type}"`;
        },
      },
    });
  };
}

export function IsUnitAllowedOnlyIfTypeExists(
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isUnitAllowedOnlyIfTypeExists',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(unit: any, args: ValidationArguments) {
          const obj = args.object as any;
          if (unit && !obj.type) {
            return false;
          }
          return true;
        },
        defaultMessage(): string {
          return 'Unit is only allowed when type is specified.';
        },
      },
    });
  };
}
