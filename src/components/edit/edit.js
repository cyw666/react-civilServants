/**
 * 富文本编辑器
 */
import React from 'react'
import PropTypes from 'prop-types'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styles from './edit.less';

const Edit = ({handleChange}) => {
  const modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],
      
      [{'header': 1}, {'header': 2}],               // custom button values
      [{'list': 'ordered'}, {'list': 'bullet'}],
      [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
      [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
      [{'direction': 'rtl'}],                         // text direction
      
      [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
      [{'header': [1, 2, 3, 4, 5, 6, false]}],
      
      [{'color': []}, {'background': []}],          // dropdown with defaults from theme
      [{'font': []}],
      [{'align': []}],
      ['link', 'image', 'video'],
      ['clean']                                         // remove formatting button
    ]
  }
  let reactQuillDom = null;
  return (
    <div className={styles.edit}>
      <ReactQuill ref={(quill) => {
        reactQuillDom = quill;
      }}
                  modules={modules}
                  placeholder={'请输入内容...'}
                  onChange={handleChange}/>
    </div>
  )
}

Edit.propTypes = {
  handleChange: PropTypes.func,
};
export default Edit;
