/**
 * 登陆
 */
import modelExtend from 'dva-model-extend'
import {routerRedux} from 'dva/router'
import {message} from 'antd'
import {model} from './common'
import {login, LoginCode, getVerifyCode,kickOut,userMessage} from '../services/main'
import {getCookie, setCookie, delCookie,queryURL} from '../utils/index'

export default modelExtend(model, {
  namespace: 'login',
  state: {
    loginValue: {
      Account: '',
      PassWord: '',
      RememberMe: true
    },
    showCode: false,
    codeImg:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAAWCAYAAABXEBvcAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAALpSURBVFhH3Vi7ccMwDNU8LjJAJtAYGUIDpE+Vyo1b165Sq3E2SOHS59pNJmAIkKAoCiAhivlcfKfLxyQIPjw8AOrMls+xq9593O3W7e3yZ3XM96vPKHjUPS99qEPAOss5vA6R/7G6CGDrKLaEreteWpqrslUEULJayCjcxlEe/t8yKK0yAezEjxZNNYAtL611rrROClBpX+57AlFrYwHg5NRoBiua8Lf47A/mqjrJrnqzR0HRsQ+yF38fwu6/kI6YNZG+a9jNMhDZdj+YvhmAhBMB2RvzqUL+xxdtZmDw2AOIjAEgT2PVZebMIgAn5lUZlTYRuzcYnTOwbEjWwJSBHkBN8YjyMvGgHsDv0OC4aJD97wPQQj2enH45TezN4V6OEK1w2loPINq5DHh2f7Z2/O9BU/Wu4Mo0VdtXYUEDIVJTURkMJraaljoAlwXlag77qZj1Jwvk02i6R/tTXcgmhCWd07QxqW92j9CMLgB0YCELo+IyXNaEXgegaNGzDuKlq/68pVyhaF5EAlgUaSoqHkRMJ/+BYOS1Sg9gHFiUDWgvgHGUwhw2ytmc7HEmtgFYcgAukbQ2MYBlLuoBJGWYqUOsgeXDxBVbGRiTRD2JkDfXcz8DsSmA2MQ6SWVlVQtgRpMDm4U12xgYx4z0hhjnUxgBDJXYV8RoX3684hmIhQkGE+4VV3zREoBMBrGvoKJpI6WpFkCSGJmBAoDzKrwEcJE3N9s0w8Vu8I0H8B1rt2Oy4AE4uChwJQCTwykgaWBqUlgqtqsBDJMJU0RY0fmwY5sF0F3CtiOvtn98WNH5cFmRTEU1TTYHoqqNwX52+ugnkTiFKa29ZuX13LLNv0Qwx3UzMKUfXAz7wFkR8z1oZTFx7I8fYLyDQwMkrMNslM/3zWvQO64PLE8jcUEovnHJdAGaNyOVWM4ZJWkxYxzvlj001cGkhal9wdDior9hg5MKRRszH6OoD1w3gSyvyzqj8KYlcDXamZ7/BTEJVLcVbV7gAAAAAElFTkSuQmCC'
  },
  reducers: {
    updateGroupList(state, {payload}){
      return {
        ...state,
        groupList: [...payload]
      }
    },
  },
  effects: {
    *getUserCookie({payload}, {call, put}){
      if (getCookie("RB")) {
        let userCookies = getCookie("RB").split('|');
        let RB = userCookies[0];
        let Account = userCookies[1];
        let PassWord = userCookies[2];
        let loginValue = {Account, PassWord, 'RememberMe': true};
        yield put({type: 'updateState', payload: {loginValue}});
      }
    },
    *setUserCookie({payload:values}, {call, put}){
      if (values.RememberMe) {
        var rmString = values.RememberMe + '|' + values.Account + '|' + values.PassWord;
        setCookie("RB", rmString, 7);
      } else {
        delCookie("RB");
        yield put({
          type: 'updateState',
          payload: {
            loginValue: {
              Account: '',
              PassWord: '',
              RememberMe: true
            }
          }
        });
      }
    },
    *kickOut({payload}, {call, put,select}){
      var data = yield call(kickOut, payload);
      if (data.Type == 1) {
        //重新登录
        const loginValue = yield select(state => state.login.loginValue);
        yield put({type:"login",payload:loginValue})
      }
    },
    *login({payload:loginValue}, {call, put, select}){
      let from = queryURL("from");
      try {
        const showCode = yield select(state => state.login.showCode);
        let data;
        if (showCode) {
          data = yield call(LoginCode, loginValue);
        } else {
          data = yield call(login, loginValue);
        }
        if (data.Type == 0) {
          message.error('账号或密码错误！');
          yield put({type:'getVerifyCode'});
        } else if (data.Type == 1) {
          yield put({type:'setUserCookie',payload:loginValue});
          if (from) {
            yield put(routerRedux.push(from))
          } else {
            yield put(routerRedux.push('/indexPage'))
          }
        } else if (data.Type == 2) {
          yield put({type:'setUserCookie',payload:loginValue});
          message.warning("首次登录，请修改密码！");
          yield put(routerRedux.push('/modifyPassword'))
        } else if (data.Type == 3) {
          if (window.confirm("帐号在别的地方登录，是否踢出？")) {
            yield put({type:'kickOut',payload:{kickUserId:data.Message}});
          }
        } else if (data.Type == 4) {
          message.error('此电脑已经有用户登录，您不能用其他帐号再次登录！');
          yield put({type:'getVerifyCode'});
        } else if (data.Type == 5) {
          message.error('平台当前在线人数到达上限，请稍后再试！');
          yield put({type:'getVerifyCode'});
        }else if (data.Type == 6) {
          message.error(data.Message);
          yield put({type:'getVerifyCode'});
        }else if (data.Type == 7) {
          message.error(data.Message);
          yield put({type:'getVerifyCode'});
        }else if (data.Type == 10) {
          message.error("您还不是本平台成员");
          yield put({type:'getVerifyCode'});
        }else if (data.Type == 11) {
          message.error(data.Message);
          yield put({type:'getVerifyCode'});
        }else if (data.Type == 12) {
          message.error(data.Message);
          yield put({type:'getVerifyCode'});
        }else {
          message.error(data.Message);
          yield put({type:'getVerifyCode'});
        }
      } catch (error) {
        throw error;
      }
    },
    *getVerifyCode({payload}, {call, put}){
      let data = yield call(getVerifyCode);
      yield put({type:'updateState',payload:{codeImg:`data:image/png;base64,${data.img}`}})
    },
    *getUserInfo({payload}, {call, put}){
      let data = yield call(userMessage);
      if(data.Data){
        if (data.Data.Model.Name) {
          message.warn('用户已登录！');
          yield put(routerRedux.push('/indexPage'))
        }
      }
    },
  },
  subscriptions: {
    setup({dispatch, history}) {
      history.listen((location)=>{
        if(location.pathname === '/login'){
          dispatch({type: 'getUserInfo'});
          dispatch({type: 'getUserCookie'});
          dispatch({type: 'getVerifyCode'});
        }
      })
    }
  }
});
