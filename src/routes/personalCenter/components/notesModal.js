/**
 * 添加笔记modal
 */
import React from 'react'
import PropTypes from 'prop-types'
import cs from 'classnames'
import {Form, Button, Input, Modal} from 'antd'
import styles from './notesModal.less'
const FormItem = Form.Item;
const {TextArea} = Input;
const NotesModal = ({
  form: {
    getFieldDecorator,
    validateFieldsAndScroll,
  },
  closeModal,
  showModal,
  showModalContent,
  noteDetail,
  notesCourseParams,
  handleNotesOk,
  noteEditUpdate,
  courseNoteList,
  openNotesModal,
  noteListData,
  delNote,
  editNotes,
  
}) => {
  const onNotesOk = () => {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      // console.log(values)
      handleNotesOk(values);
    })
  }
  const onNotesEditOk = () => {
    validateFieldsAndScroll((errors, values) => {
      if (errors) {
        return
      }
      noteEditUpdate(values);
    })
  }
  const notesList = noteListData.map((item, index) => {
    return (
      <tr key={index}>
        <td className={styles.seaNoteName}>笔记名称：</td>
        <td className={styles.seaNote}>
          <span className={cs(['pull-left', `${styles.seaNoteItemName}`])} title={item.Name}>{item.Name}</span>
          <a className="pull-right" onClick={() => {
            delNote(item.Id)
          }}>删除</a>
          <a className="pull-right" onClick={() => {
            editNotes(item.Id)
          }}>编辑</a>
        </td>
      </tr>
    )
    
  })
  
  return (
    <div>
      {
        showModalContent.showModalContent1 &&
        <Modal
          title="添加笔记"
          visible={showModal}
          onOk={onNotesOk}
          onCancel={closeModal}
        >
          <div className={styles.notesModal}>
            <form>
              <FormItem hasFeedback label={"课程名称"} labelCol={{span: 4}} wrapperCol={{span: 20}}>
                <p>{notesCourseParams.courseName}</p>
              </FormItem>
              <FormItem hasFeedback label={"笔记名称"} labelCol={{span: 4}} wrapperCol={{span: 20}}>
                {getFieldDecorator('name', {
                  rules: [
                    {
                      required: true,
                      min: 2,
                      max: 50,
                      message: '笔记名称为必填,字数限制2~50',
                    },
                  ],
                })(<Input size="large" type="text" onPressEnter={onNotesOk} placeholder="请输入笔记名称"/>)}
              </FormItem>
              <FormItem hasFeedback label={"笔记内容"} labelCol={{span: 4}} wrapperCol={{span: 20}}>
                {getFieldDecorator('content', {
                  rules: [
                    {
                      required: true,
                      min: 7,
                      max: 249,
                      message: '笔记内容为必填,字数限制7~249'
                    },
                  ],
                })(<TextArea placeholder="请输入笔记内容" onPressEnter={onNotesOk} autosize={{minRows: 4, maxRows: 6}}/>)}
              </FormItem>
            
            </form>
          </div>
        </Modal>
      }
      {
        showModalContent.showModalContent2 &&
        <Modal
          title={notesCourseParams.courseName}
          visible={showModal}
          onOk={onNotesOk}
          onCancel={closeModal}
          footer={null}
        >
          <div className={styles.notesModal}>
            <table className={styles.table}>
              <tbody>
              {notesList}
              <tr>
                <td colSpan="2">
                  <div className="content_page">
                    <span
                      className="current">{courseNoteList.Page}</span><span>共 {Math.ceil(courseNoteList.Count / courseNoteList.Rows)}页,总记录 {courseNoteList.Count}
                    条</span>
                    <Button onClick={() => {
                      openNotesModal(notesCourseParams.courseId)
                    }} type={'primary'} className="pull-right">添加笔记</Button>
                  </div>
                </td>
              </tr>
              </tbody>
            </table>
          
          </div>
        </Modal>
      }
      {
        showModalContent.showModalContent3 &&
        <Modal
          title="编辑笔记"
          visible={showModal}
          onOk={onNotesEditOk}
          onCancel={closeModal}
        >
          <div className={styles.notesModal}>
            <form>
              <FormItem hasFeedback label={"课程名称"} labelCol={{span: 4}} wrapperCol={{span: 20}}>
                <p>{notesCourseParams.courseName}</p>
              </FormItem>
              <FormItem hasFeedback label={"笔记名称"} labelCol={{span: 4}} wrapperCol={{span: 20}}>
                {getFieldDecorator('name', {
                  rules: [
                    {
                      required: true,
                      min: 2,
                      max: 50,
                      message: '笔记名称为必填,字数限制2~50'
                    },
                  ],
                  initialValue: noteDetail.Name
                })(<Input size="large" type="text" onPressEnter={onNotesEditOk} placeholder="请输入笔记名称"/>)}
              </FormItem>
              <FormItem hasFeedback label={"笔记内容"} labelCol={{span: 4}} wrapperCol={{span: 20}}>
                {getFieldDecorator('content', {
                  rules: [
                    {
                      required: true,
                      min: 7,
                      max: 249,
                      message: '笔记内容为必填,字数限制7~249'
                    },
                  ],
                  initialValue: noteDetail.Content
                })(<TextArea placeholder="请输入笔记内容" onPressEnter={onNotesEditOk} autosize={{minRows: 4, maxRows: 6}}/>)}
              </FormItem>
            
            </form>
          </div>
        </Modal>
      }
    
    </div>
  )
}


NotesModal.propTypes = {
  closeModal: PropTypes.func,
  showModalContent: PropTypes.object,
  showModal: PropTypes.bool,
  noteDetail: PropTypes.object,
  notesCourseParams: PropTypes.object,
  handleNotesOk: PropTypes.func,
  noteEditUpdate: PropTypes.func,
  courseNoteList: PropTypes.object,
  openNotesModal: PropTypes.func,
  noteListData: PropTypes.array,
  delNote: PropTypes.func,
  editNotes: PropTypes.func,
};
export default Form.create()(NotesModal);
