import styles from './Header.module.scss'
import { Logo } from '../logo/Logo.jsx'
import { Link, NavLink, useNavigate, useSearchParams } from 'react-router-dom'
import { FiUser } from 'react-icons/fi'
import Hamburger from '../hamburger/Hamburger.jsx'
import { IoMdAddCircleOutline } from 'react-icons/io'
import { useQueryClient } from '@tanstack/react-query'

export const Header = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const queryClient = useQueryClient()
  const nav = useNavigate()

  const handleFind = (e) => {
    e.preventDefault()
    nav('/')
    setSearchParams({ query: e.target.search.value })
    queryClient.invalidateQueries(['ads'])
  }

  return (
    <div className={styles.cont}>
      <Link to="/">
        <Logo />
      </Link>
      <div>
        <NavLink to="/">Главная</NavLink>
      </div>
      <div>
        <Hamburger text="Категории" />
      </div>
      <form autoComplete="off" onSubmit={(e) => handleFind(e)}>
        <input type="search" placeholder="Поиск" name="search" />
      </form>
      <div className={styles.plusCont}>
        <Link to="ad/create">
          Создать
          <IoMdAddCircleOutline style={{ fontSize: '25px' }} />
        </Link>
      </div>
      <div className={styles.profileButton}>
        <Link to="profile">
          Профиль
          <FiUser />
        </Link>
      </div>
    </div>
  )
}
