<template lang='html'>
  <div class="padding_20">
    <div class="title_box">
      <p>
        {{paperInfo.paperName}}
      </p>
      <div>
        <span>试卷ID：{{ paperInfo.paperId}}</span>
        <span>试卷总分值：{{paperInfo.paperScore}}分</span>
        <span>学科学段：{{paperInfo.phaseSubject}}</span>
        <span>教材版本：{{paperInfo.materialName}}</span>
        <span>学期（册）：{{paperInfo.semester}}</span>
      </div>
    </div>
    <div class="main">
      <el-table
        :data="itemList"
        border
        style="width: 100%">
        <el-table-column
          prop="questionId"
          label="ID"
          width="100">
        </el-table-column>
        <el-table-column
          type="index"
          label="编号"
          width="100">
        </el-table-column>
        <el-table-column
          prop="questionNum"
          label="题号"
          width="100">
        </el-table-column>
        <el-table-column
          :formatter="getItemType"
          label="题型"
          width="100">
        </el-table-column>
        <el-table-column
          prop="questionScore"
          label="分值"
          width="100">
        </el-table-column>
        <el-table-column
          prop="answer"
          label="正确答案"
          width="100">
        </el-table-column>
        <el-table-column
          prop="mainPointName"
          show-overflow-tooltip
          label="主知识点">
        </el-table-column>
        <el-table-column
          :formatter="getOtherPoint"
          show-overflow-tooltip
          label="次知识点">
        </el-table-column>
        <el-table-column
          :formatter="getAbilityList"
          show-overflow-tooltip
          label="学科能力">
        </el-table-column>
        <el-table-column
          :formatter="getThoughtList"
          show-overflow-tooltip
          label="学科思想方法">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        paperInfo: {},
        itemList: [],
        paperType: '',
        paperId: ''
      }
    },
    mounted() {
      this.paperType = this.$route.params.paperType;
      this.paperId = this.$route.params.paperId;
      this.getPaperQuestionDetail()
    },
    methods: {
      async getPaperQuestionDetail() {
        let url = '/das/paper/manage/getPaperQuestionDetail'
        let params = {
          sid: this.global.sid,
          uid: this.global.uid,
          paperId: this.paperId
        }
        let data = await this.api.get(url, params, {loading: true})
        this.paperInfo = data.infoData
        this.itemList = data.infoData.infoList
      },
      getItemType(row) {
        if(row.questionType == 1) {
          return '单选'
        }
        if(row.questionType == 2) {
          return '多选'
        }
        if(row.questionType == 3) {
          return '填空'
        }
        if(row.questionType == 4) {
          return '解答'
        }
      },
      getAbilityList(row) {
        return row.abilityNameList.join(',')
      },
      getThoughtList(row) {
        return row.thoughtwayNameList.join(',')
      },
      getOtherPoint(row) {
        return row.subPointNameList.join(',')
      },
    }
  }
</script>

<style lang='' scoped>
  .main{
    margin: 20px auto;
    padding: 10px;
    max-width: 1400px;
    box-shadow: 0px 0px 2px 1px rgba(0, 0, 0, 0.05);
    -webkit-box-shadow: 0px 0px 2px 1px rgba(0, 0, 0, 0.05);
  }
</style>
