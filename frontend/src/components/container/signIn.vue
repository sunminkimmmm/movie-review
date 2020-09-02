<template>
    <div>
       <form @submit.prevent="Login()">
            <div class="form-group">
                <label for="exampleInputEmail1">이메일을 입력하세요</label>
                <input type="email" class="form-control" v-model="mail" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email">
            </div>
            <div class="form-group">
                <label for="exampleInputPassword1">비밀번호를 입력하세요</label>
                <input type="password" class="form-control" v-model="password" id="exampleInputPassword1" placeholder="Password">
            </div>
            <div class="form-group form-check">
                <input type="checkbox" class="form-check-input" id="exampleCheck1">
                <label class="form-check-label" for="exampleCheck1">이메일 기억하기</label>
            </div>
            <button type="submit" class="btn btn-outline-info">로그인</button>
            </form>
    </div>
</template>
<script>
  export default {
        name : "SignIn",
        data () {
            return {
                mail :"",
                password:""
            }
        },
        methods :{
            
            /*Login() {
                // console.log(this.$store.state);
                 var data = {
                    mail: this.mail,
                    password: this.password
                };
                console.log(data);
                this.$http.post(, data)
                .then((res)=>{
                    console.log(res);
                    if(res.data.result === 0){
                        console.log(res.data.msg);
                    }else{
                        this.$store.state.customer=res.data.User;
                    console.log(this.$store.state);
                    this.$router.push("/")
                    }
                    
                })
                .catch((err)=>{
                    console.log(err);
                })
        }*/
     }
  }
</script>

<style scoped>

</style> 