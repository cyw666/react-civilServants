import React from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import { renderRoutes } from 'react-router-config'
import './Main.less';

/*判断用户是否在线*/
class Main extends React.Component {
  constructor(props) {
    super(props);
  }
  
  componentWillMount() {
  
  }
  
  componentWillReceiveProps(nextProps) {
  }
  
  shouldComponentUpdate(nextProps, nextState) {
    return true
  }
  
  render() {
    const { route } = this.props;
    return (
      <div className="app">
        { renderRoutes(route.routes) }
      </div>
    )
  }
}


function mapStateToProps({ app, loading }) {
  return { app, loading };
}

Main.propTypes = {
  children: PropTypes.element,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  app: PropTypes.object,
  loading: PropTypes.object,
  history: PropTypes.object,
  route: PropTypes.object
}

export default connect(mapStateToProps)(Main);
