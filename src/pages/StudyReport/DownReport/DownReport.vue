<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>学情报告</el-breadcrumb-item>
      <el-breadcrumb-item>查看报告</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="mTop testInfo">
      <span>考试名称:&nbsp;</span><span>{{examInfo.examName}}</span>
      <span>&nbsp;考试学校:&nbsp;</span><span>{{examInfo.schoolName}}</span>
      <span>&nbsp;考试ID:&nbsp;</span><span>{{examInfo.examId}}</span>
      <!--<span>&nbsp;考试学科:&nbsp;</span><span>{{examInfo.}}</span>-->
      <span>&nbsp;考试年级:&nbsp;</span><span>{{examInfo.gradeName}}</span>
      <span>&nbsp;考试时间:&nbsp;</span><span>{{examInfo.examTime}}</span>
    </div>
    <div class="mTop filtrateWrap">
      <div>
        <!--<el-button type="primary" :class="{'currentSubject': subjectCode==subject.code}" v-for="(subject, index) in subjectList" :key="subject.code" @click.stop="changeSubject(subject.homeworkId, subject.code)">{{subject.name}}</el-button>-->
        <el-button type="primary" class="subjectBtn" v-for="(subject, index) in subjectList" :key="subject.code" @click.stop="changeSubject(subject.homeworkId, index)">{{subject.name}}</el-button>
      </div>
      <div class="classSelect">
        <div v-if="paperType==6">
          <span>班级:&nbsp;</span>
          <el-select v-model="selectedClass" @change="classChange" placeholder="请选择">
            <el-option
              v-for="item in classList"
              :key="item.classId"
              :label="item.className"
              :value="item.classId">
            </el-option>
          </el-select>
        </div>
        <div>
          <span>报告类型:&nbsp;</span>
          <el-select @change="reportTypeChange" v-model="paperType" placeholder="请选择">
            <el-option
              v-for="item in paperTypeList"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
      </div>
    </div>
    <el-table
      class="mTop personReport"
      v-show="paperType==6"
      :data="personReportList"
      border
      style="width: 100%"
    >
      <el-table-column
        prop="id"
        label="报告编号"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="报告名称"
      >
      </el-table-column>
      <el-table-column
        prop="studentName"
        label="学生姓名"
      >
      </el-table-column>
      <el-table-column
        prop="score"
        label="成绩"
      >
      </el-table-column>
      <el-table-column
        prop="totalScore"
        label="总分"
      >
      </el-table-column>
      <el-table-column
        prop="createtime"
        label="生成时间">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-popover
            placement="left"
            title=""
            width="120"
            trigger="click"
            v-model='scope.row.show'
          >
            <ul class="popover-list">
              <li @click="viewReport(scope.row)">查看</li>
              <li @click="downReport(scope.row)">下载</li>
            </ul>
            <span slot="reference" class="el-icon-setting pointer handle-icon" @click="scope.row.show = true"></span>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <el-table
      class="mTop classReport"
      v-show="paperType==5"
      :data="classReportList"
      border
      style="width: 100%"
    >
      <el-table-column
        prop="id"
        label="报告编号"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="报告名称"
      >
      </el-table-column>
      <el-table-column
        prop="score"
        label="平均成绩"
      >
      </el-table-column>
      <el-table-column
        prop=""
        label="最高分/总分"
      >
        <template slot-scope="scope">
          {{scope.row.maxScore}}/{{scope.row.totalScore}}
        </template>
      </el-table-column>
      <el-table-column
        prop="createtime"
        label="生成时间"
      >
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-popover
            placement="left"
            title=""
            width="120"
            trigger="click"
            v-model='scope.row.show1'
          >
            <ul class="popover-list">
              <li @click="ClassReportPDF(scope.row)">查看</li>
              <li @click="ClassReportPDFDown(scope.row)">下载</li>
            </ul>
            <span slot="reference" class="el-icon-setting pointer handle-icon" @click="scope.row.show1 = true"></span>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>
    <el-table
      class="mTop gradeReport"
      v-show="paperType==4"
      :data="gradeReportList"
      border
      style="width: 100%"
    >
      <el-table-column
        prop="id"
        label="报告编号"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="报告名称"
      >
      </el-table-column>
      <el-table-column
        prop="score"
        label="平均成绩"
      >
      </el-table-column>
      <el-table-column
        prop="createtime"
        label="生成时间"
      >
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-popover
            placement="left"
            title=""
            width="120"
            trigger="click"
            v-model='scope.row.show2'
          >
            <ul class="popover-list">
              <li @click="GradeReportPDF(scope.row)">查看</li>
              <li @click="GradeReportPDFDown(scope.row)">下载</li>
            </ul>
            <span slot="reference" class="el-icon-setting pointer handle-icon" @click="scope.row.show2 = true"></span>
          </el-popover>
        </template>
      </el-table-column>
    </el-table>

    <!--分页组件-->
    <paging class="margin-top-20" :dataCount="count" v-if="paperType==1" v-on:changed="pageChanged"></paging>
  </div>
</template>

<script>
  import ax from 'axios'
  export default {
    data() {
      return {
        paperType: 6,
        count: 5,
        examId: '',
        examInfo: { //考试相关信息
          examName: null,
          schoolName: null,
          examId: null,
          gradeName: null,
          examTime: null
        },
        subjectList: [],  //考试学科
        selectedClass: '',  //个人报告页面选择的班级
        classList: [],  //个人报告页面班级选项
        personReportList: [], //个人报告列表
        classReportList: [],  //班级报告列表
        gradeReportList: [],  //年级报告列表
        paperTypeList: [
          {name: '个人报告', id: 6},
          {name: '班级报告', id: 5},
          {name: '年级报告', id: 4},
        ]
      }
    },
    mounted(){
      this.examId = this.$route.params.examId
      this.getSubjectList()
      this.getExamInfo()
    },
    methods: {
      /*获取学科*/
      async getSubjectList(){
        let url = '/das/report/rya/getSubjectCodeByExamId'
        let params = {
          sid: this.global.sid,
          uid: this.global.uid,
          examId: this.examId
        }
        let data = await this.api.get(url, params, {loading: true})
        if (data) {
          this.subjectList = data.subjectList
          if(this.subjectList.length){
            this.homeworkId = this.subjectList[0].homeworkId
            setTimeout(function(){
              $('.subjectBtn').eq(0).css({
                background: '#e47715',
                borderColor: '#e47715'
              })
            }, 300)
            if(this.homeworkId&&this.selectedClass){
              this.getPersonReportList()
            }
            this.getClassList()
          }
        }
      },
      /*改变学科*/
      changeSubject(homeworkId, index){
        $('.subjectBtn').css({
          background: '#0cc3b3',
          borderColor: '#0cc3b3'
        })
        $('.subjectBtn').eq(index).css({
          background: '#e47715',
          borderColor: '#e47715'
        })
        if (!homeworkId) {
          this.$message({
            showClose: true,
            message: '该学科暂未生成报告！',
            type: 'warning'
          })
          return
        }
        this.homeworkId = homeworkId
        if(this.paperType == 6) {
          this.getPersonReportList()
        } else if (this.paperType == 5) {
          this.getClassReportList()
        } else if (this.paperType == 4) {
          this.getGradeReportList()
        }
      },
      /*获取考试信息*/
      async getExamInfo(){
        let url = '/das/scanExam/getExamInfo'
        let params = {
          sid: this.global.sid,
          uid: this.global.uid,
          examId: this.examId
        }
        let data = await this.api.get(url, params, {loading: true})
        if (data) {
          this.examInfo = data.infoData
        }
      },
      reportTypeChange(){
        $('.el-popover').css({display: 'none'})
        switch (this.paperType){
          case 6:
            this.getPersonReportList()
            break;
          case 5:
            this.getClassReportList()
            break;
          case 4:
            this.getGradeReportList()
            break;
        }
      },
      /*查看个人报告*/
      viewReport(item){
        window.open(this.global.debug_url + "/report/studentReport_M.html?" + "&id=" + item.id);
      },
      /*下载个人报告*/
      downReport (item) {
        let pdfUrl = "http://115.29.220.75:8080/WKPDFReport/import?type=7&key=id&value=" + item.id + "&filename=" + "RS" + item.id;
        window.open(pdfUrl);
      },
      /*查看班级报告*/
      ClassReportPDF (obj) {
        sessionStorage.setItem('reportName', obj.name);
        window.open(this.global.debug_url + "/report/classReport_M.html?" + "&id=" + obj.id);
      },
      /*下载班级报告*/
      ClassReportPDFDown (obj) {
        var pdfUrl = "http://115.29.220.75:8080/WKPDFReport/import?type=" + 6 + "&key=id&value=" + obj.id + "&filename=" + "RC" + obj.id + '(' + obj.name + ')';
        window.open(pdfUrl);
      },
      /*查看年级报告*/
      GradeReportPDF (obj) {
        sessionStorage.setItem('reportName', obj.name);
        //window.open(this.global.debug_url + "../report/gradeReport_M.html?" + "&id=" + obj.id);
        window.open(this.global.debug_url + "/report/gradeReportMN.html?" + "&id=" + obj.id);
      },
      /*下载年级报告*/
      GradeReportPDFDown (obj) {
        //var pdfUrl = "http://115.29.220.75:8080/WKPDFReport/import?type=" + 5 + "&key=id&value=" + obj.id + "&filename=" + "RG" + obj.id;
        var pdfUrl = "http://115.29.220.75:8080/WKPDFReport/import?type=" + 17 + "&key=id&value=" + obj.id + "&filename=" + "RG" + obj.id + '(' + obj.name + ')';
        window.open(pdfUrl);
      },
      /*个人报告页面获取班级列表*/
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
          this.selectedClass = this.classList[0].classId
          if(this.homeworkId&&this.selectedClass){
            this.getPersonReportList()
          }

        }
      },
      /*班级改变*/
      classChange(){
        $('.el-popover').css({display: 'none'})
        this.getPersonReportList()
      },
      /*个人报告页面*/
      async getPersonReportList(){
        let url = '/das/testManager/getPaperTestStuDetail'
        let params = {
          sid: this.global.sid,
          uid: this.global.uid,
          taskId: this.homeworkId,
          classid: this.selectedClass,
          type: this.paperType
        }
        let data = await this.api.get(url, params, {loading: true})
        if (data) {
          this.personReportList = data.reportList
        }
      },
      /*班级报告页面*/
      async getClassReportList(){
        let url = '/das/testManager/getPaperTestClassDetail'
        let params = {
          sid: this.global.sid,
          uid: this.global.uid,
          taskId: this.homeworkId,
          type: this.paperType
        }
        let data = await this.api.get(url, params, {loading: true})
        if (data) {
          this.classReportList = data.reportList
        }
      },
      /*年级报告页面*/
      async getGradeReportList(){
        let url = '/das/testManager/getPaperTestGradeDetail'
        let params = {
          sid: this.global.sid,
          uid: this.global.uid,
          taskId: this.homeworkId,
          type: this.paperType
        }
        let data = await this.api.get(url, params, {loading: true})
        if (data) {
          this.gradeReportList = data.reportList
        }
      },
      /*判断有没有权限查看报告*/
//      async getReportContent(){
//        let url = '/das/report/rya/getReportContent'
//        let params = {
//          sid: this.global.sid,
//          uid: '1070777126',
//          id: ''
//        }
//        let data = await this.api.get(url, params, {loading: true, baseUrl: 'http://120.27.195.10:8090/'})
//        if (data) {
//          console.log(data);
//        }
//      },
      pageChanged(currentPage, pageSize){

      }
    }
  }
</script>

<style>
.testInfo {
  border: 1px solid #999;
  padding: 10px 0;
}

.currentSubject{
  background-color: #e47715;
  border-color: #e47715;
}

.filtrateWrap {
  display: flex;
  justify-content: space-between;
}

.el-select {
  width: 150px;
}

.classSelect {
  display: flex;
}
</style>
