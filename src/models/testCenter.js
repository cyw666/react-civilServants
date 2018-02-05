/**
 * 考试中心
 */
import modelExtend from 'dva-model-extend'
import model from './common'
import { message } from 'antd'

import {
  examList,
  exam,
} from '../services/';

export default modelExtend(model, {
  namespace: 'testCenter',
  state: {
    examListData: {
      ListData: {
        UnfinishModel: [],
        FinishModel: []
      }
    },
    examParams: {
      page: 1,
      rows: 5,
      examType: 'UnFinish',
      title: ''
    },
    activeKey: 'UnFinish',
    pageConfig: {
      current: 1,
      pageSize: 15,
      unFinishTotal: 0,
      finishTotal: 0,
    },
  },
  reducers: {
    updateExamParams(state, { payload }) {
      return {
        ...state,
        examParams: { ...state.examParams, ...payload }
      }
    },
  },
  effects: {
    * getExamList({ payload }, { call, put }) {
      let data = yield call(examList, payload);
      yield put({
        type: 'updateState',
        payload: {
          examListData: data.Data,
          pageConfig: {
            current: data.Data.UnFinishPage || data.Data.FinishPage,
            pageSize: data.Data.Rows,
            unFinishTotal: data.Data.UnFinishCount,
            finishTotal: data.Data.FinishCount,
          },
        }
      });
      yield put({ type: 'updateExamParams', payload });
    },
    * joinExam({ payload }, { call, put }) {
      let data = yield call(exam, payload);
      if (data.Type) {
        //Type存在，意味着不能考试
        message.info(data.Message);
      } else {
        /*yield put(routerRedux.push({
          pathname: '/main/exam',
          search: `?id=${payload.parameter1}`
        }));*/
        let examHref = `/main/exam?id=${payload.parameter1}`
        window.open(examHref)
      }
    },
    
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === "/main/testCenter") {
          dispatch({ type: 'setTitle', payload: { title: '考试中心' } });
        }
      });
      dispatch({ type: 'getExamList', payload: { page: 1, rows: 5, examType: 'UnFinish', title: '' } });
    }
  }
});
