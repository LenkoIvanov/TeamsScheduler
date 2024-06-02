import { TestData } from "../../helpers/TestData";
import { Scheduler } from "../scheduler/scheduler_component/Scheduler";
import styles from "./AppContainer.module.scss";

export const AppContainer = () => {
  return (
    <div className={styles.appContainer}>
      <h1>Room Status Component</h1>
      <Scheduler events={TestData} />
    </div>
  );
};
