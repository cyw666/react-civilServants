/**
 * 登陆页
 */
import React from 'react';
import {connect} from 'dva';
import PropTypes from 'prop-types';
import cs from 'classnames';
import {Form, Input, Icon, Row, Col, Checkbox, Button, Spin} from 'antd';
import {Link} from 'dva/router'
import styles from './login.less';
const FormItem = Form.Item;

const Login = ({
  login: {
    token,
    loginValue,
    showCode,
    codeImg,
  },
  form: {
    getFieldDecorator,
    validateFieldsAndScroll,
  },
  dispatch,
  loading
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        const loginParams = Object.assign({}, values, token)
        dispatch({type: 'login/login', payload: loginParams})
        dispatch({type: 'login/updateState', payload: {loginValue:loginParams}})
      }
    });
  }
  const inputChange = () => {
    dispatch({type: 'login/updateState', payload: {showCode: true}})
  }
  return (
    <div className={cs(["container_24"])}>
      <div className="grid_24">
        <Spin spinning={loading.effects['login/login'] || false}>
          <div className={styles.login}>
            <Form onSubmit={handleSubmit} className="login-form">
              <FormItem hasFeedback>
                {getFieldDecorator('Account', {
                  initialValue: loginValue.Account,
                  rules: [{required: true, message: '请输入用户名!'}],
                })(
                  <Input prefix={<Icon type="user" style={{fontSize: 13}}/>} onChange={inputChange}
                         placeholder="请输入用户名"/>
                )}
              </FormItem>
              <FormItem hasFeedback>
                {getFieldDecorator('PassWord', {
                  initialValue: loginValue.PassWord,
                  rules: [{required: true, message: '请输入密码!'}],
                })(
                  <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>} onChange={inputChange} type="password"
                         placeholder="请输入密码"/>
                )}
              </FormItem>
              {
                showCode &&
                <FormItem>
                  <Row gutter={8}>
                    <Col span={14}>
                      {getFieldDecorator('ValidateCode', {
                        initialValue: "",
                        rules: [{required: true, message: '请输入验证码!'}],
                      })(
                        <Input prefix={<Icon type="code-o" style={{fontSize: 13}}/>} placeholder="请输入验证码"/>
                      )}
                    </Col>
                    <Col span={10}>
                      <a onClick={() => dispatch({type: 'login/getVerifyCode'})}>
                        <img className="codeImg" alt="刷新验证码！" src={codeImg}/>
                      </a>
                    </Col>
                  </Row>
                </FormItem>
              }
              
              <FormItem>
                {getFieldDecorator('RememberMe', {
                  valuePropName: 'checked',
                  initialValue: true,
                })(
                  <Checkbox>记住密码</Checkbox>
                )}
                <Link to="forgetPassword" className={styles["login-form-forgot"]}>忘记密码？</Link>
                <Button type="primary" size={'large'} htmlType="submit" className={styles["login-form-button"]}>
                  登陆
                </Button>
                <Link to="register">立即注册</Link>
              </FormItem>
            </Form>
          </div>
        </Spin>
      </div>
    </div>
  );
};
Login.propTypes = {
  login: PropTypes.object.isRequired,
  form: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object
};

export default connect(({login, loading}) => ({login, loading}))(Form.create()(Login));
