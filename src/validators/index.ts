import { CustomHelpers } from 'joi';
import { Types } from 'mongoose';

const validateId = (value: string, helper: CustomHelpers<string>) => {
  if (!Types.ObjectId.isValid(value)) {
    return helper.error('any.invalid');
  }
  return value;
};

export default validateId;
