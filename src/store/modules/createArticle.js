import articleApi from '@/api/article'

const state = {
  isSubmiting: false,
  validationErrors: null
}

export const mutationTypes = {
  createArticleRequest:
    '[createArticle] Create Article Request',
  createArticleSuccess:
    '[createArticle] Create Article Success',
  createArticleFailed:
    '[createArticle] Create Article Failed'
}

export const actionTypes = {
  createArticle: '[createArticle] Create Article'
}

const mutations = {
  [mutationTypes.createArticleRequest]: state => {
    state.isSubmiting = true
  },
  [mutationTypes.createArticleSuccess]: state => {
    state.isSubmiting = false
  },
  [mutationTypes.createArticleFailed]: (state, payload) => {
    state.isSubmiting = false
    state.validationErrors = payload
  }
}

const actions = {
  [actionTypes.createArticle](context, {article}) {
    return new Promise(resolve => {
      context.commit(mutationTypes.createArticleRequest)
      articleApi
        .createArticle(article)
        .then(article => {
          resolve(article)
          context.commit(
            mutationTypes.createArticleSuccess,
            article
          )
        })
        .catch(err => {
          context.commit(
            mutationTypes.createArticleFailed,
            err.response.data.errors
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
