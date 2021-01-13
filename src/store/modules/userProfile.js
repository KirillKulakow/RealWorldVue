import userProfileApi from '@/api/userProfile'

const state = {
  data: null,
  isLoading: false,
  error: null
}

export const mutationTypes = {
  getUserProfileRequest:
    '[userProfile] getUserProfileRequest',
  getUserProfileSuccess:
    '[userProfile] getUserProfileSuccess',
  getUserProfileFailed: '[userProfile] getUserProfileFailed'
}

export const actionTypes = {
  getUserProfile: '[userProfile] Get UserProfile'
}

const mutations = {
  [mutationTypes.getUserProfileRequest]: state => {
    state.isLoading = true
    state.error = null
    state.data = null
  },
  [mutationTypes.getUserProfileSuccess]: (
    state,
    payload
  ) => {
    state.isLoading = false
    state.data = payload
  },
  [mutationTypes.getUserProfileFailed]: state => {
    state.isLoading = false
  }
}

const actions = {
  [actionTypes.getUserProfile]: (context, {slug}) => {
    return new Promise(resolve => {
      context.commit(mutationTypes.getUserProfileRequest)
      userProfileApi
        .getUserProfile(slug)
        .then(user => {
          context.commit(
            mutationTypes.getUserProfileSuccess,
            user
          )
          resolve(user)
        })
        .catch(e => {
          context.commit(
            mutationTypes.getUserProfileFailed,
            e
          )
        })
    })
  }
}

export default {
  state,
  actions,
  mutations
}
