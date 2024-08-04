import { MSGraphEvent, MicrosoftMeetingModel } from '../models/MeetingDataModel';
import createLogger from '../constants/logger';
import msalService from './msalService';

const logger = createLogger('EventsService');

const getDailyRoomEvents = async (
  page = 0,
  size = 10,
  accessToken: string,
  roomName: string
): Promise<MicrosoftMeetingModel[]> => {
  logger.info(`Request to GET ALL daily events for ${roomName}, page=${page}, size=${size}`);

  const fetchedEvents = await msalService.getDailyRoomEvents(page, size, accessToken, roomName);
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

const postQuarterHourEvent = async (body: MicrosoftMeetingModel, accessToken: string, roomName: string) => {
  logger.info(`Request to POST quarter hour event for ${roomName}: ${JSON.stringify(body)}`);
  const msalResponse = await msalService.createRoomEvent(body, accessToken, roomName);
  return msalResponse;
};

type RoomsResponse = Partial<{ [x in (typeof roomsNames)[number]]: MicrosoftMeetingModel[] }>;
const roomsNames = ['schlupfloch', 'nimmerland', 'endlosschleife', 'untergrund', 'bottleneck'] as const;

const getAllRooms = async (page = 0, size = 10, accessToken: string): Promise<RoomsResponse> => {
  return getAllRoomsExcludingOne(page, size, accessToken, '');
};

const getAllRoomsExcludingOne = async (
  page = 0,
  size = 10,
  accessToken: string,
  roomToExclude: string
): Promise<RoomsResponse> => {
  const activeRooms = roomsNames.filter((room) => room !== roomToExclude);
  const roomsEvents: RoomsResponse = {};

  const promises = activeRooms.map((roomName) => msalService.getDailyRoomEvents(page, size, accessToken, roomName));
  const results = await Promise.allSettled(promises);

  results.forEach((res, idx) => {
    if (res.status === 'fulfilled') {
      roomsEvents[activeRooms[idx]] = res.value.map((event) => ({
        id: event.id,
        subject: event.subject,
        startTime: event.start.dateTime,
        endTime: event.end.dateTime,
        organizer: event.organizer.emailAddress.name
      }));
    } else {
      logger.error(`Error in : ${roomsNames[idx]}, ${res.reason}`);
    }
  });
  return roomsEvents;
};

const deleteRoomEvent = async (accessToken: string, roomName: string, meetingId: string): Promise<boolean> => {
  const isPossibleToDelete = await validateIfEventCanBeDeleted(accessToken, roomName, meetingId);
  if (isPossibleToDelete) {
    const responce = await msalService.deleteRoomEvent(accessToken, roomName, meetingId);
    return responce === 204 ? true : false;
  }
  return false;
};

async function validateIfEventCanBeDeleted(accessToken: string, roomName: string, meetingId: string) {
  const fetchedEvent = await msalService.getOneRoomEvent(accessToken, roomName, meetingId);
  const fetchedEventCreatedTime = new Date(fetchedEvent.createdDateTime);
  const allowedEventDeletionTime = fetchedEventCreatedTime.setMinutes(fetchedEventCreatedTime.getMinutes() + 2);
  const currentTime = new Date().getTime();
  return allowedEventDeletionTime >= currentTime;
}

export default {
  postQuarterHourEvent,
  getDailyRoomEvents,
  getAllRooms,
  getAllRoomsExcludingOne,
  deleteRoomEvent
};
