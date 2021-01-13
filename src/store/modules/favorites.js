import addToFavoriteAPI from '@/api/favorites'

export const mutationTypes = {
  addToFavoriteRequest:
    '[favorites] add to favorites request',
  addToFavoriteSuccess:
    '[favorites] add to favorites success',
  addToFavoriteFailed: '[favorites] add to favorites failed'
}

export const actionTypes = {
  addToFavorite: '[favorites] add to favorites'
}

const mutations = {
  [mutationTypes.addToFavoriteRequest]() {},
  [mutationTypes.addToFavoriteSuccess]() {},
  [mutationTypes.addToFavoriteFailed]() {}
}

const actions = {
  [actionTypes.addToFavorite](
    context,
    {slug, isFavorited}
  ) {
    return new Promise(resolve => {
      context.commit(mutationTypes.addToFavoriteRequest)
      const promise = isFavorited
        ? addToFavoriteAPI.removeFromFavorites(slug)
        : addToFavoriteAPI.addToFavorites(slug)
      promise
        .then(article => {
          context.commit(
            mutationTypes.addToFavoriteSuccess,
            article
          )
          resolve(article)
        })
        .catch(e => {
          context.commit(
            mutationTypes.addToFavoriteSuccess,
            e
          )
        })
    })
  }
}

export default {
  actions,
  mutations
}
