/*平台介绍*/
import modelExtend from 'dva-model-extend'
import {model} from './common'
import {collegeInfo} from '../services/main'

export default modelExtend(model, {
  namespace: 'collegeinfo',
  state: {
    collegeinfoData: {
      ListData: []
    },
  },
  reducers: {
    updateSearchResult(state, {payload}) {
      return {
        ...state,
        searchParams: {...state.searchParams, ...payload}
      }
    },
  },
  effects: {
    * getCollegeinfo({payload}, {call, put}) {
      let data = yield call(collegeInfo, payload);
      yield put({
        type: 'updateState',
        payload: {
          collegeinfoData: data.Data,
        }
      });
    },
  },
  subscriptions: {
    setup({dispatch, history}) {
      dispatch({type: 'getCollegeinfo'});
    }
  }
});
