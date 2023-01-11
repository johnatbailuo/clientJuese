<template>
  <form>
    <div id="login">
      <h3 class="text-center text-white pt-5">Login form</h3>
      <div class="container">
        <div
          id="login-row"
          class="row justify-content-center align-items-center"
        >
          <div id="login-column" class="col-md-6">
            <div id="login-box" class="col-md-12">
              <form id="login-form" class="form" action="" method="post">
                <h3 class="text-center">登录</h3>
                <div class="form-group">
                  <label for="username" class="">用户名:</label><br />
                  <input
                    type="text"
                    name="username"
                    id="username"
                    v-model="username"
                    class="form-control"
                    required
                  />
                </div>
                <div class="form-group">
                  <label for="password" class="">密码:</label><br />
                  <input
                    type="password"
                    name="password"
                    id="password"
                    v-model="password"
                    class="form-control"
                    required
                  />
                </div>
                <div>
                    <p v-if="error.length">
                        <b>Please correct the following errors</b>
                        <ul>
                            <li v-for="e in error" :key="e.id">
                                   {{ e }} 
                            </li>
                        </ul>
                    </p>
                </div>
                <div class="form-group">
                  <!-- <label for="remember-me" class="text-info"><span>Remember me</span> <span><input id="remember-me" name="remember-me" type="checkbox"></span></label> -->
                  <br />
                  <input
                    type="button"
                    class="btn btn-primary btn-md"
                    value="登录"
                    @click.prevent="loginToPage()"
                  />
                </div>
                <div id="register-link" class="text-right">
                  <!-- <a href="#" class="text-info">Register here</a> -->
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script>
import {login} from '../../network/api'
export default {
  name: "Login",
  data() {
    return {
      error:[],
      username: "",
      password: "",
    }; 
  },
  methods: {
    async loginToPage() {
       
      // e.preventDefault();
      
      this.error= [];
      if(!this.username){
        this.error.push("name is required")
      }
      if(!this.password){
        this.error.push("password is required")
      }

      if(this.username &&  this.password){
        login(this.username, this.password).then((response) => {
          if(response.status==200 ){
            console.warn(response.data);
            localStorage.setItem('token', response.data.data.token);
            this.$router.push({name:"employee"});
        }

     })
        console.warn("login function called")
      }
    },
  },
};
</script>

<style scoped></style>
