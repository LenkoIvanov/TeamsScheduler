import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../constants/errors';
import createLogger from '../constants/logger';

const logger = createLogger('ErrorHandlingMiddleware');

export default (err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error(err);

  if (err instanceof CustomError) {
    res.status(err.statusCode).json({ errors: err.message });
  } else {
    res.status(500).json({ errors: [{ message: 'Internal server error' }] });
  }

  next();
};
