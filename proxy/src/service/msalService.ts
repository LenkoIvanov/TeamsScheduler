import axios, { AxiosResponse } from 'axios';
import { format } from 'date-fns';
import {
  fetchCreateRoomEventURL,
  fetchDeleteRoomEventsURL,
  fetchGetOneRoomEventURL,
  fetchGetRoomEventsURL
} from '../constants/msalConfig';
import { MSGraphEvent, MSGraphEventArrayShema, MSGraphEventShema, MicrosoftMeetingModel } from '../models/MeetingDataModel';
import { ExternalDependencyError, BadRequestError } from '../constants/errors';
import createLogger from '../constants/logger';

const logger = createLogger('MsalService');

const createHeaders = (accessToken: string) => {
  return {
    Authorization: `Bearer ${accessToken}`,
    Prefer: 'outlook.timezone="FLE Standard Time"'
  };
};

const getDailyRoomEvents = async (page = 0, size = 10, accessToken: string, roomName: string) => {
  const top = size;
  const skip = page * size;
  logger.info(`Request to GET ALL daily events, top=${top}, skip=${skip}`);

  const headers = createHeaders(accessToken);

  const paramsForFetchAllEvents = `calendarView?
  skip=${skip}&top=${top}
  &startDateTime=${format(new Date(), 'yyyy-MM-dd')}T00:00:00.0000000
  &endDateTime=${format(new Date(), 'yyyy-MM-dd')}T23:59:00.0000000`;

  const roomUrl = fetchGetRoomEventsURL(roomName);
  const finalUrl = roomUrl + paramsForFetchAllEvents;

  try {
    const response = await axios.get<{ value: MSGraphEvent[] }>(finalUrl, { headers });
    return MSGraphEventArrayShema.parse(response.data.value);
  } catch (error) {
    logger.error('An error has occured while fetching room events: ', error);
    throw new BadRequestError('Could not fetch room events');
  }
};

const createRoomEvent = async (body: MicrosoftMeetingModel, accessToken: string, roomName: string) => {
  logger.info(`Request to POST event: ${JSON.stringify(body)}`);

  const headers = createHeaders(accessToken);
  const roomEventsUrl = fetchCreateRoomEventURL(roomName);

  let response: AxiosResponse;
  try {
    response = await axios.post(roomEventsUrl, body, { headers });
    return response.data;
  } catch (error) {
    logger.error('An error has occured while fetching room events: ', error);
    throw new ExternalDependencyError('Could not create new room event');
  }
};

const deleteRoomEvent = async (accessToken: string, roomName: string, meetingId: string) => {
  logger.info(`Request to DELETE event: ${meetingId}`);

  const headers = createHeaders(accessToken);
  const roomEventsUrl = fetchDeleteRoomEventsURL(roomName, meetingId);

  try {
    const response = await axios.delete(roomEventsUrl, { headers });
    return response.status;
  } catch (error) {
    logger.error('An error has occured while deleting room event: ', error);
    throw new ExternalDependencyError('Could not delete room event');
  }
};

const getOneRoomEvent = async (accessToken: string, roomName: string, meetingId: string) => {
  logger.info(`Request to GET ONE daily event for room ${roomName}}`);

  const headers = createHeaders(accessToken);
  const roomUrl = fetchGetOneRoomEventURL(roomName, meetingId);

  try {
    const response = await axios.get<MSGraphEvent>(roomUrl, { headers });
    return MSGraphEventShema.parse(response.data);
  } catch (error) {
    logger.error('An error has occured while fetching room events: ', error);
    throw new BadRequestError('Could not fetch room events');
  }
};

export default {
  getDailyRoomEvents,
  createRoomEvent,
  deleteRoomEvent,
  getOneRoomEvent
};
