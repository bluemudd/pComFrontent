<template>
  <v-app>
    <v-container>
      <v-text-field
          v-model="body.title"
          :rules="rules.titleRules"
          label="제목"
          outlined
      >

      </v-text-field>
      <v-textarea
          v-model="body.contents"
          :rules="rules.contentRules"
          label="내용"
          no-resize

          outlined
          rows="30"
      >

      </v-textarea>
      <v-btn class="float-right" color="primary" @click="updateExecute">글쓰기</v-btn>

    </v-container>
  </v-app>
</template>

<script>
import axios from 'axios';
export default {
  data (){
      return {
        id: this.$route.params.id,
        body: [],
        rules: {
          titleRules: [],
          contentRules: []
        }
    }
  },
  created(){
        this.updateBoard()
    },
    methods: {
    async updateBoard(){
      try{
        await axios
        .get(`http://localhost:8081/AgoraPostMade/AgoraUpdate/${this.id}`)
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
    async updateExecute(){
      try{
        await axios
        .patch(`http://localhost:8081/AgoraPostMad/ExecuteUpdate/${this.id}`,
        JSON.stringify(this.body),
        {headers : {'content-type' : 'application/json'}})
      }catch(error){
        console.log(error);
      }
      this.$router.push({ name: 'agora-detail', params: { id: this.id }})
    },
    setRules() {
            this.rules.titleRules = [
                v => !!v || '제목을 입력해주세요.',
                v => v.length <= 20 || '20자 이내로 작성해주세요.',
            ],
            this.rules.contentRules = [
                v => !!v || '내용을 입력해주세요.',
                v => v.length <= 500 || '500자 이내로 작성해주세요.',
            ]
        }

}
}
</script>