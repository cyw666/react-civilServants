/*import fetch from 'dva/fetch';
 
 function parseJSON(response) {
 return response.json();
 }
 
 function checkStatus(response) {
 if (response.status >= 200 && response.status < 300) {
 return response;
 }
 
 const error = new Error(response.statusText);
 error.response = response;
 throw error;
 }
 
 /!**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 *!/
 export default function request(url, options) {
 return fetch(url, options)
 .then(checkStatus)
 .then(parseJSON)
 .then(data => ({ data }))
 .catch(err => ({ err }));
 }*/
import axios from 'axios'
import qs from 'qs'
import {message} from 'antd'
// axios.defaults.baseURL = 'http://192.168.1.25/api';
// axios.defaults.baseURL = 'http://test10.jy365.net/api';
axios.defaults.timeout = 10000;
axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
//拦截器
axios.interceptors.request.use(config => {
  // loading
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.resolve(error.response)
})

function checkStatus(response) {
  // 如果http状态码正常，则直接返回数据
  if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
    // console.log(response);
    return response.data
    // 如果不需要除了data之外的数据，可以直接 return response.data
  }
  // 异常状态下，把错误信息返回去
  return {
    status: -404,
    msg: '网络异常'
  }
}

function checkCode(res) {
  // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
  if (res.status === -404) {
    // console.log(res.msg)
    message.error(res.msg)
  }
  return res
}

export default {
  post(url, data) {
    return axios({
      method: 'post',
      url,
      data: qs.stringify(data),
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  },
  get(url, params) {
    return axios({
      method: 'get',
      url,
      params
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  }
}
