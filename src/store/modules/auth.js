import authApi from '@/api/auth'
import {setItem} from '@/helpers/persistanceStorage'

const state = {
  isSubmiting: false,
  isLoading: false,
  currentUser: null,
  validationErrors: null,
  isLogedIn: false
}

export const mutationsTypes = {
  registerRequest: '[auth] registerRequest',
  registerSuccess: '[auth] registerSuccess',
  registerFailed: '[auth] registerFailed',

  loginRequest: '[auth] loginRequest',
  loginSuccess: '[auth] loginSuccess',
  loginFailed: '[auth] loginFailed',

  getCurrentUserRequest: '[auth] getCurrentUserRequest',
  getCurrentUserSuccess: '[auth] getCurrentUserSuccess',
  getCurrentUserFailed: '[auth] getCurrentUserFailed',

  updateCurrentUserRequest:
    '[auth] updateCurrentUserRequest',
  updateCurrentUserSuccess:
    '[auth] updateCurrentUserSuccess',
  updateCurrentUserFailed: '[auth] updateCurrentUserFailed',

  logout: '[auth] logout',
}

export const actionTypes = {
  register: '[auth] register',
  login: '[auth] login',
  getCurrentUser: '[auth] getCurrentUser',
  updateCurrentUser: '[auth] updateCurrentUser',
  logout: '[auth] logout'
}

export const getterTypes = {
  currentUser: '[auth] currentUser',
  isLogedIn: '[auth] isLogedIn',
  isAnonymus: '[auth] isAnonymus'
}

const getters = {
  [getterTypes.currentUser]: state => {
    return state.currentUser
  },
  [getterTypes.isLogedIn]: state => {
    return !!state.isLogedIn
  },
  [getterTypes.isAnonymus]: state => {
    return state.isLogedIn === false
  }
}

const mutations = {
  [mutationsTypes.registerRequest](state) {
    state.isSubmiting = true
    state.validationErrors = null
  },
  [mutationsTypes.registerSuccess](state, payload) {
    state.isSubmiting = false
    state.currentUser = payload
    state.isLogedIn = true
  },
  [mutationsTypes.registerFailed](state, payload) {
    state.isSubmiting = false
    state.validationErrors = payload
  },

  [mutationsTypes.loginRequest](state) {
    state.isSubmiting = true
    state.validationErrors = null
  },
  [mutationsTypes.loginSuccess](state, payload) {
    state.isSubmiting = false
    state.currentUser = payload
    state.isLogedIn = true
  },
  [mutationsTypes.loginFailed](state, payload) {
    state.isSubmiting = false
    state.validationErrors = payload
  },

  [mutationsTypes.getCurrentUserRequest](state) {
    state.isLoading = true
    state.validationErrors = null
  },
  [mutationsTypes.getCurrentUserSuccess](state, payload) {
    state.isLoading = false
    state.currentUser = payload
    state.isLogedIn = true
  },
  [mutationsTypes.getCurrentUserFailed](state, payload) {
    state.isLoading = false
    state.isLogedIn = false
    state.currentUser = null
    state.validationErrors = payload
  },

  [mutationsTypes.updateCurrentUserRequest]() {},
  [mutationsTypes.updateCurrentUserSuccess](
    state,
    payload
  ) {
    state.currentUser = payload
  },
  [mutationsTypes.updateCurrentUserFailed]() {},
  [mutationsTypes.logout](state){
    state.currentUser = null
    state.isLogedIn = false
  }
}

const actions = {
  [actionTypes.register](context, credentials) {
    return new Promise(resolve => {
      context.commit(mutationsTypes.registerRequest)
      authApi
        .register(credentials)
        .then(response => {
          context.commit(
            mutationsTypes.registerSuccess,
            response.data.user
          ),
            resolve(response.data.user),
            setItem('accessToken', response.data.user.token)
        })
        .catch(err => {
          context.commit(
            mutationsTypes.registerFailed,
            err.response.data.errors
          )
        })
    })
  },
  [actionTypes.login](context, credentials) {
    return new Promise(resolve => {
      context.commit(mutationsTypes.loginRequest)
      authApi
        .login(credentials)
        .then(response => {
          context.commit(
            mutationsTypes.loginSuccess,
            response.data.user
          ),
            resolve(response.data.user),
            setItem('accessToken', response.data.user.token)
        })
        .catch(err => {
          context.commit(
            mutationsTypes.loginFailed,
            err.response.data.errors
          )
        })
    })
  },
  [actionTypes.getCurrentUser](context) {
    return new Promise(resolve => {
      context.commit(mutationsTypes.getCurrentUserRequest)
      authApi
        .getCurrentUser()
        .then(response => {
          context.commit(
            mutationsTypes.getCurrentUserSuccess,
            response.data.user
          ),
            resolve(response.data.user)
        })
        .catch(err => {
          context.commit(
            mutationsTypes.getCurrentUserFailed,
            err.response.data.errors
          )
        })
    })
  },
  [actionTypes.updateCurrentUser](
    context,
    {currentUserInput}
  ) {
    return new Promise(resolve => {
      context.commit(
        mutationsTypes.updateCurrentUserRequest
      )
      authApi
        .updateCurrentUser(currentUserInput)
        .then(user => {
          context.commit(
            mutationsTypes.updateCurrentUserSuccess,
            user
          ),
            resolve(user)
        })
        .catch(err => {
          context.commit(
            mutationsTypes.updateCurrentUserFailed,
            err.response.data.errors
          )
        })
    })
  },
  [actionTypes.logout](context){
    return new Promise (resolve => {
      setItem('accessToken', '')
      context.commit(mutationsTypes.logout)
      resolve()
    })
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
