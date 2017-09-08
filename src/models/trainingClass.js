/**
 * 培训班
 */
import modelExtend from 'dva-model-extend'
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
      ListData: []
    },
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
    categoryId:''
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
      yield put({
        type: 'updateState',
        payload: {
          classCategory: data.Data,
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
          classType:payload.type,
          categoryId:payload.categoryId,
        }
      });
    },
    *checkUserClass({payload}, {call, put,select}){
      const {trainingId} = payload;
      let data = yield call(checkUserClass, payload);
      data.Type === 0 ? yield put({type: 'updateState', payload: {isEnterClass: false}}) : yield put({type: 'updateState', payload: {isEnterClass: true}});
      const isEnterClass = yield select(state => state.trainingClass.isEnterClass);
      if(isEnterClass){
        window.open(`/classDetail?id=${trainingId}`);
      }else {
        alert('请先加入培训班！')
      }
      /*yield put(routerRedux.push({
        pathname: '/classDetail',
        query: {
          id: trainingId,
        },
      }));*/
    },
    *updateTrainingStudentup({payload}, {call, put}){
      let data = yield call(updateTrainingStudentup, payload);
      alert(data.Message);
    },
    *updateTrainingStudentdown({payload}, {call, put}){
      let data = yield call(updateTrainingStudentdown, payload);
      alert(data.Message);
    },
  },
  subscriptions: {
    setup({dispatch, history}) {
      dispatch({type: 'getTrainingClassTypeList'});
      dispatch({type: 'classMy'});
      dispatch({type: 'classActive'});
      dispatch({type: 'classRecent'});
      dispatch({type: 'getClassList', payload: {rows: 10, type: 'just'}});
    }
  },
});
