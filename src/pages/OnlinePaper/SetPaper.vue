<template lang='html'>
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
              <a @click.stop="continue_paper()">继续选题</a>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="paper_content">
      <el-breadcrumb separator-class="el-icon-arrow-right" class="breadcrumb-style">
        <el-breadcrumb-item>当前位置</el-breadcrumb-item>
        <el-breadcrumb-item>组卷中心</el-breadcrumb-item>
        <el-breadcrumb-item>在线组卷</el-breadcrumb-item>
        <el-breadcrumb-item>知识点选题</el-breadcrumb-item>
        <el-breadcrumb-item>编辑试卷</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="mTop">
        <el-row :gutter="40">
          <el-col :span="8">
            <!--试卷结构设置-->
            <div class="info_box">
              <div class="box_header">
                <span>试卷结构设置</span>
                <span class="iconfont icon-ico_open pointer" v-show="show_structureStatuses"
                      @click="show_structureStatuses = !show_structureStatuses"></span>
                <span class="iconfont icon-ico_back pointer" v-show="!show_structureStatuses"
                      @click="show_structureStatuses = !show_structureStatuses"></span>
              </div>
              <div v-show="show_structureStatuses">
                <table class="pad_20_1">
                  <tr>
                    <td>
                      <el-checkbox v-model="structureStatuses.titleCheck">主标题</el-checkbox>
                    </td>
                    <td>
                      <el-checkbox v-model="structureStatuses.subtitleCheck">副标题</el-checkbox>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <el-checkbox v-model="structureStatuses.alurCheck">装订线</el-checkbox>
                    </td>
                    <td>
                      <el-checkbox v-model="structureStatuses.secretCheck">保密标记</el-checkbox>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <el-checkbox v-model="structureStatuses.paperInfoCheck">试卷信息栏</el-checkbox>
                    </td>
                    <td>
                      <el-checkbox v-model="structureStatuses.studentInputCheck">考生输入栏</el-checkbox>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <el-checkbox v-model="structureStatuses.scoreCheck">誊分栏</el-checkbox>
                    </td>
                    <td>
                      <el-checkbox v-model="structureStatuses.noticeCheck">注意事项</el-checkbox>
                    </td>
                  </tr>
                </table>
                <p class="line"></p>
                <table class="pad_20_2">
                  <tr>
                    <td>
                      <el-checkbox v-model="structureStatuses.subsectionCheck">分卷及注释</el-checkbox>
                    </td>
                    <td>
                      <el-checkbox v-model="structureStatuses.topicCheck">大题及注释</el-checkbox>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <el-checkbox v-model="structureStatuses.topicScoreCheck">大题评分区</el-checkbox>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
            <!--试卷参数设置-->
            <div class="info_box mTop">
              <div class="box_header">
                <span>试卷参数设置</span>
                <span class="iconfont icon-ico_open pointer" v-show="show_params"
                      @click="show_params = !show_params"></span>
                <span class="iconfont icon-ico_back pointer" v-show="!show_params"
                      @click="show_params = !show_params"></span>
              </div>
              <div class="pad_20" v-show="show_params">
                <table>
                  <tr>
                    <td>试卷适用教材版本：</td>
                    <td>
                      <el-select v-model="selectMaterialId" placeholder="请选择">
                        <el-option
                          v-for="item in materialList"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id">
                        </el-option>
                      </el-select>
                    </td>
                  </tr>
                  <tr>
                    <td>试卷适用年级：</td>
                    <td>
                      <el-select v-model="selectGradeId" placeholder="请选择">
                        <el-option
                          v-for="item in gradeList"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id">
                        </el-option>
                      </el-select>
                    </td>
                    </td>
                  </tr>
                  <tr>
                    <td>试卷适用学段：</td>
                    <td>
                      <el-select v-model="selectSemesterId" placeholder="请选择">
                        <el-option
                          v-for="item in semesterList"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id">
                        </el-option>
                      </el-select>
                    </td>
                    </td>
                  </tr>
                </table>
              </div>
            </div>
            <!--试题统计-->
            <div class="info_box mTop">
              <div class="box_header">
                <span>试题统计</span>
                <span class="iconfont icon-ico_open pointer" v-show="show_item_detail"
                      @click="show_item_detail = !show_item_detail"></span>
                <span class="iconfont icon-ico_back pointer" v-show="!show_item_detail"
                      @click="show_item_detail = !show_item_detail"></span>
              </div>
              <div v-show="show_item_detail">
                <div class="box_top">
                  <span>分数:</span>
                  <span class="red">{{total_score}}</span>
                  <span>分</span>
                  <span class="m_l_10">题数:</span>
                  <span class="red">{{basket_length}}</span>
                  <span>道</span>
                  <span class="m_l_10">平均难度:</span>
                  <span v-if="average_diff == 0" class="red">未知</span>
                  <span v-else-if="average_diff < 0.2" class="red">容易</span>
                  <span v-else-if="average_diff < 0.4" class="red">较易</span>
                  <span v-else-if="average_diff < 0.6" class="red">一般</span>
                  <span v-else-if="average_diff < 0.8" class="red">较难</span>
                  <span v-else class="red">困难</span>
                </div>
                <!--单选题-->
                <div class="item_type" v-show="item_basket.single.length > 0">
                  <p>
                    <span>单选题</span>
                    <a @click="sort_item('single')">排序</a>
                    <a @click="clear_basket_item('single')">删除</a>
                  </p>
                  <div>
                    <draggable v-model="item_basket.single" :options="{group:'aa'}" @start="drag=true" @end="drag=false" :move="drag_move">
                      <div v-for="item in item_basket.single" :key="item.id" class="circle">{{item.index}}</div>
                    </draggable>
                  </div>
                </div>
                <!--多选题-->
                <div class="item_type" v-show="item_basket.multiple.length > 0">
                  <p>
                    <span>多选题</span>
                    <a @click="sort_item('multiple')">排序</a>
                    <a @click="clear_basket_item('multiple')">删除</a>
                  </p>
                  <div>
                    <draggable v-model="item_basket.multiple" :options="{group:'bb'}" @start="drag=true" @end="drag=false" :move="drag_move">
                      <div v-for="item in item_basket.multiple" :key="item.id" class="circle">{{item.index}}</div>
                    </draggable>
                  </div>
                </div>
                <!--填空题-->
                <div class="item_type" v-show="item_basket.blank.length > 0">
                  <p>
                    <span>填空题</span>
                    <a @click="sort_item('blank')">排序</a>
                    <a @click="clear_basket_item('blank')">删除</a>
                  </p>
                  <div>
                    <draggable v-model="item_basket.blank" :options="{group:'cc'}" @start="drag=true" @end="drag=false" :move="drag_move">
                      <div v-for="item in item_basket.blank" :key="item.id" class="circle">{{item.index}}</div>
                    </draggable>
                  </div>
                </div>
                <!--解答题-->
                <div class="item_type" v-show="item_basket.resolve.length > 0">
                  <p>
                    <span>解答题</span>
                    <a @click="sort_item('resolve')">排序</a>
                    <a @click="clear_basket_item('resolve')">删除</a>
                  </p>
                  <div>
                    <draggable v-model="item_basket.resolve" :options="{group:'dd'}" @start="drag=true" @end="drag=false" :move="drag_move">
                      <div v-for="item in item_basket.resolve" :key="item.id" class="circle">{{item.index}}</div>
                    </draggable>
                  </div>
                </div>
                <div class="btn_area">
                  <el-button type="primary" @click="continue_paper()">继续添加</el-button>
                  <el-button type="warning" class="m_l_20" @click="clear_basket_item('all')" v-show="basket_length > 0">清空全部</el-button>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="16" id="paper">
            <div class="pull-left" v-show="structureStatuses.alurCheck">
              <img src="../../assets/images/peal_line.png" alt="">
            </div>
            <div class="paper pull-left">
              <div class="pui_marktag pull-left" title='点击设置"保密标记"' contenteditable="true"
                   v-show="structureStatuses.secretCheck" id="secrecyMark">绝密★启用前
              </div>
              <div class="pui_title pull-left text-center" title='点击设置"试卷主标题"' contenteditable="true"
                   v-show="structureStatuses.titleCheck" id="name">{{paper_name}}
              </div>
              <div class="pui_subtitle pull-left text-center" title='点击设置"试卷副标题"' contenteditable="true"
                   v-show="structureStatuses.subtitleCheck" id="subTitle">试卷副标题
              </div>
              <div class="pui_paperinfo pull-left text-center" title='点击设置"试卷信息栏"' contenteditable="true"
                   v-show="structureStatuses.paperInfoCheck" id="paperInfoBar">考试范围：xxx；考试时间：100分钟；命题人：xxx
              </div>
              <div class="pui_studentinput pull-left text-center" title='点击设置"考生信息填写栏"' contenteditable="true"
                   v-show="structureStatuses.studentInputCheck" id="entryBarFlag">
                学校:___________姓名：___________班级：___________考号：___________
              </div>
              <div class="pui_score pull-left" v-show="structureStatuses.scoreCheck">
                <table class="pui_scoretable text-center" align="center" border="1">
                  <tbody>
                  <tr>
                    <td>题号</td>
                    <td>一</td>
                    <td>二</td>
                    <td>三</td>
                    <td>总分</td>
                  </tr>
                  <tr>
                    <td>得分</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                    <td>&nbsp;</td>
                  </tr>
                  </tbody>
                </table>
              </div>
              <div class="pui_notice pull-left" title='点击设置"考生注意事项栏"' v-show="structureStatuses.noticeCheck">
                <div class="pui_noticetip">
                  注意事项：
                </div>
                <div class="pui_noticetext" contenteditable="true" id="attentionMsg">1．答题前填写好自己的姓名、班级、考号等信息<br>2．请将答案正确填写在答题卡上
                </div>
              </div>
              <div class="pui_body pull-left">
                <div id="part1">
                  <div class="parthead" title='点击设置"第一卷名称"' contenteditable="true" v-show="structureStatuses.subsectionCheck" id="partOneNote">第I卷（选择题）
                  </div>
                  <div class="partnote" title='点击设置"第I卷文字说明"' contenteditable="true" v-show="structureStatuses.subsectionCheck" id="partOneMsg">请点击修改第I卷的文字说明
                  </div>
                  <!--单选题-->
                  <div v-show="item_basket.single.length>0">
                    <table border='1' class="pull-left grade_paper m-h-xs score_info"
                           v-show="structureStatuses.topicScoreCheck">
                      <tr>
                        <th>评卷人</th>
                        <th>得分</th>
                      </tr>
                      <tr>
                        <td></td>
                        <td></td>
                      </tr>
                    </table>
                    <div class="pull-left" v-show="structureStatuses.topicCheck">
                      <span>一、</span>
                      <span class="questypename" contenteditable="true" id="typeOneNote">单选题</span>
                      <span class="bold">（共{{item_basket.single.length}}个小题）</span>
                    </div>
                    <div style="clear:both;"></div>
                    <div onselectstart="return false" class="quesbox" v-for="(row, rowIndex) in item_basket.single"
                         @mouseenter="itemHover(row, rowIndex, 'single')"
                         @mouseleave="itemLeave(row, rowIndex, 'single')" :class="{'border_1': row.mouseIn}">
                      <div class="quesopmenu" v-show="row.mouseIn">
                        <span style="color:white;" @click="go_detail(row)"><span class="iconfont icon-details"></span>详情</span>
                        <span style="color:white;" @click="changeItem(row, rowIndex, 'single')"><span class="iconfont icon-exchange3jiaohuan"></span>换题</span>
                        <span style="color:white;" @click="deleteOneItem(rowIndex, 'single')"><span class="iconfont icon-shanchu"></span>删除</span>
                        <span style="color:white;" @click="itemUp(row, rowIndex, 'single')"
                              v-show="rowIndex != 0"><span class="iconfont icon-shangyi"></span>上移</span>
                        <span style="color:rgb(233, 225, 225);cursor: default" v-show="rowIndex == 0"><span class="iconfont icon-shangyi"></span>上移</span>
                        <span style="color:white;" @click="itemDown(row, rowIndex, 'single')"
                              v-show="rowIndex != item_basket.single.length - 1"><span class="iconfont icon-xiayi"></span>下移</span>
                        <span style="color:rgb(233, 225, 225);cursor: default"
                              v-show="rowIndex == item_basket.single.length - 1"><span class="iconfont icon-xiayi"></span>下移</span>
                      </div>
                      <div class="quesdiv">
                        <div class="item-body m-v-md m-h-md">
                          <p><span v-text="row.index"></span>. </span><span v-html="row.title"></span></p>
                          <div v-for="anwser in row.answers" class="m-v-sm"
                               style="display: inline-block;margin-right:20px;">
                            <span v-html="anwser.holeAnwser"></span></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!--多选题-->
                  <div v-show="item_basket.multiple.length>0">
                    <table border='1' class="pull-left grade_paper m-h-xs score_info" v-show="structureStatuses.topicScoreCheck">
                      <tr>
                        <th>评卷人</th>
                        <th>得分</th>
                      </tr>
                      <tr>
                        <td></td>
                        <td></td>
                      </tr>
                    </table>
                    <div class="pull-left" v-show="structureStatuses.topicCheck">
                      <span v-show="item_basket.single.length>0">二、</span>
                      <span v-show="item_basket.single.length<1">一、</span>
                      <span class="questypename" contenteditable="true" id="typeTwoNote">多选题</span>
                      <span class="bold">（共{{item_basket.multiple.length}}个小题）</span>
                    </div>
                    <div style="clear:both;"></div>
                    <div onselectstart="return false" class="quesbox" v-for="(row, rowIndex) in item_basket.multiple"
                         @mouseenter="itemHover(row, rowIndex, 'multiple')"
                         @mouseleave="itemLeave(row, rowIndex, 'multiple')" :class="{'border_1': row.mouseIn}">
                      <div class="quesopmenu" v-show="row.mouseIn">
                        <span style="color:white;" @click="go_detail(row)"><span class="iconfont icon-details"></span>详情</span>
                        <span style="color:white;" @click="changeItem(row, rowIndex, 'multiple')"><span class="iconfont icon-exchange3jiaohuan"></span>换题</span>
                        <span style="color:white;" @click="deleteOneItem(rowIndex, 'multiple')"><span class="iconfont icon-shanchu"></span>删除</span>
                        <span style="color:white;" @click="itemUp(row, rowIndex, 'multiple')"
                              v-show="rowIndex!=0"><span class="iconfont icon-shangyi"></span>上移</span>
                        <span style="color:rgb(233, 225, 225);cursor: default" v-show="rowIndex==0"><span class="iconfont icon-shangyi"></span>上移</span>
                        <span style="color:white;" @click="itemDown(row, rowIndex, 'multiple')"
                              v-show="rowIndex != item_basket.multiple.length - 1"><span class="iconfont icon-xiayi"></span>下移</span>
                        <span style="color:rgb(233, 225, 225);cursor: default"
                              v-show="rowIndex == item_basket.multiple.length - 1"><span class="iconfont icon-xiayi"></span>下移</span>
                      </div>
                      <div class="quesdiv">
                        <div class="item-body m-v-md m-h-md">
                          <p><span v-text="row.index"></span>. </span><span v-html="row.title"></span></p>
                          <div v-for="anwser in row.answers" class="m-v-sm"
                               style="display: inline-block;margin-right:20px;">
                            <span v-html="anwser.holeAnwser"></span></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div id="part2">
                  <div class="parthead" title='点击设置"第二卷名称"' contenteditable="true" v-show="structureStatuses.subsectionCheck"
                       id="partTwoNote">第II卷（非选择题）
                  </div>
                  <div class="partnote" title='点击设置"第II卷文字说明"' contenteditable="true" v-show="structureStatuses.subsectionCheck" id="partTwoMsg">请点击修改第II卷的文字说明
                  </div>
                  <!--填空题-->
                  <div v-show="item_basket.blank.length>0">
                    <table border='1' class="pull-left grade_paper m-h-xs score_info"
                           v-show="structureStatuses.topicScoreCheck">
                      <tr>
                        <th>评卷人</th>
                        <th>得分</th>
                      </tr>
                      <tr>
                        <td></td>
                        <td></td>
                      </tr>
                    </table>
                    <div class="pull-left" v-show="structureStatuses.topicCheck">
                      <span v-if="item_basket.single.length<1&&item_basket.multiple.length<1">一、</span>
                      <span v-else-if="item_basket.single.length>0&&item_basket.multiple.length>0">三、</span>
                      <span v-else>二、</span>
                      <span class="questypename" contenteditable="true" id="typeThreeNote">填空题</span>
                      <span class="bold">（共{{item_basket.blank.length}}个小题）</span>
                    </div>
                    <div style="clear:both;"></div>
                    <div onselectstart="return false" class="quesbox" v-for="(row, rowIndex) in item_basket.blank"
                         @mouseenter="itemHover(row, rowIndex, 'blank')" @mouseleave="itemLeave(row, rowIndex, 'blank')"
                         :class="{'border_1': row.mouseIn}">
                      <div class="quesopmenu" v-show="row.mouseIn">
                        <span style="color:white;" @click="go_detail(row)"><span class="iconfont icon-details"></span>详情</span>
                        <span style="color:white;" @click="changeItem(row, rowIndex, 'blank')"><span class="iconfont icon-exchange3jiaohuan"></span>换题</span>
                        <span style="color:white;" @click="deleteOneItem(rowIndex, 'blank')"><span class="iconfont icon-shanchu"></span>删除</span>
                        <span style="color:white;" @click="itemUp(row, rowIndex, 'blank')"
                              v-show="rowIndex!=0"><span class="iconfont icon-shangyi"></span>上移</span>
                        <span style="color:rgb(233, 225, 225);cursor: default" v-show="rowIndex==0"><span class="iconfont icon-shangyi"></span>上移</span>
                        <span style="color:white;" @click="itemDown(row, rowIndex, 'blank')"
                              v-show="rowIndex != item_basket.blank.length - 1"><span class="iconfont icon-xiayi"></span>下移</span>
                        <span style="color:rgb(233, 225, 225);cursor: default"
                              v-show="rowIndex == item_basket.blank.length - 1"><span class="iconfont icon-xiayi"></span>下移</span>
                      </div>
                      <div class="quesdiv">
                        <div class="item-body m-v-md m-h-md">
                          <p><span v-text="row.index"></span>. </span><span v-html="row.title"></span></p>
                          <div v-for="anwser in row.answers" class="m-v-sm"
                               style="display: inline-block;margin-right:20px;">
                            <span v-html="anwser.holeAnwser"></span></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!--解答题-->
                  <div v-show="item_basket.resolve.length>0">
                    <table border='1' class="pull-left grade_paper m-h-xs score_info"
                           v-show="structureStatuses.topicScoreCheck">
                      <tr>
                        <th>评卷人</th>
                        <th>得分</th>
                      </tr>
                      <tr>
                        <td></td>
                        <td></td>
                      </tr>
                    </table>
                    <div class="pull-left" v-show="structureStatuses.topicCheck">
                      <span
                        v-if="item_basket.single.length<1&&item_basket.multiple.length<1&&item_basket.blank.length<1">一、</span>
                      <span
                        v-else-if="item_basket.single.length>0&&item_basket.multiple.length>0&&item_basket.blank.length>0">四、</span>
                      <span
                        v-else-if="(item_basket.single.length>0&&item_basket.multiple.length>0&&item_basket.blank.length<1)|| (item_basket.single.length>0&&item_basket.multiple.length<1&&item_basket.blank.length>0)|| (item_basket.single.length<1&&item_basket.multiple.length>0&&item_basket.blank.length>0)">三、</span>
                      <span v-else>二、</span>
                      <span class="questypename" contenteditable="true" id="typeFourNote">解答题</span>
                      <span class="bold">（共{{item_basket.resolve.length}}个小题）</span>
                    </div>
                    <div style="clear:both;"></div>
                    <div onselectstart="return false" class="quesbox" v-for="(row, rowIndex) in item_basket.resolve"
                         @mouseenter="itemHover(row, rowIndex, 'resolve')"
                         @mouseleave="itemLeave(row, rowIndex, 'resolve')" :class="{'border_1': row.mouseIn}">
                      <div class="quesopmenu" v-show="row.mouseIn">
                        <span style="color:white;" @click="go_detail(row)"><span class="iconfont icon-details"></span>详情</span>
                        <span style="color:white;" @click="changeItem(row, rowIndex, 'resolve')"><span class="iconfont icon-exchange3jiaohuan"></span>换题</span>
                        <span style="color:white;" @click="deleteOneItem(rowIndex, 'resolve')"><span class="iconfont icon-shanchu"></span>删除</span>
                        <span style="color:white;" @click="itemUp(row, rowIndex, 'resolve')"
                              v-show="rowIndex!=0"><span class="iconfont icon-shangyi"></span>上移</span>
                        <span style="color:rgb(233, 225, 225);cursor: default" v-show="rowIndex==0"><span class="iconfont icon-shangyi"></span>上移</span>
                        <span style="color:white;" @click="itemDown(row, rowIndex, 'resolve')"
                              v-show="rowIndex != item_basket.resolve.length - 1"><span class="iconfont icon-xiayi"></span>下移</span>
                        <span style="color:rgb(233, 225, 225);cursor: default"
                              v-show="rowIndex == item_basket.resolve.length - 1"><span class="iconfont icon-xiayi"></span>下移</span>
                      </div>
                      <div class="quesdiv">
                        <div class="item-body m-v-md m-h-md">
                          <p><span v-text="row.index"></span>. </span><span v-html="row.title"></span></p>
                          <div v-for="anwser in row.answers" class="m-v-sm"
                               style="display: inline-block;margin-right:20px;">
                            <span v-html="anwser.holeAnwser"></span></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <!--工具栏-->
    <ul class="func">
      <li v-drag title="点击移动即可拖动"><span>工具栏</span></li>
      <li @click="down_paper()"><span class="iconfont icon-datiqia"></span><span>下载试卷</span></li>
      <li v-if="false"><span class="iconfont icon-xiangqing2"></span><span>下载答题卡</span></li>
      <li @click="save_paper()"><span class="iconfont icon-baocun"></span><span>保存试卷</span></li>
      <li @click="set_score()"><span class="iconfont icon-shizhongclock77"></span><span>分值设置</span></li>
      <li @click="clear_basket_item('reset')"><span class="iconfont icon-lvzhou_zhongzhi"></span><span>重置试卷</span></li>
    </ul>
    <!--分值设置-->
    <el-dialog
      title="设置分数"
      :visible.sync="set_score_dialog"
      width="800px"
      center>
      <div>
        <span>{{get_temp_1_info}}</span>
        <div class="score_title">
          <span v-text="paper_name"></span>
          <span style="margin-left:40px;">总分数:</span>
          <span v-text="temp_total_score"></span>
        </div>
        <div>
          <el-checkbox v-model="show_sub_item">显示小题</el-checkbox>
        </div>
        <div class="mTop">
          <table border="1" class="table_score" v-show="!show_sub_item">
            <thead>
            <tr>
              <th>序号</th>
              <th>题号</th>
              <th>题组题</th>
              <th>难度</th>
              <th>知识点</th>
              <th>设置分数</th>
            </tr>
            </thead>
            <tbody>
            <!--单选题-->
            <tr v-if="items_temp_1.single.length > 0">
              <td colspan="5">一、单选题（{{singleScore}}分）</td>
              <td class="item_score"><input type="text" v-model="avg_s_score" @keyup="set_avg_score('single')">分/题
              </td>
            </tr>
            <tr v-for="item,index in items_temp_1.single">
              <td>{{index+1}}</td>
              <td><input type="text" v-model="item.index" @keyup="set_item_index(item, index, 'single')"></td>
              <td><span v-show="item.isCombination==1">题组题</span></td>
              <td>
                <span v-if="item.difficulty<0.2">容易</span>
                <span v-else-if="item.difficulty<0.4">较易</span>
                <span v-else-if="item.difficulty<0.6">一般</span>
                <span v-else-if="item.difficulty<0.8">较难</span>
                <span v-else>困难</span>
              </td>
              <td>
                <span v-if="item.pointNameList">{{item.pointNameList}}</span>
                <span v-else>{{item.pointList}}</span>
              </td>
              <td class="item_score">
                <input type="text" v-model="item.score" @keyup="set_item_score(item, index, 'single')">分
              </td>
            </tr>
            <!--多选题-->
            <tr v-if="items_temp_1.multiple.length > 0">
              <td colspan="5">
                <span v-if="items_temp_1.single.length>0">二</span>
                <span v-else>一</span>
                <span>、多选题（{{multipleScore}}分）</span>
              </td>
              <td class="item_score"><input type="text" v-model="avg_m_score" @keyup="set_avg_score('multiple')">分/题
              </td>
            </tr>
            <tr v-for="item,index in items_temp_1.multiple">
              <td>{{index + 1 + items_temp_1.single.length}}</td>
              <td><input type="text" v-model="item.index" @keyup="set_item_index(item, index, 'multiple')"></td>
              <td><span v-show="item.isCombination==1">题组题</span></td>
              <td>
                <span v-if="item.difficulty<0.2">容易</span>
                <span v-else-if="item.difficulty<0.4">较易</span>
                <span v-else-if="item.difficulty<0.6">一般</span>
                <span v-else-if="item.difficulty<0.8">较难</span>
                <span v-else>困难</span>
              </td>
              <td>
                <span v-if="item.pointNameList">{{item.pointNameList}}</span>
                <span v-else>{{item.pointList}}</span>
              </td>
              <td class="item_score">
                <input type="text" v-model="item.score" @keyup="set_item_score(item, index, 'multiple')">分
              </td>
            </tr>
            <!--填空题-->
            <tr v-if="items_temp_1.blank.length > 0">
              <td colspan="5">
                <span v-if="items_temp_1.single.length>0&&items_temp_1.multiple.length>0">三</span>
                <span v-else-if="items_temp_1.single.length<1&&items_temp_1.multiple.length<1">一</span>
                <span v-else>二</span>
                <span>、填空题（{{blankScore}}分）</span>
              </td>
              <td class="item_score"><input type="text" v-model="avg_b_score" @keyup="set_avg_score('blank')">分/题
              </td>
            </tr>
            <tr v-for="item,index in items_temp_1.blank">
              <td>{{index + 1 + items_temp_1.single.length + items_temp_1.multiple.length}}</td>
              <td><input type="text" v-model="item.index" @keyup="set_item_index(item, index, 'blank')"></td>
              <td><span v-show="item.isCombination==1">题组题</span></td>
              <td>
                <span v-if="item.difficulty<0.2">容易</span>
                <span v-else-if="item.difficulty<0.4">较易</span>
                <span v-else-if="item.difficulty<0.6">一般</span>
                <span v-else-if="item.difficulty<0.8">较难</span>
                <span v-else>困难</span>
              </td>
              <td>
                <span v-if="item.pointNameList">{{item.pointNameList}}</span>
                <span v-else>{{item.pointList}}</span>
              </td>
              <td class="item_score">
                <input type="text" v-model="item.score" @keyup="set_item_score(item, index, 'blank')">分
              </td>
            </tr>
            <!--解答题-->
            <tr v-if="items_temp_1.resolve.length > 0">
              <td colspan="5">
                <span v-if="items_temp_1.single.length<1&&items_temp_1.multiple.length<1&&items_temp_1.blank.length<1">一</span>
                <span v-else-if="items_temp_1.single.length>0&&items_temp_1.multiple.length>0&&items_temp_1.blank.length>0">四</span>
                <span v-else-if="(items_temp_1.single.length>0&&items_temp_1.multiple.length>0&&items_temp_1.blank.length<1)|| (items_temp_1.single.length>0&&items_temp_1.multiple.length<1&&items_temp_1.blank.length>0)|| (items_temp_1.single.length<1&&items_temp_1.multiple.length>0&&items_temp_1.blank.length>0)"> 三</span>
                <span v-else>二</span>
                <span>、解答题（{{resolveScore}}分）</span>
              </td>
              <td class="item_score"><input type="text" v-model="avg_r_score" @keyup="set_avg_score('resolve')">分/题
              </td>
            </tr>
            <tr v-for="item,index in items_temp_1.resolve">
              <td>{{index + 1 + items_temp_1.single.length + items_temp_1.multiple.length + items_temp_1.blank.length}}</td>
              <td><input type="text" v-model="item.index" @keyup="set_item_index(item, index, 'resolve')"></td>
              <td><span v-show="item.isCombination==1">题组题</span></td>
              <td>
                <span v-if="item.difficulty<0.2">容易</span>
                <span v-else-if="item.difficulty<0.4">较易</span>
                <span v-else-if="item.difficulty<0.6">一般</span>
                <span v-else-if="item.difficulty<0.8">较难</span>
                <span v-else>困难</span>
              </td>
              <td>
                <span v-if="item.pointNameList">{{item.pointNameList}}</span>
                <span v-else>{{item.pointList}}</span>
              </td>
              <td class="item_score">
                <input type="text" v-model="item.score" @keyup="set_item_score(item, index, 'resolve')">分
              </td>
            </tr>
            </tbody>
          </table>
          <table border="1" class="table_score" v-show="show_sub_item">
            <thead>
            <tr>
              <th>序号</th>
              <th>题号</th>
              <th>题组题</th>
              <th>难度</th>
              <th>知识点</th>
              <th>设置分数</th>
            </tr>
            </thead>
            <tbody>
            <!--单选题-->
            <tr v-if="items_temp_2.single.length > 0">
              <td colspan="5">一、单选题（{{singleScore}}分）</td>
              <td class="item_score"><input type="text" v-model="avg_s_score" @keyup="set_avg_score('single')">分/题
              </td>
            </tr>
            <tr v-for="item,index in items_temp_2.single">
              <td>{{index+1}}</td>
              <td><input type="text" v-model="item.index" @keyup="set_item_index(item, index, 'single')"></td>
              <td><span v-show="item.isCombination==1">题组题</span></td>
              <td>
                <span v-if="item.difficulty<0.2">容易</span>
                <span v-else-if="item.difficulty<0.4">较易</span>
                <span v-else-if="item.difficulty<0.6">一般</span>
                <span v-else-if="item.difficulty<0.8">较难</span>
                <span v-else>困难</span>
              </td>
              <td>
                <span v-if="item.pointNameList">{{item.pointNameList}}</span>
                <span v-else>{{item.pointList}}</span>
              </td>
              <td class="item_score">
                <input type="text" v-model="item.score" @keyup="set_item_score(item, index, 'single')">分
              </td>
            </tr>
            <!--多选题-->
            <tr v-if="items_temp_2.multiple.length > 0">
              <td colspan="5">
                <span v-if="items_temp_2.single.length>0">二</span>
                <span v-else>一</span>
                <span>、多选题（{{multipleScore}}分）</span>
              </td>
              <td class="item_score"><input type="text" v-model="avg_m_score" @keyup="set_avg_score('multiple')">分/题
              </td>
            </tr>
            <tr v-for="item,index in items_temp_2.multiple">
              <td>{{index + 1 + items_temp_2.single.length}}</td>
              <td><input type="text" v-model="item.index" @keyup="set_item_index(item, index, 'multiple')"></td>
              <td><span v-show="item.isCombination==1">题组题</span></td>
              <td>
                <span v-if="item.difficulty<0.2">容易</span>
                <span v-else-if="item.difficulty<0.4">较易</span>
                <span v-else-if="item.difficulty<0.6">一般</span>
                <span v-else-if="item.difficulty<0.8">较难</span>
                <span v-else>困难</span>
              </td>
              <td>
                <span v-if="item.pointNameList">{{item.pointNameList}}</span>
                <span v-else>{{item.pointList}}</span>
              </td>
              <td class="item_score">
                <input type="text" v-model="item.score" @keyup="set_item_score(item, index, 'multiple')">分
              </td>
            </tr>
            <!--填空题-->
            <tr v-if="items_temp_2.blank.length > 0">
              <td colspan="5">
                <span v-if="items_temp_2.single.length>0&&items_temp_2.multiple.length>0">三</span>
                <span v-else-if="items_temp_2.single.length<1&&items_temp_2.multiple.length<1">一</span>
                <span v-else>二</span>
                <span>、填空题（{{blankScore}}分）</span>
              </td>
              <td class="item_score"><input type="text" v-model="avg_b_score" @keyup="set_avg_score('blank')">分/题
              </td>
            </tr>
            <tr v-for="item,index in items_temp_2.blank">
              <td>{{index + 1 + items_temp_2.single.length + items_temp_2.multiple.length}}</td>
              <td><input type="text" v-model="item.index" @keyup="set_item_index(item, index, 'blank')"></td>
              <td><span v-show="item.isCombination==1">题组题</span></td>
              <td>
                <span v-if="item.difficulty<0.2">容易</span>
                <span v-else-if="item.difficulty<0.4">较易</span>
                <span v-else-if="item.difficulty<0.6">一般</span>
                <span v-else-if="item.difficulty<0.8">较难</span>
                <span v-else>困难</span>
              </td>
              <td>
                <span v-if="item.pointNameList">{{item.pointNameList}}</span>
                <span v-else>{{item.pointList}}</span>
              </td>
              <td class="item_score">
                <input type="text" v-model="item.score" @keyup="set_item_score(item, index, 'blank')">分
              </td>
            </tr>
            <!--解答题-->
            <tr v-if="items_temp_2.resolve.length > 0">
              <td colspan="5">
                <span v-if="items_temp_2.single.length<1&&items_temp_2.multiple.length<1&&items_temp_2.blank.length<1">一</span>
                <span v-else-if="items_temp_2.single.length>0&&items_temp_2.multiple.length>0&&items_temp_2.blank.length>0">四</span>
                <span v-else-if="(items_temp_2.single.length>0&&items_temp_2.multiple.length>0&&items_temp_2.blank.length<1)|| (items_temp_2.single.length>0&&items_temp_2.multiple.length<1&&items_temp_2.blank.length>0)|| (items_temp_2.single.length<1&&items_temp_2.multiple.length>0&&items_temp_2.blank.length>0)"> 三</span>
                <span v-else>二</span>
                <span>、解答题（{{resolveScore}}分）</span>
              </td>
              <td class="item_score"><input type="text" v-model="avg_r_score" @keyup="set_avg_score('resolve')">分/题
              </td>
            </tr>
            <tr v-for="item,index in items_temp_2.resolve">
              <td>{{index + 1 + items_temp_2.single.length + items_temp_2.multiple.length + items_temp_2.blank.length}}</td>
              <td><input type="text" v-model="item.index" @keyup="set_item_index(item, index, 'resolve')"></td>
              <td><span v-show="item.isCombination==1">题组题</span></td>
              <td>
                <span v-if="item.difficulty<0.2">容易</span>
                <span v-else-if="item.difficulty<0.4">较易</span>
                <span v-else-if="item.difficulty<0.6">一般</span>
                <span v-else-if="item.difficulty<0.8">较难</span>
                <span v-else>困难</span>
              </td>
              <td>
                <span v-if="item.pointNameList">{{item.pointNameList}}</span>
                <span v-else>{{item.pointList}}</span>
              </td>
              <td class="item_score">
                <input type="text" v-model="item.score" @keyup="set_item_score(item, index, 'resolve')">分
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="set_score_dialog = false">取 消</el-button>
    <el-button type="primary" @click="confirm_score()">确 定</el-button>
  </span>
    </el-dialog>
    <!--删除确认-->
    <el-dialog
      title="温馨提示"
      :visible.sync="clear_item_dialog"
      width="400px"
      center>
      <span v-if="will_clear == 'all'">该操作将会删除所有的试题，确认要删除所有的试题吗？</span>
      <span v-else-if="will_clear == 'reset'">该操作将会删除所有的试题，并且页面的结构也将重置，确定后点击确定？</span>
      <span v-else>确认要删除所有的{{type_name}}吗？</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="clear_item_dialog = false">取 消</el-button>
    <el-button type="primary" @click="confirm_clear()">确 定</el-button>
  </span>
    </el-dialog>
    <!--排序弹框-->
    <el-dialog
      title="题型难度排序"
      :visible.sync="sort_item_dialog"
      width="600px"
      center>
      <h2>试题类型</h2>
      <hr>
      <el-checkbox-group
        v-model="check_type_list"
        :min="1">
        <el-checkbox v-for="item in type_list" :label="item.type" :key="item.type" v-show="item_basket[item.type].length > 0">{{item.name}}</el-checkbox>
      </el-checkbox-group>
      <h2 class="mTop">试题排序</h2>
      <hr>
      <el-radio v-model="sort_by" label="1">难度从低到高</el-radio>
      <el-radio v-model="sort_by" label="2">难度从高到低</el-radio>
      <span slot="footer" class="dialog-footer">
    <el-button @click="sort_item_dialog = false">取 消</el-button>
    <el-button type="primary" @click="confirm_sort()">确 定</el-button>
  </span>
    </el-dialog>
    <!--换题弹框-->
    <el-dialog
      :title="title_change"
      :visible.sync="change_item_dialog"
      width="600px"
      center>
      <div v-show="changedItems.length < 1">
        <p>暂无该类型的题</p>
      </div>
      <div v-show="changedItems.length > 0">
        <div>
          <button type="button" class="btn page-btn" style="margin-left:10px;" v-for="(item, itemIndex) in changedItems"
                  :class="{'page-btn-select': item.selected}" @click="changeItemCheck(item,itemIndex)">{{itemIndex + 1}}
          </button>
        </div>
        <div class="m-md text-grey">
          <span>试题ID:</span>
          <span v-text="currentChangeItem.id"></span>
          <span class="m_l_10">难度:</span>
          <span v-if="currentChangeItem.difficulty<0.2">容易</span>
          <span v-else-if="currentChangeItem.difficulty<0.4">较易</span>
          <span v-else-if="currentChangeItem.difficulty<0.6">一般</span>
          <span v-else-if="currentChangeItem.difficulty<0.8">较难</span>
          <span v-else>困难</span>
          <span class="m_l_10">题型:</span>
          <span v-show="currentChangeItem.qtype==1">单选题</span>
          <span v-show="currentChangeItem.qtype==2">多选题</span>
          <span v-show="currentChangeItem.qtype==3">填空题</span>
          <span v-show="currentChangeItem.qtype==4">解答题</span>
          <span class="m_l_10">更新时间:{{currentChangeItem.updateTime}}</span>
        </div>
        <div class="p-md">
          <p></span><span v-html="currentChangeItem.title"></span></p>
          <div v-for="anwser in currentChangeItem.answers" class="m-sm"
               style="display: inline-block;margin-right:20px;"><span v-html="anwser.holeAnwser"></span></div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
    <el-button @click="change_item_dialog = false">取 消</el-button>
    <el-button type="primary" @click="confirm_change()">确 定</el-button>
  </span>
    </el-dialog>
    <Footer></Footer>
  </div>
</template>

<script>
  /*
  * structureStatuses.titleCheck                  主标题
  * structureStatuses.subtitleCheck               副标题
  * structureStatuses.alurCheck                   装订线
  * structureStatuses.secretCheck                 保密标记
  * structureStatuses.paperInfoCheck              试卷信息栏
  * structureStatuses.studentInputCheck           考生输入栏
  * structureStatuses.scoreCheck                  誊分栏
  * structureStatuses.noticeCheck                 注意事项
  * structureStatuses.subsectionCheck             分卷及注释
  * structureStatuses.topicCheck                  大题及注释
  * structureStatuses.topicScoreCheck             大题评分区
  * */
  import Footer from '../Footer/Footer.vue'
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
  import draggable from 'vuedraggable'
  import Vue from 'vue'
  export default {
    data() {
      return {
        show_basket: false,
        materialId: '',
        subjectId: '',
        subjectName: '',
        item_basket: {
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
        /*删除提示所用*/
        clear_item_dialog: false,
        type_name: '',
        will_clear: '',
        /*试卷结构设置的数据*/
        structureStatuses: {
          titleCheck: true,
          subtitleCheck: true,
          alurCheck: true,
          secretCheck: true,
          paperInfoCheck: true,
          studentInputCheck: true,
          scoreCheck: true,
          noticeCheck: true,
          subsectionCheck: true,
          topicCheck: true,
          topicScoreCheck: true
        },
        show_structureStatuses: true,
        /*试卷参数设置的数据*/
        gradeList: [],
        materialList: [],
        semesterList: [
          {id: 1, name: '上学年'},
          {id: 2, name: '下学年'}
        ],
        selectGradeId: '',
        selectMaterialId: '',
        selectSemesterId: 1,
        show_params: true,
        /*试题统计的数据*/
        show_item_detail: true,
        total_score: 0,
        /*排序弹框*/
        sort_item_dialog: false,
        check_type_list: [],
        type_list: [
          {type: 'single', id: 1, name: '单选题'},
          {type: 'multiple', id: 2, name: '多选题'},
          {type: 'blank', id: 3, name: '填空题'},
          {type: 'resolve', id: 4, name: '解答题'}],
        sort_by: '1',
        /*换题所需的数据*/
        item_change: {},
        title_change: '',
        type_change: '',
        index_change: '',
        change_item_dialog: false,
        changedItems: [],
        currentChangeItem: {},
        /*分值设置所需要的数据*/
        set_score_dialog: false,
        paper_name: '',
        temp_total_score: 0,
        show_sub_item: false,
        items_temp_1: {
          single: [],
          multiple: [],
          blank: [],
          resolve: []
        }, //不显示小题
        items_temp_2: {
          single: [],
          multiple: [],
          blank: [],
          resolve: []
        }, //显示小题
        singleScore: 0,
        multipleScore: 0,
        blankScore: 0,
        resolveScore: 0,
        avg_s_score: '',
        avg_m_score: '',
        avg_b_score: '',
        avg_r_score: '',
        change_index: true,
        /*复用试卷时*/
        paperId: '',
        paper: {},
        /*试卷名称年段*/
        paper_name: '',
        scopeDataList: [],
        scopeData: '',
        /*ui界面*/
        system: this.global.system
      }
    },
    created() {
      if(!this.$route.params.paperId) {
        this.item_basket = JSON.parse(sessionStorage.getItem('item_basket'))
        this.subjectId = sessionStorage.getItem('cur_subjectId')
        this.materialId = sessionStorage.getItem('cur_materialId')
        this.subjectName = sessionStorage.getItem('cur_subjectName')
        this.paper_name = `${new Date().getFullYear()}年${new Date().getMonth() + 1}月${new Date().getDate()}日xxx${this.subjectName}的组卷`
        if (this.subjectId == 1 || this.subjectId == 2 || this.subjectId == 10 || this.subjectId == 11) {
          this.gradeList = [
            {id: 107, name: '初一'},
            {id: 108, name: '初二'},
            {id: 109, name: '初三'}
          ]
        } else {
          this.gradeList = [
            {id: 110, name: '高一'},
            {id: 111, name: '高二'},
            {id: 112, name: '高三'}
          ]
        }
        this.selectGradeId = this.gradeList[0].id
        this.getmateriallist()
      } else {
        this.change_index = false
        this.paperId = this.$route.params.paperId
        this.getPaperDetail()
      }
    },
    components: {
      draggable,
      Footer
    },
    mounted() {
      $('.paper_content').css({
        minHeight: $(window).height() - 166 + 'px',
        marginTop: '70px'
      })
    },
    computed: {
      get_basket_info() {
        this.total_score = 0
        this.basket_length = this.item_basket.single.length + this.item_basket.multiple.length + this.item_basket.blank.length + this.item_basket.resolve.length
        if (this.basket_length > 0) {
          let diff_total = 0
          this.single_percent = Number((this.item_basket.single.length / this.basket_length * 100).toFixed(2))
          this.multiple_percent = Number((this.item_basket.multiple.length / this.basket_length * 100).toFixed(2))
          this.blank_percent = Number((this.item_basket.blank.length / this.basket_length * 100).toFixed(2))
          this.resolve_percent = Number((this.item_basket.resolve.length / this.basket_length * 100).toFixed(2))
          for (let i = 0, len = this.item_basket.single.length; i < len; i++) {
            if(this.change_index) {
              this.item_basket.single[i].index = i + 1
            }
            diff_total += Number(this.item_basket.single[i].difficulty)
            this.total_score += Number(this.item_basket.single[i].score ? this.item_basket.single[i].score : 0)
          }
          for (let i = 0, len = this.item_basket.multiple.length; i < len; i++) {
            if(this.change_index) {
              this.item_basket.multiple[i].index = this.item_basket.single.length + i + 1
            }
            diff_total += Number(this.item_basket.multiple[i].difficulty)
            this.total_score += Number(this.item_basket.multiple[i].score ? this.item_basket.multiple[i].score : 0)
          }
          for (let i = 0, len = this.item_basket.blank.length; i < len; i++) {
            if(this.change_index) {
              this.item_basket.blank[i].index = this.item_basket.single.length + this.item_basket.multiple.length + i + 1
            }
            diff_total += Number(this.item_basket.blank[i].difficulty)
            this.total_score += Number(this.item_basket.blank[i].score ? this.item_basket.blank[i].score : 0)
          }
          for (let i = 0, len = this.item_basket.resolve.length; i < len; i++) {
            if(this.change_index) {
              this.item_basket.resolve[i].index = this.item_basket.single.length + this.item_basket.multiple.length + this.item_basket.blank.length + i + 1
            }
            diff_total += Number(this.item_basket.resolve[i].difficulty)
            this.total_score += Number(this.item_basket.resolve[i].score ? this.item_basket.resolve[i].score : 0)
          }
          this.average_diff = (diff_total / this.basket_length).toFixed(2)
        } else {
          this.average_diff = 0
          this.total_score = 0
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
      },
      get_temp_1_info() {
        this.singleScore = 0
        this.multipleScore= 0
        this.blankScore = 0
        this.resolveScore = 0
        this.temp_total_score = 0
        for(let i = 0, len = this.items_temp_1.single.length; i < len; i++) {
          this.singleScore += Number(this.items_temp_1.single[i].score ? this.items_temp_1.single[i].score : 0)
        }
        for(let i = 0, len = this.items_temp_1.multiple.length; i < len; i++) {
          this.multipleScore += Number(this.items_temp_1.multiple[i].score ? this.items_temp_1.multiple[i].score : 0)
        }
        for(let i = 0, len = this.items_temp_1.blank.length; i < len; i++) {
          this.blankScore += Number(this.items_temp_1.blank[i].score ? this.items_temp_1.blank[i].score : 0)
        }
        for(let i = 0, len = this.items_temp_1.resolve.length; i < len; i++) {
          this.resolveScore += Number(this.items_temp_1.resolve[i].score ? this.items_temp_1.resolve[i].score : 0)
        }
        this.temp_total_score = Number(this.singleScore) + Number(this.multipleScore) + Number(this.blankScore) + Number(this.resolveScore)
      }
    },
    methods: {
      //删除单选，解答题等
      clear_basket_item(type) {
        this.clear_item_dialog = true
        this.will_clear = type
        if (type == 'single') {
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
        this.change_index = true
        this.clear_item_dialog = false
        if (this.will_clear == 'all') {
          this.item_basket = {
            single: [],
            multiple: [],
            blank: [],
            resolve: []
          }
        } else if(this.will_clear == 'reset') {
          this.reset_paper()
        } else  {
          this.item_basket[this.will_clear] = []
        }
      },
      continue_paper() {
        this.$router.push({
          name: 'SelectItem',
          params: {
            mark: 1
          }
        })
      },
      async getmateriallist() {
        let url = '/edu/getmateriallist'
        let params = {
          sid: this.global.sid,
          uid: this.global.uid,
          subject: this.subjectId
        }
        let data = await this.api.get(url, params, {loading: true})
        if(data) {
          this.materialList = data.retDate
          this.selectMaterialId = this.materialList[0].id
        }
      },
      sort_item(type) {
        this.sort_item_dialog = true
        this.check_type_list = [type]
      },
      confirm_sort() {
        this.change_index = true
        if (this.sort_by == 1) {
          if (this.check_type_list.includes('single')) {
            this.item_basket.single.sort((a, b) => a.difficulty - b.difficulty)
          }
          if (this.check_type_list.includes('multiple')) {
            this.item_basket.multiple.sort((a, b) => a.difficulty - b.difficulty)
          }
          if (this.check_type_list.includes('blank')) {
            this.item_basket.blank.sort((a, b) => a.difficulty - b.difficulty)
          }
          if (this.check_type_list.includes('resolve')) {
            this.item_basket.resolve.sort((a, b) => a.difficulty - b.difficulty)
          }
        } else if (this.sort_by == 2) {
          if (this.check_type_list.includes('single')) {
            this.item_basket.single.sort((a, b) => b.difficulty - a.difficulty)
          }
          if (this.check_type_list.includes('multiple')) {
            this.item_basket.multiple.sort((a, b) => b.difficulty - a.difficulty)
          }
          if (this.check_type_list.includes('blank')) {
            this.item_basket.blank.sort((a, b) => b.difficulty - a.difficulty)
          }
          if (this.check_type_list.includes('resolve')) {
            this.item_basket.resolve.sort((a, b) => b.difficulty - a.difficulty)
          }
        }
        this.sort_item_dialog = false
      },
      itemLeave: function (item, index, mark) {
        item.mouseIn = false;
        switch (mark) {
          case 'single':
            Vue.set(this.item_basket.single, index, item);
            break;
          case 'multiple':
            Vue.set(this.item_basket.multiple, index, item);
            break;
          case 'blank':
            Vue.set(this.item_basket.blank, index, item);
            break;
          case 'resolve':
            Vue.set(this.item_basket.resolve, index, item);
            break;
        }
      },
      itemHover: function (item, index, mark) {
        item.mouseIn = true;
        switch (mark) {
          case 'single':
            Vue.set(this.item_basket.single, index, item);
            break;
          case 'multiple':
            Vue.set(this.item_basket.multiple, index, item);
            break;
          case 'blank':
            Vue.set(this.item_basket.blank, index, item);
            break;
          case 'resolve':
            Vue.set(this.item_basket.resolve, index, item);
            break;
        }
      },
      itemDown(row, index, type) {
        this.change_index = true
        let cur_index = index
        let next_index = index + 1
        row.mouseIn = false
        let next = this.item_basket[type][cur_index]
        let cur = this.item_basket[type][next_index]
        Vue.set(this.item_basket[type], cur_index, cur)
        Vue.set(this.item_basket[type], next_index, next)
      },
      itemUp(row, index, type) {
        this.change_index = true
        let cur_index = index
        let pre_index = index - 1
        row.mouseIn = false
        let pre = this.item_basket[type][cur_index]
        let cur = this.item_basket[type][pre_index]
        Vue.set(this.item_basket[type], pre_index, pre)
        Vue.set(this.item_basket[type], cur_index, cur)
      },
      deleteOneItem(index, type) {
        this.change_index = true
        this.item_basket[type].splice(index, 1)
      },
      go_detail(item) {
        sessionStorage.setItem('cur_item', JSON.stringify(item))
        sessionStorage.setItem('cur_subjectId', this.subjectId)
        window.open(`${this.global.LOCAL_URL}/#/OnlinePaper/seeItemAnalysis`)
      },
      changeItem(row, index, type) {
        this.item_change = row
        this.type_change = type
        this.index_change = index
        this.title_change = `换题-----替换当前第${row.index}题`
        this.change_item_dialog = true
        this.changeQuestion()
      },
      async changeQuestion() {
        let url = '/das/printPaper/changeQuestion'
        let params = {
          sid: this.global.sid,
          uid: this.global.uid,
          questionId: this.item_change.id,
          subjectId: this.subjectId,
          materialId: this.materialId
        }
        let data = await this.api.get(url, params, {loading: true})
        this.changedItems = data.changeList;
        this.changedItems[0].selected = true;
        Vue.set(this.changedItems, 0, this.changedItems[0]);
        if (this.changedItems && this.changedItems.length > 0) {
          for (let i = 0; i < this.changedItems.length; i++) {
            this.changedItems[i].title = formatPToSpan2(formatPToSpan(this.changedItems[i].text));
            this.changedItems[i].content = formatPToSpan2(formatPToSpan(this.changedItems[i].content));
            this.changedItems[i].index = this.item_change.index;
            this.changedItems[i].score = this.item_change.score;
            if (this.changedItems[i].answers && this.changedItems[i].answers.length > 0) {
              for (var j = 0; j < this.changedItems[i].answers.length; j++) {
                if (this.changedItems[i].qtype == 1 || this.changedItems[i].qtype == 2) {
                  if (j == 0) {
                    this.changedItems[i].answers[j].choice = 'A';
                  } else if (j == 1) {
                    this.changedItems[i].answers[j].choice = 'B';
                  } else if (j == 2) {
                    this.changedItems[i].answers[j].choice = 'C';
                  } else if (j == 3) {
                    this.changedItems[i].answers[j].choice = 'D';
                  } else if (j == 4) {
                    this.changedItems[i].answers[j].choice = 'E';
                  } else if (j == 5) {
                    this.changedItems[i].answers[j].choice = 'F';
                  } else if (j == 6) {
                    this.changedItems[i].answers[j].choice = 'G';
                  }
                  this.changedItems[i].answers[j].holeAnwser = this.changedItems[i].answers[j].choice + "." + formatPToSpan(this.changedItems[i].answers[j].answertext);
                  this.changedItems[i].answers[j].holeAnwser = formatPToSpan(this.changedItems[i].answers[j].holeAnwser);
                }
              }
            }
          }
          this.currentChangeItem = this.changedItems[0]
        }
      },
      changeItemCheck(item, itemIndex) {
        for (let i = 0; i < this.changedItems.length; i++) {
          this.changedItems[i].selected = false;
          Vue.set(this.changedItems, i, this.changedItems[i]);
        }
        item.selected = true;
        this.currentChangeItem = item;
        Vue.set(this.changedItems, itemIndex, item);
      },
      confirm_change() {
        this.currentChangeItem.index = this.item_change.index
        this.currentChangeItem.score = this.item_change.score
        Vue.set(this.item_basket[this.type_change], this.index_change, this.currentChangeItem)
        this.change_item_dialog = false
      },
      set_score() {
        this.set_score_dialog = true
        this.paper_name = $('#name').text()
        let cache = [];
        let it = JSON.stringify(this.item_basket, function (key, value) {
          if (typeof value === 'object' && value !== null) {
            if (cache.indexOf(value) !== -1) {
              // Circular reference found, discard key
              return;
            }
            // Store value in our collection
            cache.push(value);
          }
          return value;
        });
        cache = null;
        this.items_temp_1 = JSON.parse(it)
        this.items_temp_2 = JSON.parse(it)
        this.del_items_temp_2()
      },
      del_items_temp_2() {
        let single = []
        let multiple = []
        let blank = []
        let resolve = []
        for(let i = 0, len = this.items_temp_2.single.length; i < len; i++) {
          single.push(this.items_temp_2.single[i])
          if(this.items_temp_2.single[i].isCombination && this.items_temp_2.single[i].isCombination == 1 && this.items_temp_2.single[i].subQuestionList && this.items_temp_2.single[i].subQuestionList.length > 0) {
            let m = i
            for(let i = 0, len = this.items_temp_2.single[m].subQuestionList.length; i < len; i++) {
              this.items_temp_2.single[m].subQuestionList[i].index = this.items_temp_2.single[m].index + '(' + Number(i + 1) + ')'
              this.items_temp_2.single[m].subQuestionList[i].subIndex = i
              this.items_temp_2.single[m].subQuestionList[i].supIndex = m
              this.items_temp_2.single[m].subQuestionList[i].supId = this.items_temp_2.single[m].id
              this.items_temp_2.single[m].subQuestionList[i].sub = true
              single.push(this.items_temp_2.single[m].subQuestionList[i])
            }
          }
        }
        for(let i = 0, len = this.items_temp_2.multiple.length; i < len; i++) {
          multiple.push(this.items_temp_2.multiple[i])
          if(this.items_temp_2.multiple[i].isCombination && this.items_temp_2.multiple[i].isCombination == 1 && this.items_temp_2.multiple[i].subQuestionList && this.items_temp_2.multiple[i].subQuestionList.length > 0) {
            let m = i
            for(let i = 0, len = this.items_temp_2.multiple[m].subQuestionList.length; i < len; i++) {
              this.items_temp_2.multiple[m].subQuestionList[i].index = this.items_temp_2.multiple[m].index + '(' + Number(i + 1) + ')'
              this.items_temp_2.multiple[m].subQuestionList[i].subIndex = i
              this.items_temp_2.multiple[m].subQuestionList[i].supIndex = m
              this.items_temp_2.multiple[m].subQuestionList[i].supId = this.items_temp_2.multiple[m].id
              this.items_temp_2.multiple[m].subQuestionList[i].sub = true
              multiple.push(this.items_temp_2.multiple[m].subQuestionList[i])
            }
          }
        }
        for(let i = 0, len = this.items_temp_2.blank.length; i < len; i++) {
          blank.push(this.items_temp_2.blank[i])
          if(this.items_temp_2.blank[i].isCombination && this.items_temp_2.blank[i].isCombination == 1 && this.items_temp_2.blank[i].subQuestionList && this.items_temp_2.blank[i].subQuestionList.length > 0) {
            let m = i
            for(let i = 0, len = this.items_temp_2.blank[m].subQuestionList.length; i < len; i++) {
              this.items_temp_2.blank[m].subQuestionList[i].index = this.items_temp_2.blank[m].index + '(' + Number(i + 1) + ')'
              this.items_temp_2.blank[m].subQuestionList[i].subIndex = i
              this.items_temp_2.blank[m].subQuestionList[i].supIndex = m
              this.items_temp_2.blank[m].subQuestionList[i].supId = this.items_temp_2.blank[m].id
              this.items_temp_2.blank[m].subQuestionList[i].sub = true
              blank.push(this.items_temp_2.blank[m].subQuestionList[i])
            }
          }
        }
        for(let i = 0, len = this.items_temp_2.resolve.length; i < len; i++) {
          resolve.push(this.items_temp_2.resolve[i])
          if(this.items_temp_2.resolve[i].isCombination && this.items_temp_2.resolve[i].isCombination == 1 && this.items_temp_2.resolve[i].subQuestionList && this.items_temp_2.resolve[i].subQuestionList.length > 0) {
            let m = i
            for(let i = 0, len = this.items_temp_2.resolve[m].subQuestionList.length; i < len; i++) {
              this.items_temp_2.resolve[m].subQuestionList[i].index = this.items_temp_2.resolve[m].index + '(' + Number(i + 1) + ')'
              this.items_temp_2.resolve[m].subQuestionList[i].subIndex = i
              this.items_temp_2.resolve[m].subQuestionList[i].supIndex = m
              this.items_temp_2.resolve[m].subQuestionList[i].supId = this.items_temp_2.resolve[m].id
              this.items_temp_2.resolve[m].subQuestionList[i].sub = true
              resolve.push(this.items_temp_2.resolve[m].subQuestionList[i])
            }
          }
        }
        this.items_temp_2.single = single
        this.items_temp_2.multiple = multiple
        this.items_temp_2.blank = blank
        this.items_temp_2.resolve = resolve
      },
      set_avg_score(type) {
        switch (type) {
          case 'single':
            this.avg_s_score = String(this.avg_s_score).replace(/[^\d]/g, '')
            if(this.avg_s_score.length > 0) {
              if(this.avg_s_score[0] == 0) {
                this.avg_s_score = this.avg_s_score.substring(1)
              }
            }
            for(let i = 0, len = this.items_temp_1.single.length; i < len; i++) {
              this.items_temp_1.single[i].score = this.avg_s_score
              Vue.set(this.items_temp_1.single, i, this.items_temp_1.single[i])
            }
            for(let i = 0, len = this.items_temp_2.single.length; i < len; i++) {
              if(!this.items_temp_2.single[i].sub) {
                this.items_temp_2.single[i].score = this.avg_s_score
                Vue.set(this.items_temp_2.single, i, this.items_temp_2.single[i])
              }
            }
            break
          case 'multiple':
            this.avg_m_score = String(this.avg_m_score).replace(/[^\d]/g, '')
            if(this.avg_m_score.length > 0) {
              if(this.avg_m_score[0] == 0) {
                this.avg_m_score = this.avg_m_score.substring(1)
              }
            }
            for(let i = 0, len = this.items_temp_1.multiple.length; i < len; i++) {
              this.items_temp_1.multiple[i].score = this.avg_m_score
              Vue.set(this.items_temp_1.multiple, i, this.items_temp_1.multiple[i])
            }
            for(let i = 0, len = this.items_temp_2.multiple.length; i < len; i++) {
              if(!this.items_temp_2.multiple[i].sub) {
                this.items_temp_2.multiple[i].score = this.avg_m_score
                Vue.set(this.items_temp_2.multiple, i, this.items_temp_2.multiple[i])
              }
            }
            break
          case 'blank':
            this.avg_b_score = String(this.avg_b_score).replace(/[^\d]/g, '')
            if(this.avg_b_score.length > 0) {
              if(this.avg_b_score[0] == 0) {
                this.avg_b_score = this.avg_b_score.substring(1)
              }
            }
            for(let i = 0, len = this.items_temp_1.blank.length; i < len; i++) {
              this.items_temp_1.blank[i].score = this.avg_b_score
              Vue.set(this.items_temp_1.blank, i, this.items_temp_1.blank[i])
            }
            for(let i = 0, len = this.items_temp_2.blank.length; i < len; i++) {
              if(!this.items_temp_2.blank[i].sub) {
                this.items_temp_2.blank[i].score = this.avg_b_score
                Vue.set(this.items_temp_2.blank, i, this.items_temp_2.blank[i])
              }
            }
            break
          case 'resolve':
            this.avg_r_score = String(this.avg_r_score).replace(/[^\d]/g, '')
            if(this.avg_r_score.length > 0) {
              if(this.avg_r_score[0] == 0) {
                this.avg_r_score = this.avg_r_score.substring(1)
              }
            }
            for(let i = 0, len = this.items_temp_1.resolve.length; i < len; i++) {
              this.items_temp_1.resolve[i].score = this.avg_r_score
              Vue.set(this.items_temp_1.resolve, i, this.items_temp_1.resolve[i])
            }
            for(let i = 0, len = this.items_temp_2.resolve.length; i < len; i++) {
              if(!this.items_temp_2.resolve[i].sub) {
                this.items_temp_2.resolve[i].score = this.avg_r_score
                Vue.set(this.items_temp_2.resolve, i, this.items_temp_2.resolve[i])
              }
            }
            break
        }
      },
      set_item_score(item, index, type) {
        item.score = String(item.score).replace(/[^\d]/g, '')
        if(item.score.length > 0) {
          if(item.score[0] == 0) {
            item.score = item.score.substring(1)
          }
        }
        if(item.sub) {
          let sup_score = 0
          let temp = ''
          for(let i = 0, len = this.items_temp_2[type].length; i < len; i++) {
            if(this.items_temp_2[type][i].id == item.supId) {
              temp = i
            }
            if(this.items_temp_2[type][i].supId == item.supId) {
              sup_score += Number(this.items_temp_2[type][i].score ? this.items_temp_2[type][i].score : 0)
            }
          }
          this.items_temp_2[type][temp].score = sup_score
          for(let i = 0, len = this.items_temp_1[type].length; i < len; i++) {
            if(this.items_temp_1[type][i].id == item.supId) {
              Vue.set(this.items_temp_1[type], i, this.items_temp_2[type][temp])
              break
            }
          }
          for(let i = 0, len = this.items_temp_2[type].length; i < len; i++) {
            if(this.items_temp_2[type][i].id == item.supId) {
              Vue.set(this.items_temp_2[type], i, this.items_temp_2[type][temp])
              break
            }
          }
        } else {
          for(let i = 0, len = this.items_temp_1[type].length; i < len; i++) {
            if(this.items_temp_1[type][i].id == item.id) {
              Vue.set(this.items_temp_1[type], i, item)
              break
            }
          }
          for(let i = 0, len = this.items_temp_2[type].length; i < len; i++) {
            if(this.items_temp_2[type][i].id == item.id) {
              Vue.set(this.items_temp_2[type], i, item)
              break
            }
          }
        }
      },
      set_item_index(item, index, type) {
        for(let i = 0, len = this.items_temp_1[type].length; i < len; i++) {
          if(this.items_temp_1[type][i].id == item.id) {
            Vue.set(this.items_temp_1[type], i, item)
            break
          }
        }
        for(let i = 0, len = this.items_temp_2[type].length; i < len; i++) {
          if(this.items_temp_2[type][i].id == item.id) {
            Vue.set(this.items_temp_2[type], i, item)
            break
          }
        }
      },
      confirm_score() {
        this.change_index = false
        this.set_score_dialog = false
        this.item_basket = this.items_temp_1
      },
      drag_move(newIndex, oldIndex, event) {
        this.change_index = true
      },
      save_paper() {
        if(this.change_index) {
          this.$message({
            showClose: true,
            message: '请先重新点击分值设置进行确认！',
            type: 'warning'
          })
          return
        }
        if(this.basket_length == 0) {
          this.$message({
            showClose: true,
            message: '试题为空，不能进行保存！',
            type: 'warning'
          })
          return
        }
        if($('#name').html() == '' || $('#name').html() == undefined) {
          this.$message({
            showClose: true,
            message: '试卷的主标题不能为空！',
            type: 'warning'
          })
          return
        }
        this.createPaperInfo()
      },
      sleep(ms){
        return new Promise(resolve => setTimeout(resolve, ms))
      },
      async createPaperInfo() {
        this.scopeDataList = []
        this.scopeData = ''
        let answerTokinaga = 0, hasSubjective = 2, question = '', attentionMsg, entryBarFlag, name, paperInfoBar, partOneMsg, partOneNote, partTwoMsg, partTwoNote, phaseId = 2, secrecyMark, subTitle, typeFourNote, typeOneNote, typeThreeNote, typeTwoNote;
        //  注意事项
        if(this.structureStatuses.noticeCheck){
          attentionMsg = $('#attentionMsg').html();
        }
        //  学生输入栏
        if(this.structureStatuses.studentInputCheck){
          entryBarFlag = $('#entryBarFlag').text();
        }
        //  试卷主标题
        name = $('#name').text();
        //  试卷信息栏
        if(this.structureStatuses.paperInfoCheck){
          paperInfoBar = $('#paperInfoBar').text();
        }
        //  分卷及注释
        if(this.structureStatuses.subsectionCheck){
          partOneMsg = $('#partOneMsg').text();
          partOneNote = $('#partOneNote').text();
          partTwoMsg = $('#partTwoMsg').text();
          partTwoNote = $('#partTwoNote').text();
        }
        if(this.selectGradeId == 110 || this.selectGradeId == 111 || this.selectGradeId == 112){
          phaseId = 3;
        }
        //  保密标记
        if(this.structureStatuses.secretCheck){
          secrecyMark = $('#secrecyMark').text();
        }
        //  副标题
        if(this.structureStatuses.subtitleCheck){
          subTitle = $('#subTitle').text();
        }
        //  大题及注释
        if(this.structureStatuses.topicCheck){
          typeOneNote = $('#typeOneNote').text();
          typeTwoNote = $('#typeTwoNote').text();
          typeThreeNote = $('#typeThreeNote').text();
          typeFourNote = $('#typeFourNote').text();
        }
        if(this.show_sub_item){
          for(let i = 0, len = this.items_temp_2.single.length; i < len; i++) {
            if(this.items_temp_2.single[i].index == '') {
              this.$message({
                showClose: true,
                message: '不能存在试题的题号为空，请您确认一下！',
                type: 'warning'
              })
              return
            }
            if(!this.items_temp_2.single[i].score){
              this.$message({
                showClose: true,
                message: '不能存在试题的分数为空或者0分，请您确认一下！',
                type: 'warning'
              })
              return
            }
            answerTokinaga += Number(this.items_temp_2.single[i].spenttime)
            if(!this.items_temp_2.single[i].sub){
              if(this.items_temp_2.single[i].select_data){
                for(let t = 0, len = this.items_temp_2.single[i].select_data.length; t < len; t++){
                  if(!this.scopeDataList.includes(this.items_temp_2.single[i].select_data[t])){
                    this.scopeDataList.push(this.items_temp_2.single[i].select_data[t])
                  }
                }
              }
            }
            question += i + ',' + this.items_temp_2.single[i].index + '@' + this.items_temp_2.single[i].id + '@' + this.items_temp_2.single[i].score + ';'
          }
          for(let i = 0, len = this.items_temp_2.multiple.length; i < len; i++) {
            if(this.items_temp_2.multiple[i].index == '') {
              this.$message({
                showClose: true,
                message: '不能存在试题的题号为空，请您确认一下！',
                type: 'warning'
              })
              return
            }
            if(this.items_temp_2.multiple[i].score == ''){
              this.$message({
                showClose: true,
                message: '不能存在试题的分数为空或者0分，请您确认一下！',
                type: 'warning'
              })
              return
            }
            answerTokinaga += Number(this.items_temp_2.multiple[i].spenttime)
            if(!this.items_temp_2.multiple[i].sub){
              if(this.items_temp_2.multiple[i].select_data){
                for(let t = 0, len = this.items_temp_2.multiple[i].select_data.length; t < len; t++){
                  if(!this.scopeDataList.includes(this.items_temp_2.multiple[i].select_data[t])){
                    this.scopeDataList.push(this.items_temp_2.multiple[i].select_data[t])
                  }
                }
              }
            }
            question += i + ',' + this.items_temp_2.multiple[i].index + '@' + this.items_temp_2.multiple[i].id + '@' + this.items_temp_2.multiple[i].score + ';'
          }
          for(let i = 0, len = this.items_temp_2.blank.length; i < len; i++) {
            if(this.items_temp_2.blank[i].index == '') {
              this.$message({
                showClose: true,
                message: '不能存在试题的题号为空，请您确认一下！',
                type: 'warning'
              })
              return
            }
            if(this.items_temp_2.blank[i].score == ''){
              this.$message({
                showClose: true,
                message: '不能存在试题的分数为空或者0分，请您确认一下！',
                type: 'warning'
              })
              return
            }
            answerTokinaga += Number(this.items_temp_2.blank[i].spenttime)
            if(!this.items_temp_2.blank[i].sub){
              if(this.items_temp_2.blank[i].select_data){
                for(let t = 0, len = this.items_temp_2.blank[i].select_data.length; t < len; t++){
                  if(!this.scopeDataList.includes(this.items_temp_2.blank[i].select_data[t])){
                    this.scopeDataList.push(this.items_temp_2.blank[i].select_data[t])
                  }
                }
              }
            }
            question += i + ',' + this.items_temp_2.blank[i].index + '@' + this.items_temp_2.blank[i].id + '@' + this.items_temp_2.blank[i].score + ';'
          }
          for(let i = 0, len = this.items_temp_2.resolve.length; i < len; i++) {
            if(this.items_temp_2.resolve[i].index == '') {
              this.$message({
                showClose: true,
                message: '不能存在试题的题号为空，请您确认一下！',
                type: 'warning'
              })
              return
            }
            if(this.items_temp_2.resolve[i].score == ''){
              this.$message({
                showClose: true,
                message: '不能存在试题的分数为空或者0分，请您确认一下！',
                type: 'warning'
              })
              return
            }
            answerTokinaga += Number(this.items_temp_2.resolve[i].spenttime)
            if(!this.items_temp_2.resolve[i].sub){
              if(this.items_temp_2.resolve[i].select_data){
                for(let t = 0, len = this.items_temp_2.resolve[i].select_data.length; t < len; t++){
                  if(!this.scopeDataList.includes(this.items_temp_2.resolve[i].select_data[t])){
                    this.scopeDataList.push(this.items_temp_2.resolve[i].select_data[t])
                  }
                }
              }
            }
            question += i + ',' + this.items_temp_2.resolve[i].index + '@' + this.items_temp_2.resolve[i].id + '@' + this.items_temp_2.resolve[i].score + ';'
          }
        } else {
          for(let i = 0, len = this.items_temp_1.single.length; i < len; i++) {
            if(this.items_temp_1.single[i].index == '') {
              this.$message({
                showClose: true,
                message: '不能存在试题的题号为空，请您确认一下！',
                type: 'warning'
              })
              return
            }
            if(this.items_temp_1.single[i].score == ''){
              this.$message({
                showClose: true,
                message: '不能存在试题的分数为空或者0分，请您确认一下！',
                type: 'warning'
              })
              return
            }
            answerTokinaga += Number(this.items_temp_1.single[i].spenttime)
            if(this.items_temp_1.single[i].select_data){
              for(let t = 0, len = this.items_temp_1.single[i].select_data.length; t < len; t++){
                if(!this.scopeDataList.includes(this.items_temp_1.single[i].select_data[t])){
                  this.scopeDataList.push(this.items_temp_1.single[i].select_data[t])
                }
              }
            }
            question += (i + 1) + ',' + this.items_temp_1.single[i].index + '@' + this.items_temp_1.single[i].id + '@' + this.items_temp_1.single[i].score + ';'
          }
          for(let i = 0, len = this.items_temp_1.multiple.length; i < len; i++) {
            if(this.items_temp_1.multiple[i].index == '') {
              this.$message({
                showClose: true,
                message: '不能存在试题的题号为空，请您确认一下！',
                type: 'warning'
              })
              return
            }
            if(this.items_temp_1.multiple[i].score == ''){
              this.$message({
                showClose: true,
                message: '不能存在试题的分数为空或者0分，请您确认一下！',
                type: 'warning'
              })
              return
            }
            answerTokinaga += Number(this.items_temp_1.multiple[i].spenttime)
            if(this.items_temp_1.multiple[i].select_data){
              for(let t = 0, len = this.items_temp_1.multiple[i].select_data.length; t < len; t++){
                if(!this.scopeDataList.includes(this.items_temp_1.multiple[i].select_data[t])){
                  this.scopeDataList.push(this.items_temp_1.multiple[i].select_data[t])
                }
              }
            }
            question += (i + 1) + ',' + this.items_temp_1.multiple[i].index + '@' + this.items_temp_1.multiple[i].id + '@' + this.items_temp_1.multiple[i].score + ';'
          }
          for(let i = 0, len = this.items_temp_1.blank.length; i < len; i++) {
            if(this.items_temp_1.blank[i].index == '') {
              this.$message({
                showClose: true,
                message: '不能存在试题的题号为空，请您确认一下！',
                type: 'warning'
              })
              return
            }
            if(this.items_temp_1.blank[i].score == ''){
              this.$message({
                showClose: true,
                message: '不能存在试题的分数为空或者0分，请您确认一下！',
                type: 'warning'
              })
              return
            }
            answerTokinaga += Number(this.items_temp_1.blank[i].spenttime)
            if(this.items_temp_1.blank[i].select_data){
              for(let t = 0, len = this.items_temp_1.blank[i].select_data.length; t < len; t++){
                if(!this.scopeDataList.includes(this.items_temp_1.blank[i].select_data[t])){
                  this.scopeDataList.push(this.items_temp_1.blank[i].select_data[t])
                }
              }
            }
            question += (i + 1) + ',' + this.items_temp_1.blank[i].index + '@' + this.items_temp_1.blank[i].id + '@' + this.items_temp_1.blank[i].score + ';'
          }
          for(let i = 0, len = this.items_temp_1.resolve.length; i < len; i++) {
            if(this.items_temp_1.resolve[i].index == '') {
              this.$message({
                showClose: true,
                message: '不能存在试题的题号为空，请您确认一下！',
                type: 'warning'
              })
              return
            }
            if(this.items_temp_1.resolve[i].score == ''){
              this.$message({
                showClose: true,
                message: '不能存在试题的分数为空或者0分，请您确认一下！',
                type: 'warning'
              })
              return
            }
            answerTokinaga += Number(this.items_temp_1.resolve[i].spenttime)
            if(this.items_temp_1.resolve[i].select_data){
              for(let t = 0, len = this.items_temp_1.resolve[i].select_data.length; t < len; t++){
                if(!this.scopeDataList.includes(this.items_temp_1.resolve[i].select_data[t])){
                  this.scopeDataList.push(this.items_temp_1.resolve[i].select_data[t])
                }
              }
            }
            question += (i + 1) + ',' + this.items_temp_1.resolve[i].index + '@' + this.items_temp_1.resolve[i].id + '@' + this.items_temp_1.resolve[i].score + ';'
          }
        }
        if(question == '') {
          this.$message({
            showClose: true,
            message: '请先重新点击分值设置进行确认！',
            type: 'warning'
          })
          return
        }
        question = question.substring(0, question.length - 1);
        this.scopeData = this.scopeDataList.join('@')
        /*if(!this.scopeData){
          this.$message({
            showClose: true,
            message: '该套试卷缺少章节知识点信息！',
            type: 'warning'
          })
        }*/
        //await this.sleep(8000)
        let url = '/das/printPaper/createPaperInfo'
        let params = {
          sid: this.global.sid,
          uid: this.global.uid,
          answerTokinaga: answerTokinaga,
          attentionMsg: attentionMsg,
          bigquestionNoteFlag: this.structureStatuses.topicCheck ? 1 : '',
          bigquestionScoreFlag: this.structureStatuses.topicScoreCheck ? 1 : '',
          bindingLineFlag: this.structureStatuses.alurCheck ? 1 : '',  //  装订线标记
          entryBarFlag: entryBarFlag,
          gradeId: this.selectGradeId,
          hasSubjective: hasSubjective,
          materialId: this.materialId,
          name: name,
          paperInfoBar: paperInfoBar,
          paperStatus: 1, //1 正式稿 2 草稿
          paperType: 7,
          partOneMsg: partOneMsg,
          partOneNote: partOneNote,
          partTwoMsg: partTwoMsg,
          partTwoNote: partTwoNote,
          phaseId: phaseId,
          question: question,
          scoreBarFlag: this.structureStatuses.scoreCheck ? 1 : '',
          secrecyMark: secrecyMark,
          semester: this.selectSemesterId,
          source: this.global.name,
          subTitle: subTitle,
          subjectid: this.subjectId,
          subpaperNoteFlag: this.structureStatuses.subsectionCheck ? 1 : '',  //  誊分栏
          typeFourNote: typeFourNote,
          typeOneNote: typeOneNote,
          typeThreeNote: typeThreeNote,
          typeTwoNote: typeTwoNote,
          scopeData: this.scopeData
        }
        let data = await this.api.post(url, params, {loading: true})
        if(data.recode == 0) {
          this.paperId = data.paperid
          this.$message({
            showClose: true,
            message: '试卷保存成功！',
            type: 'success'
          });
        } else {
          this.paperId = ''
          this.$message({
            showClose: true,
            message: '试卷保存失败！',
            type: 'error'
          });
        }
      },
      async getPaperDetail() {
        let url = '/das/printPaper/getPaperDetail'
        let params = {
          sid: this.global.sid,
          uid: this.global.uid,
          paperinfoId: this.paperId
        }
        let data = await this.api.get(url, params, {loading: true})
        if(data) {
          this.paper = data
          this.subjectId = this.paper.subject
          sessionStorage.setItem('cur_subjectId', this.subjectId)
          if(this.subjectId == 1) {
            this.materialId = 2
            sessionStorage.setItem('cur_subjectName', '初中数学')
            this.subjectName = '初中数学'
          } else if (this.subjectId == 2) {
            this.materialId = 15
            sessionStorage.setItem('cur_subjectName', '初中物理')
            this.subjectName = '初中物理'
          } else if (this.subjectId == 10) {
            this.materialId = 113
            sessionStorage.setItem('cur_subjectName', '初中化学')
            this.subjectName = '初中化学'
          } else if (this.subjectId == 11) {
            this.materialId = 123
            sessionStorage.setItem('cur_subjectName', '初中英语')
            this.subjectName = '初中英语'
          } else if (this.subjectId == 8) {
            this.materialId = 85
            sessionStorage.setItem('cur_subjectName', '高中文科数学')
            this.subjectName = '高中文科数学'
          } else if (this.subjectId == 9) {
            this.materialId = 91
            sessionStorage.setItem('cur_subjectName', '高中理科数学')
            this.subjectName = '高中理科数学'
          } else if (this.subjectId == 6) {
            this.materialId = 57
            sessionStorage.setItem('cur_subjectName', '高中物理')
            this.subjectName = '高中物理'
          } else if (this.subjectId == 7) {
            this.materialId = 64
            sessionStorage.setItem('cur_subjectName', '高中化学')
            this.subjectName = '高中化学'
          }
          sessionStorage.setItem('cur_materialId', this.materialId)
          this.paper_name = `${new Date().getFullYear()}年${new Date().getMonth() + 1}月${new Date().getDate()}日xxx${this.subjectName}的组卷`
          this.getmateriallist()
          if (this.subjectId == 1 || this.subjectId == 2 || this.subjectId == 10 || this.subjectId == 11) {
            this.gradeList = [
              {id: 107, name: '初一'},
              {id: 108, name: '初二'},
              {id: 109, name: '初三'}
            ]
          } else {
            this.gradeList = [
              {id: 110, name: '高一'},
              {id: 111, name: '高二'},
              {id: 112, name: '高三'}
            ]
          }
          this.total_score = this.paper.score
          this.selectMaterialId = this.paper.materialid;
          this.selectGradeId = this.paper.grade;
          this.selectSemesterId = this.paper.semester;
          if(this.paper.paperStructure) {
            if (!this.paper.paperStructure.mainTitleFlag) this.structureStatuses.titleCheck = false;
            if (!this.paper.paperStructure.subTitleFlag) this.structureStatuses.subtitleCheck = false;
            if (!this.paper.paperStructure.bindingLineFlag) this.structureStatuses.alurCheck = false;
            if (!this.paper.paperStructure.secrecyMarkFlag) this.structureStatuses.secretCheck = false;
            if (!this.paper.paperStructure.paperInfoBarFlag) this.structureStatuses.paperInfoCheck = false;
            if (!this.paper.paperStructure.entryBarFlag) this.structureStatuses.studentInputCheck = false;
            if (!this.paper.paperStructure.scoreBarFlag) this.structureStatuses.scoreCheck = false;
            if (!this.paper.paperStructure.atentionMsgFlag) this.structureStatuses.noticeCheck = false;
            if (!this.paper.paperStructure.subpaperNoteFlag) this.structureStatuses.subsectionCheck = false;
            if (!this.paper.paperStructure.bigquestionNoteFlag) this.structureStatuses.topicCheck = false; //大题及注释
            if (!this.paper.paperStructure.bigquestionScoreFlag) this.structureStatuses.topicScoreCheck = false;
            $('#subTitle').text(this.paper.paperStructure.subTitle);
            $('#secrecyMark').text(this.paper.paperStructure.secrecyMark);
            $('#paperInfoBar').text(this.paper.paperStructure.paperInfoBar);
            $('#entryBarFlag').text(this.paper.paperStructure.mainTitle);
            $('#attentionMsg').html(this.paper.paperStructure.attentionMsg);
            $('#partOneNote').text(this.paper.paperStructure.partOneNote);
            $('#partOneMsg').text(this.paper.paperStructure.partOneMsg);
            $('#partTwoNote').text(this.paper.paperStructure.partTwoNote);
            $('#partTwoMsg').text(this.paper.paperStructure.partTwoMsg);
            $('#typeOneNote').text(this.paper.paperStructure.typeOneNote);
            $('#typeTwoNote').text(this.paper.paperStructure.typeTwoNote);
            $('#typeThreeNote').text(this.paper.paperStructure.typeThreeNote);
            $('#typeFourNote').text(this.paper.paperStructure.typeFourNote);
          } else {
            this.change_index = true
          }
          $('#name').text(this.paper.name);
          if (this.paper.resultlist && this.paper.resultlist.length > 0) {
            for (let i = 0; i < this.paper.resultlist.length; i++) {
              this.paper.resultlist[i].title = formatPToSpan2(formatPToSpan(this.paper.resultlist[i].text));
              if (this.paper.resultlist[i].answers && this.paper.resultlist[i].answers.length > 0) {
                for (let j = 0; j < this.paper.resultlist[i].answers.length; j++) {
                  if (this.paper.resultlist[i].qtype == 1 || this.paper.resultlist[i].qtype == 2) {
                    if (j == 0) {
                      this.paper.resultlist[i].answers[j].choice = 'A';
                      if (this.paper.resultlist[i].answers[j].rightanswer == 1) {
                        this.paper.resultlist[i].rightanswer = 'A；';
                      }
                    } else if (j == 1) {
                      this.paper.resultlist[i].answers[j].choice = 'B';
                      if (this.paper.resultlist[i].answers[j].rightanswer == 1) {
                        this.paper.resultlist[i].rightanswer = 'B；';
                      }
                    } else if (j == 2) {
                      this.paper.resultlist[i].answers[j].choice = 'C';
                      if (this.paper.resultlist[i].answers[j].rightanswer == 1) {
                        this.paper.resultlist[i].rightanswer = 'C；';
                      }
                    } else if (j == 3) {
                      this.paper.resultlist[i].answers[j].choice = 'D';
                      if (this.paper.resultlist[i].answers[j].rightanswer == 1) {
                        this.paper.resultlist[i].rightanswer = 'D；';
                      }
                    } else if (j == 4) {
                      this.paper.resultlist[i].answers[j].choice = 'E';
                      if (this.paper.resultlist[i].answers[j].rightanswer == 1) {
                        this.paper.resultlist[i].rightanswer = 'E；';
                      }
                    } else if (j == 5) {
                      this.paper.resultlist[i].answers[j].choice = 'F';
                      if (this.paper.resultlist[i].answers[j].rightanswer == 1) {
                        this.paper.resultlist[i].rightanswer = 'F；';
                      }
                    } else if (j == 6) {
                      this.paper.resultlist[i].answers[j].choice = 'G';
                      if (this.paper.resultlist[i].answers[j].rightanswer == 1) {
                        this.paper.resultlist[i].rightanswer = 'G；';
                      }
                    }
                    this.paper.resultlist[i].answers[j].holeAnwser = this.paper.resultlist[i].answers[j].choice + "." + formatPToSpan(this.paper.resultlist[i].answers[j].answertext);
                    this.paper.resultlist[i].answers[j].holeAnwser = formatPToSpan(this.paper.resultlist[i].answers[j].holeAnwser);
                  }
                }
              }
              this.paper.resultlist[i].number = this.paper.resultlist[i].serialNum;
              let s = 0, m = 0, b = 0, r = 0
              if (this.paper.resultlist[i].qtype == 1) {
                this.paper.resultlist[i].index = Number(this.paper.resultlist[i].num);
                this.paper.resultlist[i].pointList = this.paper.resultlist[i].pointNameList
                this.item_basket.single.push(this.paper.resultlist[i]);
              } else if (this.paper.resultlist[i].qtype == 2) {
                this.paper.resultlist[i].index = Number(this.paper.resultlist[i].num);
                this.paper.resultlist[i].pointList = this.paper.resultlist[i].pointNameList
                this.item_basket.multiple.push(this.paper.resultlist[i]);
              } else if (this.paper.resultlist[i].qtype == 3) {
                this.paper.resultlist[i].index = Number(this.paper.resultlist[i].num);
                this.paper.resultlist[i].pointList = this.paper.resultlist[i].pointNameList
                this.item_basket.blank.push(this.paper.resultlist[i]);
              } else if (this.paper.resultlist[i].qtype == 4) {
                this.paper.resultlist[i].index = Number(this.paper.resultlist[i].num);
                this.paper.resultlist[i].pointList = this.paper.resultlist[i].pointNameList
                this.item_basket.resolve.push(this.paper.resultlist[i]);
              }
            }
          }
        }
      },
      reset_paper() {
        this.item_basket = {
          single: [],
          multiple: [],
          blank: [],
          resolve: []
        }
        $('#name').text(`${new Date().getFullYear()}年${new Date().getMonth() + 1}月${new Date().getDate()}日xxx${this.subjectName}的组卷`);
        $('#subTitle').text('试卷副标题');
        $('#secrecyMark').text('绝密★启用前');
        $('#paperInfoBar').text('考试范围：xxx；考试时间：100分钟；命题人：xxx');
        $('#entryBarFlag').text('学校:___________姓名：___________班级：___________考号：___________');
        $('#attentionMsg').html('1．答题前填写好自己的姓名、班级、考号等信息<br>2．请将答案正确填写在答题卡上');
        $('#partOneNote').text('第I卷（选择题）');
        $('#partOneMsg').text('请点击修改第I卷的文字说明');
        $('#partTwoNote').text('第II卷（非选择题）');
        $('#partTwoMsg').text('请点击修改第II卷的文字说明');
        $('#typeOneNote').text('单选题');
        $('#typeTwoNote').text('多选题');
        $('#typeThreeNote').text('填空题');
        $('#typeFourNote').text('解答题');
        this.structureStatuses = {
          titleCheck: true,
          subtitleCheck: true,
          alurCheck: true,
          secretCheck: true,
          paperInfoCheck: true,
          studentInputCheck: true,
          scoreCheck: true,
          noticeCheck: true,
          subsectionCheck: true,
          topicCheck: true,
          topicScoreCheck: true
        };
      },
      async down_paper() {
        if (!this.paperId) {
          this.$message({
            showClose: true,
            message: '试卷保存成功以后才可以下载！',
            type: 'warning'
          })
          return
        }
        window.open(`http://115.29.177.227:8080/dowload_paper-1.5.1.RELEASE/dowload/${this.global.uid}/${this.paperId}`)
        /*let url = `/dowload_paper-1.5.1.RELEASE/dowload/${this.global.uid}/${this.paperId}`
        let params = {}
        let data = await this.api.get(url, params, {baseUrl: 'http://115.29.177.227:8080'})*/
      }
    },
    directives: {
      'drag': {
        inserted: function (el) {
          let oDiv = el;
          let oDivParent = oDiv.parentNode;
          if(oDivParent){
            oDiv.onmousedown = function(event){
              let disX = event.clientX - oDivParent.offsetLeft;
              let disY = event.clientY - oDivParent.offsetTop;
              document.onmousemove = function(event){
                let l = event.clientX - disX;
                let t = event.clientY - disY;
                if(t < 0){
                  t = 0;
                }
                oDivParent.style.left = l + 'px';
                oDivParent.style.top = t + 'px';
              };
              document.onmouseup = function(){
                document.onmousemove = null;
                document.onmouseup = null;
              }
            }
          }
        }
      }
    }
  }
</script>

<style lang='' scoped>
  .info_box {
    width: 360px;
    float: right;
    border: 1px solid rgb(204, 204, 204);
  }

  .box_header {
    background-color: #0cc3b3;
    color: #fff;
    font-size: 20px;
    text-align: center;
    padding: 10px;
  }

  .pad_20_1 {
    padding: 20px 20px 0;
  }

  .pad_20_1 td {
    width: 160px;
    padding: 4px 0px;
    text-align: left;
  }

  .pad_20_2 {
    padding: 0px 20px 20px;
  }

  .pad_20_2 td {
    width: 160px;
    padding: 4px 0px;
    text-align: left;
  }

  .line {
    height: 0;
    width: 100%;
    border-bottom: 1px dotted rgb(204, 204, 204);
    margin: 10px 0;
  }

  .pointer {
    cursor: pointer;
    margin-left: 10px;
  }

  .pad_20 {
    padding: 20px;
  }

  .pad_20 td {
    width: 160px;
    padding: 4px 0;
  }

  .box_top {
    height: 50px;
    line-height: 50px;
    background-color: rgb(238, 247, 255);
    color: rgb(0, 204, 255);
    padding: 0 20px;
    text-align: center;
  }

  .m_l_10 {
    margin-left: 10px;
  }

  .m_l_20 {
    margin-left: 20px;
  }

  .red {
    color: red;
  }

  .item_type {
    padding: 0 10px 20px;
    border-bottom: 1px dotted rgb(204, 204, 204);
    overflow: hidden;
  }

  .item_type > p {
    height: 40px;
    line-height: 40px;
  }

  .item_type > p a:nth-of-type(1) {
    margin-left: 180px;
  }

  .item_type > p a:nth-of-type(2) {
    margin-left: 15px;
  }

  .item_type > p a {
    cursor: pointer;
    color: #00a8f3;
  }

  .circle {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #C6E5FE;
    text-align: center;
    cursor: pointer;
    line-height: 30px;
    float: left;
    margin: 4px 10px;
  }

  .btn_area {
    height: 60px;
    line-height: 60px;
    text-align: center;
  }

  /*试卷部分样式---之前的*/
  .pull-left {
    float: left;
  }

  .paper {
    width: 92%;
  }

  .pui_marktag {
    font-size: 14px;
    color: #057ee1;
    font-weight: bold;
    cursor: pointer;
    padding-left: 20px;
    line-height: 30px;
    width: 100%;
  }

  .pui_title {
    font-size: 22px;
    font-weight: bold;
    line-height: 40px;
    cursor: pointer;
    color: black;
    width: 100%;
  }

  .pui_subtitle {
    line-height: 30px;
    font-size: 18px;
    cursor: pointer;
    width: 100%;
  }

  .pui_paperinfo {
    text-align: center;
    font-size: 14px;
    color: #333;
    line-height: 48px;
    cursor: pointer;
    width: 100%;
  }

  .pui_studentinput {
    text-align: center;
    font-size: 14px;
    color: #333;
    line-height: 40px;
    cursor: pointer;
    width: 100%;
  }

  .pui_score {
    margin-top: 10px;
    width: 100%;
  }

  .pui_scoretable {
    border: 1px solid #797979;
    margin: 0 auto;
    border-collapse: collapse;
  }

  .paper table {
    background-color: transparent;
    border-spacing: 0;
    border-collapse: collapse;
  }

  .pui_scoretable td {
    border: 1px solid #797979;
    width: 50px;
    height: 25px;
    text-align: center;
  }

  .pui_notice {
    font-size: 14px;
    color: #666666;
    width: 100%;
  }

  .pui_noticetip {
    padding-left: 20px;
  }

  .pui_noticetext {
    padding-left: 20px;
    cursor: pointer;
  }

  .pui_body {
    position: relative;
    padding-bottom: 50px;
    margin-bottom: 50px;
    width: 100%;
  }

  .parthead {
    line-height: 46px;
    font-size: 18px;
    background-color: #ececec;
    text-align: center;
    cursor: pointer;
  }

  .partnote {
    color: #666666;
    font-size: 14px;
    line-height: 32px;
    padding-left: 20px;
    cursor: pointer;
  }

  .score_info {
    border-color: #000;
    color: #000;
  }

  .grade_paper {
    width: 120px;
    height: 50px;
    border: 1px solid gray;
  }

  .m-h-xs {
    margin-right: 5px;
    margin-left: 5px;
  }

  .score_info tr th, .score_info tr td {
    width: 50%;
    height: 50%;
    text-align: center;
    font-weight: 100;
    border: 1px solid #000000;
  }

  .questypename {
    line-height: 28px;
    cursor: pointer;
    font-weight: bold;
  }

  .quesbox {
    margin-bottom: 30px;
    padding-left: 20px;
    position: relative;
    line-height: 30px;
    margin: 5px 0px 0px 3px;
    border: 1px solid #ffffff;
  }

  .quesopmenu {
    clear: both;
    cursor: pointer;
    position: absolute;
    z-index: 199;
    top: -31px;
    right: -1px;
    color: #fff;
    background-color: #0cc3b3;
    padding: 1px 5px;
  }

  .text-center {
    text-align: center;
  }

  .m-h-md {
    margin-right: 20px;
    margin-left: 20px;
  }

  .m-v-md {
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .m-v-sm {
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .pui_marktag:hover, .pui_title:hover, .pui_subtitle:hover, .pui_paperinfo:hover, .pui_studentinput:hover, .pui_noticetext:hover, .parthead:hover, .partnote:hover,
  .questypename:hover {
    background-color: rgb(247, 240, 212);
    border: solid 1px orange;
  }

  .border_1 {
    border: 1px dotted #0cc3b3;
  }

  /*换题样式*/
  .page-btn:hover, .page-btn-select {
    background-color: #00CCFF !important;
    border: #E0E0E0 solid 1px !important;
    color: white;
  }

  .page-btn {
    background-color: white;
    border: #E0E0E0 solid 1px !important;
  }

  .btn {
    font-weight: 500;
    border-radius: 0;
    outline: 0 !important;
  }

  .btn {
    display: inline-block;
    padding: 6px 12px;
    margin-bottom: 0;
    font-size: 14px;
    font-weight: normal;
    line-height: 1.42857143;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-image: none;
    border: 1px solid transparent;
    border-radius: 4px;
  }

  .p-md {
    padding: 20px;
  }

  .m-sm {
    margin: 10px;
  }

  .m-md {
    margin: 20px;
  }

  .text-grey {
    color: #999;
  }

  .func {
    position: fixed;
    top: 30%;
    left: 20px;
    width: 140px;
    border: 1px dotted #0cc3b3;
    z-index: 9999;
  }

  .func li {
    height: 50px;
    line-height: 50px;
    text-align: center;
    border-bottom: 1px dotted #0cc3b3;
    cursor: pointer;
    color: #0cc3b3;
    background-color: #ffffff;
  }

  .func li:last-child {
    border-bottom: 0;
  }

  .func li:nth-of-type(1) {
    background-color: #0cc3b3;
    color: #ffffff;
  }

  /*设置分值*/
  .score_title {
    font-size: 16px;
    font-weight: 600;
    text-align: center;
    min-height: 40px;
    line-height: 40px;
  }
  .table_score{
    width: 100%;
  }
  .table_score th,td{
    text-align: center;
    padding: 4px 0;
  }
  .table_score td input{
    width: 60px;
    text-align: center;
  }
  .table_score .item_score{
    text-align: left;
    padding-left: 20px;
    width: 120px;
  }
  .table_score .item_score input{
    margin-right: 2px;
  }
  .bold{
    font-weight: bold;
  }
  .iconfont{
    margin: 0 4px;
  }
</style>
