import axios from 'axios'
import qs from 'qs'
import global from './global'
//import NProgress from 'nprogress'
import {Loading, Message} from 'element-ui'
import router from './router'
//import 'nprogress/nprogress.css'
let loadingInstance
let obj_options = {}
let loadOptions = {
  lock: true,
  text: 'Loading...',
  spinner: 'el-icon-loading',
  background: 'rgba(0, 0, 0, 0.5)'
}
axios.defaults.baseURL = global.jiekou_url
axios.interceptors.request.use(config => {
  if (obj_options instanceof Object && obj_options.loading) {
    loadingInstance = Loading.service(loadOptions)
  }
  //NProgress.start()
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
    if (obj_options instanceof Object && obj_options.loading) {
      loadingInstance.close()
    }
    //NProgress.done()
    return response
  },
  error => {
    if (obj_options instanceof Object && obj_options.loading) {
      loadingInstance.close()
    }
    return Promise.resolve(error.response)

  }
)

function checkStatus(response) {
  if (response) {
    if (response.status === 200 || response.status === 304) {
      return response
    }
  }
  return {
    data: {
      recode: 404,
    }
  }
}

function checkCode(res) {
  if (res.data.recode == 404) {
    Message({
      message: '出现了未知的错误!',
      type: 'warning',
      showClose: true
    })
    return ''
  } else if (res.data.recode == 1) {
    Message.error(res.data.errmsg)
    return ''
  } else if (res.data.recode == 99) {
    Message({
      message: '会话已过期,请重新登录!',
      type: 'warning',
      showClose: true
    })
    setTimeout(function () {
      //location.href = global.return_url
    }, 2000)
    return ''
  } else if (res.data.recode == 0) {
    return res.data
  }
}
var b64 = (function(){
  var PADCHAR = '=';

  var ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

  function getbyte64(s,i) {
    var idx = ALPHA.indexOf(s.charAt(i));
    if (idx == -1) {
      throw "Cannot decode base64";
    }
    return idx;
  }

  function decode(s) {
    // convert to string
    s = "" + s;
    var pads, i, b10;
    var imax = s.length;
    if (imax == 0) {
      return s;
    }

    if (imax % 4 != 0) {
      throw "Cannot decode base64";
    }

    pads = 0;
    if (s.charAt(imax -1) == PADCHAR) {
      pads = 1;
      if (s.charAt(imax -2) == PADCHAR) {
        pads = 2;
      }
      // either way, we want to ignore this last block
      imax -= 4;
    }

    var x = [];
    for (i = 0; i < imax; i += 4) {
      b10 = (getbyte64(s,i) << 18) | (getbyte64(s,i+1) << 12) |
        (getbyte64(s,i+2) << 6) | getbyte64(s,i+3);
      x.push(String.fromCharCode(b10 >> 16, (b10 >> 8) & 0xff, b10 & 0xff));
    }

    switch (pads) {
      case 1:
        b10 = (getbyte64(s,i) << 18) | (getbyte64(s,i+1) << 12) | (getbyte64(s,i+2) << 6);
        x.push(String.fromCharCode(b10 >> 16, (b10 >> 8) & 0xff));
        break;
      case 2:
        b10 = (getbyte64(s,i) << 18) | (getbyte64(s,i+1) << 12);
        x.push(String.fromCharCode(b10 >> 16));
        break;
    }
    return x.join('');
  }

  function getbyte(s,i) {
    var x = s.charCodeAt(i);
    if (x > 255) {
      throw "INVALID_CHARACTER_ERR: DOM Exception 5";
    }
    return x;
  }

  function encode(s) {
    if (arguments.length != 1) {
      throw "SyntaxError: Not enough arguments";
    }

    var i, b10;
    var x = [];

    // convert to string
    s = "" + s;

    var imax = s.length - s.length % 3;

    if (s.length == 0) {
      return s;
    }
    for (i = 0; i < imax; i += 3) {
      b10 = (getbyte(s,i) << 16) | (getbyte(s,i+1) << 8) | getbyte(s,i+2);
      x.push(ALPHA.charAt(b10 >> 18));
      x.push(ALPHA.charAt((b10 >> 12) & 0x3F));
      x.push(ALPHA.charAt((b10 >> 6) & 0x3f));
      x.push(ALPHA.charAt(b10 & 0x3f));
    }
    switch (s.length - imax) {
      case 1:
        b10 = getbyte(s,i) << 16;
        x.push(ALPHA.charAt(b10 >> 18) + ALPHA.charAt((b10 >> 12) & 0x3F) +
          PADCHAR + PADCHAR);
        break;
      case 2:
        b10 = (getbyte(s,i) << 16) | (getbyte(s,i+1) << 8);
        x.push(ALPHA.charAt(b10 >> 18) + ALPHA.charAt((b10 >> 12) & 0x3F) +
          ALPHA.charAt((b10 >> 6) & 0x3f) + PADCHAR);
        break;
    }
    return x.join('');
  }

  return {
    encode: encode,
    decode: decode
  };
})()
export default {
  post(url, data, obj) {
    if (obj instanceof Object) {
      obj_options = obj
    }
    if (obj_options instanceof Object && obj_options.baseUrl) {
      return axios({
        method: 'post',
        url,
        baseURL: obj_options.baseUrl,
        data: qs.stringify(data),
        timeout: 60000,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      }).then(checkStatus).then(checkCode)
    } else {
      return axios({
        method: 'post',
        url,
        data: qs.stringify(data),
        timeout: 60000,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
      }).then(checkStatus).then(checkCode)
    }
  },
  get(url, params, obj) {
    if (obj instanceof Object) {
      obj_options = obj
    }
    if (obj_options instanceof Object && obj_options.baseUrl) {
      return axios({
        method: 'get',
        baseURL: obj_options.baseUrl,
        url,
        params,
        timeout: 60000
      }).then(checkStatus).then(checkCode)
    } else {
      return axios({
        method: 'get',
        url,
        params,
        timeout: 60000
      }).then(checkStatus).then(checkCode)
    }

  },
  b64
}
