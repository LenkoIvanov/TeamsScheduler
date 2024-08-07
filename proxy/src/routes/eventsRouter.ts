import { Router } from 'express';
import { query } from 'express-validator';
import eventsController from '../controllers/eventsController';
import { addNotEmptyStringValidatorFor } from '../utils/validation';
import error from '../i18n/errorMessages';

const router = Router();

router.get(
  '/',
  query('msalAccessToken').isJWT().withMessage(error.non_jwt),
  query('page').optional().isNumeric().withMessage(error.non_numeric),
  query('size').optional().isNumeric().withMessage(error.non_numeric),
  eventsController.getTodaysEvents
);

router.post(
  '/',
  query('msalAccessToken').isJWT().withMessage(error.non_jwt),
  addNotEmptyStringValidatorFor([
    'subject',
    'body.contentType',
    'start.dateTime',
    'start.timeZone',
    'end.dateTime',
    'end.timeZone',
    'organizer.emailAddress.name'
  ]),
  eventsController.postRoomEvent
);

export default router;
