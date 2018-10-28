<template lang='html'>
  <div class="main">
    <div class="top-nav">
      <ul class="ul-1">
        <li :class="{'click': clickNum == 1}"><a :href="href_obj.href1" @click="btnClick(1)">考试记录</a></li>
        <li :class="{'click': clickNum == 2}" @mouseenter="enterPaper(2)" @mouseleave="leavePaper(2)">
          <a>基础数据</a>
          <ul class="ul-2" :class="{'block': show_ul_2}">
            <li>
              <a :href="href_obj.href2">年级数据库管理</a>
            </li>
            <li>
              <a :href="href_obj.href3">班级数据管理</a>
            </li>
            <li>
              <a :href="href_obj.href4">学生数据管理</a>
            </li>
            <li>
              <a :href="href_obj.href5">教师数据管理</a>
            </li>
          </ul>
        </li>
        <li :class="{'click': clickNum == 3}" @mouseenter="enterPaper(3)" @mouseleave="leavePaper(3)">
          <a>考试中心</a>
          <ul class="ul-2" :class="{'block': show_ul_3}">
            <li>
              <a :href="href_obj.href6">考试信息管理</a>
            </li>
            <li>
              <a :href="href_obj.href7">试卷信息管理</a>
            </li>
            <li>
              <a :href="href_obj.href8">细目表管理</a>
            </li>
            <li>
              <a :href="href_obj.href9">学生成绩管理</a>
            </li>
          </ul>
        </li>
        <li :class="{'click': clickNum == 4 || route_name == '/CombinationPaper/FamousPaper' || route_name == '/CombinationPaper/SelfPaper'}" @mouseenter="enterPaper(4)" @mouseleave="leavePaper(4)">
          <a>组卷中心</a>
          <ul class="ul-2" :class="{'block': show_ul_4}">
            <li>
              <a @click="goFamousPaper()">名师试卷库</a>
            </li>
            <li>
              <a @click="goSelfPaper()">自有试卷库</a>
            </li>
          </ul>
        </li>
        <li :class="{'click': clickNum == 5 || route_name == '/StudyReport/ReportInfo'}" @click="btnClick(5)"><a @click="goStudyReport()">学情报告</a></li>
      </ul>
    </div>
    <div class="views-box">
      <div class="views">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        clickNum: '',
        show_ul_4: false,
        show_ul_3: false,
        show_ul_2: false,
        href_list: [
          {href1: 'http://test.onlyets.com/admin/test/', href2: 'http://test.onlyets.com/CampusManage/BasicDataManage/SchoolBasicInfo/GradeInfoManage.aspx', href3: 'http://test.onlyets.com/CampusManage/BasicDataManage/SchoolBasicInfo/ClassInfoManage.aspx', href4: 'http://test.onlyets.com/CampusManage/BasicDataManage/UserBasicInfo/StudentUserManage.aspx', href5: 'http://test.onlyets.com/CampusManage/BasicDataManage/UserBasicInfo/TeacherUserManage.aspx', href6: 'http://test.onlyets.com/CampusManage/BasicDataManage/ScoreBasicInfo/TestsInfoManage.aspx', href7: 'http://test.onlyets.com/CampusManage/BasicDataManage/ScoreBasicInfo/TestsPaperManage.aspx', href8: 'http://test.onlyets.com/CampusManage/BasicDataManage/ScoreBasicInfo/ListUpdate.aspx', href9: 'http://test.onlyets.com/CampusManage/BasicDataManage/ScoreBasicInfo/StudentSumScoreManage.aspx'},
          {href1: 'http://kaoshi.emingren.com/admin/test', href2: 'http://kaoshi.emingren.com/CampusManage/BasicDataManage/SchoolBasicInfo/GradeInfoManage.aspx', href3: 'http://kaoshi.emingren.com/CampusManage/BasicDataManage/SchoolBasicInfo/ClassInfoManage.aspx', href4: 'http://kaoshi.emingren.com/CampusManage/BasicDataManage/UserBasicInfo/StudentUserManage.aspx', href5: 'http://kaoshi.emingren.com/CampusManage/BasicDataManage/UserBasicInfo/TeacherUserManage.aspx', href6: 'http://kaoshi.emingren.com/CampusManage/BasicDataManage/ScoreBasicInfo/TestsInfoManage.aspx', href7: 'http://kaoshi.emingren.com/CampusManage/BasicDataManage/ScoreBasicInfo/TestsPaperManage.aspx', href8: 'http://kaoshi.emingren.com/CampusManage/BasicDataManage/ScoreBasicInfo/ListUpdate.aspx', href9: 'http://kaoshi.emingren.com/CampusManage/BasicDataManage/ScoreBasicInfo/StudentSumScoreManage.aspx'}
        ],
        href_obj: {
          href1: '',
          href2: '',
          href3: '',
          href4: '',
          href5: '',
          href6: '',
          href7: '',
          href8: '',
          href9: ''
        }
      }
    },
    computed: {
      route_name() {
        return this.$store.state.route_name
      }
    },
    mounted() {
      let index = this.global.a_href
      this.href_obj = this.href_list[index - 1]
    },
    methods: {
      btnClick(num) {
        this.clickNum = num
      },
      enterPaper(num) {
        if (num == 2){
          this.show_ul_2 = true
        } else if (num == 3) {
          this.show_ul_3 = true
        } else if (num == 4) {
          this.show_ul_4 = true
        }
      },
      leavePaper(num) {
        if (num == 2){
          this.show_ul_2 = false
        } else if (num == 3) {
          this.show_ul_3 = false
        } else if (num == 4) {
          this.show_ul_4 = false
        }
      },
      goFamousPaper() {
        this.clickNum = 4
        this.$router.push({path: '/CombinationPaper/FamousPaper'})
      },
      goSelfPaper() {
        this.clickNum = 4
        this.$router.push({path: '/CombinationPaper/SelfPaper'})
      },
      goStudyReport() {
        this.$router.push({path: '/StudyReport/ReportInfo'})
      }
    }
  }
</script>

<style lang=''>
  .main {
    min-height: 600px;
  }
  .views-box {
    padding: 15px 0;
    background-color: #efefef;
    min-height: 600px;
  }
  .views {
    width: 1100px;
    margin: 0 auto;
    background-color: #fff;
    min-height: 600px;
    padding: 12px 20px 30px;
  }
  .top-nav {
    height: 60px;
    background: url(../../assets/images/bg.png) repeat-x;
  }

  .ul-1, li {
    list-style: none;
  }

  .ul-1 {
    width: 1000px;
    height: 60px;
    padding: 0;
    margin: 0;
    margin: 0 auto;
  }

  .ul-1 li {
    font-size: 20px;
    font-weight: 100;
    padding: 0 1px;
    float: left;
    position: relative;
    cursor: pointer;
  }

  .ul-1 li a {
    color: white;
    letter-spacing: 1px;
    display: inline-block;
    height: 60px;
    line-height: 60px;
    padding: 0 20px;
    text-decoration: none;
  }

  .ul-1 li a:hover, .ul-1 li a:visited, .ul-1 li a:active {
    color: white;
    background-color: #11776e;
  }

  .click {
    background-color: #11776e;
  }

  .ul-2 {
    position: absolute;
    top: 60px;
    left: 0px;
    background-color: #EEE;
    overflow: hidden;
    height: auto;
    min-width: 122px;
    display: none;
    z-index: 100;
    border: 1px solid #EEE;
    box-shadow: 0px 0px 1px 0px;
    padding-bottom: 10px;
  }

  .ul-2 li:first-child {
    padding-top: 10px;
    background-color: #EFEFEF;
  }

  .ul-2 li {
    color: #9C9C9C;
    width: 100%;
    background-color: #EFEFEF;
  }

  .ul-2 li a {
    display: block;
    cursor: pointer;
    text-align: center;
    font-size: 14px;
    padding: 0;
    height: auto;
    line-height: normal;
    color: #0CC3B3 !important;
    height: 25px;
    line-height: 25px;
  }
  .ul-2 li a:hover{
    color: #ffffff !important;
  }
  .block {
    display: block;
  }
</style>
