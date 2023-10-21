import { SetMetadata } from '@nestjs/common';
import { IsUniqeInterface, IsUniqueConstraint } from './is-unique';
import { registerDecorator, ValidationOptions } from 'class-validator';

// decorator function
export function isUnique(
  options: IsUniqeInterface,
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isUnique',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [options],
      validator: IsUniqueConstraint,
    });
  };
}
