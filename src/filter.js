
/**
 * Created by LC on 2018/9/7.
 */
import Vue from 'vue'
/*过滤器*/
Vue.filter("formatTime", function (value, type) {   //全局方法 Vue.filter() 注册一个自定义过滤器,必须放在Vue实例化前面
  function addZero(val) {
    if (val < 10) {
      return '0' + val
    } else {
      return val
    }
  }

  let dataTime = ''
  let data = new Date()
  data.setTime(value)
  let year = data.getFullYear()
  let month = addZero(data.getMonth() + 1)
  let day = addZero(data.getDate())
  let hour = addZero(data.getHours())
  let minute = addZero(data.getMinutes())
  let second = addZero(data.getSeconds())
  if (type === 'YMD') {
    dataTime = year + '-' + month + '-' + day
  } else if (type === 'YMDHMS') {
    dataTime = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
  } else if (type === 'HMS') {
    dataTime = hour + ':' + minute + ':' + second
  } else if (type === 'YM') {
    dataTime = year + '-' + month
  }
  return dataTime
});
