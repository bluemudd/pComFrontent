<template>
    <v-app>
        <v-container>
            <v-card
                min-height="1000">
                <v-card-title>{{body.title}}</v-card-title>
                <v-card-text>
                    작성자: {{ body.nickname }}<br>
                    조회수: {{ body.views}}<br>
                    <small>작성일자: {{ body.createTime.substring(0,10) }}</small>
                    <small v-if="body.updateTime != null">수정일자{{ body.updateTime.substring(0,10) }}</small>
                </v-card-text>
                <v-divider class="mx-4"></v-divider>
                <v-row style="height: 800px">
                <v-card-subtitle min-height="1000">
                    {{ body.content }}
                </v-card-subtitle>
              </v-row>
                <v-row align="center"
                justify="center">
                <v-card-actions class="btn-xs-right">
                  <v-btn v-if="body.dolike" flat color="blue lighten-2" @click="unlike">
                    <div>
                      추천완료
                    </div>
                    {{ body.likes }}
                    <v-icon color="`${btnC}`">thumb_up</v-icon>
                  </v-btn>
                  <v-btn v-else flat color="blue lighten-2" @click="pressLike">
                    <div>
                      추천
                    </div>
                    {{ body.likes }}
                    <v-icon color="`${btnC}`">thumb_up</v-icon>
                  </v-btn>
                </v-card-actions>
                </v-row>
              </v-card>

            <!-- </v-data-table> -->
            <v-data-table
              :items="body.comments"
              class="elevation-1"
            >
            <template v-slot:item="props">
              <tr height="200">
                <td width="200">
                  {{props.item.nickname}}
                </td>
                <td>
                  {{ props.item.content }}
                </td>
              </tr>
            </template>
            </v-data-table>
            <v-textarea
            v-model="comment"
            label="댓글쓰기"
            no-resize
            v-if="this.$store.state.isLogin"
            outlined
            rows="3"
        >
      
            </v-textarea>
          <v-btn class="float-right" color="primary" @click="addComment" v-if="this.$store.state.isLogin">확인</v-btn>
            <v-col>
                <v-row dense>
                      
                        <v-btn :to="{name: 'Agora'}">목록</v-btn>
                        <v-btn flat v-if="(body.email == this.$store.state.userInfo.email)&&(body.nickname == this.$store.state.userInfo.nickname)" :to="{name: 'agora-update', params: { id: this.id }}">수정</v-btn>
                        <v-btn flat v-if="(body.email == this.$store.state.userInfo.email)&&(body.nickname == this.$store.state.userInfo.nickname)" @click="deleteBoard">삭제</v-btn>
                </v-row>
            </v-col>
           
        </v-container>
    </v-app>
</template>
<script>
import axios from 'axios';
export default {
    data (){
      return {
        good: "추천",
        id: this.$route.params.id,
        body: [],
        comment: '',
      contents: [
        { nickname: "까미", title: 'ABC', opinion: 'Good', id: 1 , replyCount: 1, createDate:"2023-01-03",
            content: "[영등포신문=신민수 기자] 서울지방병무청(청장 김주영)은 최근 사이버상에서 증가하는 병역면탈 조장정보를 차단하여 공정하고 정의로운 병역이행 문화를 조성하기 위해‘병역면탈 조장정보 시민감시단’을 모집한다고 밝혔다."},  
      ]
    }
  },
    created(){
        this.getBoard()
    },
    methods: {
    async getBoard(){
      try{
        await axios
        .get(`http://localhost:8081/AgoraDetail/`+this.id)
        .then((res) =>{
          this.body=res.data;
            console.log(this.body);
        })
        .catch((error) =>{
          console.log(error)
        })
      }catch(error){
        console.log(error);
      }
    },
    async deleteBoard(){
        try{
          await axios
          .delete(`http://localhost:8081/AgoraPostMade/AgoraDelete/${this.id}`)
        }
        catch(error){
          console.log(error);
        }
        this.$router.push({name:'Agora'})
    },
    async addComment(){
      try{
        await axios
        .post(`http://localhost:8081/AgoraPostMade/AgoraComment/${this.id}`,
       JSON.stringify(this.comment),
       {headers : {'content-type' : 'application/json'}})
      }
      catch(error){
        console.log(error)
      }
      this.$router.go(0);
    },
    async pressLike(){
      try{
        await axios
        .post(`http://localhost:8081/AgoraPostMade/AgoraHeart/${this.id}`)
      }
      catch(error){
        console.log(error)
      }
      this.$router.go(0);

    },
    async unlike(){
        try{
          await axios
          .delete(`http://localhost:8081/AgoraPostMade/deleteHeart/${this.id}`)
        }
        catch(error){
          console.log(error);
        }
        this.$router.go(0);
    },
    }
}
</script>