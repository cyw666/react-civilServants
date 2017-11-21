/*
* 班级考试
* */
import React from 'react';
import {connect} from 'dva';
import PropTypes from 'prop-types';
import {Link} from 'dva/router'
import {Breadcrumb, Icon, Row, Col, Spin, Pagination} from 'antd'
import GeneralHead from '../../components/GeneralHead/GeneralHead'
import styles from './classExam.less';

const ClassExam = ({classExam, dispatch, loading}) => {
  const {classId, classExamData, pageOptions} = classExam;
  const contentList = classExamData.ListData && classExamData.ListData.map((item, index) => {
    return (
      <Row key={index}>
        <Col span={12} className="ellipsis">{item.Name}</Col>
        <Col span={4}><p>{item.Credit}</p></Col>
        <Col span={4}><p>{item.TotalScore}</p></Col>
        <Col span={4}><Link to={{pathname: "/main/exam", query: {id: item.Id}}} target="_blank">参加测试</Link></Col>
      </Row>
    )
  });
  const pageSizeChange = (page) => {
    dispatch({
      type: 'getClassExamData',
      payload: {
        id: classId,
        page
      }
    });
  }
  return (
    <div className={styles.classExam}>
      <GeneralHead showIcon={false} title={'班级考试'}></GeneralHead>
      <div className={styles.innerContent}>
        <Breadcrumb>
          <Breadcrumb.Item><Icon type="setting" style={{fontSize: 16, color: '#656565'}}/> 您的当前位置：</Breadcrumb.Item>
          <Breadcrumb.Item><a href="/main/indexPage">首页</a></Breadcrumb.Item>
          <Breadcrumb.Item><a href="/main/trainingClass">培训班</a></Breadcrumb.Item>
          <Breadcrumb.Item><Link to={{
            pathname: '/main/grade/classDetail',
            query: {id: classId}
          }}>{classExamData.TrainingName}</Link></Breadcrumb.Item>
          <Breadcrumb.Item>班级考试</Breadcrumb.Item>
        </Breadcrumb>
        <div className={styles.borderBold}>
          <h2 className="commonTitle">班级考试</h2>
          <Spin spinning={loading.effects['classExam/getClassExam']}>
            <div className="myTab">
              <div className="header">
                <Row>
                  <Col span={12}><p>考试名称</p></Col>
                  <Col span={4}><p>考试学时</p></Col>
                  <Col span={4}><p>最高分</p></Col>
                  <Col span={4}><p>参加测试</p></Col>
                </Row>
              </div>
              <div className="content">
                {contentList}
              </div>
              {
                pageOptions.total > 0 ?
                  <Pagination showQuickJumper {...pageOptions} onChange={pageSizeChange} showTotal={(total) => {
                    return `共${total}条`
                  }}/>
                  :
                  <p className="noData">暂无考试</p>
              }
            </div>
          </Spin>
        </div>
      </div>
    </div>
  );
};
ClassExam.propTypes = {
  classExam: PropTypes.object.isRequired,
  dispatch: PropTypes.func,
  loading: PropTypes.object
};

export default connect(({classExam, loading}) => ({classExam, loading}))(ClassExam);
