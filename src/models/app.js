import {message} from 'antd'
import {blogroll, authorization, loginLong, loginOut} from '../services/main'

export default {
  namespace: 'app',
  state: {
    searchText: '',
    blogrollData: {
      ListData: []
    },
    isLoginIn: false,
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
      yield put({
        type: 'updateState',
        payload: {
          blogrollData: data.Data
        }
      });
    },
    * isLoginIn({payload}, {call, put}) {
      let data = yield call(authorization);
      yield put({type: 'updateState', payload: {isLoginIn: data.isauth}});
    },
    * getUserInformation({payload}, {call, put}) {
      let data = yield call(loginLong);
      yield put({type: 'updateState', payload: {userInformation: data.Data}});
    },
    * loginOut({payload}, {call, put}) {
      try {
        let data = yield call(loginOut, payload);
        if (data.Type === 1) {
          yield put({type: 'updateState', payload: {isLoginIn: false}});
          window.location = `${location.origin}/indexPage`
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
      // dispatch({type: 'isLoginIn'});
      dispatch({type: 'getBlogroll'});
      dispatch({type: 'getUserInformation'});
    }
  },
};
