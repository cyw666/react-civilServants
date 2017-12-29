/*
* 班级相册
* */
import React from 'react';
import {connect} from 'dva';
import PropTypes from 'prop-types';
import {Link} from 'dva/router'
import {Breadcrumb, Icon, Row, Col, Spin, Pagination} from 'antd'
import GeneralHead from '../../components/GeneralHead/GeneralHead'
import Img from '../../components/Img/Img'
import styles from './photoAlbumList.less';

const PhotoAlbumList = ({photoAlbumList, dispatch, loading}) => {
  const {classId, photoAlbumData, pageOptions} = photoAlbumList;
  const contentList = photoAlbumData.ListData && photoAlbumData.ListData.map((item, index) => {
    return (
      <Col key={item.Id} span={6}>
        <Link to={{pathname: "/main/grade/photoPreview", query: {albumId: item.Id, id: classId}}}>
          <Img src={`${photoAlbumData.ImgPath}/${item.Img}`} alt=""/>
          <p>{item.Name}</p>
        </Link>
      </Col>
    )
  });
  const pageSizeChange = (page) => {
    dispatch({
      type: 'getPhotoAlbumList',
      payload: {
        id: classId,
        page
      }
    });
  }
  return (
    <div className={styles.photoAlbumList}>
      <GeneralHead showIcon={false} title={'班级相册'}></GeneralHead>
      <div className={styles.innerContent}>
        <Breadcrumb>
          <Breadcrumb.Item><Icon type="setting" style={{fontSize: 16, color: '#656565'}}/> 您的当前位置：</Breadcrumb.Item>
          <Breadcrumb.Item><a href="/main/indexPage">首页</a></Breadcrumb.Item>
          <Breadcrumb.Item><a href="/main/trainingClass">培训班</a></Breadcrumb.Item>
          <Breadcrumb.Item><Link to={{
            pathname: '/main/grade/classDetail',
            query: {id: classId}
          }}>{photoAlbumData.TrainingName}</Link></Breadcrumb.Item>
          <Breadcrumb.Item>班级相册</Breadcrumb.Item>
        </Breadcrumb>
        <div className={styles.borderBold}>
          <h2 className="commonTitle">班级相册</h2>
          <Spin spinning={loading.effects['photoAlbumList/getPhotoAlbumList']}>
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
PhotoAlbumList.propTypes = {
  photoAlbumList: PropTypes.object.isRequired,
  dispatch: PropTypes.func,
  loading: PropTypes.object
};

export default connect(({photoAlbumList, loading}) => ({photoAlbumList, loading}))(PhotoAlbumList);
