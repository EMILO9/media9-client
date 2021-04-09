import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Error404 from "../views/Error404.vue";
import Account from "../views/Account.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import store from '../store/index'

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/account",
    name: "Account",
    component: Account,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "*",
    name: "error",
    component: Error404,
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name === 'Account' && !store.state.user) next({ name: 'Login' })
  else next()
  if (to.name === 'Login' && store.state.user) next({ name: 'Home' })
  else next()
  if (to.name === 'Register' && store.state.user) next({ name: 'Home' })
  else next()
})

export default router;
