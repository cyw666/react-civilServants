/*
 ** 新闻中心
 */
import React from 'react';
import PropTypes from 'prop-types';
import {Spin, Tabs} from 'antd';
import {Link} from 'dva/router'
import styles from './newsInfor.less';
import arrowRight from '../../../assets/arrowRight.png';
import {dateFilter, wordLimit} from '../../../utils/index'
import RealTimeData from './realTimeData'

const TabPane = Tabs.TabPane;
const NewsInfor = ({newsData, loading, tabChange, realTimeData}) => {
  let {ListData} = newsData;
  
  let newsList = ListData.map((item, index) => {
    if (index === 0) return
    return (
      <li key={index}>
        <span className={styles.arrow}><img src={arrowRight} alt="arrow"/></span>
        <span className={styles.name} title={item.Name}>
          <Link to={`/main/articleDetail/${item.Id}`} target='_blank' rel="noopener noreferrer">{item.Name}</Link>
        </span>
        <span className={styles.time}>{dateFilter(item.CreateDate, 'yyyy-MM-dd')}</span>
      </li>
    )
  });
  return (
    <div className={styles.newsInfor}>
      <Spin spinning={loading}>
        <div className={styles.borderNews}>
          <Tabs onChange={(key) => {
            tabChange(key);
          }} type="card">
            <TabPane tab="新闻资讯" key="newsInformation"></TabPane>
            <TabPane tab="干教资讯" key="cadreEducationNews"></TabPane>
            <TabPane tab="时政热点" key="newsHot"></TabPane>
          </Tabs>
          <div className={styles.tabContent}>
            <div className={styles.top}>
              <h4 title={ListData[0].Name}>
                <Link to={`/main/articleDetail/${ListData[0].Id}`} target='_blank' rel="noopener noreferrer"
                      className={styles.title}>
                  {ListData[0].Name}
                </Link>
              </h4>
              <p
                className={styles.description}> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{wordLimit(ListData[0].Description, 62)}</p>
            </div>
            <ul className={styles.bottom}>
              {newsList}
            </ul>
          </div>
          <RealTimeData realData={realTimeData}></RealTimeData>
        </div>
      </Spin>
    </div>
  );
};
NewsInfor.propTypes = {
  newsData: PropTypes.object.isRequired,
  loading: PropTypes.bool,
  tabChange: PropTypes.func,
};

export default NewsInfor;
