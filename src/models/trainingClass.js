/**
 * 培训班
 */
import modelExtend from 'dva-model-extend'
import {message} from 'antd'
import {model} from './common'

import {
  getTrainingClassTypeList,
  classMy,
  classActive,
  classRecent,
  getClassList,
  checkUserClass,
  updateTrainingStudentup,
  updateTrainingStudentdown,
} from '../services/main';

export default modelExtend(model, {
  namespace: 'trainingClass',
  state: {
    classCategory: {
      ListData: [],
      TitleNav: '班级分类'
    },
    expandedKeys:[],
    classMyData: {
      ListData: [],
      type: 'my'
    },
    classActiveData: {
      ListData: [],
      type: 'active'
    },
    classRecentData: {
      ListData: [],
      type: 'recent'
    },
    classListData: {
      ListData: []
    },
    isEnterClass: false,
    classType: 'just',
    categoryId: ''
  },
  reducers: {
    updateClassMy(state, {payload}){
      return {
        ...state,
        classMyData: {...state.classMyData, ...payload}
      }
    },
    updateActive(state, {payload}){
      return {
        ...state,
        classActiveData: {...state.classActiveData, ...payload}
      }
    },
    updateRecent(state, {payload}){
      return {
        ...state,
        classRecentData: {...state.classRecentData, ...payload}
      }
    },
  },
  effects: {
    *getTrainingClassTypeList({payload}, {call, put}){
      let data = yield call(getTrainingClassTypeList);
      let expandedKeys = [];
      expandedKeys.push((data.Data.ListData[0].id).toString());
      yield put({
        type: 'updateState',
        payload: {
          classCategory: data.Data,
          expandedKeys:expandedKeys
        }
      });
    },
    *classMy({payload}, {call, put}){
      let data = yield call(classMy);
      yield put({
        type: 'updateClassMy',
        payload: data.Data
      });
    },
    *classActive({payload}, {call, put}){
      let data = yield call(classActive);
      yield put({
        type: 'updateActive',
        payload: data.Data
      });
    },
    *classRecent({payload}, {call, put}){
      let data = yield call(classRecent);
      yield put({
        type: 'updateRecent',
        payload: data.Data
      });
    },
    *getClassList({payload}, {call, put}){
      let data = yield call(getClassList, payload);
      yield put({
        type: 'updateState',
        payload: {
          classListData: data.Data,
          classType: payload.type,
          categoryId: payload.categoryId,
        }
      });
    },
    *checkUserClass({payload}, {call, put, select}){
      const {trainingId} = payload;
      let data = yield call(checkUserClass, payload);
      data.Type === 0 ? yield put({
          type: 'updateState',
          payload: {isEnterClass: false}
        }) : yield put({type: 'updateState', payload: {isEnterClass: true}});
      const isEnterClass = yield select(state => state.trainingClass.isEnterClass);
      if (isEnterClass) {
        window.open(`/classDetail?id=${trainingId}`);
      } else {
        message.warning('请先加入培训班！')
      }
      /*yield put(routerRedux.push({
       pathname: '/classDetail',
       query: {
       id: trainingId,
       },
       }));*/
    },
    *updateTrainingStudentup({payload}, {call, put, select}){
      let data = yield call(updateTrainingStudentup, payload);
      if (data.Type === 1) {
        const classType = yield select(state => state.trainingClass.classType);
        message.success(data.Message);
        yield put({
          type: 'getClassList',
          payload: {rows: 10, type: classType}
        })
      } else {
        message.error(data.Message)
      }
    },
    *updateTrainingStudentdown({payload}, {call, put, select}){
      let data = yield call(updateTrainingStudentdown, payload);
      if (data.Type === 1) {
        const classType = yield select(state => state.trainingClass.classType);
        message.success(data.Message);
        yield put({
          type: 'getClassList',
          payload: {rows: 10, type: classType}
        })
      } else {
        message.error(data.Message)
      }
    },
  },
  subscriptions: {
    setup({dispatch, history}) {
      history.listen((location) => {
        if (location.pathname === "/main/trainingClass") {
          dispatch({type: 'getTrainingClassTypeList'});
          dispatch({type: 'getClassList', payload: {rows: 10, type: 'just'}});
        }
      })
      dispatch({type: 'classMy'});
      dispatch({type: 'classActive'});
      dispatch({type: 'classRecent'});
    }
  }
});
