import { Employee } from "../../services/interfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import styles from "./Modal.module.scss";

interface ModalProps {
  data: Employee;
  onClose: React.MouseEventHandler<HTMLButtonElement>;
}

const Modal = ({ data, onClose }: ModalProps) => {
  return (
    <div className={styles.modal__wrap}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          <FontAwesomeIcon
            className={styles.closeButton__svg}
            icon={faClose}
            id="editButton"
          />
        </button>
        <div className={styles.formData}>
          <h2 className={styles.modal__title}>Employee Information</h2>
          <div className={styles.infoBlock}>
            <label className={styles.modal__label}>First Name:</label>
            <div className={styles.modal__infoText}>{data.firstName}</div>
          </div>
          <div className={styles.infoBlock}>
            <label className={styles.modal__label}>Last Name:</label>
            <div className={styles.modal__infoText}>{data.lastName}</div>
          </div>
          <div className={styles.infoBlock}>
            <label className={styles.modal__label}>Job Title:</label>
            <div className={styles.modal__infoText}>{data.jobTitle}</div>
          </div>
          <div className={styles.infoBlock}>
            <label className={styles.modal__label}>Department:</label>
            <div className={styles.modal__infoText}>{data.department}</div>
          </div>
          <div className={styles.infoBlock}>
            <label className={styles.modal__label}>Address:</label>
            <div className={styles.modal__infoText}>{data.address}</div>
          </div>
          <div className={styles.infoBlock}>
            <label className={styles.modal__label}>Email:</label>
            <div className={styles.modal__infoText}>{data.email}</div>
          </div>
          <div className={styles.infoBlock}>
            <label className={styles.modal__label}>Mobile Number:</label>
            <div className={styles.modal__infoText}>{data.mobileNumber}</div>
          </div>
          <div className={styles.infoBlock}>
            <label className={styles.modal__label}>Start Date:</label>
            <div className={styles.modal__infoText}>{data.startDate}</div>
          </div>
          <div className={styles.infoBlock}>
            <label className={styles.modal__label}>Hours Per Week:</label>
            <div className={styles.modal__infoText}>{data.hoursPerWeek}</div>
          </div>
          <div className={styles.infoBlock}>
            <label className={styles.modal__label}>Contract Type:</label>
            <div className={styles.modal__infoText}>{data.contractType}</div>
          </div>
          <div className={styles.infoBlock}>
            <label className={styles.modal__label}>Work Type:</label>
            <div className={styles.modal__infoText}>{data.workType}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
