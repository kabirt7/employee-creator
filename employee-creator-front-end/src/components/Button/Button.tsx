import { FormEventHandler } from "react";
import styles from "./Button.module.scss";

interface ButtonProps {
  type?: "button" | "submit";
  children: string;
  onClick?: () => void;
}

const Button = ({ type = "button", children, onClick }: ButtonProps) => {
  return (
    <button type={type} className={styles.button} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
