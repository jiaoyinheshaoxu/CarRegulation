<template lang='html'>
  <div>
    <p class="biaoTi">
      <span >名师卷库</span>
    </p>
    <div class="selectArea">
      <span>学科：</span>
      <el-select v-model="selectSubjectId" placeholder="请选择">
        <el-option
          v-for="item in subjectList"
          :key="item.subjectCode"
          :label="item.subjectName"
          :value="item.subjectCode">
        </el-option>
      </el-select>
      <span>年级：</span>
      <el-select v-model="selectGradeId" placeholder="请选择">
        <el-option
          v-for="item in gradeList"
          :key="item.phaseYear"
          :label="item.gradeName"
          :value="item.phaseYear">
        </el-option>
      </el-select>
      <el-button type="primary" class="fRight" @click="getScanExamPaperList()">查询</el-button>
    </div>
    <!--删除操作暂时不要-->
    <div class="btnArea" v-if="false">
      <el-button type="primary" @click="removePaper()">删除试卷</el-button>
    </div>
    <div class="margin-top-20">
      <el-table
        ref="multipleTable"
        :data="paperList"
        tooltip-effect="dark"
        style="width: 100%"
        border
        @select-all="handleAll"
        @selection-change="handleSelectionChange">
        <!--删除-->
        <!--<el-table-column
          type="selection"
          width="">
        </el-table-column>-->
        <el-table-column
          prop="id"
          label="ID"
          width="">
        </el-table-column>
        <el-table-column
          prop="name"
          label="名称"
          width="200">
        </el-table-column>
        <el-table-column
          prop="createtime"
          label="生成时间"
          width="">
        </el-table-column>
        <el-table-column
          :formatter="getPaperType"
          label="试卷类型"
          width="80">
        </el-table-column>
        <el-table-column
          prop="source"
          label="试卷来源"
          width="">
        </el-table-column>
        <el-table-column
          prop="score"
          label="试卷总分值">
        </el-table-column>
        <el-table-column
          prop="phaseSubject"
          label="学科学段"
          width="">
        </el-table-column>
        <el-table-column
          prop="materialName"
          label="教材版本"
          width="">
        </el-table-column>
        <el-table-column
          prop="semester"
          label="学期（册）">
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
                <li @click="itemDetail(scope.row)">题目详情</li>
                <li @click="paperAttribute(scope.row)">试卷属性</li>
                <li @click="openPreviewDialog(scope.row)">预览打印</li>
              </ul>
              <span slot="reference" class="el-icon-setting pointer handle-icon" @click="scope.row.show = true"></span>
            </el-popover>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <paging class="margin-top-20" :dataCount="total" v-on:changed="pageChanged" v-show="paperList.length > 0"></paging>
    <!--删除试卷提示框-->
    <el-dialog
      title="确认要删除以下试卷吗？"
      :visible.sync="confirmDeleteDialog"
      width="60%"
      center>
      <div>
        <el-table
          ref="multipleTable"
          :data="multipleSelection"
          tooltip-effect="dark"
          style="width: 100%"
          border
        >
          <el-table-column
            prop="id"
            label="ID"
            width="120">
          </el-table-column>
          <el-table-column
            prop="name"
            label="名称"
            show-overflow-tooltip
            width="120">
          </el-table-column>
          <el-table-column
            prop="createtime"
            label="生成时间"
            width="140">
          </el-table-column>
          <el-table-column
            prop="score"
            label="试卷总分值">
          </el-table-column>
          <el-table-column
            prop="phaseSubject"
            label="学科学段"
            width="120">
          </el-table-column>
          <el-table-column
            prop="materialName"
            label="教材版本"
            width="120">
          </el-table-column>
          <el-table-column
            prop="semester"
            label="学期（册）">
          </el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="confirmDeleteDialog = false">取 消</el-button>
    <el-button type="primary" @click="confirmDelete()">确 定</el-button>
  </span>
    </el-dialog>
    <!--预览对话框-->
    <el-dialog
      title="预览"
      :visible.sync="previewDialog"
      width="800px"
      center
      @close="previewDialog=false"
    >
      <el-button @click="previewData.showprint()" style="float: right; margin-top: -10px;" plain size="small">打印试卷</el-button>
      <div id="printArea">
        <div class="dialog-content">
          <div class="text-align-center text-center m-md margin-bottom-20">
            <span style="font-weight: bold;font-size: 16px">{{previewData.pre_paperName}}</span>
            <span class="m-h-md" style="padding: 0 20px;">总分{{previewData.pre_totalScore}}分</span><br>
          </div>
          <div class="p-md">
            <div v-if="previewData.pre_singSelectItemsNo!=0">
              <p>单项选择题，共<span>{{previewData.pre_singSelectItemsNo}}</span>道</p>
              <hr style="color: #b5b5b5">
              <div v-for="row,$index in previewData.pre_singSelectItems">
                <p><span style="color: #00cccc">{{row.num || $index + 1}}、</span><span
                  v-html="row.title"></span><span class="text-dark-lt">（{{row.score}}分）</span></p>
                <div v-for="anwser in row.answers" class="m-h-lg anwser"><span v-html="anwser.holeAnwser"></span>
                </div>
                <hr style="color: #b5b5b5">
              </div>
            </div>
            <div v-if="previewData.pre_mulSelectItemsNo!=0">
              <p>多项选择题，共<span>{{previewData.pre_mulSelectItemsNo}}</span>道</p>
              <hr style="color: #b5b5b5">
              <div v-for="row,$index in previewData.pre_mulSelectItems">
                <p><span style="color: #00cccc">{{row.num || $index + 1}}、</span><span
                  v-html="row.title"></span><span class="text-dark-lt">（{{row.score}}分）</span></p>
                <div v-for="anwser in row.answers" class="m-h-lg anwser"><span v-html="anwser.holeAnwser"></span></div>
                <hr style="color: #b5b5b5">
              </div>
            </div>
            <div v-if="previewData.pre_gapFillingItemsNo!=0">
              <p>填空题，共<span>{{previewData.pre_gapFillingItemsNo}}</span>道</p>
              <hr style="color: #b5b5b5">
              <div v-for="row,$index in previewData.pre_gapFillingItems">
                <p><span style="color: #00cccc">{{row.num || $index + 1}}、</span><span
                  v-html="row.title"></span><span class="text-dark-lt">（{{row.score}}分）</span></p><br>
                <hr style="color: #b5b5b5">
              </div>
            </div>
            <div v-if="previewData.pre_resolveItemsNo!=0">
              <p>解答题，共<span>{{previewData.pre_resolveItemsNo}}</span>道</p>
              <hr style="color: #b5b5b5">
              <div v-for="row,$index in previewData.pre_resolveItems">
                <p><span style="color: #00cccc">{{row.num || $index + 1}}、</span><span
                  v-html="row.title"></span><span class="text-dark-lt">（{{row.score}}分）</span></p><br>
                <hr style="color: #b5b5b5">
              </div>
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="previewDialog=false">取  消</el-button>
        <el-button type="primary" @click="previewDialog=false">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        type: 1, //1 名师试卷  2 自有试卷
        schoolId: '',
        currentPage: 1,
        pageSize: 10,
        gradeList: [],
        selectGradeId: 0,
        subjectList: [],
        selectSubjectId: 0,
        total: 0,
        paperList: [],
        multipleSelection: [], //全选表格所用
        confirmDeleteDialog: false,
        /*预览对话框数据*/
        previewDialog: false,
        previewData: {
          pre_totalScore: 0,
          pre_itemsNo: 0,
          pre_paperName: '',
          pre_singSelectItemsNo: 0,
          pre_mulSelectItemsNo: 0,
          pre_singSelectItems: [],
          pre_mulSelectItems: [],
          pre_gapFillingItemsNo: 0,
          pre_resolveItemsNo: 0,
          pre_gapFillingItems: [],
          pre_resolveItems: []
        },
      }
    },
    mounted() {
      this.getSchoolInfo()
    },
    methods: {
      async getSchoolInfo() {
        let url = '/das/testManager/getSchoolInfoByUid'
        let params = {
          sid: this.global.sid,
          uid: this.global.uid
        }
        let data = await this.api.get(url, params)
        if(data) {
          this.schoolId = data.infoData.schoolId
          this.getSubjectGradeCondition()
        }
      },
      async getSubjectGradeCondition() {
        let url = '/das/paper/manage/getSelectCondition'
        let params = {
          sid: this.global.sid,
          uid: this.global.uid,
          roleId: this.global.roleId,
          schoolId: this.schoolId
        }
        let data = await this.api.get(url, params)
        if(data){
          this.gradeList = data.infoData.gradeList
          this.subjectList = data.infoData.subjectList
          this.gradeList.unshift({
            gradeName: '全部', phaseYear: 0
          })
          this.subjectList.unshift({
            subjectName: '全部', subjectCode: 0
          })
          if(this.subjectList.length > 0) {
            this.selectSubjectId = this.subjectList[0].subjectCode
          }
          if(this.gradeList.length > 0) {
            this.selectGradeId = this.gradeList[0].phaseYear
          }
          this.getScanExamPaperList()
        }
      },
      async getScanExamPaperList() {
        let url = '/das/paper/manage/listCommon'
        let params = {
          sid: this.global.sid,
          uid: this.global.uid,
          currentPage: this.currentPage,
          pageSize: this.pageSize,
          schoolId: this.schoolId,
          roleId: this.global.roleId,
          phaseYear: this.selectGradeId,
          subjectCode: this.selectSubjectId,
          semester: 0   // 学期 0代表全部
        }
        let data = await this.api.get(url, params, {loading: true})
        if(data) {
          this.total = data.count
          this.paperList = data.paperList
        }
      },
      pageChanged (currentPage, pageSize) {
        this.currentPage = currentPage
        this.pageSize = pageSize
        if (this.schoolId) {
          this.getScanExamPaperList()
        }
      },
      getPaperType (row) {
        return '套卷'
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      removePaper() {
        if(this.multipleSelection.length < 1) {
          this.$message({
            showClose: true,
            message: '请选择要删除的试卷！',
            type: 'warning'
          });
        } else {
          this.confirmDeleteDialog = true
        }
      },
      async confirmDelete() {
        let arr = []
        for(let i = 0, len = this.multipleSelection.length; i < len; i ++) {
          arr.push(this.multipleSelection[i].paperId)
        }
        let url = '/das/paper/manage/deletePaperInfoList'
        let params = {
          sid: this.global.sid,
          uid: this.global.uid,
          paperIds: arr.join(',')
        }
        let data = await this.api.get(url, params, {loading: true})
        if(data) {
          this.$message({
            showClose: true,
            message: '删除成功！',
            type: 'success'
          });
          this.confirmDeleteDialog = false
          this.getScanExamPaperList()
        }
      },
      async getPaperDetail(row) {
        //通过paperId查询paper内容
        let removeA = (txt) => {
          txt = txt.trim();
          var begin = txt.indexOf('<a');
          var end = txt.indexOf('</a>');
          if (begin != -1) {
            txt = txt.substring(0, begin) + txt.substring(end + 4);
          }
          return txt;
        }
        let formatPToSpan = (txt) => {
          txt = txt.trim();
          if (txt.indexOf("<P>") == 0 || txt.indexOf("<p>") == 0) {
            txt = txt.substring(3, txt.length - 4);
          }
          txt = "<SPAN>" + txt + "</SPAN>";
          // 替换图片地址
          var reg = new RegExp('src="/Public/pic/', "g");

          txt = txt.replace(reg, 'src="http://img.51youpu.com/Public/pic/');

          return txt;
        }
        let formatPToSpan2 = (txt) => {
          txt = txt.trim();
          var begin = txt.indexOf('<P>');
          var end = txt.lastIndexOf('</P>');
          if (begin != -1) {
            txt = txt.substring(0, begin) + "<SPAN>" + txt.substring(begin + 3, end) + "</SPAN>" + txt.substring(end + 4);
          }
          // 替换图片地址
          var reg = new RegExp('src="/Public/pic/', "g");

          txt = txt.replace(reg, 'src="http://img.51youpu.com/Public/pic/');

          return txt;
        }
        let data = {}
        let url = '/das/paper/manage/previewCommon'
        let params = {
          sid: this.global.sid,
          uid: this.global.uid,
          paperinfoid: row.id
        }
        data = await this.api.get(url, params, {loading: true})
        if (data.recode == 0) {
          this.previewData.purposeItems = data.resultlist;
          for (var i = 0; i < this.previewData.purposeItems.length; i++) {
            this.previewData.purposeItems[i].title = removeA(formatPToSpan2(formatPToSpan(this.previewData.purposeItems[i].text)));
            if (this.previewData.purposeItems[i].answers && this.previewData.purposeItems[i].answers.length > 0) {
              for (var j = 0; j < this.previewData.purposeItems[i].answers.length; j++) {
                if (this.previewData.purposeItems[i].qtype == 1 || this.previewData.purposeItems[i].qtype == 2) {
                  if (j == 0) {
                    this.previewData.purposeItems[i].answers[j].choice = 'A';
                  } else if (j == 1) {
                    this.previewData.purposeItems[i].answers[j].choice = 'B';
                  } else if (j == 2) {
                    this.previewData.purposeItems[i].answers[j].choice = 'C';
                  } else if (j == 3) {
                    this.previewData.purposeItems[i].answers[j].choice = 'D';
                  } else if (j == 4) {
                    this.previewData.purposeItems[i].answers[j].choice = 'E';
                  } else if (j == 5) {
                    this.previewData.purposeItems[i].answers[j].choice = 'F';
                  } else if (j == 6) {
                    this.previewData.purposeItems[i].answers[j].choice = 'G';
                  }
                  this.previewData.purposeItems[i].answers[j].holeAnwser = this.previewData.purposeItems[i].answers[j].choice + "、 " + formatPToSpan(this.previewData.purposeItems[i].answers[j].answertext);
                  this.previewData.purposeItems[i].answers[j].holeAnwser = formatPToSpan(this.previewData.purposeItems[i].answers[j].holeAnwser);
                }
              }
            }
          }
          if (this.previewData.purposeItems.length > 0) {
            this.previewData.pre_itemsNo = this.previewData.purposeItems.length; //总题数
            for (var i = 0; i < this.previewData.purposeItems.length; i++) {
              this.previewData.pre_totalScore += (this.previewData.purposeItems[i].score - 0); //总分数
              if (this.previewData.purposeItems[i].qtype == 1) {
                this.previewData.pre_singSelectItems.push(this.previewData.purposeItems[i]);
              } else if (this.previewData.purposeItems[i].qtype == 2) {
                this.previewData.pre_mulSelectItems.push(this.previewData.purposeItems[i]);
              } else if (this.previewData.purposeItems[i].qtype == 3) {
                this.previewData.pre_gapFillingItems.push(this.previewData.purposeItems[i]);
              } else if (this.previewData.purposeItems[i].qtype == 4) {
                this.previewData.pre_resolveItems.push(this.previewData.purposeItems[i]);
              }
            }
            this.previewData.pre_singSelectItemsNo = this.previewData.pre_singSelectItems.length;
            this.previewData.pre_mulSelectItemsNo = this.previewData.pre_mulSelectItems.length;
            this.previewData.pre_gapFillingItemsNo = this.previewData.pre_gapFillingItems.length;
            this.previewData.pre_resolveItemsNo = this.previewData.pre_resolveItems.length;
          }
          this.previewData.pre_paperName = data.name; //试题名称
        }
      },
      /*预览*/
      openPreviewDialog(row){
        row.show = false
        this.previewDialog = true

        this.previewData.pre_totalScore = 0;
        this.previewData.pre_itemsNo = 0;
        this.previewData.pre_paperName = '';
        this.previewData.pre_singSelectItemsNo = 0;
        this.previewData.pre_mulSelectItemsNo = 0;
        this.previewData.pre_singSelectItems = [];
        this.previewData.pre_mulSelectItems = [];
        this.previewData.pre_gapFillingItemsNo = 0;
        this.previewData.pre_resolveItemsNo = 0;
        this.previewData.pre_gapFillingItems = [];
        this.previewData.pre_resolveItems = [];

        //试卷总题数、选择题数、解答题数、总分
        if (this.previewData.purposeItems2) {
          if (this.previewData.purposeItems2 && this.previewData.purposeItems2.length > 0) {
            this.previewData.pre_itemsNo = this.previewData.purposeItems2.length; //总题数
            for (var i = 0; i < this.previewData.purposeItems2.length; i++) {
              this.previewData.pre_totalScore += (this.previewData.purposeItems2[i].score - 0); //总分数
              if (this.previewData.purposeItems2[i].qtype == 1) {
                this.previewData.pre_singSelectItems.push(this.previewData.purposeItems2[i]);
              } else if (this.previewData.purposeItems2[i].qtype == 2) {
                this.previewData.pre_mulSelectItems.push(this.previewData.purposeItems2[i]);
              } else if (this.previewData.purposeItems2[i].qtype == 3) {
                this.previewData.pre_gapFillingItems.push(this.previewData.purposeItems2[i]);
              } else if (this.previewData.purposeItems2[i].qtype == 4) {
                this.previewData.pre_resolveItems.push(this.previewData.purposeItems2[i]);
              }
            }
            this.previewData.pre_singSelectItemsNo = this.previewData.pre_singSelectItems.length;
            this.previewData.pre_mulSelectItemsNo = this.previewData.pre_mulSelectItems.length;
            this.previewData.pre_gapFillingItemsNo = this.previewData.pre_gapFillingItems.length;
            this.previewData.pre_resolveItemsNo = this.previewData.pre_resolveItems.length;
          }
          this.previewData.pre_paperName = this.previewData.paperName; //试题名称
        } else {
          this.getPaperDetail(row)
        }
        this.previewData.showprint = () => {
          let bdhtml = document.body.innerHTML
          window.document.body.innerHTML = window.document.getElementById('printArea').innerHTML
          window.print();
          window.document.body.innerHTML = bdhtml;
          this.previewDialog = false
          location.reload(true);
        }
      },
      //题目详情
      itemDetail(row) {
        row.show = false
        window.open(`${this.global.LOCAL_URL}/#/FamousPaper/ItemDetail/${this.type}/${row.id}`)
      },
      //试卷属性
      paperAttribute(row) {
        row.show = false
        window.open(`${this.global.LOCAL_URL}/#/FamousPaper/PaperAttribute/${this.type}/${row.id}`)
      },
      removePaper() {
        if(this.multipleSelection.length < 1) {
          this.$message({
            showClose: true,
            message: '请选择要删除的试卷！',
            type: 'warning'
          });
        } else {
          this.confirmDeleteDialog = true
        }
      },
      async confirmDelete() {
        let arr = []
        for(let i = 0, len = this.multipleSelection.length; i < len; i ++) {
          arr.push(this.multipleSelection[i].id)
        }
        /*let params = {
          sid: this.global.sid,
          uid: this.global.uid,
          paperIds: arr.join(',')
        }*/
        let url = '/das/paper/manage/deleteCommon'
        let params = {
          sid: this.global.sid,
          uid: this.global.uid,
          paperinfoid: arr.join(',')
        }
        let data = await this.api.get(url, params, {loading: true})
        if(data) {
          this.$message({
            showClose: true,
            message: '删除成功！',
            type: 'success'
          });
          this.confirmDeleteDialog = false
          this.getScanExamPaperList()
        }
      },
      handleAll(selection) {
        //console.log(selection)
      }
    }
  }
</script>

<style lang=''>

</style>

