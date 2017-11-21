/**
 * jy视频播放
 */
import React from 'react'
import PropTypes from 'prop-types'
import styles from './tmPlayJy.less'

const TmPlayJy = ({data}) => {
  const {
    BatchId,
    PortalURL,
    CourseId,
    LastPostion,
    PortalId,
    Url,
    UserId,
  } = data
  const src = `${Url}?url=${PortalURL}/api/CourseProcess/JYProcess?batchId=${BatchId}&portalId=${PortalId}&UserId=${UserId}&courseId=${CourseId}`
  // const src = `${Url}?url=test10.jy365.net/api/CourseProcess/JYProcess?batchId=${BatchId}&portalId=${PortalId}&UserId=${UserId}&courseId=${CourseId}`
  return (
    <div className={styles.tmPlayJy}>
      <iframe frameBorder="0" src={src}></iframe>
    </div>
  )
}


TmPlayJy.propTypes = {
  data: PropTypes.object,
};
export default TmPlayJy;
