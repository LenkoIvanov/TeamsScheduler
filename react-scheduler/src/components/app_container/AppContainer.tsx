import { TestData } from "../../helpers/TestData";
import { InfoSection } from "../info_section/InfoSection";
import { RoomStatus } from "../room_status/RoomStatus";
import { Scheduler } from "../scheduler/scheduler_component/Scheduler";
import styles from "./AppContainer.module.scss";

export const AppContainer = () => {
  return (
    <div className={styles.appContainer}>
      <RoomStatus
        events={TestData}
        currentMoment={new Date()}
        isError={false}
        isLoading={false}
      />
      <InfoSection
        currentEvent={null}
        events={TestData}
        roomName="Conference room"
      />
      <Scheduler events={TestData} />
    </div>
  );
};
