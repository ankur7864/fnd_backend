<template>
  <div id="nav-bar">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <router-link class="navbar-brand  nav-menu" to="/">Welcome  <span class="text-primary"> {{ getUserType }} {{ userName }} </span> !</router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ">
        
              <li class="nav-item nav-menu">
                <router-link class="nav-link" @click.prevent='logOut()' to="/login">Logout</router-link>
              </li>
              
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "EngineerNavBar",

  computed : {
    ...mapGetters(['userName' , 'getUserType']),
  },

  methods : {

     logOut() {  

            localStorage.clear();
            this.$router.replace('/login');
        },
  }
};
</script>

<style>
#nav-bar {
  top: 0;
  box-shadow: 5px 5px 10px rgb(145, 143, 143);
  position: fixed;
  width: 100%;
}
</style>