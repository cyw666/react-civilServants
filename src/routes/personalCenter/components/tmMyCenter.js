/**
 * 个人中心课程列表
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Spin, Breadcrumb, Icon, Input, Row, Col, Pagination, Select, Tabs, Progress } from 'antd';
import { Link } from 'dva/router'
import styles from './tmMyCenter.less'
import GeneralHead from '../../../components/GeneralHead/GeneralHead'

const Search = Input.Search;
const Option = Select.Option;
const TabPane = Tabs.TabPane;
const TmMyCenter = ({
                      courseData,
                      activeKey,
                      loading,
                      searchMyCourse,
                      selectChange,
                      delMyCourse,
                      openNotesModal,
                      seeNotesModal,
                      pageConfig,
                      openPlanModal,
                      seePlanModal,
                      openExamModal
                    }) => {
  const { UnfinishCount, AppointedCount, FinishCount } = courseData;
  const { UnfinishModel, AppointedModel, FinishModel } = courseData.ListData;
  const unFinishList = UnfinishModel && UnfinishModel.map((item, index) => {
    return (
      <Row key={ item.Id } className={ styles.tabList }>
        <Col span={ 6 }>
          <div className="list" title={ item.Name }><Link
            to={ { pathname: "/main/courseDetail", search: `?id=${item.Id}` } }
            target={ "_blank" }
            rel="noopener noreferrer">{ item.Name }</Link>
          </div>
        </Col>
        <Col span={ 4 }>
          <div className="list"><Progress percent={ parseFloat(item.BrowseScore.toFixed(1)) } status="active"/></div>
        </Col>
        <Col span={ 2 }>
          <div className="list">{ item.Credit }</div>
        </Col>
        <Col span={ 2 }>
          <div className="list">{ item.Type }</div>
        </Col>
        <Col span={ 2 }>
          <div className="list">
            <Link to={ { pathname: "/play", search: `?id=${item.Id}` } } target="_blank"
                  rel="noopener noreferrer">播放</Link>
          </div>
        </Col>
        { item.NoteFlag ? <Col span={ 2 }>
          <div className="list"><a onClick={ () => {
            seeNotesModal(item.Id, item.Name)
          } }>查看</a></div>
        </Col> : <Col span={ 2 }>
          <div className="list"><a onClick={ () => {
            openNotesModal(item.Id)
          } }>添加</a></div>
        </Col> }
        { item.PlanId ? <Col span={ 2 }>
          <div className="list"><a onClick={ () => {
            seePlanModal(item.PlanId)
          } }>查看</a></div>
        </Col> : <Col span={ 2 }>
          <div className="list"><a onClick={ () => {
            openPlanModal(item.Id)
          } }>添加</a></div>
        </Col> }
        
        {
          (item.ExamFlag && item.BrowseScore < 100) ? <Col span={ 2 }>
              <div className="list">有考试</div>
            </Col> :
            (item.ExamFlag && item.BrowseScore == 100) ? <Col span={ 2 }>
                <div className="list"><a onClick={ () => {
                  openExamModal(item.Id)
                } }>查看</a></div>
              </Col> :
              <Col span={ 2 }>
                <div className="list">无</div>
              </Col>
        }
        
        <Col span={ 2 }>
          <div className="list"><a onClick={ () => {
            delMyCourse(item.Id)
          } }><Icon type="delete" style={ { fontSize: 18 } }/></a></div>
        </Col>
      </Row>
    )
    
  })
  const appointedList = AppointedModel && AppointedModel.map((item, index) => {
    return (
      <Row key={ item.Id } className={ styles.tabList }>
        <Col span={ 6 }>
          <div className="list" title={ item.Name }><Link
            to={ { pathname: "/main/courseDetail", search: `?id=${item.Id}` } }
            target={ "_blank" }
            rel="noopener noreferrer">{ item.Name }</Link>
          </div>
        </Col>
        <Col span={ 4 }>
          <div className="list"><Progress percent={ parseFloat(item.BrowseScore.toFixed(1)) } status="active"/></div>
        </Col>
        <Col span={ 2 }>
          <div className="list">{ item.Credit }</div>
        </Col>
        <Col span={ 2 }>
          <div className="list">{ item.Type }</div>
        </Col>
        <Col span={ 2 }>
          <div className="list">
            <Link to={ { pathname: "/play", search: `?id=${item.Id}` } } target="_blank"
                  rel="noopener noreferrer">播放</Link>
          </div>
        </Col>
        { item.NoteFlag ? <Col span={ 2 }>
          <div className="list"><a onClick={ () => {
            seeNotesModal(item.Id, item.Name)
          } }>查看</a></div>
        </Col> : <Col span={ 2 }>
          <div className="list"><a onClick={ () => {
            openNotesModal(item.Id)
          } }>添加</a></div>
        </Col> }
        { item.PlanId ? <Col span={ 2 }>
          <div className="list"><a onClick={ () => {
            seePlanModal(item.PlanId)
          } }>查看</a></div>
        </Col> : <Col span={ 2 }>
          <div className="list"><a onClick={ () => {
            openPlanModal(item.Id)
          } }>添加</a></div>
        </Col> }
        
        {
          (item.ExamFlag && item.BrowseScore < 100) ? <Col span={ 2 }>
              <div className="list">有考试</div>
            </Col> :
            (item.ExamFlag && item.BrowseScore == 100) ? <Col span={ 2 }>
                <div className="list"><a onClick={ () => {
                  openExamModal(item.Id)
                } }>查看</a></div>
              </Col> :
              <Col span={ 2 }>
                <div className="list">无</div>
              </Col>
        }
        
        <Col span={ 2 }>
          <div className="list"><a onClick={ () => {
            delMyCourse(item.Id)
          } }><Icon type="delete" style={ { fontSize: 18 } }/></a></div>
        </Col>
      </Row>
    )
    
  })
  const finishList = FinishModel && FinishModel.map((item, index) => {
    return (
      <Row key={ item.Id } className={ styles.tabList }>
        <Col span={ 6 }>
          <div className="list" title={ item.Name }>
            <Link to={ { pathname: "/main/courseDetail", search: `?id=${item.Id}` } } target={ "_blank" }
                  rel="noopener noreferrer">{ item.Name }</Link>
          </div>
        </Col>
        <Col span={ 4 }>
          <div className="list"><Progress percent={ parseFloat(item.BrowseScore.toFixed(1)) } status="active"/></div>
        </Col>
        <Col span={ 2 }>
          <div className="list">{ item.Credit }</div>
        </Col>
        <Col span={ 2 }>
          <div className="list">{ item.Type }</div>
        </Col>
        <Col span={ 2 }>
          <div className="list">
            <Link to={ { pathname: "/play", search: `?id=${item.Id}` } } target="_blank"
                  rel="noopener noreferrer">播放</Link>
          </div>
        </Col>
        { item.NoteFlag ? <Col span={ 2 }>
          <div className="list"><a onClick={ () => {
            seeNotesModal(item.Id, item.Name)
          } }>查看</a></div>
        </Col> : <Col span={ 2 }>
          <div className="list"><a onClick={ () => {
            openNotesModal(item.Id)
          } }>添加</a></div>
        </Col> }
        { item.PlanId ? <Col span={ 2 }>
          <div className="list"><a onClick={ () => {
            seePlanModal(item.PlanId)
          } }>查看</a></div>
        </Col> : <Col span={ 2 }>
          <div className="list"><a onClick={ () => {
            openPlanModal(item.Id)
          } }>添加</a></div>
        </Col> }
        
        {
          (item.ExamFlag && item.BrowseScore < 100) ? <Col span={ 2 }>
              <div className="list">有考试</div>
            </Col> :
            (item.ExamFlag && item.BrowseScore == 100) ? <Col span={ 2 }>
                <div className="list"><a onClick={ () => {
                  openExamModal(item.Id)
                } }>查看</a></div>
              </Col> :
              <Col span={ 2 }>
                <div className="list">无</div>
              </Col>
        }
        
        <Col span={ 2 }>
          <div className="list"><a onClick={ () => {
            delMyCourse(item.Id)
          } }><Icon type="delete" style={ { fontSize: 18 } }/></a></div>
        </Col>
      </Row>
    )
    
  })
  
  
  return (
    <div className={ styles.tmMyCenter }>
      <GeneralHead showIcon={ false } title={ '个人中心' }></GeneralHead>
      
      <div className={ styles.courseBorder }>
        <Breadcrumb>
          <Breadcrumb.Item><Icon type="setting" style={ { fontSize: 16, color: '#656565' } }/> 您的当前位置：</Breadcrumb.Item>
          <Breadcrumb.Item><Link to={ `/` }>首页</Link></Breadcrumb.Item>
          <Breadcrumb.Item>个人中心</Breadcrumb.Item>
        </Breadcrumb>
        <div className="searchText">
          <Select defaultValue="All" style={ { width: 120, marginRight: 5 } } onChange={ selectChange }>
            <Option value="All">全部</Option>
            <Option value="Unfinish">正在学习课程</Option>
            <Option value="Appointed">指定课程</Option>
            <Option value="Finish">已完成课程</Option>
          </Select>
          <Search
            placeholder="请输入要搜索的课程"
            style={ { width: '75%' } }
            onSearch={ title => {
              searchMyCourse({ title, page: 1 })
            } }
          />
        </div>
        <Spin spinning={ loading }>
          <Tabs activeKey={ activeKey } onChange={ (courseType) => {
            searchMyCourse({ courseType, page: 1 })
          } }>
            <TabPane tab={ `正在学习的课程(${UnfinishCount})` } key={ 'Unfinish' }>
              <Row className={ styles.title }>
                <Col span={ 6 }>
                  <div className="list">课程名称</div>
                </Col>
                <Col span={ 4 }>
                  <div className="list">学习进度</div>
                </Col>
                <Col span={ 2 }>
                  <div className="list">学时</div>
                </Col>
                <Col span={ 2 }>
                  <div className="list">类型</div>
                </Col>
                <Col span={ 2 }>
                  <div className="list">播放</div>
                </Col>
                <Col span={ 2 }>
                  <div className="list">笔记</div>
                </Col>
                <Col span={ 2 }>
                  <div className="list">计划</div>
                </Col>
                <Col span={ 2 }>
                  <div className="list">测试</div>
                </Col>
                <Col span={ 2 }>
                  <div className="list">删除</div>
                </Col>
              </Row>
              { unFinishList }
              {
                pageConfig.unFinishTotal > 0 ?
                  <Pagination
                    showQuickJumper
                    defaultCurrent={ 1 }
                    current={ pageConfig.current }
                    pageSize={ pageConfig.pageSize }
                    total={ pageConfig.unFinishTotal }
                    onChange={
                      (page) => {
                        searchMyCourse({ courseType: 'Unfinish', page, title: '' })
                      }
                    }
                    showTotal={
                      (total) => {
                        return `共${total}条`
                      }
                    }
                  />
                  :
                  <h2 className={ styles.noData }>暂无正在学习的课程！</h2>
              }
            </TabPane>
            <TabPane tab={ `指定到您的课程(${AppointedCount})` } key={ 'Appointed' }>
              <Row className={ styles.title }>
                <Col span={ 6 }>
                  <div className="list">课程名称</div>
                </Col>
                <Col span={ 4 }>
                  <div className="list">学习进度</div>
                </Col>
                <Col span={ 2 }>
                  <div className="list">学时</div>
                </Col>
                <Col span={ 2 }>
                  <div className="list">类型</div>
                </Col>
                <Col span={ 2 }>
                  <div className="list">播放</div>
                </Col>
                <Col span={ 2 }>
                  <div className="list">笔记</div>
                </Col>
                <Col span={ 2 }>
                  <div className="list">计划</div>
                </Col>
                <Col span={ 2 }>
                  <div className="list">测试</div>
                </Col>
                <Col span={ 2 }>
                  <div className="list">删除</div>
                </Col>
              </Row>
              { appointedList }
              {
                pageConfig.appointedTotal > 0 ?
                  <Pagination
                    showQuickJumper
                    defaultCurrent={ 1 }
                    current={ pageConfig.current }
                    pageSize={ pageConfig.pageSize }
                    total={ pageConfig.appointedTotal }
                    onChange={
                      (page) => {
                        searchMyCourse({ courseType: 'Appointed', page, title: '' })
                      }
                    }
                    showTotal={
                      (total) => {
                        return `共${total}条`
                      }
                    }
                  />
                  :
                  <h2 className={ styles.noData }>暂无指定到您的课程！</h2> }
            
            </TabPane>
            <TabPane tab={ `已完成的课程(${FinishCount})` } key={ 'Finish' }>
              <Row className={ styles.title }>
                <Col span={ 6 }>
                  <div className="list">课程名称</div>
                </Col>
                <Col span={ 4 }>
                  <div className="list">学习进度</div>
                </Col>
                <Col span={ 2 }>
                  <div className="list">学时</div>
                </Col>
                <Col span={ 2 }>
                  <div className="list">类型</div>
                </Col>
                <Col span={ 2 }>
                  <div className="list">播放</div>
                </Col>
                <Col span={ 2 }>
                  <div className="list">笔记</div>
                </Col>
                <Col span={ 2 }>
                  <div className="list">计划</div>
                </Col>
                <Col span={ 2 }>
                  <div className="list">测试</div>
                </Col>
                <Col span={ 2 }>
                  <div className="list">删除</div>
                </Col>
              </Row>
              { finishList }
              {
                pageConfig.finishTotal > 0 ?
                  <Pagination
                    showQuickJumper
                    defaultCurrent={ 1 }
                    current={ pageConfig.current }
                    pageSize={ pageConfig.pageSize }
                    total={ pageConfig.finishTotal }
                    onChange={
                      (page) => {
                        searchMyCourse({ courseType: 'Finish', page, title: '' })
                      }
                    }
                    showTotal={
                      (total) => {
                        return `共${total}条`
                      }
                    }
                  />
                  :
                  <h2 className={ styles.noData }>暂无已完成的课程！</h2> }
            
            </TabPane>
          </Tabs>
        </Spin>
      </div>
    </div>
  )
}


TmMyCenter.propTypes = {
  courseData: PropTypes.object,
  activeKey: PropTypes.string,
  loading: PropTypes.bool,
  searchMyCourse: PropTypes.func,
  selectChange: PropTypes.func,
  delMyCourse: PropTypes.func,
  openNotesModal: PropTypes.func,
  seeNotesModal: PropTypes.func,
  pageConfig: PropTypes.object,
  openPlanModal: PropTypes.func,
  seePlanModal: PropTypes.func,
  openExamModal: PropTypes.func,
};
export default TmMyCenter;
