import { useEffect, useState } from "react";
import { EventInfo } from "../../types/EventInfo";
import {
  getOngoingEventIdx,
  handleTimeUntilFree,
  roomStatusMessage,
} from "../../helpers/room_status_helper";
import styles from "./RoomStatus.module.scss";
import { ColorWaves } from "./color_waves/ColorWaves";
import { ProgressBar } from "./progress_bar/ProgressBar";

interface RoomStatusProps {
  events: EventInfo[];
  currentMoment: Date;
  isLoading: boolean;
  isError: boolean;
  handleModalOpen: () => void;
  roomName: string;
}

export const RoomStatus = (props: RoomStatusProps) => {
  const initProgressBarValue = 100;
  const {
    events,
    currentMoment,
    isLoading,
    isError,
    roomName,
    handleModalOpen,
  } = props;

  const [currentEvent, setCurrentEvent] = useState<EventInfo | null>(null);
  const [progressBarValue, setProgressBarValue] = useState<number>(100);

  useEffect(() => {
    resetRoomState();
  }, [roomName]);

  const resetRoomState = () => {
    setCurrentEvent(null);
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

    if (value >= 100) {
      resetRoomState();
    } else {
      if (value !== progressBarValue) setProgressBarValue(value);
    }
  };

  const handleRoomAvailability = () => {
    if (currentEvent) return;
    const currentEventIdx = getOngoingEventIdx(events);
    if (currentEventIdx !== -1) setCurrentEvent(events[currentEventIdx]);
  };

  const handleStatusMessage = () => {
    return roomStatusMessage(events, currentEvent).statusMsg;
  };

  const handleRoomStatusClick = () => {
    if (currentEvent || isError || isLoading) return;
    handleModalOpen();
  };

  handleRoomAvailability();
  handleProgressBarUpdate();
  return (
    <div className={styles.roomStatusWrapper} onClick={handleRoomStatusClick}>
      <ColorWaves isBooked={!!currentEvent} />
      <ProgressBar
        value={progressBarValue}
        roomName={roomName.toUpperCase()}
        roomStatus={handleStatusMessage()}
        isBooked={!!currentEvent}
        isLoading={isLoading}
        isError={isError}
      />
    </div>
  );
};
