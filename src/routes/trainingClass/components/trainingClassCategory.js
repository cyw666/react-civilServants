/**
 * 班级分类
 */
import React from 'react'
import PropTypes from 'prop-types'
import {Spin} from 'antd'
import styles from './trainingClassCategory.less'
import GeneralHead from '../../../components/GeneralHead/GeneralHead'
const TrainingClassCategory = ({classCategory, searchClass, loading}) => {
  const {ListData, TitleNav} = classCategory;
  const classCategoryList = ListData.map((item, index) => {
    return (
      <li key={index}><a onClick={() => {
        searchClass({rows: 10, categoryId: item.Id})
      }}>{item.Name}</a></li>
    )
  });
  return (
    <div className={styles.trainingClassCategory}>
      <GeneralHead showIcon={false} title={TitleNav}></GeneralHead>
      <Spin spinning={loading}>
        <ul className={styles.name}>
          {classCategoryList}
        </ul>
      </Spin>
    </div>
  )
}


TrainingClassCategory.propTypes = {
  classCategory: PropTypes.object,
  searchClass: PropTypes.func,
  loading: PropTypes.bool,
};
export default TrainingClassCategory;
