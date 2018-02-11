// also useful on the client for "pending navigation" where you
// load up all the data before rendering the next page when
// the url changes

// THIS IS JUST SOME THEORETICAL PSEUDO CODE :)
import React from 'react';
import PropTypes from 'prop-types'
import { withRouter, Route } from 'dva/router'
import { message } from 'antd'
import { authorization, keepOnline } from '../services/';

class PendingNavDataLoader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      previousLocation: null,
      isAuth: false,
      keepTimer: null
    }
  }
  
  keepLine() {
    //保持在线
    let timer = setInterval(function () {
      keepOnline().then((data) => {
        this.setState({ keepTimer: timer })
      }).catch(error => {
      });
    }, 60000);
    
  }
  
  goToLogin(from) {
    const history = this.props.history;
    history.push({ pathname: '/main/login', search: `?from=${from}` });
    // window.location.href = `/main/login?from=${from}`;
  }
  
  isOnLine(nextProps) {
    const { location } = nextProps;
    const { pathname, search } = location;
    let from = pathname + search;
    if (pathname === "/" || pathname === "/main/login" || pathname === "/main/register" || pathname === "/forgetPassword") {
      this.setState({
        previousLocation: null
      })
      return;
    }
    authorization().then((data) => {
      this.setState({
        isAuth: data.isauth,
      });
      if (!data.isauth) {
        if (data.Type === 3) {
          message.warn("在其他设备上已经登录");
          this.goToLogin(from);
        }
        else if (data.Type === 9) {
          message.warn("在其他平台登录或被其他人登录");
          this.goToLogin(from);
        }
        else if (data.Type === 10) {
          message.warn("您还不是本平台会员，将前往您所在的平台" + ":" + data.Message);
          window.location = "http://" + data.Message;
        }
        else if (data.Type === 11) {
          message.warn(data.Message);
          this.goToLogin(from);
        }
        else if (data.Type === 13) {
          message.warn(data.Message);
          this.goToLogin(from);
        }
        else if (data.Type === 15) {
          message.warn(data.Type + ":" + data.Message);
        }
        else {
          message.warn('请登录！');
          this.goToLogin(from);
        }
      } else {
        this.setState({
          previousLocation: null
        })
      }
    }).catch(error => {
      message.warn("服务器出错！请等待！");
    });
  }
  
  componentDidMount() {
    this.isOnLine(this.props);
    this.keepLine();
  }
  
  componentWillReceiveProps(nextProps) {
    const { pathname, search } = nextProps.location;
    const navigated = pathname !== this.props.location.pathname || search !== this.props.location.search;
    if (navigated) {
      // save the location so we can render the old screen
      this.setState({
        previousLocation: this.props.location
      })
      this.isOnLine(nextProps);
      // load data while the old screen remains
      /*loadNextData(routes, nextProps.location).then((data) => {
        putTheDataSomewhereRoutesCanFindIt(data)
        // clear previousLocation so the next screen renders
        this.setState({
          previousLocation: null
        })
      })*/
    }
  }
  
  componentWillUnmount() {
    clearInterval(this.keepTimer);
    this.setState({ keepTimer: null })
  }
  
  render() {
    const { children, location } = this.props
    const { previousLocation } = this.state
    
    // use a controlled <Route> to trick all descendants into
    // rendering the old location
    return (
      <Route
        location={ previousLocation || location }
        render={ () => children }
      />
    )
  }
}

PendingNavDataLoader.propTypes = {
  children: PropTypes.element,
  location: PropTypes.object,
  history: PropTypes.object,
  routes: PropTypes.array,
  match: PropTypes.object
}
// wrap in withRouter
export default withRouter(PendingNavDataLoader)