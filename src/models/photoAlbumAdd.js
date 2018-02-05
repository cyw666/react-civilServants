/**
 * 添加相册
 */
import modelExtend from 'dva-model-extend'
import { message } from 'antd'
import model from './common'
import { photoAlbumAdd, getPhotoAlbumAdd } from '../services/';
import { querySearch } from '../utils/utils'

export default modelExtend(model, {
  namespace: 'photoAlbumAdd',
  state: {
    classId: '',
    photoAlbumAddData: {},
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
    * getPhotoAlbum({ payload }, { call, put }) {
      let data = yield call(photoAlbumAdd, payload);
      yield put({
        type: 'updateState',
        payload: {
          photoAlbumAddData: data.Data,
        }
      });
    },
    * addPhotoAlbum({ payload }, { call, put }) {
      let data = yield call(getPhotoAlbumAdd, payload);
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
        if (pathname === "/main/photoAlbumAdd") {
          dispatch({ type: 'setTitle', payload: { title: '添加相册' } });
          if (id != querySearch(search).id) {
            id = querySearch(search).id;
            dispatch({ type: 'getPhotoAlbum', payload: { trainingId: id } });
            dispatch({ type: 'updateState', payload: { classId: id } });
          }
        }
      });
    }
  }
});
