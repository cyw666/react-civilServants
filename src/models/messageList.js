/*
* 留言板
* */
import modelExtend from 'dva-model-extend'
import { message } from 'antd'
import model from './common'
import { messageList, getMessageAdd } from '../services/'

export default modelExtend(model, {
  namespace: 'messageList',
  state: {
    messageListData: {
      ListData: []
    },
    pageConfig: {
      current: 1,
      pageSize: 10,
      total: 0
    },
    showModal: false
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
    * getMessageList({ payload }, { call, put }) {
      let data = yield call(messageList, payload);
      yield put({
        type: 'updateState',
        payload: {
          messageListData: data.Data,
          pageConfig: {
            current: data.Data.Page,
            pageSize: data.Data.Rows,
            total: data.Data.Count
          }
        }
      });
    },
    * addMessage({ payload }, { call, put }) {
      let data = yield call(getMessageAdd, payload);
      message.info(data.Message);
      // yield put({type:'updateState',payload:{showModal:false}});
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname, search }) => {
        if (pathname === '/main/messageList') {
          dispatch({ type: 'setTitle', payload: { title: '留言板' } });
        }
      });
      dispatch({ type: 'getMessageList', payload: { page: 1 } });
    }
  }
});
