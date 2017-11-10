/**
 * 班级详情
 */
import modelExtend from 'dva-model-extend'
import {message} from 'antd'
import {model} from './common'

import {
  classInformation,
  classMy,
  checkUserClass,
  classDetail,
} from '../services/main';

export default modelExtend(model, {
  namespace: 'classDetail',
  state: {
    classInfoData:{
      Model:{},
      ViewBag:{},
    },
    classMyData: {
      ListData: [],
      type: 'my'
    },
    isEnterClass: false,
    classId: '',
    classDetailData:{},
    navData:[
      {name:"选择课程",url:"/main/courseCenter"},
      {name:"学习统计",url:"/main/testStat"},
      {name:"考试统计",url:"/main/testCenter"},
      {name:"学习计划",url:"/main/studyPlan"},
      {name:"我的收藏",url:"/main/myFavorite"},
      {name:"留言板",url:"/main/messageList"},
      {name:"学员心声",url:"/main/originalArticleList"},
      {name:"学员风采",url:"/main/studentStyle"},
      {name:"问卷调查",url:"/main/pollList"},
      {name:"必装软件",url:"/main/software"},
      {name:"排行榜",url:"/main/rankList"},
      {name:"专题学习",url:"/main/specialLearning"},
      {name:"成果展示",url:"/main/resultShow"},
      {name:"新闻中心",url:"/main/article"},
    ]
  },
  reducers: {
    updateClassMy(state, {payload}){
      return {
        ...state,
        classMyData: {...state.classMyData, ...payload}
      }
    },
  },
  effects: {
    *classMy({payload}, {call, put}){
      let data = yield call(classMy);
      yield put({
        type: 'updateClassMy',
        payload: data.Data
      });
    },
    *checkUserClass({payload}, {call, put, select}){
      const {trainingId} = payload;
      let data = yield call(checkUserClass, payload);
      /*data.Type === 0 ? yield put({
        type: 'updateState',
        payload: {isEnterClass: false}
      }) : yield put({type: 'updateState', payload: {isEnterClass: true}});
      const isEnterClass = yield select(state => state.trainingClass.isEnterClass);
      if (isEnterClass) {
        window.open(`/classDetail?id=${trainingId}`);
      } else {
        message.warning('请先加入培训班！')
      }*/
    },
    *getClassDetail({payload}, {call, put, select}){
      let data = yield call(classDetail, payload);
      yield put({
        type: 'updateState',
        payload: {
          classDetailData: data.Data.Model,
        }
      })
    },
    *getClassInfo({payload}, {call, put}){
      let data = yield call(classInformation, payload);
      yield put({
        type: 'updateState',
        payload: {
          classInfoData: data.Data,
        }
      })
    },
  },
  subscriptions: {
    setup({dispatch, history}) {
      history.listen((location) => {
        if (location.pathname === "/main/classDetail") {
          let id = location.query.id;
          if (id) {
            dispatch({type: 'getClassDetail', payload: {id}});
            dispatch({type: 'getClassInfo', payload: {id}});
            dispatch({type: 'updateState', payload: {classId:id}});
          }
        }
      })
      dispatch({type: 'classMy'});
    }
  }
});
