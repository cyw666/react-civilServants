/*全局搜索*/
import modelExtend from 'dva-model-extend'
import model from './common'
import { searchAll } from '../services/'
import { querySearch } from '../utils/utils'

export default modelExtend(model, {
  namespace: 'searchGloable',
  state: {
    searchResult: {
      ListData: []
    },
    searchParams: {
      page: 1,
      key: '',
      rows: 20
    },
    pageConfig: {
      current: 1,
      pageSize: 20,
      total: 0
    },
  },
  reducers: {
    updateSearchResult(state, { payload }) {
      return {
        ...state,
        searchParams: { ...state.searchParams, ...payload }
      }
    },
  },
  effects: {
    * getSearchList({ payload }, { call, put, select }) {
      let searchParams = yield select(state => state.searchGloable.searchParams);
      let params = { ...searchParams, ...payload };
      let data = yield call(searchAll, params);
      yield put({
        type: 'updateState',
        payload: {
          searchResult: data.Data,
          pageConfig: {
            current: data.Data.Page,
            pageSize: data.Data.Rows,
            total: data.Data.Count
          }
        }
      });
      yield put({ type: 'updateSearchResult', payload });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname, search }) => {
        if (pathname === "/main/searchGloable") {
          dispatch({ type: 'setTitle', payload: { title: '全局搜索' } });
        }
        let key = querySearch(search).keyword;
        dispatch({ type: 'getSearchList', payload: { page: 1, rows: 20, key } });
      });
    }
  }
});
