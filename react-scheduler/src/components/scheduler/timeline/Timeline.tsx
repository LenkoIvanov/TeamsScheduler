import { timeFormatting } from "../../../helpers/scheduler_helper";
import styles from "./Timeline.module.scss";

interface TimelineElementProps {
  currentHour: string;
}
const TimelineElement = (props: TimelineElementProps) => {
  const { currentHour } = props;
  return (
    <div className={styles.timelineElementContainer}>
      {currentHour}
      <div className={styles.singularLine}></div>
    </div>
  );
};

export const Timeline = () => {
  const generateTimelines = () => {
    const timelines: JSX.Element[] = [];
    const workDayStart = 8;
    const workDayEnd = 20;

    for (let i = workDayStart; i <= workDayEnd - 1; i++) {
      timelines.push(
        <TimelineElement key={`line-${i}`} currentHour={timeFormatting(i)} />
      );
    }

    return timelines;
  };

  return <div className={styles.timelineContainer}>{generateTimelines()}</div>;
};
