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
  query('roomName').exists().isString().withMessage(error.empty),
  eventsController.getTodaysEvents
);

router.get(
  '/all',
  query('msalAccessToken').isJWT().withMessage(error.non_jwt),
  query('page').optional().isNumeric().withMessage(error.non_numeric),
  query('size').optional().isNumeric().withMessage(error.non_numeric),
  eventsController.getAllRooms
);
router.get(
  '/all-exclude',
  query('msalAccessToken').isJWT().withMessage(error.non_jwt),
  query('page').optional().isNumeric().withMessage(error.non_numeric),
  query('size').optional().isNumeric().withMessage(error.non_numeric),
  query('roomToExclude').exists().isString().withMessage(error.empty),
  eventsController.getAllRoomsExcludingOne
);

router.post(
  '/',
  query('msalAccessToken').isJWT().withMessage(error.non_jwt),
  query('roomName').exists().isString().withMessage(error.empty),
  addNotEmptyStringValidatorFor([
    'subject',
    'body.contentType',
    'start.dateTime',
    'start.timeZone',
    'end.dateTime',
    'end.timeZone',
    'organizer.emailAddress.name'
  ]),
  eventsController.postQuarterHourEvent
);

router.delete(
  '/delete',
  query('msalAccessToken').isJWT().withMessage(error.non_jwt),
  query('roomName').exists().isString().withMessage(error.empty),
  query('meetingId').exists().isString().withMessage(error.empty),
  eventsController.deleteRoomEvent
);

export default router;
