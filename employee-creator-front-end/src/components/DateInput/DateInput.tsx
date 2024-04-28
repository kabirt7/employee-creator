import React from "react";
import styles from "./DateInput.module.scss";

interface DateInputProps {
  inputProps: Partial<React.InputHTMLAttributes<HTMLInputElement>>;
  label: string;
}

const DateInput = ({ inputProps, label }: DateInputProps) => {
  return (
    <div className={styles.dateInput}>
      <label>{label}</label>
      <input
        type="text"
        pattern="\d{2}/\d{2}/\d{4}"
        title="Date"
        placeholder="dd/mm/yyyy"
        maxLength={10}
        size={10}
        {...inputProps}
      />
    </div>
  );
};

export default DateInput;
