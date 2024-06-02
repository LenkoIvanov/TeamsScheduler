import styles from "./RadialSeparators.module.scss";

interface SeparatorProps {
  turns: number;
}

const Separator = (props: SeparatorProps) => {
  const { turns } = props;
  return (
    <div
      style={{
        transform: `rotate(${turns}turn)`,
      }}
      className={styles.separator}
    ></div>
  );
};

interface RadialSeparators {
  count: number;
}

export const RadialSeparators = (props: RadialSeparators) => {
  const { count } = props;
  const countForMirroringSeparators = count / 2 - 1;
  const turns = 1 / countForMirroringSeparators;

  return (
    <>
      {Array.from(Array(countForMirroringSeparators).keys()).map(
        (index: number) => (
          <Separator key={index} turns={index * turns} />
        )
      )}
    </>
  );
};
