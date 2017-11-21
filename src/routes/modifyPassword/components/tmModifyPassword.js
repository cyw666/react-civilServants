/**
 * 修改密码模块
 */
import React from 'react'
import PropTypes from 'prop-types'
import {Breadcrumb, Icon, Input, Form, Row, Col, Button} from 'antd';
import {Link} from 'dva/router'
import GeneralHead from '../../../components/GeneralHead/GeneralHead'
import styles from './tmModifyPassword.less'

const FormItem = Form.Item;
const TmModifyPassword = ({
                            form: {
                              getFieldDecorator,
                              validateFieldsAndScroll,
                              getFieldValue,
                              validateFields,
                            },
                            updatePwd,
                            loading
                          }) => {
  const formItemLayout = {
    labelCol: {
      span: 5,
    },
    wrapperCol: {
      span: 12,
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      span: 12,
      offset: 5,
    },
  };
  const checkPassword = (rule, value, callback) => {
    if (value && value === getFieldValue('oldPwd')) {
      callback('原密码与新密码不能一致!');
    } else {
      callback();
    }
  }
  const checkNewPassword = (rule, value, callback) => {
    if (value && value !== getFieldValue('newPwd')) {
      callback('输入的新密码不一致!');
    } else {
      callback();
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        updatePwd(values);
        console.log('Received values of form: ', values);
      }
    });
  }
  return (
    <div className={styles.tmModifyPassword}>
      <GeneralHead showIcon={false} title="修改密码"></GeneralHead>
      <div className={styles.content}>
        <Breadcrumb>
          <Breadcrumb.Item><Icon type="setting" style={{fontSize: 16, color: '#656565'}}/> 您的当前位置：</Breadcrumb.Item>
          <Breadcrumb.Item><a href="/indexPage">首页</a></Breadcrumb.Item>
          <Breadcrumb.Item>修改密码</Breadcrumb.Item>
        </Breadcrumb>
        <div className={styles.form}>
          <Form onSubmit={handleSubmit} className="login-form">
            <FormItem
              hasFeedback
              label="原密码"
              {...formItemLayout}
            >
              {getFieldDecorator('oldPwd', {
                rules: [{required: true, message: '原密码不能为空！'}],
              })(
                <Input type="password" placeholder="请输入原密码"/>
              )}
            </FormItem>
            <FormItem
              hasFeedback
              label="新密码"
              {...formItemLayout}
            >
              {getFieldDecorator('newPwd', {
                rules: [
                  {required: true, message: '新密码不能为空!'},
                  {validator: checkPassword}
                ],
              })(
                <Input type="password" placeholder="请输入新密码"/>
              )}
            </FormItem>
            <FormItem
              label="确认新密码"
              hasFeedback
              {...formItemLayout}
            >
              {getFieldDecorator('repeatNewPwd', {
                rules: [
                  {required: true, message: '确认新密码不能为空！'},
                  {validator: checkNewPassword}
                ],
              })(
                <Input type="password" placeholder="请再次输入新密码！"/>
              )}
            </FormItem>
            <FormItem {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit" className={styles["login-form-button"]}>确定</Button>
              <Button className={styles["securitySetting"]}>
                <Link to="/main/securitySetting">设置密保</Link>
              </Button>
            </FormItem>
          </Form>
        </div>
      </div>
    </div>
  )
}


TmModifyPassword.propTypes = {
  loading: PropTypes.bool,
  form: PropTypes.object,
  updatePwd: PropTypes.func,
};
export default Form.create()(TmModifyPassword);
