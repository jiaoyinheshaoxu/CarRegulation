<template>
  <div class="viewContent">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>当前位置</el-breadcrumb-item>
      <el-breadcrumb-item>学情报告</el-breadcrumb-item>
      <el-breadcrumb-item>生成报告</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="mTop">
      <div class=" padding_20">
        <span>考试学校:&nbsp;</span>
        <span>{{global.schoolName}}</span>
        <span>&nbsp;学校ID:&nbsp;</span>
        <span>{{global.schoolId}}</span>
      </div>
      <ul class="steps">
        <li class="step-item-active pointer" :class="{'step-item': step<1}" @click="changeStep(1)">关联试卷</li>
        <li class="step-item-active pointer" :class="{'step-item': step<2}" @click="changeStep(2)">阅卷数据<span>{{get_step}}</span></li>
        <!--<li class="step-item-active pointer" :class="{'step-item': step<3}" @click="changeStep(3)">报告设置</li>-->
        <li class="step-item-active pointer" :class="{'step-item': step<3}" @click="changeStep(3)">报告生成</li>
      </ul>
    </div>
    <!--关联试卷-->
    <div v-show="step==1">
      <el-table
        class="mTop"
        :data="paperList"
        border
        style="width: 100%"
      >
        <el-table-column
          prop="testtitle"
          label="考试名称"
        >
        </el-table-column>
        <el-table-column
          prop="tid"
          label="考试ID"
        >
        </el-table-column>
        <el-table-column
          prop="subname"
          label="考试学科"
        >
        </el-table-column>
        <el-table-column
          prop="gradename"
          label="考试年级"
        >
        </el-table-column>
        <el-table-column
          prop=""
          label="考试类型"
        >
          <template slot-scope="scope">
            联考
          </template>
        </el-table-column>
        <el-table-column
          prop=""
          label="考试日期">
          <template slot-scope="scope">
            {{scope.row.createtime.time | formatTime('YMD')}}
          </template>
        </el-table-column>
        <el-table-column
          prop=""
          label="试卷状态">
          <template slot-scope="scope">
            {{scope.row.youpupaperid ? '已选择' : '未选择'}}
          </template>
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
                <li @click="openLinkPaperDialog(scope.row)">关联试卷</li>
                <li @click="showAttribute(scope.row)">试卷属性</li>
                <li @click="itemDetail(scope.row)">题目详情</li>
                <li @click="itemAnalysis(scope.row)">试题分析</li>
              </ul>
              <span slot="reference" class="el-icon-setting pointer handle-icon" @click="scope.row.show = true"></span>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!--阅卷数据-->
    <div v-show="step==2">
      <el-table
        class="mTop"
        :data="paperList1"
        border
        style="width: 100%"
      >
        <el-table-column
          prop="testtitle"
          label="考试名称"
        >
        </el-table-column>
        <el-table-column
          prop="tid"
          label="试卷名称"
        >
        </el-table-column>
        <el-table-column
          prop="subname"
          label="学科"
        >
        </el-table-column>
        <el-table-column
          prop="paperid"
          label="试卷ID"
        >
        </el-table-column>
        <el-table-column
          prop=""
          label="学生得分数据"
        >
          <template slot-scope="scope">
            <div v-if="scope.row.completeNum>0" class="pointer" @click="goScoreData(scope.row)">
              {{scope.row.completeNum}}/{{scope.row.allNum}}
            </div>
            <div v-if="scope.row.completeNum==0" class="pointer">
              {{scope.row.completeNum}}/{{scope.row.allNum}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-popover
              placement="left"
              title=""
              trigger="click"
              v-model='scope.row.show1'
            >
              <ul class="popover-list">
                <li @click="goSerialDataMatchup(scope.row)">试卷序号和阅卷数据对应关系</li>
                <li @click="getReadData(scope.row)">获取阅卷数据</li>
                <!--<li @click="importExcel(scope.row)">导入EXCEL数据</li>-->
              </ul>
              <span slot="reference" class="el-icon-setting pointer handle-icon" @click="scope.row.show1 = true"></span>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!--报告生成-->
    <div v-show="step==3">
      <el-table
        class="mTop"
        :data="paperList2"
        border
        style="width: 100%"
      >
        <el-table-column
          prop="testtitle"
          label="试卷名称"
        >
        </el-table-column>
        <el-table-column
          prop="subname"
          label="学科"
        >
        </el-table-column>
        <el-table-column
          :formatter="getPaperId"
          label="试卷ID"
        >
        </el-table-column>
        <el-table-column
          prop=""
          label="学生得分数据"
        >
          <template slot-scope="scope">
            <div v-if="scope.row.completeNum>0" class="pointer" @click="goScoreData(scope.row)">
              {{scope.row.completeNum}}/{{scope.row.allNum}}
            </div>
            <div v-if="scope.row.completeNum==0" class="pointer">
              {{scope.row.completeNum}}/{{scope.row.allNum}}
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="source"
          label="生成进度"
        >
          <template slot-scope="scope">
            <el-progress :text-inside="true" :stroke-width="18" :percentage="scope.row.reportProgress?parseInt(scope.row.reportProgress.progress*100):0"></el-progress>
          </template>
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-popover
              placement="left"
              title=""
              trigger="click"
              v-model='scope.row.show2'
            >
              <ul class="popover-list">
                <li class="" @click="changePonintData.row=scope.row;changePointDialog=true" v-show="scope.row.pointStatus==0 && scope.row.reportStatus!=2">改变知识点状态</li>
                <li class="disable" style="" v-show="scope.row.pointStatus==1">知识点状态已改变</li>
                <li class="" v-show="scope.row.pointStatus==2">改变中</li>
                <li class="disable" style="" v-show="scope.row.reportStatus==0 && scope.row.pointStatus!=1">生成报告</li>
                <li class="" @click="openCreateReportDialog(scope.row)" v-show="scope.row.reportStatus==0 && scope.row.pointStatus == 1">生成报告</li>
                <li class="disable" style="" v-show="scope.row.reportStatus==1">报告已生成</li>
                <li class=""  style="" v-show="scope.row.reportStatus==2">报告生成中</li>
              </ul>
              <span slot="reference" class="el-icon-setting pointer handle-icon" @click="scope.row.show2 = true"></span>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--分页组件-->
    <!--<paging class="margin-top-20" :dataCount="count" v-if="step!=3" v-on:changed="pageChanged"></paging>-->
    <div class="buttonWrap" v-if="step!=3" style="text-align: center;margin-top: 20px">
      <!--<el-button type="primary">保存</el-button>-->
      <el-button type="primary" @click="nextStep">下一步</el-button>
    </div>
    <!--关联试卷-->
    <el-dialog
      title="关联试卷"
      :visible.sync="linkPaperDialog"
      @close="closeDialog"
      class="linkPaper"
      center>
      <div class="dialogContent">
        <div class="searchBoxWrap">
          <div>
            <span>年级:</span>
            <el-select v-model="linkPaperData.checkedGrade" size="mini" placeholder="请选择年级">
              <el-option
                v-for="item in linkPaperData.gradeList"
                :key="item.phaseYear"
                :label="item.gradeName"
                :value="item.phaseYear">
              </el-option>
            </el-select>
          </div>
          <div class="searchBox">
            <i class="el-icon-search"></i>
            <input class="searchInput" v-model="linkPaperData.inputPaperId" placeholder="请输入试卷ID" type="text"/>
          </div>
          <el-button type="primary" size="mini" @click="search">查询</el-button>
        </div>
        <el-table
          class="mTop"
          ref="singleTable"
          :data="linkPaperData.searchList"
          highlight-current-row
          @current-change="handleCurrentChange"
          style="width: 100%">
          <el-table-column
            type="index"
            label="序号"
          >
          </el-table-column>
          <el-table-column
            prop="id"
            label="试卷ID"
            width="100px"
          >
          </el-table-column>
          <el-table-column
            prop="name"
            label="试卷名称"
          >
          </el-table-column>
          <el-table-column
            prop="createtime"
            label="生成时间"
          >
          </el-table-column>
        </el-table>
        <!--分页组件-->
        <paging class="margin-top-20" :dataCount="linkPaperData.dataCount" ref="page" v-on:changed="linkPaperPageChanged"></paging>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="linkPaperDialog = false">取 消</el-button>
        <el-button type="primary" @click="linkPaper">确 定</el-button>
      </span>
    </el-dialog>
    <!--改变知识点状态-->
    <el-dialog
      title="改变知识点状态"
      :visible.sync="changePointDialog"
      width="30%"
      center>
      <div class="dialogContent">
        改变知识点状态操作不可逆,确认要进行此操作吗?
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="changePointDialog = false">取 消</el-button>
        <el-button type="primary" @click="changePoint(changePonintData.row)">确 定</el-button>
      </span>
    </el-dialog>
    <!--生成报告-->
    <el-dialog
      title="生成报告"
      :visible.sync="createReportDialog"
      width="30%"
      @close="closeDialog"
      center>
      <div style="font-size: 20px;text-align: center">
        <div style="margin-bottom: 20px">请选择生成报告的类型</div>
        <el-checkbox-group
          v-model="checkedType">
          <el-checkbox v-for="type in typeList" :label="type.code" :key="type.code">{{type.name}}</el-checkbox>
        </el-checkbox-group>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="createReportDialog = false">取 消</el-button>
        <el-button type="primary" @click="createReport">确 定</el-button>
      </span>
    </el-dialog>
    <!--清空数据-->
    <el-dialog
      title="清空数据"
      :visible.sync="clearDataDialog"
      width="30%"
      center>
      <div style="font-size: 25px;text-align: center">
        <p>真的要清空数据吗?</p>
        <p>清空数据会清空已导入的学生得分数据</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="clearDataDialog = false">取 消</el-button>
        <el-button type="primary" @click="clearData()">确 定</el-button>
      </span>
    </el-dialog>
    <!--清空报告-->
    <el-dialog
      title="清空报告"
      :visible.sync="clearReportDialog"
      width="30%"
      center>
      <div style="font-size: 25px;text-align: center">
        <p>真的要清空数据吗?</p>
        <p>清空数据会清空已导入的学生得分数据</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="clearReportDialog = false">取 消</el-button>
        <el-button type="primary" @click="clearReport()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  //  const arr =
  import ax from 'axios'
  export default {
    data() {
      return {
        count: 5,
        step: 1,
        paperList: [],  //关联试卷页面列表
        paperList1: [],  //关联试卷页面列表
        paperList2: [],  //关联试卷页面列表
        examId: null,
        linkPaperData: {
          paperId: null,
          inputPaperId: '',
          gradeList: [],
          subjectId: '',
          checkedGrade: 0,
          searchList: [],
          selection: [],
          dataCount: 0,
          currentPage: 1,
          pageSize: 10,
          currentRow: null
        },
        checkAllSubject: false,
        checkedSubject: [],
        subjectList: [],  //学科
        subjectIsIndeterminate: false,
        checkedType: [],
        typeList: [
          {name: '个人', code: 1},
          {name: '班级', code: 2},
          {name: '年级', code: 3}
        ],
        typeIsIndeterminate: false,
        flag: false,
        changePonintData: {
          row: {}
        },
        createReportDialogData: {
          homeworkId: ''
        },
        clearDialogData: {
          homeworkId: ''
        },
        clearReportDialogData: {
          homeworkId: ''
        },
        linkPaperDialog: false,
        changePointDialog: false,
        createReportDialog: false,  //生成报告弹窗控制
        clearDataDialog: false, //清空数据弹窗控制
        clearReportDialog: false, //清空报告弹窗控制
        pageSize: 10,
        currentPage: 1
      }
    },
    computed: {
      get_step() {
        this.step = this.$store.state.create_report_step
      }
    },
    mounted(){
      this.getPaperInfo()
    },
    methods: {
      getPaperId(row){
        return row.youpupaperid ? row.youpupaperid : '试卷未绑定成功'
      },
      async getPaperInfo(){
        let url = '/detector/api/view/ruiya/test/getPaperInfo'
        let params = {
          sid: this.global.sid,
          uid: this.global.uid,
          examId: this.$route.params.testId,
          schoolId: this.global.schoolId
        }
        let data = await this.api.get(url, params, {loading: !this.flag})
        if (data) {
          this.paperList = data.List
          this.paperList1 = data.List
          this.paperList2 = data.List
          if(data.List.length){
            this.examId = data.List[0].examId
          }
          for(let i=0; i<this.paperList2.length; i++){
            if(this.paperList2[i].reportStatus == 2){
              this.flag = true
            }
          }
          if(this.flag&&this.step==3){
            setTimeout(()=>{
              this.getPaperInfo()
            }, 30000)
          }else{
            return
          }
        }
      },
      /*改变步骤*/
      changeStep(step){
        this.step = step
        if (step == 1) {
          this.getPaperInfo()
        } else if (step == 2) {
          this.getPaperInfo()
        }else if (step == 3) {
//          this.getStep4List()
          this.getPaperInfo()
        }
      },
      nextStep(){
        this.step++
        if(this.step>3){
          this.step = 3
        }
      },
      /*打开关联试卷弹窗*/
      openLinkPaperDialog(row){
        this.linkPaperData.paperId = null
        this.linkPaperData.paperId = row.paperid
        this.linkPaperData.subjectId = row.subjectid
        this.getGradeList()

        this.linkPaperDialog = true
      },
      search(){
        this.linkPaperData.currentPage = 1
        this.linkPaperData.pageSize = 10
        this.$refs.page.initCurrentPage()
        this.searchPaperList()
      },
      async searchPaperList(){
        let url = '/das/paper/manage/listCommonByPaperid'
        let params = {
          sid: this.global.sid,
          uid: this.global.uid,
          roleId: this.global.roleId,
          schoolId: this.global.schoolId,
          paperId: this.linkPaperData.inputPaperId,
          phaseYear: this.linkPaperData.checkedGrade,
          currentPage: this.linkPaperData.currentPage,
          pageSize: this.linkPaperData.pageSize
        }
        let data = await this.api.get(url, params, {loading: true})
        if (data) {
          this.linkPaperData.dataCount = data.count
          this.linkPaperData.searchList = []
          this.linkPaperData.searchList = data.paperList
        }
      },
      /*打开关联试卷时的年级筛选条件*/
      async getGradeList() {
        let url = '/das/paper/manage/getSelectCondition'
        let params = {
          sid: this.global.sid,
          uid: this.global.uid,
          schoolId: this.global.schoolId,
          roleId: this.global.roleId,
        }
        let data = await this.api.get(url, params, {loading: true})
        data.infoData.gradeList.unshift({
          gradeName: '全部', phaseYear: 0
        })
        this.linkPaperData.gradeList = data.infoData.gradeList
        this.linkPaperData.checkedGrade = this.linkPaperData.gradeList[0].phaseYear
        this.linkPaperPageChanged(1, 10)
      },
      handleCurrentChange(val){
        this.linkPaperData.currentRow = val
      },
      /*选择要关联的试卷*/
      selectPaper(selection){
        this.linkPaperData.selection = selection
      },
      /*关联试卷*/
      async linkPaper(){
        if(!this.linkPaperData.currentRow){
          this.$message({
            message: '请选择一个试卷',
            type: 'warning',
            showClose: true
          })
        }
        let url = '/detector/api/view/ruiya/test/paperAnalysis'
        let params = {
          sid: this.global.sid,
          uid: this.global.uid,
          paperId: this.linkPaperData.currentRow.id,
          ruiyaPaperid: this.linkPaperData.paperId
        }
        let data = await this.api.get(url, params, {loading: true})
        if (data) {
          this.$message({
            message: '关联成功',
            type: 'success',
            showClose: true
          })
          this.linkPaperDialog = false
          this.getPaperInfo()
        }
      },
      /*试卷属性*/
      showAttribute(row) {
        row.show = false
        if(!row.youpupaperid){
          this.$message({
            showClose: true,
            message: '请先进行关联试卷！',
            type: 'warning'
          });
          return
        }
        window.open(`${this.global.LOCAL_URL}/#/SelfPaper/PaperAttribute/2/${row.youpupaperid}`)
      },
      /*题目详情*/
      itemDetail(row) {
        row.show = false
        if(!row.youpupaperid){
          this.$message({
            showClose: true,
            message: '请先进行关联试卷！',
            type: 'warning'
          });
          return
        }
        window.open(`${this.global.LOCAL_URL}/#/SelfPaper/ItemDetail/2/${row.youpupaperid}`)
      },
      //试题分析
      itemAnalysis(row) {
        row.show = false
        if(!row.youpupaperid){
          this.$message({
            showClose: true,
            message: '请先进行关联试卷！',
            type: 'warning'
          });
          return
        }
        window.open(`${this.global.LOCAL_URL}/#/SelfPaper/ItemAnalysis/2/${row.youpupaperid}`)
      },
      /*试题序号和阅卷数据对应关系*/
      goSerialDataMatchup(row){
        this.$router.push({
          name: 'SerialDataMatchup', params: {
            paperId: row.paperid
          }
        })
      },
      /*获取阅卷数据*/
      async getReadData(row){
        let url = '/detector/api/view/ruiya/test/getStudentAnswer'
        let params = {
          sid: this.global.sid,
          uid: this.global.uid,
          paperId: row.paperid,
          schoolId: this.global.schoolId
        }
        let data = await this.api.get(url, params, {loading: true})
        if (data) {
          this.$message({
            message: '获取阅卷数据成功!',
            type: 'success',
            showClose: true
          })
        }
      },
      /*阅卷数据页面导入excel数据*/
      importExcel(row){
        let join = `${row.examId}-${row.homeworkId}-${row.subjectid}`
        this.$router.push({name: 'importExcel', params: {join: this.api.b64.encode(join)}});
      },

      closeDialog(){
        this.checkedType = []
        this.linkPaperData = {
          paperId: null,
            inputPaperId: '',
            gradeList: [],
          subjectId: '',
            checkedGrade: 0,
            searchList: [],
            selection: [],
            dataCount: 0,
            currentPage: 1,
            pageSize: 10,
            currentRow: null
        }
      },
      /*改变知识点状态*/
      async changePoint(row){
        let url = '/das/reportManage/updateStudentPointStatus'
        let params = {
          sid: this.global.sid,
          uid: this.global.uid,
          homeworkId: row.homeworkId
        }
        let data = await this.api.get(url, params, {loading: true})
        if (data) {
          this.$message({
            message: '改变知识点状态成功!',
            type: 'success',
            showClose: true
          })
          this.changePointDialog = false
          this.changePonintData.row = {}
          this.getPaperInfo()
        }
      },
      /*学生得分数据*/
      goScoreData(row){
        this.$router.push({name: 'StudentScore', params: {homeworkId: row.homeworkId}})
      },
      /*打开生成报告窗口*/
      openCreateReportDialog(row){
        this.createReportDialogData.homeworkId = row.homeworkId
        this.createReportDialogData.row = row
        this.createReportDialog = true
      },
      /*生成报告*/
      async createReport(){
        if(!this.checkedType.length){
          this.$message({
            message: '请选择要生成报告的类型',
            type: 'warning',
            showClose: true
          })
          return
        }
        let typeStr = this.checkedType.join(',')
        let url = '/das/scanExam/generateTaskAndReport'
        let params = {
          sid: this.global.sid,
          uid: this.global.uid,
          homeworkId: this.createReportDialogData.homeworkId,
          reportTypeString: typeStr
        }
        let data = await this.api.get(url, params, {loading: true})
        if (data) {
          this.$message({
            message: '报告生成中...!',
            type: 'success',
            showClose: true
          })
          this.createReportDialog = false
          this.getPaperInfo()
        }
      },
      /**/
      toClearDataModal(row){
        this.clearDialogData.homeworkId = row.homeworkId
        this.clearDataDialog = true
      },
      /*清空数据*/
      async clearData(){
        let url = '/das/reportManage/removeAllDataByHomeworkId'
        let params = {
          sid: this.global.sid,
          uid: this.global.uid,
          homeworkId: this.clearDialogData.homeworkId,
          schoolId: this.global.schoolId
        }
        let data = await this.api.get(url, params, {loading: true})
        if (data) {
          this.$message({
            message: '清空数据成功!',
            type: 'success',
            showClose: true
          })
          this.clearDataDialog = false
          this.getPaperInfo()
        }
      },
//      toViewChangePointProgressModal(){
//
//      },
      toClearReportModal(row){
        this.clearReportDialogData.homeworkId = row.homeworkId
        this.clearReportDialog = true
      },
      /*清空报告*/
      async clearReport(){
        let url = '/das/reportManage/deleteReportByHomeworkId'
        let params = {
          sid: this.global.sid,
          uid: this.global.uid,
          homeworkId: this.clearReportDialogData.homeworkId
        }
        let data = await this.api.get(url, params, {loading: true})
        if (data) {
          this.$message({
            message: '清空报告成功!',
            type: 'success',
            showClose: true
          })
          this.clearReportDialog = false
          this.getPaperInfo()
        }
      },
      /*分页*/
      linkPaperPageChanged(currentPage, pageSize){
        this.linkPaperData.pageSize = pageSize
        this.linkPaperData.currentPage = currentPage
        this.searchPaperList()
      }
    }
  }
</script>

<style scoped>
.viewContent {
  height: 100%;
  position: relative;
  padding-bottom: 40px;
  min-height: 600px;
}

.buttonWrap {
  width: 100%;
  text-align: center;
  margin-top: 20px;
  position: absolute;
  left: 0;
  bottom: 0;
}

.steps {
  display: flex;
  padding: 0 20px;
}

.step-item-active {
  height: 42px;
  width: 120px;
  text-align: center;
  color: #fff;
  line-height: 42px;
  background: url("../../../assets/images/steps/center_x.png") 0 0 no-repeat;
  background-size: cover;
}

.step-item-active:first-child {
  background-image: url("../../../assets/images/steps/begin_x.png");
}

.step-item-active:last-child {
  background-image: url("../../../assets/images/steps/end_x.png");
}

.step-item {
  background-position: 0 -42px;
}

.searchBoxWrap {
  display: flex;
  justify-content: center;
  align-items: center;
}

.searchBox {
  height: 30px;
  padding: 0 5px 0 10px;
  margin: 0 20px;
  box-sizing: border-box;
  border-radius: 15px;
  border: solid 1px #999;
  overflow: hidden;
}

.searchInput {
  border: 0;
  outline: none;
  padding: 0;
  height: 100%;
}

.checkboxWrap {
  display: flex;
  margin-left: 20px;
}

.el-checkbox-group {
  margin-left: 30px;
}

.selectStu {
  font-size: 14px;
}

.gradeList li {
  margin-top: 20px;
}
.classInfo{
  display: inline-block;
  width: 400px;
}
</style>
