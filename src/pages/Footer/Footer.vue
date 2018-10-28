<template lang='html'>
  <div id="footer" >
    <div id="service">
      <ul id="service_list">
        <li>
          <ul class="service_list_colomu">
            <li>
              <h3>产品</h3>
            </li>
            <li><a href="#">高级搜索</a></li>
            <li><a href="#">分类搜索</a></li>
          </ul>
        </li>
        <li>
          <ul class="service_list_colomu">
            <li>
              <h3>服务</h3>
            </li>
            <li><a href="#">最近更新</a></li>
            <li><a href="#">汽车政策</a></li>
            <li><a href="#">成为会员</a></li>
            <li><a href="#">常见为题</a></li>
          </ul>
        </li>
        <li>
          <ul class="service_list_colomu">
            <li>
              <h3>关于</h3>
            </li>
            <li><a href="#">使用条款</a></li>
            <li><a href="#">隐私协议</a></li>
            <li><a href="#">关于我们</a></li>
          </ul>
        </li>
      </ul>
      <!-- 联系我们 -->
      <div id="contact">
        <h2>联系我们</h2>
        <p>微博  微信  Facebook  Twitter</p>
      </div>
    </div>
    <div id="copyright">
      <p>京ICP备14055711号-2 © 2012-2018  中国汽车法规标准库-在这里了解中国</p>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
      }
    }
  }
</script>

<style lang=''>
  /*页脚*/
  #footer{
    width:100%;
    height:320px;
    border-top:2px solid #0C7DCF;
  }
  #service{
    background: #ddd;
    width:100%;
    height:240px;
    padding:50px 240px;
    box-sizing:border-box;
  }
  #service_list{
    float: left;
  }
  #service_list>li{
    float: left;
    list-style: none;
    margin-right:155px;
  }
  #service_list li{
    list-style: none;
    line-height: 25px;
  }
  .service_list_colomu h3{
    margin-bottom: 30px;
    color: #4A4A4A;
  }
  .service_list_colomu a{
    font-size: 13px;
    color: #595959;
  }
  .service_list_colomu a:hover{
    color: #0C7DCF;
  }
  #contact{
    float: right;
    color: #0C7DCF;
  }
  #contact h2{
    font-size: 20px;
    margin-bottom: 45px;
  }
  #copyright{
    width:100%;
    height:75px;
    background: #04366F;
  }
  #copyright p{
    height: 75px;
    line-height: 75px;
    color: #9B9B9B;
    width:440px;
    margin: 0 auto;
    font-size: 13px;
  }
</style>
