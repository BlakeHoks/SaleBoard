import Cookies from 'js-cookie'

export const authHeader = {
  Authorization: `Bearer ${Cookies.get('access_token')}`,
}
