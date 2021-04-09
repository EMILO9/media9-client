<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/account" v-if="this.$store.state.user">Account</router-link> |
      <router-link to="/login" v-if="!this.$store.state.user">Login</router-link> |
      <router-link to="/register" v-if="!this.$store.state.user">Register</router-link> |
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  created() {
    let user = localStorage.getItem('user');
    this.$store.commit('setUser', JSON.parse(user))
  }
}
</script>
