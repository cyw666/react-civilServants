/**
 * 修改密码
 */
import modelExtend from 'dva-model-extend'
import {message} from 'antd'
import {model} from './common'
import {updatePwd} from '../services/main'

export default modelExtend(model, {
  namespace: 'modifyPassword',
  state: {
    pwdParams: {
      newPwd: '',
      oldPwd: ''
    },
  },
  reducers: {},
  effects: {
    *updatePwd({payload}, {call, put}){
      let data = yield call(updatePwd, payload);
      if (data.Type === 1) {
        message.success(data.Message);
      } else {
        message.error(data.Message);
      }
      yield put({type: 'updateState', payload: {pwdParams: payload}});
    },
  },
  subscriptions: {
    setup({dispatch, history}) {
    }
  }
});
