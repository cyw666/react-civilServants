/*
* 公用model
* */
import { antiForgeryToken } from '../services/';

const model = {
  state: {
    token: {},
  },
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },
  effects: {
    * token(action, { call, put }) {
      let data = yield call(antiForgeryToken);
      yield put({
        type: 'updateState',
        payload: {
          token: data
        }
      });
    },
    * setTitle({ payload }, { call, put }) {
      let title = yield payload.title || "干部教育网络学院";
      window.document.title = title;
    },
  },
  subscriptions: {
    getToken({ dispatch, history }) {
      dispatch({ type: 'token' });
    }
  }
}

export default model
