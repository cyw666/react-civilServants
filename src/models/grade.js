/**
 * 班级
 */
import modelExtend from 'dva-model-extend'
import { message } from 'antd'
import model from './common'
import { querySearch } from '../utils/utils'

import {
  classInformation,
  classMy,
  checkUserClass,
} from '../services/';

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
    navData: []
  },
  reducers: {
    updateClassMy(state, { payload }) {
      return {
        ...state,
        classMyData: { ...state.classMyData, ...payload }
      }
    },
  },
  effects: {
    * classMy({ payload }, { call, put }) {
      let data = yield call(classMy);
      yield put({
        type: 'updateClassMy',
        payload: data.Data
      });
    },
    * checkUserClass({ payload }, { call, put, select }) {
      const { trainingId } = payload;
      let data = yield call(checkUserClass, payload);
      data.Type === 0 ? yield put({
        type: 'updateState',
        payload: { isEnterClass: false }
      }) : yield put({ type: 'updateState', payload: { isEnterClass: true } });
      const isEnterClass = yield select(state => state.grade.isEnterClass);
      if (isEnterClass) {
        window.open(`/main/grade/classDetail?id=${trainingId}`);
      } else {
        message.warning('请先加入培训班！')
      }
    },
    * getClassInfo({ payload }, { call, put }) {
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
    setup({ dispatch, history }) {
      history.listen(({ pathname, search }) => {
        if (pathname.indexOf('/main/grade') !== -1) {
          let query = querySearch(search)
          if (search) {
            let search = `?id=${query.id}`
            let navData = [
              { name: "班级首页", pathname: "/main/grade/classDetail", search },
              { name: "教学计划", pathname: "/main/grade/classPlan", search },
              { name: "同学名录", pathname: "/main/grade/classStudent", search },
              { name: "班级论文", pathname: "/main/grade/classPaperList", search },
              { name: "班级话题", pathname: "/main/grade/classTopicList", search },
              { name: "班级公告", pathname: "/main/grade/classNotice", search },
              { name: "必修课程", pathname: "/main/grade/classCourse", search: search + "&type=required" },
              { name: "选修课程", pathname: "/main/grade/classCourse", search: search + "&?type=electives" },
              { name: "班级考试", pathname: "/main/grade/classExam", search },
              { name: "班级相册", pathname: "/main/grade/photoAlbumList", search },
            ];
            dispatch({ type: 'updateState', payload: { classId: query.id } });
            dispatch({ type: 'updateState', payload: { navData } });
            dispatch({ type: 'getClassInfo', payload: { id: query.id } });
          }
        }
      })
      dispatch({ type: 'classMy' });
    }
  }
});
