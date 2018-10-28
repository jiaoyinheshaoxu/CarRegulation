<template lang='html'>
  <div id="stage">
    <div id="login_content">
      <form id="register_form">
        <div class="log"></div>
        <h5>把握未来走向，囊括行业标准，做中国第一双语法规网站</h5>
        <h4>注册</h4>
        <div class="login_tab user">
          <!-- <a class="user_logo"></a>-->
          <input type="text" name="email" id="email" v-model="username" placeholder="邮箱"/>

        </div>
        <div class="login_tab password">
          <!--<a class="password_logo"></a>-->
          <input type="password" name="userPassword" id="userPassword" v-model="password" placeholder="6-12位密码，区分大小写"/>
        </div>
        <div class="login_tab">
          <input type="password" id="againPassword"  placeholder="确认密码"/>
        </div>
        <div class="login_tab login_btn">
          <input @click="register_user()" type="button" value="注册"/>
          <a  href="login.html" target="_blank" class="exists">使用已有账户登录</a>
        </div>
        <div class="login_tab footer">
          <a href="">帮助</a>
          <a href="" class="mid">隐私</a>
          <a href="">条款</a>
          <p>copyright @ 2012-2018 中国汽车法规标准库 - 在这里了解中国</p>
        </div>
        <label id="emailMess" class="label_mess"></label>
        <label id="passwordMess" class="password_mess"></label>
        <label id="againMess" class="again_mess"></label>
      </form>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        username: '',
        password: '',
        confirmPassword: ''
      }
    },
    methods: {
      async register_user () {
        let url = 'LoginService.asmx/CheckLogin'
        let params = {
          username: this.username,
          password: this.password
        }
        let data = await this.api.post(url ,params)
        if (data) {
          console.log(data)
        }
      }
    }
  }
</script>

<style scoped>
  input {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  .lf{
    float:left;
  }
  .rt{
    float:right;
  }
  #stage{
    width:100%;
    min-height:800px;
    background:url("../../assets/images/bg3.png")no-repeat ;
    background-size:100%;
    box-sizing: border-box;
    padding-top:260px;
  }
  #login_content{
    width:370px;
    height:664px;
    margin:0 auto;
    text-align: center;
    box-sizing: border-box;
    position:relative;
  }
  .log{
    width:331px;
    height:50px;
    background:url("../../assets/images/bg.png")-80px -505px;
    text-align: center;
    margin:0 auto;
  }
  h5{
    color:#58595B;
    font-weight: normal;
    margin-top:27px;
  }
  h4{
    margin-top:95px;
    margin-bottom:44px;
    text-align: left;
  }
  .login_tab{
    display:block;
    width:368px;
    height:41px;
    margin-bottom:24px;
    border:1px solid #D9D9D9;
    border-radius: 5px;
    background: #fff;
  }
  input{
    border:0;
    width:90%;
    height:100%;
    outline:none;
    background: transparent;
    cursor: pointer;
    margin: 0 auto;
  }
  .user a{
    float:left;
    width:10%;
    height:28px;
    background:url("../../assets/images/bg.png")-625px -128px;
  }
  .password a{
    float:left;
    width:10%;
    height:28px;
    background:url("../../assets/images/bg.png")-705px -128px;
  }
  .forget{
    border:0;
    background: transparent;
  }
  .forget a{
    color:#1C92FE;
    font-size:14px;
  }
  .login_btn{
    background: transparent;
    border: 0;
    margin-bottom: 112px;
    text-align: left;
    vertical-align: middle;
  }
  .login_btn input{
    color:#fff;
    width:50%;
    height:100%;
    border:1px solid transparent;
    border-radius: 5px;
    background: #1890FF;
    vertical-align: middle;
    margin-left:0;
    font-size:16px;
  }
  .login_btn .exists{
    color:#2194FE;
    height:100%;
    border:1px solid transparent;
    vertical-align: middle;
    font-size: 14px;
    text-align: center;
    margin-left:17%;
  }
</style>
