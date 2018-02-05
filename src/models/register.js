/**
 * 注册
 */
import modelExtend from 'dva-model-extend'
import { routerRedux } from 'dva/router'
import { message } from 'antd'
import model from './common'
import { getGroupList, register, sendMsg } from '../services/'

export default modelExtend(model, {
  namespace: 'register',
  state: {
    confirmDirty: false,
    groupList: [],
    registerModal: false
  },
  reducers: {
    updateGroupList(state, { payload }) {
      return {
        ...state,
        groupList: [ ...payload ]
      }
    },
  },
  effects: {
    * initGroupList({ payload }, { call, put }) {
      let data = yield call(getGroupList, payload);
      let residences = []
      data.forEach((item, index) => {
        residences.push({ value: String(item.id), label: item.text, isLeaf: !item.SunFlag })
      })
      yield put({
        type: 'updateGroupList',
        payload: residences,
      });
    },
    * register({ payload }, { call, put }) {
      let data = yield call(register, payload);
      if (data.Type === 1) {
        message.success(data.Message, 3, yield put(routerRedux.push('/')));
      } else {
        message.error(data.Message);
      }
    },
    * sendMsg({ payload }, { call, put }) {
      let data = yield call(sendMsg, { mobileNo: payload.mobileNo });
      if (data.Type === 1) {
        //验证码发送成功
        payload.callback();
      } else {
        message.error(data.Message);
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === "/main/register") {
          dispatch({ type: 'setTitle', payload: { title: '注册' } });
        }
      });
      dispatch({ type: 'initGroupList' });
    }
  }
});
