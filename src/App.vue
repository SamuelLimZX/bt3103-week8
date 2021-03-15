<template>

  <div>

    <app-header></app-header>
    <router-view></router-view>
    <br>

  </div>
</template>

<script>
import Header from './components/Header.vue' 
  export default {
    data() {
      return {
        title:"Shef Home Page"
      }
    },
    components: {
      'app-header': Header
    }
  }
</script>

<style>

</style>
