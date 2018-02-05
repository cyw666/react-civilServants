/**
 * 修改密码模块
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'dva/router'
import { Breadcrumb, Icon, Input, Form, Button, Radio, Select } from 'antd';
import GeneralHead from '../../../components/GeneralHead/GeneralHead'
import styles from './tmChangeInfor.less'

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const TmChangeInfor = ({
                         form: {
                           getFieldDecorator,
                           validateFieldsAndScroll,
                           getFieldValue,
                           validateFields,
                         },
                         userInfo,
                         gradeList,
                         submit,
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
  const gradeOptions = gradeList.GroupInfoList.map((item, index) => {
    return (
      <Option key={ item.Id } value={ item.Id.toString() }>{ item.Name }</Option>
    )
  })
  const handleSubmit = (e) => {
    e.preventDefault();
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        submit(values);
        // console.log('Received values of form: ', values);
      }
    });
  }
  return (
    <div className={ styles.tmChangeInfor }>
      <GeneralHead showIcon={ false } title="修改信息"></GeneralHead>
      <div className={ styles.content }>
        <Breadcrumb>
          <Breadcrumb.Item><Icon type="setting" style={ { fontSize: 16, color: '#656565' } }/> 您的当前位置：</Breadcrumb.Item>
          <Breadcrumb.Item><Link to="/">首页</Link></Breadcrumb.Item>
          <Breadcrumb.Item>修改信息</Breadcrumb.Item>
        </Breadcrumb>
        <div className={ styles.form }>
          <Form onSubmit={ handleSubmit }>
            <FormItem
              { ...formItemLayout }
              label="账号"
            >
              <span className="ant-form-text">{ userInfo.Account }</span>
            </FormItem>
            <FormItem
              { ...formItemLayout }
              label="姓名"
            >
              <span className="ant-form-text">{ userInfo.Name }</span>
            </FormItem>
            <FormItem
              { ...formItemLayout }
              label="性别"
            >
              { getFieldDecorator('Sex', {
                initialValue: userInfo.Sex === 1 ? "男" : "女",
              })(
                <RadioGroup>
                  <Radio value="男">男</Radio>
                  <Radio value="女">女</Radio>
                </RadioGroup>
              ) }
            </FormItem>
            <FormItem
              { ...formItemLayout }
              label="部门"
            >
              <span className="ant-form-text">{ userInfo.GroupName }</span>
            </FormItem>
            <FormItem
              { ...formItemLayout }
              label="职位"
            >
              { getFieldDecorator('Grade', {
                initialValue: userInfo.Grade,
              })(
                <Select placeholder="请选择职位">
                  { gradeOptions }
                </Select>
              ) }
            </FormItem>
            <FormItem
              label="职务"
              { ...formItemLayout }
            >
              { getFieldDecorator('Business', {
                initialValue: userInfo.Business,
              })(
                <Input placeholder="请输入职务"/>
              ) }
            </FormItem>
            <FormItem
              label="固话"
              { ...formItemLayout }
            >
              { getFieldDecorator('Tel', {
                initialValue: userInfo.Tel,
                rules: [
                  { pattern: /(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}/, message: '固话格式有误!' },
                ],
              })(
                <Input placeholder="请输入固话"/>
              ) }
            </FormItem>
            <FormItem
              label="手机"
              { ...formItemLayout }
            >
              { getFieldDecorator('Mobile', {
                initialValue: userInfo.Mobile,
                rules: [
                  { pattern: /(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}/, message: '手机号码格式有误!' },
                ],
              })(
                <Input placeholder="请输入手机号码"/>
              ) }
            </FormItem>
            <FormItem
              label="邮箱"
              { ...formItemLayout }
            >
              { getFieldDecorator('Email', {
                initialValue: userInfo.Email,
                rules: [
                  { type: "email", message: '邮箱格式有误!' },
                ],
              })(
                <Input placeholder="例：example@email.com"/>
              ) }
            </FormItem>
            <FormItem { ...tailFormItemLayout }>
              <Button type="primary" htmlType="submit" className={ styles[ "login-form-button" ] }>提交</Button>
            </FormItem>
          </Form>
        </div>
      </div>
    </div>
  )
}


TmChangeInfor.propTypes = {
  loading: PropTypes.bool,
  form: PropTypes.object,
  userInfo: PropTypes.object,
  gradeList: PropTypes.object,
  submit: PropTypes.func,
};
export default Form.create()(TmChangeInfor);
