<template>
  <div>
    <div class="">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>学情报告</el-breadcrumb-item>
        <el-breadcrumb-item>生成报告</el-breadcrumb-item>
        <el-breadcrumb-item>报告生成</el-breadcrumb-item>
        <el-breadcrumb-item>学生得分</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="backBtn">
      <el-button type="default" @click="$router.go(-1)">返回</el-button>
    </div>
    <div class="mTop condition">
      <el-select v-model="classId" placeholder="请选择">
        <el-option
          v-for="item in classList"
          :key="item.classId"
          :label="item.className"
          :value="item.classId">
        </el-option>
      </el-select>
      <span>&nbsp;学生账号:&nbsp;</span>
      <input type="text" v-model="username" class="el-input__inner">
      <el-button type="primary" @click="search">查询</el-button>
      <el-button type="primary" @click="goAbsentStudents">缺考学生: {{homeworkInfo.noExamNum}}</el-button>
    </div>
    <table class="mTop stuScoreData">
      <thead>
      <tr>
        <th width="80" title="学生/题号">学生/题号</th>
        <th title="账号">账号</th>
        <th title="班级">班级</th>
        <th title="班级ID">班级ID</th>
        <th title="总分">总分</th>
        <th :title="num.qNum" v-for="num in nums">{{num.qNum}}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="row in students" v-show="students.length > 0">
        <td :title="row.studentName">{{row.studentName}}</td>
        <td :title="row.account">{{row.account}}</td>
        <td :title="row.className">{{row.className}}</td>
        <td :title="row.classId">{{row.classId}}</td>
        <td :title="row.totalScore">{{row.totalScore}}</td>
        <td :title="item.qScore" v-for="item in row.scoreList">{{item.qScore}}</td>
      </tr>
      </tbody>
    </table>
    <div v-show="students.length == 0" style="border: 1px solid #999;width: 100%;text-align: center">
      暂无数据
    </div>

    <!--分页组件-->
    <paging class="margin-top-20" :dataCount="count" v-on:changed="pageChanged"></paging>
  </div>
</template>

<script>
  export default {
    data (){
      return {
        count: 0,
        classId: '',
        classList: [],
        homeworkInfo:{},
        nums: [],
        students: [],
        homeworkId: '',
        username: '',
        currentPage: 1,
        pageSize: 10,

      }
    },
    mounted(){
      this.homeworkId = this.$route.params.homeworkId
      this.getClassList()
      this.getStuScoreData()
    },
    methods: {
      search(){
        this.getStuScoreData()
      },
      /*跳转缺考学生页面*/
      goAbsentStudents(){
        this.$router.push({
          name: 'AbsentStudents',
          params: {
            homeworkId: this.homeworkId
          }
        })
      },
      /*获取班级列表*/
      async getClassList(){
        let url = '/das/scanExam/getClassList'
        let params = {
          sid: this.global.sid,
          uid: this.global.uid,
          homeworkId: this.homeworkId
        }
        let data = await this.api.get(url, params, {loading: true})
        if (data) {
          this.classList = data.infoList
          this.classList.unshift({
            classId: '',
            className: '全部班级'
          })
          this.classId = this.classList[0].classId
        }
      },
      /*获取学生得分数据*/
      async getStuScoreData(){
        let url = '/das/reportManage/getRecordsByHomeworkId'
        let params = {
          sid: this.global.sid,
          uid: this.global.uid,
          classId: this.classId,
          homeworkId: this.homeworkId,
          schoolId: this.global.schoolId,
          username: this.username,
          currentPage: this.currentPage,
          pageSize: this.pageSize,
        }
        let data = await this.api.get(url, params, {loading: true})
        if (data) {
          this.count = data.count
          this.homeworkInfo = data;
          this.students = data.infoList;
          this.nums = data.qIdNumList;
        }
      },
      pageChanged(currentPage, pageSize){
        this.currentPage = currentPage
        this.pageSize = pageSize
        this.getStuScoreData()
      }
    }
  }
</script>

<style scoped>
.backBtn {
  text-align: right;
}

.el-input__inner {
  width: 200px;
}

.condition {
  display: flex;
  align-items: center;
}

.el-button {
  margin-left: 20px;
}

.stuScoreData {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}

.stuScoreData thead {
  background-color: #0cc3b3;
  color: #fff;
}

.stuScoreData thead th {
  line-height: 48px;
}

.stuScoreData td, .stuScoreData th {
  box-sizing: border-box;
  border: 1px solid #999;
  text-align: center;
  line-height: 48px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
