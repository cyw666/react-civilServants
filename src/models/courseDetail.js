/**
 * 课程详情
 */
import modelExtend from 'dva-model-extend'
import {message} from 'antd'
import {createHistory, useQueries} from 'history'
import {model} from './common'
const history = useQueries(createHistory)()
import {
  courseContent,
  relatedCourse,
  courseComment,
  favoriteAdd,
  favoriteDelete,
  addStudyCourse,
} from '../services/main';

export default modelExtend(model, {
  namespace: 'courseDetail',
  state: {
    courseContent: {
      BrowseScore: -1,
      ChannelId: '',
      ChannelName: "",
      Code: "",
      CommentCredit: 0,
      CommentFlag: false,
      CourseChannel: [],
      CourseCount: 0,
      Credit: 0,
      Description: "",
      Duration: "",
      ExamId: 0,
      FavoriteId: 0,
      Id: '',
      Img: "",
      Name: "",
      Nodes: null,
      Remainder: "",
      Required: false,
      StudentGrade: 0,
      Teacher: "无",
      Time: 0,
      UserCommentFlag: true
    },
    courseNode: [],
    courseComment: {
      ListData: []
    },
    relatedCourse: {
      ListData: []
    },
    pageConfig: {
      current: 1,
      pageSize: 10,
      total: 0
    }
  },
  reducers: {
    changeFavoriteId(state, {payload}){
      return {
        ...state,
        courseContent: {...state.courseContent, ...payload,},
      }
    },
    updateCourseContent(state, {payload}){
      return {
        ...state,
        courseContent: {...state.courseContent, ...payload,},
      }
    }
  }
  ,
  effects: {
    *getCourseContent({payload}, {call, put}){
      let data = yield call(courseContent, payload);
      yield put({
        type: 'updateCourseContent',
        payload: data.Data.CourseModel
      });
      yield put({
        type: 'updateState',
        payload: {
          courseNode: data.Data.ListData
        }
      });
    },
    *favoriteAdd({payload}, {call, put}){
      let data = yield call(favoriteAdd, payload);
      if (data.Type === 1) {
        message.success(data.Message);
        yield put({type: 'changeFavoriteId', payload: {FavoriteId: data.Value}});
      } else {
        message.error('收藏失败！');
      }
    },
    *favoriteDelete({payload}, {call, put}){
      let data = yield call(favoriteDelete, payload);
      if (data.Type === 1) {
        message.success(data.Message);
        yield put({type: 'changeFavoriteId', payload: {FavoriteId: 0}});
      } else {
        message.error('取消收藏失败！');
      }
    },
    *addStudyCourse({payload}, {call, put}){
      if (payload) {
        let data = yield call(addStudyCourse, payload);
        if (data.Type == 1) {
          let playHref = history.createPath({pathname: '/play', query: {id: payload.checkValue}});
          window.open(playHref)
        } else {
          message.error('选课失败！')
        }
      }
    },
    *getCourseComment({payload}, {call, put}){
      let data = yield call(courseComment, payload);
      yield put({
        type: 'updateState',
        payload: {
          courseComment: data.Data,
          pageConfig: {
            current: data.Data.Page,
            pageSize: data.Data.Rows,
            total: data.Data.Count
          }
        }
      });
    },
    *getRelatedCourse({payload}, {call, put}){
      let data = yield call(relatedCourse, payload);
      yield put({
        type: 'updateState',
        payload: {
          relatedCourse: data.Data
        }
      });
    },
  },
  subscriptions: {
    setup({dispatch, history}){
      history.listen((location) => {
        if (location.pathname === "/main/courseDetail") {
          let id = location.query.id;
          if (id) {
            dispatch({type: 'getCourseContent', payload: {id}})
            dispatch({type: 'getCourseComment', payload: {id, page: 1, rows: 10}})
            dispatch({type: 'getRelatedCourse', payload: {courseId: id, page: 1, rows: 10}})
          }
        }
      })
    }
  }
})
;
