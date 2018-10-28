<template lang='html'>
  <div class="padding_20">
    <div class="title_box">
      <p>
        {{paperInfo.paperName}}
      </p>
      <div>
        <span>试卷ID：{{ paperInfo.paperId}}</span>
        <span>试卷总分值：{{paperInfo.paperScore}}分</span>
        <span>试卷类型：{{paperInfo.paperType}}</span>
        <span>建议答题时长：{{paperInfo.answerTime}}</span>
        <span>试卷适用教材版本：{{paperInfo.material}}</span>
        <span>试卷适用学段年级：{{paperInfo.gradeAndSemester}}</span>
      </div>
      <div class="item_intro">
        {{paperInfo.coverage}}
      </div>
    </div>
    <div>
      <div class="paperModel" v-show="coverageData && coverageData.coverageData.length > 0">
        <b>试卷命题知识点覆盖度分析</b>
        <p>本次测试试卷涉及{{coverageData.coverageData.length}}个知识点，分值分布如下：</p>
        <div class="mapBox">
          <Charts :options="options_coverageData" :styles="styles" ref="simpleChart"></Charts>
        </div>
      </div>
      <div class="paperModel">
        <b>试卷命题对教学重点难点的体现程度：{{importData.status}}</b>
        <p>教学重难点：</p>
        <div class="mapBox">
          <el-table
            :data="importTableList"
            border
            style="width: 1200px;margin: auto">
            <el-table-column
              prop="pointName"
              label="教学重点">
            </el-table-column>
            <el-table-column
              prop="pointNum"
              label="试题数">
            </el-table-column>
            <el-table-column
              prop="pointScore"
              label="卷面分值">
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="paperModel">
        <b>卷面试题所涉及的学科思想方法与学科能力：{{abilityData.num}} 项</b>
        <div class="mapBox">
          <el-table
            :data="abilityData.abilityList"
            border
            style="width: 1200px;margin: auto">
            <el-table-column
              prop="abilityName"
              label="思想方法、学科能力项">
            </el-table-column>
            <el-table-column
              prop="questionNum"
              label="涉及试题数">
            </el-table-column>
            <el-table-column
              prop="abilityScore"
              label="卷面分值">
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="paperModel">
        <b>试卷题型分布</b>
        <div class="mapBox">
          <el-table
            :data="questionTypeData"
            border
            style="width: 1200px;margin: auto">
            <el-table-column
              prop="type"
              label="题型">
            </el-table-column>
            <el-table-column
              prop="num"
              label="试题数">
            </el-table-column>
            <el-table-column
              prop="score"
              label="卷面分值">
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="paperModel">
        <b>本试卷历史测试情况</b>
        <p>已发布次数：{{historyData.testNum}}</p>
        <p>已参加测评人数：{{historyData.testStudentNum}}人</p>
        <div class="mapBox">
          <Charts :options="options_historyData" :styles="styles" ref="simpleChart"></Charts>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Charts from '../../../components/Charts/Charts.vue'
  export default {
    data() {
      return {
        paperType: '',
        paperId: '',
        paperInfo: {},
        coverageData: {},
        options_coverageData: {},
        styles: {
          width: 1200,
          height: 450
        },
        importData: {},
        importTableList: [],
        abilityData: {},
        questionTypeData: [],
        options_historyData: {},
        historyData: {}
      }
    },
    components: {
      Charts
    },
    mounted() {
      // 获取跳转时 传入数据
      this.paperType = this.$route.params.paperType;
      this.paperId = this.$route.params.paperId;
      this.getPaperInfoProperty()
    },
    methods: {
      async getPaperInfoProperty() {
        let url = '/das/paper/manage/getPaperInfoProperty'
        let params = {
          sid: this.global.sid,
          uid: this.global.uid,
          paperInfoId: this.paperId
        }
        let data = await this.api.get(url, params, {loading: true})
        this.paperInfo = data.data.propertyData
        if(data.data.coverageData){
          this.coverageData = data.data.coverageData
        }else{
          this.coverageData = {coverageData: []}
        }
        this.importData = data.data.importData
        this.importTableList = data.data.importData.importTableList
        this.abilityData = data.data.abilityData
        this.questionTypeData = data.data.questionTypeData
        this.historyData = data.data.historyData
        this.map1()
        this.map2()
      },
      map1() {
        //let colors = ['#2090fa', '#f07b18', '#38db34'];
        //x 坐标名称
        if(this.coverageData && this.coverageData.coverageData && this.coverageData.coverageData.length > 0) {
          let ary0 = this.coverageData.coverageData;
          let aryX = [], aryY1 = [], aryY2 = [];
          for (let i = 0; i < ary0.length; i++) {
            aryX.push(ary0[i].name);
            aryY1.push(ary0[i].num);
            aryY2.push(ary0[i].score);
          }
          this.options_coverageData = {
            chart: {
              zoomType: 'xy'
            },
            title: {
              text: '  ',
            },
            subtitle: {
              text: ' '
            },
            xAxis: [{
              categories: aryX,
              crosshair: true,
              title: {
                text: ' ',
                style: {
                  color: ' '
                }
              }
            }],
            yAxis: [{ //
              labels: {
                format: '{value}道',
                style: {}
              },
              title: {
                text: '题数',
                style: {}
              },
              min: 0, // 定义最小值
              allowDecimals: false
            }, { // Secondary yAxis
              title: {
                text: '分值',
                style: {}
              },
              labels: {
                format: '{value} 分',
                style: {}
              },
              min: 0, // 定义最小值
              opposite: true,
              allowDecimals: false
            }],
            tooltip: {
              shared: true
            },
            series: [{
              name: '试题分数',
              type: 'column',
              yAxis: 1,
              data: aryY2,
              tooltip: {
                valueSuffix: ' 分'
              }
            }, {
              name: '试题数',
              type: 'line',
              data: aryY1,
              tooltip: {
                valueSuffix: ' 道'
              }
            }],
            credits: {
              enabled: false
            },
            exporting: {
              enabled: true
            }
          }
        }
      },
      map2() {
        let ary0 = this.historyData.scoreList;
        let aryX = [], aryY1 = []
        for (let i = 0; i < ary0.length; i++) {
          aryX.push(ary0[i].range);
          aryY1.push(ary0[i].num);
        }
        this.options_historyData = {
          chart: {
            type: 'area'
          },
          title: {
            text: ' '
          },
          subtitle: {
            text: ' '
          },
          xAxis: {
            categories: aryX,
            tickmarkPlacement: 'on',
            title: {
              text: '得分区间',
              style: {
                color: ' '
              }
            }
          },
          yAxis: {
            title: {
              text: '人数'
            },
            labels: {
              format: '{value}'
            }

          },
          tooltip: {
            split: true,
            valueSuffix: ' 人'
          },
          plotOptions: {
            area: {
              stacking: 'normal',
              lineColor: '#666666',
              lineWidth: 1,
              marker: {
                lineWidth: 1,
                lineColor: '#666666'
              },
              dataLabels: {
                enabled: true // 开启数据标签
              },
            }
          },
          series: [{
            name: '测试人数',
            data: aryY1,
            color: '#3893e8'
          }],
          credits: {
            enabled: false
          },
          exporting: {
            enabled: true
          }
        }
      }
    },
  }
</script>

<style lang=''>
  .paperModel {
    margin: 20px auto;
    max-width: 1400px;
    margin-bottom: 20px;
    background-color: white;
    box-shadow: 0px 0px 2px 1px rgba(0, 0, 0, 0.05);
    -webkit-box-shadow: 0px 0px 2px 1px rgba(0, 0, 0, 0.05);
    padding: 10px;
  }

  .paperModel b {
    height: 40px;
    line-height: 40px;
    font-size: 20px;
    margin-left: 60px;
  }

  .paperModel .mapBox {
    max-width: 1200px;
    margin: 20px auto;
  }

  .paperModel p {
    min-height: 30px;
    line-height: 30px;
    margin-left: 60px;
  }
</style>
