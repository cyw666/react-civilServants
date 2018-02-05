/**
 * 班级详情
 */
import modelExtend from 'dva-model-extend'
import model from './common'
import { classDetail } from '../services/';
import { querySearch } from '../utils/utils'

export default modelExtend(model, {
  namespace: 'classDetail',
  state: {
    classId: '',
    classDetailData: {},
  },
  reducers: {},
  effects: {
    * getClassDetail({ payload }, { call, put, select }) {
      let data = yield call(classDetail, payload);
      yield put({
        type: 'updateState',
        payload: {
          classDetailData: data.Data.Model,
        }
      })
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      let id;
      history.listen(({ pathname, search }) => {
        if (pathname === "/main/grade/classDetail") {
          dispatch({ type: 'setTitle', payload: { title: '班级详情' } });
          if (id != querySearch(search).id) {
            id = querySearch(search).id;
            dispatch({ type: 'getClassDetail', payload: { id } });
            dispatch({ type: 'updateState', payload: { classId: id } });
          }
        }
      });
    }
  }
});
