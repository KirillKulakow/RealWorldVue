<template>
    <ul class="tag-list">
        <li class="tag-default tag-pill tag-outline" v-for="(tag, index) in tags" :key="index">{{tag}}</li>
    </ul>
</template>

<script>
    export default {
        name: "McvTagList",
        props: {
            tags: {
                type: Array,
                required: false,
                default(){ return []} 
            }
        }
    }
</script>