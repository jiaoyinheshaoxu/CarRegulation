<template lang='html'>
  <div id="header">
    <!-- logo 注册登录 -->
    <div id="headerNav">
      <!-- 左边logo -->
      <div id="logo">
        <span></span>
      </div>
      <!-- 右边登录注册 -->
      <div id="navright">
        <ul id="aboutus">
          <li><a @click="skipTo('AboutUs')" :class="{'routeActive': route_name.includes('AboutUs')}">{{$t('footer.6')}}</a></li>
          <li><a @click="skipTo('ContactUs')" :class="{'routeActive': route_name.includes('ContactUs')}">{{$t('footer.7')}}</a></li>
          <li><a @click="skipTo('Help')" :class="{'routeActive': route_name.includes('Help')}">{{$t('header.0')}}</a></li>
        </ul>
        <ul id="enchina">
          <li id="china" @click="toggleLang('zh')">
            <b></b>
            <a href="#">{{$t('header.1')}}</a>
          </li>
          <li id="english" @click="toggleLang('en')">
            <b></b>
            <a href="#">EN</a>
          </li>
        </ul>
        <ul id="reg" v-show="!get_username">
          <li><a @click="skipTo('SignUp')" :class="{'routeActive': route_name == 'SignUp'}">{{$t('header.2')}}</a></li>
          <li><a @click="skipTo('SignIn')" :class="{'routeActive': route_name == 'SignIn'}">{{$t('header.3')}}</a></li>
        </ul>
        <ul id="reg" v-show="get_username">
          <li><a style="color: #1C92FE;" @click="goUserCenter()">{{get_username}}</a></li>
          <li><a @click="loginOut()" style="color: #1C92FE">{{$t('header.4')}}</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    inject: ['reload'],
    data() {
      return {
      }
    },
    computed: {
      route_name() {
        return this.$store.state.route_name
      },
      get_username() {
        return this.$store.state.username
      }
    },
    methods: {
    	// 中英文切换
    	toggleLang(lang) {
	      if(lang == 'zh'){
	        localStorage.setItem('locale', 'zh')
          sessionStorage.setItem('language', '1')
          this.$store.commit('get_language', {'language': '1'})
	        this.$i18n.locale = localStorage.getItem('locale')
	        this.$message({
	          message: '切换为中文！',
	          type: 'success'
	        })
	      } else if (lang == 'en') {
	        localStorage.setItem('locale', 'en')
          sessionStorage.setItem('language', '2')
          this.$store.commit('get_language', {'language': '2'})
	        this.$i18n.locale = localStorage.getItem('locale')
	        this.$message({
	          message: 'Switch to English!',
	          type: 'success'
	      	})
				}
	    },

      skipTo(name) {
    	  this.reload()
        this.$router.push({
          name
        })
        //this.$store.commit('change_route', {route_name: name})
      },
      loginOut() {
        this.global.memberId = ''
        this.global.HYType = 0
        this.userPassword = ''
        this.userEmail = ''
        sessionStorage.removeItem('memberId', '')
        sessionStorage.removeItem('userPassword', '')
        sessionStorage.removeItem('userEmail', '')
        this.$store.commit('get_username', {username: ''})
        /*this.$router.push({
			    name: 'SignIn'
			  })*/
        this.$message({
          showClose: true,
          message: '退出登录成功！'
        });
      },
      goUserCenter() {
    	  this.reload()
        this.$router.push({
          path: '/UserCenter'
        })
      }
    }
  }
</script>

<style scoped>

  /* 头部 */
  #header{
    width:100%;
    height:100px;
  }
  #headerNav{
    width:85%;
    height:100px;
    margin:0 auto;
  }
  #logo{
    height:100%;
    float: left;
  }
  #logo span{
    margin-top:20px;
    display: block;
    width:329px;
    height:60px;
    background: url('../../assets/images/bg.png')  -80px -500px;
  }
  #navright{
    height:35px;
    float: right;
    width:345px;
    background:#ddd;
    border-radius: 0 0 10px 10px;
  }
  #aboutus{
    float:left;
  }
  #aboutus li{
    font-size:15px;
    list-style: none;
    float:left;
    margin-left:20px;

  }
  #aboutus li a{
    display:block;
    height:35px;
    text-align: center;
    line-height: 35px;
    color:#000;
  }
  #aboutus li a:hover{
    color:#0C7DCF;
  }
  /*中英文*/
  #enchina{
    float: right;
    width:100px;
    height:35px;
  }
  #enchina li{
    font-size:13px;
    float:left;
    list-style: none;
    width:50px;
  }
  #enchina li a{
    display:inline-block;
    height:35px;
    text-align: center;
    line-height: 35px;
  }
  #china b{
    display: inline-block;
    width:16px;
    height: 24px;
    background: url('../../assets/images/bg.png')  -80px -129px;
  }
  #english b{
    display: inline-block;
    width:16px;
    height: 24px;
    background: url('../../assets/images/bg.png')  -160px -129px;
  }
  #reg{
    float: right;
  }
  #reg li{
    float:left;
    list-style: none;
    margin-right:20px;
  }
  #reg li a{
    height:65px;
    text-align: center;
    line-height: 65px;
    font-size: 17px;
  }
  .routeActive{
    color:#0C7DCF !important;
  }
</style>
