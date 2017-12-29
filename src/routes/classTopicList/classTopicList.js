/*
* 班级话题
* */
import React from 'react';
import {connect} from 'dva';
import PropTypes from 'prop-types';
import {Link} from 'dva/router'
import {Breadcrumb, Icon, Row, Col, Spin, Pagination} from 'antd'
import GeneralHead from '../../components/GeneralHead/GeneralHead'
import {dateFilter} from '../../utils/index'
import styles from './classTopicList.less';

const ClassTopicList = ({classTopicList, dispatch, loading}) => {
  const {classId, classTopicListData, pageOptions} = classTopicList;
  const contentList = classTopicListData.ListData && classTopicListData.ListData.map((item, index) => {
    return (
      <Row key={item.Id}>
        <Col span={8} className="ellipsis"><Link to={`/main/articleDetail/${item.Id}`} title={item.Name} target="_blank"
                                                 rel="noopener noreferrer">{item.Name}</Link></Col>
        <Col span={6}><p>{item.Type}</p></Col>
        <Col span={6}><p>{dateFilter(item.CreatedDate, "yyyy-MM-dd")}</p></Col>
        <Col span={6}><p>{item.Author || "无"}</p></Col>
      </Row>
    )
  });
  const pageSizeChange = (page) => {
    dispatch({
      type: 'getClassTopicList',
      payload: {
        id: classId,
        page
      }
    });
  }
  return (
    <div className={styles.classTopicList}>
      <GeneralHead showIcon={false} title={'班级论文'}></GeneralHead>
      <div className={styles.innerContent}>
        <Breadcrumb>
          <Breadcrumb.Item><Icon type="setting" style={{fontSize: 16, color: '#656565'}}/> 您的当前位置：</Breadcrumb.Item>
          <Breadcrumb.Item><a href="/main/indexPage">首页</a></Breadcrumb.Item>
          <Breadcrumb.Item><a href="/main/trainingClass">培训班</a></Breadcrumb.Item>
          <Breadcrumb.Item><Link to={{
            pathname: '/main/grade/classDetail',
            query: {id: classId}
          }}>{classTopicListData.TrainingName}</Link></Breadcrumb.Item>
          <Breadcrumb.Item>班级话题</Breadcrumb.Item>
        </Breadcrumb>
        <div className={styles.borderBold}>
          <h2 className="commonTitle">班级话题</h2>
          <Spin spinning={loading.effects['classTopicList/getClassTopicList']}>
            <div className="myTab">
              <div className="header">
                <Row>
                  <Col span={8}><p>话题名称</p></Col>
                  <Col span={6}><p>话题分类</p></Col>
                  <Col span={6}><p>时间</p></Col>
                  <Col span={4}><p>作者</p></Col>
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
                  <p className="noData">暂无话题</p>
              }
            </div>
          </Spin>
        </div>
      </div>
    </div>
  );
};
ClassTopicList.propTypes = {
  classTopicList: PropTypes.object.isRequired,
  dispatch: PropTypes.func,
  loading: PropTypes.object
};

export default connect(({classTopicList, loading}) => ({classTopicList, loading}))(ClassTopicList);
