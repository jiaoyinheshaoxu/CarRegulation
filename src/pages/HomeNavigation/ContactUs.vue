<template lang='html'>
  <div id="main">
    <div class="center">
      <div class="nav-title">
        <h1>联系我们</h1>
      </div>
      <div class="nav-content">
        <div class="box">
          <p>给我们留言</p>
          <el-form ref="form" :model="form" label-width="120px">
            <el-form-item label="您的邮箱：">
              <el-input v-model="form.email" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="浏览分类：">
              <el-radio-group v-model="form.checkType">
                <el-radio :label="1">意见与建议</el-radio>
                <el-radio :label="2">购买</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="标题：">
              <el-input v-model="form.title" placeholder="请输入标题"></el-input>
            </el-form-item>
            <el-form-item label="内容录入：">
              <el-input type="textarea" v-model="form.desc" placeholder="请输入内容" :rows="10"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit" style="margin-left: 160px">发送</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        form: {
          email: '',
          checkType: '',
          title: '',
          desc: ''
        }
      }
    },
    mounted() {

    },
    methods: {
      onSubmit() {
        if (!this.form.email){
          this.$message({
            showClose: true,
            message: '邮箱不能为空！',
            type: 'warning'
          });
          return
        } else if (!this.global.check_emailValid(this.form.email)) {
          this.$message({
            showClose: true,
            message: '邮箱格式不正确！',
            type: 'warning'
          });
          return
        }
        if (!this.form.checkType){
          this.$message({
            showClose: true,
            message: '留言分类不能为空！',
            type: 'warning'
          });
          return
        }
        if (!this.form.title){
          this.$message({
            showClose: true,
            message: '留言标题不能为空！',
            type: 'warning'
          });
          return
        }
        if (!this.form.desc){
          this.$message({
            showClose: true,
            message: '留言内容不能为空！',
            type: 'warning'
          });
          return
        }
        this.subInfo()
      },
      async subInfo() {
        let lookType
        if(this.form.checkType == 1){
          lookType = '意见与建议'
        } else if (this.form.checkType == 2) {
          lookType = '单份购买'
        }
        let url = 'OtherService.asmx/AddMessage'
        let params = {
          title: this.form.title,
          email: this.form.email,
          type: lookType,
          memo: this.form.desc,
          memberId: this.global.memberId
        }
        let data = await this.api.post(url ,params)
        if (data) {
          this.$message({
            showClose: true,
            message: '提交成功！',
            type: 'success'
          });
        }
        setTimeout(() => {
          this.$router.push({
            name: 'Index'
          })
        }, 500)
      }
    }
  }
</script>

<style scoped>
  .center {
    width: 100%;
    margin: 0 auto;
    min-height: 600px;
  }

  .nav-title {
    height: 80px;
  }

  .nav-title h1 {
    height: 80px;
    line-height: 40px;
    color: #0c7dcf;
    font-size: 30px;
  }

  .nav-content {
    background-color: #ffffff;
    padding-bottom: 34px;
    min-height: 600px;
    overflow: hidden;
  }
  .box{
    width: 600px;
    min-height: 500px;
    margin: auto;
  }
  .box p{
    text-align: center;
    height: 60px;
    line-height: 60px;
    font-size: 20px;
  }
</style>

