import axios from "axios";
import { Employee } from "./interfaces";

const API_URL = "http://localhost:8081/employees";

export const getAllEmployees = async (): Promise<Employee[]> => {
  try {
    const response = await axios.get(API_URL);

    if (response.status !== 200) {
      const errorMessage = `Failed to get employees. Status: ${response.status} ${response.statusText}`;
      console.log(errorMessage);
      throw new Error(errorMessage);
    }

    return response.data as Employee[];
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const addEmployee = async (employee: Employee): Promise<Employee> => {
  // Parse mobileNumber and hoursPerWeek
  const mobileNumber = parseInt(employee.mobileNumber, 10);
  const hoursPerWeek = parseInt(employee.hoursPerWeek, 10);

  // Transform startDate format from "MM/dd/yyyy" to "yyyy-MM-dd"
  const regex = /(\d{2})\/(\d{2})\/(\d{4})/;
  const match = regex.exec(employee.startDate);

  let formattedStartDate = employee.startDate;
  if (match) {
    formattedStartDate = `${match[3]}-${match[1]}-${match[2]}`;
  }

  try {
    const response = await axios.post(
      API_URL,
      {
        id: employee.id,
        firstName: employee.firstName,
        lastName: employee.lastName,
        jobTitle: employee.jobTitle,
        department: employee.department,
        photoLink: employee.photoLink,
        email: employee.email,
        mobileNumber: mobileNumber,
        address: employee.address,
        startDate: formattedStartDate,
        hoursPerWeek: hoursPerWeek,
        contractType: employee.contractType,
        workType: employee.workType,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateEmployee = async (
  employee: Employee,
  id: string
): Promise<Employee> => {
  try {
    const response = await axios.patch(`${API_URL}/${id}`, {
      id: employee.id,
      firstName: employee.firstName,
      lastName: employee.lastName,
      jobTitle: employee.jobTitle,
      department: employee.department,
      photoLink: employee.photoLink,
      email: employee.email,
      mobileNumber: parseInt(employee.mobileNumber, 10),
      address: employee.address,
      hoursPerWeek: parseInt(employee.hoursPerWeek, 10),
      contractType: employee.contractType,
      workType: employee.workType,
    });

    return response.data;
  } catch (error) {
    console.error("Error updating employee:", error);
    throw error;
  }
};

export const deleteEmployee = async (id: String) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      const errorMessage = `Failed to delete item. Status: ${response.status} ${response.statusText}`;
      console.error(errorMessage);
      throw new Error(errorMessage);
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
