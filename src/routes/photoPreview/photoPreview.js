/*
* 班级照片
* */
import React from 'react';
import {connect} from 'dva';
import PropTypes from 'prop-types';
import {Link} from 'dva/router'
import {Button, Breadcrumb, Icon, Row, Col, Spin, Pagination} from 'antd'
import GeneralHead from '../../components/GeneralHead/GeneralHead'
import Img from '../../components/Img/Img'
import styles from './photoPreview.less';

const PhotoPreview = ({photoPreview, dispatch, loading}) => {
  const {classId, photoPreviewData, pageOptions} = photoPreview;
  const contentList = photoPreviewData.ListData && photoPreviewData.ListData.map((item, index) => {
    return (
      <Col key={item.Id} span={6}>
        <Link>
          <Img src={`${photoPreviewData.ImgPath}/${item.Img}`} alt=""/>
          <p>{item.Name}</p>
        </Link>
      </Col>
    )
  });
  const pageSizeChange = (page) => {
    dispatch({
      type: 'getPhotoPreview',
      payload: {
        id: classId,
        page
      }
    });
  }
  return (
    <div className={styles.photoPreview}>
      <GeneralHead showIcon={false} title={'班级照片'}></GeneralHead>
      <div className={styles.innerContent}>
        <Breadcrumb>
          <Breadcrumb.Item><Icon type="setting" style={{fontSize: 16, color: '#656565'}}/> 您的当前位置：</Breadcrumb.Item>
          <Breadcrumb.Item><a href="/main/indexPage">首页</a></Breadcrumb.Item>
          <Breadcrumb.Item><a href="/main/trainingClass">培训班</a></Breadcrumb.Item>
          <Breadcrumb.Item><Link to={{
            pathname: '/main/grade/classDetail',
            query: {id: classId}
          }}>{photoPreviewData.TrainingName}</Link></Breadcrumb.Item>
          <Breadcrumb.Item>班级照片</Breadcrumb.Item>
        </Breadcrumb>
        <div className={styles.borderBold}>
          <h2 className="commonTitle">班级照片</h2>
          <div className={styles.addPhoto}><Button type="primary">+新增照片</Button></div>
          <Spin spinning={loading.effects['photoPreview/getPhotoPreview']}>
            <div className={styles.albumList}>
              <Row gutter={20}>
                {contentList}
              </Row>
            </div>
            {
              pageOptions.total > 0 ?
                <Pagination showQuickJumper {...pageOptions} onChange={pageSizeChange} showTotal={(total) => {
                  return `共${total}条`
                }}/>
                :
                <p className="noData">暂无相册</p>
            }
          </Spin>
        </div>
      </div>
    </div>
  );
};
PhotoPreview.propTypes = {
  photoPreview: PropTypes.object.isRequired,
  dispatch: PropTypes.func,
  loading: PropTypes.object
};

export default connect(({photoPreview, loading}) => ({photoPreview, loading}))(PhotoPreview);
