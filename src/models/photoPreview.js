/**
 * 班级照片
 */
import modelExtend from 'dva-model-extend'
import {message} from 'antd'
import {model} from './common'

import {photoPreview} from '../services/main';

export default modelExtend(model, {
  namespace: 'photoPreview',
  state: {
    classId: '',
    albumId: '',
    photoPreviewData: {},
    pageOptions: {
      current: 1,
      pageSize: 12,
      total: 0,
    }
  },
  reducers: {
    updatePageOptions(state, {payload}) {
      return {
        ...state,
        pageOptions: {...state.pageOptions, ...payload}
      }
    },
  },
  effects: {
    * getPhotoPreview({payload}, {call, put, select}) {
      let data = yield call(photoPreview, payload);
      yield put({
        type: 'updateState',
        payload: {
          photoPreviewData: data.Data,
        }
      });
      yield put({
        type: 'updatePageOptions',
        payload: {
          current: data.Data.Page,
          pageSize: data.Data.Rows,
          total: data.Data.Count,
        }
      });
    },
  },
  subscriptions: {
    setup({dispatch, history}) {
      let albumId, trainingId;
      history.listen((location) => {
        if (location.pathname === "/main/grade/photoPreview") {
          if (albumId != location.query.albumId || trainingId != location.query.id) {
            albumId = location.query.albumId;
            trainingId = location.query.id;
            dispatch({type: 'getPhotoPreview', payload: {albumId, trainingId}});
            dispatch({type: 'updateState', payload: {classId: trainingId, albumId: albumId}});
          }
        }
      })
    }
  }
});
