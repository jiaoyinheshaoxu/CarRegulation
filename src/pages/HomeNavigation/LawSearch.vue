<template lang='html'>
  <div id="main">
    <!-- 左侧查询条件 -->
    <div id="left_search">
      <div id="title">
        <a  href="#">法规</a>
      </div>
      <div id="area">
        <p id="type_area" class="area_link"><span></span>按发布方</p>
        <ul id="a_content" class="area_content">
          <li v-for="row in publishList">
            <a v-show="$t('language') == 1" @click="publishClick(row)" :class="{'selected': cur_publishId == row.id}">{{row.itemName}}</a>
            <a v-show="$t('language') == 2" @click="publishClick(row)" :class="{'selected': cur_publishId == row.id}">{{row.itemCode}}</a>
          </li>
        </ul>
      </div>
      <div id ="state">
        <p  id="type_state"class="area_link"><span></span>按状态</p>
        <ul id="s_content" class="area_content">
          <li v-for="row in statusList">
            <a v-show="$t('language') == 1" @click="statusClick(row)" :class="{'selected': cur_statusId == row.id}">{{row.itemName}}</a>
            <a v-show="$t('language') == 2" @click="statusClick(row)" :class="{'selected': cur_statusId == row.id}">{{row.itemCode}}</a>
          </li>
        </ul>
      </div>
      <div id ="notic">
        <p id="type_notic" class="area_link"><span></span>按方向</p>
        <ul id="n_content" class="area_content">
          <li v-for="row in directionList">
            <a v-show="$t('language') == 1" @click="directionClick(row)" :class="{'selected': cur_directionId == row.id}">{{row.itemName}}</a>
            <a v-show="$t('language') == 2" @click="directionClick(row)" :class="{'selected': cur_directionId == row.id}">{{row.itemCode}}</a>
          </li>
        </ul>
      </div>
    </div>
    <!-- 右侧列表 -->
    <div id="right_list">
      <div class="tableData tableBox">
        <el-table
          :data="lawList"
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
            prop="title"
            label="标准或法规名称"
            sortable
            header-align="center"
            align="left">
          </el-table-column>
          <el-table-column
            prop="fileState"
            label="状态"
            align="center"
            width="100"
            :formatter="dealFileState">
          </el-table-column>
          <el-table-column
            prop="releaseDate"
            label="发布日期"
            sortable
            align="center"
            :formatter="dealReleaseDate"
            width="180">
          </el-table-column>
          <el-table-column
            prop="implementDate"
            label="实施日期"
            sortable
            align="center"
            :formatter="dealImplementDate"
            width="180">
          </el-table-column>
        </el-table>
      </div>
      <el-pagination
        v-show="lawList.length > 0"
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
        publishList: [],
        cur_publishId: '',
        cur_publishName: '',
        statusList: [],
        cur_statusId: '',
        cur_statusName: '',
        directionList: [],
        cur_directionId: '',
        cur_directionName: '',
        currentPage: 1,
        pageSize: 10,
        total: 0,
        lawList: [],
        cur_publishCode: '',
        cur_statusCode: '',
        cur_directionCode: ''
      }
    },
    mounted() {
      this.getStandardSearch()
    },
    methods: {
      dealImplementDate(row) {
        function addZero(val) {
          if (val < 10) {
            return '0' + val
          } else {
            return val
          }
        }
        if(row.implementDate){
          let time = new Date(row.implementDate)
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
        if(row.releaseDate){
          let time = new Date(row.releaseDate)
          return time.getFullYear() + '-' + addZero(time.getMonth() + 1) + '-' + addZero(time.getDate())
        }else {
          return ''
        }
      },
      dealFileState(row) {
        return row.fileState
      },
      goDetail (row) {
        this.$router.push({
          name: '/LawSearch/StandardDetail',
          params: {
            id: row.id
          }
        })
      },
      async getStandardSearch () {
        let url = '/DocumentService.asmx/SearchRegulationByType'
        let params = {
          fileState: this.cur_statusCode,
          publisher: this.cur_publishCode,
          direction: this.cur_directionCode,
          language: this.$t('language'),
          type: 2,
          page: this.currentPage,
          rows: this.pageSize
        }
        let data = await this.api.get(url, params)
        if (data) {
          this.publishList = data.publisherList
          this.statusList = data.documentStateList
          this.directionList = data.directionList
          this.total = data.total
          this.lawList = data.documentList
        }
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
        this.getStandardSearch()
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
        this.getStandardSearch()
      },
      statusClick (row) {
        if (this.cur_statusId == row.id) {
          this.cur_statusId = ''
          this.cur_statusName = ''
          this.cur_statusCode = ''
        } else {
          this.cur_statusId = row.id
          this.cur_statusName = row.itemName
          this.cur_statusCode = row.itemCode
        }
        this.getStandardSearch()
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
        this.getStandardSearch()
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
        this.getStandardSearch()
      },
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
    width:50%;
    height: 100%;
    box-sizing:border-box;
    padding:15px 30px;
    border-bottom: 2px solid #1890FF;
    font-size:16px;
    color: #1890FF;
    text-align: center;
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
  .pageStyle{
    text-align: center;
    margin-top: 20px;
  }
  .tableData{
    min-height: 600px;
  }
</style>
