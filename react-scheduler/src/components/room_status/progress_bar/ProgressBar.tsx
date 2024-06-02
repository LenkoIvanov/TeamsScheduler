import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import { LoadingComponent } from "../../shared_components/loading_component/LoadingComponent";
import { RadialSeparators } from "./radial_separators/RadialSeparators";
import styles from "./ProgressBar.module.scss";

interface ProgressBarProps {
  value: number;
  roomName: string;
  roomStatus: string;
  isBooked: boolean;
  isLoading: boolean;
  isError: boolean;
}

export const ProgressBar = (props: ProgressBarProps) => {
  const { value, roomName, roomStatus, isBooked, isLoading, isError } = props;
  const strokeWidth = 5;

  const handleRoomStatusMessages = (): JSX.Element => {
    if (isLoading) return <LoadingComponent />;
    if (isError)
      return <p className={styles.errorMsg}>An error has occurred!</p>;
    return (
      <>
        {!isBooked && <p>Book now!</p>}
        <p>{roomStatus}</p>
      </>
    );
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
          <h1>{roomName}</h1>
          {handleRoomStatusMessages()}
        </div>
      </CircularProgressbarWithChildren>
    </div>
  );
};
