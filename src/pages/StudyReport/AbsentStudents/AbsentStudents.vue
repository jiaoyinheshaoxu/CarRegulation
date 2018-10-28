<template>
  <div>
    <div class="">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>学情报告</el-breadcrumb-item>
        <el-breadcrumb-item>生成报告</el-breadcrumb-item>
        <el-breadcrumb-item>报告生成</el-breadcrumb-item>
        <el-breadcrumb-item>学生得分</el-breadcrumb-item>
        <el-breadcrumb-item>所有缺考人员列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="backBtn">
      <el-button type="default" @click="$router.go(-1)">返回</el-button>
    </div>
    <el-table
      :data="absentStudentsList"
      border
      class="mTop"
      style="width: 100%"
    >
      <el-table-column
        width="100px"
        type="index"
        label="序号"
      >
      </el-table-column>
      <el-table-column
        prop="studentName"
        label="学生姓名"
      >
      </el-table-column>
      <el-table-column
        prop="studentId"
        label="学生账号"
      >
      </el-table-column>
      <el-table-column
        prop="className"
        label="班级名称"
      >
      </el-table-column>
      <el-table-column
        prop="classId"
        label="班级ID"
      >
      </el-table-column>
    </el-table>

    <!--分页组件-->
    <paging class="margin-top-20" :dataCount="count" v-on:changed="pageChanged"></paging>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        count: 0,
        homeworkId: '',
        absentStudentsList: [],
        currentPage: 1,
        pageSize: 10
      }
    },
    mounted(){
      this.homeworkId = this.$route.params.homeworkId
      this.getNoExamList()
    },
    methods: {
      async getNoExamList(){
        let url = '/das/reportManage/getNoExamList'
        let params = {
          sid: this.global.sid,
          uid: this.global.uid,
          homeworkId: this.homeworkId,
          currentPage: this.currentPage,
          pageSize: this.pageSize
        }
        let data = await this.api.get(url, params, {loading: true})
        if (data) {
          this.count = data.count
          this.absentStudentsList = data.infoList
        }
      },

      pageChanged(currentPage, pageSize){
        this.currentPage = currentPage
        this.pageSize = pageSize
        this.getNoExamList()
      }
    }
  }
</script>

<style scoped>
.backBtn{
  text-align: right;
}
</style>
