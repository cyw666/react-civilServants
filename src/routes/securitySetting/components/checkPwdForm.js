/**
 * 输入密码 form
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Input, Form, Button } from 'antd';
import styles from './checkPwdForm.less'

const FormItem = Form.Item;
const CheckPwdForm = ({
                        form: {
                          getFieldDecorator,
                          validateFieldsAndScroll,
                        },
                        checkPwd,
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
      span: 9,
      offset: 5,
    },
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        checkPwd(values);
        // console.log('Received values of form: ', values);
      }
    });
  }
  return (
    <Form onSubmit={ handleSubmit } className={ styles.checkPwdform }>
      <FormItem
        hasFeedback
        label="请输入密码"
        { ...formItemLayout }
      >
        { getFieldDecorator('pwd', {
          rules: [ { required: true, message: '密码不能为空！' } ],
        })(
          <Input type="password" placeholder="请输入密码"/>
        ) }
      </FormItem>
      <FormItem { ...tailFormItemLayout }>
        <Button type="primary" htmlType="submit" className={ styles[ "login-form-button" ] }>确定</Button>
      </FormItem>
    </Form>
  )
}


CheckPwdForm.propTypes = {
  form: PropTypes.object,
  checkPwd: PropTypes.func,
};
export default Form.create()(CheckPwdForm);

