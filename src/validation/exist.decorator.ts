import { IsUniqeInterface } from './is-unique';
import { registerDecorator, ValidationOptions } from 'class-validator';
import { ExistConstraint } from './exist';

// decorator function
export function Exist(
  options: IsUniqeInterface,
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'Exist',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [options],
      validator: ExistConstraint,
    });
  };
}
