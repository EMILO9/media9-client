<template>
  <div class="register">
    Register
    <input type="email" placeholder="email" v-model="email">
    <input type="password" placeholder="password" v-model="password">
    <button @click="register">register</button>
    </div>
</template>

<script>
const axios = require('axios');
export default {
  name: "Register",
  data: () => {
    return {
      email: "",
      password: ""
    }
  },
  methods: {
    register () {
      axios.post("https://media9.herokuapp.com/register", {email: this.email, password: this.password})
      .then(r => {
        console.log(r)
      })
      .catch(err => {
        console.log(err.response.data)
      }) 
    }
  }
};
</script>
