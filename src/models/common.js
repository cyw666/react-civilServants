// import modelExtend from 'dva-model-extend'
import {antiForgeryToken} from '../services/main';
const model = {
  state: {
    token: {},
  },
  reducers: {
    updateState (state, {payload}) {
      return {
        ...state,
        ...payload,
      }
    },
  },
  effects: {
    *token(action, {call, put}){
      let data = yield call(antiForgeryToken);
      yield put({
        type: 'updateState',
        payload: {
          token: data
        }
      });
    },
  },
  subscriptions: {
    getToken({dispatch, history}) {
      dispatch({type: 'token'});
    }
  }
}


module.exports = {
  model
}
