/**
 * 排行榜
 */
import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import {Spin, Tabs} from 'antd';
import {Link} from 'dva/router'
import GeneralHead from '../../../components/GeneralHead/GeneralHead'
import styles from './rankingTab.less';

const TabPane = Tabs.TabPane;
const RankingTab = ({loading, groupRankData, rankUserData, courseClickData}) => {
  const groutRankList = groupRankData['ListData'].map((item, index) => {
    return (
      <ul key={index} className={styles.rankingList}>
        <li className={styles.list1}>
          {
            index < 3 ? <span className={cs({
              'rankFirstBg': index == 0,
              'rankSecondBg': index == 1,
              'rankThirdBg': index == 2,
            })}></span> : <span>{index + 1}</span>
          }
        </li>
        <li className={styles.list2} title='1'>{item.DepartmentName}</li>
        <li className={styles.list3}>{item.Average}</li>
      </ul>
    )
  });
  const rankUserList = rankUserData['ListData'].map((item, index) => {
    return (
      <ul key={index} className={styles.rankingList}>
        <li className={styles.list1}>
          {
            index < 3 ? <span className={cs({
              'rankFirstBg': index == 0,
              'rankSecondBg': index == 1,
              'rankThirdBg': index == 2,
            })}></span> : <span>{index + 1}</span>
          }
        </li>
        <li className={styles.list2} title='1'>{item.UserName}</li>
        <li className={styles.list3}>{item.Credit}</li>
      </ul>
    )
  });
  const courseClick = courseClickData['ListData'].map((item, index) => {
    return (
      <ul key={index} className={styles.rankingList}>
        <li className={styles.list1}>
          {
            index < 3 ? <span className={cs({
              'rankFirstBg': index == 0,
              'rankSecondBg': index == 1,
              'rankThirdBg': index == 2,
            })}></span> : <span>{index + 1}</span>
          }
        </li>
        <li className={styles.list2} title='1'>
          <Link to={{pathname: '/main/courseDetail', query: {id: item.Id}}} target="_blank" rel="noopener noreferrer">
            {item.Name}
          </Link>
        </li>
        <li className={styles.list3}>{item.Total}</li>
      </ul>
    )
  });
  return (
    <div className={styles.rankingTab}>
      <GeneralHead showIcon={true} title="排行榜" url="main//userRankingList"></GeneralHead>
      <Spin spinning={loading}>
        <Tabs defaultActiveKey="1">
          <TabPane tab="单位" key="1">
            <div className={styles.rankingContent}>
              <p className={styles.title}>
                <span className={styles.rank1}>排行</span>
                <span className={styles.rank2}>单位名称</span>
                <span className={styles.rank3}>平均学时</span>
              </p>
              {groutRankList}
            </div>
          </TabPane>
          <TabPane tab="个人" key="2">
            <div className={styles.rankingContent}>
              <p className={styles.title}>
                <span className={styles.rank1}>排行</span>
                <span className={styles.rank2}>姓名</span>
                <span className={styles.rank3}>学时</span>
              </p>
              {rankUserList}
            </div>
          </TabPane>
          <TabPane tab="课程" key="3">
            <div className={styles.rankingContent}>
              <p className={styles.title}>
                <span className={styles.rank1}>排行</span>
                <span className={styles.rank2}>课程名称</span>
                <span className={styles.rank3}>点击数</span>
              </p>
              {courseClick}
            </div>
          </TabPane>
        </Tabs>
      </Spin>
    </div>
  );
};
RankingTab.propTypes = {
  loading: PropTypes.bool,
  groupRankData: PropTypes.object,
  rankUserData: PropTypes.object,
  courseClickData: PropTypes.object
};

export default RankingTab;
