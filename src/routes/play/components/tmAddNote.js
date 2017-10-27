/**
 * 添加笔记
 */
import React from 'react';
import PropTypes from 'prop-types';
import {Form, Icon, Input, Button} from 'antd';
import styles from './tmAddNote.less';

const FormItem = Form.Item;
const TmAddNote = ({
  form:{
    getFieldDecorator,
    validateFieldsAndScroll,
  },
  loading,
  addNote
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log(values);
        addNote(values);
      }
    });
  }
  
  return (
    <div className={styles.addNoteForm}>
      <Form onSubmit={handleSubmit}>
        <FormItem hasFeedback>
          {getFieldDecorator('name', {
            initialValue: "",
            rules: [
              {required: true, message: '请输入标题!'},
              {min: 2, message: '标题字数不能少于2个字!'},
              {max: 249, message: '标题字数不能超过249个字!'},
            ],
          })(
            <Input placeholder="标题"/>
          )}
        </FormItem>
        <FormItem hasFeedback>
          {getFieldDecorator('content', {
            initialValue: "",
            rules: [
              {required: true, message: '请输入笔记内容!'},
              {min: 7, message: '笔记内容字数不能少于7个字!'},
              {max: 249, message: '笔记内容字数不能超过249个字!'},
              ],
          })(
            <Input type="textarea" placeholder="笔记内容" rows={4}/>
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" className={styles.submit}>
            保存
          </Button>
        </FormItem>
      </Form>

    </div>
  );
};
TmAddNote.propTypes = {
  form: PropTypes.object,
  loading: PropTypes.bool,
  addNote: PropTypes.func,
};

export default Form.create()(TmAddNote);
