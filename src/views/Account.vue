<template>
  <div class="account">
    Account
    <hr>
    Token: {{user.token}}
    <hr>
    Email: {{user.user.email}}
    <hr>
    ID: {{user.user._id}}
    <hr>
    <button @click="logout">logout</button>
    <button @click="addPc">Add pc</button>
    <hr>
    PCS
    <ul>
      <li class="media" v-for="(pc, index) in pcs" :key="pc+index">
        {{pc.name}}
        <button @click="deletePc(pc)">delete ({{pc._id}})</button>
        <input type="file" @change="uploadFile($event, pc)">
        <hr>
        Media
        <hr>
        <div v-for="(media, index) in pc.media" :key="media+index">
          {{index+1}}
          <input type="text" v-model="media.name">
          <input type="text" v-model="media.key">
          <input type="text" v-model="media.duration">
          <input type="text" v-model="media.size">
          <input type="text" v-model="media.type">
          <input type="text" v-model="media.url">
          <button @click="deleteMedia(pc, media)">delete</button>
          <hr>
        </div>
        </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
const axios = require('axios');
export default {
  name: "Account",
  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters([
      'user',
      'pcs'
      // ...
    ])
  },
  created () {
    console.log(this.user.token)
    let config = {
        headers: {
          authorization: `bearer ${this.user.token}`,
        },
      };
      axios
        .get("https://media9.herokuapp.com/pcs", config)
        .then((r) => {
          console.log(r)
          this.$store.commit('setPcs', r.data)
        })
        .catch((err) => {
          console.log(err.response.data)
        });
  },
  methods: {
    logout () {
      localStorage.removeItem("user");
      this.$store.commit("setUser", null);
      this.$router.push("/");
    },
    deletePc (pc) {
      console.log(pc._id)
     let config = {
        headers: {
          authorization: `bearer ${this.user.token}`,
        },
      };
      axios.delete(`https://media9.herokuapp.com/deletePc/${pc._id}`, config)
      .then(r => {
        console.log(r)
        let config = {
        headers: {
          authorization: `bearer ${this.user.token}`,
        },
      };
      axios
        .get("https://media9.herokuapp.com/pcs", config)
        .then((r) => {
          console.log(r)
          this.$store.commit('setPcs', r.data)
        })
        .catch((err) => {
          console.log(err.response.data)
        });
      })
      .catch(error => console.log(error.response.data))
    },
    addPc () {
      let config = {
        headers: {
          authorization: `bearer ${this.user.token}`,
        },
      };
      axios.post("https://media9.herokuapp.com/addPc", {}, config)
      .then(r => {
        console.log(r)
      axios
        .get("https://media9.herokuapp.com/pcs", config)
        .then((r) => {
          console.log(r)
          this.$store.commit('setPcs', r.data)
        })
        .catch((err) => {
          console.log(err.response.data)
        });
      })
      .catch(err => console.log(err.response.data))
    },
    uploadFile (e, pc) {
      var config = {
        headers: {
          authorization: `bearer ${this.user.token}`,
        },
      }
      var myFormData = new FormData();
      myFormData.append('file', e.target.files[0]);
      axios.post(`https://media9.herokuapp.com/addMedia/${pc._id}`, myFormData, config)
      .then(r => {
        console.log(r)
                      axios
        .get("https://media9.herokuapp.com/pcs", config)
        .then((r) => {
          console.log(r)
          this.$store.commit('setPcs', r.data)
        })
        .catch((err) => {
          console.log(err.response.data)
        });
      })
      .catch(err => console.log(err.response.data)) 
    },
    deleteMedia (pc, media) {
            var config = {
        headers: {
          authorization: `bearer ${this.user.token}`,
        },
      }
      axios.delete(`https://media9.herokuapp.com/deleteMedia/${pc._id}/${media.key}`, config)
      .then(r => {
        console.log(r)
                     axios
        .get("https://media9.herokuapp.com/pcs", config)
        .then((r) => {
          this.$store.commit('setPcs', r.data)
        })
        .catch((err) => {
          console.log(err.response.data)
        });
      })
    }
  }
};
</script>

<style scoped>
.media {
  border: solid black 1px;
  padding: 5px;
  margin: 10px;
}
</style>