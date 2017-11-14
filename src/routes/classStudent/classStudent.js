/*
* 同学名录
* */
import React from 'react';
import {connect} from 'dva';
import PropTypes from 'prop-types';
import {Link} from 'dva/router'
import {Button, Breadcrumb, Icon, Input, Tabs, Row, Col, Spin, Progress, Pagination} from 'antd'
import cs from 'classnames';
import styles from './classStudent.less';

const ClassStudent = ({classStudent, dispatch, loading}) => {
  const {classId, classStudentData, pageOptions} = classStudent;
  const contentList = classStudentData.ListData && classStudentData.ListData.map((item, index) => {
    return (
      <Row key={index}>
        <Col span={8}><p>{item.UserName}</p></Col>
        <Col span={8}><p>{item.Tel || "暂无电话"}</p></Col>
        <Col span={8}><p>{item.GroupName}</p></Col>
      </Row>
    )
  });
  const pageSizeChange = (page) => {
    dispatch({
      type: 'getClassStudent',
      payload: {
        id: classId,
        page
      }
    });
  }
  return (
    <div className={styles.classStudent}>
      <Breadcrumb>
        <Breadcrumb.Item><Icon type="setting" style={{fontSize: 16, color: '#656565'}}/> 您的当前位置：</Breadcrumb.Item>
        <Breadcrumb.Item><a href="/main/indexPage">首页</a></Breadcrumb.Item>
        <Breadcrumb.Item><a href="/main/trainingClass">培训班</a></Breadcrumb.Item>
        <Breadcrumb.Item><Link to={{
          pathname: '/main/grade/classDetail',
          query: {id: classId}
        }}>{classStudentData.TrainingName}</Link></Breadcrumb.Item>
        <Breadcrumb.Item>同学名录</Breadcrumb.Item>
      </Breadcrumb>
      <div className={styles.borderBold}>
        <h2 className="commonTitle">同学名录</h2>
        <Spin spinning={loading.effects['classStudent/getClassStudent']}>
          <div className="myTab">
            <div className={styles.top}>
              <Row>
                <Col span={12}><p>总报名数：{classStudentData.Apply}</p></Col>
                <Col span={12}><p>审核通过：{classStudentData.Pass}</p></Col>
              </Row>
              <Row>
                <Col span={12}><p>通过审核名单：</p></Col>
              </Row>
            </div>
            <div className="header">
              <Row>
                <Col span={8}><p>姓名</p></Col>
                <Col span={8}><p>电话</p></Col>
                <Col span={8}><p>单位</p></Col>
              </Row>
            </div>
            <div className="content">
              {contentList}
            </div>
            {
              pageOptions.total>0?
                <Pagination showQuickJumper {...pageOptions} onChange={pageSizeChange} showTotal={(total) => {
                  return `共${total}条`
                }}/>
                :
                <p className="noData">暂无数据</p>
            }
          </div>
        </Spin>
      </div>
    </div>
  );
};
ClassStudent.propTypes = {
  classStudent: PropTypes.object.isRequired,
  dispatch: PropTypes.func,
  loading: PropTypes.object
};

export default connect(({classStudent, loading}) => ({classStudent, loading}))(ClassStudent);
