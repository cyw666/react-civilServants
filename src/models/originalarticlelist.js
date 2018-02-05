/*
* 原创文章列表(学员心声)
* */
import modelExtend from 'dva-model-extend'
import model from './common'
import { originalArticleList } from '../services/'

export default modelExtend(model, {
  namespace: 'originalArticleList',
  state: {
    originalData: {
      ListData: []
    },
    pageConfig: {
      current: 1,
      pageSize: 10,
      total: 0
    },
  },
  reducers: {
    updatePollParams(state, { payload }) {
      return {
        ...state,
        pollParams: { ...state.pollParams, ...payload }
      }
    },
  },
  effects: {
    * getOriginalArticleList({ payload }, { call, put }) {
      let data = yield call(originalArticleList, payload);
      yield put({
        type: 'updateState',
        payload: {
          originalData: data.Data,
          pageConfig: {
            current: data.Data.Page,
            pageSize: data.Data.Rows,
            total: data.Data.Count
          }
        }
      });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname, search }) => {
        if (pathname === "/main/originalarticlelist") {
          dispatch({ type: 'setTitle', payload: { title: '学员心声' } });
        }
      });
      dispatch({ type: 'getOriginalArticleList', payload: { page: 1, rows: 10 } });
    }
  }
});
