import {
  calculateEightAmOffset,
  indicatorId,
  indicatorMaxOffset,
} from "../../../helpers/scheduler_helper";
import styles from "./Indicator.module.scss";

export const Indicator = () => {
  const calculateIndicatorOffset = (currentMoment: Date) => {
    const offsetCorrection = 4;
    const indicatorOffset =
      calculateEightAmOffset(currentMoment) - offsetCorrection;
    return indicatorOffset <= indicatorMaxOffset ? indicatorOffset : 0;
  };

  return (
    <div
      id={indicatorId}
      style={{ top: `${calculateIndicatorOffset(new Date())}px` }}
      className={styles.indicator}
    >
      <div className={styles.indicatorCircle}></div>
      <div className={styles.indicatorLine}></div>
    </div>
  );
};
