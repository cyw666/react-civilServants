/**
 * 通知公告（模板）
 */
import React from 'react'
import PropTypes from 'prop-types'
import styles from './tmNoticeDetail.less'
import { Link } from 'dva/router'
import {Breadcrumb,Icon,Spin} from 'antd';
import {dateFilter} from '../../../utils/index'
const TmNoticeDetail = ({noticeDetailData,favoriteAdd,favoriteDelete,loading}) => {
  const {Model:{
    AttachmentName,
    Author,
    ClickCount,
    Content,
    CreateDate,
    Creator,
    FavoriteId,
    Id,
    Name,
    Source
  }} = noticeDetailData;
  return (
    <div className={styles.tmNoticeDetail}>
      <Breadcrumb>
        <Breadcrumb.Item><Icon type="setting" style={{ fontSize: 16, color: '#656565' }}/> 您的当前位置：</Breadcrumb.Item>
        <Breadcrumb.Item><Link to={'/indexPage'}>首页</Link></Breadcrumb.Item>
        <Breadcrumb.Item><Link to={'/noticeList'}>通告公告</Link></Breadcrumb.Item>
        <Breadcrumb.Item>通知内容</Breadcrumb.Item>
      </Breadcrumb>
      <div className={styles.articleContent}>
        <Spin spinning={loading}>
          <div className={styles.articleHeader}>
            <h2>关于征集评选 《全国地方党校科研精选文库（2017）》丛书书稿的通知</h2>
            <div className={styles.info}>
              <span>发布时间：{dateFilter(CreateDate,'yyyy-MM-dd')}</span>
              <span>作者：{Author||Creator}</span>
              <span>来源：{Source}</span>
              <span>浏览次数：{ClickCount}</span>
            </div>
            <div className={styles.handle}>
              {
                FavoriteId?
                  <a onClick={() => {favoriteDelete(FavoriteId)}}>[取消收藏]</a>:
                  <a onClick={() => {favoriteAdd(Id,'Notice',Name,0)}}>[收藏]</a>
              }
              {
                AttachmentName&&
                <a href={"/Content/Upload/Attachment/"+AttachmentName}>[附件下载]</a>
              }
              <a href="javascript:window.print();">[打印]</a>
            </div>
          </div>
          <div className={styles.content} dangerouslySetInnerHTML={{__html: Content}}></div>
        </Spin>
      </div>
    </div>
  )
}


TmNoticeDetail.propTypes = {
  noticeDetailData:PropTypes.object,
  loading:PropTypes.bool,
  favoriteAdd:PropTypes.func,
  favoriteDelete:PropTypes.func,
};
export default TmNoticeDetail;
