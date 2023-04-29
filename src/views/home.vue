<template>
     <v-container fluid>
      <v-row dense>
        <v-col>
          <v-card  height="400px">
            <v-card-title>Title Name</v-card-title>
            <v-card-subtitle></v-card-subtitle>
          </v-card>
        </v-col>
      </v-row>
      <v-row dense>
        <v-col
          v-for="card in cards"
          :key="card.title"
          :cols="card.flex"
        >
          <v-card  link :to="card.to">
            <v-img
              :src="card.src"
              class="align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
              cover
            >
              <v-card-title class="white--text">
                {{ card.title}}
            </v-card-title>
            </v-img>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-card-text>
                {{card.subtitle}}
              </v-card-text>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <v-row dense>
        <v-col :cols="12">
        <v-data-table
            :headers="headers"
            :items="contents"
        ></v-data-table>
        </v-col>
      </v-row>
    </v-container>
        
</template>
<script>
import {mapState, mapActions} from "vuex"

  export default {
    data: () => ({
      cards: [
        { title: '토론 진행중! Agora!', subtitle:'자신의 의견을 표출해주세요!', to:'/agora',  src: 'https://blog.kakaocdn.net/dn/clz224/btqOtfCcR1N/QNH39vxvxqJKCUzTKYBnQ1/img.png', flex: 12 },
        { title: '구청장의 공약! Menifesto!', subtitle:'구청장의 공약을 확인해봅시다!', to:'/menifesto', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 6 },
        { title: '진행중인 정책은? Policy!', subtitle:'현재 진행중인 정책은 무엇일까요?', to:'/policy', src: 'data:image/jpeg;base64,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', flex: 6 },
      ],
      headers: [
        { text: 'NICKNAME', value: 'nickname' },
        { text: 'Title', value: 'title' },
        { text: 'Opinion', value: 'opinion' },
      ],
      contents: [
        { nickname: 1, title: 'ABC', opinion: 'Good' },
        { nickname: 2, title: 'DEF', opinion: 'Bad' },
        { nickname: 3, title: 'GHI', opinion: 'Good' },
      ]
    }),
    computed:{
      ...mapState(["isLogin", "userInfo"])
    },
    methods: {
      ...mapActions(["logout"])
    }
  }
</script>