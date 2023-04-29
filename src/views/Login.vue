<template>
    <v-container fill-height style="max-width:450px;" >
        <v-row  row wrap dense align="center">
            <v-col>
                <v-alert
                class="mb-3"
                :value="isLoginError"
                type="error"
                >
                아이디와 비밀번호를 확인해주세요
                </v-alert>
                <v-alert
                class="mb-3"
                :value="isLogin"
                type="success"
                >
                로그인이 완료되었습니다.
                </v-alert>
                <v-card class="pa-3">
                    <v-toolbar flat>
                        <v-toolbar-title>로그인</v-toolbar-title>
                        </v-toolbar>
                <div>
                <v-text-field
                    v-model="email"
                    label="E-mail"
                ></v-text-field>
                <v-text-field
                    type="password"
                    v-model="password"
                    label="Password"
                ></v-text-field>
                <v-row justify="end" dense>
                <v-btn @click="login({
                    email: email,
                    password: password
                })" color="primary" large block depressed>로그인</v-btn>
                </v-row>
                </div>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import { mapState, mapActions} from "vuex"
export default {
    data(){
        return{
            // email:null,
            // password:null,
            // allUsers:[
            //     {id: 1, name:'muddie', email:'parkjm0817@naver.com', password:'123'},
            //     {id: 2, name:'muddie', email:'nafla@naver.com', password:'123'}
            // ],
        }
    },
    computed: {
        ...mapState(["isLogin", "isLoginError"])
    },
    methods: {
        ... mapActions(["login"])
    }
}
</script>