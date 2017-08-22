
import * as usersService from '../services/main';
export default {
  namespace: 'products',
  state: [
    {key: '1', name: 'dva', id: 1},
    {key: '2', name: 'antd', id: 2},
  ],
  reducers: {
    delete(state, {payload: id}){
      return state.filter(item => item.id !== id);
    }
  },
  effects: {
    *fetch(action, {call, put}){
      const data = yield call(usersService.query);
      yield put({
        type: 'save',
        payload: data
      });
    }
  },
  subscriptions: {
    setup({dispatch, history}) {
      dispatch({type: 'fetch'});
    },
  },
};
