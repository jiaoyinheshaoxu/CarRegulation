import Vue from 'vue'
import Router from 'vue-router'
import Home from '../pages/Home/Home.vue'
import SelfPaper from '../pages/CombinationPaper/SelfPaper/SelfPaper.vue'
import FamousPaper from '../pages/CombinationPaper/FamousPaper/FamousPaper.vue'
import CreateReport from '../pages/StudyReport/CreateReport/CreateReport.vue'
import ReportOption from '../pages/StudyReport/ReportOption/ReportOption.vue'
import SerialDataMatchup from '../pages/StudyReport/SerialDataMatchup/SerialDataMatchup.vue'
import ImportExcel from '../pages/StudyReport/ImportExcel/ImportExcel.vue'
import ViewStudentList from '../pages/StudyReport/ViewStudentList/ViewStudentList.vue'
import Analyse from '../pages/StudyReport/Analyse/Analyse.vue'
import StudentScore from '../pages/StudyReport/StudentScore/StudentScore.vue'
import AbsentStudents from '../pages/StudyReport/AbsentStudents/AbsentStudents.vue'
import ReportInfo from '../pages/StudyReport/ReportInfo/ReportInfo.vue'
import DownReport from '../pages/StudyReport/DownReport/DownReport.vue'
import ItemDetail from '../pages/CombinationPaper/FamousPaper/ItemDetail.vue'
import ItemAnalysis from '../pages/CombinationPaper/FamousPaper/ItemAnalysis.vue'
import PaperAttribute from '../pages/CombinationPaper/FamousPaper/PaperAttribute.vue'
import SelectItem from '../pages/OnlinePaper/SelectItem.vue'
import SeeItemAnalysis from '../pages/OnlinePaper/SeeItemAnalysis.vue'
import SetPaper from  '../pages/OnlinePaper/SetPaper.vue'
Vue.use(Router)

const router = new Router({
  //mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      redirect: '/CombinationPaper/FamousPaper',
      children: [
        {
          path: '/CombinationPaper/FamousPaper',
          name: 'FamousPaper',
          component: FamousPaper
        },
        {
          path: '/CombinationPaper/SelfPaper',
          name: 'SelfPaper',
          component: SelfPaper
        },
        /*试题序号和阅卷数据对应关系*/
        {
          path: '/StudyReport/CreateReport/serialDataMatchup/:paperId',
          name: 'SerialDataMatchup',
          component: SerialDataMatchup
        },
        /*导入excel数据*/
        {
          path: '/StudyReport/CreateReport/importExcel/:join?',
          name: 'importExcel',
          component: ImportExcel
        },
        /*查看学生名单*/
        {
          path: '/StudyReport/CreateReport/ViewStudentList/:classId/:examId',
          name: 'ViewStudentList',
          component: ViewStudentList
        },
        /*试卷分析*/
        {
          path: '/StudyReport/CreateReport/analyse',
          name: 'Analyse',
          component: Analyse
        },
        /*缺考学生*/
        {
          path: '/StudyReport/CreateReport/studentScore/absentStudents/:homeworkId',
          name: 'AbsentStudents',
          component: AbsentStudents
        },
        /*学生得分数据*/
        {
          path: '/StudyReport/CreateReport/studentScore/:homeworkId',
          name: 'StudentScore',
          component: StudentScore
        },
        /*生成报告*/
        {
          path: '/StudyReport/CreateReport/:testId?',
          name: 'CreateReport',
          component: CreateReport
        },
        /*报告设置页面*/
        {
          path: '/StudyReport/reportOption/:examId',
          name: 'ReportOption',
          component: ReportOption
        },
        /*查看报告页面*/
        {
          path: '/StudyReport/DownReport/:examId',
          name: 'DownReport',
          component: DownReport
        },
        /*学情报告首页*/
        {
          path: '/StudyReport/ReportInfo',
          name: 'ReportInfo',
          component: ReportInfo
        }
      ]
    },
    {
      path: '/SelfPaper/ItemDetail/:paperType/:paperId',
      name: 'ItemDetail',
      component: ItemDetail
    },
    {
      path: '/SelfPaper/ItemAnalysis/:paperType/:paperId',
      name: 'ItemAnalysis',
      component: ItemAnalysis
    },
    {
      path: '/SelfPaper/PaperAttribute/:paperType/:paperId',
      name: 'PaperAttribute',
      component: PaperAttribute
    },
    {
      path: '/FamousPaper/ItemDetail/:paperType/:paperId',
      name: 'FamousPaper_ItemDetail',
      component: ItemDetail
    },
    {
      path: '/FamousPaper/PaperAttribute/:paperType/:paperId',
      name: 'FamousPaper_PaperAttribute',
      component: PaperAttribute
    },
    {
      path: '/OnlinePaper/SeeItemAnalysis',
      name: 'SeeItemAnalysis',
      component: SeeItemAnalysis
    },
    {
      path: '/OnlinePaper/SelectItem/:mark?',
      name: 'SelectItem',
      component: SelectItem
    },
    {
      path: '/OnlinePaper/SetPaper/:paperId?',
      name: 'SetPaper',
      component: SetPaper
    }
  ]
})
export default router
