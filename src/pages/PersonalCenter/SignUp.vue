<template lang='html'>
  <div id="stage">
    <div id="login_content">
      <form id="register_form">
        <div class="log"></div>
        <h5>{{$t('signIn._0')}}</h5>
        <h4>{{$t('signIn._2')}}</h4>
        <div class="login_tab user">
          <input type="text" name="email" id="email" v-model="email" :placeholder="$t('signIn._9')"/>
        </div>
        <div class="login_tab password">
          <input type="password" name="userPassword" id="userPassword" v-model="userPassword" :placeholder="$t('signUp._0')"/>
        </div>

        <div class="login_tab">
          <input type="password" id="againPassword" v-model="confirmPassword"  :placeholder="$t('signUp._1')"/>
        </div>

        <!-- 密码强度 -->
        <!--<div class="progressBar">
        	<div class="fLeft progressTitle">密码强度</div>
	        <el-progress :percentage="0" v-if="pwHard==0" :stroke-width="10"></el-progress>
					<el-progress :percentage="33" v-else-if="pwHard=="  :stroke-width="10"></el-progress>
					<el-progress :percentage="66" color="#8e71c7" :stroke-width="10"></el-progress>
					<el-progress :percentage="100" status="success" :stroke-width="10"></el-progress>
				</div>-->

        <el-checkbox :label="$t('signUp._2')" class="fLeft mTop10_anti mBottom20"
        	v-model="isSubscription" false-label="false" true-label="true">
        </el-checkbox>

        <div class="login_tab login_btn">
          <input @click="register_user()" type="button" :value="$t('signUp._4')"/>
          <a @click="go_signIn()" class="exists">{{$t('signUp._3')}}</a>
        </div>
        <div class="login_tab footer">
        	<a href="">{{$t('signIn._5')}}</a>
        	<a href="" class="mid">{{$t('signIn._6')}}</a>
        	<a href="">{{$t('signIn._7')}}</a>
        	<p>copyright @ 2012-2018 {{$t('signIn._8')}}</p>
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
        email: '',
        userPassword: '',
        confirmPassword: '',
        isSubscription: 'false',
       	pwHard: 0
      }
    },
    methods: {
    	// 提交注册 email  userPassword  isSubscription  subscriptionLanguage
      async register_user () {
      	if(!this.global.check_strEmpty(this.email)){
      		this.$message.error(this.$t('signIn._11'));
      		this.email = "";
      		return;
      	}else if(!this.global.check_emailValid(this.email)){
      		this.$message.error(this.$t('signIn._12'));
      		this.email = "";
      		return;
      	}else if(!this.global.check_numberMixLetter(this.userPassword)){
      		this.$message.error(this.$t('signIn._13'));
      		this.userPassword = "";
      		return;
      	}else if(this.userPassword != this.confirmPassword){
      		this.$message.error(this.$t('signUp._5'));
      		this.confirmPassword = "";
      		return;
      	}else{
      		// 以上验证全部通过,注册成功
      		let url = 'LoginService.asmx/CheckAndRegister'
      		let params = {
      		  email: this.email,
      		  password: this.userPassword,
      		  isSubscription: this.isSubscription=='true' ? true : false,
      		  subscriptionLanguage: this.$t('language'),
      		  language: this.$t('language')
      		}
      		let data = await this.api.post(url ,params);
      		if (data[0]) {
      			// 注册成功 => 注册成功页面
      			this.global.userEmail = this.email;
        		this.$router.push({
			        name: 'SignUpSuccess'
			      })
      		}else{
      			// 注册失败 => 提示注册失败
        		this.$message.error(this.$t('signUp._6'));
      		}
      	}
      },
      go_signIn () {
        this.$router.push({
          name: 'SignIn'
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
    text-align: left;
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
  	clear: both;
    background: transparent;
    border: 0;
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
  /* 进度条 */
  .progressBar{
  	height: 30px;
  	line-height: 30px;
  	margin-top: -10px;
  }
  .progressTitle{
  	margin-top: -8px;
  }
</style>
