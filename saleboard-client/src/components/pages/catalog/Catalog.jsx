import { useQuery } from "@tanstack/react-query";
import { AdService } from "../../../services/ad.service.js";
import { AdCard } from "../../layout/adCard/AdCard.jsx";

export const Catalog = ({ category }) => {
  const { data } = useQuery(["ads"], () => AdService.getByCategory(category), {
    onSuccess: (data) => {
      console.log(data);
    },
  });

  return (
    <div>
      <div>Каталог {category}</div>
      <div style={{ display: "flex", flexFlow: "column", gap: "10px" }}>
        {data?.map((ad) => (
          <AdCard
            key={ad.id}
            title={ad.title}
            img={ad.images}
            price={ad.price}
          ></AdCard>
        ))}
      </div>
    </div>
  );
};
