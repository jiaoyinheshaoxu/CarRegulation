<template lang='html'>
  <div id="stage">
    <div id="login_content">
      <form id="register_form">
        <div class="log"></div>
        <h5>把握未来走向，囊括行业标准，做中国第一双语法规网站</h5>
        <h4>欢迎登录</h4>

        <div class="login_tab user">
            <a class="user_logo"></a>
            <input type="text" id="email" v-model="username" placeholder="邮箱"/>
        </div>
        <div class="login_tab password">
            <a class="password_logo"></a>
            <input type="password" id="password" v-model="password" placeholder="密码"/>
        </div>
        <div class="login_tab forget">
            <a class="lf" @click="go_signUp()">注册账户</a>
            <a class="rt" @click="go_findPassword()">忘记密码</a>
        </div>
        <div class="login_tab login_btn">
            <input type="button" value="登录"  @click="user_login()"/>
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
      }
    },
    methods: {
    	// 用户登录接口
      async user_login () {
      	if(!this.global.check_strEmpty(this.username)){
      		this.$message.error("邮箱不能为空！");
      		this.username = "";
      		return;
      	}else if(!this.global.check_emailValid(this.username)){
      		this.$message.error("邮箱格式不正确！");
      		this.username = "";
      		return;
      	}else if(!this.global.check_numberMixLetter(this.password)){
      		this.$message.error("6-12位密码，且只支持英文字母与数字的组合！");
      		this.password = "";
      		return;
      	}else{
      		// 登录接口
      		// 返回值：  int  LoginStatus, 1 登录成功，2密码不对，3邮箱不存在
	  			//         int  HYType1季付 2年付,
	  			//         int  UseState访问状态  1：正常   2：超期    3：即将逾期  4：逾期
      		let url = 'LoginService.asmx/CheckLogin'
	        let params = {
	          username: this.username,
	          password: this.password
	        }
	        let data = await this.api.post(url ,params);
	        console.log(data);
	        if (data.LoginStatus == 1) {
	          // 登录成功 => 回到首页 => 将用户 id 存入 session 和 global 中
	          this.global.userEmail = this.username;
	          this.global.userPassword = this.password;
	          this.global.memberId = data.memberId;
	          console.log(this.global)
            this.$store.commit('get_username', {username: this.username})
	          this.global.HYType	= data.HYType;
	          sessionStorage.setItem('userEmail', this.username);
	          sessionStorage.setItem('userPassword', this.password);
	          sessionStorage.setItem('memberId', data.memberId);
	          this.$router.push({
		          name: 'Home'
		        })
	        }else if(data.LoginStatus == 2){
	        	this.password = "";
      			this.$message.error("密码错误，请重新输入！");
	        }else{
	        	this.email = "";
	        	this.password = "";
	        	this.$message.error("邮箱不存在！");
	        }
      	}
      },
      go_signUp () {
        this.$router.push({
          name: 'SignUp'
        })
      },
      go_findPassword (){
      	this.$router.push({
          name: 'FindPassword'
        })
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
    height: 100%;
    background:url("../../assets/images/bg3.png")no-repeat ;
    background-size:100%;
    box-sizing: border-box;
    padding-top: 50px;
    position: absolute;
    margin: auto;
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px;
  }
  #login_content{
    width:370px;
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
    margin-top:20px;
    margin-bottom: 50px;
    font-size: 0.83em;
  }
  h4{
    margin-top:30px;
    margin-bottom:30px;
    text-align: center;
    font-weight: 800;
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
    text-align: left;
    vertical-align: middle;
  }
  .login_btn input{
    color:#fff;
    width:100%;
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
  .footer{
    border:0;
    width: 50%;
    background: transparent;
    position: fixed;
    bottom: 20px;
    right: 25%;
  }
  .footer a{
    color:#929395;
    font-size: 14px;
  }
  .footer p{
    font-size: 12px;
    color:#929395;
    margin-top:15px;
  }
  .footer .mid{
    margin-left:43px;
    margin-right:43px;
  }
  /*遮罩*/
  .org_layer{
    width:100%;
    height:100%;
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    z-index: 200;
    display: none;
  }
  .register_success{
    width:300px;
    height: 150px;
    border:1px solid #DADADA;
    box-shadow: 0px 2px 2px 0px #DADADA;
    background-color: #ffffff;
    position: fixed;
    margin-top: -100px;
    margin-left: -140px;
    left:50%;
    top: 50%;
    z-index: 300;
    font-size: 14px;
    display: none;
    overflow: hidden;
  }
  .success_title{
    width:80px;
    height:40px;
    font-size: 16px;
    line-height: 40px;
    margin:25px auto;
  }
  /*.user{
      position:relative;
  }*/
  .user_login{
    width:100%;
    height:60px;
    box-sizing:border-box;
    overflow: hidden;
  }
  .user_login a{
    margin:10px auto;
    display: block;
    width:60px;
    height:30px;
    background: #1C92FE;
    border-radius: 5px;
    line-height: 30px;
    padding-left:9px;
    box-sizing:border-box;
    color:#fff;
  }

  .label_mess{
    width:150px;
    display: block;
    position: absolute;
    left: 98%;
    top: 40%;
  }
  .password_mess{
    width:150px;
    display: block;
    position: absolute;
    left: 98.5%;
    top: 50%;
  }
  .again_mess{
    width:150px;
    display: block;
    position: absolute;
    left: 98.5%;
    top: 60%;
  }
</style>
