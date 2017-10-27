/**
 * 修改信息
 */
import modelExtend from 'dva-model-extend'
import {message} from 'antd'
import {routerRedux} from 'dva/router'
import {model} from './common'
import {getUserInfo, getGradeList, updateUserInfo} from '../services/main'

export default modelExtend(model, {
  namespace: 'changeInfor',
  state: {
    userInfo: {
      Account: "",
      Business: "",
      DepartmentId: "",
      Email: "",
      Grade: "",
      GradeId: "",
      GroupName: "",
      Id: 0,
      Mobile: "",
      Name: "",
      NewPwd: "",
      OldPwd: "",
      Sex: "0",
      Tel: "",
    },
    gradeList: {
      GroupInfoList: []
    },
    changeParams: {
      Grade: "",
      Business: "",
      Sex: "",
      Email: "",
      Mobile: "",
      Tel: ""
    }
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
    *getUserInfo({payload}, {call, put}){
      let data = yield call(getUserInfo, payload);
      if (data.Status === 200) {
        yield put({type: 'updateState', payload: {userInfo: data.Data.Model}});
      }
    },
    *getGradeList({payload}, {call, put}){
      let gradeList = yield call(getGradeList, payload);
      yield put({type: 'updateState', payload: {gradeList}});
    },
    *updateUserInfo({payload}, {call, put}){
      let data = yield call(updateUserInfo, payload);
      if (data.Type == 1) {
        message.success(data.Message, 3, yield put(routerRedux.push('/indexPage'))
        );
      } else {
        message.error(data.Message);
      }
      yield put({type: 'updateState', payload: {changeParams: payload}});
    },
  },
  subscriptions: {
    setup({dispatch, history}) {
      history.listen((location) => {
        if (location.pathname === '/main/changeInfor') {
          dispatch({type: 'getUserInfo'});
          dispatch({type: 'getGradeList'});
        }
      })
    }
  }
});
