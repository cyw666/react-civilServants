/**
 * 通知公告（模板）
 */
import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'dva/router'
import {Breadcrumb, Icon, Spin} from 'antd';
import {dateFilter} from '../../../utils/index'
import styles from './tmNoticeDetail.less'
const TmNoticeDetail = ({noticeDetailData, favoriteAdd, favoriteDelete, loading, breadcrumbItem}) => {
  const {
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
  } = noticeDetailData;
  const length = breadcrumbItem.length;
  const breadcrumbItemList = breadcrumbItem.map((item, index) => {
    if (index + 1 < length) {
      return (<Breadcrumb.Item key={index}><Link to={item.url}>{item.name}</Link></Breadcrumb.Item>)
    } else {
      return (<Breadcrumb.Item key={index}>{item.name}</Breadcrumb.Item>)
    }
  })
  return (
    <div className={styles.tmNoticeDetail}>
      <Breadcrumb>
        <Breadcrumb.Item><Icon type="setting" style={{fontSize: 16, color: '#656565'}}/> 您的当前位置：</Breadcrumb.Item>
        {breadcrumbItemList}
      </Breadcrumb>
      <div className={styles.articleContent}>
        <Spin spinning={loading}>
          <div className={styles.articleHeader}>
            <h2>{Name}</h2>
            <div className={styles.info}>
              <span>发布时间：{dateFilter(CreateDate, 'yyyy-MM-dd')}</span>
              <span>作者：{Author || Creator}</span>
              <span>来源：{Source}</span>
              <span>浏览次数：{ClickCount}</span>
            </div>
            <div className={styles.handle}>
              {
                FavoriteId ?
                  <a onClick={() => {
                    favoriteDelete(FavoriteId)
                  }}>[取消收藏]</a> :
                  <a onClick={() => {
                    favoriteAdd(Id, 'Notice', Name, 0)
                  }}>[收藏]</a>
              }
              {
                AttachmentName &&
                <a href={"/Content/Upload/Attachment/" + AttachmentName}>[附件下载]</a>
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
  noticeDetailData: PropTypes.object,
  loading: PropTypes.bool,
  favoriteAdd: PropTypes.func,
  favoriteDelete: PropTypes.func,
  breadcrumbItem: PropTypes.array,
};
export default TmNoticeDetail;
