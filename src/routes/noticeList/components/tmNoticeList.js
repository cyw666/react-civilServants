/**
 * 通知公告（模板）
 */
import React from 'react'
import PropTypes from 'prop-types'
import styles from './tmNoticeList.less'
import { Link } from 'dva/router'
import GeneralHead from '../../../components/GeneralHead/GeneralHead'
import Arrow from '../../../assets/arrow.png'
import {Breadcrumb,Icon,Input,Pagination ,Spin} from 'antd';
import {dateFilter} from '../../../utils/index'
const Search = Input.Search;
const TmNoticeList = ({noticeListData,searchNotice,loading}) => {
  // debugger
  const {ListData,Count,Page,Rows,search} = noticeListData;
  const noticeList = ListData.map((item,index)=>{
    return (
        <tr key={index}>
          <td><img className="arrow" src={Arrow} alt="arrow"/><Link className="tableName" to={`noticeDetail/${item.Id}`} title="" target="_blank">{item.Name}</Link></td>
          <td className="listDate">{dateFilter(item.CreateDate,'yyyy-MM-dd hh:mm:ss')}</td>
        </tr>
      )
  });
  return (
    <div className={styles.tmNoticeList}>
      <GeneralHead showIcon={false} title="通知公告"></GeneralHead>
      <div className={styles.noticeContent}>
        <Breadcrumb>
          <Breadcrumb.Item><Icon type="setting" style={{ fontSize: 16, color: '#656565' }}/> 您的当前位置：</Breadcrumb.Item>
          <Breadcrumb.Item><a href="/indexPage">首页</a></Breadcrumb.Item>
          <Breadcrumb.Item>通告公告</Breadcrumb.Item>
        </Breadcrumb>
        <div className="searchText">
          <Search
            placeholder="请输入搜索关键字"
            style={{ width: '75%' }}
            onSearch={value => {searchNotice({page:1, search:value})}}
          />
        </div>
        <div>
          <Spin spinning={loading}>
            <table className="table">
              <thead>
              <tr>
                <th className="titleName">文章名称</th>
                <th className="titleDate">发布日期</th>
              </tr>
              </thead>
              <tbody>
              {noticeList}
              </tbody>
            </table>
            <div className="pagination">
              <Pagination showQuickJumper showTotal={total => `共 ${total} 条`} current={Page} total={Count} pageSize={Rows} onChange={(pageNumber)=>{searchNotice({page:pageNumber, search})}} />
            </div>
          </Spin>
        </div>
      </div>
    </div>
  )
}


TmNoticeList.propTypes = {
  noticeListData:PropTypes.object,
  searchNotice:PropTypes.func,
  loading:PropTypes.bool,
};
export default TmNoticeList;
