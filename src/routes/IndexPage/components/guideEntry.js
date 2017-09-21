/**
 * 快速入口
 */
import React from 'react';
import {Link} from 'dva/router'
import GeneralHead from '../../../components/GeneralHead/GeneralHead'
import styles from './guideEntry.less';
import entrance1 from '../../../assets/entrance1.png'
import entrance2 from '../../../assets/entrance2.png'
import entrance3 from '../../../assets/entrance3.png'
import entrance4 from '../../../assets/entrance4.png'
import entrance5 from '../../../assets/entrance5.png'
import entrance6 from '../../../assets/entrance6.png'
const GuideEntry = () => {
  let guideListData = [
    {title: '平台介绍', imgSrc: entrance1, url: 'articleDetail'},
    {title: '考核规则', imgSrc: entrance2, url: 'articleDetail'},
    {title: '常见问题', imgSrc: entrance3, url: 'articleDetail'},
    {title: '问卷调查', imgSrc: entrance4, url: 'articleDetail'},
    {title: '学员心声', imgSrc: entrance5, url: 'articleDetail'},
    {title: '在线留言', imgSrc: entrance6, url: 'articleDetail'},
  ];
  let guideList = guideListData.map((item, index) => {
    return (
      <li key={index}>
        <Link to={item.url} target="_blank" rel="noopener noreferrer" className={styles.professionals}>
          <img src={item.imgSrc} alt={item.title}/>
          <p>{item.title}</p>
        </Link>
      </li>
    )
  })
  return (
    <div className={styles.guideEntry}>
      <GeneralHead showIcon={false} title="快速入口"></GeneralHead>
      <div className={styles.guideContent}>
        <ul>
          {guideList}
        </ul>
      </div>
    </div>
  );
};
export default GuideEntry;
