import { useEffect, useState } from "react";
import { EventInfo } from "../../../../types/EventInfo";
import {
  EventOffset,
  calculateGroupEventOffset,
  calculateSingularEventOffset,
} from "../../../../helpers/scheduler_helper";
import { Event } from "../event_component/Event";
import styles from "./GroupEventWrapper.module.scss";

interface GroupEventWrapperProps {
  groupIndices: number[];
  allEventsInfo: EventInfo[];
}

export const GroupEventWrapper = (props: GroupEventWrapperProps) => {
  const { groupIndices, allEventsInfo } = props;
  const [groupOffset, setGroupOffset] = useState<number>(0);
  const [concurrentEvents, setConcurrentEvents] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const generatedEvents: JSX.Element[] = [];
    let firstElementOffset = 0;
    groupIndices.forEach((eventIndex, iterationIndex) => {
      let eventDimensions: EventOffset = { topOffset: 0, eventHeight: 0 };
      if (iterationIndex === 0) {
        eventDimensions = calculateSingularEventOffset(
          allEventsInfo[eventIndex]
        );
        firstElementOffset = eventDimensions.topOffset;
        setGroupOffset(firstElementOffset);
      } else {
        eventDimensions = calculateGroupEventOffset(
          allEventsInfo[eventIndex],
          firstElementOffset
        );
      }

      generatedEvents.push(
        <div
          style={{
            marginTop: `${
              iterationIndex === 0 ? 0 : eventDimensions.topOffset
            }px`,
            height: `${eventDimensions.eventHeight}px`,
          }}
          key={`event-${eventIndex}`}
        >
          <Event eventInfo={allEventsInfo[eventIndex]} />
        </div>
      );
    });

    setConcurrentEvents(generatedEvents);
  }, [groupIndices, allEventsInfo]);

  return (
    <div
      className={styles.groupEventWrapper}
      style={{
        top: `${groupOffset}px`,
        gridTemplateColumns: `repeat(${groupIndices.length}, minmax(10px, 1fr))`,
      }}
    >
      {concurrentEvents}
    </div>
  );
};
