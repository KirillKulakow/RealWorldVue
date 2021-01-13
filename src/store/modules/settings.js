import {mutationsTypes as authMutationTypes} from '@/store/modules/auth'

const state = {
  isSubmiting: false,
  validationErrors: null
}

const mutations = {
  [authMutationTypes.updateCurrentUserRequest](state) {
    state.isSubmiting = true
    state.validationErrors = null
  },
  [authMutationTypes.updateCurrentUserSuccess](state) {
    state.isSubmiting = false
  },
  [authMutationTypes.updateCurrentUserFailed](
    state,
    payload
  ) {
    state.isSubmiting = false
    state.validationErrors = payload
  }
}

export default {
  state,
  mutations
}
