import styles from "./Logo.module.scss";

export const Logo = () => {
  return (
    <div className={styles.cont}>
      <img src="/logo.svg" alt="logo" />
    </div>
  );
};
