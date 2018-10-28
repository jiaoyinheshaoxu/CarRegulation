<template>
  <div>
    <div class="backBtn">
      <el-button type="default" @click="$router.go(-1)">返回</el-button>
    </div>
    <div class="mTop titleWrap">
      <div class="testName">{{paperInfo.paperName}}</div>
      <div class="mTop testInfo">
        <span>试卷ID:&nbsp;{{paperInfo.paperId}}</span>
        <span>试卷总分值:&nbsp;{{paperInfo.paperScore}}</span>
        <span>学段学科:&nbsp;{{paperInfo.phaseSubject}}</span>
        <span>教材版本:&nbsp;{{paperInfo.materialName}}</span>
        <span>学期(册):&nbsp;{{paperInfo.semester}}</span>
      </div>
    </div>
    <el-table
      :data="analyseData"
      border
      class="mTop"
      style="width: 100%"
    >
      <el-table-column
        prop="questionId"
        label="ID"
      >
      </el-table-column>
      <el-table-column
        type="index"
        width="100px"
        label="编号"
      >
      </el-table-column>
      <el-table-column
        prop="questionNum"
        label="题号"
      >
      </el-table-column>
      <el-table-column
        prop=""
        label="题型"
      >
        <template slot-scope="scope">
          <span v-show="scope.row.questionType==1" title="单选">单选</span>
          <span v-show="scope.row.questionType==2" title="多选">多选</span>
          <span v-show="scope.row.questionType==3" title="填空">填空</span>
          <span v-show="scope.row.questionType==4" title="解答">解答</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="questionScore"
        label="分值"
      >
      </el-table-column>
      <el-table-column
        prop="answer"
        label="正确答案">
      </el-table-column>
      <el-table-column
        prop="mainPointName"
        label="主知识点">
      </el-table-column>
      <el-table-column
        prop="subPointName"
        label="次知识点">
      </el-table-column>
      <el-table-column
        prop="abilityName"
        label="学科能力">
      </el-table-column>
      <el-table-column
        prop="thoughtName"
        label="学科思想方法">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        paperInfo: [],
        analyseData: []
      }
    },
    mounted(){
      this.getAnalyseData()
    },
    methods: {
      async getAnalyseData(){
        let url = '/das/paper/manage/getPaperQuestionDetail'
        let params = {
          sid: this.global.sid,
          uid: this.global.uid,
          paperId: 5710
        }
        let data = await this.api.get(url, params, {loading: true})
        if(data){
          this.paperInfo = data.infoData;
          this.analyseData = data.infoData.infoList;
          if(this.analyseData && this.analyseData.length > 0){
            for(var i=0;i<this.analyseData.length;i++){
              this.analyseData[i].subPointName = this.analyseData[i].subPointNameList.join('，');
              this.analyseData[i].abilityName = this.analyseData[i].abilityNameList.join('，');
              this.analyseData[i].thoughtName = this.analyseData[i].thoughtwayNameList.join('，');
            }
          }
        }
      },
    }
  }
</script>

<style scoped>
.titleWrap{
  text-align: center;
  border: 1px solid grey;
  box-shadow: grey 5px 5px 5px;
  padding: 20px 0;
}
.backBtn{
  text-align: right;
}
.testName{
  font-size: 26px;
  font-weight: bold;
}
.testInfo{
  font-size: 14px;
}
.testInfo>span{
  padding: 0 10px;
}
</style>
