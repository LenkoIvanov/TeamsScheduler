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
        isError={true}
        isLoading={false}
        handleModalOpen={() => {}}
      />
      <div></div> {/* TODO: Status section and booking button */}
      <Scheduler events={TestData} />
    </div>
  );
};
