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
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  jobTitle: z.string().min(1, "Job title is required"),
  department: z
    .string()
    .max(15, "Department name too long")
    .min(1, "Department name is required"),
  address: z.string().min(1, "Address is required"),
  email: z.string().email("Invalid email"),
  mobileNumber: z
    .string()
    .regex(/^\d*$/, "Only digits allowed in mobile number"),
  startDate: z
    .string()
    .min(10, "Start date must be complete")
    .max(10, "Start date must be complete"),
  photoLink: z.string().min(1, "Photo link is required"),
  hoursPerWeek: z.string().regex(/^\d+$/, "Hours per week should be numeric"),
  contractType: z.string().min(1, "Contract type is required"),
  workType: z.string().min(1, "Work type is required"),
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

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<Employee>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    const pageTitle = type === FormType.EDIT ? "Edit" : "Add";
    setPageTitle(`${pageTitle} Employee`);

    if (type === FormType.EDIT && id && employeeList) {
      const employeeToEdit = employeeList.find((emp) => emp.id === employeeId);
      if (employeeToEdit) {
        console.log(employeeToEdit);
        reset(employeeToEdit);
      }
    }
  }, [type, id, employeeList, setPageTitle, reset]);

  const submitHandler: SubmitHandler<Employee> = (data) => {
    console.log(data);
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
          {errors.firstName && (
            <span className={styles.error}>{errors.firstName.message}</span>
          )}
          <FormTextInput
            inputField="lastName"
            inputTitle="Last Name"
            register={register}
          />
          {errors.lastName && (
            <span className={styles.error}>{errors.lastName.message}</span>
          )}
          <FormTextInput
            inputField="jobTitle"
            inputTitle="Job Title"
            register={register}
          />
          {errors.jobTitle && (
            <span className={styles.error}>{errors.jobTitle.message}</span>
          )}
          <FormTextInput
            inputField="department"
            inputTitle="Department"
            register={register}
          />
          {errors.department && (
            <span className={styles.error}>{errors.department.message}</span>
          )}
          <FormTextInput
            inputField="address"
            inputTitle="Address"
            register={register}
          />
          {errors.address && (
            <span className={styles.error}>{errors.address.message}</span>
          )}
          <FormTextInput
            inputField="email"
            inputTitle="Email"
            register={register}
          />
          {errors.email && (
            <span className={styles.error}>{errors.email.message}</span>
          )}
          <FormTextInput
            inputField="photoLink"
            inputTitle="Photo Link"
            register={register}
          />
          {errors.photoLink && (
            <span className={styles.error}>{errors.photoLink.message}</span>
          )}
          <FormTextInput
            inputField="mobileNumber"
            inputTitle="Mobile"
            inputType="number"
            register={register}
          />
          {errors.mobileNumber && (
            <span className={styles.error}>{errors.mobileNumber.message}</span>
          )}
          {type === FormType.ADD && (
            <>
              <DateInput
                inputProps={register("startDate")}
                label="Start Date"
              />
              {errors.startDate && (
                <span className={styles.error}>{errors.startDate.message}</span>
              )}
            </>
          )}
          <FormTextInput
            inputField="hoursPerWeek"
            inputTitle="Hours Per Week"
            inputType="number"
            register={register}
          />
          {errors.hoursPerWeek && (
            <span className={styles.error}>{errors.hoursPerWeek.message}</span>
          )}
          <FormSelectInput
            type={ContractType}
            inputName="contractType"
            inputTitle="Contract Type"
            register={register}
          />
          {errors.contractType && (
            <span className={styles.error}>{errors.contractType.message}</span>
          )}
          <FormSelectInput
            type={WorkType}
            inputName="workType"
            inputTitle="Work Type"
            register={register}
          />
          {errors.workType && (
            <span className={styles.error}>{errors.workType.message}</span>
          )}
          <Button type="submit" className="centredButton">
            {type === FormType.EDIT ? "Save Changes" : "Add Employee"}
          </Button>

          {type === FormType.EDIT && deleteEmployee && id && (
            <Button
              type="button"
              className="centredButton"
              onClick={() => deleteEmployee(id)}
            >
              Delete Employee
            </Button>
          )}
        </div>
      </form>
    </section>
  );
};

export default Form;
