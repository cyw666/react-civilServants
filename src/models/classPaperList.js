/**
 * 班级论文
 */
import modelExtend from 'dva-model-extend'
import model from './common'
import { querySearch } from '../utils/utils'
import { classPaperList } from '../services/';

export default modelExtend(model, {
  namespace: 'classPaperList',
  state: {
    classId: '',
    classPaperListData: {},
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
    * getClassPaperList({ payload }, { call, put, select }) {
      let data = yield call(classPaperList, payload);
      yield put({
        type: 'updateState',
        payload: {
          classPaperListData: data.Data,
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
        if (pathname === "/main/grade/classPaperList") {
          dispatch({ type: 'setTitle', payload: { title: '班级论文' } });
          if (id != querySearch(search).id) {
            id = querySearch(search).id;
            dispatch({ type: 'getClassPaperList', payload: { id } });
            dispatch({ type: 'updateState', payload: { classId: id } });
          }
        }
      });
    }
  }
});
