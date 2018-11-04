<template lang='html'>
  <div>
    <!-- 搜索栏 -->
    <div id="search">
      <div id="search_content">
        <div id="i_page_center">
          <ul id="i_main_box">
            <li class="i_select_box">
              <span id="i_fisrt">标题 </span>
              <b class="down"></b>
              <ul class="i_son_ul">
                <li><span>标题</span></li>
                <li><span>内容</span></li>
              </ul>
            </li>
          </ul>
        </div>
        <input type="text" placeholder="请输入内容" class="search_input" v-model="searchStr">
        <div id="search_btn">
          <a @click="searchKeys()">搜索</a>
        </div>
      </div>
      <div id="hot">
        <span>热门：</span>
        <ul>
          <li>
            <a href="#">电动汽车</a>
          </li>
          <li>
            <a href="#">智能驾驶</a>
          </li>
          <li>
            <a href="#">尾气标准</a>
          </li>
          <li>
            <a href="#">二手车</a>
          </li>
          <li>
            <a href="#">叉车传动</a>
          </li>
          <li>
            <a href="#">充电桩租赁</a>
          </li>
        </ul>
      </div>
    </div>
    <div style="overflow: hidden; background-color: #ffffff">
      <!-- 标准动态 -->
      <div id="standard_activit">
        <!-- title -->
        <div class="activit">
          <span>标准法规动态</span>
          <a href="#">更多 ></a>
        </div>
        <!-- 内容 -->
        <ul id="act_content" class="activit_content">
          <li>
            <a href="article.html" target="_blank">
              <span>GB 1495-2002 汽车加速行驶外噪音限制及测量方法</span>
              <i>2018-09-20</i>
            </a>
          </li>

        </ul>
      </div>
      <!-- 最新翻译 -->
      <div id="new_translate">
        <!-- title -->
        <div class="activit">
          <span>最新翻译</span>
          <a href="#">更多 ></a>
        </div>
        <!-- 内容 -->
        <ul class="activit_content">
          <li>
            <a href="article.html" target="_blank">
              <span>GB 1495-2002 汽车加速行驶外噪音限制及测量方法</span>
              <i>2018-09-20</i>
            </a>
          </li>
          <li>
            <a href="article.html" target="_blank">
              <span>GB 1495-2002 汽车加速行驶外噪音限制及测量方法</span>
              <i>2018-09-20</i>
            </a>
          </li>
          <li>
            <a href="article.html" target="_blank">
              <span>GB 1495-2002 汽车加速行驶外噪音限制及测量方法</span>
              <i>2018-09-20</i>
            </a>
          </li>
          <li>
            <a href="article.html" target="_blank">
              <span>GB 1495-2002 汽车加速行驶外噪音限制及测量方法</span>
              <i>2018-09-20</i>
            </a>
          </li>
          <li>
            <a href="article.html" target="_blank">
              <span>GB 1495-2002 汽车加速行驶外噪音限制及测量方法</span>
              <i>2018-09-20</i>
            </a>
          </li>
          <li>
            <a href="#">
              <span>GB 1495-2002 汽车加速行驶外噪音限制及测量方法</span>
              <i>2018-09-20</i>
            </a>
          </li>
          <li>
            <a href="#">
              <span>GB 1495-2002 汽车加速行驶外噪音限制及测量方法</span>
              <i>2018-09-20</i>
            </a>
          </li>
          <li>
            <a href="#">
              <span>GB 1495-2002 汽车加速行驶外噪音限制及测量方法</span>
              <i>2018-09-20</i>
            </a>
          </li>
          <li>
            <a href="#">
              <span>GB 1495-2002 汽车加速行驶外噪音限制及测量方法</span>
              <i>2018-09-20</i>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <!-- 声明 -->
    <div id="declare">
      <h2>免责声明</h2>
      <p>标准检索标准检索标准检索标<br>准检索标准检索标<br>准检索标准检索<br>标准检索标准检索<br>标准检索标准检索</p>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        searchStr: ''
      }
    },
    methods: {
      async searchKeys() {
        let url = '/OtherService.asmx/AddDocumentSearchKeys'
        let params = {
          keys: this.searchStr
        }
        let data = await this.api.post(url, params)
        if (data) {
          console.log(data)
        }
      },
    },
    mounted() {
      $('.i_son_ul').hide();
      $("#search_content").css("border-radius","5px")
      $('.i_select_box span').click(function () {
        $('ul.i_son_ul li').css("background","");
        //改变箭头方向，
        $('.i_select_box b').addClass("up");
        $(this).parent().find('ul.i_son_ul').slideDown();
        $("#search_content").css("border-radius","5px 5px 5px 0")
      });
      $('ul.i_son_ul li').click(function () {
        $(this).parents('li').find('#i_fisrt').html($(this).html());
        $(this).parents('li').find('ul').slideUp();
        $(this).css("background","#e6f7ff");
        //移动已添加上的背景，在添加新的样式
        $('.i_select_box b').removeClass("up");
        $('.i_select_box b').addClass("down");
        $("#search_content").css("border-radius","5px")
      });
    }
  }
</script>

<style scoped>
  #search{
    width:100%;
    height:140px;
    background:#ddd;
    overflow: hidden;
  }
  #search_content{
    width:705px;
    height:40px;
    border:1px solid #0C7DCF;
    margin:35px auto 15px;
    border-radius: 5px 5px 5px 0;
    background: #fff;
    box-sizing:border-box;

  }
  /*搜索条件*/
  #i_page_center{
    height: 38px;
    float: left;
    width:10%;

  }
  #page_right{
    float: left;
    width: 80%;
  }
  #in_main_box{
    display: inline-block;
    color: #6F6F6F;
  }
  .i_select_box {
    position: relative;
    width:65px;
    text-align: center;
    background-color: #FFFFFF;
    list-style: none;
    border-radius: 5px;
  }
  .down{
    display: inline-block;
    width:12px;
    height:12px;
    background: url(../../assets/images/bg1.png) -80px -99px;
  }
  #i_fisrt {
    cursor: pointer;
    display: inline;
    line-height: 38px;
    width: 100%;
    height: 38px;
    text-align: left;
    box-sizing: border-box;
    padding-left: 17px;
    font-size: 14px;
    color: #6f6f6f

  }
  .up{
    background: url(../../assets/images/bg1.png) -100px -100px;
  }
  .i_select_box ul li {
    cursor:pointer;
    color: #6F6F6F;
  }
  .i_son_ul {
    width:64px;
    border-top:1px solid #DADADA;
    background-color: #FFFFFF;
    z-index:100;
    position:absolute;
    border: 1px solid #0C7DCF;
    border-top: 0;
    top:38px;
    left:-1px;
  }
  .i_son_ul li {
    display:block;
    line-height:25px;
    padding-left:0px;
    width:65px;
    z-index:100;
    color: #000000;
    list-style: none;
  }
  .i_son_ul span {
    cursor:pointer;
    display: inline-block;
    width: 30px;
    font-size: 14px;
    text-align: left;
  }
  #search_content input{
    outline: 0;
    border: 0;
    height: 36px
  }
  #search_btn{
    float: right;
    width: 90px;
    height: 38px;
    background: #0C7DCF;
    border: 1px solid #0C7DCF;
  }
  #search_btn a{
    display: block;
    color: #fff;
    height:40px;
    line-height: 40px;
    width:35px;
    margin: 0 auto;
  }
  #search_btn:hover{
    border: 1px solid #2f9cec;
    background-color: #2f9cec;
  }
  /*热门搜索*/
  #hot{
    width:50%;
    margin:0 auto;
    height:25px;
    line-height: 25px;
  }
  #hot span{
    float: left;
    font-size: 13px;
    color: #616161;
    margin-right:10px;
  }
  #hot ul li{
    list-style: none;
    float: left;
    margin-right:10px;
  }
  #hot ul li a{
    font-size: 15px;
    font-weight: bold;
    color: #4A4A4A;
  }
  /* 内容 */
  /*动态标题*/
  #standard_activit{
    width:48%;
    float: left;
  }
  #new_translate{
    width: 48%;
    float: right;
    margin-left: 4%;
  }
  .activit{
    width:100%;
    height:60px;
    padding:0 30px;
    box-sizing:border-box;
    background: #ffffff;
    line-height: 60px;
    border-bottom:2px solid #F1F1F1;
  }
  .activit span{
    float: left;
    font-size: 19px;
    font-weight: bold;
  }
  .activit a{
    font-size: 16px;
    color: #0C7DCF;
    float: right;
  }
  /*动态内容*/
  .activit_content{
    height:355px;
    width:100%;
    padding:25px 0;
    box-sizing:border-box;

  }
  .activit_content li{
    list-style: none;
  }
  .activit_content li a{
    display: block;
    width:100%;
    height:36px;
    color: #5A5A5A;
    font-size: 16px;
    line-height: 36px;
    padding:0 30px;
    box-sizing:border-box;
    /* transition:color 2s;
      -webkit-transition:color 2s */
  }
  .activit_content li a:hover{
    color: #108ee9;
    background-color: #e6f7ff;
  }
  .activit_content li a span{
    float: left;
  }
  .activit_content li a i{
    font-style:normal;
    float: right;
  }
  /*声明*/
  #declare{
    height:280px;
    width:100%;
    border: 1px dashed #F5A623;
    border-radius: 5px;
    box-sizing:border-box;
    padding:0 50px 50px;
  }
  #declare h2{
    font-size: 20px;
    width:80px;
    margin: 0 auto;
    padding: 30px 0;
  }
  .search_input{
    font-size: 14px;
    width: 540px;
  }
</style>
