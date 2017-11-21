/**
 * 添加相册
 */
import modelExtend from 'dva-model-extend'
import {message} from 'antd'
import {model} from './common'
import {photoAlbumAdd, getPhotoAlbumAdd} from '../services/main';

export default modelExtend(model, {
  namespace: 'photoAlbumAdd',
  state: {
    classId: '',
    photoAlbumAddData: {},
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
    * getPhotoAlbum({payload}, {call, put, select}) {
      let data = yield call(photoAlbumAdd, payload);
      yield put({
        type: 'updateState',
        payload: {
          photoAlbumAddData: data.Data,
        }
      });
    },
    * addPhotoAlbum({payload}, {call, put}) {
      let data = yield call(getPhotoAlbumAdd, payload);
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
        if (location.pathname === "/main/photoAlbumAdd") {
          if (id != location.query.id) {
            id = location.query.id;
            dispatch({type: 'getPhotoAlbum', payload: {trainingId:id}});
            dispatch({type: 'updateState', payload: {classId: id}});
          }
        }
      })
    }
  }
});
