/**
 * 全局搜索
 */
import React from 'react';
import {connect} from 'dva';
import PropTypes from 'prop-types';
import cs from 'classnames';
import {Icon, Spin, Breadcrumb, Pagination} from 'antd';
import {Link} from 'dva/router'
import styles from './searchGloable.less';
import GeneralHead from '../../components/GeneralHead/GeneralHead'

const SearchGloable = ({searchGloable, dispatch, loading}) => {
  const resultData = searchGloable.searchResult.ListData;
  const pageConfig = searchGloable.pageConfig;
  const restuleList = resultData.map((item, index) => {
    if (item.Type == 'Article') {
      return (
        <li key={item.Id}>
          <Link className="tableName" to={`/main/articleDetail/${item.Id}`} title={item.Name} target="_blank"
                rel="noopener noreferrer">
            [文章：]{item.Name}
          </Link>
        </li>
      )
    } else if (item.Type == 'Notice') {
      return (
        <li key={item.Id}>
          <Link className="tableName" to={`/main/noticeDetail/${item.Id}`} title={item.Name} target="_blank"
                rel="noopener noreferrer">
            [通知：]{item.Name}
          </Link>
        </li>
      )
    } else if (item.Type == 'Course') {
      return (
        <li key={item.Id}>
          <Link className="tableName" to={{pathname: "/main/courseDetail", query: {id: `${item.Id}`}}} title={item.Name}
                target="_blank" rel="noopener noreferrer">
            [课程：]{item.Name}
          </Link>
        </li>
      )
    }
    
  })
  return (
    <div className={cs(["container_24"])}>
      <div className="grid_24">
        <GeneralHead showIcon={false} title="搜索结果"></GeneralHead>
        <div className={styles.searchGloable}>
          <Breadcrumb>
            <Breadcrumb.Item><Icon type="setting" style={{fontSize: 16, color: '#656565'}}/> 您的当前位置：</Breadcrumb.Item>
            <Breadcrumb.Item><a href="/indexPage">首页</a></Breadcrumb.Item>
            <Breadcrumb.Item>搜索结果</Breadcrumb.Item>
          </Breadcrumb>
          <Spin spinning={loading.effects['searchGloable/getSearchList']}>
            <ul>
              {restuleList}
            </ul>
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
                        dispatch({type: 'searchGloable/getSearchList', payload: {page: pageNumber}});
                      }
                    }
                  />
                  :
                  <p className="noData">暂无数据</p>
              }
            
            </div>
          </Spin>
        </div>
      </div>
    </div>
  );
};
SearchGloable.propTypes = {
  searchGloable: PropTypes.object.isRequired,
  dispatch: PropTypes.func,
  loading: PropTypes.object
};

export default connect(({searchGloable, loading}) => ({searchGloable, loading}))(SearchGloable);
