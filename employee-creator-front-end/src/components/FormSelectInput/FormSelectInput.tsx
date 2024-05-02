import styles from "./FormSelectInput.module.scss";

interface SelectProps<T> {
  type: T;
  inputTitle: string;
  inputName: string;
  register: Function;
}

const FormSelectInput = <T extends Record<string, string>>({
  type,
  inputTitle,
  inputName,
  register,
}: SelectProps<T>) => {
  const options = Object.keys(type);
  return (
    <div className={styles.radio}>
      <label>{inputTitle}</label>
      <div className={styles.radio__options}>
        {options.map((option, index) => (
          <article key={index}>
            <input
              type="radio"
              name={inputName}
              value={option}
              {...register(inputName)}
            />
            {type[option]}
          </article>
        ))}
      </div>
    </div>
  );
};

export default FormSelectInput;
