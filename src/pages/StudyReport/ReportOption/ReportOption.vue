<template>
<div>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item>当前位置</el-breadcrumb-item>
    <el-breadcrumb-item>学情报告</el-breadcrumb-item>
    <el-breadcrumb-item>报告设置</el-breadcrumb-item>
  </el-breadcrumb>
  <div style="text-align: right">
    <el-button @click="$router.go(-1)">返回</el-button>
  </div>
  <div class="mTop" style="padding-bottom: 20px">
    <div>
      选择报告缴费学生
    </div>
    <div style="margin-left: 20px" class="selectStu">
      <div class="mTop">
        <span>年级</span>
        <el-select size="mini" v-model="selectedGrade" placeholder="请选择">
          <el-option
            v-for="item in gradeOptions"
            :key="item"
            :label="item"
            :value="item">
          </el-option>
        </el-select>
      </div>
      <ul class="gradeList">
        <li v-for="(classItem, index) in classList" :key="index">
              <span class="classInfo">
                <span>{{classItem.classGradeName}}{{classItem.className}}</span>,
                <span>共{{classItem.classStuNum}}人</span>,
                <span>共{{classItem.reportNum}}人要生成报告</span>
              </span>
          <el-button type="primary" size="mini" @click="importStuDialog=true;importExcelClassId=classItem.classId">导入学生名单</el-button>
          <el-button type="primary" size="mini" @click="viewStuList(classItem.classId)">查看</el-button>
        </li>
      </ul>
    </div>
  </div>
  <!--导入学生名单-->
  <el-dialog
    title="导入学生名单"
    :visible.sync="importStuDialog"
    width="30%"
    @close="closeDialog"

    center>
    <div class="dialogContent">
      <div class="mTop">
        <span>导入模板下载</span>
        <a style="margin-left: 20px;color: rgba(12, 195, 179, 1);" href="/resources/studentChargeRecord.xls"
           class="pointer">studentChargeRecord.xls点击下载</a>
      </div>
      <div class="mTop">
        <span>选择导入文件</span>
        <span style="margin-left: 20px">
            <el-upload
              class="upload-demo"
              ref="upload"
              :action="`${global.jiekou_url}/das/report/rya/uploadExcel?system=${global.system}&sid=${global.sid}&uid=${global.uid}&classId=${importExcelClassId}&examId=${examId}`"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :on-success="uploadSuccess"
              :file-list="fileList"
              :auto-upload="false">
              <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
              <!--<el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传</el-button>-->
            </el-upload>
          </span>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
        <el-button @click="importStuDialog = false">取 消</el-button>
        <el-button type="primary" @click="submitUpload">确 定</el-button>
      </span>
  </el-dialog>
</div>
</template>

<script>
  export default {
    data(){
      return{
        classList: [],
        gradeOptions: [],
        selectedGrade: '',
        examId: '',
        importExcelClassId: '',
        fileList: [],


        importStuDialog: false,
      }
    },
    mounted(){
      this.examId = this.$route.params.examId
      this.getClassList()
    },
    methods: {
      submitUpload() {
        this.$refs.upload.submit();
      },
      uploadSuccess(response, file, fileList){
        if(response.errmsg){
          this.$message({
            message: response.errmsg,
            type: 'warning',
            showClose: true
          })
        }else{
          this.$message({
            message: '上传成功!',
            type: 'success',
            showClose: true
          })
          this.importStuDialog = false
          this.getClassList()
        }

      },
      handleRemove(file, fileList) {
      },
      handlePreview(file) {
      },


      /*获取班级*/
      async getClassList(){
        let url = '/das/report/rya/getClassByExamId'
        let params = {
          sid: this.global.sid,
          uid: this.global.uid,
          examId: this.examId
        }
        let data = await this.api.get(url, params, {loading: true})
        if (data) {
          this.classList = data.classList
          this.classList.map((item, index) => {
            if (this.gradeOptions.indexOf(item.classGradeName) == -1 && item.classGradeName) {
              this.gradeOptions.push(item.classGradeName)
              this.selectedGrade = this.gradeOptions[0]
            }
          })
        }
      },
      /*查看学生名单*/
      viewStuList(classId){
        this.$router.push({name: 'ViewStudentList', params: {
          classId: classId,
          examId: this.examId
        }})
      },
      closeDialog(){
        this.$refs.upload.clearFiles()
      },
    }
  }
</script>

<style scoped>
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
