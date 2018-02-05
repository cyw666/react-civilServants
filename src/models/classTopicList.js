/**
 * 班级话题
 */
import modelExtend from 'dva-model-extend'
import model from './common'
import { querySearch } from '../utils/utils'
import { classTopicList } from '../services/';

export default modelExtend(model, {
  namespace: 'classTopicList',
  state: {
    classId: '',
    classTopicListData: {},
    pageOptions: {
      current: 1,
      pageSize: 12,
      total: 0,
    }
  },
  reducers: {
    updatePageOptions(state, { payload }) {
      return {
        ...state,
        pageOptions: { ...state.pageOptions, ...payload }
      }
    },
  },
  effects: {
    * getClassTopicList({ payload }, { call, put, select }) {
      let data = yield call(classTopicList, payload);
      yield put({
        type: 'updateState',
        payload: {
          classTopicListData: data.Data,
        }
      });
      yield put({
        type: 'updatePageOptions',
        payload: {
          current: data.Data.Page,
          pageSize: data.Data.Rows,
          total: data.Data.Count,
        }
      });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      let id;
      history.listen(({ pathname, search }) => {
        if (pathname === "/main/grade/classTopicList") {
          dispatch({ type: 'setTitle', payload: { title: '班级话题' } });
          if (id != querySearch(search).id) {
            id = querySearch(search).id;
            dispatch({ type: 'getClassTopicList', payload: { id } });
            dispatch({ type: 'updateState', payload: { classId: id } });
          }
        }
      });
    }
  }
});
