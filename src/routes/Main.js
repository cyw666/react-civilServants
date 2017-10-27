import React from 'react';
import {connect} from 'dva';
import PropTypes from 'prop-types';
import '../themes/index.less'

function Main({children, app, dispatch}) {
  return (
    <div>{children}</div>
  );
}

function mapStateToProps({app, loading}) {
  return {app, loading};
}
Main.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  app: PropTypes.object,
  loading: PropTypes.object,
  history: PropTypes.object
}
export default connect(mapStateToProps)(Main);
