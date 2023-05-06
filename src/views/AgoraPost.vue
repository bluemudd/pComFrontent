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
        <!-- <v-row>
          <v-col>
            <v-file-input class="input" type="file" counter show-size label="이미지 제출(여러개 가능)"
                outlined dense multiple prepend-icon="mdi-camera" style="width: 400px; margin-left: 100px;"
                @change="onImageChange"/>
          </v-col>
        </v-row>
        <v-row>

        </v-row> -->
        <v-btn class="float-right" color="primary" @click="createBoard">글쓰기</v-btn>
       
        <!-- <v-img v-for="(item, i) in imagelist" :key="i" :src="require(`../../../node-back/uploads/${item}`)"
       contain height="150px" width="200px" style="border: 2px solid black; margin-left:100px;"/> -->
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
        uploadimageurl: [],    // 업로드한 이미지의 미리보기 기능을 위해 url 저장하는 객체
        imagecnt: 0,        // 업로드한 이미지 개수 => 제출버튼 클릭시 back서버와 axios 통신하게 되는데, 이 때 이 값도 넘겨줌
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
        onImageChange(file){
          if(!file){
            return;
          }
          const formData = new FormDate();
          this.uploadimageurl = [];
          file.forEach((item)=>{
            formData.append('filelist',item)
            const reader = new FileReader();
            read.onload = (e)=>{
              this.uploadimageurl.push({url: e.target.result});
            };
            reader.readAsDataURL(item);
          });

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