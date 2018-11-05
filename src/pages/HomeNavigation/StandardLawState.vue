<template lang='html'>
  <div id="activit">
    <h3>标准法规动态</h3>
    <ul class="activit_content" id="activit_content">
      <li v-for="row in standardLawList" @click="goDetail(row)">
        <a>
          <div class="activit_content_title">
            <b class="lf">{{row.Title}}</b>
            <b class="rt">{{new Date(row.CreatorTime).getTime() | formatTime('YMD')}}</b>
          </div>
          <div class="title_content">
            <p>{{row.Centent}}</p>
          </div>
        </a>
      </li>
    </ul>
    <p v-show="standardLawList.length == 0" style="height: 36px;line-height: 36px">暂无数据</p>
    <el-pagination
      v-show="standardLawList.length > 0"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40, 50]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      class="pageStyle">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        pageSize: 10,
        currentPage: 1,
        total: 0,
        languageType: 1,
        standardLawList: [
          {'Id': 1, 'Title': '国家标准委关于成立全国综合交通运输标准化技术委员会等4个技术委员会', 'Centent': '国家标准化管理委员会但是房间里看书记得看了更加快乐就是卡里的感觉 三菱东京高考啦阿萨德老公家阿斯兰教工路上的感觉楼上的几个联赛等级输卵管积水的垃圾股', 'CreatorTime': '2018-08-08'},
          {'Id': 1, 'Title': '国家标准委关于成立全国综合交通运输标准化技术委员会等4个技术委员会', 'Centent': '国家标准化管理委员会但是房间里看书记得看了更加快乐就是卡里的感觉 三菱东京高考啦阿萨德老公家阿斯兰教工路上的感觉楼上的几个联赛等级输卵管积水的垃圾股', 'CreatorTime': '2018-08-08'},
          {'Id': 1, 'Title': '国家标准委关于成立全国综合交通运输标准化技术委员会等4个技术委员会', 'Centent': '国家标准化管理委员会但是房间里看书记得看了更加快乐就是卡里的感觉 三菱东京高考啦阿萨德老公家阿斯兰教工路上的感觉楼上的几个联赛等级输卵管积水的垃圾股国家标准委关于成立全国综合交通运输标准化技术委员会等4个技术委员会\', \'Centent\': \'国家标准化管理委员会但是房间里看书记得看了更加快乐就是卡里的感觉 三菱东京高考啦阿萨德老公家阿斯兰教工路上的感觉楼上的几个联赛等级输卵管积水的垃圾股', 'CreatorTime': '2018-08-08'}
        ]
      }
    },
    mounted() {
      this.getStandardLawList()
    },
    methods: {
      async getStandardLawList () {
        let url = 'DocumentService.asmx/SearchInformationList'
        let params = {
          type: 1,
          page: this.currentPage,
          rows: this.pageSize,
          languageType: this.languageType
        }
        let data = await this.api.post(url, params)
        console.log(data)
        this.total = data.total
        this.standardLawList = data.documentList
      },
      handleSizeChange (val) {
        this.pageSize = val
        this.getStandardSearch()
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange (val) {
        this.currentPage = val
        this.getStandardSearch()
        console.log(`当前页: ${val}`);
      },
      goDetail (row) {
        console.log(row)
        if (!this.global.memberId) {
          this.$message({
            showClose: true,
            message: '登录后才可以查看，请先登录!'
          });
          return
        }
        this.$router.push({
          path: '/StandardLawState/NewsDetail',
          params: {
            id: row.Id
          }
        })
      }
    }
  }
</script>

<style scoped>
  .lf{float: left}
  .rt{float: right}
  #activit{
    width: 80%;
    min-height:420px ;
    margin:0 auto;
    margin-bottom:20px;
  }
  #activit h3{
    margin-top: -10px;
    margin-bottom:20px;
    color:dodgerblue;
    font-size: 1.17em;
    font-weight: bolder;
  }
  #activit .activit_content{
    width:100%;
    height:100%;
    padding:0;
    background:#fff;
    border:1px solid #ccc;
  }
  .activit_content_title{
    overflow: hidden;
  }
  #activit>.activit_content>li{
    margin:0;
    padding-bottom: 15px;
    padding-top:15px;
    border-bottom:1px dotted #ccc;
    padding-left:20px;
    padding-right:20px;

  }

  #activit>.activit_content .list_bg{
    background:#e6f7ff ;
  }
  #activit>.activit_content #list_before{
    padding-top:15px;
  }
  #activit>.activit_content>li.border_none{
    border-bottom:0;
  }
  #activit>.activit_content>li>.activit_content_title .rt{
    color:#999;
    font-weight: normal;
    font-size: 12px;
  }
  .activit_content .title_content p{
    color:#999;
    font-size: 14px;
    margin-top: 15px;
  }
  /*��ҳ*/
  .page{
    width:65%;
    margin:0 auto;
    margin-bottom:70px;
  }
  #page_left{
    float: left;
    width:8%;
    color: #6F6F6F;
    font-size: 14px;
    margin-top:5px;
  }
  #page_center{
    height: 27px;
    float: left;
    width:10%;

  }
  #page_right{
    float: left;
    width: 80%;
  }
  #main_box{
    display: inline-block;
    color: #6F6F6F;
  }
  .select_box {
    width:65px;
    border:1px solid #DADADA;
    text-align: center;
    background-color: #FFFFFF;
    list-style: none;
  }
  #fisrt_span {
    cursor: pointer;
    display: block;
    line-height: 25px;
    width: 100%;
    height: 25px;
    text-align: left;
    box-sizing: border-box;
    padding-left: 17px;
    background: url(../../assets/images/total.png) -37px -94px;
  }
  .select_box ul li {
    cursor:pointer;
    color: #6F6F6F;
  }
  .son_ul {
    width:64px;
    border-top:1px solid #DADADA;
    background-color: #FFFFFF;
    z-index:100;
  }
  .son_ul li {
    display:block;
    line-height:25px;
    padding-left:0px;
    width:65px;
    z-index:100;
    color: #000000;
    list-style: none;
  }
  .son_ul span {
    cursor:pointer;
    display: inline-block;
    width: 30px;
    text-align: left;
  }
  #main_result{
    display: inline-block;
    color: #6F6F6F;
    height: 27px;
    line-height: 27px;
  }
  #main_result li{
    list-style: none;
    float: left;
    font-size: 14px;
    margin-left:3px;
  }
  #main_page{
    float: right;
  }
  #main_page li{
    list-style: none;
    float: left;
    width: 25px;
    height: 25px;
    border:1px solid #EAEAEA;
    text-align: center;
    color:#6F6F6F ;
    margin-left:3px;
    margin-right:3px;
    border-radius: 5px;
    cursor: pointer;
  }
  .magin_page_current{
    background:  #1992FF;
    color: #FFFFFF !important;
  }
  #activit .activit_content li:hover{
    background-color: aliceblue;
  }
  .pageStyle{
    text-align: center;
    margin-top: 20px;
  }
</style>
