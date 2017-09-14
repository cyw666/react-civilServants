/**
 * 专题学习
 */

import React from 'react';
import PropTypes from 'prop-types';
import {Spin} from 'antd';
import {Link} from 'dva/router'
import GeneralHead from '../../../components/GeneralHead/GeneralHead'
import Img from '../../../components/Img/Img'
import styles from './specialTraining.less';

const SpecialTraining = ({studySpecialData, loading}) => {
  let {ListData, ImagePath} = studySpecialData;
  const specialList = ListData.map((item, index) => {
    return (
      <li key={index}>
        <p>
          <Link to={item.Url} target="_blank">
            <Img src={ImagePath + '/' + item.Icon} alt={item.SeriesName}/>
          </Link>
        </p>
        <p className={styles.title} title={item.SeriesName}>
          <Link to="" target="_blank">{item.SeriesName}</Link>
        </p>
      </li>
    )
  });
  return (
    <div className={styles.specialTraining}>
      <GeneralHead showIcon={true} title="专题学习" url="specialLearning"></GeneralHead>
      <Spin spinning={loading}>
        <ul className={styles.specialContent}>
          {specialList}
        </ul>
      </Spin>
    </div>
  );
};
SpecialTraining.propTypes = {
  loading: PropTypes.bool,
  studySpecialData: PropTypes.object,
};

export default SpecialTraining;
