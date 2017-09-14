// import key from 'keymaster';
import modelExtend from 'dva-model-extend'
import {model} from './common'
import * as mainService from '../services/main';
import {getCookie, setCookie, delCookie} from '../utils/index'


export default modelExtend(model, {
  namespace: 'indexPage',
  state: {
    isLoginIn: false,
    linkData: {},
    token: {},
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
    noticeData: {
      ListData: []
    },
    newsData: {
      ListData: [
        {Name: '', Description: ''}
      ]
    },
    realTimeData: {
      Model: {}
    },
    courseListData: {
      ListData: []
    },
    courseCategory: {
      ListData: [
        {Id: '', Name: ''}
      ]
    },
    studySpecialData: {
      ListData: []
    },
    classCategory: {
      ListData: [],
    },
    activeClassId: '0',
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
    }
  },
  reducers: {
    save(state, {payload: list}){
      return {...state, linkData: list}
    },
    addToken(state, {payload: token}){
      return {...state, token: token}
    },
    addUserMessage(state, {payload: userMessage}){
      return {...state, userMessage: userMessage}
    }
  },
  effects: {
    *isLoginIn({payload}, {call, put}){
      let data = yield call(mainService.authorization);
      yield put({type: 'updateState', payload: {isLoginIn: data.isauth}});
    },
    
    *login({payload:loginValue}, {call, put}){
      try {
        let data = yield call(mainService.login, loginValue);
        if (data.Type == 0) {
          alert('账号或密码错误！')
        } else if (data.Type == 1) {
          yield put({
            type: 'updateState',
            payload: {
              loginValue
            }
          });
          window.location.reload();
        } else if (data.Type == 2) {
          yield put({
            type: 'updateState',
            payload: {
              loginValue
            }
          });
          alert("首次登录，请修改密码！");
        } else if (data.Type == 3) {
          if (window.confirm("帐号在别的地方登录，是否踢出？")) {
            // kickOut(data.Message);
            return true;
          } else {
            return false;
          }
        } else {
          alert(data.Message);
        }
      } catch (error) {
        throw error;
      }
    },
    *token(action, {call, put}){
      let data = yield call(mainService.antiForgeryToken);
      yield put({type: 'addToken', payload: data});
    },
    *userMessage(action, {call, put}){
      let data = yield call(mainService.userMessage);
      yield put({type: 'addUserMessage', payload: data.Data});
    },
    *loginOut({payload}, {call, put}){
      try {
        let data = yield call(mainService.loginOut, payload);
        if (data.Type === 1) {
          window.location.reload();
        } else {
          alert(data.Message);
        }
      }
      catch (error) {
        throw error;
      }
      
    },
    *getUserCookie({payload}, {call, put}){
      if (getCookie("RB")) {
        let userCookies = getCookie("RB").split('|');
        let RB = userCookies[0];
        let Account = userCookies[1];
        let PassWord = userCookies[2];
        let loginValue = {Account, PassWord, 'RememberMe': true};
        yield put({
          type: 'updateState',
          payload: {
            loginValue
          }
        });
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
    *getNotice({payload}, {call, put}){
      let data = yield call(mainService.leftNotice, payload);
      yield put({
        type: 'updateState',
        payload: {
          noticeData: data.Data
        }
      });
    },
    *getNews({payload}, {call, put}){
      let data = yield call(mainService.articleList, payload);
      yield put({
        type: 'updateState',
        payload: {
          newsData: data.Data
        }
      });
    },
    *getRealTimeData({payload}, {call, put}){
      let data = yield call(mainService.leftRealTimeData, payload);
      yield put({
        type: 'updateState',
        payload: {
          realTimeData: data.Data
        }
      });
    },
    *getCourseList({payload}, {call, put}){
      let data = yield call(mainService.courseList, payload);
      yield put({
        type: 'updateState',
        payload: {
          courseListData: data.Data
        }
      });
    },
    *getCourseCategory({payload}, {call, put}){
      let data = yield call(mainService.courseCategory, payload);
      let defaultId = data.Data.ListData[0].Id;
      let courseList = yield call(mainService.courseList, {rows: 8, channelId: defaultId});
      yield put({
        type: 'updateState',
        payload: {
          courseCategory: data.Data,
          courseListData: courseList.Data
        }
      });
    },
    *getStudySpecial({payload}, {call, put}){
      let data = yield call(mainService.studySpecial, payload);
      yield put({
        type: 'updateState',
        payload: {
          studySpecialData: data.Data
        }
      });
    },
    *getClassCategory({payload}, {call, put}){
      let data = yield call(mainService.getTrainingClassTypeList, payload);
      let defaultId = data.Data.ListData[0].Id;
      let classList = yield call(mainService.getClassList, {rows: 6, categoryId: defaultId});
      yield put({
        type: 'updateState',
        payload: {
          classCategory: data.Data,
          activeClassId: defaultId,
          classListData: classList.Data,
        }
      });
    },
    *getClassList({payload}, {call, put}){
      let data = yield call(mainService.getClassList, payload);
      yield put({
        type: 'updateState',
        payload: {
          activeClassId: payload.categoryId,
          classListData: data.Data
        }
      });
    },
    *joinClass({payload}, {call, put}){
      let data = yield call(mainService.updateTrainingStudentup, payload);
      alert(data.Message);
    },
    *getGroupRank({payload}, {call, put}){
      let data = yield call(mainService.leftGroupRank, payload);
      yield put({
        type: 'updateState',
        payload: {
          groupRankData: data.Data
        }
      });
    },
    *getRankUser({payload}, {call, put}){
      let data = yield call(mainService.rankUserList, payload);
      yield put({
        type: 'updateState',
        payload: {
          rankUserData: data.Data
        }
      });
    },
    *getCourseClick({payload}, {call, put}){
      let data = yield call(mainService.courseClickRank, payload);
      yield put({
        type: 'updateState',
        payload: {
          courseClickData: data.Data
        }
      });
    },
    *getBookList({payload}, {call, put}){
      let data = yield call(mainService.bookList, payload);
      yield put({
        type: 'updateState',
        payload: {
          bookListData: data.Data
        }
      });
    },
    
  },
  subscriptions: {
    /*keyboardWatcher({dispatch}) {
     key('⌘+up, ctrl+up', () => {
     dispatch({type: 'add'})
     });
     },*/
    setup({dispatch, history}) {
      /*return history.listen(({pathname, query}) => {
       if (pathname === '/IndexPage') {
       }
       });*/
      dispatch({type: 'isLoginIn'});
      dispatch({type: 'getUserCookie'});
      dispatch({type: 'token'});
      dispatch({type: 'userMessage'});
      dispatch({type: 'getRealTimeData'});
      dispatch({
        type: 'getNotice',
        payload: {rows: 3}
      });
      dispatch({
        type: 'getNews',
        payload: {rows: 6, categoryCode: 'newsInformation'}
      });
      dispatch({
        type: 'getCourseCategory',
        payload: {page: 1, rows: 5}
      });
      dispatch({
        type: 'getStudySpecial',
        payload: {rows: 3}
      });
      dispatch({
        type: 'getClassCategory',
        payload: {rows: 3}
      });
      dispatch({type: 'getGroupRank'});
      dispatch({type: 'getRankUser'});
      dispatch({type: 'getCourseClick'});
      dispatch({type: 'getBookList'});
    }
  }
});
