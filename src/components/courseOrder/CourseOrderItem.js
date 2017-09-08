import React from 'react';
import styles from './CourseOrderItem.less';
import PropTypes from 'prop-types'
import {Icon} from 'antd';

class CourseOrderItem extends React.Component {
  constructor(props) {
    super(props);
  }
  render () {
    let t = this;
    const {isActive,name,onOrderClick} = t.props;
    return (
      <span className={styles.orderItem}>
        <a onClick={onOrderClick.bind(t)}> {name} &nbsp;
          {
            isActive?<Icon type="caret-up" />:<Icon type="caret-down" />
          }
        </a>
      </span>
    )
  }
  componentWillMount() {
  }
  
  componentDidMount() {
  }
  
  componentWillReceiveProps(nextProps) {
  }
  
  shouldComponentUpdate(nextProps, nextState) {
    return true
  }
  
  componentWillUpdate(nextProps, nextState) {
  }
  
  componentDidUpdate(prevProps, prevState) {
  }
  
  componentWillUnmount() {
  }
}

CourseOrderItem.propTypes = {
  isActive:PropTypes.bool,
  name:PropTypes.string,
  onOrderClick:PropTypes.func,
}
export default CourseOrderItem;
