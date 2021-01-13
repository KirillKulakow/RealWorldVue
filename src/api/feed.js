import axios from '@/api/axios'

const getFeed = url => {
  return axios.get(url)
}

export default {
  getFeed
}
