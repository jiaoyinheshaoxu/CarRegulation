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
            <div v-show="$t('language') == 1">
              <p>
                中国汽车法规标准网致力于为用户提供可靠、及时和专业的法规内容服务，包括中英版本的中国汽车法规和标准和针对中国汽车行业合规要求的解读和分析。
              </p>
              <p>
                中国汽车法规标准网创建于2018年，定位于成为最优质的中国汽车法规信息网站，帮助用户防范合规风险，并持续满足不断变化的中国汽车法规要求。
              </p>
              <p>
                本网站采用简易便捷的搜索界面和灵活多样的搜索方式。会员可使用标题、关键词、全文等搜索并获取相关信息，网站内容可按多种分类方式进行检索。为确保所有信息内容及时可靠，网站根据中国法规动态实时更新相关法规内容。网站还专设最新翻译和法规更新版块，方便用户查阅翻译文件或内容。
              </p>
              <p>
                您的满意是我们不懈的追求。如有任何问题、要求或建议，请与我们联系
              </p>
            </div>
            <div v-show="$t('language') == 2">
              <p>
                Chineseautoregs is dedicated to providing an easy access to reliable, timely and professional China auto regulatory information services, including China automotive regulations and standards in both English and Chinese, most up-to-date and insightful analysis of industry trend, as well as expert and in-depth consulting services for compliance purpose.
              </p>
              <p>
                Founded by Dynaso in 2018, Chineseautoregs.com is positioned as a key source of best-quality regulatory information of Chinese auto sector, whereby aiding our clients to toe the line—stay compliant with Chinese technical requirements.
              </p>
              <p>
                The website employs a simple, intuitive and user-friendly search interface. You can access a Chinese standard or regulation in no time by simply entering title/keyword/content. All the contents, which are properly categorized and well laid-out, will be updated in time to stay up with any regulatory changes in China. We also pick out the latest translation or content in Latest Translation or Regulatory Updates for you.
              </p>
              <p>
                Your satisfaction is our enduring pursuit. Please free to contact us should you have any suggestion，request, or any other issues related to our website.
              </p>
            </div>
          </div>
          <div id="renzheng" v-show="cur_showType == 'approve'">
            <div v-show="$t('language') == 1">
              <p>
                迅孚技术咨询有限公司（Dynaso）于2005年7⽉成⽴于北京，是⼀家国际化的专注于汽车⾏业的咨询和技术服务公司。我们主要服务全球化的汽车企业、零部件制造商以及他们的进⼜商，通过专门的服务团队以及定制化的服务项⽬，向客户企业提供市场准⼊咨询和代理服务、市场研究及企业教育与培训服务，帮助他们在市场准⼊、业绩增长以及发展竞争优势⽅⾯处理复杂的⾏业挑战。我们的服务产品包括市场准⼊相关的研究和咨询、技术法规标准服务、产品认证代理服务，市场情报与研究，以及提升组织与个⼈创新思维和能⼒的企业教育与培训服务。
              </p>
              <p>
                我们在上海、新加坡、墨尔本设有办公室，在全球重点汽车市场有诸多的合作伙伴。
              </p>
              <p>
                了解更多信息，请登入迅孚公司网站<a href="http://www.dynaso.com.cn" target="_blank">www.dynaso.com.cn</a> , 也欢迎关注我们的微信公众号“车轨杂谈”。
              </p>
              <div class="imgBox">
                <img src="../../assets/images/gzh.png" alt="">
              </div>
            </div>
            <div v-show="$t('language') == 2">
              <p>
                Founded in 2005, Dynaso is a China-based specialist consultancy in automotive industry. We mainly serve global automotive manufacturers, helping them tackle the complex challenges of the industry across fields of market access, business growth and competitive advantage build-up, through dedicated teams and custom-built programs. Our business scope covers market access consulting & service, market research, and corporate training.
              </p>
              <p>
                We have offices in Beijing, Shanghai, Singapore and a joint-office in Melbourne, with some alliance partners in automotive markets around the world.
              </p>
              <p>
                For more information, please visit the website of <a href="http://www.dynaso.com.cn" target="_blank">www.dynaso.com.cn</a>, or you can follow us on WeChat - ID: Vehicle legislation and Certifcation By-talk
              </p>
              <div class="imgBox">
                <img src="../../assets/images/gzh.png" alt="">
              </div>
            </div>
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
  .imgBox{
    text-align: center;
  }
  .imgBox img{
    width: 120px;
  }
  #zhengfu, #renzheng{
    overflow: hidden;
    padding-top: 20px;
  }
  #zhengfu p, #renzheng p{
    padding: 0 20px;
    text-indent: 32px;
    min-height: 36px;
    line-height: 36px;
    font-size: 16px;
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

