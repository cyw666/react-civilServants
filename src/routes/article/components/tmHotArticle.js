/**
 * 热门文章
 */
import React from 'react'
import PropTypes from 'prop-types'
import cs from 'classnames'
import { Link } from 'dva/router'
import { Row, Col, Spin } from 'antd';
import styles from './tmHotArticle.less'
import GeneralHead from '../../../components/GeneralHead/GeneralHead'

const TmHotArticle = ({
                        loading,
                        hotArticleData
                      }) => {
  const rankContentList = hotArticleData.ListData.map((item, index) => {
    return (
      <Row key={ item.Id } className={ cs({ 'rankContent': true, 'rankBg': index % 2 !== 0 }) }>
        {
          index < 3 ?
            <Col span={ 5 }>
              <span className={ cs({
                'contentList': true,
                'rankFirstBg': index === 0,
                'rankSecondBg': index === 1,
                'rankThirdBg': index === 2
              }) }></span>
            </Col>
            :
            <Col span={ 5 }><span className="contentList">{ index + 1 }</span></Col>
        }
        <Col span={ 19 }>
          <span className="contentList" title={ item.Name }>
            <Link to={ { pathname: '/main/articleDetail', search: `?id=${item.Id}` } } target="_blank"
                  rel="noopener noreferrer">{ item.Name }</Link>
          </span>
        </Col>
      </Row>
    )
  })
  return (
    <div className={ styles.tmHotArticle }>
      <GeneralHead showIcon={ false } title={ '热门文章' }></GeneralHead>
      <Spin spinning={ loading }>
        <div className={ styles.hotArticleList }>
          { rankContentList }
        </div>
      </Spin>
    </div>
  )
}


TmHotArticle.propTypes = {
  loading: PropTypes.bool,
  hotArticleData: PropTypes.object,
};
export default TmHotArticle;
