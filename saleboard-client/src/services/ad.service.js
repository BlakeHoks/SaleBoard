import axios from 'axios'

export const AdService = {
  async getAds(category, page, query) {
    const response = await axios.get(
      'http://127.0.0.1:5000/api/ad' +
        (category ? `/category/${category}` : '') +
        `/page/${page}` +
        `/${query}`
    )
    return response.data
  },
  async getAdsByAuthorId(authorId, page, query) {
    console.log(authorId)
    const response = await axios.get(
      `http://127.0.0.1:5000/api/ad/user/${authorId}`
    )
    return response.data
  },
  async getById(id) {
    const response = await axios.get('http://127.0.0.1:5000/api/ad/' + id)
    return response.data
  },
  async create(data) {
    return (await axios.post('http://127.0.0.1:5000/api/ad/', data)).data
  },
}
