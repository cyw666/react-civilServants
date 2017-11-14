/*
* 班级论文
* */
import React from 'react';
import {connect} from 'dva';
import PropTypes from 'prop-types';
import {Link} from 'dva/router'
import {Button, Breadcrumb, Icon, Input, Tabs, Row, Col, Spin, Progress, Pagination} from 'antd'
import cs from 'classnames';
import GeneralHead from '../../components/GeneralHead/GeneralHead'
import {dateFilter} from '../../utils/index'
import styles from './classPaperList.less';

const ClassPaperList = ({classPaperList, dispatch, loading}) => {
  const {classId, classPaperListData, pageOptions} = classPaperList;
  const contentList = classPaperListData.ListData && classPaperListData.ListData.map((item, index) => {
    return (
      <Row key={index}>
        <Col span={12}  className="ellipsis"><Link to={`/main/articleDetail/${item.Id}`} title={item.Name} target="_blank" rel="noopener noreferrer">{item.Name}</Link></Col>
        <Col span={4}><p>{item.Author || "无"}</p></Col>
        <Col span={8}><p>{dateFilter(item.CreatedDate,"yyyy-MM-dd")}</p></Col>
      </Row>
    )
  });
  const pageSizeChange = (page) => {
    dispatch({
      type: 'getClassPaperList',
      payload: {
        id: classId,
        page
      }
    });
  }
  return (
    <div className={styles.classPaperList}>
      <GeneralHead showIcon={false} title={'班级论文'}></GeneralHead>
      <div className={styles.innerContent}>
        <Breadcrumb>
          <Breadcrumb.Item><Icon type="setting" style={{fontSize: 16, color: '#656565'}}/> 您的当前位置：</Breadcrumb.Item>
          <Breadcrumb.Item><a href="/main/indexPage">首页</a></Breadcrumb.Item>
          <Breadcrumb.Item><a href="/main/trainingClass">培训班</a></Breadcrumb.Item>
          <Breadcrumb.Item><Link to={{pathname: '/main/grade/classDetail', query: {id: classId}}}>{classPaperListData.TrainingName}</Link></Breadcrumb.Item>
          <Breadcrumb.Item>班级论文</Breadcrumb.Item>
        </Breadcrumb>
        <div className={styles.borderBold}>
          <h2 className="commonTitle">班级论文</h2>
          <Spin spinning={loading.effects['classPaperList/getClassPaperList']}>
            <div className="myTab">
              <div className="header">
                <Row>
                  <Col span={12}><p>论文标题</p></Col>
                  <Col span={4}><p>作者</p></Col>
                  <Col span={8}><p>发布时间</p></Col>
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
                  <p className="noData">暂无论文</p>
              }
            </div>
          </Spin>
        </div>
      </div>
    </div>
  );
};
ClassPaperList.propTypes = {
  classPaperList: PropTypes.object.isRequired,
  dispatch: PropTypes.func,
  loading: PropTypes.object
};

export default connect(({classPaperList, loading}) => ({classPaperList, loading}))(ClassPaperList);
