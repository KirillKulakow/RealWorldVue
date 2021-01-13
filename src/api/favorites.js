import axios from '@/api/axios'

const addToFavorites = slug => {
  return axios
    .post(`/articles/${slug}/favorite`)
    .then(response => response.dara.article)
}

const removeFromFavorites = slug => {
  return axios
    .delete(`/articles/${slug}/favorite`)
    .then(response => response.dara.article)
}

export default {
  addToFavorites,
  removeFromFavorites
}
