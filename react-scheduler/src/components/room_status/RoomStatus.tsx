import { useEffect, useState } from "react";
import { EventInfo } from "../../types/EventInfo";
import { handleTimeUntilFree } from "../../helpers/room_status_helper";
import styles from "./RoomStatus.module.scss";
import { ColorWaves } from "./color_waves/ColorWaves";
import { ProgressBar } from "./progress_bar/ProgressBar";

interface RoomStatusProps {
  events: EventInfo[];
  currentEvent: EventInfo | null;
  currentMoment: Date;
  isLoading: boolean;
  isError: boolean;
}

export const RoomStatus = (props: RoomStatusProps) => {
  const initProgressBarValue = 100;
  const { currentEvent, currentMoment, isLoading, isError } = props;

  const [progressBarValue, setProgressBarValue] = useState<number>(100);

  useEffect(() => {
    if (currentEvent === null) resetRoomState();
  }, [currentEvent]);

  const resetRoomState = () => {
    setProgressBarValue(initProgressBarValue);
  };

  const handleProgressBarUpdate = () => {
    if (!currentEvent) return;
    const { minutesUntilFree, totalMeetingTime } = handleTimeUntilFree(
      currentEvent,
      currentMoment
    );
    const value = Math.round(
      initProgressBarValue -
        (initProgressBarValue * minutesUntilFree) / totalMeetingTime
    );

    if (value <= 100 && value !== progressBarValue) setProgressBarValue(value);
  };

  handleProgressBarUpdate();
  return (
    <div className={styles.roomStatusWrapper}>
      <ColorWaves isBooked={!!currentEvent} />
      <ProgressBar
        value={progressBarValue}
        isBooked={!!currentEvent}
        isLoading={isLoading}
        isError={isError}
      />
    </div>
  );
};
