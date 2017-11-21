/**
 * 滑块
 */
import React from 'react'
import PropTypes from 'prop-types'
import {Slider} from 'antd';
import styles from './tmDrag.less'

class TmDrag extends React.Component {
  state = {
    value: 0,
    showSlider: true
  }
  onChange = (value) => {
    this.setState({value});
  }
  
  onAfterChange = (value) => {
    if (value < 100) {
      this.setState({value: 0});
    } else {
      this.setState({showSlider: false});
      this.props.onDragReady();
    }
  }
  
  render() {
    const {value, showSlider} = this.state;
    return (
      <div>
        {
          showSlider &&
          <div>
            <div className={styles.playBg}></div>
            <div className={styles.tmDrag}>
              <div className={styles.dragText}>
                拖动滑块验证
              </div>
              <Slider value={value} onChange={this.onChange} onAfterChange={this.onAfterChange}/>
            </div>
          
          </div>
        }
      </div>
    );
  }
}

TmDrag.propTypes = {
  onDragReady: PropTypes.func
};
export default TmDrag;
