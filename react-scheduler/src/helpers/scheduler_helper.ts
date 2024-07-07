import {
  differenceInMinutes,
  isSameMinute,
  isWithinInterval,
  setSeconds,
} from "date-fns";
import { EventInfo } from "../types/EventInfo";

export interface EventOffset {
  topOffset: number;
  eventHeight: number;
}

export const indicatorId = "scheduler-indicator";
export const indicatorMaxOffset = 1440;
const eightAmOffset = 480;
const quarterHourEventHeight = 30;
const minuteMultiplier = 2;

export const timeFormatting = (hour: number): string => {
  if (hour % 1 !== 0) return "";
  return (hour < 10 ? "0" : "") + hour + ":00";
};

export const calculateEightAmOffset = (startTime: Date): number => {
  return (
    (startTime.getHours() * 60 + startTime.getMinutes() - eightAmOffset) *
    minuteMultiplier
  );
};

export const calculateSingularEventOffset = (event: EventInfo): EventOffset => {
  const eventHeight =
    differenceInMinutes(event.endTime, event.startTime) * minuteMultiplier;
  const minEventHeight = quarterHourEventHeight;
  return {
    topOffset: calculateEightAmOffset(event.startTime),
    eventHeight: eventHeight > minEventHeight ? eventHeight : minEventHeight,
  };
};

export const isEventWithinInterval = (
  eventToCheck: EventInfo,
  eventForInterval: EventInfo
): boolean => {
  const eventToCheckStart = setSeconds(eventToCheck.startTime, 0);
  const eventIntervalEnd = setSeconds(eventForInterval.endTime, 0);
  if (isSameMinute(eventToCheckStart, eventIntervalEnd)) return false;

  return isWithinInterval(eventToCheck.startTime, {
    start: eventForInterval.startTime,
    end: eventForInterval.endTime,
  });
};

export const calculateGroupEventOffset = (
  event: EventInfo,
  firstElementTop: number
): EventOffset => {
  const eventHeight =
    differenceInMinutes(event.endTime, event.startTime) * minuteMultiplier;
  const minEventHeight = quarterHourEventHeight;
  return {
    topOffset: calculateEightAmOffset(event.startTime) - firstElementTop,
    eventHeight: eventHeight > minEventHeight ? eventHeight : minEventHeight,
  };
};

export const getLastConcurrentEventIdx = (
  currentEventIdx: number,
  allEvents: EventInfo[]
): { lastIdx: number; allIndeces: number[] } => {
  let lastConcurrentIdx = -1;
  const concurrentEventsIndeces: number[] = [];

  const isNextEventWithinCurrent =
    currentEventIdx !== allEvents.length - 1 &&
    isEventWithinInterval(
      allEvents[currentEventIdx + 1],
      allEvents[currentEventIdx]
    );

  if (isNextEventWithinCurrent) {
    lastConcurrentIdx = currentEventIdx + 1;
    concurrentEventsIndeces.push(currentEventIdx);
  }

  for (let i = lastConcurrentIdx; i < allEvents.length; i++) {
    for (let j = 0; j < concurrentEventsIndeces.length; j++) {
      const concurrentEventIdx = concurrentEventsIndeces[j];
      const isWithinConcurrentEvents = isEventWithinInterval(
        allEvents[i],
        allEvents[concurrentEventIdx]
      );

      if (isWithinConcurrentEvents) {
        lastConcurrentIdx = i;
        concurrentEventsIndeces.push(i);
        break;
      }
    }
  }

  return { lastIdx: lastConcurrentIdx, allIndeces: concurrentEventsIndeces };
};
