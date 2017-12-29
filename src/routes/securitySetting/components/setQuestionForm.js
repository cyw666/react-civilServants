/**
 * 设置密保问题 form
 */
import React from 'react'
import PropTypes from 'prop-types'
import {Input, Form, Row, Col, Button} from 'antd';
import styles from './setQuestionForm.less'

const FormItem = Form.Item;
const SetQuestionForm = ({
                           form: {
                             getFieldDecorator,
                             validateFieldsAndScroll,
                           },
                           setQuestion,
                           question,
                         }) => {
  const formItemLayout = {
    labelCol: {span: 6},
    wrapperCol: {span: 18},
  };
  const tailFormItemLayout = {
    wrapperCol: {
      span: 8,
      offset: 3,
    },
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        setQuestion(values);
        // console.log('Received values of form: ', values);
      }
    });
  };
  const questionList = question.map((item, index) => {
    return (
      <Row gutter={40} key={item.Id}>
        <Col span={12}>
          <FormItem {...formItemLayout} label={`问题${index + 1}`}>
            {getFieldDecorator(`questions[${index}].Question`, {
              initialValue: item.Question,
            })(
              <Input placeholder="请输入问题"/>
            )}
          </FormItem>
        </Col>
        <Col span={12}>
          <FormItem {...formItemLayout} label={`答案${index + 1}`}>
            {getFieldDecorator(`questions[${index}].Answer`, {
              initialValue: item.Answer,
            })(
              <Input placeholder="请输入答案"/>
            )}
          </FormItem>
        </Col>
      </Row>
    
    )
  })
  return (
    <Form onSubmit={handleSubmit} className="login-form">
      <Row gutter={40}>{questionList}</Row>
      <Row>
        <Col>
          <FormItem {...tailFormItemLayout} className={styles.submit}>
            <Button type="primary" htmlType="submit" className={styles["login-form-button"]}>提交</Button>
          </FormItem>
        </Col>
      </Row>
    
    </Form>
  )
}


SetQuestionForm.propTypes = {
  form: PropTypes.object,
  setQuestion: PropTypes.func,
  question: PropTypes.array
};
export default Form.create()(SetQuestionForm);

