import {blogroll,authorization} from '../services/main';
export default {
  namespace: 'app',
  state: {
    searchText:'',
    blogrollData:{
      ListData:[]
    },
    isLoginIn:false
  },
  reducers: {
    updateState (state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },
  effects: {
    *getBlogroll(action, {call, put}){
      let data = yield call(blogroll);
      yield put({
        type: 'updateState',
        payload: {
          blogrollData:data.Data
        }
      });
    },
    *isLoginIn({payload}, {call, put}){
      let data = yield call(authorization);
      yield put({type: 'updateState', payload: {isLoginIn: data.isauth}});
    },
  },
  subscriptions: {
    setup({dispatch, history}) {
      dispatch({type: 'isLoginIn'});
      dispatch({type: 'getBlogroll'});
    }
},
};
