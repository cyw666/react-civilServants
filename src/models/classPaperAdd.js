/**
 * 添加论文
 */
import modelExtend from 'dva-model-extend'
import { message } from 'antd'
import model from './common'
import { classPaperAdd, classPublishArticle, getTrainingArticleCategory } from '../services/';
import { querySearch } from '../utils/utils'

export default modelExtend(model, {
  namespace: 'classPaperAdd',
  state: {
    classId: '',
    classPaperAddData: {},
    categoryData: []
  },
  reducers: {
    updateCategory(state, { payload }) {
      return {
        ...state,
        categoryData: [ ...state.categoryData, ...payload ]
      }
    },
  },
  effects: {
    * getClassPaperAdd({ payload }, { call, put }) {
      let data = yield call(classPaperAdd, payload);
      yield put({
        type: 'updateState',
        payload: {
          classPaperAddData: data.Data.ViewBag,
        }
      });
    },
    * getCategory({ payload }, { call, put }) {
      let data = yield call(getTrainingArticleCategory, payload);
      yield put({
        type: 'updateCategory',
        payload: data,
      });
    },
    * addPaper({ payload }, { call, put }) {
      let data = yield call(classPublishArticle, payload);
      if (data.Type === 1) {
        message.success(data.Message);
      } else {
        message.error(data.Message);
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      let id;
      history.listen(({ pathname, search }) => {
        if (pathname === "/main/classPaperAdd") {
          dispatch({ type: 'setTitle', payload: { title: '添加论文' } });
          if (id != querySearch(search).id) {
            id = querySearch(search).id;
            dispatch({ type: 'getClassPaperAdd', payload: { id } });
            dispatch({ type: 'getCategory', payload: { type: "paper", trainingId: id } });
            dispatch({ type: 'updateState', payload: { classId: id } });
          }
        }
      });
    }
  }
});
