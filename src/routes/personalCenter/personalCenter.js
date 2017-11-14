/**
 * 个人中心
 */
import React from 'react';
import {connect} from 'dva';
import PropTypes from 'prop-types';
import cs from 'classnames';
import styles from './personalCenter.less';
import {TmMyCenter} from './components/index'
import UserInformation from '../../components/userInformation/userInformation'
import TmNavCenter from '../../components/tmNavCenter/tmNavCenter'
import ExamModal from './components/examModal'
import StudyPlanModal from './components/studyPlanModal'
import NotesModal from './components/notesModal'
const PersonalCenter = ({app, personalCenter, dispatch, loading, history}) => {
  const userInforProps = {
    information: app.userInformation,
    loginOut: () => {
      dispatch({type: 'app/loginOut', payload: personalCenter.token});
    },
    loading: loading.effects['app/getUserInformation']
  }
  const navCenterProps = {
    title:"个人中心导航",
    navData:personalCenter.navData,
  }
  const myCenterProps = {
    courseData: personalCenter.myCourseData,
    courseParams: personalCenter.myCourseParams,
    activeKey: personalCenter.activeKey,
    searchMyCourse: (options) => {
      let params = Object.assign({}, personalCenter.myCourseParams, options)
      dispatch({
        type: 'personalCenter/getMyCourse',
        payload: params
      })
      let activeKey = params.courseType;
      if (activeKey == 'All') {
        activeKey = "Unfinish"
      }
      dispatch({
        type: 'personalCenter/updateState',
        payload: {activeKey}
      })
    },
    loading: loading.effects['personalCenter/getMyCourse'],
    selectChange: (courseType) => {
      dispatch({
        type: 'personalCenter/updateMyCourseParams',
        payload: {courseType}
      })
    },
    delMyCourse: (courseId) => {
      let params = Object.assign({}, {courseId}, personalCenter.token)
      dispatch({
        type: 'personalCenter/delMyCourse',
        payload: params
      })
    },
    pageConfig: personalCenter.pageConfig,
    /*笔记*/
    openNotesModal: (courseId) => {
      dispatch({type: 'personalCenter/noteAdd', payload: {courseId}})
    },
    seeNotesModal: (courseId, courseName) => {
      dispatch({type: 'personalCenter/seeNote', payload: {courseId}})
      dispatch({type: 'personalCenter/updateState', payload: {courseName, courseId}})
    },
    /*计划*/
    openPlanModal: (courseId) => {
      dispatch({type: 'personalCenter/studyPlanAdd', payload: {courseId}})
    },
    seePlanModal: (courseId) => {
      dispatch({type: 'personalCenter/studyPlanUpdate', payload: {courseId}})
    },
    /*考试*/
    openExamModal: (courseId) => {
      dispatch({type: 'personalCenter/seeExam', payload: {courseId}})
    },
  }
  /*笔记props*/
  const notesModalProps = {
    closeModal: () => {
      dispatch({
        type: 'personalCenter/updateState',
        payload: {showNotesModal: false}
      })
    },
    showModalContent: {
      showModalContent1: personalCenter.showModalContent1,
      showModalContent2: personalCenter.showModalContent2,
      showModalContent3: personalCenter.showModalContent3,
    },
    showModal: personalCenter.showNotesModal,
    noteDetail: personalCenter.noteDetail,
    notesCourseParams: {
      courseName: personalCenter.courseName,
      courseId: personalCenter.courseId,
    },
    handleNotesOk: (options) => {
      let params = Object.assign({}, options, {courseId: personalCenter.courseId}, personalCenter.token)
      dispatch({type: 'personalCenter/addNote', payload: params})
    },
    noteEditUpdate: (options) => {
      let params = Object.assign({}, options, {id: personalCenter.noteDetail.Id}, personalCenter.token)
      dispatch({type: 'personalCenter/noteEditUpdate', payload: params})
    },
    courseNoteList: personalCenter.courseNoteList,
    openNotesModal: (courseId) => {
      dispatch({type: 'personalCenter/noteAdd', payload: {courseId}})
    },
    noteListData: personalCenter.courseNoteList.ListData,
    delNote: (id) => {
      let params = Object.assign({}, {id}, personalCenter.token)
      dispatch({type: 'personalCenter/delNote', payload: params})
    },
    editNotes: (noteid) => {
      dispatch({type: 'personalCenter/editNote', payload: {noteid}})
    },
  }
  /*学习计划props*/
  const studyPlanModalProps = {
    studyPlanData: personalCenter.studyPlanData,
    closeModal: () => {
      dispatch({
        type: 'personalCenter/updateState',
        payload: {showPlanModal: false}
      })
    },
    showModal: personalCenter.showPlanModal,
    submitPlan: (options) => {
      let params = Object.assign({}, options, {courseId: personalCenter.studyPlanData.CourseId}, personalCenter.token)
      dispatch({type: 'personalCenter/editStudyPlan', payload: params})
    },
  }
  /*考试props*/
  const examModalProps = {
    closeModal: () => {
      dispatch({
        type: 'personalCenter/updateState',
        payload: {showExamModal: false,}
      })
    },
    showModal: personalCenter.showExamModal,
    examList: personalCenter.examListData,
  }
  return (
    <div className={styles.personalCenter}>
      <div className={cs(["container_24"])}>
        <div className="grid_7">
          <UserInformation {...userInforProps}></UserInformation>
          <TmNavCenter {...navCenterProps}></TmNavCenter>
        </div>
        <div className="grid_17">
          <TmMyCenter {...myCenterProps}></TmMyCenter>
        </div>
        {/*Modal笔记*/}
        <NotesModal {...notesModalProps}></NotesModal>
        {/*Modal计划*/}
        <StudyPlanModal {...studyPlanModalProps}></StudyPlanModal>
        {/*modal考试*/}
        <ExamModal {...examModalProps}></ExamModal>
      </div>
    </div>
  );
};
PersonalCenter.propTypes = {
  personalCenter: PropTypes.object.isRequired,
  app: PropTypes.object.isRequired,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
  history: PropTypes.object,
};

export default connect(({app, personalCenter, loading}) => ({app, personalCenter, loading}))(PersonalCenter);
