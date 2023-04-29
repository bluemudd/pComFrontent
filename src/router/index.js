import Vue from 'vue'
import VueRouter from 'vue-router'
import store from "../store/index.js"
import Home from '@/views/home'
import Agora from '@/views/Agora'
import AgoraPost from '@/views/AgoraPost'
import AgoraUpdate from '@/views/AgoraUpdate'
import Menifesto from '@/views/Menifesto'
import Policy from '@/views/Policy'


Vue.use(VueRouter)

const rejectAuthUser = (to, from, next) =>{
    if(store.state.isLogin === true){
      //이미 로그인된 유저 block
      alert("이미 로그인을 하였습니다.")
      next("/")
    } else{
      next()
    }
  }
  const onlyAuthUser = (to, from, next) =>{
    if(store.state.isLogin === false){
      // 아직 로그인 안된 유저니까 막아야함.
      alert("로그인이 필요합니다.")
      next("/")
    }
    else{
      next()
    }
  }
  const AgoraDetail=()=>{
    return import (/* webpackChunkName: "users-edit" */'@/views/AgoraDetail.vue')
  }
const routes = [
    {
        path:'/',
        name:'Home',
        component: Home 

    },
    {
        path:'/login',
        name: 'login',
        beforeEnter: rejectAuthUser,
        component: () =>
        import(/* webpackChunkName: "about" */ "../views/Login.vue"),
    },
    {
        path:'/agora',
        name:'Agora',
        component: Agora,
    },
    {
      path:'/agora/detail/:id',
      name:'agora-detail',
      component: AgoraDetail
    },
    {
      path:'/agora/post',
      name:'agora-post',
      component: AgoraPost
    },
    {
      path:'/agora/update/:id',
      name:'agora-update',
      component: AgoraUpdate
    },
    {
      path:'/menifesto',
      name:'Mesnifesto',
      component: Menifesto
  },
  {
    path:'/policy',
    name:'policy',
    component: Policy

    },
    {
        path: '/mypage',
        name: "mypage",
        beforeEnter: onlyAuthUser,
        component: () =>
        import(/* webpackChunkName: "about" */ "../views/Mypage.vue"),
    }

]

const router = new VueRouter ({
    mode: 'history',
    routes
})

export default router
