import { formatEventInfo } from '@/helpers/rest_helpers';
import type { APIEventInfo } from '@/types/EventInfo';
import { add, format } from 'date-fns';
import axiosInstance from './axiosConfig';

export const fetchEvents = async () => {
  const apiData = await axiosInstance.get<APIEventInfo[]>('/events');
  return formatEventInfo(apiData.data);
};

export const createNewEvent = async (minutes: number) => {
  const startTime = new Date();
  const endTime = add(startTime, { minutes: minutes });

  const finalStart = format(startTime, "yyyy-MM-dd'T'HH:mm:ss");
  const finalEnd = format(endTime, "yyyy-MM-dd'T'HH:mm:ss");

  const newMeetingBody = {
    subject: 'Room Meeting',
    body: {
      contentType: 'HTML'
    },
    start: {
      dateTime: finalStart,
      timeZone: 'FLE Standard Time'
    },
    end: {
      dateTime: finalEnd,
      timeZone: 'FLE Standard Time'
    },
    organizer: {
      emailAddress: {
        name: `${import.meta.env.VITE_EVENT_ORGANIZER}`
      }
    }
  };

  await axiosInstance.post('/events', newMeetingBody);
};
