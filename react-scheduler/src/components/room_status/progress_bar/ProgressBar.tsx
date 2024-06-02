import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import { LoadingComponent } from "../../shared_components/loading_component/LoadingComponent";
import { RadialSeparators } from "./radial_separators/RadialSeparators";
import styles from "./ProgressBar.module.scss";

interface ProgressBarProps {
  value: number;
  isBooked: boolean;
  isLoading: boolean;
  isError: boolean;
}

export const ProgressBar = (props: ProgressBarProps) => {
  const { value, isBooked, isLoading, isError } = props;
  const strokeWidth = 5;

  const handleRoomStatusMessages = (): JSX.Element => {
    if (isLoading) return <LoadingComponent />;
    if (isError)
      return <p className={styles.errorMsg}>An error has occurred!</p>;
    if (isBooked)
      return <p className={styles.inProgress}>Meeting in progress</p>;
    return <p className={styles.available}>Available</p>;
  };

  return (
    <div className={styles.progressBar}>
      <CircularProgressbarWithChildren
        value={value}
        strokeWidth={strokeWidth}
        styles={buildStyles({
          strokeLinecap: "butt",
          pathColor: "#2D3D46",
          trailColor: "#ACE1F0",
        })}
        className={styles.progressBarWithChildren}
      >
        <RadialSeparators count={60} />
        <div className={styles.statusContainer}>
          {handleRoomStatusMessages()}
        </div>
      </CircularProgressbarWithChildren>
    </div>
  );
};
