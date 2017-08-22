import config from './config'
import fetch from './request'


/**
 * 获取cookie
 */
const getCookie = (name) => {
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg)) {
    return unescape(arr[2]);
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
  document.cookie = name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
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
  time = time.match(/\d+/ig)[0];
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
      format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
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
  var outputHtml = "";
  if (status != "null") {
    switch (status) {
      case "Normal":
        outputHtml += "已报名";
        break;
      case "UnAudit":
        outputHtml += "等待审核";
        break;
      case "UnApprove":
        outputHtml += "审核未通过";
        break;
    }
  }
  return outputHtml;
};
const delHtmlTag = (value) => {
  if (!value) return
  var result = value.replace(/<[^>]+>|&nbsp;| /ig,"");//去掉所有的html标记
  return result;
};
module.exports = {
  config,
  fetch,
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
}
