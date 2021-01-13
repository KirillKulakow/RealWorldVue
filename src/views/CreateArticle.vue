<template>
    <div>
        <mcv-article-form
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
    import {actionTypes} from '@/store/modules/createArticle'

    export default {
        name: "McvCreateArticle",
        data() {
            return {
                initialValues: {
                    title: '',
                    body: '',
                    description: '',
                    tagList: [],
                }
            }
        },
        methods: {
            onSubmit(articleInput){
                this.$store.dispatch(actionTypes.createArticle, {article: articleInput})
                .then(article => this.$router.push({name: 'article', params: {slug: article.slug}}))
            }
        },
        components: {
            McvArticleForm
        },
        computed: {
            ...mapState({
                isSubmiting: state => state.createArticle.isSubmiting,
                validationErrors: state => state.createArticle.validationErrors
            })
        }
    }
</script>