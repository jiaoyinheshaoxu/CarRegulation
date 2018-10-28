<template lang='html'>
  <div>
    <div class="paper_header_box" v-if="false">
      <div class="paper_header">
        <div class="logo">
          <img src="../../assets/images/yplogo.png" alt="">
          <h2>组卷中心</h2>
        </div>
      </div>
    </div>
    <div class="paper_content">
      <div class="item_info mTop">
        <span class="m_l_20">题号:</span>
        <span v-text="item.id"></span>
        <span class="m_l_20">题型:</span>
        <span v-show="item.qtype==1">单选题</span>
        <span v-show="item.qtype==2">多选题</span>
        <span v-show="item.qtype==3">填空题</span>
        <span v-show="item.qtype==4">解答题</span>
        <span class="m_l_20">难度:</span>
        <span v-text="item.difficulty"></span>
        <span class="m_l_20">更新时间:</span>
        <span v-text="item.updateTime"></span>
        <a @click="check_error()" class="error">
          <span class="iconfont icon-iconfontgantanhao2"></span>
          <span>纠错</span>
        </a>
      </div>
      <div class="mTop">
        <p></span><span v-html="item.title"></span></p>
        <div v-for="anwser in item.answers"><span v-html="anwser.holeAnwser"></span></div>
        <hr>
        <div class="mTop">
          <span class="text-primary">【答案】</span>
          <span v-if="(item.qtype==3||item.qtype==4)&&item.answer!=null&&item.answers.length>0" v-html="item.answers[0].answertext"></span>
          <span v-else-if="(item.qtype==3||item.qtype==4)">答案请参考解析。</span>
          <span v-else><span v-text="item.rightanswer"></span></span>
        </div>
        <div class="mTop">
          <span class="text-primary">【解析】</span>
          <span v-html="item.content"></span>
        </div>
      </div>
    </div>
    <el-dialog
      title="试题纠错"
      :visible.sync="item_error_dialog"
      width="600px"
      center>
      <div class="error_box">
        <div>
          <p>题目编号：{{item.id}}</p>
        </div>
        <div>
          <p>错误类型：</p>
          <el-checkbox-group
            v-model="select_error_arr">
            <el-checkbox v-for="error in error_type_list" :label="error.id" :key="error.id" class="m_l_20">{{error.name}}</el-checkbox>
          </el-checkbox-group>
        </div>
        <div>
          <p>错误描述：</p>
          <el-input
            type="textarea"
            :autosize="{ minRows: 6, maxRows: 12}"
            placeholder="请输入内容"
            v-model="textarea_content">
          </el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="item_error_dialog = false">取 消</el-button>
    <el-button type="primary" @click="confirm_error()">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        item: {},
        error_type_list: [{name: '题目题文', id: 2}, {name: '题目答案', id: 5}, {name: '题目解析', id: 6}, {name: '其他', id: 7}],
        item_error_dialog: false,
        textarea_content: '',
        select_error_arr: [],
        subjectId: sessionStorage.getItem('cur_subjectId')
      }
    },
    mounted() {
      this.item = sessionStorage.getItem('cur_item')
      if(this.item) {
        this.item = JSON.parse(this.item)
      }
    },
    methods:{
      //提交纠错
      async submit_error_info() {
        let url = '/das/printPaper/reportErrorquestion'
        let params = {
          sid: this.global.sid,
          uid: this.global.uid,
          errorType: this.select_error_arr.join(','),
          qtype: this.item.qtype,
          questionId: this.item.id,
          remark: this.textarea_content,
          subjectid: this.subjectId
        }
        let data = await this.api.get(url, params, {loading: true})
        if (data) {
          this.$message({
            showClose: true,
            message: '提交成功！',
            type: 'success'
          });
          this.item_error_dialog = false
        }
      },
      check_error() {
        this.textarea_content = ''
        this.select_error_arr = []
        this.item_error_dialog = true
      },
      confirm_error() {
        if(!this.textarea_content) {
          this.$message({
            showClose: true,
            message: '错误描述不能为空！',
            type: 'warning'
          });
          return
        }
        if(!this.textarea_content.length > 800) {
          this.$message({
            showClose: true,
            message: '错误描述不能超过800个字符！',
            type: 'warning'
          });
          return
        }
        if(this.select_error_arr.length < 1) {
          this.$message({
            showClose: true,
            message: '请先选择错误类型！',
            type: 'warning'
          });
          return
        }
        this.submit_error_info()
      }
    }
  }
</script>

<style scoped>
  .item_info{
    height: 50px;
    line-height: 50px;
    background-color: #EEF7FF;
  }
  .paper_content{
    padding: 0;
  }
  .m_l_20{
    margin-left: 20px;
  }
  .error{
    float: right;
    margin-right: 20px;
    cursor: pointer;
  }
  .text-primary{
    color: #155abb
  }
  .error_box p{
    height: 30px;
    line-height: 30px;
  }
</style>
