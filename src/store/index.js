import Vue from "vue"
import Vuex from "vuex"
import router from "../router/index.js"
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        userInfo: null,
        allUsers:[
          {id: 1, name:'muddie', email:'parkjm0817@naver.com', password:'123'},
          {id: 2, name:'muddie', email:'nafla@naver.com', password:'123'}
      ],
      isLogin:false,
      isLoginError: false,
      },
    getters: {

    },
    mutations: {
        // 로그인 성공시
        loginSuccess(state, payload) {
          state.isLogin = true
          state.isLoginError = false
          state.userInfo = payload
          localStorage.setItem('user', JSON.stringify(payload))
          axios.defaults.headers.common['Authorization']=payload.token
        },
        // 로그인 실패시
        loginError(state){
          state.isLogin=false
          state.isLoginError= true
        },
        logout(state){
          state.userInfo=null
          state.isLoginError=false
          state.isLogin= false
          localStorage.removeItem('user')
          axios.defaults.headers.common['Authorization']=null
        },

      },
      actions: {
        // 로그인 시도
        login({commit, state}, loginObj){
          //actions에서 mutation의 함수들을 실행시키기 위해서
          //commit 사용
          // 전체 유저에서 해당 이메일로 유저를 찾는다.
          axios
          .post('http://localhost:8081/login', JSON.stringify(loginObj),
          {headers : {'content-type' : 'application/json'}}) // 파라메터 (body)
          .then(res=>{
            console.log(res)
            console.log(res.headers)
            //성공시 token: 블라블라(실제로는 user_id값을 받아옴)
            //토큰을 헤더에 포함시켜서 유저정보 요청
            let userInfo = {
              // avatar: res.data.data.avatar,
              token: res.headers['accesstoken'],
              email: res.data['email'],
              nickname: res.data['nickname'],
              roles: res.data['roles']
              // id: res.data.data.id,
              // first_name : res.data.data.first_name,
              // last_name : res.data.data.last_name
            }
            commit('loginSuccess', userInfo)
              // axios
              //   .get("https://reqres.in/api/users/2", config)
              //   .then(res=>{
              //     console.log(res);
                  // avatar: "https://reqres.in/img/faces/2-image.jpg"
                  // email: "janet.weaver@reqres.in"
                  // first_name: "Janet"
                  // id: 2
                  // last_name: "Weaver"
                  
                // })
                console.log(state.userInfo)
                router.push({name:"mypage"})
          })
          .catch(error=>{
            alert('이메일 비번 확인 요망')
              console.log(error)
          })
        },
        logout({commit}){
          commit("logout")
          router.push({name:"home"})
        },
        getMemberInfo({commit}){
          let user = JSON.parse(localStorage.getItem('user'));
          console.log(user)
          if(localStorage.getItem('user')!==null){
          axios
          .get('http://localhost:8081/refresh',{
          headers : {'content-type' : 'application/json',
                'Authorization': `${user.token}`}})
          .then(res=>{
            console.log(res)
            let userInfo = {
              // avatar: res.data.data.avatar,
              token: res.headers['accesstoken'],
              email: res.data['email'],
              nickname: res.data['nickname'],
              roles: res.data['roles']
            }
            commit('loginSuccess', userInfo)
        })
      }
            // commit('loginSuccess', localStorage.getItem('user')),
            // console.log(localStorage.getItem('token')))
        }
      },

    modules: {

    },

})