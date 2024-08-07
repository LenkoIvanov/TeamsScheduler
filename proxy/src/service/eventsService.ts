import { MSGraphEvent, MicrosoftMeetingModel } from '../models/MeetingDataModel';
import createLogger from '../constants/logger';
import msalService from './msalService';

const logger = createLogger('EventsService');

const getDailyRoomEvents = async (
  page = 0,
  size = 10,
  accessToken: string,
): Promise<MicrosoftMeetingModel[]> => {
  logger.info(`Request to GET ALL daily events with page=${page}, size=${size}`);

  const fetchedEvents = await msalService.getDailyRoomEvents(page, size, accessToken);
  const meetingData: MicrosoftMeetingModel[] = [];

  fetchedEvents.forEach((meeting: MSGraphEvent) => {
    meetingData.push({
      id: meeting.id,
      subject: meeting.subject,
      startTime: meeting.start.dateTime,
      endTime: meeting.end.dateTime,
      organizer: meeting.organizer.emailAddress.name
    });
  });

  return meetingData;
};

const postRoomEvent = async (body: MicrosoftMeetingModel, accessToken: string) => {
  logger.info(`Request to POST quarter hour with ${JSON.stringify(body)}`);
  const msalResponse = await msalService.createRoomEvent(body, accessToken);
  return msalResponse;
};

export default {
  postRoomEvent,
  getDailyRoomEvents,
};
