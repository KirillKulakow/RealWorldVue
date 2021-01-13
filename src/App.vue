<template>
  <div>
    <mcv-navbar/>
    <router-view/>
  </div>
</template>

<script>
  import McvNavbar from '@/components/NavBar'
  import {actionTypes} from '@/store/modules/auth'
  export default {
    name: 'McvApp',
    components: {
      McvNavbar
    },
    mounted() {
      return this.$store.dispatch(actionTypes.getCurrentUser)
    }
  }
</script>
