import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Employee } from "../services/interfaces";

interface ModalState {
  employeeModal: Employee | null;
}

const initialState: ModalState = {
  employeeModal: null,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setEmployeeModal: (state, action: PayloadAction<Employee | null>) => {
      state.employeeModal = action.payload;
    },
    clearEmployeeModal: (state) => {
      state.employeeModal = null;
    },
  },
});

export const { setEmployeeModal, clearEmployeeModal } = modalSlice.actions;

export default modalSlice.reducer;
