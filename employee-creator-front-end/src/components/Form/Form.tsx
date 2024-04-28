import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Button from "../Button/Button";
import FormSelectInput from "../FormSelectInput/FormSelectInput";
import FormTextInput from "../FormTextInput/FormTextInput";
import DateInput from "../DateInput/DateInput";
import styles from "./Form.module.scss";
import { Employee } from "../../services/interfaces";
import { ContractType, WorkType, FormType } from "../../services/enums";
import logoImage from "../../assets/empLogo.svg";

const schema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  jobTitle: z.string().min(1),
  address: z.string().min(1),
  email: z.string().email(),
  mobileNumber: z.string().min(10).max(10),
  startDate: z.string().min(10).max(10),
  photoLink: z.string().min(1),
  hoursPerWeek: z.string().regex(/^\d+$/).min(1),
  contractType: z.string().min(1),
  workType: z.string().min(1),
});

interface FormProps {
  setPageTitle: (title: string) => void;
  onSubmit: (data: Employee, id?: string) => void;
  type?: FormType;
  employeeList?: Employee[] | null;
  deleteEmployee?: (id: string) => Promise<void>;
}

const Form: React.FC<FormProps> = ({
  setPageTitle,
  onSubmit,
  type,
  employeeList,
  deleteEmployee,
}) => {
  const { id } = useParams<{ id?: string | undefined }>();
  const employeeId = id ? parseInt(id, 10) : undefined;

  const { handleSubmit, register, reset } = useForm<Employee>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const pageTitle = type === FormType.EDIT ? "Edit" : "Add";
    setPageTitle(`${pageTitle} Employee`);

    if (type === FormType.EDIT && id && employeeList) {
      const employeeToEdit = employeeList.find((emp) => emp.id === employeeId);
      if (employeeToEdit) {
        reset(employeeToEdit);
      }
    }
  }, [type, id, employeeList, setPageTitle, reset]);

  const submitHandler: SubmitHandler<Employee> = (data) => {
    onSubmit(data, id);
  };

  return (
    <section className={styles.form}>
      <form
        className={styles.form__page}
        onSubmit={handleSubmit(submitHandler)}
      >
        <div className={styles.form__wrap}>
          <img src={logoImage} alt="logo" />
          <FormTextInput
            inputField="firstName"
            inputTitle="First Name"
            register={register}
          />
          <FormTextInput
            inputField="lastName"
            inputTitle="Last Name"
            register={register}
          />
          <FormTextInput
            inputField="jobTitle"
            inputTitle="Job Title"
            register={register}
          />
          <FormTextInput
            inputField="address"
            inputTitle="Address"
            register={register}
          />
          <FormTextInput
            inputField="email"
            inputTitle="Email"
            register={register}
          />
          <FormTextInput
            inputField="photoLink"
            inputTitle="Photo Link"
            register={register}
          />
          <FormTextInput
            inputField="mobileNumber"
            inputTitle="Mobile"
            inputType="number"
            register={register}
          />
          {type == FormType.ADD && (
            <DateInput inputProps={register("startDate")} label="Start Date" />
          )}
          <FormTextInput
            inputField="hoursPerWeek"
            inputTitle="Hours Per Week"
            inputType="number"
            register={register}
          />
          <FormSelectInput
            type={ContractType}
            inputName="contractType"
            inputTitle="Contract Type"
            register={register}
          />
          <FormSelectInput
            type={WorkType}
            inputName="workType"
            inputTitle="Work Type"
            register={register}
          />
          <Button type="submit">
            {type === FormType.EDIT ? "Save Changes" : "Add Employee"}
          </Button>

          {type === FormType.EDIT && deleteEmployee && id && (
            <Button type="button" onClick={() => deleteEmployee(id)}>
              Delete Employee
            </Button>
          )}
        </div>
      </form>
    </section>
  );
};

export default Form;
