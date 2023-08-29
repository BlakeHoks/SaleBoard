import { useForm } from 'react-hook-form'
import { Button } from '../../ui/button/Button.jsx'
import { useMutation } from '@tanstack/react-query'
import { useLocation, useNavigate } from 'react-router-dom'
import { AuthService } from '../../../services/auth.service.js'
import styles from './Auth.module.scss'
import { useState } from 'react'
import { useAuth } from '../../../hooks/useAuth.js'

export const Auth = () => {
  const nav = useNavigate()
  const location = useLocation()
  const [isLogin, setIsLogin] = useState(true)

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm()

  const { mutate: login } = useMutation(
    ['login'],
    (data) => AuthService.login(data),
    {
      onSuccess: (data) => {
        logIn(data.token)
        nav(`${location.state.prevLoc}`)
      },
    }
  )

  const { mutate: signUp } = useMutation(
    ['register'],
    (data) => AuthService.register(data),
    {
      onSuccess: (data) => {
        logIn(data.token)
        nav(`${location.state.prevLoc}`)
      },
    }
  )

  const onSubmit = (data) => {
    login(data)
  }

  const handleClick = (e) => {
    e.preventDefault()
    const data = getValues()
    console.log(data)
    signUp(data)
  }

  const { logIn } = useAuth()

  //console.log(isAuth);
  return (
    <div>
      <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            placeholder="Email"
            {...register('email', {
              required: { value: true, message: 'Введите Email' },
            })}
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>
        <div>
          <input
            type="password"
            placeholder="Пароль"
            {...register('password', {
              required: { value: true, message: 'Введите пароль' },
              minLength: {
                value: 5,
                message: 'Минимальная длина пароля 5 символов',
              },
            })}
          />
          {errors.password && <span>{errors.password.message}</span>}
        </div>
        <div className={styles.buttonCont}>
          <Button>Войти</Button>
          <button
            style={{ marginLeft: '40px' }}
            className={styles.regButton}
            onClick={(e) => handleClick(e)}
          >
            Зарегистрироваться
          </button>
        </div>
      </form>
    </div>
  )
}
