/*
* 添加相册
* */
import React from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import { Link } from 'dva/router'
import { Button, Breadcrumb, message, Icon, Input, Row, Col } from 'antd'
import GeneralHead from '../../components/GeneralHead/GeneralHead'
import MyUpload from '../../components/upload/upload'
import styles from './index.less';

const { TextArea } = Input;
const PhotoAlbumAdd = ({ photoAlbumAdd, dispatch, loading }) => {
  const { classId, photoAlbumAddData, token } = photoAlbumAdd;
  let addParams = { ...token, ...{ name: '', description: '', imgUrl: '', trainingId: classId } };
  const titleChange = (e) => {
    addParams.name = e.target.value;
  }
  const contentChange = (e) => {
    addParams.description = e.target.value;
  }
  const submitTopic = () => {
    if (!addParams.name) {
      message.error("请输入相册标题！");
    } else if (!addParams.description) {
      message.error("请输入相册说明！");
    } else {
      dispatch({
        type: 'photoAlbumAdd/addPhotoAlbum',
        payload: addParams
      })
    }
  }
  return (
    <div className={ styles.classTopicAdd }>
      <div className="container_24">
        <GeneralHead showIcon={ false } title={ '发表话题' }></GeneralHead>
        <div className={ styles.innerContent }>
          <Breadcrumb>
            <Breadcrumb.Item><Icon type="setting" style={ { fontSize: 16, color: '#656565' } }/>
              您的当前位置：</Breadcrumb.Item>
            <Breadcrumb.Item><Link to="/">首页</Link></Breadcrumb.Item>
            <Breadcrumb.Item><Link to="/main/trainingClass">培训班</Link></Breadcrumb.Item>
            <Breadcrumb.Item><Link to={ {
              pathname: '/main/grade/classDetail',
              search: `?id=${classId}`
            } }>{ photoAlbumAddData.TrainingName }</Link></Breadcrumb.Item>
            <Breadcrumb.Item>添加相册</Breadcrumb.Item>
          </Breadcrumb>
          <div className={ styles.borderBold }>
            <div className={ styles.albumContent }>
              <Row>
                <Col span={ 8 }><p style={ { textAlign: 'right' } }>相册标题：</p></Col>
                <Col span={ 16 }><Input onChange={ titleChange } placeholder="请输入相册标题"/></Col>
              </Row>
              <Row>
                <Col span={ 8 }><p style={ { textAlign: 'right' } }>相册说明：</p></Col>
                <Col span={ 16 }>
                  <TextArea rows={ 4 } onChange={ contentChange } placeholder="请输入相册说明"/>
                </Col>
              </Row>
              <Row>
                <Col span={ 8 }><p style={ { textAlign: 'right' } }>相册封面：</p></Col>
                <Col span={ 16 }>
                  <MyUpload></MyUpload>
                </Col>
              </Row>
              <Row>
                <Col span={ 24 }>
                  <p style={ { textAlign: 'center' } }><Button type="primary" onClick={ submitTopic }>提交</Button></p>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
PhotoAlbumAdd.propTypes = {
  photoAlbumAdd: PropTypes.object.isRequired,
  dispatch: PropTypes.func,
  loading: PropTypes.object
};

export default connect(({ photoAlbumAdd, loading }) => ({ photoAlbumAdd, loading }))(PhotoAlbumAdd);
