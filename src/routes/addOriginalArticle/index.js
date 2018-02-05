/*
* 添加原创文章
* */
import React from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import { Link } from 'dva/router'
import { Button, Breadcrumb, message, Icon, Input, Row, Col } from 'antd'
import GeneralHead from '../../components/GeneralHead/GeneralHead'
import Edit from '../../components/edit/edit'
import styles from './index.less';

const AddOriginalArticle = ({ addOriginalArticle, dispatch, loading }) => {
  const { token } = addOriginalArticle;
  let addParams = { ...token, ...{ name: '', content: '' } };
  const titleChange = (e) => {
    addParams.name = e.target.value;
  }
  const editChange = (value) => {
    addParams.content = value;
  }
  const submitTopic = () => {
    if (!addParams.name) {
      message.error("请输入标题！");
    } else if (!addParams.content) {
      message.error("请输入内容");
    } else {
      dispatch({
        type: 'addOriginalArticle/addOriginalArticle',
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
            <Breadcrumb.Item>发表心声</Breadcrumb.Item>
          </Breadcrumb>
          <div className={ styles.borderBold }>
            <Row>
              <Col span={ 2 }><p style={ { textAlign: 'right' } }>标题：</p></Col>
              <Col span={ 10 }><Input onChange={ titleChange } placeholder="请输入标题"/></Col>
            </Row>
            <Row>
              <Col span={ 2 }></Col>
              <Col span={ 20 }>
                <Edit handleChange={ editChange }></Edit>
              </Col>
            </Row>
            <Row>
              <Col span={ 24 }>
                <p style={ { textAlign: 'center' } }><Button type="primary" onClick={ submitTopic }>提交审核</Button></p>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};
AddOriginalArticle.propTypes = {
  addOriginalArticle: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object
};

export default connect(({ addOriginalArticle, loading }) => ({ addOriginalArticle, loading }))(AddOriginalArticle);
