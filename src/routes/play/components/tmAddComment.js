/**
 * 添加评论
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Rate } from 'antd';
import styles from './tmAddComment.less';

const FormItem = Form.Item;
const TmAddComment = ({
                        form: {
                          getFieldDecorator,
                          validateFieldsAndScroll,
                        },
                        loading,
                        submit
                      }) => {
  let rate = 5;
  const handleSubmit = (e) => {
    e.preventDefault();
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        let params = { ...values, ...{ rate } };
        submit(params);
      }
    });
  }
  return (
    <div className={ styles.addNoteForm }>
      <Rate className={ styles.rate } allowHalf defaultValue={ 5 } onChange={ (value) => {
        rate = value
      } }/>
      <Form onSubmit={ handleSubmit }>
        <FormItem hasFeedback>
          { getFieldDecorator('content', {
            initialValue: "",
            rules: [
              { required: true, message: '请输入评论内容!' },
              { min: 7, message: '评论内容字数不能少于7个字!' },
              { max: 249, message: '评论内容字数不能超过249个字!' },
            ],
          })(
            <Input type="textarea" placeholder="评论内容" rows={ 4 }/>
          ) }
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" className={ styles.submit }>
            保存
          </Button>
        </FormItem>
      </Form>
    
    </div>
  );
};
TmAddComment.propTypes = {
  form: PropTypes.object,
  loading: PropTypes.bool,
  submit: PropTypes.func,
};

export default Form.create()(TmAddComment);
