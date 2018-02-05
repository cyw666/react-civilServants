/*考试*/
import modelExtend from 'dva-model-extend'
import { message } from 'antd'
import { routerRedux } from 'dva/router'
import model from './common'
import { exam, postExam } from '../services/'
import { querySearch } from '../utils/utils'

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
    * getExam({ payload }, { call, put, select }) {
      let data = yield call(exam, payload);
      if (data.Type) {
        //Type存在，意味着不能考试
        alert(data.Message);
        window.close();
      } else {
        yield put({ type: 'updateState', payload: { examData: data.Data } });
      }
    },
    * postExam({ payload }, { call, put, select }) {
      let data = yield call(postExam, payload);
      let parameter1 = yield select(state => state.exam.examData.examid);
      if (data.Type === 1) {
        message.success(data.Message, 2,
          yield put(routerRedux.push({
            pathname: '/main/examReview',
            search: `?parameter1=${parameter1}&parameter2=${data.Value}`
          }))
        );
      } else {
        message.error(data.Message);
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname, search }) => {
        let id = querySearch(search).id;
        if (pathname === '/main/exam') {
          dispatch({ type: 'setTitle', payload: { title: '考试' } });
          dispatch({ type: 'getExam', payload: { parameter1: id } });
        }
      });
    }
  }
});
