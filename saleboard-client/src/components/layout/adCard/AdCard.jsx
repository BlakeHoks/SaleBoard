import styles from "./AdCard.module.scss";

export const AdCard = ({ title, img, price }) => {
  return (
    <div className={styles.container}>
      <p>{title}</p>
      <p>{price}₽</p>
      <div>{img}</div>
    </div>
  );
};
