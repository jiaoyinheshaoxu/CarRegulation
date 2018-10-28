<template>
  <div>
    <div class="paper_header_box">
      <div class="paper_header">
        <!--有谱logo-->
        <div class="logo" v-show="system == 'YOUPU'">
          <img src="../../assets/images/yplogo.png" alt="">
          <h2>组卷中心</h2>
        </div>
        <!--睿芽logo-->
        <img style="margin-top: 4px" src="../../assets/images/rya_logo.png" alt="" v-show="system == 'RYA'">
        <div class="cart" @mouseenter="show_basket = true" @mouseleave="show_basket = false">
          <a @click="go_set_paper()">
            <el-badge :value="basket_length" :max="99" class="item">
              <span class="iconfont icon-gouwuche"></span>
            </el-badge>
          </a>
          <div class="item_basket" v-show="show_basket">
            <span>{{get_basket_info}}</span>
            <span>{{get_item_basket_ids}}</span>
            <p>
              <span>共{{basket_length}}道题,</span>
              <span>平均难度:</span>
              <span v-if="average_diff == 0">未知</span>
              <span v-else-if="average_diff < 0.2">容易</span>
              <span v-else-if="average_diff < 0.4">较易</span>
              <span v-else-if="average_diff < 0.6">一般</span>
              <span v-else-if="average_diff < 0.8">较难</span>
              <span v-else>困难</span>
            </p>
            <div class="progress_content">
              <div v-show="item_basket.single.length > 0" class="progress_box">
                <span>单选题：</span>
                <div class="progress">
                  <el-progress :text-inside="true" :stroke-width="18" :percentage="single_percent"></el-progress>
                </div>
                <span>{{item_basket.single.length}}题</span>
                <a @click.stop="clear_basket_item('single')">删除</a>
              </div>
              <div v-show="item_basket.multiple.length > 0" class="progress_box">
                <span>多选题：</span>
                <div class="progress">
                  <el-progress :text-inside="true" :stroke-width="18" :percentage="multiple_percent">
                  </el-progress>
                </div>
                <span>{{item_basket.multiple.length}}题</span>
                <a @click.stop="clear_basket_item('multiple')">删除</a>
              </div>
              <div v-show="item_basket.blank.length > 0" class="progress_box">
                <span>填空题：</span>
                <div class="progress">
                  <el-progress :text-inside="true" :stroke-width="18" :percentage="blank_percent"></el-progress>
                </div>
                <span>{{item_basket.blank.length}}题</span>
                <a @click.stop="clear_basket_item('blank')">删除</a>
              </div>
              <div v-show="item_basket.resolve.length > 0" class="progress_box">
                <span>解答题：</span>
                <div class="progress">
                  <el-progress :text-inside="true" :stroke-width="18" :percentage="resolve_percent"></el-progress>
                </div>
                <span>{{item_basket.resolve.length}}题</span>
                <a @click.stop="clear_basket_item('resolve')">删除</a>
              </div>
            </div>
            <p>
              <a v-show="basket_length > 0" @click.stop="clear_basket_item('all')">清空全部</a>
              <a @click.stop="go_set_paper()">进入组卷中心</a>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="paper_nav">
      <div>
        <ul class="ul-1">
          <li @mouseenter="enterPaper()" @mouseleave="leavePaper()">
            <a>
              <span>{{cur_subject}}</span>
              <span class="iconfont icon-xiaosanjiao" v-if="!show_ul"></span>
              <span class="iconfont icon-shangjiantou" v-else></span>
            </a>
            <ul class="ul-2" :class="{'block': show_ul}">
              <!--教材版本Id   学科Id-->
              <li>
                <a @click="getTree(2, 1, 1, '初中数学')">初中数学</a>
              </li>
              <li>
                <a @click="getTree(15, 2, 1, '初中物理')">初中物理</a>
              </li>
              <li>
                <a @click="getTree(113, 10, 1, '初中化学')">初中化学</a>
              </li>
              <li>
                <a @click="getTree(123, 11, 1, '初中英语')">初中英语</a>
              </li>
              <li>
                <a @click="getTree(85, 8, 1, '高中文科数学')">高中文科数学</a>
              </li>
              <li>
                <a @click="getTree(91, 9, 1, '高中理科数学')">高中理科数学</a>
              </li>
              <li>
                <a @click="getTree(57, 6, 1, '高中物理')">高中物理</a>
              </li>
              <li>
                <a @click="getTree(64, 7, 1, '高中化学')">高中化学</a>
              </li>
            </ul>
          </li>
          <li style="cursor: default"><a>知识点选题</a></li>
        </ul>
      </div>
    </div>
    <div class="paper_content">
      <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-style">
        <el-breadcrumb-item>当前位置</el-breadcrumb-item>
        <el-breadcrumb-item>组卷中心</el-breadcrumb-item>
        <el-breadcrumb-item>在线组卷</el-breadcrumb-item>
        <el-breadcrumb-item>知识点选题</el-breadcrumb-item>
      </el-breadcrumb>
      <div>
        <el-row :gutter="40">
          <el-col :span="8">
            <div class="tree_box">
              <el-tree :data="treeList" :props="defaultProps" @node-click="handleNodeClick"
                       :expand-on-click-node="false"></el-tree>
            </div>
            <div style="display: none">
              <span class="iconfont icon-msnui-poweroff"></span>
              <span class="iconfont icon-icon"></span>
              <span class="iconfont icon-chahao"></span>
              <span class="iconfont icon-iconfontgantanhao2"></span>
              <span class="iconfont icon-iconfontgantanhao3"></span>
              <span class="iconfont icon-xiangqing"></span>
              <span class="iconfont icon-exchangejiaohuan"></span>
              <span class="iconfont icon-exchange3jiaohuan"></span>
              <span class="iconfont icon-exchange2jiaohuan"></span>
              <span class="iconfont icon-baocun"></span>
              <span class="iconfont icon-shangyi"></span>
              <span class="iconfont icon-xiayi"></span>
              <span class="iconfont icon-shizhongclock77"></span>
              <span class="iconfont icon-xiaosanjiao"></span>
              <span class="iconfont icon-jiantou8"></span>
              <span class="iconfont icon-xiangqing1"></span>
              <span class="iconfont icon-shangyi"></span>
              <span class="iconfont icon-xiayi1"></span>
              <span class="iconfont icon-011caozuo_zhongzhi"></span>
              <span class="iconfont icon-gouwuche-01"></span>
              <span class="iconfont icon-shijuan"></span>
              <span class="iconfont icon-gouwuche"></span>
              <span class="iconfont icon-shangjiantou"></span>
              <span class="iconfont icon-baocun1"></span>
              <span class="iconfont icon-gantanhao"></span>
              <span class="iconfont icon-datiqia"></span>
              <span class="iconfont icon-gouwuche1"></span>
              <span class="iconfont icon-gouwuche2"></span>
              <span class="iconfont icon-sousuo"></span>
              <span class="iconfont icon-ico_arrows_unfold"></span>
              <span class="iconfont icon-ico_back"></span>
              <span class="iconfont icon-ico_open"></span>
              <span class="iconfont icon-lvzhou_zhongzhi"></span>
              <span class="iconfont icon-shizhong"></span>
              <span class="iconfont icon-datiqia1"></span>
              <span class="iconfont icon-icon-test"></span>
              <span class="iconfont icon-xiangqing2"></span>
              <span class="iconfont icon-shanchu"></span>
              <span class="iconfont icon-shangjiantou1"></span>
              <span class="iconfont icon-details"></span>
              <span class="iconfont icon-gouwuche3"></span>
              <span class="iconfont icon-suoding"></span>
              <span class="iconfont icon-tuanduicankaoxian-"></span>
              <span class="iconfont icon-xiayi1"></span>
              <span class="iconfont icon-shangyi1"></span>
            </div>
          </el-col>
          <el-col :span="16">
            <div class="condition_box">
              <p>
                <span>类型：</span>
                <a v-for="item in otherList" @click="other_click(item)"
                   :class="{'bg_color_condition': select_other_id == item.id}">{{item.value}}</a>
              </p>
              <p>
                <span>题型：</span>
                <a v-for="item in typeList" @click="type_click(item)"
                   :class="{'bg_color_condition': select_type_id == item.id}">{{item.value}}</a>
              </p>
              <p>
                <span>难度：</span>
                <a v-for="item in diffList" @click="diff_click(item)"
                   :class="{'bg_color_condition' : select_diff_id == item.id}">{{item.value}}</a>
              </p>
              <p>
                <span>年份：</span>
                <a v-for="item in yearList" @click="year_click(item)"
                   :class="{'bg_color_condition' : select_year_id == item.id}">{{item.year}}</a>
              </p>
            </div>
            <div class="item_box" v-for="row,index in items">
              <div class="item_body" @click="toggleAnswer(row, index)">
                <p>【题文】<span v-html="row.title"></span></p>
                <p v-show="row.isCombination==1" v-for="subRow in row.subQuestionList"><span
                  v-html="subRow.title"></span>
                </p>
                <div v-for="anwser in row.answers" class="margin_tb_20 answer"><span v-html="anwser.holeAnwser"></span>
                </div>
                <div v-show="row.showAnswerStatus">
                  <hr>
                  <div class="margin_20">
                    <span class="text-primary">【答案】</span>
                    <span v-cloak v-if="(row.qtype==3||row.qtype==4)&&row.answers&&row.answers.length>0"
                          v-html="row.answers[0].answertext"></span>
                    <span v-else-if="row.qtype==3||row.qtype==4">答案请参考解析。</span>
                    <span v-else v-text="row.rightanswer"></span>
                  </div>
                  <div class="margin_20">
                    <span class="text-primary">【解析】</span>
                    <span v-html="row.content"></span>
                  </div>
                </div>
              </div>
              <div class="item-footer">
                <span class="margin_lr_10">
                  <span>试题ID:</span>
                  <span v-text="row.id"></span>
                </span>
                <span class="margin_lr_10">
                  <span>难度:</span>
                  <span v-if="row.difficulty<0.2">容易</span>
                  <span v-else-if="row.difficulty<0.4">较易</span>
                  <span v-else-if="row.difficulty<0.6">一般</span>
                  <span v-else-if="row.difficulty<0.8">较难</span>
                  <span v-else>困难</span>
                </span>
                <span class="margin_lr_10">
                  <span>题型:</span>
                  <span v-if="row.qtype==1">单选题</span>
                  <span v-else-if="row.qtype==2">多选题</span>
                  <span v-else-if="row.qtype==3">填空题</span>
                  <span v-else-if="row.qtype==4">解答题</span>
                </span>
                <span class="margin_lr_10">
                  <span>更新:</span>
                  <span v-text="row.updateTime"></span>
                </span>
                <el-button type="primary" @click="add_item_basket(row)" v-if="!item_basket_ids.includes(row.id)"
                           class="f_right">加入试卷
                </el-button>
                <el-button type="warning" @click="remove_item_basket(row)" v-else class="f_right">移除试卷</el-button>
                <a @click="go_detail(row)">
                  <span class="iconfont icon-xiangqing1"></span>
                  <span>详情</span>
                </a>
                <a @click="check_error(row)">
                  <span class="iconfont icon-iconfontgantanhao2"></span>
                  <span>纠错</span>
                </a>
              </div>
            </div>
            <paging class="mTop" :dataCount="total" v-on:changed="pageChanged" v-show="items.length > 0"></paging>
          </el-col>
        </el-row>
      </div>
    </div>
    <!--试题纠错-->
    <el-dialog
      title="试题纠错"
      :visible.sync="item_error_dialog"
      width="600px"
      center>
      <div class="error_box">
        <div>
          <p>题目编号：{{cur_item.id}}</p>
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
    <!--删除确认-->
    <el-dialog
      title="温馨提示"
      :visible.sync="clear_item_dialog"
      width="400px"
      center>
      <span v-if="will_clear != 'all'">确认要删除所有的{{type_name}}吗？</span>
      <span v-else>确认要删除所有的试题吗？</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="clear_item_dialog = false">取 消</el-button>
    <el-button type="primary" @click="confirm_clear()">确 定</el-button>
  </span>
    </el-dialog>
    <Footer></Footer>
  </div>
</template>

<script>
  import Footer from '../Footer/Footer.vue'
  import Vue from 'vue'
  function formatPToSpan(txt) {
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
  }
  function formatPToSpan2(txt) {
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
  export default {
    data() {
      return {
        show_basket: false,
        show_ul: false,
        cur_subject: this.$route.params.mark == 1 ? sessionStorage.getItem('cur_subjectName') : '初中数学',
        total: 0, //总的数据条数
        type: 0, //知识点树的层级
        tongbu: 1, //试题类型中的同步试题
        zhenti: 1, //试题类型中的双三试题
        currentPage: 1,
        pageSize: 10,
        materialId: this.$route.params.mark == 1 ? sessionStorage.getItem('cur_materialId') : 2,
        subjectId: this.$route.params.mark == 1 ? sessionStorage.getItem('cur_subjectId') : 1,
        pointId: 5564,
        treeList: [],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        otherList: [{value: '全部', id: 0}, {value: '同步试题', id: 1}, {value: '双三试题', id: 2}],
        select_other_id: 0,
        typeList: [{value: '全部', id: 0}, {value: '单项选择题', id: 1}, {value: '多项选择题', id: 2}, {
          value: '填空题',
          id: 3
        }, {value: '解答题', id: 4}],
        select_type_id: 0,
        diffList: [{value: '全部', id: 0}, {value: '容易', id: 1}, {value: '较易', id: 2}, {value: '一般', id: 3}, {
          value: '较难',
          id: 4
        }, {value: '困难', id: 5}],
        select_diff_id: 0,
        yearList: [],
        select_year_id: 0,
        items: [],
        item_basket: this.$route.params.mark == 1 ? JSON.parse(sessionStorage.getItem('item_basket')) : {
          single: [],
          multiple: [],
          blank: [],
          resolve: []
        },
        item_basket_ids: [],
        basket_length: 0,
        single_percent: 0,
        multiple_percent: 0,
        blank_percent: 0,
        resolve_percent: 0,
        average_diff: 0,
        item_error_dialog: false,
        error_type_list: [{name: '题目题文', id: 2}, {name: '题目答案', id: 5}, {name: '题目解析', id: 6}, {name: '其他', id: 7}],
        select_error_arr: [],
        cur_item: '',
        textarea_content: '',
        /*删除提示所用*/
        clear_item_dialog: false,
        type_name: '',
        will_clear: '',
        select_tree: {},
        /*ui界面*/
        system: this.global.system
      }
    },
    components: {
      Footer
    },
    mounted() {
      $('.paper_content').css({
        minHeight: $(window).height() - 166 + 'px'
      })
      let curr_year = new Date().getFullYear()
      this.yearList = [
        {year: '全部', id: 0},
        {year: curr_year, id: curr_year},
        {year: curr_year - 1, id: curr_year - 1},
        {year: curr_year - 2, id: curr_year - 2},
        {year: '其它', id: -1}
      ]
      this.getTree(this.materialId, this.subjectId, 1, this.cur_subject)
    },
    computed: {
      get_basket_info() {
        this.basket_length = this.item_basket.single.length + this.item_basket.multiple.length + this.item_basket.blank.length + this.item_basket.resolve.length
        if (this.basket_length > 0) {
          let diff_total = 0
          this.single_percent = Number((this.item_basket.single.length / this.basket_length * 100).toFixed(2))
          this.multiple_percent = Number((this.item_basket.multiple.length / this.basket_length * 100).toFixed(2))
          this.blank_percent = Number((this.item_basket.blank.length / this.basket_length * 100).toFixed(2))
          this.resolve_percent = Number((this.item_basket.resolve.length / this.basket_length * 100).toFixed(2))
          for(let i = 0, len = this.item_basket.single.length; i < len;i ++) {
            diff_total += Number(this.item_basket.single[i].difficulty)
          }
          for(let i = 0, len = this.item_basket.multiple.length; i < len;i ++) {
            diff_total += Number(this.item_basket.multiple[i].difficulty)
          }
          for(let i = 0, len = this.item_basket.blank.length; i < len;i ++) {
            diff_total += Number(this.item_basket.blank[i].difficulty)
          }
          for(let i = 0, len = this.item_basket.resolve.length; i < len;i ++) {
            diff_total += Number(this.item_basket.resolve[i].difficulty)
          }
          this.average_diff = (diff_total / this.basket_length).toFixed(2)
        } else {
          this.average_diff = 0
        }
        sessionStorage.setItem('item_basket', JSON.stringify(this.item_basket))
      },
      get_item_basket_ids() {
        this.item_basket_ids = []
        for (let i = 0, len = this.item_basket.single.length; i < len; i++) {
          this.item_basket_ids.push(this.item_basket.single[i].id)
        }
        for (let i = 0, len = this.item_basket.multiple.length; i < len; i++) {
          this.item_basket_ids.push(this.item_basket.multiple[i].id)
        }
        for (let i = 0, len = this.item_basket.blank.length; i < len; i++) {
          this.item_basket_ids.push(this.item_basket.blank[i].id)
        }
        for (let i = 0, len = this.item_basket.resolve.length; i < len; i++) {
          this.item_basket_ids.push(this.item_basket.resolve[i].id)
        }
      }
    },
    methods: {
      enterPaper() {
        this.show_ul = true
      },
      leavePaper() {
        this.show_ul = false
      },
      async getTree(materialId, subjectId, mark, subject) {
        if(subject != this.cur_subject){
          this.item_basket = {
            single: [],
            multiple: [],
            blank: [],
            resolve: []
          }
        }
        if(materialId == 26){
          this.materialId = 113
        } else {
          this.materialId = materialId
        }
        this.cur_subject = subject
        this.subjectId = subjectId
        this.pointId = 5564
        this.type = 0
        this.show_ul = false
        let url = '/detector/api/view/v4/getpaperhometree'
        let params = {
          sid: this.global.sid,
          uid: this.global.uid,
          material: materialId,
          pointid: this.pointId,
          treeType: 0
        }
        let data = await this.api.get(url, params, {loading: true})
        this.treeList = data.tree
        this.select_data = this.treeList[0]
        this.pointId = this.select_data.id
        this.get_item_list()
      },
      handleNodeClick(data, node, component) {
        this.select_data = data
        var el = component.$el.getElementsByClassName('el-tree-node__content')[0]
        $('.el-tree-node__content').css({
          background: ''
        })
        $(el).css({
          background: '#0cc3b3'
        })
        this.pointId = data.id
        this.type = data.type
        this.get_item_list()
      },
      other_click(item) {
        this.select_other_id = item.id
        if (this.select_other_id == 0) {
          this.tongbu = 1
          this.zhenti = 1
        } else if (this.select_other_id == 1) {
          this.tongbu = 1
          this.zhenti = ''
        } else if (this.select_other_id == 2) {
          this.tongbu = ''
          this.zhenti = 1
        }
        this.get_item_list()
      },
      type_click(item) {
        this.select_type_id = item.id
        this.get_item_list()
      },
      diff_click(item) {
        this.select_diff_id = item.id
        this.get_item_list()
      },
      year_click(item) {
        this.select_year_id = item.id
        this.get_item_list()
      },
      async get_item_list() {
        let url = '/das/printPaper/getPointQuestions'
        let params = {
          sid: this.global.sid,
          uid: this.global.uid,
          pageno: this.currentPage,
          type: this.type,
          pagesize: this.pageSize,
          pointId: this.pointId,
          qtype: this.select_type_id,
          tongbu: this.tongbu,
          zhenti: this.zhenti,
          difficulty: this.select_diff_id,
          year: this.select_year_id,
          subjectId: this.subjectId,
          materialId: this.materialId
        }
        let data = await this.api.get(url, params, {loading: true})
        this.items = data.resultlist
        this.total = data.num
        if (this.items && this.items.length > 0) {
          for (var i = 0; i < this.items.length; i++) {
            this.items[i].title = formatPToSpan2(formatPToSpan(this.items[i].text));
            this.items[i].content = formatPToSpan2(formatPToSpan(this.items[i].content));
            this.items[i].selectStatus = false;
            this.items[i].showAnswerStatus = false;
            if (this.items[i].isCombination == 1) {
              if (this.items[i].subQuestionList && this.items[i].subQuestionList.length > 0) {
                for (var j = 0; j < this.items[i].subQuestionList.length; j++) {
                  this.items[i].subQuestionList[j].title = formatPToSpan2(formatPToSpan(this.items[i].subQuestionList[j].text));
                }
              }
            }
            if (this.items[i].answers && this.items[i].answers.length > 0) {
              for (var j = 0; j < this.items[i].answers.length; j++) {
                if (this.items[i].qtype == 1 || this.items[i].qtype == 2) {
                  if (j == 0) {
                    this.items[i].answers[j].choice = 'A';
                    if (this.items[i].answers[j].rightanswer == 1) {
                      this.items[i].rightanswer = 'A；';
                    }
                  } else if (j == 1) {
                    this.items[i].answers[j].choice = 'B';
                    if (this.items[i].answers[j].rightanswer == 1) {
                      this.items[i].rightanswer = 'B；';
                    }
                  } else if (j == 2) {
                    this.items[i].answers[j].choice = 'C';
                    if (this.items[i].answers[j].rightanswer == 1) {
                      this.items[i].rightanswer = 'C；';
                    }
                  } else if (j == 3) {
                    this.items[i].answers[j].choice = 'D';
                    if (this.items[i].answers[j].rightanswer == 1) {
                      this.items[i].rightanswer = 'D；';
                    }
                  } else if (j == 4) {
                    this.items[i].answers[j].choice = 'E';
                    if (this.items[i].answers[j].rightanswer == 1) {
                      this.items[i].rightanswer = 'E；';
                    }
                  } else if (j == 5) {
                    this.items[i].answers[j].choice = 'F';
                    if (this.items[i].answers[j].rightanswer == 1) {
                      this.items[i].rightanswer = 'F；';
                    }
                  } else if (j == 6) {
                    this.items[i].answers[j].choice = 'G';
                    if (this.items[i].answers[j].rightanswer == 1) {
                      this.items[i].rightanswer = 'G；';
                    }
                  }
                  this.items[i].answers[j].holeAnwser = this.items[i].answers[j].choice + "." + formatPToSpan(this.items[i].answers[j].answertext);
                  this.items[i].answers[j].holeAnwser = formatPToSpan(this.items[i].answers[j].holeAnwser);
                }
              }
            }
          }
        }
      },
      toggleAnswer: function (item, itemIndex) {
        item.showAnswerStatus = !item.showAnswerStatus;
        Vue.set(this.items, itemIndex, item);
      },
      add_item_basket(item) {
        let arr = []
        if(this.select_data.type == 1){
          for (let i = 0, len = this.select_data.children.length; i < len; i ++) {
            arr.push(this.select_data.children[i].flagindex)
          }
          item.select_data = arr
        }
        if(this.select_data.type == 2){
          arr.push(this.select_data.flagindex)
          item.select_data = arr
        }
        if(this.select_data.type == 3){
          let temp = []
          temp = this.select_data.flagindex.split('_')
          arr.push(`${temp[0]}_${temp[1]}`)
          item.select_data = arr
        }
        if (item.qtype == 1) {
          this.item_basket.single.push(item)
        } else if (item.qtype == 2) {
          this.item_basket.multiple.push(item)
        } else if (item.qtype == 3) {
          this.item_basket.blank.push(item)
        } else if (item.qtype == 4) {
          this.item_basket.resolve.push(item)
        }
      },
      remove_item_basket(item) {
        if (item.qtype == 1) {
          for (let i = 0, len = this.item_basket.single.length; i < len; i++) {
            if (this.item_basket.single[i].id == item.id) {
              this.item_basket.single.splice(i, 1)
            }
          }
        } else if (item.qtype == 2) {
          for (let i = 0, len = this.item_basket.multiple.length; i < len; i++) {
            if (this.item_basket.multiple[i].id == item.id) {
              this.item_basket.multiple.splice(i, 1)
            }
          }
        } else if (item.qtype == 3) {
          for (let i = 0, len = this.item_basket.blank.length; i < len; i++) {
            if (this.item_basket.blank[i].id == item.id) {
              this.item_basket.blank.splice(i, 1)
            }
          }
        } else if (item.qtype == 4) {
          for (let i = 0, len = this.item_basket.resolve.length; i < len; i++) {
            if (this.item_basket.resolve[i].id == item.id) {
              this.item_basket.resolve.splice(i, 1)
            }
          }
        }
      },
      pageChanged (currentPage, pageSize) {
        this.currentPage = currentPage
        this.pageSize = pageSize
        this.get_item_list()
      },
      clear_basket_item(type) {
        this.clear_item_dialog = true
        this.will_clear = type
        if(type == 'single') {
          this.type_name = '单选题'
        } else if (type == 'multiple') {
          this.type_name = '多选题'
        } else if (type == 'blank') {
          this.type_name = '填空题'
        } else if (type == 'resolve') {
          this.type_name = '解答题'
        }
      },
      confirm_clear() {
        this.clear_item_dialog = false
        if(this.will_clear == 'all') {
          this.item_basket = {
            single: [],
            multiple: [],
            blank: [],
            resolve: []
          }
        } else {
          this.item_basket[this.will_clear] = []
        }
      },
      //提交纠错
      async submit_error_info() {
        let url = '/das/printPaper/reportErrorquestion'
        let params = {
          sid: this.global.sid,
          uid: this.global.uid,
          errorType: this.select_error_arr.join(','),
          qtype: this.cur_item.qtype,
          questionId: this.cur_item.id,
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
      check_error(item) {
        this.textarea_content = ''
        this.select_error_arr = []
        this.cur_item = item
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
      },
      go_detail(item) {
        sessionStorage.setItem('cur_item',JSON.stringify(item))
        sessionStorage.setItem('cur_subjectId', this.subjectId)
        sessionStorage.setItem('cur_materialId', this.materialId)
        window.open(`${this.global.LOCAL_URL}/#/OnlinePaper/seeItemAnalysis`)
      },
      go_set_paper() {
        sessionStorage.setItem('cur_subjectId', this.subjectId)
        sessionStorage.setItem('cur_materialId', this.materialId)
        sessionStorage.setItem('cur_subjectName', this.cur_subject)
        this.$router.push({
          name: 'SetPaper'
        })
      }
    }
  }
</script>

<style lang=''>
  .block {
    display: block !important;
  }

  .icon-xiaosanjiao, .icon-shangjiantou {
    font-size: 12px;
  }

  .tree_box {
    margin-top: 20px;
    width: 100%;
    padding: 10px;
    border: 1px dotted #cdcdcd;
  }

  .condition_box {
    margin-top: 20px;
    width: 100%;
    border: 1px dotted #cdcdcd;
  }

  .condition_box p {
    height: 40px;
    line-height: 40px;
    border-bottom: 1px dotted #cdcdcd;
    padding: 0 20px;
  }

  .condition_box p span {
    font-weight: 900;
  }

  .condition_box p a {
    cursor: pointer;
    padding: 3px 15px 5px;
  }

  .item_box {
    margin-top: 20px;
    width: 100%;
    border: 1px dotted #cdcdcd;
  }

  .item_body {
    padding: 20px;
  }

  .item-footer {
    height: 40px;
    background-color: #F2F2F2;
    line-height: 40px;
  }

  .margin_lr_10 {
    margin-right: 10px;
    margin-left: 10px;
  }

  .bg_color_condition {
    background-color: #0cc3b3;
    color: #ffffff;
    border-radius: 3px;
  }

  .el-tree-node__content:hover {
    /*background-color: #0cc3b3;*/
    background-color: #cdcdcd;
  }

  .text-primary {
    color: #155abb
  }

  .margin_20 {
    margin: 20px;
  }

  .margin_tb_20 {
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .answer {
    display: inline-block;
    margin-right: 20px;
  }

  .item-footer .el-button {
    padding: 8px 12px;
  }

  .item-footer > a {
    float: right;
    margin: 0 10px;
    cursor: pointer;
  }

  .f_right {
    float: right;
    margin: 5px 10px 0;
  }
  .error_box p{
     height: 30px;
    line-height: 30px;
  }
  .m_l_20{
    margin-left: 20px;
  }
</style>
