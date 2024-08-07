import axios, { AxiosResponse } from 'axios';
import { format } from 'date-fns';
import {
  fetchCreateRoomEventURL,
  fetchGetRoomEventsURL
} from '../constants/msalConfig';
import { MSGraphEvent, MSGraphEventArrayShema, MicrosoftMeetingModel } from '../models/MeetingDataModel';
import { ExternalDependencyError, BadRequestError } from '../constants/errors';
import createLogger from '../constants/logger';

const logger = createLogger('MsalService');

const createHeaders = (accessToken: string) => {
  return {
    Authorization: `Bearer ${accessToken}`,
    Prefer: 'outlook.timezone="FLE Standard Time"'
  };
};

const getDailyRoomEvents = async (page = 0, size = 10, accessToken: string) => {
  const top = size;
  const skip = page * size;
  logger.info(`Request to GET ALL daily events, top=${top}, skip=${skip}`);

  const headers = createHeaders(accessToken);

  const paramsForFetchAllEvents = `calendarView?
  skip=${skip}&top=${top}
  &startDateTime=${format(new Date(), 'yyyy-MM-dd')}T00:00:00.0000000
  &endDateTime=${format(new Date(), 'yyyy-MM-dd')}T23:59:00.0000000`;

  const roomUrl = fetchGetRoomEventsURL();
  const finalUrl = roomUrl + paramsForFetchAllEvents;

  try {
    const response = await axios.get<{ value: MSGraphEvent[] }>(finalUrl, { headers });
    return MSGraphEventArrayShema.parse(response.data.value);
  } catch (error) {
    logger.error('An error has occured while fetching room events: ', error);
    throw new BadRequestError('Could not fetch room events');
  }
};

const createRoomEvent = async (body: MicrosoftMeetingModel, accessToken: string) => {
  logger.info(`Request to POST event: ${JSON.stringify(body)}`);

  const headers = createHeaders(accessToken);
  const roomEventsUrl = fetchCreateRoomEventURL();

  let response: AxiosResponse;
  try {
    response = await axios.post(roomEventsUrl, body, { headers });
    return response.data;
  } catch (error) {
    logger.error('An error has occured while fetching room events: ', error);
    throw new ExternalDependencyError('Could not create new room event');
  }
};

export default {
  getDailyRoomEvents,
  createRoomEvent,
};
