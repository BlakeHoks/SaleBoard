import { useDispatch } from 'react-redux'
import { useMemo } from 'react'
import { bindActionCreators } from '@reduxjs/toolkit'
import { actions } from '../store/user/user.slice.js'

export const useActions = () => {
  const dispatch = useDispatch()

  return useMemo(() => bindActionCreators(actions, dispatch), [dispatch])
}
