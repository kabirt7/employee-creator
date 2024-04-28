import styles from "./FormTextInput.module.scss";

interface FormTextInputProps {
  inputField: string;
  inputTitle: string;
  inputType?: string;
  register: Function;
}

const FormTextInput = ({
  inputField,
  inputTitle,
  inputType = "text",
  register = Function,
}: FormTextInputProps) => {
  return (
    <div className={styles.input}>
      <label>{inputTitle}</label>
      <input type={inputType} {...register(inputField)} />
    </div>
  );
};

export default FormTextInput;
