import { format } from "date-fns";
import styles from "./Header.module.scss";

export const Header = () => {
  const currentDate = new Date();

  return (
    <div className={styles.header}>
      <div className={styles.dateInfo}>
        <p className={styles.date}>{format(currentDate, "dd.MM.yyyy")}</p>
        <p>{format(currentDate, "eeee")}</p> {/* Returns day of week */}
      </div>
    </div>
  );
};
