import { useState } from "react";
import { EventInfo } from "../../../../types/EventInfo";
import styles from "./Event.module.scss";

interface EventProps {
  eventInfo: EventInfo;
}

export const Event = (props: EventProps) => {
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);

  const { eventInfo } = props;
  return (
    <>
      {showInfoModal && (
        <MeetingInfoModal
          eventInfo={eventInfo}
          handleModalClose={() => setShowInfoModal(false)}
        />
      )}
      <div
        onClick={() => setShowInfoModal(true)}
        className={styles.eventContainer}
      >
        <p className={styles.title}>{eventInfo.subject}</p>
      </div>
    </>
  );
};
