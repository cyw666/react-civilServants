/*考试*/
import modelExtend from 'dva-model-extend'
import {message} from 'antd'
import {model} from './common'
import {examReview} from '../services/main'

export default modelExtend(model, {
  namespace: 'examReview',
  state: {
    examReviewData: {
      Exam: [],
      Type0Questions: [],
      Type1Questions: [],
      Type2Questions: [],
      Type3Questions: [],
      UserExamDetail: [],
      examid: "",
    }
  },
  reducers: {},
  effects: {
    * getExamReview({payload}, {call, put, select}) {
      let data = yield call(examReview, payload);
      yield put({
        type: 'updateState',
        payload: {
          examReviewData: data.Data,
        }
      });
    },
  },
  subscriptions: {
    setup({dispatch, history}) {
      history.listen((location) => {
        let parameter1 = location.query.parameter1;
        let parameter2 = location.query.parameter2;
        if (location.pathname === '/main/examReview') {
          dispatch({type: 'getExamReview', payload: {parameter1, parameter2}});
        }
      })
    }
  }
});
