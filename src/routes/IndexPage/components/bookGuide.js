/**
 * 电子书推荐
 */
import React from 'react'
import PropTypes from 'prop-types'
import {Spin} from 'antd'
import {Link} from 'dva/router'
import GeneralHead from '../../../components/GeneralHead/GeneralHead'
import Img from '../../../components/Img/Img'
import styles from './bookGuide.less'
import {delHtmlTag, wordLimit} from '../../../utils/index'
const BookGuide = ({loading, bookListData}) => {
  const {ListData, Path} = bookListData;
  const bookList = ListData.map((item, index) => {
    return (
      <li key={index}>
        <p className={styles.bookImg}>
          <Link to="bookDetail" target="_blank" rel="noopener noreferrer">
            <Img src={Path + item.Icon} alt={item.Name}/>
          </Link>
        </p>
        <div className={styles.content}>
          <h4 className={styles.title}>
            <Link to="bookDetail" target="_blank" rel="noopener noreferrer">{wordLimit(item.Name, 17)}</Link>
          </h4>
          <p className={styles.desc}>简介：{wordLimit(delHtmlTag(item.Content), 23)}</p>
          <p className={styles.author}>作者：{item.Author}</p>
          <p className={styles.clickCount}>点击数：{item.ClickCount}</p>
        </div>
      </li>
    )
  });
  return (
    <div className={styles.bookGuide}>
      <GeneralHead showIcon={true} title="电子书" url="library"></GeneralHead>
      <Spin spinning={loading}>
        <div className={styles.bookList}>
          <ul>
            {bookList}
          </ul>
        </div>
      </Spin>
    </div>
  );
};
BookGuide.propTypes = {
  loading: PropTypes.bool,
  bookListData: PropTypes.object,
};

export default BookGuide;
