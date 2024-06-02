import { differenceInMinutes, isWithinInterval } from "date-fns";
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
    isWithinInterval(allEvents[currentEventIdx + 1].startTime, {
      start: allEvents[currentEventIdx].startTime,
      end: allEvents[currentEventIdx].endTime,
    });

  if (isNextEventWithinCurrent) {
    lastConcurrentIdx = currentEventIdx + 1;
    concurrentEventsIndeces.push(currentEventIdx);
  }

  for (let i = lastConcurrentIdx; i < allEvents.length; i++) {
    for (let j = 0; j < concurrentEventsIndeces.length; j++) {
      const concurrentEventIdx = concurrentEventsIndeces[j];
      const isWithinConcurrentEvents = isWithinInterval(
        allEvents[i].startTime,
        {
          start: allEvents[concurrentEventIdx].startTime,
          end: allEvents[concurrentEventIdx].endTime,
        }
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
