import { useState } from "react";
import { format } from "date-fns";
import { ModalSkeleton } from "../modal_skeleton/ModalSkeleton";
import { oneMinuteInMiliseconds } from "../../../helpers/constants";
import styles from "./NewMeetingModal.module.scss";

interface NewMeetingModalProps {
  handleModalClose: () => void;
  createRoomEvent: (minutes: number) => void;
}

const DropdownOptions = {
  fifteen: 15,
  thirty: 30,
  fortyFive: 45,
  sixty: 60,
};

export const NewMeetingModal = (props: NewMeetingModalProps) => {
  const { createRoomEvent, handleModalClose } = props;
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [selectedOption, setSelectedOption] = useState<number>(
    DropdownOptions.fifteen
  );

  setInterval(() => setCurrentTime(new Date()), oneMinuteInMiliseconds);

  return (
    <ModalSkeleton
      title="Create a new meeting"
      handleModalClose={handleModalClose}
    >
      <h3>
        <span className={styles.startTime}>Start:</span>
        {format(currentTime, "HH:mm")}
      </h3>
      <h3 className={styles.infoRow}>
        <span>Meeting duration:</span>
        <select
          value={selectedOption}
          onChange={(ev) => setSelectedOption(Number(ev.target.value))}
        >
          {Object.values(DropdownOptions).map((value, idx) => {
            return (
              <option
                key={`duration-option-${idx}`}
                value={value}
              >{`${value}min`}</option>
            );
          })}
        </select>
      </h3>
      <div className={styles.btnSection}>
        <button onClick={() => createRoomEvent(selectedOption)}>
          Book now {/* TODO: Add a button component later */}
        </button>
      </div>
    </ModalSkeleton>
  );
};
