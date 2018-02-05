/**
 * 平台介绍
 */
import React from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import cs from 'classnames';
import { Link } from 'dva/router'
import { Icon, Spin, Breadcrumb, Tabs } from 'antd';
import styles from './index.less';
import GeneralHead from '../../components/GeneralHead/GeneralHead'

const TabPane = Tabs.TabPane;

const Collegeinfo = ({ collegeinfo, dispatch, loading }) => {
  const paneContent = collegeinfo.collegeinfoData.ListData.map((item, index) => {
    return (
      <TabPane tab={ item.Name } key={ item.Id }>
        <div className={ styles.content } dangerouslySetInnerHTML={ { __html: item.Content } }></div>
      </TabPane>
    )
  })
  return (
    <div className={ cs([ "container_24" ]) }>
      <div className="grid_24">
        <GeneralHead showIcon={ false } title="平台介绍"></GeneralHead>
        <div className={ styles.collegeinfo }>
          <Breadcrumb>
            <Breadcrumb.Item><Icon type="setting" style={ { fontSize: 16, color: '#656565' } }/>
              您的当前位置：</Breadcrumb.Item>
            <Breadcrumb.Item><Link to="/">首页</Link></Breadcrumb.Item>
            <Breadcrumb.Item>平台介绍</Breadcrumb.Item>
          </Breadcrumb>
          <Spin spinning={ loading.effects[ 'collegeinfo/getCollegeinfo' ] }>
            <Tabs defaultActiveKey="0" type="card">
              { paneContent }
            </Tabs>
          </Spin>
        </div>
      </div>
    </div>
  );
};
Collegeinfo.propTypes = {
  collegeinfo: PropTypes.object.isRequired,
  dispatch: PropTypes.func,
  loading: PropTypes.object
};

export default connect(({ collegeinfo, loading }) => ({ collegeinfo, loading }))(Collegeinfo);
