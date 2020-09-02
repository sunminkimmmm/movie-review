<template>
  <div id="app">
    <Nav/>
    <router-view/>
  </div>
</template>

<script>
import {Nav} from './components/component'
export default {
  name: 'App',
  components: {
    Nav
  },
  
}
</script>

<style>
#app{text-align: center; }
</style>
