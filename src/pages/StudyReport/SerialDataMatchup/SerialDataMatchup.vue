<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>学情报告</el-breadcrumb-item>
      <el-breadcrumb-item>阅卷数据</el-breadcrumb-item>
      <el-breadcrumb-item>试题序号和阅卷数据对应关系</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="text-align: right">
      <el-button type="primary" @click="saveItemNum">保存</el-button>
      <el-button type="primary" @click="$router.go(-1)">返回</el-button>
    </div>
    <div class="dataTableWrap">
      <table class="dataTable" border="1">
        <thead>
          <tr>
            <th>序号</th>
            <th>题号</th>
            <th>对应试卷题号</th>
            <th>题型</th>
            <th>分值</th>
            <th>试卷题号</th>
            <th>分值</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in tableData" :key="index">
            <td>{{index+1}}</td>
            <td>{{item.questionno}}</td>
            <td>{{item.youpuquestionno}}</td>
            <td>{{item.sbjtype}}</td>
            <td>{{item.sbjscore}}</td>
            <td>
              <input @keyup="item.confirmquestion = item.confirmquestion.toString().replace(/[^\d]/g, '');"
                     type="text" class="itemno" v-model="item.confirmquestion">
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        ruiyaPaperId: '',
        tableData: [],
        questionNumStr: ''
      }
    },
    mounted(){
      this.ruiyaPaperId = this.$route.params.paperId,
      this.getPaperItem()
    },
    methods: {
      /*获取试卷题号*/
      async getPaperItem(){
        let url = '/detector/api/view/ruiya/test/getquestionNum'
        let params = {
          sid: this.global.sid,
          uid: this.global.uid,
          paperId: this.ruiyaPaperId
        }
        let data = await this.api.get(url, params, {loading: true})
        if(data){
          console.log(data);
          this.tableData = data.questionList
        }
      },
      /*修改试卷题号关联*/
      saveItemNum(){
        console.log(this.tableData);
        this.tableData.map((item, index)=>{
          console.log(item.confirmquestion);
          this.questionNumStr = this.questionNumStr
            ? `${this.questionNumStr},${item.questionno}_${item.confirmquestion}`
            : `${item.questionno}_${item.confirmquestion}`
        })
        this.savePaperItem()
      },
      async savePaperItem(){
        let url = '/detector/api/view/ruiya/test/matchQuestionNum'
        let params = {
          sid: this.global.sid,
          uid: this.global.uid,
          paperId: this.$route.params.paperId,
          questionNums: this.questionNumStr
        }
        let data = await this.api.get(url, params, {loading: true})
        if(data){
          console.log(data);
          this.$message({
            message: '关联成功',
            type: 'success',
            showClose: true
          })
        }
      },
      keyup(num, str, limitNum){
        if (!this[str]) {
          return
        }
        this[str] = this[str].toString().replace(/[^\d]/g, '');
        if (this[str].length > 1 && this[str].substring(0, 1) == 0) {
          this[str] = this[str].substring(1);
        }
        if (num >= limitNum) {
          this[str] = limitNum;
        }
        if (num < 1) {
          this[str] = '';
        }
      },
    }
  }
</script>

<style scoped>
.dataTableWrap{
  width: 100%;
  margin-top: 20px;
}
.dataTable {
  width: 100%;
  margin: auto;
  border-collapse: collapse;
  table-layout: fixed;
}
.dataTable th, .dataTable td{
  text-align: center;
}
.itemno{
  border: none;
  width: 100%;
  box-sizing: border-box;
  padding: 0 30px;
  text-align: center;
}
</style>
