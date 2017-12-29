/**
 * 考试列表（模板）
 */

import React from 'react'
import PropTypes from 'prop-types'
import {Spin, Button} from 'antd';
import styles from './tmArticleCategory.less'
import GeneralHead from '../../../components/GeneralHead/GeneralHead'

const TmArticleCategory = ({
                             loading,
                             searchArticle,
                             dataList
                           }) => {
  const categoryList = dataList.ListData.map((item, index) => {
    return (
      <li key={item.Id}><Button type="primary" onClick={() => {
        searchArticle({categoryId: item.Id, titleNav: item.Name, categoryCode: ''})
      }}>{item.Name}</Button></li>
    )
  })
  return (
    <div className={styles.tmArticleCategory}>
      <GeneralHead showIcon={false} title="文章分类"></GeneralHead>
      <div className={styles.categoryContent}>
        <Spin spinning={loading}>
          <ul>
            {categoryList}
          </ul>
        </Spin>
      </div>
    </div>
  )
}


TmArticleCategory.propTypes = {
  loading: PropTypes.bool,
  searchArticle: PropTypes.func,
  dataList: PropTypes.object,
};
export default TmArticleCategory;
