/**
 * 上传图片
 */
import React from 'react'
import PropTypes from 'prop-types'
import {Upload, message, Button, Icon} from 'antd';
import {Link} from 'dva/router'
import styles from './upload.less'

class MyUpload extends React.Component {
  state = {
    fileList: [{
      uid: -1,
      name: 'xxx.png',
      status: 'done',
      url: 'http://www.baidu.com/xxx.png',
    }],
  }
  handleChange = ({ file, fileList }) => {
    if (file.status !== 'uploading') {
      console.log(file, fileList);
    }
  }
  render() {
    const props = {
      action: 'https://jsonplaceholder.typicode.com/posts/',
      onChange:this.handleChange,
      multiple: true,
    };
    return (
      <Upload {...props}>
        <Button>
          <Icon type="upload"/> 点击上传
        </Button>
      </Upload>
    )
  }
  
}

MyUpload.propTypes = {
};
export default MyUpload;
