import styles from './AdCard.module.scss'
import { useNavigate } from 'react-router-dom'

export const AdCard = ({ id, title, img, price, description, authorName }) => {
  const nav = useNavigate()

  return (
    <div className={styles.container} onClick={() => nav(`/ad/${id}`)}>
      <div className={styles.adCont}>
        <div>
          <img src={`uploads/ads-images/${img[0]}`} alt="Фото" />
        </div>
        <div>
          <p className={styles.title}>{title}</p>
          <p>{Number(price).toLocaleString('ru')}₽</p>
          <p className={styles.desc}>{description}</p>
        </div>
      </div>
      {authorName && (
        <div className={styles.authorCont}>
          <p
            onClick={() => {
              nav('/')
            }}
          >
            {authorName}
          </p>
        </div>
      )}
    </div>
  )
}
