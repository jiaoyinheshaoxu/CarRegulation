export default {
  sid: '',
  uid: '',
  roleId: '',
  nickName: '',
  roleName: '',
  name: '',
  username: '',
  schoolName: '',
  schoolId: '',
  mobile: '',


  /*上线时需要改动的值(1)a_href; (2)system; (3)jiekou_url; (4)debug_url; (5)LOCAL_URL; (6)ut_url; (7)return_url。一共7个参数需要认真核对*/


  /*-----1-----该变量主要是为了控制功能菜单中a标签的跳转地址*/
  a_href: 2,   //1,http://test.onlyets.com    2,http://kaoshi.emingren.com


  /*-----2-----如果server端是有谱用（YOUPU）,如果server端是睿芽用（RYA）*/
  system: 'YOUPU',  //YOUPU   RYA

  /*-----3-----server端的url*/
  jiekou_url: 'http://das.51youpu.com', //http://das.51youpu.com    http://120.27.195.10:8090
  //jiekou_url: 'http://120.27.195.10:8090',


  /*-----4-----WEB端的url跳转到报告的页面专用，主要是方便测试时才设置的这个值(也是必要的)*/
  //debug_url: 'http://ruiyatest.emingren.cn:9100', //查看报告是需要  睿芽测试
  //debug_url: 'http://zujuantest.emingren.cn:9100', //有谱测试
  //debug_url: 'http://ruiya.emingren.com', //睿芽正式
  debug_url: 'http://zujuan.emingren.com', //有谱正式


  /*-----5-----WEB端的url*/
  //LOCAL_URL: 'http://ruiyatest.emingren.cn:9100', //睿芽测试
  //LOCAL_URL: 'http://zujuantest.emingren.cn:9100', //有谱测试
  //LOCAL_URL: 'http://ruiya.emingren.com', //睿芽正式
  LOCAL_URL: 'http://zujuan.emingren.com', //有谱正式
  //LOCAL_URL: 'http://192.168.1.123:8080',
  //LOCAL_URL: 'http://192.168.1.149:8082',

  /*-----6-----获取ut和errcode所用的url*/
  //ut_url: 'http://test.onlyets.com', //睿芽测试
  ut_url: 'http://kaoshi.emingren.com', //有谱组卷正式


  /*----7----退出登陆或者会话过期要返回的地址*/
  //return_url: 'http://test.onlyets.com'   //会话过期时返回的地址   睿芽测试
  return_url: 'http://kaoshi.emingren.com'   //有谱组卷正式
  //return_url: 'http://jc.emingren.com'   //有谱校内正式
}
