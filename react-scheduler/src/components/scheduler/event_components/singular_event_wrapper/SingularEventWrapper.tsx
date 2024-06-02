import { EventInfo } from "../../../../types/EventInfo";
import { Event } from "../event_component/Event";
import styles from "./SingularEventWrapper.module.scss";

interface SingularEventWrapperProps {
  topOffset: number;
  eventHeight: number;
  eventInfo: EventInfo;
}

export const SingularEventWrapper = (props: SingularEventWrapperProps) => {
  const { topOffset, eventHeight, eventInfo } = props;
  return (
    <div
      className={styles.eventWrapper}
      style={{ top: `${topOffset}px`, height: `${eventHeight}px` }}
    >
      <Event eventInfo={eventInfo} />
    </div>
  );
};
