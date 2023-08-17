import { useParams } from "react-router-dom";
import styles from "./Ad.module.scss";
import { Button } from "../../ui/button/Button.jsx";
import { useQuery } from "@tanstack/react-query";
import { AdService } from "../../../services/ad.service.js";

export const Ad = () => {
  const { id } = useParams();
  const { data, isLoading } = useQuery(["adInfo"], () => AdService.getById(id));

  return (
    <div className={styles.container}>
      <p>{data?.title}</p>
      <div className={styles.firstRowCont}>
        <div className={styles.imageCont}></div>
        <div className={styles.sideCont}>
          <p>{data?.price}₽</p>
          <p>Продавец</p>
          <Button>Написать</Button>
        </div>
      </div>
      <p>{data?.description}</p>
    </div>
  );
};
