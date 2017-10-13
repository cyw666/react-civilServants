/**
 * 班级列表（模板）
 */
import React from 'react'
import PropTypes from 'prop-types'
import {Breadcrumb, Icon, Input, Pagination, Spin} from 'antd';
import {Link} from 'dva/router'
import GeneralHead from '../../../components/GeneralHead/GeneralHead'
import Arrow from '../../../assets/arrow.png'
import {dateFilter,JudgeStatus} from '../../../utils/index'
import styles from './tmClassList.less'
const Search = Input.Search;
const TmClassList = ({listData, listParams, inputSearch, loading, pageConfig, linkUrl}) => {
  const {ListData, Nav} = listData;
  const noticeList = ListData.map((item, index) => {
    return (
      <tr key={index}>
        <td>
          <Link to={`${linkUrl}/${item.Id}`} title={item.Name} target="_blank" rel="noopener noreferrer">
            {item.Name}
          </Link>
        </td>
        <td>{item.Score}</td>
        <td>{dateFilter(item.StartTime, 'yyyy-MM-dd')}~{dateFilter(item.EndTime, 'yyyy-MM-dd')}</td>
        <td>
          {
            item.ApplyStatus?<span>{JudgeStatus(item.ApplyStatus)}</span>:<Link>点击报名</Link>
          }
        </td>
        <td>{item.ArticleCount}</td>
      </tr>
    )
  });
  return (
    <div className={styles.tmNoticeList}>
      <GeneralHead showIcon={false} title={Nav}></GeneralHead>
      <div className={styles.noticeContent}>
        <Breadcrumb>
          <Breadcrumb.Item><Icon type="setting" style={{fontSize: 16, color: '#656565'}}/> 您的当前位置：</Breadcrumb.Item>
          <Breadcrumb.Item><a href="/indexPage">首页</a></Breadcrumb.Item>
          <Breadcrumb.Item>{Nav}</Breadcrumb.Item>
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
                <th>培训班名称</th>
                <th>班级分数</th>
                <th>开班日期</th>
                <th>状态</th>
                <th>活跃度</th>
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
                        inputSearch({page: pageNumber, search: listParams.search})
                      }
                    }
                  />
                  :
                  <p className="noData">暂无班级</p>
              }
            
            </div>
          </Spin>
        </div>
      </div>
    </div>
  )
}


TmClassList.propTypes = {
  listData: PropTypes.object,
  listParams: PropTypes.object,
  pageConfig: PropTypes.object,
  inputSearch: PropTypes.func,
  loading: PropTypes.bool,
  linkUrl: PropTypes.string,
};
export default TmClassList;
