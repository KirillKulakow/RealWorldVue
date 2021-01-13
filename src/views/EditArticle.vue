<template>
    <div>
        <mcv-loading v-if="isLoading" size="large"/>
        <mcv-article-form
            v-if="initialValues"
            :initial-values="initialValues"
            :errors="validationErrors"
            :is-submiting="isSubmiting"
            @article-submit="onSubmit"
        />
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import McvArticleForm from '@/components/ArticleForm'
    import McvLoading from '@/components/Loading'
    import {actionTypes} from '@/store/modules/editArticle'

    export default {
        name: "McvEditArticle",
        methods: {
            onSubmit(articleInput){
                const slug = this.$route.params.slug
                this.$store.dispatch(actionTypes.updateArticle, {slug, article: articleInput})
                .then(article => this.$router.push({name: 'article', params: {slug: article.slug}}))
            }
        },
        components: {
            McvArticleForm,
            McvLoading
        },
        computed: {
            ...mapState({
                isSubmiting: state => state.editArticle.isSubmiting,
                isLoading: state => state.editArticle.isLoading,
                article: state => state.editArticle.article,
                validationErrors: state => state.editArticle.validationErrors
            }),
            initialValues() {
                if(!this.article){
                    return null
                } else {
                    return {
                        title: this.article.title,
                        body: this.article.body,
                        description: this.article.description,
                        tagList: this.article.tagList,
                    }
                }
            }
        },
        mounted() {
            this.$store.dispatch(actionTypes.getArticle, {slug: this.$route.params.slug})
        }
    }
</script>