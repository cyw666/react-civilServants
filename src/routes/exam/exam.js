/**
 * 考试
 */
import React from 'react';
import {connect} from 'dva';
import PropTypes from 'prop-types';
import cs from 'classnames';
import {Form, Checkbox, Button, Radio} from 'antd';
import styles from './exam.less';
import examTop from '../../assets/exam_top.png'

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;
const Exam = ({
                exam,
                form: {
                  getFieldDecorator,
                  validateFieldsAndScroll,
                },
                dispatch,
                loading
              }) => {
  const {Exam, Type0Questions, Type1Questions, Type2Questions, Type3Questions, examid, isfixed} = exam.examData;
  const handleSubmit = (e) => {
    e.preventDefault();
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        let params = {...{hdnexamid: examid, hdnisfixed: isfixed}, ...values};
        dispatch({type: 'exam/postExam', payload: params})
      }
    });
  }
  /*判断题*/
  const checkingList = Type0Questions.map((item, index) => {
    return (
      <FormItem key={item.Id} label={`第${index + 1}题、${item.Name}（分值：${item.Score}）`}>
        {getFieldDecorator(`radio${item.Id}`, {
          initialValue: '',
          rules: [{required: true, message: '您还未选择选项!'}],
        })(
          <RadioGroup>
            {
              item.QuestionsItems.map((question, i) => {
                return (
                  <Radio className={styles.itemStyle} key={question.Id}
                         value={question.ItemFlag}>{question.ItemFlag + '.' + question.Name}</Radio>
                )
              })
            }
          </RadioGroup>
        )}
      </FormItem>
    )
  });
  const checkingQuestion = Type0Questions.map((item, index) => {
    return (
      <FormItem key={index} style={{display: 'none'}}>
        {getFieldDecorator(`questionid${item.Id}`, {
          initialValue: item.Id,
        })(
          <span></span>
        )}
      </FormItem>
    )
  });
  /*单选题*/
  const singleList = Type1Questions.map((item, index) => {
    return (
      <FormItem key={item.Id} label={`第${index + 1}题、${item.Name}（分值：${item.Score}）`}>
        {getFieldDecorator(`radio${item.Id}`, {
          initialValue: '',
          rules: [{required: true, message: '您还未选择选项!'}],
        })(
          <RadioGroup>
            {
              item.QuestionsItems.map((question, i) => {
                return (
                  <Radio className={styles.itemStyle} key={question.Id}
                         value={question.ItemFlag}>{question.ItemFlag + '.' + question.Name}</Radio>
                )
              })
            }
          </RadioGroup>
        )}
      </FormItem>
    )
  });
  const singleQuestion = Type1Questions.map((item, index) => {
    return (
      <FormItem key={index} style={{display: 'none'}}>
        {getFieldDecorator(`questionid${item.Id}`, {
          initialValue: item.Id,
        })(
          <span></span>
        )}
      </FormItem>
    )
  });
  /*多选题*/
  const multipleList = Type2Questions.map((item, index) => {
    return (
      <FormItem key={item.Id} label={`第${index + 1}题、${item.Name}（分值：${item.Score}）`}>
        {getFieldDecorator(`radio${item.Id}`, {
          initialValue: [],
          rules: [{required: true, message: '您还未选择选项!'}],
        })(
          <CheckboxGroup>
            {
              item.QuestionsItems.map((question, i) => {
                return (
                  <Checkbox className={styles.itemStyle} key={question.Id}
                            value={question.ItemFlag}>{question.ItemFlag + '.' + question.Name}</Checkbox>
                )
              })
            }
          </CheckboxGroup>
        )}
      </FormItem>
    )
  });
  const multipleQuestion = Type2Questions.map((item, index) => {
    return (
      <FormItem key={index} style={{display: 'none'}}>
        {getFieldDecorator(`questionid${item.Id}`, {
          initialValue: item.Id,
        })(
          <span></span>
        )}
      </FormItem>
    )
  });
  return (
    <div className={cs(["container_24"])}>
      <div className="grid_24">
        <div className={styles.examTop}><img src={examTop} alt=""/></div>
        <Form onSubmit={handleSubmit}
              layout="vertical"
              className="login-form">
          {checkingList}
          {checkingQuestion}
          {singleList}
          {singleQuestion}
          {multipleList}
          {multipleQuestion}
          <FormItem>
            <Button type="primary" size={'large'} htmlType="submit">
              提交
            </Button>
          </FormItem>
        </Form>
      </div>
    </div>
  );
};
Exam.propTypes = {
  form: PropTypes.object,
  exam: PropTypes.object.isRequired,
  dispatch: PropTypes.func,
  loading: PropTypes.object
};

export default connect(({exam, loading}) => ({exam, loading}))(Form.create()(Exam));
