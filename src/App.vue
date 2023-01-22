<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
}
</script>

<style>
@import './assets/external/normalize.css/normalize.css';
@import './assets/external/@fortawesome/fontawesome-free/css/all.min.css';

#app {
 font-family: 'Nunito', sans-serif;
}

</style>
