import { roomStatusMessage } from "../../helpers/room_status_helper";
import { EventInfo } from "../../types/EventInfo";
import { Button } from "../shared_components/button_component/Button";
import styles from "./InfoSection.module.scss";

interface InfoSectionProps {
  currentEvent: EventInfo | null;
  events: EventInfo[];
  roomName: string;
}

export const InfoSection = (props: InfoSectionProps) => {
  const { events, currentEvent, roomName } = props;

  const handleStatusMessage = () => {
    return roomStatusMessage(events, currentEvent).statusMsg;
  };

  return (
    <div className={styles.infoSection}>
      <p>Room: {roomName}</p>
      <p>Status: {handleStatusMessage()}</p>
      <Button content="Book now" onClick={() => {}} theme="green" />
    </div>
  );
};
