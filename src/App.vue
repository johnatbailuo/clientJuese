<script >
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue';

export default{
  components: {
    NavBar,
    RouterLink,
    RouterView
  },
  
}
</script>

<template>
  <NavBar v-if="!$route.meta.hideNavbar"/>
  <!-- <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header> -->
  <RouterView />
</template>

<style scoped>

</style>
