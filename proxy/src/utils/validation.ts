import { Request } from 'express';
import { body, validationResult } from 'express-validator';
import { BadRequestError } from '../constants/errors';
import error from '../i18n/errorMessages';

export const addNotEmptyStringValidatorFor = (fields: string[]) => {
  return fields
    .map((f) => [body(f).notEmpty().withMessage(error.empty), body(f).isString().withMessage(error.non_string)])
    .flat();
};

export const validateRequest = (req: Request) => {
  const errors = validationResult(req).array();
  if (errors.length != 0) {
    const errorMessage = errors
      .map((e) => {
        if (e.type === 'field') {
          return `[<${e.path}> ${e.msg}]`;
        }
      })
      .join(', ');

    throw new BadRequestError(errorMessage);
  }
};
