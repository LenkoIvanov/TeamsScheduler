import { Request, Response, NextFunction } from 'express';
import { matchedData } from 'express-validator';
import eventsService from '../service/eventsService';
import { validateRequest } from '../utils/validation';
import createLogger from '../constants/logger';

const logger = createLogger('EventController');

const getTodaysEvents = async (req: Request, res: Response, next: NextFunction) => {
  logger.info('Request to GET ALL daily events');
  try {
    validateRequest(req);

    const { msalAccessToken, page, size } = matchedData(req);

    const meetingData = await eventsService.getDailyRoomEvents(page, size, msalAccessToken);

    res.status(200).json(meetingData);
  } catch (err) {
    next(err);
  }
};

const postRoomEvent = async (req: Request, res: Response, next: NextFunction) => {
  logger.info('Request to POST event');
  try {
    validateRequest(req);

    const { msalAccessToken } = matchedData(req);

    const msalResponse = await eventsService.postRoomEvent(req.body, msalAccessToken);

    res.status(201).json(msalResponse);
  } catch (err) {
    next(err);
  }
};





export default {
  getTodaysEvents,
  postRoomEvent,
};
