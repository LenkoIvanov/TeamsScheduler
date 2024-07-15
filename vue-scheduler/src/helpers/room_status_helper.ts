import type { EventInfo } from '@/types/EventInfo';
import { differenceInMinutes, format, isAfter, isWithinInterval } from 'date-fns';

/* TODO: Check validity of functions */

export const handleTimeUntilFree = (
  currentEvent: EventInfo,
  currentMoment: Date
): {
  minutesUntilFree: number;
  totalMeetingTime: number;
} => {
  const minutesUntilFree = 1 + differenceInMinutes(currentEvent.endTime, currentMoment);
  const totalMeetingTime = differenceInMinutes(currentEvent.endTime, currentEvent.startTime);

  return {
    minutesUntilFree,
    totalMeetingTime
  };
};

export const handleTimeUntilNextEvent = (events: EventInfo[]): string => {
  const currentMoment = new Date();
  const noEventsUntilTomorrow = 'tomorrow';
  if (!events || events.length < 0) return noEventsUntilTomorrow;

  const upcomingEvents = events.filter((event) => isAfter(event.startTime, currentMoment));

  if (upcomingEvents.length > 0) {
    return format(upcomingEvents[0].startTime, 'p');
  }

  return noEventsUntilTomorrow;
};

export const getOngoingEventIdx = (eventData: EventInfo[]): number => {
  const presentMoment = new Date();
  for (let i = 0; i < eventData.length; i++) {
    const isEventOngoing = isWithinInterval(presentMoment, {
      start: eventData[i].startTime,
      end: eventData[i].endTime
    });

    if (isEventOngoing) {
      return i;
    }
  }

  return -1;
};

export const roomStatusMessage = (
  eventData: EventInfo[],
  currentEvent: EventInfo | null
): { statusMsg: string; busyFlag: boolean } => {
  if (currentEvent)
    return {
      statusMsg: `Busy until ${format(currentEvent.endTime, 'p')}`,
      busyFlag: true
    };
  return {
    statusMsg: `Available until ${handleTimeUntilNextEvent(eventData)}`,
    busyFlag: false
  };
};
