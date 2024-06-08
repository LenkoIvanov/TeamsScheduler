import styles from "./Button.module.scss";

interface ButtonProps {
  content: string;
  onClick: () => void;
  theme: "purple" | "green";
  disabled: boolean;
}

export const Button = (props: ButtonProps) => {
  const { content, theme, disabled, onClick } = props;

  const handleClick = () => {
    if (disabled) return;
    onClick();
  };
  return (
    <div
      className={`${styles.button} ${disabled ? styles.isDisabled : ""}`}
      onClick={handleClick}
      data-theme={theme}
    >
      {content}
    </div>
  );
};
