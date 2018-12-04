<template lang='html'>
  <div id="box">
    <div id="activit">
      <h3>最新翻译</h3>
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
      <p v-show="standardLawList.length == 0" class="noDateTip">暂无数据</p>
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
  </div>
</template>

<script>
  export default {
    data() {
      return {
        pageSize: 10,
        currentPage: 1,
        total: 0,
        standardLawList: []
      }
    },
    mounted() {
      this.getStandardLawList()
    },
    computed: {
      language() {
        return this.$store.state.language
      }
    },
    watch: {
      language: function () {
        this.getStandardLawList()
      }
    },
    methods: {
      async getStandardLawList () {
        let url = 'DocumentService.asmx/SearchNewestList'
        let params = {
          type: 1,
          page: this.currentPage,
          rows: this.pageSize,
          language: this.$t('language')
        }
        let data = await this.api.get(url, params)
        this.total = data.total
        this.standardLawList = data.documentList
      },
      handleSizeChange (val) {
        if(!this.global.memberId) {
          this.$message({
            showClose: true,
            message: '该操作只有登录后才可以有效，请先登录！'
          });
          return
        }
        this.pageSize = val
        this.getStandardLawList()
      },
      handleCurrentChange (val) {
        if(!this.global.memberId) {
          this.$message({
            showClose: true,
            message: '该操作只有登录后才可以有效，请先登录！'
          });
          return
        }
        this.currentPage = val
        this.getStandardLawList()
      },
      goDetail (row) {
        this.$router.push({
          name: '/LatestTranslation/StandardDetail',
          params: {
            id: row.Id
          }
        })
      }
    }
  }
</script>

<style scoped>
  #box{
    margin-top: -40px;
  }
  .noDateTip{
    height: 36px;
    line-height: 36px;
    text-indent: 30px;
  }
  .lf{float: left}
  .rt{float: right}
  #activit{
    width: 85%;
    min-height:420px ;
    margin:0 auto;
    margin-bottom:20px;
  }
  #activit h3{
    height: 60px;
    line-height: 60px;
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
  a:visited{
    color: red;
  }
</style>

