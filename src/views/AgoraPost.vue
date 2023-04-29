<template>
    <v-app>
      <v-container>
        <v-text-field
            v-model="board.title"
            :rules="rules.titleRules"
            label="제목"
            outlined
        >
  
        </v-text-field>
        <v-textarea
            v-model="board.contents"
            :rules="rules.contentRules"
            label="내용"
            no-resize
  
            outlined
            rows="30"
        >
  
        </v-textarea>
        <v-btn class="float-right" color="primary" @click="createBoard">글쓰기</v-btn>
  
      </v-container>
    </v-app>
  
  </template>
  <script>
    import axios from 'axios';
  export default {
    name: "BoardWrite",
    data() {
      return {
        board: {
          title: '',
          contents: ''
        },
        rules: {
          titleRules: [],
          contentRules: []
        }
      }
    },
    methods :{
        async createBoard() {
            try{
                await axios
                .post(`http://localhost:8081/AgoraPostMade/AgoraPost`, JSON.stringify(this.board),
                {headers : {'content-type' : 'application/json'}})
            }
            catch(error){
                console.log(error);
            }
            this.$router.push({name:'Agora'})

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
    },
}
</script>