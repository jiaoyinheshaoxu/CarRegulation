<template lang='html'>
  <div>
    <!-- 左侧查询条件 -->
    <div id="left_search">
      <div id="title">
        <a  href="#">法规</a>
      </div>
      <div id="area">
        <p id="type_area" class="area_link">按发布方</p>
        <ul id="a_content" class="area_content">
          <li v-for="row in publishList">
            <a @click="publishClick(row)" :class="{'selected': cur_publishId == row.id}">{{row.itemName}}</a>
          </li>
        </ul>
      </div>
      <div id ="state">
        <p  id="type_state"class="area_link">按状态</p>
        <ul id="s_content" class="area_content">
          <li v-for="row in statusList">
            <a @click="statusClick(row)" :class="{'selected': cur_statusId == row.id}">{{row.itemName}}</a>
          </li>
        </ul>
      </div>
      <div id ="notic">
        <p id="type_notic" class="area_link">按方向</p>
        <ul id="n_content" class="area_content">
          <li v-for="row in directionList">
            <a @click="directionClick(row)" :class="{'selected': cur_directionId == row.id}">{{row.itemName}}</a>
          </li>
        </ul>
      </div>
    </div>
    <!-- 右侧列表 -->
    <div id="right_list">
      <div class="tableData">

      </div>
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
        total: 100,
        lawList: []
      }
    },
    mounted() {
      this.getStandardSearch()
    },
    methods: {
      publishClick (row) {
        if (this.cur_publishId == row.id) {
          this.cur_publishId = ''
          this.cur_publishName = ''
        } else {
          this.cur_publishId = row.id
          this.cur_publishName = row.itemName
        }
      },
      statusClick (row) {
        if (this.cur_statusId == row.id) {
          this.cur_statusId = ''
          this.cur_statusName= ''
        } else {
          this.cur_statusId = row.id
          this.cur_statusName = row.itemName
        }
      },
      directionClick (row) {
        if (this.cur_directionId == row.id) {
          this.cur_directionId = ''
          this.cur_directionName = ''
        } else {
          this.cur_directionId = row.id
          this.cur_directionName = row.itemName
        }
      },
      async getStandardSearch () {
        let url = '/DocumentService.asmx/SearchRegulationByType'
        let params = {
          fileState: this.cur_publishName,
          publisher: this.cur_statusName,
          direction: this.cur_directionName,
          languageType: 1,
          type: 2,
          page: 1,
          rows: 10
        }
        let data = await this.api.get(url, params)
        if (data) {
          console.log(data)
          this.publishList = data.publisherList
          this.statusList = data.documentStateList
          this.directionList = data.directionList
          this.total = data.total
          this.lawList = data.documentList
          /*假数据*/
          /*this.total = 10
          this.standardList = []*/
        }
      },
      handleSizeChange (val) {
        console.log(val)
      },
      handleCurrentChange (val) {
        console.log(val)
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
    padding-left:15px;
    background: url('../../assets/images/bg.png') -240px -96px;
    margin-bottom: 5px;
    font-weight: bold;
    cursor: pointer;
  }
  .area_content{
    list-style: none;
  }
  .area_content li{
    list-style: none;
    float: left;
    width:100%;
    margin-top:3px;
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
