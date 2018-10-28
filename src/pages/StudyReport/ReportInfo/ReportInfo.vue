<template>
  <div>
    <el-row>
      <span>当前学校:&nbsp;</span>
      <span>{{schoolName}}</span>
    </el-row>
    <el-row class="mTop filtrateWrap">
      <span>
        <span class="demonstration">时间</span>
        <el-date-picker
          v-model="testDate"
          type="date"
          value-format="yyyyMMdd"
          :default-value="new Date()"
          @change="dateChange"
          :clearable="false"
          placeholder="选择日期">
        </el-date-picker>
      </span>
      <span>
        <!--<span>&nbsp;考试年级&nbsp;</span>-->
        <!--<el-select v-model="value" placeholder="请选择">-->
          <!--<el-option-->
            <!--v-for="item in options"-->
            <!--:key="item.value"-->
            <!--:label="item.label"-->
            <!--:value="item.value">-->
          <!--</el-option>-->
        <!--</el-select>-->
      </span>
      <span>
        <span>&nbsp;考试学科&nbsp;</span>
        <el-select v-model="checkedSubject" placeholder="请选择学科">
          <el-option
            v-for="item in subList"
            :key="item.value"
            :label="item.name"
            :value="item.value">
          </el-option>
        </el-select>
      </span>
      &nbsp;
      <el-button type="primary" @click="search">查询</el-button>
    </el-row>
    <el-row class="mTop">
      <el-table
        :data="testList"
        border
        style="width: 100%"
      >
        <el-table-column
          prop="tid"
          label="考试ID"
        >
        </el-table-column>
        <el-table-column
          prop="gradename"
          label="考试年级"
        >
        </el-table-column>
        <el-table-column
          prop="publisherTime"
          label="考试时间"
        >
          <template slot-scope="scope">
            {{scope.row.tdate.time | formatTime('YMD')}}
          </template>
        </el-table-column>
        <el-table-column
          prop="ttitle"
          label="考试名称"
        >
        </el-table-column>
        <el-table-column
          prop="papers"
          label="考试学科"
        >
        </el-table-column>
        <el-table-column
          prop="paperStatus"
          label="阅卷状态">
          <template slot-scope="scope">
            <div>{{ scope.row.reportStatus==0 ? '未完成' : '已完成' }}</div>
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <div class="pointer" v-if="scope.row.reportStatus==0 || scope.row.reportStatus==2" @click="createPaper(scope.row)">生成报告</div>
            <div class="pointer" v-if="scope.row.reportStatus==1 || scope.row.reportStatus==2" @click="reportOption(scope.row)">报告设置</div>
            <div class="pointer" v-if="scope.row.reportStatus==1 || scope.row.reportStatus==2" @click="seePaper(scope.row)">查看报告</div>
            <!--<div class="pointer" @click="createPaper(scope.row)">生成报告</div>-->
            <!--<div class="pointer" @click="reportOption(scope.row)">报告设置</div>-->
            <!--<div class="pointer" @click="seePaper(scope.row)">查看报告</div>-->
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <!--分页组件-->
    <paging class="margin-top-20" :dataCount="count" v-on:changed="pageChanged"></paging>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        count: null,
        pageSize: 10,
        currentPage: 1,
        schoolName: '',
        testList: [],  //考试列表
        subList: [
          {
            name: '全部',
            value: ''
          },
          {
            name: '语文',
            value: '语文'
          },
          {
            name: '数学',
            value: '数学'
          },
          {
            name: '英语',
            value: '英语'
          },
          {
            name: '物理',
            value: '物理'
          },
          {
            name: '化学',
            value: '化学'
          },
          {
            name: '生物',
            value: '生物'
          },
          {
            name: '政治',
            value: '政治'
          },
          {
            name: '历史',
            value: '历史'
          },
          {
            name: '地理',
            value: '地理'
          },
          {
            name: '音乐',
            value: '音乐'
          },
          {
            name: '美术',
            value: '美术'
          },
          {
            name: '未知',
            value: '未知'
          },
          {
            name: '语文基础',
            value: '语文基础'
          },
          {
            name: '语文作文',
            value: '语文作文'
          },
        ],
        checkedSubject: '',
        testDate: '',
      }
    },
    mounted(){
      this.getSchoolInfo()
      let myDate = new Date()
      this.testDate = `${myDate.getFullYear()}0${myDate.getMonth()+1}1`
      console.log(this.testDate)
      this.getTestList()
      console.log(this.global.schoolName);
    },
    methods: {
      async getSchoolInfo() {
        let url = '/das/testManager/getSchoolInfoByUid'
        let params = {
          sid: this.global.sid,
          uid: this.global.uid
        }
        let data = await this.api.get(url, params)
        this.schoolName = data.infoData.schoolName
      },
      async getTestList(){
        console.log(this.testDate);
        let url = '/detector/api/view/ruiya/test/getTestList'
        let params = {
          sid: this.global.sid,
          uid: this.global.uid,
          dateStr: this.testDate,
//          schoolId: this.global.schoolId
          schoolId: this.global.schoolId,
          subjectName: this.checkedSubject
        }
        let data = await this.api.get(url, params, {loading: true})
        if(data){
          console.log(data);
          this.testList = data.list
        }
      },
      /*日期改变*/
      dateChange(){
        if(this.testDate=='null'){
          this.testDate = ''
        }
      },
      search(){
        this.getTestList()
      },
      /*生成报告*/
      createPaper(row) {
        this.$router.push({
          name: 'CreateReport',
          params: {
            testId: row.tid
          }
        })
      },
      /*报告设置*/
      reportOption(row){
        this.$router.push({
          name: 'ReportOption',
          params: {
            examId: row.youpuscanexamid
          }
        })
      },
      /*查看报告*/
      seePaper(row) {
        this.$router.push({
          name: 'DownReport',
          params: {
            examId: row.youpuscanexamid
          }
        })
      },

      pageChanged(currentPage, pageSize){

      }
    }
  }
</script>

<style scoped>
.filtrateWrap{
  text-align: right;
}
.el-select{
  width: 140px;
}
.el-date-editor{
  width: 140px;
}
</style>
