import axios from '@/api/axios'

const getTags = () => {
  return axios.get('/tags').then(res => res.data.tags)
}

export default {
  getTags
}
