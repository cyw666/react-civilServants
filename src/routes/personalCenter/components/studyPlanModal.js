/**
 * 学习计划modal
 */
import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment';

import { dateFilter } from '../../../utils/index'
import {
  DatePicker,
  Form,
  Input,
  Select,
  Modal
} from 'antd';

const Option = Select.Option;
const FormItem = Form.Item;
const { TextArea } = Input;
const StudyPlanModal = ({
                          form: {
                            getFieldDecorator,
                            validateFieldsAndScroll,
                          },
                          closeModal,
                          showModal,
                          studyPlanData,
                          submitPlan,
  
                        }) => {
  const onPlanOk = () => {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      const content = {
        ...values,
        'planFinishDate': moment(values[ 'planFinishDate' ]).format('YYYY-MM-DD'),
        'remindDate': moment(values[ 'remindDate' ]).format('YYYY-MM-DD'),
      }
      submitPlan(content)
    })
  }
  
  return (
    <div>
      <Modal
        title="添加计划"
        visible={ showModal }
        onOk={ onPlanOk }
        onCancel={ closeModal }
      >
        <div>
          <form id="studyPlan">
            <FormItem hasFeedback label={ "课程名称" } labelCol={ { span: 5 } } wrapperCol={ { span: 19 } }>
              <p>{ studyPlanData.CourseName }</p>
            </FormItem>
            <FormItem hasFeedback label={ "计划完成日期" } labelCol={ { span: 5 } } wrapperCol={ { span: 19 } }>
              { getFieldDecorator('planFinishDate', {
                rules: [
                  {
                    required: true,
                    message: '请选择计划完成日期！',
                  },
                ],
                initialValue: moment(dateFilter(studyPlanData.PlanFinishDate, 'yyyy-MM-dd'), 'YYYY-MM-DD')
              })(<DatePicker format={ 'YYYY-MM-DD' }/>) }
            </FormItem>
            <FormItem hasFeedback label={ "开始提醒日期" } labelCol={ { span: 5 } } wrapperCol={ { span: 19 } }>
              { getFieldDecorator('remindDate', {
                rules: [
                  { required: true, message: '请选择开始提醒日期！', },
                ],
                initialValue: moment(dateFilter(studyPlanData.RemindDate, 'yyyy-MM-dd'), 'YYYY-MM-DD')
              })(<DatePicker format={ 'YYYY-MM-DD' }/>) }
            </FormItem>
            <FormItem hasFeedback label={ "提醒周期" } labelCol={ { span: 5 } } wrapperCol={ { span: 19 } }>
              { getFieldDecorator('remindCycle', {
                rules: [
                  { required: true, message: '请选择提醒周期！', },
                ],
                initialValue: studyPlanData.RemindCycle
              })(
                <Select placeholder="请选择提醒周期">
                  <Option value="每天一次">每天一次</Option>
                  <Option value="每周一次">每周一次</Option>
                  <Option value="每月一次">每月一次</Option>
                </Select>
              ) }
            </FormItem>
            <FormItem hasFeedback label={ "提醒方式" } labelCol={ { span: 5 } } wrapperCol={ { span: 19 } }>
              <p>站内通知</p>
            </FormItem>
            <FormItem hasFeedback label={ "计划说明" } labelCol={ { span: 5 } } wrapperCol={ { span: 19 } }>
              { getFieldDecorator('remark', {
                rules: [
                  { required: true, min: 1, max: 249, message: '请填写计划说明，最多249字符！' },
                ],
                initialValue: studyPlanData.Remark
              })(<TextArea placeholder="请输入笔记内容" autosize={ { minRows: 4, maxRows: 6 } }/>) }
            </FormItem>
          </form>
        </div>
      </Modal>
    </div>
  )
}


StudyPlanModal.propTypes = {
  studyPlanData: PropTypes.object,
  closeModal: PropTypes.func,
  submitPlan: PropTypes.func,
  showModal: PropTypes.bool,
};
export default Form.create()(StudyPlanModal);
