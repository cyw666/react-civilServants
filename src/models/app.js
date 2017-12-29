import {message} from 'antd'
import {routerRedux} from 'dva/router'
import {blogroll, authorization, loginLong, loginOut} from '../services/main'

export default {
  namespace: 'app',
  state: {
    searchText: '',
    blogrollData: {
      ListData: []
    },
    userInformation: {
      Model: {},
      UserType: ''
    },
  },
  reducers: {
    updateState(state, {payload}) {
      return {
        ...state,
        ...payload,
      }
    },
  },
  effects: {
    * getBlogroll(action, {call, put}) {
      let data = yield call(blogroll);
      if (data && data.Status == 200) {
        yield put({
          type: 'updateState',
          payload: {
            blogrollData: data.Data
          }
        });
      }
      
    },
    * getUserInformation({payload}, {call, put}) {
      let data = yield call(loginLong);
      if (data && data.Status == 200) {
        yield put({type: 'updateState', payload: {userInformation: data.Data}});
      }
    },
    * loginOut({payload}, {call, put}) {
      try {
        let data = yield call(loginOut, payload);
        if (data.Type === 1) {
          yield put(routerRedux.push('/main/indexPage'));
        } else {
          message.error(data.Message);
        }
      }
      catch (error) {
        throw error;
      }
      
    },
  },
  subscriptions: {
    setup({dispatch, history}) {
      history.listen((location) => {
        dispatch({type: 'getUserInformation'});
      })
      dispatch({type: 'getBlogroll'});
    }
  },
};
