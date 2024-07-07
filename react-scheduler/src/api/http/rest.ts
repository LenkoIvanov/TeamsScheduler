import { add, format } from "date-fns";
import { formatEventInfo } from "../../helpers/rest_helpers";
import { APIEventInfo } from "../../types/EventInfo"
import axiosInstance from "../configs/axiosConfig"

export const fetchEvents = async () => {
  const apiData = await axiosInstance.get<APIEventInfo[]>(`/events?roomName=${import.meta.env.VITE_ROOM_NAME}`);
  return formatEventInfo(apiData.data);
}

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

  await axiosInstance.post(`/events?roomName=${import.meta.env.VITE_ROOM_NAME}`, newMeetingBody);
}