import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { clearToast } from "../../features/toastSlice";
import styles from "./Toast.module.scss";

const Toast: React.FC = () => {
  const message = useSelector((state: RootState) => state.toast.message);
  const dispatch = useDispatch();

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        dispatch(clearToast());
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [message, dispatch]);

  if (!message) return null;

  return (
    <div className={styles.toast}>
      <p>{message}</p>
    </div>
  );
};

export default Toast;
