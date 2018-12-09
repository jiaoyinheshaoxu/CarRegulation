<template lang='html'>
  <div id="footer" >
    <div id="service">
      <ul id="service_list">
        <li>
          <ul class="service_list_colomu">
            <li>
              <h3>{{$t('footer.0')}}</h3>
            </li>
            <li><a href="/StandardSearch" target="_blank">{{$t('content.1')}}</a></li>
            <li><a href="/LawSearch" target="_blank">{{$t('content.2')}}</a></li>
            <li><a href="/StandardLawState" target="_blank">{{$t('content.3')}}</a></li>
            <li><a href="/LatestTranslation" target="_blank">{{$t('content.4')}}</a></li>
            <li><a href="/Link" target="_blank">{{$t('content.5')}}</a></li>
          </ul>
        </li>
        <li>
          <ul class="service_list_colomu">
            <li>
              <h3>{{$t('footer.3')}}</h3>
            </li>
            <li><a href="/AboutUs" target="_blank">{{$t('footer.6')}}</a></li>
            <li><a href="/ContactUs" target="_blank">{{$t('footer.7')}}</a></li>
            <li><a href="/Help" target="_blank">{{$t('header.0')}}</a></li>
            <li><a href="#">{{$t('footer.5')}}</a></li>
            <li><a href="#">{{$t('footer.4')}}</a></li>
          </ul>
        </li>
      </ul>
      <!-- 联系我们 -->
      <div id="contact">
        <h2>{{$t('footer.7')}}</h2>
        <p>
          <span>{{$t('footer.8')}}</span>
          <span>&nbsp;&nbsp;</span>
          <span>{{$t('footer.9')}}</span>
        </p>
      </div>
    </div>
    <div id="copyright">
      <!--<p>京ICP备14055711号-2 © 2012-2018  中国汽车法规标准库-在这里了解中国</p>-->
      <p>
        <span>{{$t('footer.10')}}</span>
        <span>{{$t('footer.11')}}</span>
      </p>
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
    height:280px;
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
    width: 100%;
    margin: 0 auto;
    font-size: 13px;
    text-align: center;
  }
</style>
