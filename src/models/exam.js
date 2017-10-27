/*考试*/
import modelExtend from 'dva-model-extend'
import {model} from './common'
import {searchAll} from '../services/main'

export default modelExtend(model, {
  namespace: 'exam',
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
    updateSearchResult(state, {payload}){
      return {
        ...state,
        searchParams: {...state.searchParams, ...payload}
      }
    },
  },
  effects: {
    *getSearchList({payload}, {call, put, select}){
      let searchParams = yield select(state => state.searchGloable.searchParams);
      let params = {...searchParams, ...payload};
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
      yield put({type: 'updateSearchResult', payload});
    },
  },
  subscriptions: {
    setup({dispatch, history}) {
      history.listen((location) => {
        let key = location.query.keyword;
        dispatch({type: 'getSearchList', payload: {page: 1, rows: 20, key}});
      })
    }
  }
});
