/**
 * 问卷调查（模板）
 */
import React from 'react'
import PropTypes from 'prop-types'
import {Breadcrumb, Icon, Input, Pagination, Spin} from 'antd';
import {Link} from 'dva/router'
import GeneralHead from '../../../components/GeneralHead/GeneralHead'
import styles from './tmPollList.less'

const Search = Input.Search;
const TmPollList = ({pollListData, pollParams, inputSearch, loading, pageConfig}) => {
  const {Model: {UnfinishModel, FinishModel}} = pollListData;
  const pollList = UnfinishModel && UnfinishModel.map((item, index) => {
    return (
      <tr key={item.Id}>
        <td>
          <Link to={{pathname: "/main/poll", query: {id: item.Id}}} title={item.Name}
                target="_blank" rel="noopener noreferrer">
            {item.Name}
          </Link>
        </td>
        <td>
          <Link className="tableName" to={{pathname: "/main/poll", query: {id: item.Id}}} title={item.Name}
                target="_blank" rel="noopener noreferrer">
            参加
          </Link>
        </td>
      </tr>
    )
  });
  return (
    <div className={styles.tmPollList}>
      <GeneralHead showIcon={false} title={"问卷调查"}></GeneralHead>
      <div className={styles.pollContent}>
        <Breadcrumb>
          <Breadcrumb.Item><Icon type="setting" style={{fontSize: 16, color: '#656565'}}/> 您的当前位置：</Breadcrumb.Item>
          <Breadcrumb.Item><a href="/indexPage">首页</a></Breadcrumb.Item>
          <Breadcrumb.Item>问卷调查</Breadcrumb.Item>
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
                <th className={styles.name}>问卷名称</th>
                <th className={styles.join}>参加</th>
              </tr>
              </thead>
              <tbody>
              {pollList}
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
                        inputSearch({page: pageNumber, search: pollParams.title})
                      }
                    }
                  />
                  :
                  <p className="noData">暂无问卷</p>
              }
            
            </div>
          </Spin>
        </div>
      </div>
    </div>
  )
}


TmPollList.propTypes = {
  pollListData: PropTypes.object,
  pollParams: PropTypes.object,
  pageConfig: PropTypes.object,
  inputSearch: PropTypes.func,
  loading: PropTypes.bool,
};
export default TmPollList;
