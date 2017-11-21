/**
 * 添加话题
 */
import modelExtend from 'dva-model-extend'
import {message} from 'antd'
import {model} from './common'
import {classTopicAdd, classPublishArticle, getTrainingArticleCategory} from '../services/main';

export default modelExtend(model, {
  namespace: 'classTopicAdd',
  state: {
    classId: '',
    classTopicAddData: {},
    categoryData: []
  },
  reducers: {
    updateCategory(state, {payload}) {
      return {
        ...state,
        categoryData: [...state.categoryData, ...payload]
      }
    },
  },
  effects: {
    * getClassTopicAdd({payload}, {call, put, select}) {
      let data = yield call(classTopicAdd, payload);
      yield put({
        type: 'updateState',
        payload: {
          classTopicAddData: data.Data.ViewBag,
        }
      });
    },
    * getCategory({payload}, {call, put, select}) {
      let data = yield call(getTrainingArticleCategory, payload);
      yield put({
        type: 'updateCategory',
        payload: data,
      });
    },
    * addTopic({payload}, {call, put}) {
      let data = yield call(classPublishArticle, payload);
      if (data.Type === 1) {
        message.success(data.Message);
      } else {
        message.error(data.Message);
      }
    },
  },
  subscriptions: {
    setup({dispatch, history}) {
      let id;
      history.listen((location) => {
        if (location.pathname === "/main/classTopicAdd") {
          if (id != location.query.id) {
            id = location.query.id;
            dispatch({type: 'getClassTopicAdd', payload: {id}});
            dispatch({type: 'getCategory', payload: {type: "topic", trainingId: id}});
            dispatch({type: 'updateState', payload: {classId: id}});
          }
        }
      })
    }
  }
});
