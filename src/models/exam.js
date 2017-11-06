/*考试*/
import modelExtend from 'dva-model-extend'
import {message} from 'antd'
import { routerRedux } from 'dva/router'
import {model} from './common'
import {exam, postExam} from '../services/main'

export default modelExtend(model, {
  namespace: 'exam',
  state: {
    examData: {
      Exam: [],
      Type0Questions: [],
      Type1Questions: [],
      Type2Questions: [],
      Type3Questions: [],
      examid: "",
      isfixed: ""
    }
  },
  reducers: {},
  effects: {
    * getExam({payload}, {call, put, select}) {
      let data = yield call(exam, payload);
      yield put({
        type: 'updateState',
        payload: {
          examData: data.Data,
        }
      });
    },
    * postExam({payload}, {call, put, select}) {
      let data = yield call(postExam, payload);
      let parameter1 = yield select(state => state.exam.examData.examid);
      if(data.Type == 1){
        message.success(data.Message,2,
          yield put(routerRedux.push({
            pathname: '/main/examReview',
            query: {parameter1: parameter1, parameter2: data.Value}
          }))
        );
      }else {
        message.error(data.Message);
      }
    },
  },
  subscriptions: {
    setup({dispatch, history}) {
      history.listen((location) => {
        let id = location.query.id;
        if (location.pathname === '/main/exam') {
          dispatch({type: 'getExam', payload: {parameter1: id}});
        }
      })
    }
  }
});
