<template>
<div>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item>学情报告</el-breadcrumb-item>
    <el-breadcrumb-item>报告设置</el-breadcrumb-item>
    <el-breadcrumb-item>查看学生名单</el-breadcrumb-item>
  </el-breadcrumb>
  <div style="text-align: right">
    <el-button @click="$router.go(-1)">返回</el-button>
  </div>
  <el-table
    class="mTop"
    :data="studentList"
    border
    style="width: 100%"
  >
    <el-table-column
      type="index"
      label="序号"
    >
    </el-table-column>
    <el-table-column
      prop="stuNo"
      label="账号"
    >
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
    >
    </el-table-column>
    <el-table-column
      prop="1"
      label="生成数学报告"
    >
    </el-table-column>
    <el-table-column
      prop="2"
      label="生成物理报告"
    >
    </el-table-column>
    <el-table-column
      prop="3"
      label="生成化学报告">
    </el-table-column>
  </el-table>

</div>
</template>

<script>
  export default {
    data(){
      return {
        classId: '',
        examId: '',
        studentList: [],
      }
    },
    mounted(){
      this.classId = this.$route.params.classId
      this.examId = this.$route.params.examId
      this.getList()
    },
    methods: {
      async getList(){
        let url = '/das/report/rya/getRecordByClass'
        let params = {
          sid: this.global.sid,
          uid: this.global.uid,
          classId: this.classId,
          examId:	this.examId
        }
        let data = await this.api.get(url, params, {loading: true})
        if(data){
          this.count = data.count
          this.studentList = data.studentList
        }
      },
    }
  }
</script>

<style scoped>

</style>
