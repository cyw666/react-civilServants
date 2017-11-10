import modelExtend from 'dva-model-extend'
import {message} from 'antd'
import {model} from './common'
import {
  play,
  addNote,
  courseCommentAdd,
  delNote,
  playJwplay,
  singleProcess,
  playJY,
  playScorm,
  scormProcess
} from '../services/main'

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
    showInfo: false,
    courseId: '',
    playMp4Data: {
      Content: null,
      CourseId: "",
      CourseServer: null,
      LastPostion: "",
      Location: "",
      PortalId: "",
      Url: "",
      UserId: "",
    },
    playJyData: {
      BatchId: '',
      PortalURL: '',
      CourseId: "",
      LastPostion: "",
      PortalId: "",
      Url: "",
      UserId: "",
    },
    playScormData: {
      Content: null,
      CourseId: "",
      CourseServer: null,
      LastPostion: "",
      Location: "",
      PortalId: "",
      Url: "",
      UserId: "",
    },
    showPlayMp4: false,
    showPlayJy: false,
    showPlayScorm: false,
    showPlaySingle: false,
    showPlayPdf: false,
  },
  reducers: {
    updateNoticeParams(state, {payload}) {
      return {
        ...state,
        noticeParams: {...state.noticeParams, ...payload}
      }
    },
  },
  effects: {
    * getPlayInfo({payload}, {call, put}) {
      let loadOnce = 0;
      let data = yield call(play, payload);
      if (data.Status == 200) {
        if (data.Data && data.Data.Content == null) {
          if ((data.Data.PortalId) && (data.Data.UserId) && (data.Data.CourseId)) {
            //refresh
            if (loadOnce == 0) {
              loadOnce = 1;
            }
            yield put({type: 'updateState', payload: {playInfo: data.Data,}});
          } else {
            alert("数据无效，请检查api");
            window.close();
          }
        } else if (data.Data && data.Data.Content) {
          alert('同时只能打开一门课程,请关闭之前页面,并于' + data.Data.Content + '秒后重试！');
          window.close();
        }
      } else {
        alert(data.Message);
        window.close();
      }
    },
    * addNote({payload}, {call, put, select}) {
      let token = yield select(state => state.play.token);
      let courseId = yield select(state => state.play.playInfo.CourseId);
      let parmas = {...token, ...payload, ...{courseId}};
      let data = yield call(addNote, parmas);
      message.success(data.Message);
      yield put({type: 'getPlayInfo', payload: {id: courseId}});
    },
    * delNote({payload}, {call, put, select}) {
      let token = yield select(state => state.play.token);
      let courseId = yield select(state => state.play.playInfo.CourseId);
      let parmas = {...token, ...payload};
      let data = yield call(delNote, parmas);
      if (data.Type === 1) {
        message.success(data.Message);
      } else {
        message.error(data.Message);
      }
      yield put({type: 'getPlayInfo', payload: {id: courseId}});
    },
    * courseCommentAdd({payload}, {call, put, select}) {
      let token = yield select(state => state.play.token);
      let mainId = yield select(state => state.play.playInfo.CourseId);
      let parmas = {...token, ...payload, ...{mainId}};
      let data = yield call(courseCommentAdd, parmas);
      if (data.Type === 1) {
        message.success(data.Message);
      } else {
        message.error(data.Message);
      }
      yield put({type: 'getPlayInfo', payload: {id: mainId}});
    },
    * playMp4({payload}, {call, put, select}) {
      let data = yield call(playJwplay, payload);
      if (data.Status == 200) {
        if (!data.Data.PortalId || !data.Data.UserId || !data.Data.CourseId) {
          alert("数据无效，请检查api");
          window.close();
        } else if (!data.Data.Url) {
          alert("没有视频资源！");
          window.close();
        } else {
          yield put({
            type: 'updateState',
            payload: {
              playMp4Data: data.Data,
              showPlayMp4: true,
            }
          });
        }
      }
      
    },
    * sendMp4Progress({payload}, {call, put, select}) {
      let token = yield select(state => state.play.token);
      let courseId = yield select(state => state.play.courseId);
      let parmas = {...token, ...payload};
      try {
        let data = yield call(singleProcess, parmas);
        yield put({type: 'getPlayInfo', payload: {id: courseId}});
      } catch (error) {
        alert("网络错误，将刷新页面！");
        window.location.reload();
      }
    },
    * playJy({payload}, {call, put, select}) {
      let data = yield call(playJY, payload);
      if (data.Status == 200) {
        if (!data.Data.PortalId || !data.Data.UserId || !data.Data.CourseId) {
          alert("数据无效，请检查api");
          window.close();
        } else if (!data.Data.Url) {
          alert("没有视频资源！");
          window.close();
        } else {
          yield put({
            type: 'updateState',
            payload: {
              playJyData: data.Data,
              showPlayJy: true,
            }
          });
        }
      }
      
    },
    * playScorm({payload}, {call, put, select}) {
      let data = yield call(playScorm, payload);
      if (data.Status == 200) {
        if (!data.Data.PortalId || !data.Data.UserId || !data.Data.CourseId) {
          alert("数据无效，请检查api");
          window.close();
        } else if (!data.Data.Url) {
          alert("没有视频资源！");
          window.close();
        } else {
          yield put({
            type: 'updateState',
            payload: {
              playScormData: data.Data,
              showPlayScorm: true,
            }
          });
        }
      }
    },
    * sendScormProgress({payload}, {call, put, select}) {
      const {url, options} = payload;
      let token = yield select(state => state.play.token);
      let courseId = yield select(state => state.play.courseId);
      let params = {...token, ...options};
      try {
        let data = yield call(scormProcess, url, params);
        yield put({type: 'getPlayInfo', payload: {id: courseId}});
      } catch (error) {
        alert("网络错误，将刷新页面！");
        window.location.reload();
      }
    },
  },
  subscriptions: {
    setup({dispatch, history}) {
      history.listen((location) => {
        let courseId = location.query.courseId;
        if (courseId) {
          dispatch({type: 'getPlayInfo', payload: {id: courseId}});
          dispatch({type: 'updateState', payload: {courseId}});
        }
      })
    }
  }
});
