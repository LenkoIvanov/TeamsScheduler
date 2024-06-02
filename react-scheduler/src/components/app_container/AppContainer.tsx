import { TestData } from "../../helpers/TestData";
import { RoomStatus } from "../room_status/RoomStatus";
import { Scheduler } from "../scheduler/scheduler_component/Scheduler";
import styles from "./AppContainer.module.scss";

export const AppContainer = () => {
  return (
    <div className={styles.appContainer}>
      <RoomStatus
        roomName="Conference Room"
        events={TestData}
        currentMoment={new Date()}
        isError={false}
        isLoading={false}
        handleModalOpen={() => {}}
      />
      <Scheduler events={TestData} />
    </div>
  );
};
