/**
 * 班级园地（模块）
 */
import React from 'react'
import PropTypes from 'prop-types'
import styles from './tmTrainingClass.less'
import GeneralHead from '../../../components/GeneralHead/GeneralHead'
import {Button,Breadcrumb,Icon,Input,Tabs ,Row, Col,Spin} from 'antd'
import {dateFilter, JudgeStatus} from '../../../utils/index'
const Search = Input.Search
const TabPane = Tabs.TabPane;
const TmTrainingClass = ({classListData,checkUserClass,joinClass,delClass,getClass,classType,loading}) => {
  const {ListData} = classListData;
  const classList = ListData.map((item,index)=>{
    return (
      <Row key={index} className={styles.tabList}>
        <Col span={6}><p className="list">{item.Name}</p></Col>
        <Col span={4}><p className="list"><a onClick={()=>{checkUserClass(item.Id)}}>详情</a></p></Col>
        {
          item.ApplyStatus?<Col span={4}><p className="list">{JudgeStatus(item.ApplyStatus)}</p></Col>:
            <Col span={4}><p className="list">未报名</p></Col>
        }
        <Col span={6}><p className="list">{dateFilter(item.StartTime,'yyyy-MM-dd')+'~'+dateFilter(item.EndTime,'yyyy-MM-dd')}</p></Col>
        {
          item.ApplyStatus==='UnApprove'?<Col span={4}><p className="list"><Button type={'danger'} disabled>审核未通过</Button></p></Col>:
            item.ApplyStatus==='Normal'?<Col span={4}><p className="list"><Button type={'danger'} disabled>已报名</Button></p></Col>:
            item.ApplyStatus==='UnAudit'?<Col span={4}><p className="list"><Button type={'primary'} onClick={()=>{delClass(item.Id)}}>取消报名</Button></p></Col>:
            <Col span={4}><p className="list"><Button type={'primary'} onClick={()=>{joinClass(item.Id)}}>点击报名</Button></p></Col>
  
        }
      </Row>
    )
  })
  const classAlreadyList = ListData.map((item,index)=>{
    return (
      <Row key={index} className={styles.tabList}>
        <Col span={8}><p className="list">{item.Name}</p></Col>
        <Col span={4}><p className="list"><a onClick={()=>{checkUserClass(item.Id)}}>详情</a></p></Col>
        {
          item.ApplyStatus?<Col span={4}><p className="list">{JudgeStatus(item.ApplyStatus)}</p></Col>:
            <Col span={4}><p className="list">未报名</p></Col>
        }
        <Col span={6}><p className="list">{dateFilter(item.StartTime,'yyyy-MM-dd')+'~'+dateFilter(item.EndTime,'yyyy-MM-dd')}</p></Col>
      </Row>
    )
  })
  return (
    <div className={styles.tmTrainingClass}>
      <GeneralHead showIcon={false} title={'班级园地'}></GeneralHead>
      <div className={styles.classList}>
        <Breadcrumb>
          <Breadcrumb.Item><Icon type="setting" style={{ fontSize: 16, color: '#656565' }}/> 您的当前位置：</Breadcrumb.Item>
          <Breadcrumb.Item><a href="/indexPage">首页</a></Breadcrumb.Item>
          <Breadcrumb.Item>班级园地</Breadcrumb.Item>
        </Breadcrumb>
        <div className="searchText">
          <Search
            placeholder="请输入要搜索的培训"
            style={{ width: '75%' }}
            onSearch={value => {getClass(value)}}
          />
        </div>
        <Spin spinning={loading}>
          <Tabs activeKey={classType} onChange={(key)=>{getClass(key)}}>
            <TabPane tab="正在举办" key="just">
              <Row className={styles.title}>
                <Col span={6}><p className="list">班级名称</p></Col>
                <Col span={4}><p className="list">班级简介</p></Col>
                <Col span={4}><p className="list">状态</p></Col>
                <Col span={6}><p className="list">举办时间</p></Col>
                <Col span={4}><p className="list">操作</p></Col>
              </Row>
              {classList}
            </TabPane>
            <TabPane tab="即将举办" key="immediately">
              <Row className={styles.title}>
                <Col span={6}><p className="list">班级名称</p></Col>
                <Col span={4}><p className="list">班级简介</p></Col>
                <Col span={4}><p className="list">状态</p></Col>
                <Col span={6}><p className="list">举办时间</p></Col>
                <Col span={4}><p className="list">操作</p></Col>
              </Row>
              {classList}
            </TabPane>
            <TabPane tab="已经举办" key="already">
              <Row className={styles.title}>
                <Col span={8}><p className="list">班级名称</p></Col>
                <Col span={4}><p className="list">班级简介</p></Col>
                <Col span={4}><p className="list">状态</p></Col>
                <Col span={6}><p className="list">举办时间</p></Col>
              </Row>
              {classAlreadyList}
            </TabPane>
          </Tabs>
        </Spin>
      </div>
    </div>
  )
}


TmTrainingClass.propTypes = {
  classListData:PropTypes.object,
  checkUserClass:PropTypes.func,
  joinClass:PropTypes.func,
  delClass:PropTypes.func,
  getClass:PropTypes.func,
  classType:PropTypes.string,
  loading:PropTypes.bool,
};
export default TmTrainingClass;
