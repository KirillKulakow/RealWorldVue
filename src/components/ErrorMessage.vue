<template>
    <div>
        {{message}}
    </div>
</template>

<script>
    export default {
        name: 'McvErrorHandler',
        props: {
            message: {
                type: String,
                default: 'Something went wrong'
            }
        }
    }
</script>
