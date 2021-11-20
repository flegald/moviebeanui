<template>
  <div id="app">
    <NavDrawer />
    <router-view />
  </div>
</template>

<script>
import NavDrawer from '@/components/NavDrawer'
export default {
  name: 'App',
  components: {
    NavDrawer
  }
}
</script>

<style>
</style>
