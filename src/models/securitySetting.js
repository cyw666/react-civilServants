/**
 * 设置密保
 */
import modelExtend from 'dva-model-extend'
import {message} from 'antd'
import {model} from './common'
import {setPasswordQuestion, addPasswordQuestion} from '../services/main'

export default modelExtend(model, {
  namespace: 'securitySetting',
  state: {
    pwd: {},
    question: [],
    currentStep: 0
  },
  reducers: {
    nextStep(state, {payload}) {
      return {
        ...state,
        currentStep: state.currentStep + 1
      }
    },
  },
  effects: {
    * setPasswordQuestion({payload}, {call, put}) {
      let data = yield call(setPasswordQuestion, payload);
      if (data.Status === 200) {
        yield put({type: 'updateState', payload: {pwd: payload}});
        yield put({type: 'nextStep'});
        yield put({type: 'updateState', payload: {question: data.Data.Question}});
      } else {
        message.error(data.Message);
      }
    },
    * addPasswordQuestion({payload}, {call, put}) {
      let data = yield call(addPasswordQuestion, payload);
      if (data.Type === 1) {
        message.success(data.Message);
      } else {
        message.error(data.Message);
      }
    },
  },
  subscriptions: {
    setup({dispatch, history}) {
    }
  }
});
