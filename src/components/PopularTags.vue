<template>
    <div class="sidebar">
          <p>Popular Tags</p>
          <div class="tag-list" v-if="tags">
            <router-link :to="{name: 'tag', params: {slug: tag}}" v-for="(tag, index) in tags" :key="index" class="tag-default tag-pill">
                {{tag}}
            </router-link>
          </div>
          <mcv-loading v-if="isLoading"/>
          <div v-if="tags !== null && tags.length < 1" class="post-preview">
            No tags are here... yet.
          </div>
          <mcv-error-handler v-if="error"/>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import {actionTypes} from '@/store/modules/tags'
    import McvLoading from '@/components/Loading'
    import McvErrorHandler from '@/components/ErrorMessage'

    export default {
        name: 'McvPopularTags',
        computed: {
            ...mapState({
                isLoading: state => state.tags.isLoading,
                tags: state => state.tags.data,
                error: state => state.tags.error
            })
        },
        mounted(){
            this.$store.dispatch(actionTypes.getTags)
        },
        components: {
            McvLoading,
            McvErrorHandler
        }
    }
</script>