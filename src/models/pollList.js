/*
* 问卷调查列表
* */
import modelExtend from 'dva-model-extend'
import model from './common'
import { pollList } from '../services/'

export default modelExtend(model, {
  namespace: 'pollList',
  state: {
    pollListData: {
      Model: {
        UnfinishModel: [],
        FinishModel: [],
      },
    },
    pollParams: {
      page: 1,
      rows: 10,
      title: ''
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
    * getPollList({ payload }, { call, put }) {
      let data = yield call(pollList, payload);
      yield put({
        type: 'updateState',
        payload: {
          pollListData: data.Data,
          pageConfig: {
            current: data.Data.UnFinishPage,
            pageSize: data.Data.UnFinishRows,
            total: data.Data.UnFinishCount
          }
        }
      });
      yield put({ type: 'updatePollParams', payload })
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === "/main/pollList") {
          dispatch({ type: 'setTitle', payload: { title: '问卷调查列表' } });
        }
      });
      dispatch({ type: 'getPollList', payload: { page: 1, rows: 10, title: '' } });
      
    }
  }
});
