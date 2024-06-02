import styles from "./ModalSkeleton.module.scss";

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
          <i onClick={handleModalClose} className={styles.icon} />{" "}
          {/* TODO: Add a suitable icon*/}
        </div>
        <div className={styles.modalContents}>{children}</div>
      </div>
    </>
  );
};
