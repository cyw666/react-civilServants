/**
 * 学习计划modal
 */
import React from 'react'
import PropTypes from 'prop-types'
import {Form, Input, Select, Modal} from 'antd';

const FormItem = Form.Item;
const {TextArea} = Input;
const AddMessage = ({
                      form: {
                        getFieldDecorator,
                        validateFieldsAndScroll,
                      },
                      closeModal,
                      showModal,
                      submitMessage,
                    }) => {
  const onPlanOk = () => {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      submitMessage(values)
    })
  }
  
  return (
    <div>
      <Modal
        title="添加留言"
        visible={showModal}
        onOk={onPlanOk}
        onCancel={closeModal}
      >
        <div>
          <form id="studyPlan">
            <FormItem hasFeedback label={"标题"} labelCol={{span: 5}} wrapperCol={{span: 19}}>
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: '请输入标题！',
                  },
                ],
                initialValue: ""
              })(<Input placeholder="请输入笔记内容"/>)}
            </FormItem>
            <FormItem hasFeedback label={"分类"} labelCol={{span: 5}} wrapperCol={{span: 19}}>
              {getFieldDecorator('class', {
                rules: [
                  {required: true, message: '请选择分类！',},
                ],
                initialValue: "Curricula"
              })(
                <Select placeholder="请选择分类">
                  <Option value="Curricula">课程建设</Option>
                  <Option value="Support">支持服务</Option>
                  <Option value="Platform">平台功能</Option>
                </Select>
              )}
            </FormItem>
            <FormItem hasFeedback label={"说明"} labelCol={{span: 5}} wrapperCol={{span: 19}}>
              {getFieldDecorator('content', {
                rules: [
                  {required: true, min: 1, max: 249, message: '请填写说明，最多249字符！'},
                ],
                initialValue: ""
              })(<TextArea placeholder="请输入说明内容" autosize={{minRows: 4, maxRows: 6}}/>)}
            </FormItem>
          </form>
        </div>
      </Modal>
    </div>
  )
}


AddMessage.propTypes = {
  closeModal: PropTypes.func,
  submitMessage: PropTypes.func,
  showModal: PropTypes.bool,
};
export default Form.create()(AddMessage);
