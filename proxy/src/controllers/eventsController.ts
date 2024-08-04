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

    const { msalAccessToken, page, size, roomName } = matchedData(req);

    const meetingData = await eventsService.getDailyRoomEvents(page, size, msalAccessToken, roomName);

    res.status(200).json(meetingData);
  } catch (err) {
    next(err);
  }
};

const postQuarterHourEvent = async (req: Request, res: Response, next: NextFunction) => {
  logger.info('Request to POST event');
  try {
    validateRequest(req);

    const { msalAccessToken, roomName } = matchedData(req);

    const msalResponse = await eventsService.postQuarterHourEvent(req.body, msalAccessToken, roomName);

    res.status(201).json(msalResponse);
  } catch (err) {
    next(err);
  }
};

const getAllRooms = async (req: Request, res: Response, next: NextFunction) => {
  logger.info('Request to GET ALL room schedules');
  try {
    validateRequest(req);
    const { msalAccessToken, page, size } = matchedData(req);
    const meetingData = await eventsService.getAllRooms(page, size, msalAccessToken);

    res.status(200).json(meetingData);
  } catch (e) {
    next(e);
  }
};

const getAllRoomsExcludingOne = async (req: Request, res: Response, next: NextFunction) => {
  logger.info('Request to GET ALL room schedules excluding one');
  try {
    validateRequest(req);
    const { msalAccessToken, page, size, roomToExclude } = matchedData(req);
    const meetingData = await eventsService.getAllRoomsExcludingOne(page, size, msalAccessToken, roomToExclude);

    res.status(200).json(meetingData);
  } catch (e) {
    next(e);
  }
};

const deleteRoomEvent = async (req: Request, res: Response, next: NextFunction) => {
  logger.info('Request to delete a room event');
  try {
    validateRequest(req);
    const { msalAccessToken, roomName, meetingId } = matchedData(req);
    const responce = await eventsService.deleteRoomEvent(msalAccessToken, roomName, meetingId);
    res.status(200).json(responce);
  } catch (e) {
    next(e);
  }
};

export default {
  getTodaysEvents,
  postQuarterHourEvent,
  getAllRooms,
  getAllRoomsExcludingOne,
  deleteRoomEvent
};
