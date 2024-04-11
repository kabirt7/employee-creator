import { useForm } from "react-hook-form";
import styles from "./FormTextInput.module.scss";

interface FormTextInputProps {
  inputField: string;
}

const FormTextInput = ({ inputField }: FormTextInputProps) => {
  const { register } = useForm<{ [key: string]: string }>();
  return (
    <div className={styles.input}>
      <p>{inputField}</p>
      <input type="text" {...register(inputField)} />
    </div>
  );
};

export default FormTextInput;
