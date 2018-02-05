/*考试*/
import modelExtend from 'dva-model-extend'
import model from './common'
import { examReview } from '../services/'
import { querySearch } from '../utils/utils'

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
    * getExamReview({ payload }, { call, put, select }) {
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
    setup({ dispatch, history }) {
      history.listen(({ pathname, search }) => {
        let query = querySearch(search);
        if (pathname === '/main/examReview') {
          dispatch({ type: 'setTitle', payload: { title: '考试结果' } });
          dispatch({ type: 'getExamReview', payload: query });
        }
      })
    }
  }
});
