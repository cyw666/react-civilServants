/**
 * 个人通知（模板）
 */
import React from 'react'
import PropTypes from 'prop-types'
import {Breadcrumb, Icon, Input, Pagination, Spin} from 'antd';
import {Link} from 'dva/router'
import GeneralHead from '../../../components/GeneralHead/GeneralHead'
import Arrow from '../../../assets/arrow.png'
import {dateFilter} from '../../../utils/index'
import styles from './tmPersonalNotice.less'

const Search = Input.Search;
const TmPersonalNotice = ({noticeListData, noticeParams, inputSearch, loading, pageConfig, linkUrl}) => {
  const {AllList, TitleNav} = noticeListData;
  const noticeList = AllList.map((item, index) => {
    return (
      <tr key={index}>
        <td>
          <img className="arrow" src={Arrow} alt="arrow"/>
          <Link to={`${linkUrl}/${item.Id}`} title={item.Name} target="_blank" rel="noopener noreferrer">
            {item.Name}
          </Link>
        </td>
        <td style={{textAlign: 'center'}}>{item.Read ? <span>已读</span> : <span className="red">未读</span>}</td>
        <td style={{textAlign: 'center'}}>{dateFilter(item.CreateDate, 'yyyy-MM-dd hh:mm:ss')}</td>
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
                <th>通知标题</th>
                <th>阅读状态</th>
                <th>发布日期</th>
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


TmPersonalNotice.propTypes = {
  noticeListData: PropTypes.object,
  noticeParams: PropTypes.object,
  pageConfig: PropTypes.object,
  inputSearch: PropTypes.func,
  loading: PropTypes.bool,
  linkUrl: PropTypes.string,
};
export default TmPersonalNotice;
