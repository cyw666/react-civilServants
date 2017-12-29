/**
 * 班级详情（模版）
 */
import React from 'react'
import PropTypes from 'prop-types'
import {Breadcrumb, Icon, Tabs, Row, Col, Spin, Progress} from 'antd'
import {Link} from 'dva/router'
import styles from './tmClassDetail.less'
import GeneralHead from '../../../components/GeneralHead/GeneralHead'
import Img from '../../../components/Img/Img'
import {dateFilter} from '../../../utils/index'
import topic from '../../../assets/btn_article_ht.png'
import paper from '../../../assets/btn_article_lw.png'
import album from '../../../assets/btn_article_xc.png'
import notFound from '../../../assets/notFound.jpeg'

const TabPane = Tabs.TabPane;
const TmClassDetail = ({detailData, loading}) => {
  const {
    ClassNoticeList,
    ClassRequiredCourseList,
    ClassElectiveCourseList,
    ClassExamList,
    ClassTopicList,
    ClassPaperList,
    ClassPhotoList,
    Address,
    Description,
    Id,
    Name,
    Organizers,
  } = detailData;
  const noticeList = ClassNoticeList && ClassNoticeList.map((item, index) => {
    return (
      <Row key={item.Id} className={styles.tabList}>
        <Col span={12}>
          <div className="list">{item.Name}</div>
        </Col>
        <Col span={6}>
          <div className="list">{dateFilter(item.CreatedDate, 'yyyy-MM-dd')}</div>
        </Col>
        <Col span={4}>
          <div className="list">{item.Author}</div>
        </Col>
      </Row>
    )
  });
  const requiredCourseList = ClassRequiredCourseList && ClassRequiredCourseList.map((item, index) => {
    return (
      <Row key={item.Id} className={styles.tabList}>
        <Col span={12}>
          <div className="list">{item.Name}</div>
        </Col>
        <Col span={6}>
          <div className="list"><Progress percent={parseFloat(item.BrowseScore.toFixed(1))} status="active"/></div>
        </Col>
        <Col span={4}>
          <div className="list"><Link to={{pathname: '/play', query: {courseId: item.Id}}} target="_blank"
                                      rel="noopener noreferrer">点击播放</Link></div>
        </Col>
      </Row>
    )
  });
  const electiveCourseList = ClassElectiveCourseList && ClassElectiveCourseList.map((item, index) => {
    return (
      <Row key={item.Id} className={styles.tabList}>
        <Col span={12}>
          <div className="list">{item.Name}</div>
        </Col>
        <Col span={6}>
          <div className="list"><Progress percent={parseFloat(item.BrowseScore.toFixed(1))} status="active"/></div>
        </Col>
        <Col span={4}>
          <div className="list"><Link to={{pathname: '/play', query: {courseId: item.Id}}} target="_blank"
                                      rel="noopener noreferrer">点击播放</Link></div>
        </Col>
      </Row>
    )
  });
  const examList = ClassExamList && ClassExamList.map((item, index) => {
    return (
      <Row key={item.Id} className={styles.tabList}>
        <Col span={9}>
          <div className="list">{item.Name}</div>
        </Col>
        <Col span={5}>
          <div className="list">{item.Credit}</div>
        </Col>
        <Col span={5}>
          <div className="list">{item.TotalScore}</div>
        </Col>
        <Col span={5}>
          <div className="list"><Link to={{pathname: '/main/exam', query: {id: item.Id}}} target="_blank"
                                      rel="noopener noreferrer">参加测试</Link></div>
        </Col>
      </Row>
    )
  });
  const topicList = ClassTopicList && ClassTopicList.map((item, index) => {
    return (
      <Row key={item.Id} className={styles.tabList}>
        <Col span={9}>
          <div className="list">
            <Link to={`/main/articleDetail/${item.Id}`} target="_blank" rel="noopener noreferrer">{item.Name}</Link>
          </div>
        </Col>
        <Col span={5}>
          <div className="list">{item.Type}</div>
        </Col>
        <Col span={5}>
          <div className="list">{dateFilter(item.CreatedDate, 'yyyy-MM-dd')}</div>
        </Col>
        <Col span={5}>
          <div className="list">{item.Author}</div>
        </Col>
      </Row>
    )
  });
  const paperList = ClassPaperList && ClassPaperList.map((item, index) => {
    return (
      <Row key={item.Id} className={styles.tabList}>
        <Col span={12}>
          <div className="list">
            <Link to={`/main/articleDetail/${item.Id}`} title={item.Name} target="_blank"
                  rel="noopener noreferrer">{item.Name}</Link>
          </div>
        </Col>
        <Col span={6}>
          <div className="list">{item.Author}</div>
        </Col>
        <Col span={4}>
          <div className="list">{dateFilter(item.CreatedDate, 'yyyy-MM-dd')}</div>
        </Col>
      </Row>
    )
  });
  const photoList = ClassPhotoList && ClassPhotoList.map((item, index) => {
    return (
      <Col key={item.Id} span={6}>
        <Link to={{pathname: '/main/grade/photoPreview', query: {albumId: item.Id, id: Id}}}>
          <Img src={item.Img} errSrc={notFound} alt={item.Name}/>
          <div className="list">{item.Name}</div>
        </Link>
      </Col>
    )
  });
  return (
    <div className={styles.tmClassDetail}>
      <GeneralHead showIcon={false} title={'班级详情'}></GeneralHead>
      <div className={styles.content}>
        <Breadcrumb>
          <Breadcrumb.Item><Icon type="setting" style={{fontSize: 16, color: '#656565'}}/> 您的当前位置：</Breadcrumb.Item>
          <Breadcrumb.Item><a href="/main/indexPage">首页</a></Breadcrumb.Item>
          <Breadcrumb.Item><a href="/main/trainingClass">培训班</a></Breadcrumb.Item>
          <Breadcrumb.Item>班级详情</Breadcrumb.Item>
        </Breadcrumb>
        <Spin spinning={loading}>
          <div className={styles.classDes}>
            <div className={styles.titleTop}>{Name}</div>
            <div className={styles.publish}>
              <span>我要发表：</span>
              <Link to={{pathname: '/main/classTopicAdd', query: {id: 5}}}><img src={topic} alt=""/></Link>
              <Link to={{pathname: '/main/classPaperAdd', query: {id: 5}}}><img src={paper} alt=""/></Link>
              <Link to={{pathname: '/main/photoAlbumAdd', query: {id: 5}}}><img src={album} alt=""/></Link>
            </div>
            <div className={styles.borderTopBold}>
              <div className={styles.commonTitle}>班级简介</div>
              <div className={styles.classInfo}>{Description}</div>
            </div>
            <Tabs defaultKey={`classNotice`} onChange={(key) => {
              // console.log(key)
            }}>
              <TabPane tab="班级公告" key="classNotice">
                <Row className={styles.title}>
                  <Col span={12}>
                    <div className="list">公告</div>
                  </Col>
                  <Col span={6}>
                    <div className="list">时间</div>
                  </Col>
                  <Col span={4}>
                    <div className="list">作者</div>
                  </Col>
                </Row>
                {noticeList}
              </TabPane>
              <TabPane tab="必修课程" key="requiredCourse">
                <Row className={styles.title}>
                  <Col span={12}>
                    <div className="list">班级名称</div>
                  </Col>
                  <Col span={6}>
                    <div className="list">进度</div>
                  </Col>
                  <Col span={4}>
                    <div className="list">播放</div>
                  </Col>
                </Row>
                {requiredCourseList}
              </TabPane>
              <TabPane tab="选修课程" key="electivesCourse">
                <Row className={styles.title}>
                  <Col span={12}>
                    <div className="list">班级名称</div>
                  </Col>
                  <Col span={6}>
                    <div className="list">进度</div>
                  </Col>
                  <Col span={4}>
                    <div className="list">播放</div>
                  </Col>
                </Row>
                {electiveCourseList}
              </TabPane>
              <TabPane tab="班级考试" key="classExam">
                <Row className={styles.title}>
                  <Col span={9}>
                    <div className="list">考试名称</div>
                  </Col>
                  <Col span={5}>
                    <div className="list">考试学时</div>
                  </Col>
                  <Col span={5}>
                    <div className="list">最高分</div>
                  </Col>
                  <Col span={5}>
                    <div className="list">参加测试</div>
                  </Col>
                </Row>
                {examList}
              </TabPane>
              <TabPane tab="班级话题" key="classTopic">
                <Row className={styles.title}>
                  <Col span={9}>
                    <div className="list">话题</div>
                  </Col>
                  <Col span={5}>
                    <div className="list">话题分类</div>
                  </Col>
                  <Col span={5}>
                    <div className="list">时间</div>
                  </Col>
                  <Col span={5}>
                    <div className="list">作者</div>
                  </Col>
                </Row>
                {topicList}
              </TabPane>
              <TabPane tab="班级论文" key="classPaper">
                <Row className={styles.title}>
                  <Col span={12}>
                    <div className="list">论文标题</div>
                  </Col>
                  <Col span={6}>
                    <div className="list">作者</div>
                  </Col>
                  <Col span={4}>
                    <div className="list">创建时间</div>
                  </Col>
                </Row>
                {paperList}
              </TabPane>
              <TabPane tab="班级相册" key="classAlbum">
                <Row>
                  {photoList}
                </Row>
              </TabPane>
            </Tabs>
          </div>
        </Spin>
      </div>
    </div>
  )
}


TmClassDetail.propTypes = {
  detailData: PropTypes.object,
  loading: PropTypes.bool,
};
export default TmClassDetail;
