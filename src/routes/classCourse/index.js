/*
* 班级课程
* */
import React from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import { Link } from 'dva/router'
import { Breadcrumb, Icon, Row, Col, Spin, Progress, Pagination } from 'antd'
import GeneralHead from '../../components/GeneralHead/GeneralHead'
import styles from './index.less';

const ClassCourse = ({ classCourse, dispatch, loading }) => {
  const { classId, courseType, classCourseData, pageOptions } = classCourse;
  const contentList = classCourseData.ListData && classCourseData.ListData.map((item, index) => {
    return (
      <Row key={ item.Id }>
        <Col span={ 14 }><Link to={ { pathname: '/main/courseDetail', search: `?id=${item.Id}` } } title={ item.Name }
                               target="_blank" rel="noopener noreferrer">{ item.Name }</Link></Col>
        <Col span={ 6 }>
          <div><Progress percent={ parseFloat(item.BrowseScore.toFixed(1)) } status="active"/></div>
        </Col>
        <Col span={ 4 }>
          <div><Link to={ { pathname: '/play', search: `?id=${item.Id}` } } target="_blank"
                     rel="noopener noreferrer">点击播放</Link></div>
        </Col>
      </Row>
    )
  });
  const pageSizeChange = (page) => {
    dispatch({
      type: 'getClassCourse',
      payload: {
        id: classId,
        type: courseType,
        page
      }
    });
  }
  return (
    <div className={ styles.classCourse }>
      <GeneralHead showIcon={ false } title={ '班级公告' }></GeneralHead>
      <div className={ styles.innerContent }>
        <Breadcrumb>
          <Breadcrumb.Item><Icon type="setting" style={ { fontSize: 16, color: '#656565' } }/> 您的当前位置：</Breadcrumb.Item>
          <Breadcrumb.Item><Link to="/">首页</Link></Breadcrumb.Item>
          <Breadcrumb.Item><Link to="/main/trainingClass">培训班</Link></Breadcrumb.Item>
          <Breadcrumb.Item><Link to={ {
            pathname: '/main/grade/classDetail',
            search: `?id=${classId}`
          } }>{ classCourseData.TrainingName }</Link></Breadcrumb.Item>
          <Breadcrumb.Item>班级课程</Breadcrumb.Item>
        </Breadcrumb>
        <div className={ styles.borderBold }>
          <h2 className="commonTitle">班级课程（{ courseType == "required" ? "必修" : "选修" }）</h2>
          <Spin spinning={ loading.effects[ 'classCourse/getClassCourse' ] }>
            <div className="myTab">
              <div className="header">
                <Row>
                  <Col span={ 14 }><p>课程名称</p></Col>
                  <Col span={ 6 }><p>进度</p></Col>
                  <Col span={ 4 }><p>播放</p></Col>
                </Row>
              </div>
              <div className="content">
                { contentList }
              </div>
              {
                pageOptions.total > 0 &&
                <Pagination showQuickJumper { ...pageOptions } onChange={ pageSizeChange } showTotal={ (total) => {
                  return `共${total}条`
                } }/>
              }
            </div>
          </Spin>
        </div>
      </div>
    </div>
  );
};
ClassCourse.propTypes = {
  classCourse: PropTypes.object.isRequired,
  dispatch: PropTypes.func,
  loading: PropTypes.object
};

export default connect(({ classCourse, loading }) => ({ classCourse, loading }))(ClassCourse);
