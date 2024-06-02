import styles from "./ColorWaves.module.scss";

interface ColorWavesProps {
  isBooked: boolean;
}

export const ColorWaves = (props: ColorWavesProps) => {
  const { isBooked } = props;

  return (
    <div className={styles.colorWaveWrapper}>
      <div
        className={`${styles.colorWave} ${styles.firstChild} ${
          isBooked ? styles.firstBooked : ""
        }`}
      ></div>
      <div className={`${styles.colorWave} ${styles.secondChild}`}></div>
      <div
        className={`${styles.colorWave} ${styles.thirdChild} ${
          isBooked ? styles.thirdBooked : ""
        }`}
      ></div>
    </div>
  );
};
