<template>
  <div>
    <div>
      <div style="margin: 20px">
        <div class="title_box">
          <p>
            {{paperInfo.paperName}}
          </p>
          <div>
              <span>试卷ID：{{ paperInfo.paperId}}</span>
              <span>试卷总分值：{{paperInfo.paperScore}}分</span>
              <span>学科学段：{{paperInfo.phaseSubject}}</span>
              <span>教材版本：{{paperInfo.materialName}}</span>
              <span>学期（册）：{{paperInfo.gradeAndSemester}}</span>
          </div>
        </div>
      </div>
      <div class="modal-body">
        <div class="m-md">
          <div class="m-v-xs">
            <div>
              <span class="mRight">试卷ID：{{paperInfo.paperId}}</span>
              <span class="m-h-md mRight">试卷类型：套卷</span>
              <span class="m-h-md mRight">试卷来源：{{paper.source}}</span>
              <span class="m-h-md mRight">总分值：{{paper.score}}</span>
              <span class="m-h-md mRight">要求答题时长：{{paper.answerTokinaga}}分钟</span>
            </div>
            <div class="m-v-md">
              <span class="mRight">难度：{{paper.difficulty}}</span>
              <span class="m-h-md mRight">已发布次数：{{paper.testedNum}}</span>
              <span class="m-h-md mRight">已参加测评人数：{{paper.testedPeople}}</span>
            </div>
          </div>
          <div class="m-v-lg">
            <div class="pull-left">试卷题量：</div>
            <div class="col-xs-3 no-border p-h-md p-v-sm"
                 style="background-color: #F2F2F2;border-radius: 4px;display: inline-block;margin-left: 10px">
              <p>单项选择题<span class="p-h-xs">{{singSelectItemsNo}}</span>道</p>
              <p>多项选择题<span class="p-h-xs">{{mulSelectItemsNo}}</span>道</p>
              <p>填空题<span class="p-h-xs">{{gapFillingItemsNo}}</span>道</p>
              <p>解答题<span class="p-h-xs">{{resolveItemsNo}}</span>道</p>
              <p>难度值<span class="p-h-xs">{{paper.difficulty}}</span></p>
              <p>总计<span class="p-h-xs">{{paper.allnum}}</span>道，共<span style="color: red">{{paper.score}}</span>分</p>
            </div>
          </div>
        </div>
        <div class="p-md" style="clear: both">
          <div v-if="singSelectItemsNo!=0">
            <p onclick="">单项选择题，共<span>{{singSelectItemsNo}}</span>道</p>
            <hr style="color: #b5b5b5">
            <div v-for="row in singSelectItems">
              <p><span style="color: #00cccc">{{row.num}}、</span><span v-html="row.title"></span>
              <div v-for="anwser in row.answers" class="m-h-lg"><span v-html="anwser.holeAnwser"
                                                                      :style="{'color': anwser.isRed}"></span>
              </div>
              <p><span class="text-primary">分析</span>：<br/><span v-html="row.analysis"></span></p>
              <p><span class="text-primary">解答</span>：<br/><span v-html="row.qexplain"></span></p>
              <p><span class="text-primary">点评</span>：<br/><span v-html="row.comments"></span></p>
              <div class="m-v text-grey">
                <p>
                  <span>试题ID：{{row.id}}</span>
                  <span style="margin: 0 10px">难度值：{{row.difficulty}}</span>
                  <span>分值：{{row.score}}</span>
                </p>
                <p>
                  考查知识点：{{row.pointNames}}
                </p>
                <p>
                  考查学科能力：{{row.abilityNames}}
                </p>
                <p>
                  考查思想方法：{{row.thoughtNames}}
                </p>
              </div>
              <hr style="color: #b5b5b5">
            </div>
          </div>
          <div v-if="mulSelectItemsNo!=0">
            <p>多项选择题，共<span>{{mulSelectItemsNo}}</span>道</p>
            <hr style="color: #b5b5b5">
            <div v-for="row in mulSelectItems">
              <p><span style="color: #00cccc">{{row.num}}、</span><span v-html="row.title"></span>
              <div v-for="anwser in row.answers" class="m-h-lg"><span v-html="anwser.holeAnwser"
                                                                      :style="{'color': anwser.isRed}"></span>
              </div>
              <p><span class="text-primary">分析</span>：<br/><span v-html="row.analysis"></span></p>
              <p><span class="text-primary">解答</span>：<br/><span v-html="row.qexplain"></span></p>
              <p><span class="text-primary">点评</span>：<br/><span v-html="row.comments"></span></p>
              <div class="m-v text-grey">
                <p>
                  <span>试题ID：{{row.id}}</span>
                  <span style="margin: 0 10px">难度值：{{row.difficulty}}</span>
                  <span>分值：{{row.score}}</span>
                </p>
                <p>
                  考查知识点：{{row.pointNames}}
                </p>
                <p>
                  考查学科能力：{{row.abilityNames}}
                </p>
                <p>
                  考查思想方法：{{row.thoughtNames}}
                </p>
              </div>
              <hr style="color: #b5b5b5">
            </div>
          </div>
          <div v-if="gapFillingItemsNo!=0">
            <p>填空题，共<span>{{gapFillingItemsNo}}</span>道</p>
            <hr style="color: #b5b5b5">
            <div v-for="row in gapFillingItems">
              <p><span style="color: #00cccc">{{row.num}}、</span><span v-html="row.title"></span></p><br>
              <p><span class="text-primary">分析</span>：<br/><span v-html="row.analysis"></span></p>
              <p><span class="text-primary">解答</span>：<br/><span v-html="row.qexplain"></span></p>
              <p><span class="text-primary">点评</span>：<br/><span v-html="row.comments"></span></p>
              <div class="m-v text-grey">
                <p>
                  <span>试题ID：{{row.id}}</span>
                  <span style="margin: 0 10px">难度值：{{row.difficulty}}</span>
                  <span>分值：{{row.score}}</span>
                </p>
                <p>
                  考查知识点：{{row.pointNames}}
                </p>
                <p>
                  考查学科能力：{{row.abilityNames}}
                </p>
                <p>
                  考查思想方法：{{row.thoughtNames}}
                </p>
              </div>
              <hr style="color: #b5b5b5">
            </div>
          </div>
          <div v-if="resolveItemsNo!=0">
            <p>解答题，共<span>{{resolveItemsNo}}</span>道</p>
            <hr style="color: #b5b5b5">
            <div v-for="row in resolveItems">
              <p><span style="color: #00cccc">{{row.num}}、</span><span v-html="row.title"></span></p><br>
              <p><span class="text-primary">分析</span>：<br/><span v-html="row.analysis"></span></p>
              <p><span class="text-primary">解答</span>：<br/><span v-html="row.qexplain"></span></p>
              <p><span class="text-primary">点评</span>：<br/><span v-html="row.comments"></span></p>
              <div class="m-v text-grey">
                <p>
                  <span>试题ID：{{row.id}}</span>
                  <span style="margin: 0 10px">难度值：{{row.difficulty}}</span>
                  <span>分值：{{row.score}}</span>
                </p>
                <p>
                  考查知识点：{{row.pointNames}}
                </p>
                <p>
                  考查学科能力：{{row.abilityNames}}
                </p>
                <p>
                  考查思想方法：{{row.thoughtNames}}
                </p>
              </div>
              <hr style="color: #b5b5b5">
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        paperType: "",
        paperId: "",
        paperInfo: {},
        singSelectItems: [],
        mulSelectItems: [],
        gapFillingItems: [],
        resolveItems: [],
        promiseAnalyse: null,
        paper: {},
        itemsNo: 0,
        singSelectItemsNo: 0,
        mulSelectItemsNo: 0,
        gapFillingItemsNo: 0,
        resolveItemsNo: 0,
      }
    },
    mounted () {
      // 获取跳转时 传入数据
      this.paperType = this.$route.params.paperType;
      this.paperId = this.$route.params.paperId;
      this.getPaperDetail();
      this.getPaperInfo()
    },
    methods: {
      async getPaperDetail(){
        let data = {}
        let url
        let params
        if(this.paperType == 1) {
          url ='/das/paper/manage/detail' //名师卷库
          params = {
            sid: this.global.sid,
            uid: this.global.uid,
            paperinfoid: this.paperId
          }
        } else {
          url = '/das/printPaper/getPaperDetail' //自由卷库  后来添加的为了不重复显示小题
          params = {
            sid: this.global.sid,
            uid: this.global.uid,
            paperinfoId: this.paperId
          }
        }
        data = await this.api.get(url, params, {loading: true})
        if (data.recode == 0) {
          this.paper = data;
          //试卷总题数、选择题数、解答题数、总分
          if (this.paper.resultlist && this.paper.resultlist.length > 0) {
            this.itemsNo = this.paper.resultlist.length; //总题数
            for (var i = 0; i < this.paper.resultlist.length; i++) {
              if (this.paper.resultlist[i].pointNameList && this.paper.resultlist[i].pointNameList.length > 0)
                this.paper.resultlist[i].pointNames = this.paper.resultlist[i].pointNameList.join('  ');
              if (this.paper.resultlist[i].abilityNameList && this.paper.resultlist[i].abilityNameList.length > 0)
                this.paper.resultlist[i].abilityNames = this.paper.resultlist[i].abilityNameList.join('  ');
              if (this.paper.resultlist[i].thoughtNameList && this.paper.resultlist[i].thoughtNameList.length > 0)
                this.paper.resultlist[i].thoughtNames = this.paper.resultlist[i].thoughtNameList.join('  ');
              this.paper.resultlist[i].title = this.formatPToSpan2(this.formatPToSpan(this.paper.resultlist[i].text));
              if (this.paper.resultlist[i].answers && this.paper.resultlist[i].answers.length > 0) {
                for (var j = 0; j < this.paper.resultlist[i].answers.length; j++) {
                  if (this.paper.resultlist[i].qtype == 1 || this.paper.resultlist[i].qtype == 2) {
                    if (j == 0) {
                      this.paper.resultlist[i].answers[j].choice = 'A';
                    } else if (j == 1) {
                      this.paper.resultlist[i].answers[j].choice = 'B';
                    } else if (j == 2) {
                      this.paper.resultlist[i].answers[j].choice = 'C';
                    } else if (j == 3) {
                      this.paper.resultlist[i].answers[j].choice = 'D';
                    } else if (j == 4) {
                      this.paper.resultlist[i].answers[j].choice = 'E';
                    } else if (j == 5) {
                      this.paper.resultlist[i].answers[j].choice = 'F';
                    } else if (j == 6) {
                      this.paper.resultlist[i].answers[j].choice = 'G';
                    }
                    this.paper.resultlist[i].answers[j].holeAnwser = this.paper.resultlist[i].answers[j].choice + "、 " + this.formatPToSpan(this.paper.resultlist[i].answers[j].answertext);
                    this.paper.resultlist[i].answers[j].holeAnwser = this.formatPToSpan(this.paper.resultlist[i].answers[j].holeAnwser);
                    if (this.paper.resultlist[i].answers[j].rightanswer == 1) {
                      this.paper.resultlist[i].answers[j].isRed = 'red';
                    }
                  }
                }
              }
              if (this.paper.resultlist[i].qtype == 1) {
                this.singSelectItems.push(this.paper.resultlist[i]);
              } else if (this.paper.resultlist[i].qtype == 2) {
                this.mulSelectItems.push(this.paper.resultlist[i]);
              } else if (this.paper.resultlist[i].qtype == 3) {
                this.gapFillingItems.push(this.paper.resultlist[i]);
              } else if (this.paper.resultlist[i].qtype == 4) {
                this.resolveItems.push(this.paper.resultlist[i]);
              }
            }
            this.singSelectItemsNo = this.singSelectItems.length;
            this.mulSelectItemsNo = this.mulSelectItems.length;
            this.gapFillingItemsNo = this.gapFillingItems.length;
            this.resolveItemsNo = this.resolveItems.length;
          }
        }
      },
      async getPaperInfo() {
        let url = '/das/paper/manage/getPaperHead'
        let params = {
          sid: this.global.sid,
          uid: this.global.uid,
          paperId: this.paperId
        }
        let data = await this.api.get(url, params)
        this.paperInfo = data.dataInfo;
      },
      formatPToSpan(txt) {
        //如果传过来的是[2,3]这种形式的字符串会被解析成数组，需要特殊处理
        if (txt && typeof txt === 'object' && Array == txt.constructor) {
          txt = '[' + txt.toString() + ']';
        } else {
          txt = txt.trim();
        }
        if (txt.indexOf("<P>") == 0 || txt.indexOf("<p>") == 0) {
          txt = txt.substring(3, txt.length - 4);
        }
        txt = "<SPAN>" + txt + "</SPAN>";
        // 替换图片地址
        var reg = new RegExp('src="/Public/pic/', "g");

        txt = txt.replace(reg, 'src="http://img.51youpu.com/Public/pic/');

        return txt;
      },

      formatPToSpan2(txt) {
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
      },

    }

  }
</script>

<style scoped>
  .el-col {
    padding: 0 20px;
  }

  .el-select {
    display: inline-block !important;
  }

  .popover-list span, .popover-list a, .popover-list router-link {
    display: inline-block;
    width: 100%;
  }

  /*头部 单 多 填 解答 统计开始*/
  .modal-body {
    position: relative;
    padding: 15px;
    font-family: Arial, 'Times New Roman', "华文细黑", "PT Sans", "Helvetica Neue", Helvetica, sans-serif;
    font-size: 14px;
    -webkit-font-smoothing: antialiased;
    line-height: 1.42857143;
    color: #777777;
    background-color: white;
  }
  .text-primary{
    color: #00a8f3;
  }
  .modal-body * {
    box-sizing: border-box;
  }

  .modal-body .text-center {
    text-align: center;
  }

  .modal-body .pull-right {
    float: right !important;
  }

  .modal-body hr {
    margin-top: 20px;
    margin-bottom: 20px;
    border: 0;
    border-top: 1px solid #eee;
    height: 0;
  }

  .modal-body .m-md {
    margin: 20px;
  }

  .modal-body .m-v-xs {
    margin-top: 5px;
  }

  .modal-body .m-v-lg {
    margin-top: 30px;
    margin-bottom: 30px;
  }

  .modal-body .m-h-md {
    margin-right: 20px;
    margin-left: 20px;
  }

  .modal-body .m-v-lg {
    margin-top: 30px;
    margin-bottom: 30px;
  }

  .modal-body .pull-left {
    float: left !important;
  }

  .modal-body .p-v-sm {
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .modal-body .p-h-md {
    padding-right: 20px;
    padding-left: 20px;
  }

  .modal-body .no-border {
    border-color: transparent;
    border-width: 0;
  }

  .modal-body .col-xs-3 {
    width: 25%;
  }

  .col-xs-1, .col-sm-1, .col-md-1, .col-lg-1, .col-xs-2, .col-sm-2, .col-md-2, .col-lg-2, .col-xs-3, .col-sm-3, .col-md-3, .col-lg-3, .col-xs-4, .col-sm-4, .col-md-4, .col-lg-4, .col-xs-5, .col-sm-5, .col-md-5, .col-lg-5, .col-xs-6, .col-sm-6, .col-md-6, .col-lg-6, .col-xs-7, .col-sm-7, .col-md-7, .col-lg-7, .col-xs-8, .col-sm-8, .col-md-8, .col-lg-8, .col-xs-9, .col-sm-9, .col-md-9, .col-lg-9, .col-xs-10, .col-sm-10, .col-md-10, .col-lg-10, .col-xs-11, .col-sm-11, .col-md-11, .col-lg-11, .col-xs-12, .col-sm-12, .col-md-12, .col-lg-12 {
    float: left;
    position: relative;
    min-height: 1px;
  }

  .modal-body p {
    margin: 0 0 10px;
  }

  .modal-body .p-h-xs {
    padding-right: 5px;
    padding-left: 5px;
  }

  .modal-body .text-danger {
    color: #e11144;
  }

  /*头部 单 多 填 解答 统计结束*/

  /*题目主题开始*/
  .modal-body .p-md {
    padding: 20px;
    text-align: left;
  }

  .modal-body .m-h-lg {
    margin-right: 30px;
    margin-left: 30px;
  }

  .modal-body .text-grey {
    color: #999;
  }

  .modal-body .m-v {
    margin-top: 15px;
    margin-bottom: 15px;
  }

  .modal-body .m-lg {
    margin: 30px;
  }

  .modal-body p.m-h-lg {
    margin-right: 30px;
    margin-left: 30px;
  }

  /*题目主题结束*/

  /*自适应样式开始*/
  .modal-body .m-v-xs {
    margin-top: 5px;
    margin-bottom: 5px;
  }

  .modal-body ul {
    display: block;
    list-style-type: disc;
    -webkit-margin-before: 1em;
    -webkit-margin-after: 1em;
    -webkit-margin-start: 0px;
    -webkit-margin-end: 0px;
    -webkit-padding-start: 40px;
  }

  /*自适应样式结束*/

</style>
