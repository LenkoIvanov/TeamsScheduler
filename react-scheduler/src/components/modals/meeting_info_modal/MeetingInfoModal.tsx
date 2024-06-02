import { format } from "date-fns";
import { EventInfo } from "../../../types/EventInfo";
import { ModalSkeleton } from "../modal_skeleton/ModalSkeleton";
import styles from "./MeetingInfoModal.module.scss";

interface MeetingInfoModalProps {
  eventInfo: EventInfo;
  handleModalClose: () => void;
}

export const MeetingInfoModal = (props: MeetingInfoModalProps) => {
  const { eventInfo, handleModalClose } = props;

  return (
    <ModalSkeleton
      title={eventInfo.subject}
      handleModalClose={handleModalClose}
    >
      <h3 className={styles.subtitleInfo}>
        Start:<span>{format(eventInfo.startTime, "HH:mm")}</span>
      </h3>
      <h3 className={styles.subtitleInfo}>
        End:<span>{format(eventInfo.endTime, "HH:mm")}</span>
      </h3>
      <h3 className={styles.subtitleInfo}>
        Organizer:<span>{eventInfo.organizer}</span>
      </h3>
    </ModalSkeleton>
  );
};
