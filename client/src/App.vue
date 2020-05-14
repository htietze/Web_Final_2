<template>
  <div id="app">

    <!-- kinda neat, the three components fill in themselves here. -->
    <Header></Header>
    <RouterView></RouterView>
    <Footer></Footer>
    
  </div>
</template>

<script>
// importing components to make the app
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default {
  name: 'App',
  components: {
    Header, Footer
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}
</style>
