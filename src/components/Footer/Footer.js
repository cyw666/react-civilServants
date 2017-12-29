/**
 * Footer
 */
import React from 'react'
import PropTypes from 'prop-types'
import cs from 'classnames'
import styles from './Footer.less'
import GeneralHead from '../GeneralHead/GeneralHead'
import linkLogo1 from '../../assets/linkLogo1.png'
import linkLogo4 from '../../assets/linkLogo4.png'
import linkLogo8 from '../../assets/linkLogo8.png'
import linkLogo3 from '../../assets/linkLogo3.png'
import linkLogo9 from '../../assets/linkLogo9.png'
import linkLogo7 from '../../assets/linkLogo7.png'
import {Menu, Dropdown, Button, Icon} from 'antd';

const Footer = ({blogrollData}) => {
  const dropdown = blogrollData["ListData"].length > 0 && blogrollData["ListData"].map((item1, index1) => {
    const menuItem = item1["Nodes"].map((item2, index2) => {
      return (
        <Menu.Item key={index2}>
          <a href={item2.Url} target="_blank" rel="noopener noreferrer">{item2.Name}</a>
        </Menu.Item>
      )
    })
    const menu = (
      <Menu>
        {menuItem}
      </Menu>
    );
    return (
      <Dropdown overlay={menu} trigger={['click']} key={item1.Id}>
        <Button className={cs({[`${styles.first}`]: index1 == 0})}>
          ---{item1.Name}--- <Icon type="down"/>
        </Button>
      </Dropdown>
    )
  });
  return (
    <div className={styles.footer}>
      <div className={cs(["container_24"])}>
        <GeneralHead showIcon={false} title="友情链接"></GeneralHead>
        <ul className={styles.imgLink}>
          <li><a href="http://www.hngbwlxy.gov.cn" target="_blank" rel="noopener noreferrer"><img src={linkLogo1}
                                                                                                  alt=""/></a></li>
          <li><a href="http://www.hngbjy.com/" target="_blank" rel="noopener noreferrer"><img src={linkLogo4}
                                                                                              alt=""/></a></li>
          <li><a href="http://122.225.101.117:81/#/main" target="_blank" rel="noopener noreferrer"><img src={linkLogo8}
                                                                                                        alt=""/></a>
          </li>
          <li><a href="http://www.bhgbzx.gov.cn" target="_blank" rel="noopener noreferrer"><img src={linkLogo3} alt=""/></a>
          </li>
          <li><a href="http://gjwlxy.ljxfw.gov.cn/Default.aspx" target="_blank" rel="noopener noreferrer"><img
            src={linkLogo9} alt=""/></a></li>
          <li className={styles.last}><a href="http://cqgj.12371.gov.cn/" target="_blank" rel="noopener noreferrer"><img
            src={linkLogo7} alt=""/></a>
          </li>
        </ul>
        <div className={styles.slideLink}>
          {dropdown}
        </div>
      </div>
      <div className={styles.footerBg}>
        <div className={styles.footerContent}>
          <p>主办单位：杭州精英在线教育科技股份有限公司  &nbsp;&nbsp;&nbsp;承办单位：杭州精英在线教育科技股份有限公司 &nbsp;&nbsp;&nbsp; 联系电话：0571-28990788
            &nbsp;&nbsp;&nbsp</p>
          <p>Copyright © 2010-2017 All rights reserved. 浙ICP备06005845号</p>
          <p>建议使用：1024*768分辨率，16位以上颜色，IE8.0以上版本浏览器和中文大字符集web4</p>
        </div>
      </div>
    </div>
  )
}


Footer.propTypes = {
  blogrollData: PropTypes.object
};
export default Footer;
