// import key from 'keymaster';
import modelExtend from 'dva-model-extend';
import { message } from 'antd'
import { routerRedux } from 'dva/router'
import model from './common'
import * as mainService from '../services/';
import { getCookie, setCookie, delCookie } from '../utils/index'

export default modelExtend(model, {
  namespace: 'indexPage',
  state: {
    linkData: {},
    userMessage: {
      Model: {
        Name: true
      }
    },
    loginValue: {
      Account: '',
      PassWord: '',
      RememberMe: true
    },
    showCode: false,
    codeImg: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAAWCAYAAABXEBvcAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAALpSURBVFhH3Vi7ccMwDNU8LjJAJtAYGUIDpE+Vyo1b165Sq3E2SOHS59pNJmAIkKAoCiAhivlcfKfLxyQIPjw8AOrMls+xq9593O3W7e3yZ3XM96vPKHjUPS99qEPAOss5vA6R/7G6CGDrKLaEreteWpqrslUEULJayCjcxlEe/t8yKK0yAezEjxZNNYAtL611rrROClBpX+57AlFrYwHg5NRoBiua8Lf47A/mqjrJrnqzR0HRsQ+yF38fwu6/kI6YNZG+a9jNMhDZdj+YvhmAhBMB2RvzqUL+xxdtZmDw2AOIjAEgT2PVZebMIgAn5lUZlTYRuzcYnTOwbEjWwJSBHkBN8YjyMvGgHsDv0OC4aJD97wPQQj2enH45TezN4V6OEK1w2loPINq5DHh2f7Z2/O9BU/Wu4Mo0VdtXYUEDIVJTURkMJraaljoAlwXlag77qZj1Jwvk02i6R/tTXcgmhCWd07QxqW92j9CMLgB0YCELo+IyXNaEXgegaNGzDuKlq/68pVyhaF5EAlgUaSoqHkRMJ/+BYOS1Sg9gHFiUDWgvgHGUwhw2ytmc7HEmtgFYcgAukbQ2MYBlLuoBJGWYqUOsgeXDxBVbGRiTRD2JkDfXcz8DsSmA2MQ6SWVlVQtgRpMDm4U12xgYx4z0hhjnUxgBDJXYV8RoX3684hmIhQkGE+4VV3zREoBMBrGvoKJpI6WpFkCSGJmBAoDzKrwEcJE3N9s0w8Vu8I0H8B1rt2Oy4AE4uChwJQCTwykgaWBqUlgqtqsBDJMJU0RY0fmwY5sF0F3CtiOvtn98WNH5cFmRTEU1TTYHoqqNwX52+ugnkTiFKa29ZuX13LLNv0Qwx3UzMKUfXAz7wFkR8z1oZTFx7I8fYLyDQwMkrMNslM/3zWvQO64PLE8jcUEovnHJdAGaNyOVWM4ZJWkxYxzvlj001cGkhal9wdDior9hg5MKRRszH6OoD1w3gSyvyzqj8KYlcDXamZ7/BTEJVLcVbV7gAAAAAElFTkSuQmCC',
    noticeData: {
      ListData: []
    },
    newsData: {
      ListData: [
        { Name: '', Description: '' }
      ]
    },
    realTimeData: {
      Model: {}
    },
    courseListData: {
      ListData: []
    },
    courseCategory: {
      ListData: [ { id: '', text: '' } ]
    },
    studySpecialData: {
      ListData: []
    },
    classCategory: {
      ListData: [],
    },
    activeClassId: '1',
    classListData: {
      ListData: []
    },
    groupRankData: {
      ListData: []
    },
    rankUserData: {
      ListData: []
    },
    courseClickData: {
      ListData: []
    },
    bookListData: {
      ListData: []
    },
    /*mock js*/
    tags: null
  },
  reducers: {
    save(state, { payload: list }) {
      return { ...state, linkData: list }
    },
    addUserMessage(state, { payload: userMessage }) {
      return { ...state, userMessage: userMessage }
    }
  },
  effects: {
    * kickOut({ payload }, { call, put, select }) {
      var data = yield call(mainService.kickOut, payload);
      if (data.Type === 1) {
        //重新登录
        const loginValue = yield select(state => state.indexPage.loginValue);
        yield put({ type: "login", payload: loginValue })
      }
    },
    * getVerifyCode({ payload }, { call, put }) {
      let data = yield call(mainService.getVerifyCode);
      yield put({ type: 'updateState', payload: { codeImg: `data:image/png;base64,${data.img}` } })
    },
    * login({ payload: loginValue }, { call, put, select }) {
      try {
        const showCode = yield select(state => state.indexPage.showCode);
        let data;
        if (showCode) {
          data = yield call(mainService.LoginCode, loginValue);
        } else {
          data = yield call(mainService.login, loginValue);
        }
        if (data.Type === 0) {
          message.error('账号或密码错误！');
          yield put({ type: 'getVerifyCode' });
        } else if (data.Type === 1) {
          yield put({ type: 'setUserCookie', payload: loginValue });
          window.location.reload();
        } else if (data.Type === 2) {
          yield put({ type: 'setUserCookie', payload: loginValue });
          message.warning("首次登录，请修改密码！");
          yield put(routerRedux.push('/main/modifyPassword'))
        } else if (data.Type === 3) {
          if (window.confirm("帐号在别的地方登录，是否踢出？")) {
            yield put({ type: 'kickOut', payload: { kickUserId: data.Message } });
          }
        } else if (data.Type === 4) {
          message.error('此电脑已经有用户登录，您不能用其他帐号再次登录！');
          yield put({ type: 'getVerifyCode' });
        } else if (data.Type === 5) {
          message.error('平台当前在线人数到达上限，请稍后再试！');
          yield put({ type: 'getVerifyCode' });
        } else if (data.Type === 6) {
          message.error(data.Message);
          yield put({ type: 'getVerifyCode' });
        } else if (data.Type === 7) {
          message.error(data.Message);
          yield put({ type: 'getVerifyCode' });
        } else if (data.Type === 10) {
          message.error("您还不是本平台成员");
          yield put({ type: 'getVerifyCode' });
        } else if (data.Type === 11) {
          message.error(data.Message);
          yield put({ type: 'getVerifyCode' });
        } else if (data.Type === 12) {
          message.error(data.Message);
          yield put({ type: 'getVerifyCode' });
        } else {
          message.warn(data.Message);
          yield put({ type: 'getVerifyCode' });
        }
      } catch (error) {
        throw error;
      }
    },
    * userMessage(action, { call, put }) {
      let data = yield call(mainService.userMessage);
      yield put({ type: 'addUserMessage', payload: data.Data });
    },
    * loginOut({ payload }, { call, put }) {
      try {
        let data = yield call(mainService.loginOut, payload);
        if (data.Type === 1) {
          yield put(routerRedux.push('/'));
        } else {
          message.warn(data.Message);
        }
      }
      catch (error) {
        throw error;
      }
      
    },
    * getUserCookie({ payload }, { call, put }) {
      if (getCookie("RB")) {
        let userCookies = getCookie("RB").split('|');
        // let RB = userCookies[ 0 ];
        let Account = userCookies[ 1 ];
        let PassWord = userCookies[ 2 ];
        let loginValue = { Account, PassWord, 'RememberMe': true };
        yield put({
          type: 'updateState',
          payload: {
            loginValue
          }
        });
      }
    },
    * setUserCookie({ payload: values }, { call, put }) {
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
    * getNotice({ payload }, { call, put }) {
      let data = yield call(mainService.leftNotice, payload);
      yield put({ type: 'updateState', payload: { noticeData: data.Data } });
    },
    * getNews({ payload }, { call, put }) {
      let data = yield call(mainService.articleList, payload);
      yield put({ type: 'updateState', payload: { newsData: data.Data } });
    },
    * getRealTimeData({ payload }, { call, put }) {
      let data = yield call(mainService.leftRealTimeData, payload);
      yield put({ type: 'updateState', payload: { realTimeData: data.Data } });
    },
    * getCourseList({ payload }, { call, put }) {
      let data = yield call(mainService.courseList, payload);
      yield put({ type: 'updateState', payload: { courseListData: data.Data } });
    },
    * getCourseCategory({ payload }, { call, put }) {
      let data = yield call(mainService.courseCategory, payload);
      let defaultId = data.Data.ListData[ 0 ].id;
      let courseList = yield call(mainService.courseList, { rows: 8, channelId: defaultId });
      yield put({
        type: 'updateState',
        payload: {
          courseCategory: data.Data,
          courseListData: courseList.Data
        }
      });
    },
    * getStudySpecial({ payload }, { call, put }) {
      let data = yield call(mainService.studySpecial, payload);
      yield put({
        type: 'updateState',
        payload: {
          studySpecialData: data.Data
        }
      });
    },
    * getClassCategory({ payload }, { call, put }) {
      let data = yield call(mainService.getTrainingClassTypeList, payload);
      let defaultId = data.Data.ListData[ 0 ].id;
      let classList = yield call(mainService.getClassList, { rows: 6, categoryId: defaultId });
      yield put({
        type: 'updateState',
        payload: {
          classCategory: data.Data,
          activeClassId: defaultId.toString(),
          classListData: classList.Data,
        }
      });
    },
    * getClassList({ payload }, { call, put }) {
      let data = yield call(mainService.getClassList, payload);
      yield put({
        type: 'updateState',
        payload: {
          activeClassId: payload.categoryId,
          classListData: data.Data
        }
      });
    },
    * joinClass({ payload }, { call, put }) {
      let isLogin = yield call(mainService.authorization);
      if (isLogin.isauth) {
        let data = yield call(mainService.updateTrainingStudentup, payload);
        if (data.Type === 1) {
          message.success(data.Message)
        } else {
          message.error(data.Message)
        }
      } else {
        message.error("请登录");
        window.scrollTo(0, 0);
      }
    },
    * getGroupRank({ payload }, { call, put }) {
      let data = yield call(mainService.leftGroupRank, payload);
      yield put({
        type: 'updateState',
        payload: {
          groupRankData: data.Data
        }
      });
    },
    * getRankUser({ payload }, { call, put }) {
      let data = yield call(mainService.rankUserList, payload);
      yield put({
        type: 'updateState',
        payload: {
          rankUserData: data.Data
        }
      });
    },
    * getCourseClick({ payload }, { call, put }) {
      let data = yield call(mainService.courseClickRank, payload);
      yield put({
        type: 'updateState',
        payload: {
          courseClickData: data.Data
        }
      });
    },
    * getBookList({ payload }, { call, put }) {
      let data = yield call(mainService.bookList, payload);
      yield put({
        type: 'updateState',
        payload: {
          bookListData: data.Data
        }
      });
    },
    /*mock js*/
    * getTags({ payload }, { call, put, select }) {
      // let data = yield call(mainService.tags, payload);
      let data = 'tags';
      yield put({
        type: 'updateState', payload: { tags: data }
      });
    },
    
  },
  subscriptions: {
    /*keyboardWatcher({dispatch}) {
     key('⌘+up, ctrl+up', () => {
     dispatch({type: 'add'})
     });
     },*/
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/') {
          dispatch({ type: 'setTitle', payload: { title: '干部教育网络学院-基准' } });
          dispatch({ type: 'getUserCookie' });
          dispatch({ type: 'getVerifyCode' });
          dispatch({ type: 'userMessage' });
        }
      });
      dispatch({ type: 'getTags' });
      dispatch({ type: 'getRealTimeData' });
      dispatch({ type: 'getCourseCategory', payload: { page: 1, rows: 5 } });
      dispatch({ type: 'getStudySpecial', payload: { rows: 3 } });
      dispatch({ type: 'getClassCategory', payload: { rows: 3 } });
      dispatch({ type: 'getNotice', payload: { rows: 3 } });
      dispatch({ type: 'getNews', payload: { rows: 6, categoryCode: 'newsInformation' } });
      dispatch({ type: 'getGroupRank' });
      dispatch({ type: 'getRankUser' });
      dispatch({ type: 'getCourseClick' });
      dispatch({ type: 'getBookList' });
    }
  }
});
