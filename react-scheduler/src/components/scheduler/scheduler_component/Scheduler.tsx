import { useEffect } from "react";
import { Timeline } from "../timeline/Timeline";
import { Indicator } from "../indicator/Indicator";
import { EventInfo } from "../../../types/EventInfo";
import styles from "./Scheduler.module.scss";
import {
  calculateSingularEventOffset,
  getLastConcurrentEventIdx,
  indicatorId,
} from "../../../helpers/scheduler_helper";
import { SingularEventWrapper } from "../event_components/singular_event_wrapper/SingularEventWrapper";
import { GroupEventWrapper } from "../event_components/group_event_wrapper/GroupEventWrapper";

interface SchedulerProps {
  events: EventInfo[];
}

export const Scheduler = (props: SchedulerProps) => {
  const { events } = props;

  useEffect(() => {
    // "autofocus" on the indicator
    const indicatorComponent = document.getElementById(indicatorId);
    if (indicatorComponent)
      indicatorComponent.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
  }, []);

  const generateEvents = (): JSX.Element[] => {
    const generatedEvents: JSX.Element[] = [];

    let idxOfLastConcurrentElement = -1;
    for (let i = 0; i < events.length; i++) {
      if (i <= idxOfLastConcurrentElement) continue;
      const response = getLastConcurrentEventIdx(i, events);
      if (response.lastIdx !== -1) {
        idxOfLastConcurrentElement = response.lastIdx;
        generatedEvents.push(
          <GroupEventWrapper
            allEventsInfo={events}
            groupIndices={response.allIndeces}
            key={`group-events-${response.allIndeces[0]}`}
          />
        );
      } else {
        const eventDimensions = calculateSingularEventOffset(events[i]);
        generatedEvents.push(
          <SingularEventWrapper
            topOffset={eventDimensions.topOffset}
            eventHeight={eventDimensions.eventHeight}
            eventInfo={events[i]}
            key={`event-${i}`}
          />
        );
      }
    }

    return generatedEvents;
  };

  return (
    <div className={styles.scheduler}>
      <Indicator />
      <Timeline />
      {generateEvents()}
    </div>
  );
};
