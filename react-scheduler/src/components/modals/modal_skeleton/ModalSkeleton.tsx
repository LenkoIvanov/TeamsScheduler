import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./ModalSkeleton.module.scss";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

interface ModalSkeletonProps {
  title: string;
  handleModalClose: () => void;
  children: React.ReactNode;
}

export const ModalSkeleton = (props: ModalSkeletonProps) => {
  const { title, children, handleModalClose } = props;
  return (
    <>
      <div className={styles.backdrop} onClick={handleModalClose}></div>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h2 className={styles.title}>{title}</h2>
          <FontAwesomeIcon
            icon={faXmark}
            className={styles.icon}
            onClick={handleModalClose}
          />
        </div>
        <div className={styles.modalContents}>{children}</div>
      </div>
    </>
  );
};
