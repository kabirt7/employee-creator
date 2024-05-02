import { ContractType, WorkType } from "./enums";

export interface Employee {
  id: Number;
  firstName: string;
  jobTitle: string;
  department: string;
  lastName: string;
  photoLink: string;
  email: string;
  mobileNumber: string;
  address: string;
  hoursPerWeek: string;
  startDate: string;
  contractType: ContractType;
  workType: WorkType;
}
