import React from 'react';
import {connect} from 'dva';
import PropTypes from 'prop-types';
import cs from 'classnames';
import {
  UserLogin,
  NoticeAnnouncement,
  NewsInfor,
  CourseCenter,
  GuideEntry,
  SpecialTraining,
  ClassGarden,
  RankingTab,
  BookGuide
} from './components/index';
import styles from './IndexPage.less';
import bannerCenter from '../../assets/bannerCenter.png'
const IndexPage = ({indexPage, dispatch, loading}) => {
  /*登陆*/
  let {token} = indexPage;
  let loginLoading = false;
  if (loading.effects['indexPage/userMessage'] || loading.effects['indexPage/loginOut'] || loading.effects['indexPage/login']) {
    loginLoading = true;
  } else {
    loginLoading = false;
  }
  const userProps = {
    indexPage,
    pushSubmit: (values) => {
      dispatch({type: 'indexPage/login', payload: values});
      dispatch({
        type: 'indexPage/setUserCookie',
        payload: values
      });
    },
    pushOut: () => {
      dispatch({type: 'indexPage/loginOut', payload: token});
    },
    loading: loginLoading
  }
  /*通知公告*/
  const noticeProps = {
    noticeData: indexPage.noticeData,
    loading: loading.effects['indexPage/getNotice']
  }
  /*新闻*/
  const newsProps = {
    newsData: indexPage.newsData,
    loading: loading.effects['indexPage/getNews'],
    tabChange: (code) => {
      dispatch({
        type: 'indexPage/getNews',
        payload: {page: 1, rows: 6, categoryCode: code, wordLimt: 20}
      });
    },
    realTimeData: {...indexPage.realTimeData, loading: loading.effects['indexPage/getRealTimeData']}
  }
  /*课程中心*/
  let courseLoading = loading.effects['indexPage/getCourseCategory'] || loading.effects['indexPage/getCourseList'] ? true : false;
  const courseProps = {
    courseCategory: indexPage.courseCategory,
    loading: courseLoading,
    courseListData: indexPage.courseListData,
    activeChange: (channelId) => {
      dispatch({
        type: 'indexPage/getCourseList',
        payload: {rows: 8, channelId,}
      });
    }
  }
  /*班级园地*/
  let classGardenLoading = loading.effects['indexPage/getClassCategory'] || loading.effects['indexPage/getClassList'] ? true : false;
  const classGardenProps = {
    loading: classGardenLoading,
    classChange: (categoryId) => {
      dispatch({
        type: 'indexPage/getClassList',
        payload: {rows: 6, categoryId}
      });
    },
    addClass: (id) => {
      if (indexPage.isLoginIn) {
        dispatch({
          type: 'indexPage/joinClass',
          payload: {id}
        });
      } else {
        alert('请登录！');
      }
      
    },
    classCategory: indexPage.classCategory,
    classListData: indexPage.classListData,
    activeClassId: indexPage.activeClassId
  }
  /*排行榜*/
  let rankLoading = loading.effects['indexPage/getGroupRank'] || loading.effects['indexPage/getRankUser'] || loading.effects['indexPage/getCourseClick'] ? true : false;
  const rankProps = {
    loading: rankLoading,
    groupRankData: indexPage.groupRankData,
    rankUserData: indexPage.rankUserData,
    courseClickData: indexPage.courseClickData
  }
  return (
    <div className={styles.normal}>
      <UserLogin {...userProps}></UserLogin>
      <div className={cs(["container_24"])}>
        <div className="grid_12">
          <NoticeAnnouncement {...noticeProps}></NoticeAnnouncement>
        </div>
        <div className="grid_12">
          <NewsInfor {...newsProps}></NewsInfor>
        </div>
      </div>
      <div className={cs(["container_24"])}>
        <div className="grid_17">
          <CourseCenter {...courseProps}></CourseCenter>
          <ClassGarden {...classGardenProps}></ClassGarden>
          <BookGuide loading={loading.effects['indexPage/getBookList']}
                     bookListData={indexPage.bookListData}></BookGuide>
        </div>
        <div className="grid_7">
          <GuideEntry></GuideEntry>
          <SpecialTraining studySpecialData={indexPage.studySpecialData}
                           loading={loading.effects['indexPage/getStudySpecial']}></SpecialTraining>
          <RankingTab {...rankProps}></RankingTab>
        </div>
      </div>
      <div className={cs(["container_24"], [`${styles.bannerCenter}`])}>
        <p><img src={bannerCenter} alt="学习贯彻十八届六中全会精神"/></p>
      </div>
    
    </div>
  );
};
IndexPage.propTypes = {
  indexPage: PropTypes.object.isRequired,
  dispatch: PropTypes.func,
  loading: PropTypes.object
};

export default connect(({indexPage, loading}) => ({indexPage, loading}))(IndexPage);