/*
* 班级公告
* */
import React from 'react';
import {connect} from 'dva';
import PropTypes from 'prop-types';
import {Link} from 'dva/router'
import {Button, Breadcrumb, Icon, Input, Tabs, Row, Col, Spin, Progress, Pagination} from 'antd'
import cs from 'classnames';
import GeneralHead from '../../components/GeneralHead/GeneralHead'
import {dateFilter} from '../../utils/index'
import styles from './classNotice.less';

const ClassNoticeList = ({classNoticeList, dispatch, loading}) => {
  const {classId, classNoticeListData, pageOptions} = classNoticeList;
  const contentList = classNoticeListData.ListData && classNoticeListData.ListData.map((item, index) => {
    return (
      <Row key={index}>
        <Col span={12}  className="ellipsis"><Link to={`/main/articleDetail/${item.Id}`} title={item.Name} target="_blank" rel="noopener noreferrer">{item.Name}</Link></Col>
        <Col span={6}><p>{dateFilter(item.CreatedDate,"yyyy-MM-dd")}</p></Col>
        <Col span={4}><p>{item.Author || "无"}</p></Col>
      </Row>
    )
  });
  const pageSizeChange = (page) => {
    dispatch({
      type: 'getClassNoticeList',
      payload: {
        id: classId,
        page
      }
    });
  }
  return (
    <div className={styles.classNoticeList}>
      <GeneralHead showIcon={false} title={'班级公告'}></GeneralHead>
      <div className={styles.innerContent}>
        <Breadcrumb>
          <Breadcrumb.Item><Icon type="setting" style={{fontSize: 16, color: '#656565'}}/> 您的当前位置：</Breadcrumb.Item>
          <Breadcrumb.Item><a href="/main/indexPage">首页</a></Breadcrumb.Item>
          <Breadcrumb.Item><a href="/main/trainingClass">培训班</a></Breadcrumb.Item>
          <Breadcrumb.Item><Link to={{pathname: '/main/grade/classDetail', query: {id: classId}}}>{classNoticeListData.TrainingName}</Link></Breadcrumb.Item>
          <Breadcrumb.Item>班级公告</Breadcrumb.Item>
        </Breadcrumb>
        <div className={styles.borderBold}>
          <h2 className="commonTitle">班级公告</h2>
          <Spin spinning={loading.effects['classNoticeList/getClassNoticeList']}>
            <div className="myTab">
              <div className="header">
                <Row>
                  <Col span={12}><p>公告</p></Col>
                  <Col span={6}><p>时间</p></Col>
                  <Col span={4}><p>作者</p></Col>
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
                  <p className="noData">暂无公告</p>
              }
            </div>
          </Spin>
        </div>
      </div>
    </div>
  );
};
ClassNoticeList.propTypes = {
  classNoticeList: PropTypes.object.isRequired,
  dispatch: PropTypes.func,
  loading: PropTypes.object
};

export default connect(({classNoticeList, loading}) => ({classNoticeList, loading}))(ClassNoticeList);
