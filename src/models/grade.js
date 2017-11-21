/**
 * 班级
 */
import modelExtend from 'dva-model-extend'
import {message} from 'antd'
import {model} from './common'

import {
  classInformation,
  classMy,
  checkUserClass,
} from '../services/main';

export default modelExtend(model, {
  namespace: 'grade',
  state: {
    classInfoData: {
      Model: {},
      ViewBag: {},
    },
    classMyData: {
      ListData: [],
      type: 'my'
    },
    isEnterClass: false,
    classId: '',
    navData: [
      {name: "班级首页", pathname: "/main/grade/classDetail", query: null},
      {name: "教学计划", pathname: "/main/grade/classPlan", query: null},
      {name: "同学名录", pathname: "/main/grade/classStudent", query: null},
      {name: "班级论文", pathname: "/main/grade/classPaperList", query: null},
      {name: "班级话题", pathname: "/main/grade/classTopicList", query: null},
      {name: "班级公告", pathname: "/main/grade/classNotice", query: null},
      {name: "必修课程", pathname: "/main/grade/classCourse", query: {type: "required"}},
      {name: "选修课程", pathname: "/main/grade/classCourse", query: {type: "electives"}},
      {name: "班级考试", pathname: "/main/grade/classExam", query: null},
      {name: "班级相册", pathname: "/main/grade/photoAlbumList", query: null},
    ]
  },
  reducers: {
    updateClassMy(state, {payload}) {
      return {
        ...state,
        classMyData: {...state.classMyData, ...payload}
      }
    },
  },
  effects: {
    * classMy({payload}, {call, put}) {
      let data = yield call(classMy);
      yield put({
        type: 'updateClassMy',
        payload: data.Data
      });
    },
    * checkUserClass({payload}, {call, put, select}) {
      const {trainingId} = payload;
      let data = yield call(checkUserClass, payload);
      data.Type === 0 ? yield put({
        type: 'updateState',
        payload: {isEnterClass: false}
      }) : yield put({type: 'updateState', payload: {isEnterClass: true}});
      const isEnterClass = yield select(state => state.grade.isEnterClass);
      if (isEnterClass) {
        window.open(`/grade/classDetail?id=${trainingId}`);
      } else {
        message.warning('请先加入培训班！')
      }
    },
    * getClassInfo({payload}, {call, put}) {
      let data = yield call(classInformation, payload);
      yield put({
        type: 'updateState',
        payload: {
          classInfoData: data.Data,
        }
      })
    },
  },
  subscriptions: {
    setup({dispatch, history}) {
      let id;
      history.listen((location) => {
        if (id != location.query.id) {
          id = location.query.id;
          dispatch({type: 'getClassInfo', payload: {id}});
          dispatch({type: 'updateState', payload: {classId: id}});
        }
      })
      dispatch({type: 'classMy'});
    }
  }
});
