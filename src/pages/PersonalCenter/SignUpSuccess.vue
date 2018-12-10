<template lang='html'>
  <div id="stage">
    <div id="login_content">
      <form id="register_form">
        <div class="log"></div>
        <h5>{{$t('signIn._0')}}</h5>
        <h4><img class="tips_icon" src="../../assets/images/signUp_success.png"/></h4>
        <p class="successTitle">{{$t('signUpSuccess._0')}}{{userEmail}} {{$t('signUpSuccess._1')}}</p>
        <p class="successContent">{{$t('signUpSuccess._2')}}</p>
        
        <div class="login_tab login_btn">
          <input @click="go_home()" type="button" :value="$t('signUpSuccess._3')"/>
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
      	userEmail: "" 
      }
    },
    mounted(){
      this.userEmail = this.global.userEmail;
    },
    methods: {
      go_home () {
        this.$router.push({
          name: 'Home'
        })
      }
    }
  }
</script>

<style scoped>
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
  .login_btn{
  	clear: both;
    background: transparent;
    border: 0;
    text-align: center;
    vertical-align: middle;
  }
  .login_btn input{
    color:rgba(0, 0, 0, 0.647058823529412);
    width:30%;
    height:100%;
    border:1px solid rgba(217, 217, 217, 1);
    border-radius: 5px;
    background: #FFFFFF;
    vertical-align: middle;
    margin-left:0;
    margin-top: 30px;
    font-size:16px;
    cursor: pointer;
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
  /* 图标 */
 	h4 img.tips_icon{
 		height: 64px;
 		width: 64px;
 	}
 	/*successTitle successContent*/
 	.successTitle{
 		font-family: 'PingFangSC-Semibold', 'PingFang SC Semibold', 'PingFang SC';
    font-weight: 650;
    height: 24px;
    line-height: 24px;
    font-size: 16px;
    color: rgba(0, 0, 0, 0.847058823529412);
 	}
 	.successContent{
 		font-family: 'MicrosoftTaiLe', 'Microsoft Tai Le';
    font-weight: 400;
    font-style: normal;
    font-size: 14px;
    margin-top: 20px;
    color: rgba(0, 0, 0, 0.427450980392157);
    text-align: center;
    line-height: 22px;
 	}
</style>
