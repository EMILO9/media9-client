<template>
  <div class="login">
    Login
    <input type="email" placeholder="email" v-model="email">
    <input type="password" placeholder="password" v-model="password">
    <button @click="login">login</button>
  </div>
</template>

<script>
const axios = require('axios');
export default {
  name: "Login",
  data: () => {
    return {
      email: "",
      password: ""
    }
  },
  methods: {
    login () {
      axios.post("https://media9.herokuapp.com/login", {email: this.email, password: this.password})
      .then(r => {
        console.log(r)
        this.$store.commit("setUser", r.data);
        localStorage.setItem('user', JSON.stringify(r.data));
        this.$router.push("/account");
      })
      .catch(err => {
        console.log(err.response.data)
      })
    }
  }
};
</script>
