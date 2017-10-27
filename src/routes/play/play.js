/**
 * 课程播放
 */
import React from 'react';
import {connect} from 'dva';
import PropTypes from 'prop-types';
import cs from 'classnames';
import {Rate, Progress, Tabs, Icon,Button} from 'antd'
import styles from './play.less';
import {dateFilter} from '../../utils/index'
import TmDrag from './components/tmDrag'
import TmAddNote from './components/tmAddNote'
import TmAddComment from './components/tmAddComment'
const TabPane = Tabs.TabPane;
const Play = ({play, dispatch, loading}) => {
  const {CourseId, PortalId, PlayPage, resultCourseDetail, resultCourseNote, resultComment} = play.playInfo;
  
  //切换侧边栏
  const toggleInfo = () =>{
    dispatch({type:'play/updateState',payload:{showInfo:!play.showInfo}})
  }
  //添加笔记
  const addNote = (params)=>{
    dispatch({type:'play/addNote', payload:params})
  }
  //删除笔记
  const delNote = (params)=>{
    dispatch({type:'play/delNote', payload:{id:params}})
  }
  //添加评论
  const courseCommentAdd = (params) =>{
    dispatch({type:'play/courseCommentAdd', payload:params})
  }
  //笔记列表
  const noteList = resultCourseNote.map((item,index)=>{
    return (
      <ul key={index} className={styles.commentList}>
        <li className={styles.title}>
          <span>标题：{item.Name}</span>
          <span className={styles.time}>{dateFilter(item.CreateDate,'yyyy-MM-dd')}</span>
        </li>
        <li>
          <span>{item.Content}</span>
          <Button onClick={()=>{delNote(item.Id)}} className={styles.del}>删除</Button>
        </li>
      </ul>
    )
  })
  //评论列表
  const commentList = resultComment.map((item,index)=>{
    return (
      <ul key={index} className={styles.commentList}>
        <li className={styles.title}>
          <span>用户名：{item.UserName}</span>
          <span className={styles.time}>{dateFilter(item.CreateDate,'yyyy-MM-dd')}</span>
        </li>
        <li>
          <span>{item.Comment}</span>
        </li>
      </ul>
    )
  })
  return (
    <div className={styles.play}>
      <TmDrag onDragReady={()=>{console.log("ready!")}}></TmDrag>
      <div className={styles.playPage}>
        <div className={styles.video}>
          11
        </div>
        <div className={cs(`${styles.info}`,{'infoShow':play.showInfo})}>
          <div className={styles.hoverBtn} onClick={toggleInfo}>
            <span>课</span>
            <span>程</span>
            <span>信</span>
            <span>息</span>
          </div>
          <div className={styles.content}>
            <div className={styles.detail}>
              <p className="ellipsis" title={resultCourseDetail.Name}>{resultCourseDetail.Name}</p>
              <div className={styles.teacher}>
                <p className="pull-left">教师：{resultCourseDetail.Teacher}</p>
                <p className="pull-right">时长：{resultCourseDetail.Duration}</p>
              </div>
              <Rate disabled defaultValue={2}/>
              <div className="clearFix">
                <span className="pull-left">课程进度：</span>
                <div className={styles.progress}><Progress percent={resultCourseDetail.BrowseScore} status="active"/></div>
              </div>
              <p className={styles.desc}>课程描述：{resultCourseDetail.Description}</p>
            </div>
            <Tabs onChange={(key) => {
            }} type="card">
              <TabPane tab={<span><Icon type="edit"/>笔记</span>} key="1">
                <TmAddNote addNote={addNote}></TmAddNote>
                <div className={styles.commentListOuter}>
                  {noteList}
                </div>
              </TabPane>
              <TabPane tab={<span><Icon type="exception"/>评论</span>} key="2">
                <TmAddComment submit={courseCommentAdd}></TmAddComment>
                <div className={styles.commentListOuter}>
                  {commentList}
                </div>
              </TabPane>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};
Play.propTypes = {
  play: PropTypes.object.isRequired,
  dispatch: PropTypes.func,
  loading: PropTypes.object
};

export default connect(({play, loading}) => ({play, loading}))(Play);