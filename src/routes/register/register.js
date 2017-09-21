/**
 * 注册
 */
import React from 'react';
import {connect} from 'dva';
import PropTypes from 'prop-types';
import cs from 'classnames';
import {Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete} from 'antd';
import styles from './register.less';
import VerificationCode from '../../components/verificationCode/verificationCode'
import Agreement from './components/agreement'
import {getGroupList} from '../../services/main'
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const Register = ({
  register,
  form: {
    getFieldDecorator,
    validateFieldsAndScroll,
    getFieldValue,
    validateFields,
  },
  dispatch,
  loading
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        const {account, name, password, mobile, idcard, email, groupid, smgcode,agreement,confirmPassword} = values;
        const registerParams = {account, name, password, mobile, idcard, email, groupid:groupid[groupid.length-1], smgcode};
        dispatch({
          type: 'register/register',
          payload: registerParams
        })
        console.log('Received values of form: ', values);
      }
    });
  }
  const handleConfirmBlur = (e) => {
    const value = e.target.value;
    dispatch({
      type: 'register/updateState',
      payload: {
        confirmDirty: register.confirmDirty || !!value,
      }
    })
  }
  const checkPassword = (rule, value, callback) => {
    if (value && value !== getFieldValue('password')) {
      callback('输入的两个密码是不一致!');
    } else {
      callback();
    }
  }
  const checkConfirm = (rule, value, callback) => {
    if (value && register.confirmDirty) {
      validateFields(['confirmPassword'], {force: true});
    }
    callback();
  }
  const formItemLayout = {
    labelCol: {
      xs: {span: 24},
      sm: {span: 5},
    },
    wrapperCol: {
      xs: {span: 24},
      sm: {span: 12},
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 24,
        offset: 0,
      },
    },
  };
  const sendCode = (callback)=>{
    validateFields(['mobile'], { force: true },(err, values) => {
      if (!err) {
        dispatch({
          type:'register/sendMsg',
          payload:{mobileNo:values.mobile,callback}
        })
      }
    });
  }
  const loadGroupId = (selectedOptions) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;
    getGroupList({id:targetOption.value}).then((data)=>{
      targetOption.loading = false;
      let residences = [];
      data.forEach((item, index) => {
        residences.push({value: String(item.id), label: item.text, isLeaf:!item.SunFlag})
      })
      targetOption.children = residences;
      dispatch({
        type:'register/updateGroupList',
        payload:register.groupList
      })
    })
  }
  const agreementProps = {
    title:"干部教育网络学院注册服务协议",
    visible:register.registerModal,
    handleOk:()=>{
      dispatch({type:'register/updateState',payload:{registerModal:false}})
    },
    handleCancel:()=>{
      dispatch({type:'register/updateState',payload:{registerModal:false}})
    }
  }
  return (
    <div className={cs(["container_24"])}>
      <div className="grid_24">
        <div className={styles.register}>
          <h1>注册</h1>
          <Form onSubmit={handleSubmit}>
            <FormItem
              {...formItemLayout}
              label={(
                <span>
              用户名&nbsp;
                  {/*<Tooltip title="What do you want other to call you?">
                   <Icon type="question-circle-o" />
                   </Tooltip>*/}
            </span>
              )}
              hasFeedback
            >
              {getFieldDecorator('account', {
                rules: [{required: true, message: '用户名不能为空！', whitespace: true}],
              })(
                <Input placeholder="请输入用户名！"/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="登陆密码"
              hasFeedback
            >
              {getFieldDecorator('password', {
                rules: [{
                  required: true, message: '登陆密码不能为空！',
                }, {
                  validator: checkConfirm,
                }],
              })(
                <Input type="password" placeholder="请输入登陆密码！"/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="确认密码"
              hasFeedback
            >
              {getFieldDecorator('confirmPassword', {
                rules: [{
                  required: true, message: '两次输入密码不一致！',
                }, {
                  validator: checkPassword,
                }],
              })(
                <Input type="password" onBlur={handleConfirmBlur} placeholder="请再次输入密码！"/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="姓名"
              hasFeedback
            >
              {getFieldDecorator('name', {
                rules: [{required: true, message: '姓名不能为空！', whitespace: true}],
              })(
                <Input placeholder="请输入姓名！"/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="单位"
              hasFeedback
            >
              {getFieldDecorator('groupid', {
                rules: [{type: 'array', required: true, message: '请选择单位！'}],
              })(
                <Cascader
                  options={register.groupList}
                  changeOnSelect
                  displayRender={(label) => {
                    return label[label.length - 1]
                  }}
                  placeholder="请选择单位！"
                  loadData={loadGroupId}
                />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="身份证号"
              hasFeedback
            >
              {getFieldDecorator('idcard', {
                rules: [
                  {message: '身份证号格式有误！', pattern: /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/},
                ],
              })(
                <Input placeholder="请输入身份证号！"/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="电子邮箱"
              hasFeedback
            >
              {getFieldDecorator('email', {
                rules: [
                  {type: 'email', message: '邮箱格式有误!'},
                  {required: false, message: '电子邮箱不能为空!'}
                ],
              })(
                <Input placeholder="请输入电子邮箱！"/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="手机号"
              hasFeedback
            >
              {getFieldDecorator('mobile', {
                rules: [
                  {required: true, message: '手机号不能为空！'},
                  {message: '手机号格式有误！', pattern: /^1[3|4|5|7|8]\d{9}$/},
                ],
              })(
                <Input style={{width: '100%'}} placeholder="请输入手机号！"/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="验证码"
            >
              <Row gutter={8}>
                <Col span={12}>
                  {getFieldDecorator('smgcode', {
                    rules: [{required: true, message: '验证码不能为空!'}],
                  })(
                    <Input size="large" placeholder="请输入验证码！"/>
                  )}
                </Col>
                <Col span={12}>
                  {/*<Button size="large" onClick={sendCode}>{register.smgCodeText}</Button>*/}
                  <VerificationCode sendCode={sendCode}></VerificationCode>
                </Col>
              </Row>
            </FormItem>
            <FormItem {...tailFormItemLayout} style={{marginBottom: 8}}>
              {getFieldDecorator('agreement', {
                valuePropName: 'checked',
                initialValue:false
              })(
                <Checkbox>我已经阅读并同意 <a onClick={()=>dispatch({type:'register/updateState',payload:{registerModal:true}})}>《干部教育网络学院注册服务协议》</a></Checkbox>
              )}
            </FormItem>
            <FormItem {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">注册</Button>
            </FormItem>
          </Form>
        </div>
      </div>
      <Agreement {...agreementProps}></Agreement>
    </div>
  );
};
Register.propTypes = {
  register: PropTypes.object.isRequired,
  form: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object
};

export default connect(({register, loading}) => ({register, loading}))(Form.create()(Register));
