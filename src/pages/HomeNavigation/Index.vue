<template lang='html'>
  <div id="main">
    <!-- 搜索栏 -->
    <div id="search">
      <div id="search_content">
        <div id="i_page_center">
          <ul id="i_main_box">
            <li class="i_select_box">
              <span id="i_fisrt">标题 </span>
              <b class="down" style="cursor: pointer"></b>
              <ul class="i_son_ul">
                <li><span>标题</span></li>
                <li><span>内容</span></li>
              </ul>
            </li>
          </ul>
        </div>
        <input type="text" placeholder="请输入内容" class="search_input" v-model="searchStr">
        <div id="search_btn" @click="SearchForIndexByLabelOrTitle()">
          <a>搜索</a>
        </div>
      </div>
      <div id="hot">
        <span>热门：</span>
        <ul>
          <li v-for="row in hotList" v-show="row.keys">
            <a @click="hotClick(row)" :class="{'blue': cur_hot == row.keys}">{{row.keys}}</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="tableBox" v-show="searchList.length > 0">
      <el-table
        :data="searchList"
        style="width: 100%"
        @row-click="goDetail"
        :default-sort = "{prop: 'date', order: 'descending'}"
      >
        <el-table-column
          type="index"
          align="center"
          width="100">
        </el-table-column>
        <el-table-column
          prop="Title"
          label="标准或法规名称"
          sortable
          header-align="center"
          align="left">
        </el-table-column>
        <el-table-column
          prop="FileState"
          label="状态"
          align="center"
          width="100"
          :formatter="dealFileState">
        </el-table-column>
        <el-table-column
          prop="ReleaseDate"
          label="发布日期"
          sortable
          align="center"
          :formatter="dealReleaseDate"
          width="180">
        </el-table-column>
        <el-table-column
          prop="ImplementDate"
          label="实施日期"
          sortable
          align="center"
          :formatter="dealImplementDate"
          width="180">
        </el-table-column>
      </el-table>
      <el-pagination
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
    <div style="overflow: hidden; background-color: #ffffff" v-show="searchList.length == 0">
      <!-- 标准动态 -->
      <div id="standard_activit">
        <!-- title -->
        <div class="activit">
          <span>标准法规动态</span>
          <a @click="goStandardRow()">更多 ></a>
        </div>
        <p v-show="LawList.length == 0" class="noDateTip">暂无数据</p>
        <!-- 内容 -->
        <ul id="act_content" class="activit_content">
          <li v-for="row in LawList">
            <a @click="standardLawsClick(row)">
              <span class="title" :title="row.Title">{{row.Title}}</span>
              <i>{{new Date(row.CreatorTime).getTime() | formatTime('YMD')}}</i>
            </a>
          </li>
        </ul>
      </div>
      <!-- 最新翻译 -->
      <div id="new_translate">
        <!-- title -->
        <div class="activit">
          <span>最新翻译</span>
          <a @click="goLatestTrans()">更多 ></a>
        </div>
        <p v-show="LatestList.length == 0" class="noDateTip">暂无数据</p>
        <!-- 内容 -->
        <ul class="activit_content">
          <li v-for="row in LatestList">
            <a @click="newsClick(row)">
              <span class="title" :title="row.Title">{{row.Title}}</span>
              <i>{{new Date(row.CreatorTime).getTime() | formatTime('YMD')}}</i>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <!-- 声明 -->
    <div id="declare" style="margin-top: 20px">
      <h2>免责声明</h2>
      <p>本系统对质检总局、国家标准委自2017年1月1日后新发布的国家标准，将在《国家标准批准发布公告》发布后20个工作日内公开标准文本，其中涉及采标的推荐性国家标准的公开，将在遵守国际版权政策前提下进行。</p>
      <p>本系统公开了质检总局、国家标准委2017年1月1日前已批准发布的所有强制性国家标准、推荐性国家标准（非采标）。</p>
      <p>本系统所提供的电子文本仅供参考，请以正式标准出版物为准。</p>
      <p>本系统所提供的电子文本仅供个人学习、研究之用，未经授权，禁止复制、发行、汇编、翻译或网络传播等，侵权必究。</p>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        searchStr: '',
        currentPage: 1,
        pageSize: 10,
        total: 0,
        languageType: 1, //1汉语 2英语
        searchList: [],
        hotList: ['电动汽车', '智能驾驶', '尾气标准', '二手车', '叉车传动', '充电桩租赁'],
        cur_hot: '',
        List: [],
        LatestList: [],
        LawList: []
      }
    },
    methods: {
      hotClick(row) {
        this.searchStr = row.keys
        this.cur_hot = row.keys
        this.SearchForIndexByLabelOrTitle()
      },
      async AddDocumentSearchKeys() {
        let url = '/OtherService.asmx/AddDocumentSearchKeys'
        let params = {
          keys: this.searchStr
        }
        let data = await this.api.post(url, params)
        if (data) {
        }
      },
      async SearchForIndexByLabelOrTitle() {
        this.AddDocumentSearchKeys()
        if ($('#i_fisrt').html().includes("标题")) {
          let url = 'DocumentService.asmx/SearchForIndexByLabelOrTitle'
          let params = {
            page: this.currentPage,
            rows: this.pageSize,
            keyword: this.searchStr,
            languageType: this.languageType
          }
          let data = await this.api.post(url, params, {loading: true})
          if (data) {
            this.searchList = data.documentList
            this.total = data.total
            if (this.searchList.length == 0) {
              this.$message({
                showClose: true,
                message: '暂无搜索结果！'
              });
            }
          }
        } else if ($('#i_fisrt').html().includes('内容')) {
          let url = 'DocumentService.asmx/SearchForIndexByContent'
          let params = {
            page: this.currentPage,
            rows: this.pageSize,
            keyword: this.searchStr,
            languageType: this.languageType
          }
          let data = await this.api.post(url, params)
          if (data) {
            this.searchList = data.documentList
            this.total = data.total
            if (this.searchList.length == 0) {
              this.$message({
                showClose: true,
                message: '暂无搜索结果！'
              });
            }
          }
        }
      },
      dealImplementDate(row) {
        function addZero(val) {
          if (val < 10) {
            return '0' + val
          } else {
            return val
          }
        }
        let time = new Date(row.ImplementDate)
        return time.getFullYear() + '-' + addZero(time.getMonth() + 1) + '-' + addZero(time.getDate())
      },
      dealReleaseDate(row) {
        function addZero(val) {
          if (val < 10) {
            return '0' + val
          } else {
            return val
          }
        }
        let time = new Date(row.ReleaseDate)
        return time.getFullYear() + '-' + addZero(time.getMonth() + 1) + '-' + addZero(time.getDate())
      },
      dealFileState(row) {
        return row.FileState
      },
      handleSizeChange (val) {
        if(!this.global.memberId) {
          this.$message({
            showClose: true,
            message: '该操作只有登陆后才可以有效，请先登陆！'
          });
          return
        }
        this.pageSize = val
        this.SearchForIndexByLabelOrTitle()
      },
      handleCurrentChange (val) {
        if(!this.global.memberId) {
          this.$message({
            showClose: true,
            message: '该操作只有登陆后才可以有效，请先登陆！'
          });
          return
        }
        this.currentPage = val
        this.SearchForIndexByLabelOrTitle()
      },
      goDetail (row) {
        this.$router.push({
          name: '/Index/StandardDetail',
          params: {
            id: row.Id
          }
        })
      },
      newsClick(row) {
        this.$router.push({
          name: '/Index/StandardDetail',
          params: {
            id: row.Id
          }
        })
      },
      standardLawsClick(row) {
        this.$router.push({
          name: '/Index/NewsDetail',
          params: {
            id: row.Id
          }
        })
      },
      goLatestTrans() {
        this.$router.push({
          path: '/LatestTranslation'
        })
      },
      goStandardRow() {
        this.$router.push({
          path: '/StandardLawState'
        })
      },
      async GetIndexByTopList () {
        let url = 'DocumentService.asmx/GetIndexByTopList'
        let params = {
          languageType: 1,
          topNum: 10
        }
        let data = await this.api.post(url, params)
        this.LawList = data.informationList
        this.LatestList = data.newestList
      },
      async getHotKeys() {
        let url = 'OtherService.asmx/DocumentSearchKeysStatTop'
        let params = {}
        let data = await this.api.post(url, params)
        if (data) {
          this.hotList = data
        }
      }
    },
    mounted() {
      this.AddDocumentSearchKeys()
      this.GetIndexByTopList()
      this.getHotKeys()
      $('.i_son_ul').hide();
      $("#search_content").css("border-radius","5px")
      $('.i_select_box').click(function () {
        if($('.i_select_box b').attr('class').includes('down') && !$('.i_select_box b').attr('class').includes('up')){
          $('ul.i_son_ul li').css("background","");
          //改变箭头方向，
          $('.i_select_box b').addClass("up");
          $(this).parent().find('ul.i_son_ul').slideDown();
          $("#search_content").css("border-radius","5px 5px 5px 0")
        }else if($('.i_select_box b').attr('class').includes('up')){
          $('.i_son_ul').slideUp();
          //移动已添加上的背景，在添加新的样式
          $('.i_select_box b').removeClass("up");
          $('.i_select_box b').addClass("down");
          $("#search_content").css("border-radius","5px")
        }
      });
      $('ul.i_son_ul li').click(function (e) {
        e.stopPropagation()
        e.cancelBubble = true
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
  .noDateTip{
    height: 36px;
    line-height: 36px;
    text-indent: 30px;
  }
  #declare p{
    min-height: 36px;
    line-height: 36px;
  }
  .blue{
    color: #1C92FE !important;
  }
  .title{
    float: left;
    width: 400px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .pageStyle{
    text-align: center;
    margin-top: 20px;
  }
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
    width: 705px;
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
    width: 100%;
  }
  #new_translate{
    width: 100%;
  }
  .activit{
    width:100%;
    height:60px;
    padding:0 30px;
    box-sizing:border-box;
    background: #ffffff;
    line-height: 60px;
    background: url("../../assets/images/ind_ti.png") repeat-x;
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
    min-height:355px;
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
