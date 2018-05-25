<template>
  <div id="app" ref="app">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    HelloWorld
  }
}
</script>

<style>
  html,body,#app{
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }
</style>
