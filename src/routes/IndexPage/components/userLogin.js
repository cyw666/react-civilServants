/**
 * 用户登录（首页）
 */
import React from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import {Form, Icon, Input, Button, Checkbox, Spin} from 'antd';
import {Link} from 'dva/router'
import bannerText from '../../../assets/bannerText.png'
import styles from './userLogin.less';

const FormItem = Form.Item;
const UserLogin = ({
  form:{
    getFieldDecorator,
    validateFieldsAndScroll,
  },
  indexPage:{
    userMessage,
    loginValue,
  },
  pushSubmit,
  pushOut,
  loading
}) => {
  let handleSubmit = (e) => {
    e.preventDefault();
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        pushSubmit(values);
      }
    });
  }
  let loginOut = (e) => {
    e.preventDefault();
    pushOut();
  }
  return (
    <div className={styles.loginBg}>
      <div className={styles.bigBanner}>
        <img className={styles.bannerText} src={bannerText} alt="banner"/>
      </div>
      <div className={styles.userLogin}>
        <div className={styles.login}>
          <Spin spinning={loading}>
            {
              !userMessage.Model.Name ?
                <div className={styles.loginBefore}>
                  <h2 className={styles.title}>
                    用户登录
                  </h2>
                  <Form onSubmit={handleSubmit} className="login-form">
                    <FormItem hasFeedback>
                      {getFieldDecorator('Account', {
                        initialValue: loginValue.Account,
                        rules: [{required: true, message: '请输入用户名!'}],
                      })(
                        <Input prefix={<Icon type="user" style={{fontSize: 13}}/>} placeholder="用户名"/>
                      )}
                    </FormItem>
                    <FormItem hasFeedback>
                      {getFieldDecorator('PassWord', {
                        initialValue: loginValue.PassWord,
                        rules: [{required: true, message: '请输入密码!'}],
                      })(
                        <Input prefix={<Icon type="lock" style={{fontSize: 13}}/>} type="password" placeholder="密码"/>
                      )}
                    </FormItem>
                    <FormItem>
                      {getFieldDecorator('RememberMe', {
                        valuePropName: 'checked',
                        initialValue: loginValue.RememberMe,
                      })(
                        <Checkbox>记住密码</Checkbox>
                      )}
                      <a className="login-form-forgot" href="">忘记密码</a>
                      <Button type="primary" htmlType="submit" className="login-form-button">
                        登陆
                      </Button>
                      <Button className="login-form-button">
                        注册
                      </Button>
                    </FormItem>
                  </Form>
                </div>
                :
                <div className={styles.loginSuccess}>
                  <h2 className={cs([`${styles.title}`], [`${styles.titleInfo}`])}>
                    个人信息
                  </h2>
                  <ul className={styles.loginInfo}>
                    <li>欢迎您:<b className="red"> &nbsp;&nbsp;{userMessage.Model.Name}</b></li>
                    <li>
                      <span>年度学时：<span className="red"> {userMessage.Model.BatchTotalCredit}&nbsp;&nbsp;</span></span>
                      <span>当前学时：<span className="red"> {userMessage.Model.SumCredit}&nbsp;&nbsp;</span></span>
                    </li>
                    <li>
                      <span>个人学习档案</span>
                      <span className="pull-right"><Link>详细&gt;&gt;</Link></span>
                    </li>
                    <li>
                      <p className="pull-left">您有<span className="red"> {userMessage.Model.UnRead} </span>条新通知！</p>
                      <span className="pull-right"><Link>查看详情&gt;&gt;</Link></span>
                    </li>
                    <li>
                      <Link>修改密码</Link>&nbsp;&nbsp;|&nbsp;&nbsp;
                      <Link>修改信息</Link> &nbsp;|&nbsp;
                      {
                        userMessage.UserType === '管理员' &&
                        <span><a href="/admin" target="_blank">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;进入管理控制台</a></span>
                      }
                    </li>
                    <li className={styles.exit}>
                      <Button type="primary" className="exit" onClick={loginOut}>退出</Button>
                    </li>
                  </ul>
                </div>
            }
          </Spin>
        </div>
      </div>
    </div>
  );
};
UserLogin.propTypes = {
  form: PropTypes.object,
  indexPage: PropTypes.object,
  pushSubmit: PropTypes.func,
  pushOut: PropTypes.func,
  loading: PropTypes.bool,
};

export default Form.create()(UserLogin);
