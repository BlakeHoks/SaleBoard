import { useAuth } from '../../../hooks/useAuth.js'
import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { AuthService } from '../../../services/auth.service.js'

export const RequireAuth = () => {
  const { isAuth } = useAuth()
  const nav = useNavigate()

  const { data } = useQuery(['checkAuth'], () => AuthService.confirm(), {
    onSuccess: (data) => {
      console.log(data)
    },
  })

  const prevLoc = window.location.pathname
  if (isAuth) return <Outlet />
  else
    useEffect(() => {
      nav('/auth', {
        replace: true,
        state: { prevLoc: prevLoc },
      })
    })
}
