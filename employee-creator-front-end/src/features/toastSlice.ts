import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ToastState {
  message: string | null;
}

const initialState: ToastState = {
  message: null,
};

export const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    setToast: (state, action: PayloadAction<string | null>) => {
      state.message = action.payload;
    },
    clearToast: (state) => {
      state.message = null;
    },
  },
});

export const { setToast, clearToast } = toastSlice.actions;

export default toastSlice.reducer;
