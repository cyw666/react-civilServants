/**
 * 考试中心
 */
import modelExtend from 'dva-model-extend'
import {model} from './common'
import {routerRedux} from 'dva/router'
import { createHistory } from 'history'
const history = createHistory()
import {
  examList,
  exam,
} from '../services/main';

export default modelExtend(model, {
  namespace: 'testCenter',
  state: {
    examListData: {
      ListData: {
        UnfinishModel: [],
        FinishModel: []
      }
    },
    examParams:{
      page: 1,
      rows: 5,
      examType: 'UnFinish',
      title: ''
    },
    activeKey:'UnFinish'
  },
  reducers: {
    updateExamParams(state, {payload}){
      return {
        ...state,
        examParams: {...state.examParams, ...payload}
      }
    },
  },
  effects: {
    *getExamList({payload}, {call, put}){
      let data = yield call(examList, payload);
      yield put({
        type: 'updateState',
        payload: {
          examListData: data.Data,
        }
      });
      yield put({type: 'updateExamParams', payload});
    },
    *joinExam({payload}, {call, put}){
      let data = yield call(exam, payload);
      if (data.Type) {
        //Type存在，意味着不能考试
        alert(data.Message);
      } else {
        history.createPath({pathname: '/exam', query: {id: payload.parameter1}});
        // window.open(examHref)
      }
    },
    
  },
  subscriptions: {
    setup({dispatch, history}) {
      dispatch({type: 'getExamList', payload: {page: 1, rows: 5, examType: 'UnFinish', title: ''}});
    }
  },
});
