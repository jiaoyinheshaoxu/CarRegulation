<template lang='html'>
  <div class="center">
    <div class="nav-title">
      <h1>帮助中心</h1>
    </div>
    <div class="nav-content">
      <div class="nav-left">
        <ul>
          <li :class="{'li_active': cur_showType == 'government'}">
            <a @click="maoClick('government')" :class="{'a_active': cur_showType == 'government'}">会员注册</a>
          </li>
          <li :class="{'li_active': cur_showType == 'approve'}">
            <a @click="maoClick('approve')" :class="{'a_active': cur_showType == 'approve'}">如何下载</a>
          </li>
          <li :class="{'li_active': cur_showType == 'detection'}">
            <a @click="maoClick('detection')" :class="{'a_active': cur_showType == 'detection'}">付费渠道</a>
          </li>
        </ul>
      </div>
      <div class="nav-right">
        <div id="zhengfu" v-show="cur_showType == 'government'">
          <p>会员常见的问题可以通过这里了进一步内容。</p>
          <h2>普通会员可以下载吗？</h2>
          <p>尊敬的客户，普通用户暂时无法下载。请升级到高级会员，可以进行下载与打印。</p>
          <h2>请问除了英文版本法规，是否有法语版本和阿拉伯版本的？</h2>
          <p>目前只有中文版与英文版。暂不提供其他版本的翻译工作。</p>
          <h2>能否单份购买文档？</h2>
          <p>我们支持单份购买，需通过邮件系统联系管理员，购买单份文档。</p>
        </div>
        <div id="renzheng" v-show="cur_showType == 'approve'">
          <p>如何下载...</p>
        </div>
        <div id="jiance" v-show="cur_showType == 'detection'">
          <p>付费渠道...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        cur_showType: 'government'
      }
    },
    mounted() {

    },
    methods: {
      maoClick (type) {
        this.cur_showType = type
      }
    }
  }
</script>

<style scoped>
  .center {
    width: 100%;
    margin: 0 auto;
    min-height: 600px;
  }
  .nav-title{
    height: 80px;
  }
  .nav-title h1{
    height: 80px;
    line-height: 40px;
    color: #0c7dcf;
    font-size: 30px;
  }
  .nav-content{
    background-color: #ffffff;
    padding-bottom: 34px;
    min-height: 600px;
    overflow: hidden;
  }
  .nav-left{
    width: 15%;
    float: left;
  }
  .nav-right{
    border-left: 1px solid #e8e8e8;
    float: right;
    width: 85%;
    min-height: 600px;
    position: relative;
  }
  ul li{
    list-style: none;
    text-align: center;
  }
  .nav-left li a{
    display: inline-block;
    position: relative;
    box-sizing: border-box;
    height: 40px;
    width: 100%;
    /*height: 100%;*/
    font-size: 14px;
    padding: 12px 0;
    color: #717171;
  }
  .nav-left a:hover{
    background-color: #e6f7ff;
    color: #2094ff;
  }
  .nav-left a:hover:after{
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    display: inline-block;
    width: 0;
    height: 40px;
    border-right: 2px solid #1890ff;
  }
  .nav-header{
    height: 146px;
    padding: 60px 0;
    box-sizing: border-box;
    font-size: 0;
  }
  .nav-header:after,.nav-header:before{
    content: "";
    display: inline-block;
    width: 40%;
    height: 0;
    border-bottom: 1px dashed grey;
  }
  .nav-header h5{
    display: inline-block;
    width: 20%;
    text-align: center;
    font-size: 12px;
  }
  .nav-list{
    padding: 0 50px;
  }
  .nav-list ul{
    width: 100%;
    min-height: 100px;
    margin-bottom: 40px;
  }
  .nav-list li{
    width: 28%;
    margin: 0 2.6% 40px;
    float: left;
    height: 130px;
    border: 1px solid grey;
    border-radius: 5px;
  }
  .nav-list a {
    display: inline-block;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 20px;
  }
  .nav-list a h5{
    font-size: 14px;
    margin-bottom: 15px;
    text-align: left;
  }
  .nav-list a p{
    font-size: 12px;
    text-align: left;
    font-family: sans-serif;
  }
  .nav-list li:hover{
    border: 1px solid #1890ff;
    background-color: #e6f7ff;
    color: #4a90e2;
  }
  #zhengfu, #renzheng, #jiance{
    overflow: hidden;
  }
  #zhengfu h2, #renzheng h2, #jiance h2{
    font-size: 18px;
    margin-top: 20px;
    font-weight: 900;
    padding: 0 20px;
  }
  #zhengfu p, #renzheng p, #jiance p{
    margin-top: 20px;
    font-size: 16px;
    min-height: 30px;
    line-height: 20px;
    padding: 0 20px;
  }
  .li_active{
    background-color: #e6f7ff;
    border-right: 2px solid #1890ff;
  }
  .a_active{
    color: #2094ff !important;
  }
</style>

