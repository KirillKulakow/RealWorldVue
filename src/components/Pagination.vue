<template>
    <ul class="pagination">
        <li class="page-item" v-for="page in pages" :key="page" :class="{active: currentPage === page}">
            <router-link class="page-link" :to="{path: url, query: {page: page}}">
                {{page}}
            </router-link>
        </li>
    </ul>
</template>

<script>
    export default {
        name: "McvPagination",
        props: {
            total: {
                type: Number,
                required: true
            },
            limit: {
                type: Number,
                required: true
            },
            currentPage: {
                type: Number,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        },
        computed: {
            pages(){
                const pagesCount = Math.ceil(this.total / this.limit)
                return [...new Array(pagesCount)].map((el, index) => (el = index + 1))
            }
        }
    }
</script>
