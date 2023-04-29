<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
    <v-app-bar-nav-icon @click="drawer = !drawer"/>

      <v-spacer/>


    </v-app-bar>
    <v-navigation-drawer v-model="drawer" app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title v-if="isLogin" class="text-h6">
            {{ userInfo.name }}
          </v-list-item-title>
          <v-list-item-title v-else class="text-h6">
            none
          </v-list-item-title>
          <v-list-item-subtitle v-if="isLogin">
            {{ userInfo.email }}
          </v-list-item-subtitle>
          <v-list-item-subtitle v-else>
            none
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>


        <v-divider></v-divider>

        <v-list dense nav>

          <!-- <v-list-item prepend-icon="mdi-home-city" title="Home" value="home"></v-list-item>
          <v-list-item prepend-icon="mdi-account" title="My Account" value="account"></v-list-item>
          <v-list-item prepend-icon="mdi-account-group-outline" title="Users" value="users"></v-list-item> -->
          <v-list-item v-for="item in items" :key="item.title" link :to="item.to">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.title }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
    <v-main>
      <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Application</v-toolbar-title>
      <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn flat v-if="isLogin" router :to="{name: 'mypage'}">마이페이지</v-btn>
          <v-btn flat v-if="isLogin" @click="$store.dispatch('logout')">로그아웃</v-btn>
          <v-btn flat v-else router :to="{name: 'login'}">Log in</v-btn>
        </v-toolbar-items>
    </v-app-bar>
      <v-container fluid>
      <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

import {mapState, mapActions} from "vuex"
export default {
  name: 'App',
  components:{

  },
  data () {
      return {
        drawer: false,
        items: [
          { title: 'Home', icon: 'mdi-home-city', to: '/' },
          { title: "Login", icon: 'widgets', to: '/login'},
          { title: 'Mypage', icon: 'widgets', to: '/mypage'},
          { title: 'Policy', icon: 'gavel', to: '/policy'},
          { title: 'Agora', icon: 'folder_open', to: '/agora'},
          { title: 'Menifesto', icon:'widgets', to: '/menifesto'},

        ],
        rail: true,
      }
    },
    computed:{
      ...mapState(["isLogin", "userInfo"])
    },
    methods: {
      ...mapActions(["logout"])
    }
};
</script>
