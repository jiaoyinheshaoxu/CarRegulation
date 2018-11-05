<template>
  <div class="box">
    <div class="center">
      <div id="day" class="white">
        <div id="menu" class="clearfix" style="margin-top: -40px">
          <div>
            <div id="fontSize">
              <span>字号：</span>
              <button id="small" data-index=1>小</button>
              <button id="middle" class="font-active" data-index=2>中</button>
              <button id="big" data-index=3>大</button>
            </div>
            <div id="mode">
              <span>模式：</span>
              <button id="sun"></button>
              <button class="moon" id="moon"></button>
            </div>
          </div>
          <div>
            <div id="language">
              <button class="china lan font-active" @click="languageClick('china')">中文</button>
              <button class="english lan" @click="languageClick('english')" style="margin-left: -400px">EN</button>
              <button class="shu" @click="languageClick('shu')" style="display: none"></button>
              <button class="heng" @click="languageClick('heng')" style="display: none"></button>
            </div>
            <div id="download" style="cursor: pointer;display: none" @click="showDownPdf">
              <button></button>
              <span>下载</span>
            </div>
            <div id="print" style="cursor: pointer;display: none">
              <button></button>
              <span>打印</span>
            </div>
          </div>
        </div>
      </div>
      <div id="article-header">
        <div class="line1 clearfix">
          <div id="bread-nav">
            <a href="">首页</a>
            <span>/</span>
            <a href="">标准搜索</a>
            <span>/</span>
            <a href="">动态详情</a>
          </div>

        </div>
        <div class="line2 clearfix">
          <div class="art-title">
            <h3>{{detail.f_ChineseTitle}}<span>（{{detail.f_FileState}}）</span></h3>
            <h3>{{detail.f_EnglishTitle}}</h3>
          </div>
        </div>
        <div class="line3">
          <div class="effectiveDate">
            <span>发布日期（Date issued）</span>{{new Date(detail.f_ReleaseDate).getTime() | formatTime('YMD')}}<span></span>
            <span>实施日期（Effective date）</span>{{new Date(detail.f_ImplementDate).getTime() | formatTime('YMD')}}<span></span>
          </div>
          <div class="label" v-if="detail.f_Label">
            <span v-for="row in detail.f_Label.split('；')" v-show="row">{{row}}</span>
          </div>
          <!--<span style="float: right;cursor: pointer;color: #0c7dcf" v-show="!isSave" @click="Save()">收藏</span>
          <span style="float: right;cursor: pointer;color: #0c7dcf" v-show="isSave" @click="unSave()">已收藏</span>-->
        </div>
      </div>
      <article id="article">

      </article>
      <div class="article">
        <div v-html="detail.f_ChineseContent"></div>
      </div>
      <button id="backTop"></button>
    </div>
    <!--下载pdf-->
    <el-dialog
      :visible.sync="downDialog"
      width="50%"
      center>
      <span slot="title">
        <span>当前下载</span>
        <span style="color: red">{{downTitle}}</span>
      </span>
      <div>
        <span>选择语言：</span>
        <el-radio-group v-model="select_language">
          <el-radio :label="1">中文</el-radio>
          <el-radio :label="2">英文</el-radio>
          <el-radio :label="3">中英文（上下）</el-radio>
        </el-radio-group>
      </div>
      <div>
        <h2 style="height: 30px;line-height: 30px">选择章节：</h2>
        <el-table
          ref="multipleTable"
          :data="chapterList"
          tooltip-effect="dark"
          style="width: 455px"
          border
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            label="全部选择"
            prop="name"
            width="400">
          </el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="downDialog = false">取 消</el-button>
    <el-button type="primary" @click="confirmDown">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        documentId: '',
        languageType: 1,
        memberId: '',
        detail: {},
        downDialog: false,
        downTitle: '汽车侧面碰撞的乘员保护.pdf',
        select_language: 1,
        chapterList: [{
          id: '2',
          name: '汽车侧面碰撞的乘员保护',
        }, {
          id: '3',
          name: '1 范围',
        }, {
          id: '4',
          name: '2 规范性引用文件',
        }, {
          id: '5',
          name: '3 术语和定义',
        }, {
          id: '6',
          name: '4 技术要求',
        }, {
          id: '6',
          name: '5 车辆型式的变更',
        }],
        multipleSelection: [],
        isSave: false,
        residueDownloadNum: 0
      }
    },
    mounted() {
      $("#fontSize button").click(function () {
        $("#fontSize button").removeClass("font-active");
        $(this).addClass("font-active")
      })
      $("#small").click(function () {
        setFongSize("12px");
        $("#middle").removeClass("font-active");
        $("#small").addClass("font-active");
        $("#big").removeClass("font-active");
      });
      $("#middle").click(function () {
        setFongSize("16px");
        $("#middle").addClass("font-active");
        $("#small").removeClass("font-active");
        $("#big").removeClass("font-active");
      });
      $("#big").click(function () {
        setFongSize("20px");
        $("#middle").removeClass("font-active");
        $("#small").removeClass("font-active");
        $("#big").addClass("font-active");
      });
      function setFongSize(s) {
        $("#article *").css("font-size", s);
      }
      //sun  article.css
      $("#sun").click(function () {
        $(".black").attr("class", "white");
        $('#article').css({
          background: '#ffffff'
        })
        $('#article-header').css({
          background: '#ffffff'
        })
      });
      //moon skinnight
      $("#moon").click(function () {
        $(".white").attr("class", "black");
        $('#article').css({
          background: 'gray'
        })
        $('#article-header').css({
          background: 'gray'
        })
      });
      $("#contents_list li").mouseover(function () {
        $(this).children("a").addClass("active_logo");
      })
      //set heng shu active 中china 英english  font-active
      $(".shu").click(function () {
        $(".heng").removeClass("active");
        $(".shu").addClass("active");
        $(".china").removeClass("font-active");
        $(".english").removeClass("font-active");
      });
      $(".heng").click(function () {
        $(".heng").addClass("active");
        $(".shu").removeClass("active");
        $(".china").removeClass("font-active");
        $(".english").removeClass("font-active");
      });
      $(".china").click(function () {
        $(".heng").removeClass("active");
        $(".shu").removeClass("active");
        $(".china").addClass("font-active");
        $(".english").removeClass("font-active");
      });
      $(".english").click(function () {
        $(".heng").removeClass("active");
        $(".shu").removeClass("active");
        $(".china").removeClass("font-active");
        $(".english").addClass("font-active");
      });
      $("#backTop").click(function () {
        $("html,body").animate({ scrollTop: 0 }, 500);
      });
      this.documentId = this.$route.params.id
      this.memberId = this.global.memberId
      //this.GetDocumentInfoById()
      this.getDetail()
      this.GetWordContent()
    },
    methods: {
      languageClick(str) {
        if(str == 'shu') {
          this.GetWordContent(1);
        } else if (str == 'heng') {
          this.GetWordContent(4);
        } else if (str == 'china') {
          this.GetWordContent(2);
        } else if (str == 'english') {
          this.GetWordContent(3);
        }
      },
      confirmDown() {

      },
      toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      showDownPdf() {
        this.GetMemberInfo()
        //this.downDialog = true
      },
      async GetDocumentInfoById() {
        /*this.documentId = '250f177b-0c08-4a64-a798-6fb7f0641af3'
        this.memberId = '2ed9a56b-6f0a-4d6e-97f6-38ec2f6a4dab'*/
        let url = 'DocumentService.asmx/GetDocumentInfoById'
        let params = {
          documentId: this.documentId,
          memberId: this.memberId,
          languageType: this.languageType
        }
        let data = await this.api.post(url, params)
        if (data) {
          console.log(data)
          this.isSave = data.isCollect
          this.detail = data.documentContentModel
        }
      },
      async Save() {
        /*this.documentId = '250f177b-0c08-4a64-a798-6fb7f0641af3'
        this.memberId = '2ed9a56b-6f0a-4d6e-97f6-38ec2f6a4dab'*/
        let url = 'OtherService.asmx/AddMyCollect'
        let params = {
          documentId: this.documentId,
          memberId: this.memberId,
        }
        let data = await this.api.post(url, params)
        if (data) {
          console.log(data)
          if (data[0] == true) {
            this.$message({
              showClose: true,
              message: '收藏成功！'
            });
            this.isSave = true
          }
        }
      },
      async unSave() {
        /*this.documentId = '250f177b-0c08-4a64-a798-6fb7f0641af3'
        this.memberId = '2ed9a56b-6f0a-4d6e-97f6-38ec2f6a4dab'*/
        let url = 'OtherService.asmx/DelMyCollect'
        let params = {
          documentId: this.documentId,
          memberId: this.memberId,
        }
        let data = await this.api.post(url, params)
        if (data) {
          console.log(data)
          if (data[0] == true) {
            this.$message({
              showClose: true,
              message: '取消收藏成功！'
            });
            this.isSave = false
          }
        }
      },
      async getDetail() {
        let url = 'DocumentService.asmx/GetDocumentInformationInfoById'
        let params = {
          documentId: this.documentId,
          languageType: this.languageType
        }
        let data = await this.api.get(url, params, {loading: true})
        if (data) {
          this.detail = data
          console.log(data)
        }
      },
      async GetWordContent(type) {
        if(!type) {
          type = 2
        }
        let url = '/DocumentService.asmx/GetWordContent'
        let params = {
          keyword: this.documentId,
          type: type
        }
        let data = await this.api.post(url, params)
        if(data) {
          console.log(data)
          $("#article").html(data[0]);
        }
      },
      async DownloadFile() {
        /*this.documentId = '250f177b-0c08-4a64-a798-6fb7f0641af3'
        this.memberId = '2ed9a56b-6f0a-4d6e-97f6-38ec2f6a4dab'*/
        let url = 'DocumentService/DownloadFile'
        let params = {
          documentId: this.documentId,
          memberId: this.memberId,
          languageType: this.languageType
        }
        let data = await this.api.post(url ,params)
        if (data) {
          console.log(data)
        }
      },
      async GetMemberInfo() {
        /*this.memberId = 'b60b54ee-d4fb-4085-a873-e8dc95af1039'*/
        let url = 'OtherService.asmx/GetMemberInfo'
        let params = {
          memberId: this.memberId
        }
        let data = await this.api.post(url, params)
        if (data) {
          console.log(data)
          this.residueDownloadNum = data.residueDownloadNum
          if(this.residueDownloadNum < 1) {
            this.$message({
              showClose: true,
              message: '你的下载剩余下载次数不够了，请充值会员后再下载！'
            });
            this.DownloadFile()
          } else {
            this.DownloadFile()
          }
        }
      }
    }
  }
</script>

<style scoped>
  td{
    word-wrap:break-word
  }
  .center {
    width: 90%;
    margin: 0px auto 50px;
  }
  .white #menu {
    height: 56px;
    padding-left: 40px;
    background-color: #d8d8d8;
    display: flex;
    /*align-items: center;*/
    justify-content: space-between;
    font-size: 14px;
  }
  .white #menu button {
    color: #9b9b9b;
  }
  .white #menu span {
    color: #5c5c5c;
  }
  .white #menu .font-active {
    color: #4a90e2;
  }
  .white #fontSize button:hover,
  .white #language button:hover {
    color: #4a90e2;
  }
  .white #sun {
    background: url("../../assets/images/bg.png") -240px -140px;
  }
  .white #moon {
    background: url("../../assets/images/bg.png") -320px -140px;
  }
  .white #moon:hover {
    background: url("../../assets/images/bg.png") -360px -140px;
  }
  .white .shu {
    background: url("../../assets/images/bg.png") -124px -182px;
  }
  .white .shu:hover {
    background: url("../../assets/images/bg.png") -84px -182px;
  }
  .white .shu.active {
    background: url("../../assets/images/bg.png") -84px -182px;
  }
  .white .heng {
    background: url("../../assets/images/bg.png") -202px -182px;
  }
  .white .heng:hover {
    background: url("../../assets/images/bg.png") -162px -182px;
  }
  .white .heng.active {
    background: url("../../assets/images/bg.png") -162px -182px;
  }
  .white #download button {
    background: url("../../assets/images/bg.png") -400px -140px;
  }
  .white #print button {
    background: url("../../assets/images/bg.png") -480px -138px;
  }
  .black #menu {
    height: 56px;
    padding-left: 40px;
    background-color: #6a6a6a;
    display: flex;
    /*align-items: center;*/
    justify-content: space-between;
    color: #9b9b9b;
    font-size: 14px;
  }
  .black #menu span {
    color: #ffffff;
  }
  .black #menu button {
    color: #9b9b9b;
  }
  .black #menu .font-active {
    color: #ffffff;
  }
  .black #fontSize button:hover,
  .black #language button:hover {
    color: #ffffff;
  }
  .black #moon {
    background: url("../../assets/images/bg.png") -360px -140px;
  }
  .black #sun {
    background: url("../../assets/images/bg.png") -280px -140px;
  }
  .black #sun:hover {
    background: url("../../assets/images/bg.png") -240px -140px;
  }
  .black .shu {
    background: url("../../assets/images/bg.png") -284px -182px;
  }
  .black .shu:hover {
    background: url("../../assets/images/bg.png") -244px -182px;
  }
  .black .shu.active {
    background: url("../../assets/images/bg.png") -244px -182px;
  }
  .black .heng {
    background: url("../../assets/images/bg.png") -362px -182px;
  }
  .black .heng:hover {
    background: url("../../assets/images/bg.png") -322px -182px;
  }
  .black .heng.active {
    background: url("../../assets/images/bg.png") -322px -182px;
  }
  .black #download button {
    background: url("../../assets/images/bg.png") -440px -140px;
  }
  .black #print button {
    background: url("../../assets/images/bg.png") -520px -138px;
  }
  #menu {
    height: 56px;
    padding-left: 40px;
    background-color: #dedede;
    display: flex;
    /*align-items: center;*/
    justify-content: space-between;
    color: #515151;
    font-size: 14px;
  }
  #menu > div {
    display: flex;
    align-items: center;
    width: 500px;
    justify-content: space-between;
  }
  #menu > div:last-child {
    justify-content: flex-end;
  }
  #menu > div:first-child {
    justify-content: flex-start;
  }
  #menu button {
    outline: none;
    cursor: pointer;
    border: none;
    background-color: transparent;
  }
  #fontSize {
    flex: 2;
  }
  #small,
  #middle,
  #big {
    border: none;
  }
  #small {
    font-size: 14px;
  }
  #middle {
    font-size: 16px;
    margin: 0 10px;
  }
  #big {
    font-size: 18px;
  }
  #mode {
    display: flex;
    flex: 3;
    align-items: center;
  }
  #sun,
  #moon,
  #no-sun,
  #no-moon {
    display: inline-block;
    width: 16px;
    height: 16px;
    margin: 0 5px;
  }
  /*#artSearch {*/
  /*margin-left: 0px;*/
  /*font-size: 0;*/
  /*background-color: white;*/
  /*border-radius: 5px;*/
  /*overflow: hidden;*/
  /*}*/
  /*#artSearch input {*/
  /*display: inline-block;*/
  /*!*width: 225px;*!*/
  /*height: 28px;*/
  /*padding-left: 10px;*/
  /*vertical-align: top;*/
  /*outline: none;*/
  /*border: none;*/
  /*}*/
  /*.search {*/
  /*display: inline-block;*/
  /*width: 28px;*/
  /*height: 28px;*/
  /*vertical-align: top;*/
  /*background: url("../../assets/images/search.png") no-repeat center;*/
  /*}*/
  #language button {
    /*margin-right: 20px;*/
  }
  #language {
    display: flex;
    justify-content: space-around;
    flex: 2;
  }
  #download {
    display: flex;
    justify-content: flex-end;
    flex: 2;
  }
  #print {
    display: flex;
    justify-content: center;
    flex: 2;
  }
  .shu,
  .heng,
  #download button,
  #print button {
    width: 20px;
    height: 20px;
    vertical-align: top;
  }
  #article-header {
    position: sticky;
    position: -webkit-sticky;
    top: 0;
  }
  .line1 {
    height: 50px;
    box-sizing: border-box;
    padding: 15px 0;
  }
  #bread-nav {
    float: left;
  }
  #bread-nav a,
  #bread-nav span {
    color: #9d9d9d;
  }
  #bread-nav a:last-child {
    color: #666666;
  }
  .collection {
    float: right;
  }
  .collection > a {
    display: flex;
    align-items: center;
  }
  .heart {
    display: inline-block;
    width: 40px;
    height: 20px;
    background: url("../../assets/images/bg.png") no-repeat -580px -135px;
  }
  .no-heart {
    display: inline-block;
    width: 40px;
    height: 20px;
    background: url("../../assets/images/bg.png") no-repeat -540px -135px;
  }
  .art-title,
  .en-art-title {
    display: inline-block;
    margin-bottom: 10px;
    font-size: 22px;
    line-height: 1.5;
  }
  .en-art-title h3 {
    font-weight: 200;
    font-size: 16px;
    font-family: sans-serif;
  }
  .flag {
    /*float: right;*/
    display: inline-block;
    font-size: 14px;
    margin-left: 10px;
  }
  .point {
    display: inline-block;
    width: 5px;
    height: 5px;
    background: #52c41a;
    border-radius: 50%;
    margin-bottom: 1px;
    margin-right: 5px;
  }
  .issuedDate,
  .effectiveDate,
  .label {
    display: inline-block;
    font-size: 14px;
  }
  .effectiveDate {
    margin: 0 55px 0 10px;
  }
  .label span {
    display: inline-block;
    background-color: #f5f5f5;
    padding: 2px 5px;
    margin-left: 15px;
    border: 1px solid #d9d9d9;
    font-size: 10px;
    border-radius: 2px;
  }
  #article-header,
  article {
    background-color: #ffffff;
  }
  #article-header {
    padding: 10px 40px 30px 40px;
    margin-bottom: 20px;
    line-height: 1.5;
    font-family: "Microsoft YaHei";
  }
  article {
    padding: 30px 50px 55px 40px;
    border: 1px solid #c0c0c0;
    min-height: 500px;
  }
  article h5 {
    line-height: 1.5;
    font-size: 14px;
    color: #000;
  }
  article p {
    line-height: 1.5;
    font-size: 14px;
    color: #666666;
    margin-bottom:20px;
  }
  article p.ask{
    font-size:16px;
    font-weight:bold;

  }
  article p:hover {
    background: #E8E8E8;
  }
  #mulu,
  #backTop {
    width: 40px;
    height: 40px;
    position: fixed;
    bottom: 42px;
    border: none;
    background-color: transparent;
    border-radius: 5px;
    vertical-align: top;
    outline: none;
    cursor: pointer;
    top: 50%;
    right: 4%;
  }
  #mulu {
    background: url("../../assets/images/bg.png") -80px -240px;
  }
  #mulu:hover {
    background: url("../../assets/images/bg.png") -160px -240px;
  }
  #backTop {
    background: url("../../assets/images/bg.png") -240px -240px;
  }
  #backTop:hover {
    background: url("../../assets/images/bg.png") -320px -240px;
  }
  /*mululist */
  #contents{
    width:12%;
    height:500px;
    background:#fff;
    border:1px solid transparent;
    border-radius:5px;
    position:fixed;
    left:1667px;
    top:260px;
    padding:17px;
    box-sizing: border-box;
  }
  #contents>.contents_bor{
    width:100%;
    height:380px;
    border-left:1px solid #ddd;
  }
  #contents>.contents_bor ul{
    list-style: none;
  }
  #contents>.contents_bor>ul li{
    margin-bottom:10px;
  }
  #contents>.contents_bor>ul li a{
    display: inline-block;
    width:15px;
    height:15px;
    background: url("../../assets/images/bg6.png")-699px -726px;
  }
  #contents>.contents_bor>ul li a.moren{
    display: inline-block;
    width:15px;
    height:15px;
    background: url("../../assets/images/bg6.png")-699px -726px;
  }
  #contents>.contents_bor>ul li a.active_logo{
    background: url("../../assets/images/bg6.png")-698px -595px;
  }
  #contents>.contents_bor>ul li ul{
    margin-left:16px;
  }
  #contents>.contents_bor>ul li ul li{
    margin-bottom:10px;
  }
  #contents_bor{
    position: relative;
  }
  #contents_list>li{
    margin-bottom:20px;
    position: relative;
    left:-6px;
  }
  #contents_list{
    color:#5c5c5c;
  }
  #contents_list>li>b{
    color:#5c5c5c;
    /* font-weight:normal;*/
    font-size:16px;
  }


</style>

