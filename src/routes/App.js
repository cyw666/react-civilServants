import React from 'react';
import {connect} from 'dva';
import {message} from 'antd'
import PropTypes from 'prop-types';
import Header from '../components/Header/Header'
import NavBar from '../components/NavBar/NavBar'
import Footer from '../components/Footer/Footer'
import '../themes/index.less'
import './App.less';

function App({children, app, dispatch}) {
  const addFavorite = () => {
    let url = window.location;
    let title = document.title;
    var ua = navigator.userAgent.toLowerCase();
    if (ua.indexOf("360se") > -1) {
      message.warn("由于360浏览器功能限制，请按 Ctrl+D 手动收藏！");
    }
    else if (ua.indexOf("msie 8") > -1) {
      window.external.AddToFavoritesBar(url, title); //IE8
    }
    else if (document.all) {
      try {
        window.external.addFavorite(url, title);
      } catch (e) {
        message.warn('您的浏览器不支持,请按 Ctrl+D 手动收藏!');
      }
    }
    else if (window.sidebar) {
      window.sidebar.addPanel(title, url, "");
    }
    else {
      message.warn('您的浏览器不支持,请按 Ctrl+D 手动收藏!');
    }
  }
  const setHome = (event) => {
    let url = window.location.href;
    try {
      event.target.style.behavior = 'url(#default#homepage)';
      event.target.setHomePage(url);
    } catch (e) {
      if (window.netscape) {
        try {
          netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
        } catch (e) {
          message.warn("抱歉，此操作被浏览器拒绝！\n\n请在浏览器地址栏输入“about:config”并回车然后将[signed.applets.codebase_principal_support]设置为'true'");
        }
      } else {
        message.warn("抱歉，您所使用的浏览器无法完成此操作。\n\n您需要手动将【" + url + "】设置为首页。");
      }
    }
  }
  const inputChange = (e) => {
    dispatch({
      type: 'app/updateState',
      payload: {
        searchText: e.target.value
      }
    })
  }
  
  const headerProps = {
    addFavorite,
    setHome,
    inputChange,
    data: app
  }
  return (
    <div>
      <Header {...headerProps}></Header>
      <NavBar></NavBar>
      {children}
      <Footer blogrollData={app.blogrollData}></Footer>
    </div>
  );
}

function mapStateToProps({app, loading}) {
  return {app, loading};
}

App.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  app: PropTypes.object,
  loading: PropTypes.object,
  history: PropTypes.object
}
export default connect(mapStateToProps)(App);
