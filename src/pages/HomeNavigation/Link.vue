<template lang='html'>
  <div id="main">
    <div class="center">
      <div class="nav-title">
        <h1>导航中心</h1>
      </div>
      <div class="nav-content">
        <div class="nav-left">
          <ul>
            <li :class="{'li_active': cur_showType == 'government'}">
              <a @click="maoClick('government')" :class="{'a_active': cur_showType == 'government'}">政府网站</a>
            </li>
            <li :class="{'li_active': cur_showType == 'approve'}">
              <a @click="maoClick('approve')" :class="{'a_active': cur_showType == 'approve'}">认证机构</a>
            </li>
            <li :class="{'li_active': cur_showType == 'detection'}">
              <a @click="maoClick('detection')" :class="{'a_active': cur_showType == 'detection'}">检测机构</a>
            </li>
          </ul>
        </div>
        <div class="nav-right">
          <div id="zhengfu" v-show="cur_showType == 'government'">
            <div class="nav-header">
              <h5>政府网站</h5>
            </div>
            <div class="nav-list">
              <ul>
                <li v-for="row in governmentWebList">
                  <a :href="row.href" target="_blank">
                    <h5>{{row.c_name}}</h5>
                    <p>{{row.e_name}}</p>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div id="renzheng" v-show="cur_showType == 'approve'">
            <div class="nav-header">
              <h5>认证机构</h5>
            </div>
            <div class="nav-list">
              <ul>
                <li v-for="row in approveList">
                  <a :href="row.href" target="_blank">
                    <h5>{{row.c_name}}</h5>
                    <p>{{row.e_name}}</p>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div id="jiance" v-show="cur_showType == 'detection'">
            <div class="nav-header">
              <h5>检测机构</h5>
            </div>
            <div class="nav-list">
              <ul>
                <li v-for="row in detectionList">
                  <a :href="row.href" target="_blank">
                    <h5>{{row.c_name}}</h5>
                    <p>{{row.e_name}}</p>
                  </a>
                </li>
              </ul>
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
        cur_showType: 'government',
        governmentWebList: [
          {c_name: '工业和信息化部',e_name: 'Ministry of Industry and information Technology', href: 'http://www.miit.gov.cn/'},
          {c_name: '国家发展和改革委员会',e_name: 'National Development and Reform Commission', href: 'http://www.ndrc.gov.cn/'},
          {c_name: '公安部',e_name: 'Ministry of Public Security', href: 'http://www.mps.gov.cn/'},
          {c_name: '财政部',e_name: 'Ministry ct Finance', href: 'http://www.mof.gov.cn/'},
          {c_name: '生态环境部',e_name: 'Ministry of Ecology and Environment', href: 'http://www.zhb.gov.cn/'},
          {c_name: '交通运输部',e_name: 'Ministry of Transport', href: 'http://www.mot.gov.cn/'},
          {c_name: '国家市场监督管理总局',e_name: 'State Administration for Market Regulation', href: 'http://samr.saic.gov.cn/'},
          {c_name: '商务部',e_name: 'Ministry of Commerce', href: 'http://samr.saic.gov.cn/'},
          {c_name: '国家税务局',e_name: 'Sate Administration or of Taxation', href: 'http://www.mofcom.gov.cn/'},
          {c_name: '海关总署',e_name: 'General Administration at Customers', href: 'http://www.chinatax.gov.cn/'},
          {c_name: '国家认证认可监督管理委员会',e_name: 'Certification and Accreditation Administration', href: 'http://www.cnca.gov.cn/'},
          {c_name: '国家标准化管理委员会',e_name: 'Standardization Administration of ThePeople\'s Republic. of China', href: 'http://www.sac.gov.cn/'},
          {c_name: '北京市环境保护局',e_name: 'Beijing Municipal Environment Production Bureau', href: 'http://www.bjepb.gov.cn/'},
          {c_name: '生态环境部机动车排污中心',e_name: 'Vehicle Emission Control Center', href: 'http://www.vecc-mep.org.cn/'},
          {c_name: '工业和信息化部装备工业发展中心',e_name: 'MIT Equipment Industry DevelopmentCenter', href: 'http://www.miit-eidc.org.cn/'}
        ],
        approveList: [
          {c_name: '中国质量认证中心',e_name: 'Chine Quality Certification Center', href: 'http://www.cqc.com.cn/'},
          {c_name: '中汽认证中心',e_name: 'China Certification Censer for Automotive Products', href: ''}
        ],
        detectionList: [
          {c_name: '中汽研汽车检验中心(天津)有限公司',e_name: 'CATARC Automotive Test Center （Tianjin）Co., Ltd.', href: 'http://www.tatc.com.cn/'},
          {c_name: '上海机动车险测认证技术研究中心有限公司',e_name: 'Shanghal Mctor Vehicle inspsctonCertication & Techrology novotian', href: 'http://www.smvic.com.cn/'},
          {c_name: '国家汽车质量监督检验中心(襄阳)',e_name: 'Natcnal Autor otlle Qua ity Supervisicnand" Test Center (Xlangrnp)', href: 'http://www.nast.com.cn/'}
        ]
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
  .li_active{
    background-color: #e6f7ff;
    border-right: 2px solid #1890ff;
  }
  .a_active{
    color: #2094ff !important;
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
</style>
