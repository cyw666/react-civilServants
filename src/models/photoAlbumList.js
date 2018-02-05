/**
 * 班级相册
 */
import modelExtend from 'dva-model-extend'
import model from './common'
import { querySearch } from '../utils/utils'
import { photoAlbumList } from '../services/';

export default modelExtend(model, {
  namespace: 'photoAlbumList',
  state: {
    classId: '',
    photoAlbumData: {},
    pageOptions: {
      current: 1,
      pageSize: 12,
      total: 0,
    }
  },
  reducers: {
    updatePageOptions(state, { payload }) {
      return {
        ...state,
        pageOptions: { ...state.pageOptions, ...payload }
      }
    },
  },
  effects: {
    * getPhotoAlbumList({ payload }, { call, put, select }) {
      let data = yield call(photoAlbumList, payload);
      yield put({
        type: 'updateState',
        payload: {
          photoAlbumData: data.Data,
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
    setup({ dispatch, history }) {
      let id;
      history.listen(({ pathname, search }) => {
        if (pathname === "/main/grade/photoAlbumList") {
          dispatch({ type: 'setTitle', payload: { title: '班级相册' } });
          if (id != querySearch(search).id) {
            id = querySearch(search).id;
            dispatch({ type: 'getPhotoAlbumList', payload: { id } });
            dispatch({ type: 'updateState', payload: { classId: id } });
          }
        }
      });
    }
  }
});
