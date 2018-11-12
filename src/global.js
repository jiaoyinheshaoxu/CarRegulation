export default {
  //jiekou_url: 'http://47.92.160.129:8080',
  jiekou_url: 'http://www.chineseautoregs.com:8080',
  userEmail: "",															// 用户邮箱
  userPassword: "",														// 用户密码
  check_strEmpty: check_strEmpty,
  check_numberMixLetter: check_numberMixLetter,
  check_emailValid: check_emailValid,
  memberId: "",																// 用户 id

}

// 公共方法
// 1: 判断是否是空 字符串
function check_strEmpty(str){
	if (str.length ==0 || str.replace(/(^s*)|(s*$)/g, "").length ==0){
		return false;
	}else{
		return true;
	}
}

// 2: 密码判断至少有英文和数字 并且长度在 6-12 位之间
function check_numberMixLetter(str){
	var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,12}$/;
	if(str.match(reg)){
		return true;
	}else{
		return false;
	}
}

// 3: 邮箱正则判断
function check_emailValid(str){
	var reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
	if(!reg.test(str)){
　　return false;
　}else{
　　return true;
　}
}

// 4:
