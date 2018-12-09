<template lang='html'>
  <div id="main">
    <!-- 搜索栏 -->
    <div id="search">
      <div id="search_content">
        <div id="i_page_center">
          <ul id="i_main_box">
            <li class="i_select_box">
              <span id="i_fisrt">{{$t('index.11')}}</span>
              <b class="down" style="cursor: pointer;float: right;margin-top: 12px"></b>
              <ul class="i_son_ul">
                <li><span>{{$t('index.11')}}</span></li>
                <li><span>{{$t('index.0')}}</span></li>
              </ul>
            </li>
          </ul>
        </div>
        <input type="text" :placeholder="$t('index.12')" class="search_input" v-model="searchStr">
        <div id="search_btn" @click="SearchForIndexByLabelOrTitle()">
          <a>{{$t('index.1')}}</a>
        </div>
      </div>
      <div id="hot">
        <span>{{$t('index.2')}}：</span>
        <ul>
          <li v-for="row in hotList" v-show="row.keys">
            <a @click="hotClick(row)" :class="{'blue': cur_hot == row.keys}">{{row.keys}}</a>
          </li>
        </ul>
      </div>
    </div>

    <!-- 测试代码 -->
      <!--<div style="margin: 20px; font-size: 30px; color: red;">
	      <h1>{{$t("message.title")}}</h1>
	      <input style="width: 300px;" class="form-control" :placeholder="$t('placeholder.enter')">
	    </div>-->

    <div style="overflow: hidden" v-show="(searchList.length > 0 && searchType == 3) || (searchType == 1 || searchType == 2)">
      <div id="left_search">
        <div id="title">
          <a  href="#" :class="{'title_a_active':cur_active == 'standard' }" @click="standardClick()">{{$t('standardSearch.0')}}</a>
          <a  href="#" :class="{'title_a_active':cur_active == 'regulation' }" @click="regulationClick()">{{$t('lawSearch.0')}}</a>
        </div>
        <div id="area" v-show="cur_active == 'standard'">
          <p id="type_area" class="area_link"><span></span>{{$t('standardSearch.1')}}</p>
          <ul id="a_content" class="area_content">
            <li v-for="row in fieldList">
              <a v-show="$t('language') == 1" @click="fieldClick(row)" :class="{'selected': cur_fieldId == row.id}">{{row.itemName}}</a>
              <a v-show="$t('language') == 2" @click="fieldClick(row)" :class="{'selected': cur_fieldId == row.id}">{{row.itemCode}}</a>
            </li>
          </ul>
        </div>
        <div id ="state" v-show="cur_active == 'standard'">
          <p  id="type_state"class="area_link"><span></span>{{$t('lawSearch.2')}}</p>
          <ul id="s_content" class="area_content">
            <li v-for="row in statusList">
              <a v-show="$t('language') == 1" @click="statusClick(row)" :class="{'selected': cur_statusId == row.id}">{{row.itemName}}</a>
              <a v-show="$t('language') == 2" @click="statusClick(row)" :class="{'selected': cur_statusId == row.id}">{{row.itemCode}}</a>
            </li>
          </ul>
        </div>
        <div id ="notic" v-show="cur_active == 'standard'">
          <p id="type_notic" class="area_link"><span></span>{{$t('standardSearch.1')}}</p>
          <ul id="n_content" class="area_content">
            <li v-for="row in adoptList">
              <a v-show="$t('language') == 1" @click="adoptClick(row)" :class="{'selected': cur_adoptId == row.id}">{{row.itemName}}</a>
              <a v-show="$t('language') == 2" @click="adoptClick(row)" :class="{'selected': cur_adoptId == row.id}">{{row.itemCode}}</a>
            </li>
          </ul>
        </div>
        <div id="area" v-show="cur_active == 'regulation'">
          <p id="type_area" class="area_link"><span></span>{{$t('lawSearch.1')}}</p>
          <ul id="a_content" class="area_content">
            <li v-for="row in publishList">
              <a v-show="$t('language') == 1" @click="publishClick(row)" :class="{'selected': cur_publishId == row.id}">{{row.itemName}}</a>
              <a v-show="$t('language') == 2" @click="publishClick(row)" :class="{'selected': cur_publishId == row.id}">{{row.itemCode}}</a>
            </li>
          </ul>
        </div>
        <div id ="state" v-show="cur_active == 'regulation'">
          <p  id="type_state"class="area_link"><span></span>{{$t('lawSearch.2')}}</p>
          <ul id="s_content" class="area_content">
            <li v-for="row in restatusList">
              <a v-show="$t('language') == 1" @click="restatusClick(row)" :class="{'selected': cur_restatusId == row.id}">{{row.itemName}}</a>
              <a v-show="$t('language') == 2" @click="restatusClick(row)" :class="{'selected': cur_restatusId == row.id}">{{row.itemCode}}</a>
            </li>
          </ul>
        </div>
        <div id ="notic" v-show="cur_active == 'regulation'">
          <p id="type_notic" class="area_link"><span></span>{{$t('lawSearch.3')}}</p>
          <ul id="n_content" class="area_content">
            <li v-for="row in directionList">
              <a v-show="$t('language') == 1" @click="directionClick(row)" :class="{'selected': cur_directionId == row.id}">{{row.itemName}}</a>
              <a v-show="$t('language') == 2" @click="directionClick(row)" :class="{'selected': cur_directionId == row.id}">{{row.itemCode}}</a>
            </li>
          </ul>
        </div>
      </div>
      <div class="tableBox" id="right_list">
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
            :label="$t('index.3')"
            sortable
            header-align="center"
            align="left">
          </el-table-column>
          <el-table-column
            prop="FileState"
            :label="$t('index.4')"
            align="center"
            width="100"
            :formatter="dealFileState">
          </el-table-column>
          <el-table-column
            prop="ReleaseDate"
            :label="$t('index.5')"
            sortable
            align="center"
            :formatter="dealReleaseDate"
            width="180">
          </el-table-column>
          <el-table-column
            prop="ImplementDate"
            :label="$t('index.6')"
            sortable
            align="center"
            :formatter="dealImplementDate"
            width="180">
          </el-table-column>
        </el-table>
        <el-pagination
          v-show="searchList.length > 0"
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

    <div style="overflow: hidden; background-color: #ffffff" v-show="searchList.length == 0 && searchType == 3">
      <!-- 标准动态 -->
      <div id="standard_activit">
        <!-- title -->
        <div class="activit">
          <span>{{$t('content.3')}}</span>
          <a @click="goStandardRow()">{{$t('index.7')}} ></a>
        </div>
        <p v-show="LawList.length == 0" class="noDateTip">{{$t('index.8')}}</p>
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
          <span>{{$t('content.4')}}</span>
          <a @click="goLatestTrans()">{{$t('index.7')}} ></a>
        </div>
        <p v-show="LatestList.length == 0" class="noDateTip">{{$t('index.8')}}</p>
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
      <h2>{{$t('index.9')}}</h2>
      <p>{{$t('index.10')}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        searchStr: '',
        cur_searchStr: '',
        currentPage: 1,
        pageSize: 10,
        total: 0,
        searchList: [],
        hotList: [],
        cur_hot: '',
        List: [],
        LatestList: [],
        LawList: [],
        /*标准检索*/
        fieldList: [],
        cur_fieldId: '',
        cur_fieldName: '',
        statusList: [],
        cur_statusId: '',
        cur_statusName: '',
        adoptList: [],
        cur_adoptId: '',
        cur_adoptName: '',
        cur_fieldCode: '',
        cur_statusCode: '',
        cur_adoptCode: '',
        /*法规检索*/
        publishList: [],
        cur_publishId: '',
        cur_publishName: '',
        restatusList: [],
        cur_restatusId: '',
        cur_restatusName: '',
        directionList: [],
        cur_directionId: '',
        cur_directionName: '',
        cur_publishCode: '',
        cur_restatusCode: '',
        cur_directionCode: '',
        /**/
        cur_active: 'standard',
        searchType: 3
      }
    },
    methods: {
      async getRegulationSearch () {
        let url = '/DocumentService.asmx/SearchRegulationByType'
        let params = {
          fileState: this.cur_restatusCode,
          publisher: this.cur_publishCode,
          direction: this.cur_directionCode,
          language: this.$t('language'),
          type: 2,
          page: this.currentPage,
          rows: this.pageSize,
          keys: this.searchStr
        }
        let data = await this.api.get(url, params)
        if (data) {
          this.total = data.total
          this.searchList = data.documentList
          if (this.searchList.length == 0) {
            this.$message({
              showClose: true,
              message: this.$t('index.14')
            });
          }
        }
      },
      restatusClick (row) {
        if (this.cur_restatusId == row.id) {
          this.cur_restatusId = ''
          this.cur_restatusName = ''
          this.cur_restatusCode = ''
        } else {
          this.cur_restatusId = row.id
          this.cur_restatusName = row.itemName
          this.cur_restatusCode = row.itemCode
        }
        this.searchType = 2
        this.getStandardAndRegulationSearch()
      },
      publishClick (row) {
        if (this.cur_publishId == row.id) {
          this.cur_publishId = ''
          this.cur_publishName= ''
          this.cur_publishCode = ''
        } else {
          this.cur_publishId = row.id
          this.cur_publishName = row.itemName
          this.cur_publishCode = row.itemCode
        }
        this.searchType = 2
        this.getStandardAndRegulationSearch()
      },
      directionClick (row) {
        if (this.cur_directionId == row.id) {
          this.cur_directionId = ''
          this.cur_directionName = ''
          this.cur_directionCode = ''
        } else {
          this.cur_directionId = row.id
          this.cur_directionName = row.itemName
          this.cur_directionCode = row.itemCode
        }
        this.searchType = 2
        this.getStandardAndRegulationSearch()
      },
      async getRegulationLeft () {
        let url = '/DocumentService.asmx/RegulationType'
        let params = {
          language: this.$t('language')
        }
        let data = await this.api.get(url, params)
        if (data) {
          this.publishList = data.publisherList
          this.restatusList = data.documentStateList
          this.directionList = data.directionList
          this.cur_publishId = ''
          this.cur_publishName = ''
          this.cur_restatusId = ''
          this.cur_restatusName = ''
          this.cur_directionId = ''
          this.cur_directionName = ''
          this.cur_publishCode = ''
          this.cur_restatusCode = ''
          this.cur_directionCode = ''
        }
      },
      standardClick() {
        this.cur_active = 'standard'
      },
      regulationClick() {
        this.cur_active = 'regulation'
      },
      fieldClick (row) {
        if (this.cur_fieldId == row.id) {
          this.cur_fieldId = ''
          this.cur_fieldName = ''
          this.cur_fieldCode = ''
        } else {
          this.cur_fieldId = row.id
          this.cur_fieldName = row.itemName
          this.cur_fieldCode = row.itemCode
        }
        this.searchType = 1
        this.getStandardAndRegulationSearch()
      },
      statusClick (row) {
        if (this.cur_statusId == row.id) {
          this.cur_statusId = ''
          this.cur_statusName= ''
          this.cur_statusCode = ''
        } else {
          this.cur_statusId = row.id
          this.cur_statusName = row.itemName
          this.cur_statusCode = row.itemCode
        }
        this.searchType = 1
        this.getStandardAndRegulationSearch()
      },
      adoptClick (row) {
        if (this.cur_adoptId == row.id) {
          this.cur_adoptId = ''
          this.cur_adoptName = ''
          this.cur_adoptCode = ''
        } else {
          this.cur_adoptId = row.id
          this.cur_adoptName = row.itemName
          this.cur_adoptCode = row.itemCode
        }
        this.searchType = 1
        this.getStandardAndRegulationSearch()
      },
      async getStandardAndRegulationSearch () {
        let url, params
        if ($('#i_fisrt').html().includes("标题") || $('#i_fisrt').html().includes("Title")) {
          url = 'DocumentService.asmx/SearchForIndexByLabelOrTitleSecond'
        } else if ($('#i_fisrt').html().includes('内容') || $('#i_fisrt').html().includes('Content')) {
          url = 'DocumentService.asmx/SearchForIndexByContentSecond'
        }
        if(this.searchType == 1){
          params = {
            type: this.searchType,
            domain: this.cur_fieldCode,
            fileState: this.cur_statusCode,
            acquisitionStandard: this.cur_adoptCode,
            language: this.$t('language'),
            page: this.currentPage,
            rows: this.pageSize,
            keyword: this.cur_searchStr,
            publisher: '',
            direction: ''
          }
        } else if (this.searchType == 2){
          params = {
            type: this.searchType,
            domain: '',
            fileState: this.cur_restatusCode,
            acquisitionStandard: '',
            language: this.$t('language'),
            page: this.currentPage,
            rows: this.pageSize,
            keyword: this.searchStr,
            publisher: this.cur_publishCode,
            direction: this.cur_directionCode
          }
        }
        let data = await this.api.post(url, params)
        if (data) {
          this.total = data.total
          this.searchList = data.documentList
          if (this.searchList.length == 0) {
            this.$message({
              showClose: true,
              message: this.$t('index.14')
            });
          }
        }
      },
      async getStandardSearchLeft () {
        let url = '/DocumentService.asmx/CriterionType'
        let params = {
          language: this.$t('language')
        }
        let data = await this.api.post(url, params)
        if (data) {
          this.fieldList = data.documentDomainList
          this.statusList = data.documentStateList
          this.adoptList = data.caiBiaoList
          this.cur_fieldId = ''
          this.cur_fieldName = ''
          this.cur_statusId = ''
          this.cur_statusName = ''
          this.cur_adoptId = ''
          this.cur_adoptName = ''
          this.cur_fieldCode = ''
          this.cur_statusCode = ''
          this.cur_adoptCode = ''
        }
      },
      hotClick(row) {
        this.searchStr = row.keys
        this.cur_hot = row.keys
        this.SearchForIndexByLabelOrTitle()
      },
      async AddDocumentSearchKeys() {
        let url = '/OtherService.asmx/AddDocumentSearchKeys'
        let params = {
          keys: this.cur_searchStr
        }
        let data = await this.api.post(url, params)
        if (data) {
        }
      },
      async SearchForIndexByLabelOrTitle(str) {
        if(!this.searchStr && !str){
          return
        }
        if(str){
          this.cur_searchStr = str
        }else{
          this.cur_searchStr = this.searchStr
        }
        this.searchType = 3
        this.AddDocumentSearchKeys()
        if ($('#i_fisrt').html().includes("标题") || $('#i_fisrt').html().includes("Title")) {
          let url = 'DocumentService.asmx/SearchForIndexByLabelOrTitle'
          let params = {
            page: this.currentPage,
            rows: this.pageSize,
            keyword: this.cur_searchStr,
            language: this.$t('language')
          }
          let data = await this.api.post(url, params, {loading: true})
          if (data) {
            this.searchList = data.documentList
            this.total = data.total
            if (this.searchList.length == 0) {
              this.$message({
                showClose: true,
                message: this.$t('index.14')
              });
            }
            this.getStandardSearchLeft()
            this.getRegulationLeft()
          }
        } else if ($('#i_fisrt').html().includes('内容') || $('#i_fisrt').html().includes('Content')) {
          let url = 'DocumentService.asmx/SearchForIndexByContent'
          let params = {
            page: this.currentPage,
            rows: this.pageSize,
            keyword: this.searchStr,
            language: this.$t('language')
          }
          let data = await this.api.post(url, params)
          if (data) {
            this.getStandardSearchLeft()
            this.getRegulationLeft()
            this.searchList = data.documentList
            this.total = data.total
            if (this.searchList.length == 0) {
              this.$message({
                showClose: true,
                message: this.$t('index.14')
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
        if(row.ImplementDate){
          let time = new Date(row.ImplementDate)
          return time.getFullYear() + '-' + addZero(time.getMonth() + 1) + '-' + addZero(time.getDate())
        }else{
          return ''
        }

      },
      dealReleaseDate(row) {
        function addZero(val) {
          if (val < 10) {
            return '0' + val
          } else {
            return val
          }
        }
        if(row.ReleaseDate){
          let time = new Date(row.ReleaseDate)
          return time.getFullYear() + '-' + addZero(time.getMonth() + 1) + '-' + addZero(time.getDate())
        }else{
          return ''
        }
      },
      dealFileState(row) {
        return row.FileState
      },
      handleSizeChange (val) {
        if(!this.global.memberId) {
          this.$message({
            showClose: true,
            message: this.$t('index.13')
          });
          return
        }
        this.pageSize = val
        if(this.searchType == 1 || this.searchType == 2){
          this.getStandardAndRegulationSearch()
        } else if (this.searchType == 3) {
          this.SearchForIndexByLabelOrTitle()
        }
      },
      handleCurrentChange (val) {
        if(!this.global.memberId) {
          this.$message({
            showClose: true,
            message: this.$t('index.13')
          });
          return
        }
        this.currentPage = val
        if(this.searchType == 1 || this.searchType == 2){
          this.getStandardAndRegulationSearch()
        } else if (this.searchType == 3) {
          this.SearchForIndexByLabelOrTitle()
        }
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
          language: this.$t('language'),
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
    },
    computed: {
      language() {
        return this.$store.state.language
      }
    },
    watch: {
      language: function () {
        if(this.$t('language') == 1){
          if($('#i_fisrt span').html() == 'Title'){
            $('#i_fisrt span').html('标题')
          }
          if($('#i_fisrt span').html() == 'Content'){
            $('#i_fisrt span').html('内容')
          }
        } else if(this.$t('language') == 2){
          if($('#i_fisrt span').html() == '标题'){
            $('#i_fisrt span').html('Title')
          }
          if($('#i_fisrt span').html() == '内容'){
            $('#i_fisrt span').html('Content')
          }
        }
        this.GetIndexByTopList()
        if(this.searchType == 3){
          this.SearchForIndexByLabelOrTitle(this.cur_searchStr)
        }else{
          this.getStandardAndRegulationSearch()
        }
      }
    }
  }
</script>

<style scoped>
  #left_search{
    float: left;
    width:18%;
    min-height: 590px;
    background: #fff;
  }
  #title{
    height:45px;
    width:100%;
    border-bottom: 2px solid #F5F5F5;
  }
  #title a{
    display: inline-block;
    float: left;
    width:50%;
    height: 100%;
    box-sizing:border-box;
    padding:15px 30px;
    font-size:16px;
    color: #666666;
    text-align: center;
  }
  .title_a_active{
    border-bottom: 2px solid #1890FF;
    color: #1890FF !important;
  }
  /*每一个分类设置属性*/
  #a_content{
    min-height:190px;
    padding-bottom: 10px;
    overflow: hidden;
  }
  #s_content{
    min-height: 140px;
    overflow: hidden;
    padding-bottom: 10px;
  }
  #n_content{
    min-height:80px;
    overflow: hidden;
    padding-bottom: 10px;
  }
  #area{
    width:100%;
    padding:10px 0 10px 20px;
    box-sizing:border-box;
    border-bottom: 2px solid #EDEDED
  }
  .area_link {
    margin-bottom: 5px;
    font-weight: bold;
    cursor: pointer;
  }
  .area_link span{
    padding-left:15px;
    background: url('../../assets/images/bg.png') -240px -96px;
  }
  .area_content{
    list-style: none;
  }
  .area_content li{
    list-style: none;
    float: left;
    width:100%;
    min-height: 26px;
    line-height: 26px;
    padding-right: 8px;
  }
  .area_content  a{
    color: #A7A7A7;
    padding-left:14px;
    font-size: 15px;
  }
  .area_content .selected{
    padding: 4px 15px;
    border-radius: 5px;
    background: #1890FF;
    color: #E0F0FF;
    font-size: 15px;
  }
  #state{
    width:100%;
    padding:10px 0 10px 20px;
    box-sizing:border-box;
    border-bottom: 2px solid #EDEDED
  }
  #notic{
    width:100%;
    padding:10px 0 10px 20px;
    box-sizing:border-box;
    min-height: 125px;
  }
  #right_list{
    float: right;
    width: 79%;
    min-height:620px;
  }
  .noDateTip{
    height: 36px;
    line-height: 36px;
    text-indent: 30px;
  }
  #declare p{
    min-height: 36px;
    line-height: 36px;
    text-indent: 32px;
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
    width:92px;
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
    display: block;
    line-height: 38px;
    width: 80px;
    height: 38px;
    text-align: center;
    box-sizing: border-box;
    font-size: 14px;
    color: #6f6f6f;
    float: left;

  }
  .up{
    background: url(../../assets/images/bg1.png) -100px -100px;
  }
  .i_select_box ul li {
    cursor:pointer;
    color: #6F6F6F;
  }
  .i_son_ul {
    width:80px;
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
    width:80px;
    z-index:100;
    color: #000000;
    list-style: none;
  }
  .i_son_ul span {
    cursor:pointer;
    display: inline-block;
    width: 80px;
    font-size: 14px;
    text-align: center;
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
    width:100%;
    text-align: center;
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
    height:240px;
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
    width: 510px;
    padding-left: 30px;
  }
</style>
