/**
 * 添加原创文章
 */
import modelExtend from 'dva-model-extend'
import {message} from 'antd'
import {model} from './common'
import {addOriginalArticle} from '../services/main';

export default modelExtend(model, {
  namespace: 'addOriginalArticle',
  state: {
  },
  reducers: {
  },
  effects: {
    * addOriginalArticle({payload}, {call, put}) {
      let data = yield call(addOriginalArticle, payload);
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
