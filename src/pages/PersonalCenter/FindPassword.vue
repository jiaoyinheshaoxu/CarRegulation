<template lang='html'>
  <div id="stage">
    <div id="login_content">
      <form id="register_form">
        <div class="log"></div>
        <h5>把握未来走向，囊括行业标准，做中国第一双语法规网站</h5>
        <h4>找回密码</h4>
        
        <div class="login_tab user">
            <a class="user_logo"></a>
            <input type="text" id="email" v-model="email" placeholder="邮箱"/>
        </div>
        <p class="tips tips_danger" v-show="confirmResult == 1">该邮箱不存在！</p>
        <p class="tips tips_success" v-show="confirmResult == 2">邮箱验证成功！</p>
        
        <div class="login_tab login_btn">
            <input type="button" value="确认发送"  @click="send_emailComfirm()"/>
        </div>
        
        <div class="login_tab tipsBox">
        	<img class="tips_icon" src="../../assets/images/tips.png"/>
        	<div class="tipsContent">
        		<p class="tipsTitle">帮助提示</p>
        		<p class="contentDetail">亲爱的用户，我们将向您的注册的邮箱发送修改密码的链接，请确保您输入的邮箱正确。</p>
        	</div>
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
        email: '',
        confirmResult: 0
      }
    },
    methods: {
    	// 发送邮箱 => 找回密码
      async send_emailComfirm () {
      	if(!this.global.check_strEmpty(this.email)){
      		this.$message.error("邮箱不能为空！");
      		this.email = "";
      		return;
      	}else if(!this.global.check_emailValid(this.email)){
      		this.$message.error("邮箱格式不正确！");
      		this.email = "";
      		return;
      	}else{
      		let url = 'OtherService.asmx/CheckUserByEmail'
      		let params = {
      		  email: this.email
      		}
      		let data = await this.api.post(url ,params);
      		console.log(data)
      		if (data) {
      		  console.log(data)
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
  .user{
  	margin-bottom: 0px;
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
    margin-top: 20px;
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
  
  /* 提示窗口 */
 	.tipsBox{
    height: 100px;
    background: inherit;
    background-color: rgba(230, 247, 255, 1);
    box-sizing: border-box;
    border-width: 1px;
    border-style: solid;
    border-color: rgba(145, 213, 255, 1);
    border-radius: 4px;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
    padding: 10px;
    text-align: left;
    line-height: 28px;
    position: relative;
 	}
 	.tips_icon{
 		position: absolute;
    left: 20px;
    top: 15px;
    width: 24px;
    height: 26px;
 	}
 	.tipsContent{
 		width: 300px;
 		float: right;
 	}
 	.tipsTitle{
 		height: 30px;
 		line-height: 30px;
 		font-size: 16px;
 		color: rgba(0, 0, 0, 0.647058823529412);
 	}
 	.contentDetail{
 		height: 20px;
 		line-height: 20px;
 		font-size: 12px;
 		color: rgba(0, 0, 0, 0.427450980392157);
 	}
</style>
