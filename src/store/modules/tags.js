import tagsApi from '@/api/tags'

const state = {
  data: null,
  isLoading: false,
  error: null
}

export const mutationTypes = {
  getTagsRequest: '[tags] getTagsRequest',
  getTagsSuccess: '[tags] getTagsSuccess',
  getTagsFailed: '[tags] getTagsFailed'
}

export const actionTypes = {
  getTags: '[tags] Get Tags'
}

const mutations = {
  [mutationTypes.getTagsRequest]: state => {
    state.isLoading = true
    state.error = null
    state.data = null
  },
  [mutationTypes.getTagsSuccess]: (state, payload) => {
    state.isLoading = false
    state.data = payload
  },
  [mutationTypes.getTagsFailed]: state => {
    state.isLoading = false
  }
}

const actions = {
  [actionTypes.getTags]: context => {
    return new Promise(resolve => {
      context.commit(mutationTypes.getTagsRequest)
      tagsApi
        .getTags()
        .then(tags => {
          context.commit(mutationTypes.getTagsSuccess, tags)
          resolve(tags)
        })
        .catch(() => {
          context.commit(mutationTypes.getTagsFailed)
        })
    })
  }
}

export default {
  state,
  actions,
  mutations
}
