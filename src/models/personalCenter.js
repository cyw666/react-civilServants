/**
 * 个人中心
 */
import modelExtend from 'dva-model-extend'
import {message} from 'antd'
import {model} from './common'

import {
  myCenter,
  delUserCourseReg,
  noteAdd,
  addNote,
  courseNoteList,
  noteUpdate,
  delNote,
  noteEditUpdate,
  studyPlanAdd,
  editStudyPlan,
  studyPlanUpdate,
  courseExamList,
} from '../services/main';

export default modelExtend(model, {
  namespace: 'personalCenter',
  state: {
    myCourseData: {
      ListData: {
        UnfinishModel: [],
        AppointedModel: [],
        FinishModel: []
      },
      UnfinishCount: 0,
      AppointedCount: 0,
      FinishCount: 0
    },
    activeKey: 'Unfinish',
    myCourseParams: {
      page: 1,
      rows: 10,
      courseType: 'All',
      title: ''
    },
    showNotesModal: false,
    showModalContent1: true,
    showModalContent2: false,
    showModalContent3: false,
    courseName: '',
    courseId: '',
    courseNoteList: {
      ListData: []
    },
    noteDetail: {
      Content: '',
      CourseId: '',
      CourseName: '',
      CreateDate: '',
      Id: '',
      Name: '',
    },
    pageConfig: {
      current: 1,
      pageSize: 15,
      unFinishTotal: 0,
      appointedTotal: 0,
      finishTotal: 0,
    },
    studyPlanData: {
      BrowseScore: '',
      CourseId: '',
      CourseName: '',
      Id: '',
      PlanFinishDate: '',
      Remark: '',
      RemindCycle: '',
      RemindDate: '',
      Type: '',
    },
    showPlanModal: false,
    showExamModal: false,
    examListData: {
      ListData: []
    }
  },
  reducers: {
    updateMyCourseParams(state, {payload}) {
      return {
        ...state,
        myCourseParams: {...state.myCourseParams, ...payload}
      }
    },
  },
  effects: {
    * getMyCourse({payload}, {call, put}) {
      let data = yield call(myCenter, payload);
      yield put({
        type: 'updateState',
        payload: {
          myCourseData: data.Data,
          pageConfig: {
            current: data.Data.Page,
            pageSize: data.Data.Rows,
            unFinishTotal: data.Data.UnfinishCount,
            appointedTotal: data.Data.AppointedCount,
            finishTotal: data.Data.FinishCount,
          },
        }
      });
      yield put({type: 'updateMyCourseParams', payload: payload});
    },
    * delMyCourse({payload}, {call, put, select}) {
      let data = yield call(delUserCourseReg, payload);
      if (data.Type === 1) {
        message.success(data.Message);
        let params = yield select(state => state.personalCenter.myCourseParams);
        yield put({type: 'getMyCourse', payload: params})
      } else {
        message.error(data.Message)
      }
      
    },
    /*学习笔记*/
    * noteAdd({payload}, {call, put, select}) {
      let data = yield call(noteAdd, payload);
      yield put({
        type: 'updateState',
        payload: {
          courseName: data.Data.CourseName,
          courseId: data.Data.CourseId,
          showNotesModal: true,
          showModalContent1: true,
          showModalContent2: false,
          showModalContent3: false,
        }
      });
    },
    * addNote({payload}, {call, put, select}) {
      let data = yield call(addNote, payload);
      alert(data.Message)
      yield put({type: 'updateState', payload: {showNotesModal: false}})
      let params = yield select(state => state.personalCenter.myCourseParams);
      yield put({type: 'getMyCourse', payload: params})
    },
    * seeNote({payload}, {call, put}) {
      let data = yield call(courseNoteList, payload);
      yield put({
        type: 'updateState',
        payload: {
          courseNoteList: data.Data,
          showNotesModal: true,
          showModalContent1: false,
          showModalContent2: true,
          showModalContent3: false,
        }
      });
    },
    * editNote({payload}, {call, put}) {
      let data = yield call(noteUpdate, payload);
      yield put({
        type: 'updateState',
        payload: {
          noteDetail: data,
          showNotesModal: true,
          showModalContent1: false,
          showModalContent2: false,
          showModalContent3: true,
        }
      });
    },
    * delNote({payload}, {call, put, select}) {
      let data = yield call(delNote, payload);
      if (data.Type === 1) {
        message.success(data.Message);
        let courseId = yield select(state => state.personalCenter.courseId);
        yield put({type: 'seeNote', payload: {courseId}})
        let params = yield select(state => state.personalCenter.myCourseParams);
        yield put({type: 'getMyCourse', payload: params})
      } else {
        message.error(data.Message);
      }
      
    },
    * noteEditUpdate({payload}, {call, put, select}) {
      let data = yield call(noteEditUpdate, payload);
      alert(data.Message);
      let courseId = yield select(state => state.personalCenter.courseId);
      yield put({type: 'seeNote', payload: {courseId}})
    },
    /*学习计划*/
    * studyPlanAdd({payload}, {call, put}) {
      let data = yield call(studyPlanAdd, payload);
      yield put({
        type: 'updateState',
        payload: {
          studyPlanData: data.Data,
          courseName: data.Data.CourseName,
          courseId: data.Data.CourseId,
          showPlanModal: true,
        }
      });
    },
    * studyPlanUpdate({payload}, {call, put}) {
      let data = yield call(studyPlanUpdate, payload);
      yield put({
        type: 'updateState',
        payload: {
          studyPlanData: data.Data,
          courseName: data.Data.CourseName,
          courseId: data.Data.CourseId,
          showPlanModal: true,
        }
      });
    },
    * editStudyPlan({payload}, {call, put, select}) {
      let data = yield call(editStudyPlan, payload);
      message.info(data.Message);
      yield put({type: 'updateState', payload: {showPlanModal: false}})
      let params = yield select(state => state.personalCenter.myCourseParams);
      yield put({type: 'getMyCourse', payload: params})
    },
    /*查看考试*/
    * seeExam({payload}, {call, put}) {
      let data = yield call(courseExamList, payload);
      yield put({
        type: 'updateState',
        payload: {
          examListData: data.Data,
          showExamModal: true,
        }
      });
    },
  },
  subscriptions: {
    setup({dispatch, history}) {
      history.listen((location) => {
        if (location.pathname === '/main/personalCenter') {
          dispatch({type: 'getMyCourse', payload: {page: 1, rows: 5, courseType: 'All', title: ''}});
        }
      })
    }
  }
});
