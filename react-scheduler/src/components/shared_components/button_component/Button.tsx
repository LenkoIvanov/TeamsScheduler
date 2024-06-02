import styles from "./Button.module.scss";

interface ButtonProps {
  content: string;
  onClick: () => void;
  theme: "purple" | "green";
}

export const Button = (props: ButtonProps) => {
  const { content, theme, onClick } = props;
  return (
    <div className={styles.button} onClick={onClick} data-theme={theme}>
      {content}
    </div>
  );
};
