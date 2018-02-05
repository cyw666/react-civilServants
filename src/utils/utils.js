import queryString from 'query-string'

/**
 * 获取cookie
 */
const getCookie = (name) => {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  arr = document.cookie.match(reg);
  if (arr) {
    return unescape(arr[ 2 ]);
  } else {
    return null;
  }
};
/**
 * 设置cookie
 */
const setCookie = (name, value, expiredays) => {
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + expiredays);
  document.cookie = name + "=" + escape(value) + ((expiredays === null) ? "" : ";expires=" + exdate.toGMTString());
}
/**
 * 删除cookie
 */
const delCookie = (name) => {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = getCookie(name);
  if (cval != null)
    document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}
/**
 * 存储localStorage
 */
const setStore = (name, content) => {
  if (!name) return;
  if (typeof content !== 'string') {
    content = JSON.stringify(content);
  }
  window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
const getStore = (name) => {
  if (!name) return;
  return window.localStorage.getItem(name);
}

/**
 * 删除localStorage
 */
const removeStore = (name) => {
  if (!name) return;
  window.localStorage.removeItem(name);
}
/**
 * 时间过滤 yyyy-MM-dd hh:mm:ss
 */
const dateFilter = (time, format) => {
  if (!time) {
    return
  }
  time = time.match(/\d+/ig)[ 0 ];
  let date = new Date(Number(time));
  var o = {
    "M+": date.getMonth() + 1,                 //月份
    "d+": date.getDate(),                    //日
    "h+": date.getHours(),                   //小时
    "m+": date.getMinutes(),                 //分
    "s+": date.getSeconds(),                 //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    "S": date.getMilliseconds()             //毫秒
  };
  if (/(y+)/.test(format))
    format = format.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(format))
      format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[ k ]) : (("00" + o[ k ]).substr(("" + o[ k ]).length)));
  return format;
}
/**
 * 字数限制
 */
const wordLimit = (text, num) => {
  if (!text) return
  let des = '';
  if (typeof text === "string") {
    if (text.length > num) {
      des = text.substring(0, num) + "...";
      return des;
    } else {
      return text;
    }
  }
}
/**
 * 培训班状态
 */
const JudgeStatus = (status) => {
  var outputHtml;
  if (status != "null") {
    switch (status) {
      case "Normal":
        outputHtml = "已报名";
        break;
      case "UnAudit":
        outputHtml = "等待审核";
        break;
      case "UnApprove":
        outputHtml = "审核未通过";
        break;
      default:
        outputHtml = "";
    }
  }
  return outputHtml;
};
//去掉所有的html标记
const delHtmlTag = (value) => {
  if (!value) return
  var result = value.replace(/<[^>]+>|&nbsp;| /ig, "");
  return result;
};
/**
 * @param   {String}
 * @return  {String}
 */
const queryURL = (name) => {
  let reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i')
  let r = window.location.search.substr(1).match(reg)
  if (r != null) return decodeURI(r[ 2 ])
  return null
}
//考试总分
const examAllScore = (arr) => {
  var sum = 0;
  for (var i = 0; i < arr.length; i++) {
    sum += arr[ i ].Question.Score;
  }
  return sum;
}
//答对题目总数
const countIf = (arr) => {
  var count = 0;
  for (var i = 0; i < arr.length; i++) {
    if (arr[ i ].UserAnswer === arr[ i ].Question.Answer) {
      count++;
    }
  }
  return count;
}
//正确得分
const rightScore = (arr) => {
  var sum = 0;
  for (var i = 0; i < arr.length; i++) {
    sum += arr[ i ].UserScore;
  }
  return sum;
}
/*
 * 将秒数格式化时间
 * @param {Number} seconds: 整数类型的秒数
 * @return {String} time: 格式化之后的时间
 */
const formatTime = (seconds) => {
  var min = Math.floor(seconds / 60),
    second = seconds % 60,
    hour, newMin, time;
  
  if (min > 60) {
    hour = Math.floor(min / 60);
    newMin = min % 60;
  }
  
  if (second < 10) {
    second = '0' + second;
  }
  if (min < 10) {
    min = '0' + min;
  }
  time = hour ? (hour + ':' + newMin + ':' + second) : (min + ':' + second);
  return time;
}
/*全屏*/
const fullScreen = (docElm) => {
  if (docElm.requestFullscreen) {//W3C
    docElm.requestFullscreen();
  } else if (docElm.mozRequestFullScreen) {//FireFox
    docElm.mozRequestFullScreen();
  } else if (docElm.webkitRequestFullScreen) {//Chrome等
    docElm.webkitRequestFullScreen();
  }
  else if (docElm.msRequestFullscreen) {//IE11
    docElm.msRequestFullscreen();
  }
}
/*退出全屏*/
const exitFullScreen = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}
/*退出全屏*/
const querySearch = (search) => {
  let match = queryString.parse(search);
  return match;
}
export {
  getCookie,
  setCookie,
  delCookie,
  setStore,
  getStore,
  removeStore,
  dateFilter,
  wordLimit,
  JudgeStatus,
  delHtmlTag,
  queryURL,
  examAllScore,
  countIf,
  rightScore,
  formatTime,
  fullScreen,
  exitFullScreen,
  querySearch,
}