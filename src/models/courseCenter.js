/**
 * 课程中心
 */
import modelExtend from 'dva-model-extend'
import {model} from './common'

import {
  courseCategory,
  courseList,
  addStudyCourse,
  courseClickRank,
} from '../services/main';

export default modelExtend(model, {
  namespace: 'courseCenter',
  state: {
    courseCategory: {
      ListData: [],
      TitleNav: '课程分类'
    },
    baseImageCourse: '',
    courseListData: [],
    channelName: "课程中心",
    courseListParams: {
      page: 1,
      rows: 10,
      teacher: '',
      courseType: 'All',
      channelId: '',
      channelCode: '',
      title: '',
      sort: 'sort',
      order: 'desc',
    },
    courseOptions: [],
    checkedList: [],
    checkAll: false,
    pageConfig: {
      current: 1,
      pageSize: 10,
      total: 0
    },
    courseRankData: {
      ListData: []
    }
  },
  reducers: {
    updateCourseListParams(state, {payload}){
      return {
        ...state,
        courseListParams: {...state.courseListParams, ...payload}
      }
    },
    updateCheckedList(state, {payload}){
      return {
        ...state,
        checkedList: {...state.checkedList, ...payload}
      }
    },
    initCourseListData(state, {payload}){
      let courseOptions = payload.map(item => {
        let option = {label: '', value: item.Id.toString(), disabled: item.Learning >= 0 ? true : false}
        return option
      })
      return {
        ...state,
        courseListData: payload,
        courseOptions,
        checkedList: [],
        checkAll: false
      }
    },
    updateCourseListData(state, {payload}){
      let courseListData = state.courseListData.map(item => {
        return Object.assign({}, item, {checked: payload})
      })
      return {
        ...state,
        courseListData: courseListData
      }
    },
  },
  effects: {
    *getCourseCategory({payload}, {call, put}){
      let data = yield call(courseCategory, payload);
      yield put({
        type: 'updateState',
        payload: {
          courseCategory: data.Data,
        }
      });
    },
    *getCourseList({payload}, {call, put}){
      let data = yield call(courseList, payload);
      yield put({
        type: 'initCourseListData',
        payload: data.Data.ListData,
      });
      yield put({type: 'updateCourseListParams', payload});
      yield put({
        type: 'updateState',
        payload: {
          pageConfig: {
            current: data.Data.Page,
            pageSize: data.Data.Rows,
            total: data.Data.Count
          },
          baseImageCourse: data.Data.ImageCourse,
          channelName: data.Data.ChannelName || '课程中心',
        }
      });
    },
    *addStudyCourse({payload}, {call, put, select}){
      if (payload !== '') {
        let data = yield call(addStudyCourse, payload);
        if (data.Type > 0) {
          alert(data.Message);
          let courseParams = yield select(state => state.courseCenter.courseListParams);
          yield put({type: 'getCourseList', payload: courseParams});
        }
      } else {
        alert("您没有选择可添加的课程！");
      }
      
    },
    *getCourseRank({payload}, {call, put}){
      let data = yield call(courseClickRank, payload);
      yield put({
        type: 'updateState',
        payload: {
          courseRankData: data.Data
        }
      });
    },
  },
  subscriptions: {
    setup({dispatch, history}) {
      history.listen((location) => {
        if (location.pathname = "/courseCenter") {
          let channelId = location.query.channelId;
          debugger
          if (channelId) {
            dispatch({type: 'getCourseList', payload: {channelId}});
          } else {
            dispatch({type: 'getCourseList'});
          }
        }
      })
      dispatch({type: 'getCourseCategory', payload: {page: '', rows: ''}});
      dispatch({type: 'getCourseRank', payload: {page: 1, rows: 10}});
    }
  }
});
