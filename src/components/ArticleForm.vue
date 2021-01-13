<template>
    <div class="editor-page">
        <div class="container page">
            <div class="row">
                <div class="col-md-10 offset-md-1 col-xs-12">
                    <mcv-validation-errors v-if="errors" :validation-errors="errors"/>
                    <form>
                        <fieldset>
                            <fieldset class="form-group">
                                <input type="text" class="form-control form-contol-lg" placeholder="Article title" v-model="title"/>
                            </fieldset>
                            <fieldset class="form-group">
                                <input type="text" class="form-control form-contol-lg" placeholder="Description" v-model="description"/>
                            </fieldset>
                            <fieldset class="form-group">
                                <textarea class="form-control form-contol-lg" placeholder="What is this article about?" v-model="body"></textarea>
                            </fieldset>
                            <fieldset class="form-group">
                                <input type="text" class="form-control form-contol-lg" placeholder="Enter tags" v-model="tagForm"/>
                                <button class="btn btn-xs btn-primary" @click="addNewTag">Add tags</button>
                            </fieldset>
                            <ul class="tag-list" v-if="tagList.length > 0">
                                <li class="tag-default tag-pill tag-outline" v-for="(tag, index) in tagList" :key="index">
                                    {{tag}}
                                    <i class="ion-trash-a" @click="deleteTag(index)"/>
                                </li>
                            </ul>
                            <fieldset class="form-group">
                                <button class="btn btn-lg pull-xs-right btn-primary" type="submit" :disabled="isSubmiting" @click.prevent="onSubmit">Publish Article</button>
                            </fieldset>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import McvValidationErrors from '@/components/ValidationErrors'
    export default {
        name: 'McvArticleForm',
        props: {
            initialValues: {
                type: Object,
                required: true
            },
            errors: {
                type: Object,
                required: false
            },
            isSubmiting: {
                type: Boolean,
                required: true
            }
        },
        data (){
            return {
                title: this.initialValues.title,
                body: this.initialValues.body,
                description: this.initialValues.description,
                tagForm: '',
                tagList: this.initialValues.tagList
            }
        },
        methods: {
            onSubmit(){
                const form = {
                    title: this.title,
                    body: this.body,
                    description: this.description,
                    tagList: this.tagList
                }
                this.$emit('article-submit', form)
            },
            addNewTag(){
                const oldTags = this.tagList
                this.tagList = [...oldTags, this.tagForm]
                this.tagForm = ''
            },
            deleteTag(index){
                const newTags = this.tagList.filter((el, inx) => {
                    return inx !== index
                })
                this.tagList = newTags
            }
        },
        components: {
            McvValidationErrors
        }
    }
</script>
