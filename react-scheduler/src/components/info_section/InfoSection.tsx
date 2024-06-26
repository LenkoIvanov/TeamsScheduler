import { roomStatusMessage } from "../../helpers/room_status_helper";
import { EventInfo } from "../../types/EventInfo";
import { Button } from "../shared_components/button_component/Button";
import styles from "./InfoSection.module.scss";

interface InfoSectionProps {
  currentEvent: EventInfo | null;
  events: EventInfo[];
  roomName: string;
  isError: boolean;
  isLoading: boolean;
  onCreateBtnClick: () => void;
}

export const InfoSection = (props: InfoSectionProps) => {
  const {
    events,
    currentEvent,
    roomName,
    isError,
    isLoading,
    onCreateBtnClick,
  } = props;

  const handleStatusMessage = () => {
    return roomStatusMessage(events, currentEvent).statusMsg;
  };

  return (
    <div className={styles.infoSection}>
      <p>
        Room: <span className={styles.roomName}>{roomName}</span>
      </p>
      <p>
        Status:{" "}
        <span
          className={`${
            currentEvent ? styles.status__booked : styles.status__free
          }`}
        >
          {handleStatusMessage()}
        </span>
      </p>
      <Button
        disabled={isError || isLoading || !!currentEvent}
        content="Book now"
        onClick={onCreateBtnClick}
        theme="green"
      />
    </div>
  );
};
