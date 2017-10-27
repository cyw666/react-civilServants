import modelExtend from 'dva-model-extend'
import {message} from 'antd'
import {model} from './common'
import {play, addNote, courseCommentAdd,delNote} from '../services/main'

export default modelExtend(model, {
  namespace: 'play',
  state: {
    playInfo: {
      CourseId: "",
      PortalId: "",
      UserId: "",
      CoursePlayReflash: "",
      PortalURL: "",
      PlayPage: "",
      Content: null,
      resultCourseDetail: {
        BrowseScore: 0,
        ChannelId: "",
        ChannelName: "",
        Code: "",
        Credit: 0,
        Description: "",
        Duration: "0",
        ExamId: null,
        FavoriteId: 0,
        Id: 0,
        Img: "",
        Name: "",
        Remainder: "",
        StudentGrade: 0,
        Teacher: "",
        Time: 0,
      },
      resultCourseNote: [],
      resultComment: [],
    },
    showInfo:false
  },
  reducers: {
    updateNoticeParams(state, {payload}){
      return {
        ...state,
        noticeParams: {...state.noticeParams, ...payload}
      }
    },
  },
  effects: {
    *getPlayInfo({payload}, {call, put}){
      let data = yield call(play, payload);
      yield put({
        type: 'updateState',
        payload: {
          playInfo: data.Data,
        }
      });
    },
    *addNote({payload}, {call, put, select}){
      let token = yield select(state => state.play.token);
      let courseId = yield select(state => state.play.playInfo.CourseId);
      let parmas = {...token, ...payload, ...{courseId}};
      let data = yield call(addNote, parmas);
      message.success(data.Message);
      yield put({type: 'getPlayInfo', payload: {id: courseId}});
    },
    *delNote({payload}, {call, put, select}){
      let token = yield select(state => state.play.token);
      let courseId = yield select(state => state.play.playInfo.CourseId);
      let parmas = {...token, ...payload};
      let data = yield call(delNote, parmas);
      if(data.Type === 1){
        message.success(data.Message);
      }else {
        message.error(data.Message);
      }
      yield put({type: 'getPlayInfo', payload: {id: courseId}});
    },
    *courseCommentAdd({payload}, {call, put, select}){
      let token = yield select(state => state.play.token);
      let mainId = yield select(state => state.play.playInfo.CourseId);
      let parmas = {...token, ...payload, ...{mainId}};
      let data = yield call(courseCommentAdd, parmas);
      debugger
      if(data.Type === 1){
        message.success(data.Message);
      }else {
        message.error(data.Message);
      }
      yield put({type: 'getPlayInfo', payload: {id: mainId}});
    },
  },
  subscriptions: {
    setup({dispatch, history}) {
      history.listen((location) => {
        let courseId = location.query.courseId;
        if (courseId) {
          dispatch({type: 'getPlayInfo', payload: {id: courseId}});
        }
      })
    }
  }
});
