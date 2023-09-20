import axios from 'axios'
import { authHeader } from './headers.js'
import Cookies from 'js-cookie'

export const AuthService = {
  async getUserProfile() {
    console.log()
    return (
      await axios.get('http://127.0.0.1:5000/api/user/profile', {
        headers: {
          Authorization: `Bearer ${Cookies.get('access_token')}`,
        },
      })
    ).data
  },
  async login(data) {
    return (await axios.post('http://127.0.0.1:5000/api/auth/login', data)).data
  },
  async confirm() {
    return (
      await axios.get('http://127.0.0.1:5000/api/auth/confirm', {
        headers: {
          ...authHeader,
        },
      })
    ).data
  },
  async register(data) {
    return (await axios.post('http://127.0.0.1:5000/api/auth/register', data))
      .data
  },
}
