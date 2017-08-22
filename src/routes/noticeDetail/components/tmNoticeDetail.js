/**
 * 通知公告（模板）
 */
import React from 'react'
import PropTypes from 'prop-types'
import cs from 'classnames'
import styles from './tmNoticeDetail.less'
import { Link } from 'dva/router'
import {Button,Breadcrumb,Icon} from 'antd';
import {dateFilter} from '../../../utils/index'
const TmNoticeDetail = ({noticeDetailData}) => {
  const {Model:{
    AttachmentName,
    Author,
    ClickCount,
    Content,
    CreateDate,
    Creator,
    FavoriteId,
    Id,
    Img,
    Name,
    NoticeCategory,
    Read,
    Source,
    Type,
    Url
  }} = noticeDetailData;
  return (
    <div className={styles.tmNoticeDetail}>
      <Breadcrumb>
        <Breadcrumb.Item><Icon type="setting" style={{ fontSize: 16, color: '#656565' }}/> 您的当前位置：</Breadcrumb.Item>
        <Breadcrumb.Item><a href="/indexPage">首页</a></Breadcrumb.Item>
        <Breadcrumb.Item><a href="/noticeList">通告公告</a></Breadcrumb.Item>
        <Breadcrumb.Item>通知内容</Breadcrumb.Item>
      </Breadcrumb>
      <div className={styles.articleContent}>
        <div className={styles.articleHeader}>
          <h2>关于征集评选 《全国地方党校科研精选文库（2017）》丛书书稿的通知</h2>
          <div className={styles.info}>
            <span>发布时间：{dateFilter(CreateDate,'yyyy-MM-dd')}</span>
            <span>作者：{Author||Creator}</span>
            <span>来源：{Source}</span>
            <span>浏览次数：{ClickCount}</span>
          </div>
          <div className={styles.handle}>
            <a href="">[收藏]</a>
            <a href="">[打印]</a>
            <a href="">[缩小字体]</a>
            <a href="">[放大字体]</a>
          </div>
        </div>
        <div className={styles.content} dangerouslySetInnerHTML={{__html: Content}}></div>
      </div>
    </div>
  )
}


TmNoticeDetail.propTypes = {
  noticeDetailData:PropTypes.object,
};
export default TmNoticeDetail;
