import { useForm } from 'react-hook-form'
import styles from './AdCreate.module.scss'
import { Button } from '../../ui/button/Button.jsx'
import { useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { AdService } from '../../../services/ad.service.js'
import { BsImages } from 'react-icons/bs'
import { useState } from 'react'

export const AdCreate = () => {
  const nav = useNavigate()
  const [pickedImages, setPickedImages] = useState([])

  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm()

  const { mutate } = useMutation(
    ['createAd'],
    (data) => AdService.create(data),
    {
      onSuccess: (data) => {
        console.log('Success', data)
        nav(`/ad/${data.id}`)
      },
    }
  )

  const onSubmit = (data) => {
    const formData = new FormData()
    formData.append('title', data.title)
    formData.append('price', data.price)
    formData.append('description', data.description)
    formData.append('authorId', data.authorId)
    formData.append('address', data.address)
    formData.append('categoryName', data.categoryName)
    for (let i = 0; i < data.images.length; i++) {
      formData.append('images', data.images[i])
    }
    mutate(formData)
  }

  const validateNumberOfImages = (value) => {
    return value.length <= 10 || 'Максимально возможно загрузить 10 фотографий'
  }

  return (
    <div className={styles.container}>
      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            type="text"
            placeholder="Название"
            {...register('title', { required: true })}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Цена"
            {...register('price', { required: true, valueAsNumber: true })}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Описание"
            {...register('description', { required: true })}
          />
        </div>
        <div>
          <input
            type="number"
            placeholder="authorId"
            {...register('authorId', { required: true, valueAsNumber: true })}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Адрес"
            {...register('address', { required: true })}
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="categoryName"
            {...register('categoryName', { required: true })}
          />
        </div>
        <div>
          <label>
            Загрузить фотографии
            <input
              className={styles.file}
              type="file"
              accept="image/*"
              multiple
              {...register('images', {
                validate: (value) => validateNumberOfImages(value),
              })}
            />
            <BsImages />
          </label>
          {errors.images && <span>{errors.images.message}</span>}
        </div>
        <Button>Создать</Button>
      </form>
    </div>
  )
}
