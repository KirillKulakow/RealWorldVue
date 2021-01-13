<template>
    <button @click="handleLike" :class="{'btn': true, 'btn-sm': true, 'btn-primary': isFavoritedOptimize, 'btn-outline-primary': !isFavoritedOptimize}" :disabled="!isLogedIn">
        <i class="ion-heart"/>
        <span>&nbsp; {{articleCountOptimize}}</span>
    </button>
</template>

<script>
    import {mapGetters} from 'vuex'
    import {actionTypes} from '@/store/modules/favorites'
    import {getterTypes as authGetterTypes} from '@/store/modules/auth'

    export default {
        name: 'McvFavorites',
        props: {
            isFavorited: {
                type: Boolean,
                required: true,
            },
            articleSlug: {
                type: String,
                required: true
            },
            articleCount: {
                type: Number,
                required: true
            }
        },
        data(){
            return {
                isFavoritedOptimize: this.isFavorited,
                articleCountOptimize: this.articleCount,
            }
        },
        methods: {
            handleLike(){
                this.$store.dispatch(actionTypes.addToFavorite, {
                    slug: this.articleSlug,
                    isFavorited: this.isFavoritedOptimize
                })
                if(this.isFavoritedOptimize){
                    this.articleCountOptimize--
                } else {
                    this.articleCountOptimize++
                }
                this.isFavoritedOptimize = !this.isFavoritedOptimize
            }
        },
        computed: {
            ...mapGetters({
                isLogedIn: authGetterTypes.isLogedIn
            })
        }
    }
</script>
