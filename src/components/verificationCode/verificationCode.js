/**
 * 验证码
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd'

class VerificationCode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "发送验证码",
      second: 60,
      disabled: false,
      timerId: null
    }
    this.lock = false;
  }
  
  sendCodeClick() {
    if (!this.lock) {
      let t = this;
      let timer = setInterval(() => {
        let { second, timerId } = t.state;
        if (second <= 0) {
          clearInterval(timerId);
          t.setState({
            text: '发送验证码',
            second: 60,
            disabled: false,
            timerId: null
          })
        } else {
          second--;
          t.setState({
            text: `${second}秒后可重发`,
            second: second,
            disabled: true,
            timerId: timer
          })
        }
      }, 1000)
    }
  }
  
  render() {
    const { sendCode } = this.props
    const { text, disabled } = this.state
    return (
      <Button size="large" disabled={ disabled } onClick={ () => {
        sendCode(this.sendCodeClick.bind(this))
      } }>{ text }</Button>
    )
  }
  
  componentDidMount() {
    
  }
  
  componentWillUnmount() {
    this.lock = true;
    clearInterval(this.state.timerId);
    this.setState({
      timerId: null
    })
  }
  
}


VerificationCode.propTypes = {
  sendCode: PropTypes.func,
}

export default VerificationCode
