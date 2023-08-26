import { useParams } from "react-router-dom";
import styles from "./Ad.module.scss";
import { Button } from "../../ui/button/Button.jsx";
import { useQuery } from "@tanstack/react-query";
import { AdService } from "../../../services/ad.service.js";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useState } from "react";

export const Ad = () => {
  const { id } = useParams();
  const [currentImage, setCurrentImage] = useState(0);
  const { data, isLoading } = useQuery(["adInfo"], () => AdService.getById(id));

  return (
    <div className={styles.container}>
      <p>{data?.title}</p>
      <div className={styles.firstRowCont}>
        <div className={styles.imageCont}>
          {currentImage !== 0 && (
            <div onClick={() => setCurrentImage(currentImage - 1)}>
              <IoIosArrowBack />
            </div>
          )}
          <img
            src={`/uploads/ads-images/${data?.images[currentImage]}`}
            alt="Фото"
          />
          {currentImage + 1 !== data?.images.length && (
            <div
              className={styles.rightArrow}
              onClick={() => setCurrentImage(currentImage + 1)}
            >
              <IoIosArrowForward />
            </div>
          )}
        </div>
        <div className={styles.sideCont}>
          <p>{Number(data?.price).toLocaleString("ru")}₽</p>
          <p>{data?.author.name}</p>
          <Button>Написать</Button>
        </div>
      </div>
      <p>{data?.description}</p>
    </div>
  );
};
