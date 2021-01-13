import articleApi from '@/api/article'

const state = {
  isSubmiting: false,
  validationErrors: null,
  isLoading: false,
  article: null
}

export const mutationTypes = {
  updateArticleRequest:
    '[updateArticle] update Article Request',
  updateArticleSuccess:
    '[updateArticle] update Article Success',
  updateArticleFailed:
    '[updateArticle] update Article Failed',
  getArticleRequest: '[updateArticle] get Article Request',
  getArticleSuccess: '[updateArticle] get Article Success',
  getArticleFailed: '[updateArticle] get Article Failed'
}

export const actionTypes = {
  updateArticle: '[updateArticle] update Article',
  getArticle: '[updateArticle] get Article'
}

const mutations = {
  [mutationTypes.updateArticleRequest]: state => {
    state.isSubmiting = true
  },
  [mutationTypes.updateArticleSuccess]: state => {
    state.isSubmiting = false
  },
  [mutationTypes.updateArticleFailed]: (state, payload) => {
    state.isSubmiting = false
    state.validationErrors = payload
  },
  [mutationTypes.getArticleRequest]: state => {
    state.isLoading = true
  },
  [mutationTypes.getArticleSuccess]: (state, payload) => {
    state.isLoading = false
    state.article = payload
  },
  [mutationTypes.getArticleFailed]: (state, payload) => {
    state.isLoading = false
    state.validationErrors = payload
  }
}

const actions = {
  [actionTypes.updateArticle](context, {slug, article}) {
    return new Promise(resolve => {
      context.commit(mutationTypes.updateArticleRequest)
      articleApi
        .updateArticle(slug, article)
        .then(article => {
          resolve(article)
          context.commit(
            mutationTypes.updateArticleSuccess,
            article
          )
        })
        .catch(err => {
          context.commit(
            mutationTypes.updateArticleFailed,
            err.response.data.errors
          )
        })
    })
  },
  [actionTypes.getArticle](context, {slug}) {
    return new Promise(resolve => {
      context.commit(mutationTypes.getArticleRequest)
      articleApi
        .getArticle(slug)
        .then(article => {
          resolve(article)
          context.commit(
            mutationTypes.getArticleSuccess,
            article
          )
        })
        .catch(() => {
          context.commit(mutationTypes.updateArticleFailed)
        })
    })
  }
}

export default {
  state,
  actions,
  mutations
}
