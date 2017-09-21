/**
 * 课程播放
 */
import React from 'react';
import {connect} from 'dva';
import PropTypes from 'prop-types';
import cs from 'classnames';
import styles from './play.less';
import TmDrag from './components/tmDrag'
const Play = ({play, dispatch, loading}) => {
  return (
    <div className={styles.play}>
      <TmDrag></TmDrag>
      <div className={cs(["container_24"])}>
        <div className="grid_7">
          play
        </div>
        <div className="grid_17">
        </div>
      </div>
    </div>
  );
};
Play.propTypes = {
  play: PropTypes.object.isRequired,
  dispatch: PropTypes.func,
  loading: PropTypes.object
};

export default connect(({play, loading}) => ({play, loading}))(Play);
