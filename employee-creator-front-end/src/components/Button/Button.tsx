import styles from "./Button.module.scss";

interface ButtonProps {
  type?: "button" | "submit";
  children: string;
  onClick?: () => void;
  className?: string;
}

const Button = ({
  type = "button",
  children,
  onClick,
  className,
}: ButtonProps) => {
  const buttonClass = `${styles.button} ${
    className ? styles[className] || "" : ""
  }`.trim();
  return (
    <button type={type} className={buttonClass} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
