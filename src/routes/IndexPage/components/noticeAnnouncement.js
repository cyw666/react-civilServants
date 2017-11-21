/**
 * 通知公告
 */
import React from 'react';
import PropTypes from 'prop-types';
import {Spin, Carousel} from 'antd';
import {Link} from 'dva/router'
import styles from './noticeAnnouncement.less';
import Img from '../../../components/Img/Img'
import {dateFilter} from '../../../utils/index'

const NoticeAnnouncement = ({noticeData, loading}) => {
  const baseImgPath = noticeData.Path;
  let listNotice = noticeData['ListData'].map((list) => {
    return (
      <li key={list.Id}>
        <span className={styles.triangleRight}></span>
        <Link to={`/main/noticeDetail/${list.Id}`} target='_blank' title={list.Name} rel="noopener noreferrer">
          {list.Name}
        </Link>
        <span className={styles.time}>{dateFilter(list.CreateDate, 'yyyy-MM-dd')}</span>
      </li>
    )
  });
  
  let carouselList = noticeData['ListData'].map((item) => {
    return (
      <div key={item.Id}>
        <Link to={`/main/noticeDetail/${item.Id}`} target='_blank' rel="noopener noreferrer">
          <Img src={baseImgPath + '/' + item.Img} alt={item.Name}/>
        </Link>
        <p className={styles.title}>
          <Link to={`/main/noticeDetail/${item.Id}`} target='_blank' title={item.Name} rel="noopener noreferrer">
            {item.Name}
          </Link>
        </p>
      </div>
    )
  });
  if (!noticeData['ListData'].length) {
    carouselList = <div></div>;
  }
  return (
    <div className={styles.noticeAnnouncement}>
      <Spin spinning={loading}>
        <div className={styles.notice}>
          <Carousel autoplay>
            {carouselList}
          </Carousel>
        </div>
        <div className={styles.noticeBody}>
          <p className={styles.noticeBodyLeft}>通知公告</p>
          <div className={styles.noticeBodyRight}>
            <ul>
              {listNotice}
            </ul>
          </div>
        </div>
      </Spin>
    </div>
  );
};
NoticeAnnouncement.propTypes = {
  noticeData: PropTypes.object,
  loading: PropTypes.bool,
};

export default NoticeAnnouncement;
