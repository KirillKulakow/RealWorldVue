import articleApi from '@/api/article'

const state = {
  data: null,
  isLoading: false,
  error: null
}

export const mutationTypes = {
  getArticleRequest: '[article] get Article Request',
  getArticleSuccess: '[article] get Article Success',
  getArticleFailed: '[article] get Article Failed',

  deleteArticleRequest: '[article] delete Article Request',
  deleteArticleSuccess: '[article] delete Article Success',
  deleteArticleFailed: '[article] delete Article Failed'
}

export const actionTypes = {
  getArticle: '[article] Get Article',
  deleteArticle: '[article] Delete Article'
}

const mutations = {
  [mutationTypes.getArticleRequest]: state => {
    state.isLoading = true
    state.error = null
    state.data = null
  },
  [mutationTypes.getArticleSuccess]: (state, payload) => {
    state.isLoading = false
    state.data = payload
  },
  [mutationTypes.getArticleFailed]: state => {
    state.isLoading = false
  },
  [mutationTypes.deleteArticleRequest]: () => {},
  [mutationTypes.deleteArticleSuccess]: () => {
    state.data = null
  },
  [mutationTypes.deleteArticleFailed]: () => {}
}

const actions = {
  [actionTypes.getArticle]: (context, {slug}) => {
    return new Promise(resolve => {
      context.commit(mutationTypes.getArticleRequest)
      articleApi
        .getArticle(slug)
        .then(article => {
          context.commit(
            mutationTypes.getArticleSuccess,
            article
          )
          resolve(article)
        })
        .catch(e => {
          console.log(e)
          context.commit(mutationTypes.getArticleFailed)
        })
    })
  },
  [actionTypes.deleteArticle]: (context, {slug}) => {
    return new Promise(resolve => {
      context.commit(mutationTypes.deleteArticleRequest)
      articleApi
        .deleteArticle(slug)
        .then(() => {
          context.commit(mutationTypes.deleteArticleSuccess)
          resolve()
        })
        .catch(() => {
          context.commit(mutationTypes.deleteArticleFailed)
        })
    })
  }
}

export default {
  state,
  actions,
  mutations
}
