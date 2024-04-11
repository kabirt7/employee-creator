import FormTextInput from "../FormTextInput/FormTextInput";
import styles from "./Form.module.scss";
// import { SubmitHandler, useForm } from "react-hook-form";

const Form = () => {
  // const { handleSubmit, register } = useForm<{ inputField: string }>();
  return (
    <section className={styles.form}>
      <form className={styles.form__page}>
        <div className={styles.form__wrap}>
          <img src="dsfsdff.jpg" />
          <div className={styles.form__names}>
            <FormTextInput inputField="firstName" />
            <FormTextInput inputField="lastName" />
          </div>
          <FormTextInput inputField="address" />
          <FormTextInput inputField="email" />
        </div>
      </form>
    </section>
  );
};

export default Form;
