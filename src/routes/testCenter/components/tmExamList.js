/**
 * 考试列表（模板）
 */

import React from 'react'
import PropTypes from 'prop-types'
import styles from './tmExamList.less'
import cs from 'classnames'
import {Link} from 'dva/router'
import {Spin, Breadcrumb, Icon, Input, Row, Col, Pagination, Select, Tabs} from 'antd';
import GeneralHead from '../../../components/GeneralHead/GeneralHead'
import {dateFilter} from '../../../utils/index'
const Search = Input.Search;
const Option = Select.Option;
const TabPane = Tabs.TabPane;
const TmExamList = ({
  examListData,
  searchExam,
  selectChange,
  joinExam,
  loading,
  activeKey,
  pageConfig,
}) => {
  const {UnfinishModel, FinishModel} = examListData;
  const unFinishList = UnfinishModel && UnfinishModel.map((item, index) => {
      return (
        <Row key={index} className={styles.tabList}>
          <Col span={9}>
            <div className="list" title={item.Name}><Link to="examDetail" target="_blank" rel="noopener noreferrer">{item.Name}</Link></div>
          </Col>
          <Col span={3}>
            <div className="list">{item.CreditHour}</div>
          </Col>
          <Col span={3}>
            <div className="list">{item.TimeLimit}</div>
          </Col>
          <Col span={3}>
            <div className="list"><a onClick={() => {
              joinExam(item.Id)
            }}>参加测试</a></div>
          </Col>
          <Col span={6}>
            <div
              className="list">{dateFilter(item.StartTime, 'yyyy-MM-dd')}~{dateFilter(item.EndTime, 'yyyy-MM-dd')}</div>
          </Col>
        </Row>
      )
    })
  const finishList = FinishModel && FinishModel.map((item, index) => {
      return (
        <Row key={index} className={styles.tabList}>
          <Col span={9}>
            <div className="list" title={item.Name}>{item.Name}</div>
          </Col>
          <Col span={3}>
            <div className="list">{item.CreditHour}</div>
          </Col>
          <Col span={2}>
            <div className="list">{item.TimeLimit}</div>
          </Col>
          {
            item.PassFlag ? <Col span={3}>
                <div className={cs(['red', 'list'])}>通过</div>
              </Col> :
              <Col span={3}>
                <div className="list">未通过</div>
              </Col>
          }
          <Col span={3}>
            <div className="list"><a onClick={() => {
              joinExam(item.Id)
            }}>参加测试</a></div>
          </Col>
          <Col span={4}>
            <div className="list"><Link to="examDetailList" target="_blank" rel="noopener noreferrer">查看详细记录</Link></div>
          </Col>
        </Row>
      )
    })
  
  return (
    <div className={styles.tmExamList}>
      <GeneralHead showIcon={false} title="在线考试"></GeneralHead>
      <div className={styles.examContent}>
        <Breadcrumb>
          <Breadcrumb.Item><Icon type="setting" style={{fontSize: 16, color: '#656565'}}/> 您的当前位置：</Breadcrumb.Item>
          <Breadcrumb.Item><a href="/indexPage">首页</a></Breadcrumb.Item>
          <Breadcrumb.Item>在线考试</Breadcrumb.Item>
        </Breadcrumb>
        <div className="searchText">
          <Select defaultValue="All" style={{width: 120, marginRight: 5}} onChange={selectChange}>
            <Option value="All">全部</Option>
            <Option value="Finish">已完成</Option>
            <Option value="UnFinish">未完成</Option>
          </Select>
          <Search
            placeholder="请输入搜索关键字"
            style={{width: '75%'}}
            onSearch={title => {
              searchExam({title, page: 1})
            }}
          />
        </div>
        <Spin spinning={loading}>
          <Tabs activeKey={activeKey} onChange={(examType) => {
            searchExam({examType, page: 1})
          }}>
            <TabPane tab={'未完成的考试'} key={'UnFinish'}>
              <Row className={styles.title}>
                <Col span={9}>
                  <div className="list">考试名称</div>
                </Col>
                <Col span={3}>
                  <div className="list">考试学时</div>
                </Col>
                <Col span={3}>
                  <div className="list">时限(分)</div>
                </Col>
                <Col span={3}>
                  <div className="list">参加测试</div>
                </Col>
                <Col span={6}>
                  <div className="list">考试时间</div>
                </Col>
              </Row>
              {unFinishList}
              {!pageConfig.unFinishTotal && <h2 className={styles.noData}>暂无未完成的考试！</h2>}
              <Pagination showQuickJumper defaultCurrent={1} current={pageConfig.current} pageSize={pageConfig.pageSize}
                          total={pageConfig.unFinishTotal} onChange={(page) => {
                searchMyCourse({courseType: 'UnFinish', page})
              }} showTotal={(total) => {
                return `共${total}条`
              }}/>
            </TabPane>
            <TabPane tab={'已经完成的考试'} key={'Finish'}>
              <Row className={styles.title}>
                <Col span={9}>
                  <div className="list">考试名称</div>
                </Col>
                <Col span={3}>
                  <div className="list">考试学时</div>
                </Col>
                <Col span={2}>
                  <div className="list">时限</div>
                </Col>
                <Col span={3}>
                  <div className="list">通过状态</div>
                </Col>
                <Col span={3}>
                  <div className="list">参加测试</div>
                </Col>
                <Col span={4}>
                  <div className="list">查看详细记录</div>
                </Col>
              </Row>
              {finishList}
              {!pageConfig.finishTotal && <h2 className={styles.noData}>暂无已经完成的考试！</h2>}
              <Pagination showQuickJumper defaultCurrent={1} current={pageConfig.current} pageSize={pageConfig.pageSize}
                          total={pageConfig.finishTotal} onChange={(page) => {
                searchMyCourse({courseType: 'Finish', page})
              }} showTotal={(total) => {
                return `共${total}条`
              }}/>
            </TabPane>
          </Tabs>
        </Spin>
      </div>
    </div>
  )
}


TmExamList.propTypes = {
  examListData: PropTypes.object,
  searchExam: PropTypes.func,
  selectChange: PropTypes.func,
  joinExam: PropTypes.func,
  loading: PropTypes.bool,
  activeKey: PropTypes.string,
  pageConfig: PropTypes.object,
};
export default TmExamList;
