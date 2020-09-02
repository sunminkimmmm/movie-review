import Vue from 'vue'
import Router from 'vue-router'
import  {
  main,
  SignUp,
  SignIn,
  movieRegister
  }  from '@/components/container/';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: main
    },
    
    {
      path: '/signin',
      name: 'SignIn', 
      component: SignIn,
    },
    {
      path: '/signup',
      name: 'SignUp', 
      component: SignUp,
    },
    {
      path: '/movieRegister',
      name: 'movieRegister', 
      component: movieRegister,
    },

  ]
})