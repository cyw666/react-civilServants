/**
 * 课程排行模块
 */
import React from 'react'
import PropTypes from 'prop-types'
import cs from 'classnames'
import {Link} from 'dva/router'
import {Row, Col} from 'antd';
import styles from './tmCourseRankingList.less'
import GeneralHead from '../../../components/GeneralHead/GeneralHead'

const TmCourseRankingList = ({rankData}) => {
  
  const rankContentList = rankData.ListData.map((item, index) => {
    return (
      <Row key={index} className={cs({'rankContent': true, 'rankBg': index % 2 !== 0})}>
        {
          index < 3 ? <Col span={6}><span className={cs({
              'contentList': true,
              'rankFirstBg': index === 0,
              'rankSecondBg': index === 1,
              'rankThirdBg': index === 2
            })}></span></Col> :
            <Col span={6}><span className="contentList">{index + 1}</span></Col>
        }
        <Col span={12}>
          <span className="contentList" title={item.Name}>
            <Link to={{pathname: '/courseDetail', query: {id: item.Id}}} target='_blank' rel="noopener noreferrer">
              {item.Name}
              </Link>
          </span>
        </Col>
        <Col span={6}><span className="contentList">{item.Total}</span></Col>
      </Row>
    )
  })
  
  return (
    <div className={styles.tmCourseRankingList}>
      <GeneralHead showIcon={false} title={'课程排行'}></GeneralHead>
      <Row className="rankHeader">
        <Col span={6}><span className="headerList">排行</span></Col>
        <Col span={12}><span className="headerList">课程名称</span></Col>
        <Col span={6}><span className="headerList">点击数</span></Col>
      </Row>
      {rankContentList}
    </div>
  )
}


TmCourseRankingList.propTypes = {
  rankData: PropTypes.object
};
export default TmCourseRankingList;
