import React from 'react';
import PropTypes from 'prop-types';
import styles from './CountClick.less';

function CountClick({count, dispatch}) {
  return (
    <div className={styles.normal}>
      <div className={styles.record}>Highest Record: {count.record}</div>
      <div className={styles.current}>{count.current}</div>
      <div className={styles.button}>
        <button onClick={ () => {dispatch({type: 'count/add', payload: 1});} }> + </button>
      </div>
    </div>
  );
};

CountClick.propTypes = {
  dispatch: PropTypes.func,
  count: PropTypes.object
};
export default CountClick;
