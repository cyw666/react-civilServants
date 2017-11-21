/**
 * 通知公告（模板）
 */
import React from 'react'
import PropTypes from 'prop-types'
import {Breadcrumb, Icon, Input, Pagination, Spin} from 'antd';
import {Link} from 'dva/router'
import GeneralHead from '../../../components/GeneralHead/GeneralHead'
import Arrow from '../../../assets/arrow.png'
import {dateFilter} from '../../../utils/index'
import styles from './tmNoticeList.less'

const Search = Input.Search;
const TmNoticeList = ({noticeListData, noticeParams, inputSearch, loading, pageConfig, linkUrl}) => {
  const {ListData, TitleNav} = noticeListData;
  const noticeList = ListData.map((item, index) => {
    return (
      <tr key={index}>
        <td>
          <img className="arrow" src={Arrow} alt="arrow"/>
          <Link className="tableName" to={`${linkUrl}/${item.Id}`} title={item.Name} target="_blank"
                rel="noopener noreferrer">
            {item.Name}
          </Link>
        </td>
        <td className="listDate">{dateFilter(item.CreateDate, 'yyyy-MM-dd hh:mm:ss')}</td>
      </tr>
    )
  });
  return (
    <div className={styles.tmNoticeList}>
      <GeneralHead showIcon={false} title={TitleNav}></GeneralHead>
      <div className={styles.noticeContent}>
        <Breadcrumb>
          <Breadcrumb.Item><Icon type="setting" style={{fontSize: 16, color: '#656565'}}/> 您的当前位置：</Breadcrumb.Item>
          <Breadcrumb.Item><a href="/indexPage">首页</a></Breadcrumb.Item>
          <Breadcrumb.Item>{TitleNav}</Breadcrumb.Item>
        </Breadcrumb>
        <div className="searchText">
          <Search
            placeholder="请输入搜索关键字"
            style={{width: '75%'}}
            onSearch={value => {
              inputSearch({page: 1, search: value})
            }}
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
              {
                pageConfig.total > 0 ?
                  <Pagination
                    showQuickJumper
                    showTotal={total => `共 ${total} 条`}
                    current={pageConfig.current}
                    total={pageConfig.total}
                    pageSize={pageConfig.pageSize}
                    onChange={
                      (pageNumber) => {
                        inputSearch({page: pageNumber, search: noticeParams.search})
                      }
                    }
                  />
                  :
                  <p className="noData">暂无通知</p>
              }
            
            </div>
          </Spin>
        </div>
      </div>
    </div>
  )
}


TmNoticeList.propTypes = {
  noticeListData: PropTypes.object,
  noticeParams: PropTypes.object,
  pageConfig: PropTypes.object,
  inputSearch: PropTypes.func,
  loading: PropTypes.bool,
  linkUrl: PropTypes.string,
};
export default TmNoticeList;
