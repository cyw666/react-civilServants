/**
 * header
 */
import React from 'react'
import PropTypes from 'prop-types'
import cs from 'classnames'
import { Link } from 'dva/router'
import { Input, Icon, Button } from 'antd';
import styles from './Header.less'
import phoneImg from '../../assets/phone.png'
import logo from '../../assets/logo.png'
import redFlag from '../../assets/redFlag.png'
import appImg from '../../assets/appImg.png'
import weiXinImg from '../../assets/weiXinImg.png'

const Header = ({ addFavorite, setHome, inputChange, data }) => {
  return (
    <div>
      <div className={ styles.header }>
        <div className={ cs('container_24', [ `${styles.headerContent}` ]) }>
          <p className='grid_15'>欢迎来到干部教育网络学院！</p>
          <p className='grid_9'>
            <a rel="sidebar" onClick={ addFavorite }>收藏本站</a> |
            <Link to={ '/main/messageList' }> 在线留言</Link> |
            <a onClick={ setHome }> 设为首页</a> |
            <a> 联系我们</a>
            <span className={ styles.phone }>
              <img src={ phoneImg } alt="电话"/>
              <span>0571-28990788</span>
            </span>
          </p>
        </div>
      </div>
      <div className={ cs('container_24', [ `${styles.headerSearch}` ]) }>
        <ul className="clearFix">
          <li className="grid_8">
            <p className={ cs('pull-left', [ `${styles.logoImg}` ]) }>
              <img src={ logo } alt="logo"/>
            </p>
            <div className={ cs('pull-left', [ `${styles.logoText}` ]) }>
              <h3>干部教育网络学院</h3>
              <p>CADRE EDUCATION NETWORK COLLEGE</p>
            </div>
          </li>
          <li className={ cs('grid_9', [ `${styles.searchInput}` ]) }>
            <div className={ styles.mar }>
              <Input
                placeholder="请输入搜索内容..."
                prefix={ <Icon type="search" style={ { fontSize: 24, color: '#999' } }/> }
                value={ data.searchText }
                onChange={ inputChange }
                size="large"
              />
              <Button><Link to={ { pathname: '/main/searchGloable', search: `?keyword=${data.searchText}` } }
                            target="_blank" rel="noopener noreferrer">搜索</Link></Button>
            </div>
          </li>
          <li className="grid_7 clearFix">
            <p className="pull-left">
              <img className={ styles.redFlag } src={ redFlag } alt="红旗"/>
            </p>
            <p className={ cs('pull-left', [ `${styles.appImg}` ]) }>
              <img src={ appImg } alt="下载手机APP"/> <br/>
              <span>下载手机APP</span>
            </p>
            <p className={ cs('pull-left', [ `${styles.appImg}` ]) }>
              <img src={ weiXinImg } alt="关注公众号"/> <br/>
              <span>关注公众号</span>
            </p>
          </li>
        </ul>
      </div>
    </div>
  )
}


Header.propTypes = {
  addFavorite: PropTypes.func.isRequired,
  setHome: PropTypes.func.isRequired,
  inputChange: PropTypes.func.isRequired,
  data: PropTypes.object
}
export default Header;
