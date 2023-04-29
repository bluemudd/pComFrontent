<template>
    <v-container fluid>
      <v-row dense>
        <v-col :cols="12">
        <v-data-table
            :headers="headers"
            :items="body"
            class="elevation-1"
        >
        <template v-slot:item="props">
          <tr>
            <td width="750">
              <router-link :to="{ name: 'agora-detail', params: { id: props.item.id }}" style="color: black; text-decoration: none">

                {{ props.item.title }}
              <small>({{ props.item.commentsCount }})</small>
              </router-link> 
            </td>
              

            <td width="200">{{ props.item.nickname }}</td>
            <td align="center" width="150">{{ props.item.views }}</td>
            <!-- <td align="center" width="150">{{ contents.read }}</td>
            <td v-if="boardList.item.createDate" width="200">{{ boardList.item.createDate.substring(0, 10) }}</td> -->
           </tr>
        </template>
      </v-data-table>
        </v-col>
        <v-col>
                <v-row dense>
                        <v-btn :to="{name: 'agora-post'}">글쓰기</v-btn>
                </v-row>
            </v-col>
      </v-row>
    </v-container>

</template>
<script>
import axios from 'axios'
export default {
    data (){
      return {
      headers: [
        { text: 'TITLE', value: 'title' },
        { text: 'NICKNAME', value: 'nickname' },
        { text: 'OPINION', value: 'views' },
      ],
      body: []
    }
  },
  created() {
    this.getData();
  },
  methods: {
    async getData(){
      try{
        await axios
        .get('http://localhost:8081/AgoraHome')
        .then((res) =>{
          this.body=res.data;

        })
        .catch((error) =>{
          console.log(error)
        })
      }catch(error){
        console.log(error);
      }
    }
    }
}
</script>