<template lang='html'>
  <div id="main">
    <!-- 左侧查询条件 -->
    <div id="left_search">
      <div id="title">
        <a  href="#">标准</a>
      </div>
      <div id="area">
        <p id="type_area" class="area_link">按领域</p>
        <ul id="a_content" class="area_content">
          <li v-for="row in fieldList">
            <a @click="fieldClick(row)" :class="{'selected': cur_fieldId == row.id}">{{row.itemName}}</a>
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
        <p id="type_notic" class="area_link">按采标</p>
        <ul id="n_content" class="area_content">
          <li v-for="row in adoptList">
            <a @click="adoptClick(row)" :class="{'selected': cur_adoptId == row.id}">{{row.itemName}}</a>
          </li>
        </ul>
      </div>
    </div>
    <!-- 右侧列表 -->
    <div id="right_list">
      <div class="tableData tableBox">
        <el-table
          :data="standardList"
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
            align="center">
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
        v-show="standardList.length > 0"
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
        fieldList: [],
        cur_fieldId: '',
        cur_fieldName: '',
        statusList: [],
        cur_statusId: '',
        cur_statusName: '',
        adoptList: [],
        cur_adoptId: '',
        cur_adoptName: '',
        currentPage: 1,
        pageSize: 10,
        total: 100,
        standardList: [],
        languageType: 1,
        cur_fieldCode: '',
        cur_statusCode: '',
        cur_adoptCode: ''

      }
    },
    mounted() {
      this.getStandardSearch()
    },
    methods: {
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
        this.getStandardSearch()
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
        this.getStandardSearch()
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
        this.getStandardSearch()
      },
      async getStandardSearch () {
        let url = '/DocumentService.asmx/SearchCriterionByType'
        let params = {
          fileState: this.cur_fieldCode,
          domain: this.cur_statusCode,
          acquisitionStandard: this.cur_adoptCode,
          languageType: this.languageType,
          type: 1,
          page: this.currentPage,
          rows: this.pageSize
        }
        let data = await this.api.post(url, params)
        if (data) {
          console.log(data)
          this.fieldList = data.documentDomainList
          this.statusList = data.documentStateList
          this.adoptList = data.caiBiaoList
          this.total = data.total
          this.standardList = data.documentList
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
        let time = new Date(row.implementDate)
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
        let time = new Date(row.releaseDate)
        return time.getFullYear() + '-' + addZero(time.getMonth() + 1) + '-' + addZero(time.getDate())
      },
      dealFileState(row) {
        return row.fileState
      },
      goDetail (row) {
        console.log(row)
        this.$router.push({
          name: '/StandardSearch/StandardDetail',
          params: {
            id: row.id
          }
        })
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
        this.getStandardSearch()
        console.log(`每页 ${val} 条`);
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
        this.getStandardSearch()
        console.log(`当前页: ${val}`);
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
    height: 125px;
  }
  #right_list{
    float: right;
    width: 79%;
    height:620px;
  }
  .pageStyle{
    text-align: center;
    margin-top: 20px;
  }
  .tableData{
    min-height: 600px;
  }
</style>
