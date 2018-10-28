<template lang='html'>
  <div class="header">
    <div class="header-2">
      <!--有谱logo-->
      <div class="fLeft imgbox" v-show="system == 'YOUPU'">
        <img src="../../assets/images/yplogo.png"/>
      </div>
      <div class="fLeft logo-name" v-show="system == 'YOUPU'">
        <span>有谱考试学情分析系统（网阅版）</span>
      </div>
      <!--睿芽logo-->
      <img class="ruiya_logo" src="../../assets/images/rya_logo.png" alt="" v-show="system == 'RYA'">
      <div class="fRight login-info">
        <p @click.stop="loginStatusClick">
          <img src="../../assets/images/user.png" alt="">
          <span class="head_title"><a :title="name + '   ' + nickName">欢迎您，{{name + '   ' + nickName}}</a></span>
          <i class="iconfont icon-xiaosanjiao"></i>
          <ul class="dropdown-menu pull-right" :class="{'show-status-box': isShowStatusBox}">
            <li v-if="false">
              <a href="##">
                <i class="iconfont icon-suoding"></i>
                <span>改密</span>
              </a>
            </li>
            <li>
              <a @click="click_logout()">
                <i class="iconfont icon-msnui-poweroff">退出</i>
              </a>
            </li>
          </ul>
        </p>
      </div>
    </div>
  </div>
  <!--<div class="FrameNav-Main-Body">
    <div class="PartCom">
      <img src="" alt="">
    </div>
    <div class="header-section">
       <ul class="notification-menu">
         <li>
           <a href="#" class="dropdown-toggle">
             欢迎您，睿芽测试 老师
             <span></span>
           </a>
           <ul class="dropdown-menu dropdown-menu-username pull-right">
             <li>
               <a href="javascript(0)">
                 <i></i>
                 改密
               </a>
             </li>
             <li>
               <a href="javascript(0)">
                 <i></i>
                 退出
               </a>
             </li>
           </ul>
         </li>
       </ul>
    </div>
  </div>-->
</template>

<script>
  export default {
    props: ['isShowStatusBox'],
    data() {
      return {
        name: '',
        nickName: '',
        system: this.global.system
      }
    },
    mounted() {
      this.name = this.global.name
      this.nickName = this.global.nickName
    },
    methods: {
      loginStatusClick() {
        this.$emit('changeStatusBox')
      },
      click_logout() {
        let is_logout = confirm('确定退出吗？')
        if (is_logout) {
          this.logout()
        }
      },
      async logout() {
        let url = '/logout'
        let params = {
          sid: this.global.sid
        }
        let data = await this.api.get(url, params)
        if (data) {
          let tempArr = ['sid', 'uid', 'roleId', 'nickName', 'roleName', 'name', 'username', 'schoolName', 'schoolId', 'mobile']
          for (let i = 0, len = tempArr.length; i < len; i++) {
            sessionStorage.removeItem(tempArr[i])
          }
          window.location.href = this.global.return_url
        }
      }
    }
  }
</script>

<style lang=''>
  .header {
    height: 90px;
    background-color: #fff;
  }

  .header-2 {
    width: 1100px;
    margin: 0 auto;
  }

  .fLeft {
    float: left;
  }

  .fRight {
    float: right;
  }

  .imgbox img {
    height: 54px;
    margin-top: 18px;
  }

  .logo-name {
    font-size: 36px;
    line-height: 90px;
    color: rgba(36, 179, 188, 1);
    margin-left: 10px;
  }

  .login-info {
    font-size: 20px;
  }

  .login-info > p {
    height: 90px;
    line-height: 90px;
    margin: 0;
    color: rgba(153, 153, 153, 1);
    cursor: pointer;
    position: relative;
  }

  .login-info .head_title a {
    color: rgba(153, 153, 153, 1);
  }
  .dropdown-menu {
    border: 1px solid #d9d9d7;
    background-color: white;
    width: 100px;
    max-width: 108px;
    /*padding: 5px 5px 10px 5px;*/
    padding: 5px 5px 5px 5px;
    -moz-border-radius: 2px 0 2px 2px;
    -webkit-border-radius: 2px 0 2px 2px;
    border-radius: 2px 0 2px 2px;
    -moz-box-shadow: none;
    filter: progid:DXImageTransform.Microsoft.Shadow(color=#d9d9d7,direction=120,strength=3);
    -moz-box-shadow: 0 2px 3px #d9d9d7;
    -webkit-box-shadow: 0 2px 3px #d9d9d7;
    box-shadow: 0 2px 3px #d9d9d7;
    display: none;
    z-index: 1000;
    font-size: 14px;
    text-align: left;
    list-style: none;
    position: absolute;
    top: 80px;
  }
  .dropdown-menu:after{
    content: '\25E4';
    position: absolute;
    color: #d9d9d7;
    /*background-color: #d9d9d7;*/
    font-size: 30px;
    left: 42px;
    top: -46px;
    transform: rotate(45deg);
  }
  .pull-right {
    right: 0;
    left: auto;
    float: right !important;
  }
  .dropdown-menu li{
    display: table-cell;
    vertical-align: middle;
    letter-spacing: 5px;
    float: left;
    position: relative;
    height: 30px;
    line-height: 30px;
    font-size: 1.7em;
  }
  .dropdown-menu li a{
    vertical-align: middle;
    padding: 2px 8px;
    color: #9c9c9c;
    font-size: 14px;
    -moz-border-radius: 2px;
    -webkit-border-radius: 2px;
    border-radius: 2px;
    -moz-transition: all 0.2s ease-out 0s;
    -webkit-transition: all 0.2s ease-out 0s;
    transition: all 0.2s ease-out 0s;
    text-decoration: none;
    line-height: 24px;
    height: 30px;
    float: left;
    margin-left: 3px;
  }
  .dropdown-menu li a:hover{
    background-color: #0cc3b3;
    color: #ffffff;
  }
  .dropdown-menu li a:first-child {
    /*border-top-right-radius: 4px;
    border-top-left-radius: 4px;*/
    border-radius: 4px;
  }
  .show-status-box{
    display: block;
  }


  .head_title{
    max-width: 300px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-right: 10px;
  }
  .login-info > p img{
    margin-top: 34px;
    margin-right: 15px;
    float: left;
  }
  .login-info > p i{
    float: right;
  }
  .login-info > p .head_title{
    float: left;
  }
  .ruiya_logo{
    margin-top: 20px;
  }
</style>
