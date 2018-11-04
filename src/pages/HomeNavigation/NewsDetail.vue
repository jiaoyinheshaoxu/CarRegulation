<template>
  <div>
    <div class="center">
      <div id="day" class="white" style="margin-top: -40px">
        <div id="menu" class="clearfix">
          <div>
            <div id="fontSize">
              <span>字号：</span>
              <button id="small" data-index=1>小</button>
              <button id="middle" class="font-active" data-index=2>中</button>
              <button id="big" data-index=3>大</button>
            </div>
            <div id="mode">
              <span>模式：</span>
              <button id="sun" @click="showLight()"></button>
              <button class="moon" id="moon" @click="showDark()"></button>
            </div>
            <!--<div id="artSearch">-->
            <!--<input type="text" placeholder="文内搜索"/>-->
            <!--<button class="search"></button>-->
            <!--</div>-->
          </div>
          <div>
            <div id="language">
              <button class="china lan font-active">中文</button>
              <button class="english lan">EN</button>
              <button class="shu"></button>
              <button class="heng active"></button>
            </div>
            <div id="download">
              <button></button>
              <span>下载</span>
            </div>
            <div id="print">
              <button></button>
              <span>打印</span>
            </div>
          </div>
        </div>
      </div>
      <div id="article-header">
        <div class="line1 clearfix">
          <div id="bread-nav">
            <a href="">首页</a>
            <span>/</span>
            <a href="">标准搜索</a>
            <span>/</span>
            <a href="">标准详情</a>
          </div>
          <div class="collection">
            <a href="javascript:void(0)" id="like">
              <span class="no-heart fav"></span>
              <span class="wenzi">未收藏</span>
            </a>
          </div>
        </div>
        <div class="line2 clearfix">
          <div class="art-title">
            <h3 style="font-size: 22px">电动汽车用锂离子动力蓄电池包和系统 第一部分：高功率应用测试规程
              <div class="flag">
                <span class="point"> </span>
                <span>现行</span>
              </div>
            </h3>

          </div>

          <div class="en-art-title">
            <h3 style="font-size: 16px">Lithium-ion traction battery pack and system for Electric vehicles
              Part 1: Test
              specification for High power applications
              <div class="flag">
                <span class="point"> </span>
                <span>new</span>
              </div>
            </h3>
          </div>
        </div>
        <div class="line3">
          <div class="issuedDate">
            <p>发布日期 （Date issued） ：<span>2017-01-10</span></p>
          </div>
          <div class="effectiveDate">
            <p>实施日期 （Effective Date） ：<span>2017-01-10</span></p>
          </div>
          <div class="label">
            <span>中文标签</span>
            <span>English</span>
          </div>
        </div>
      </div>
      <article id="article">
        <h5>前言</h5>
        <p>本标准采用ECE R95法规(包括0|系列增补，02系列增补)《关于机动车侧面碰撞事故中乘员保护的统一规定》(英文版)。</p>
        <p>本标准在附录G中列出了本标准部分章条编号与ECER95法规章条编号的对照一览表。</p>
        <p>删除了ECE R95中认证申请、认证程序及认证标志、生产一致性、 生产非一致性的处理等内容， 其原因是标准体系和法规体系的形式差别所致。</p>
        <p>为便于使用，对于ECE R95法规部分还做了下列编辑性修改:</p>
        <p>a)“本法规”改为“本标准”</p>
        <p>b)增加资料性附录G。</p>
        <p>本标准的附录A、附录B、附录C、附录D、附录E、附录F为规范性附录:附录G为资料性附录。关于本标准实施日期的建议:</p>
        <p>a)对于新定型的车辆:自2006年7月1日起开始实施。</p>
        <p>b)对于在生产车型:自本标准发布之日起36个月后开始实施。</p>
        <p>c)建议本标准附录C中关于蜂窝铝块材料和规格的规定自本标准发布之日起36个月后开始实施。
        <p>本标准 由国家发展和改革委员会提出。</p>
        <p>本标准由全国汽车标准化技术委员会归口。</p>
        <p>本标准主要起草单位:中国汽车技术研究中心。</p>
        </p>
        <p>
          本标准参加起草单位:清华大学，，上海机动车检测中心,上海大众汽车有限公司，国家汽车质量监督检验中心(襄樊)，神龙汽车有限公司，广州本田汽车有限公司，奇瑞汽车公司，重庆长安汽车(集团)有限责任公司，大众汽车(中国)投资有限公司，泛亚汽车技术中心，国家重型汽车质量监督检验中心。</p>
        <p>
          本标准主要起草人:刘晓君，王阳，刘玉光，白鹏，孙振东，朱西产，吴卫，李维菁，张金换，黄世霖，郑祖丹，鲍臻炜，贾宏波，肖利寿，李三红，凌毅，李义明，叶晰海，鲁付俊，郑设，赵鸿，冯星野，侯飞，沈海东，孙浩，朱晓冬。</p>
        <h5>汽车侧面碰撞的乘员保护</h5>
        <h5>1范围</h5>
        <p>本标准适用于其质量为基准质量时，最低座椅的R点与地面的距离不超过700 mm的M1和N1类车辆。</p>
      </article>
      <div id="contents">
        <div class="contents_bor">
          <ul id="contents_list">
            <li>
              <a href=""></a>
              <b>前言</b>
            </li>
            <li>
              <a href=""></a>
              <b>汽车侧面碰撞的乘员保护</b>
              <ul>
                <li>1 范围</li>
                <li>1 范围</li>
                <li>1 范围</li>
                <li>1 范围</li>
              </ul>
            </li>
            <li>
              <a href=""></a>
              <b>附录A机动车座椅位置的H点和实际</b>
            </li>
            <li>
              <a href=""></a>
              <b>附录B碰撞试验程序</b>
            </li>
            <li>
              <a href=""></a>
              <b>附录C移动变形壁撞的特性</b>
            </li>
          </ul>
        </div>
      </div>
      <button id="mulu"></button>
      <button id="backTop"></button>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    methods: {
      showLight() {
        $('#article').css({
          background: '#fffff'
        })
        console.log(22)
      },
      showDark() {
        $('#article').css({
          background: '#cdcdcd'
        })
        console.log(11)
      }
    }
  }
</script>

<style scoped>
  .center {
    width: 74%;
    margin: 0px auto 50px;
  }

  .white #menu {
    height: 56px;
    padding-left: 40px;
    background-color: #d8d8d8;
    display: flex;
    /*align-items: center;*/
    justify-content: space-between;
    font-size: 14px;
  }

  .white #menu button {
    color: #9b9b9b;
  }

  .white #menu span {
    color: #5c5c5c;
  }

  .white #menu .font-active {
    color: #4a90e2;
  }

  .white #fontSize button:hover,
  .white #language button:hover {
    color: #4a90e2;
  }

  .white #sun {
    background: url("../../assets/images/bg.png") -240px -140px;
  }

  .white #moon {
    background: url("../../assets/images/bg.png") -320px -140px;
  }

  .white #moon:hover {
    background: url("../../assets/images/bg.png") -360px -140px;
  }

  .white .shu {
    background: url("../../assets/images/bg.png") -124px -182px;
  }

  .white .shu:hover {
    background: url("../../assets/images/bg.png") -84px -182px;
  }

  .white .shu.active {
    background: url("../../assets/images/bg.png") -84px -182px;
  }

  .white .heng {
    background: url("../../assets/images/bg.png") -202px -182px;
  }

  .white .heng:hover {
    background: url("../../assets/images/bg.png") -162px -182px;
  }

  .white .heng.active {
    background: url("../../assets/images/bg.png") -162px -182px;
  }

  .white #download button {
    background: url("../../assets/images/bg.png") -400px -140px;
  }

  .white #print button {
    background: url("../../assets/images/bg.png") -480px -138px;
  }

  .black #menu {
    height: 56px;
    padding-left: 40px;
    background-color: #6a6a6a;
    display: flex;
    /*align-items: center;*/
    justify-content: space-between;
    color: #9b9b9b;
    font-size: 14px;
  }

  .black #menu span {
    color: #ffffff;
  }

  .black #menu button {
    color: #9b9b9b;
  }

  .black #menu .font-active {
    color: #ffffff;
  }

  .black #fontSize button:hover,
  .black #language button:hover {
    color: #ffffff;
  }

  .black #moon {
    background: url("../../assets/images/bg.png") -360px -140px;
  }

  .black #sun {
    background: url("../../assets/images/bg.png") -280px -140px;
  }

  .black #sun:hover {
    background: url("../../assets/images/bg.png") -240px -140px;
  }

  .black .shu {
    background: url("../../assets/images/bg.png") -284px -182px;
  }

  .black .shu:hover {
    background: url("../../assets/images/bg.png") -244px -182px;
  }

  .black .shu.active {
    background: url("../../assets/images/bg.png") -244px -182px;
  }

  .black .heng {
    background: url("../../assets/images/bg.png") -362px -182px;
  }

  .black .heng:hover {
    background: url("../../assets/images/bg.png") -322px -182px;
  }

  .black .heng.active {
    background: url("../../assets/images/bg.png") -322px -182px;
  }

  .black #download button {
    background: url("../../assets/images/bg.png") -440px -140px;
  }

  .black #print button {
    background: url("../../assets/images/bg.png") -520px -138px;
  }

  #menu {
    height: 56px;
    padding-left: 40px;
    background-color: #dedede;
    display: flex;
    /*align-items: center;*/
    justify-content: space-between;
    color: #515151;
    font-size: 14px;
  }

  #menu > div {
    display: flex;
    align-items: center;
    width: 500px;
    justify-content: space-between;
  }

  #menu > div:last-child {
    justify-content: flex-end;
  }

  #menu > div:first-child {
    justify-content: flex-start;
  }

  #menu button {
    outline: none;
    cursor: pointer;
    border: none;
    background-color: transparent;
  }

  #fontSize {
    flex: 2;
  }

  #small,
  #middle,
  #big {
    border: none;
  }

  #small {
    font-size: 14px;
  }

  #middle {
    font-size: 16px;
    margin: 0 10px;
  }

  #big {
    font-size: 18px;
  }

  #mode {
    display: flex;
    flex: 3;
    align-items: center;
  }

  #sun,
  #moon,
  #no-sun,
  #no-moon {
    display: inline-block;
    width: 16px;
    height: 16px;
    margin: 0 5px;
  }

  /*#artSearch {*/
  /*margin-left: 0px;*/
  /*font-size: 0;*/
  /*background-color: white;*/
  /*border-radius: 5px;*/
  /*overflow: hidden;*/
  /*}*/
  /*#artSearch input {*/
  /*display: inline-block;*/
  /*!*width: 225px;*!*/
  /*height: 28px;*/
  /*padding-left: 10px;*/
  /*vertical-align: top;*/
  /*outline: none;*/
  /*border: none;*/
  /*}*/
  /*.search {*/
  /*display: inline-block;*/
  /*width: 28px;*/
  /*height: 28px;*/
  /*vertical-align: top;*/
  /*background: url("../../assets/images/search.png") no-repeat center;*/
  /*}*/
  #language button {
    /*margin-right: 20px;*/
  }

  #language {
    display: flex;
    justify-content: space-around;
    flex: 2;
  }

  #download {
    display: flex;
    justify-content: flex-end;
    flex: 2;
  }

  #print {
    display: flex;
    justify-content: center;
    flex: 2;
  }

  .shu,
  .heng,
  #download button,
  #print button {
    width: 20px;
    height: 20px;
    vertical-align: top;
  }

  #article-header {
    position: sticky;
    position: -webkit-sticky;
    top: 0;
  }

  .line1 {
    height: 50px;
    box-sizing: border-box;
    padding: 15px 0;
    background-color: #ffffff;
  }

  #bread-nav {
    float: left;
  }

  #bread-nav a,
  #bread-nav span {
    color: #9d9d9d;
  }

  #bread-nav a:last-child {
    color: #666666;
  }

  .collection {
    float: right;
  }

  .collection > a {
    display: flex;
    align-items: center;
  }

  .heart {
    display: inline-block;
    width: 40px;
    height: 20px;
    background: url("../../assets/images/bg.png") no-repeat -580px -135px;
  }

  .no-heart {
    display: inline-block;
    width: 40px;
    height: 20px;
    background: url("../../assets/images/bg.png") no-repeat -540px -135px;
  }

  .art-title,
  .en-art-title {
    display: inline-block;
    margin-bottom: 10px;
    font-size: 22px;
    line-height: 1.5;
  }

  .en-art-title h3 {
    font-weight: 200;
    font-size: 16px;
    font-family: sans-serif;
  }

  .flag {
    /*float: right;*/
    display: inline-block;
    font-size: 14px;
    margin-left: 10px;
  }

  .point {
    display: inline-block;
    width: 5px;
    height: 5px;
    background: #52c41a;
    border-radius: 50%;
    margin-bottom: 1px;
    margin-right: 5px;
  }

  .issuedDate,
  .effectiveDate,
  .label {
    display: inline-block;
    font-size: 14px;
  }

  .effectiveDate {
    margin: 0 55px 0 60px;
  }

  .label span {
    display: inline-block;
    background-color: #f5f5f5;
    padding: 2px 5px;
    margin-left: 15px;
    border: 1px solid #d9d9d9;
    font-size: 10px;
    border-radius: 2px;
  }

  #article-header,
  article {
    background-color: #ffffff;
  }

  #article-header {
    padding: 10px 40px 30px 40px;
    margin-bottom: 20px;
    line-height: 1.5;
    font-family: "Microsoft YaHei";
  }

  article {
    padding: 30px 50px 55px 40px;
    border: 1px solid #c0c0c0;
  }

  article h5 {
    line-height: 1.5;
    font-size: 14px;
    color: #000;
  }

  article p {
    line-height: 1.5;
    font-size: 12px;
    color: #666666;
  }

  article p:hover {
    background: #E8E8E8;
  }

  #mulu,
  #backTop {
    width: 40px;
    height: 40px;
    position: relative;
    bottom: 42px;
    border: none;
    background-color: transparent;
    border-radius: 5px;
    right: -101%;
    vertical-align: top;
    outline: none;
    cursor: pointer;
  }

  #mulu {
    background: url("../../assets/images/bg.png") -80px -240px;
  }

  #mulu:hover {
    background: url("../../assets/images/bg.png") -160px -240px;
  }

  #backTop {
    background: url("../../assets/images/bg.png") -240px -240px;
  }

  #backTop:hover {
    background: url("../../assets/images/bg.png") -320px -240px;
  }

  /*mululist */
  #contents {
    width: 12%;
    height: 500px;
    background: #fff;
    border: 1px solid transparent;
    border-radius: 5px;
    position: fixed;
    left: 1667px;
    top: 260px;
    padding: 17px;
    box-sizing: border-box;
  }

  #contents > .contents_bor {
    width: 100%;
    height: 380px;
    border-left: 1px solid #ddd;
  }

  #contents > .contents_bor ul {
    list-style: none;
  }

  #contents > .contents_bor > ul li {
    margin-bottom: 10px;
  }

  #contents > .contents_bor > ul li a {
    display: inline-block;
    width: 15px;
    height: 15px;
    background: url("../../assets/images/bg6.png") -699px -726px;
  }

  #contents > .contents_bor > ul li a.moren {
    display: inline-block;
    width: 15px;
    height: 15px;
    background: url("../../assets/images/bg6.png") -699px -726px;
  }

  #contents > .contents_bor > ul li a.active_logo {
    background: url("../../assets/images/bg6.png") -698px -595px;
  }

  #contents > .contents_bor > ul li ul {
    margin-left: 16px;
  }

  #contents > .contents_bor > ul li ul li {
    margin-bottom: 10px;
  }

  #contents_bor {
    position: relative;
  }

  #contents_list > li {
    margin-bottom: 20px;
    position: relative;
    left: -6px;
  }

  #contents_list {
    color: #5c5c5c;
  }

  #contents_list > li > b {
    color: #5c5c5c;
    /* font-weight:normal;*/
    font-size: 16px;
  }

</style>
