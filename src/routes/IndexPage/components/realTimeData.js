/**
 * 实时数据
 */
import React from 'react';
import PropTypes from 'prop-types';
import {Spin} from 'antd';
import styles from './realTimeData.less';
import realTime1 from '../../../assets/realTime1.png'
import realTime2 from '../../../assets/realTime2.png'
import realTime3 from '../../../assets/realTime3.png'
import realTime4 from '../../../assets/realTime4.png'
const RealTimeData = ({realData}) => {
  let {Model, loading} = realData;
  return (
    <div className={styles.realTimeData}>
      <Spin spinning={loading}>
        <div className={styles.realTimeList}>
          <ul>
            <li>
              <div><img src={realTime1} alt=""/><span>注册人数</span></div>
              <p className={styles.count}>{Model.UsersCount}</p>
            </li>
          </ul>
          <ul>
            <li>
              <div><img src={realTime2} alt=""/><span>在线人数</span></div>
              <p className={styles.count}>{Model.OnlineUsersCount}</p>
            </li>
          </ul>
          <ul>
            <li>
              <div><img src={realTime3} alt=""/><span>课件数量</span></div>
              <p className={styles.count}>{Model.CourseCount}</p>
            </li>
          </ul>
          <ul>
            <li className={styles.lastLi}>
              <div><img src={realTime4} alt=""/><span>访问次数</span></div>
              <p className={styles.count}>{Model.UserVisitCount}</p>
            </li>
          </ul>
        </div>
      </Spin>
    </div>
  );
};
RealTimeData.propTypes = {
  realData: PropTypes.object,
};

export default RealTimeData;
