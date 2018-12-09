<template lang='html'>
  <div id="main">
    <div class="center">
      <div class="nav-title">
        <h1>{{$t('aboutUs.0')}}</h1>
      </div>
      <div class="nav-content">
        <div class="nav-left">
          <ul>
            <li :class="{'li_active': cur_showType == 'government'}">
              <a @click="maoClick('government')" :class="{'a_active': cur_showType == 'government'}">{{$t('aboutUs.1')}}</a>
            </li>
            <li :class="{'li_active': cur_showType == 'approve'}">
              <a @click="maoClick('approve')" :class="{'a_active': cur_showType == 'approve'}">{{$t('aboutUs.2')}}</a>
            </li>
          </ul>
        </div>
        <div class="nav-right">
          <div id="zhengfu" v-show="cur_showType == 'government'">
            <p>
              At Dynaso we have carefully chosen the following three core values as the basis of our corporate culture, which have guided us to the success over the past decade, and these values also define how we conduct our business, and help us to create value for our clients, our people and our organization.
            </p>
            <h2>Client Value Creation</h2>
            <p>
              Helping our clients achieve their goals is our foremost objective and business value. We each have a huge responsibility no matter our role, as we understand that our service affects deeply whether clients’ product can be timely launched, whether their business plans can be moving forward as scheduled, and whether their insight on market would be actual and objective.
            </p>
            <h2>Great Place for Employees’ development</h2>
            <p>
              We are committed to hiring and retaining the right and talent people in every position, and we make developing others and ourselves as priority for leadership team. We strive to create an open, diverse and inclusive environment where everyone can make the best use of their potentials, succeed professionally and achieve a higher personal value.
            </p>
            <h2>Keeping Entrepreneurial Spirit</h2>
            <p>
              Our clients reasonably expect us to be more informed, knowledgeable and responsive to meet their request; while we also expect ourselves to be aggressive and innovative, and consistently looking for new ideas to achieve our goals, which implies we shall be business focused, keep alert while adaptable to changes, learning fast and continuously deepening our knowledge of our business, moving quickly and decisively to meet the challenges.
            </p>
          </div>
          <div id="renzheng" v-show="cur_showType == 'approve'">
            <p>关于....</p>
          </div>
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
  #zhengfu p, #renzheng p{
    padding: 0 20px;
    min-height: 30px;
    line-height: 30px;
    font-size: 16px;
    margin-top: 20px;
  }
  #zhengfu h2, #renzheng h2{
    padding: 0 20px;
    font-size: 18px;
    font-weight: 900;
    margin-top: 20px;
  }
  .li_active{
    background-color: #e6f7ff;
    border-right: 2px solid #1890ff;
  }
  .a_active{
    color: #2094ff !important;
  }
</style>

