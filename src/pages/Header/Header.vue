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
          <li><a @click="skipTo('AboutUs')" :class="{'routeActive': route_name == 'AboutUs'}">关于我们</a></li>
          <li><a @click="skipTo('ContactUs')" :class="{'routeActive': route_name == 'ContactUs'}">联系我们</a></li>
          <li><a @click="skipTo('Help')" :class="{'routeActive': route_name == 'Help'}">帮助</a></li>
        </ul>
        <ul id="enchina">
          <li id="china">
            <b></b>
            <a href="#">中文</a>
          </li>
          <li id="english">
            <b></b>
            <a href="#">英文</a>
          </li>
        </ul>
        <ul id="reg">
          <li><a @click="skipTo('SignUp')" :class="{'routeActive': route_name == 'SignUp'}">注册</a></li>
          <li><a @click="skipTo('SignIn')" :class="{'routeActive': route_name == 'SignIn'}">登录</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
      }
    },
    computed: {
      route_name() {
        return this.$store.state.route_name
      }
    },
    methods: {
      skipTo(name) {
        this.$router.push({
          name
        })
        this.$store.commit('change_route', {route_name: name})
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
