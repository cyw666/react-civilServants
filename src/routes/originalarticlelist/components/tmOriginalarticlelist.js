/**
 * 问卷调查（模板）
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Button, Breadcrumb, Icon, Pagination, Spin } from 'antd';
import { Link } from 'dva/router'
import GeneralHead from '../../../components/GeneralHead/GeneralHead'
import styles from './tmOriginalarticlelist.less'
import { dateFilter } from '../../../utils/index'

const TmOriginalArticleList = ({ listData, inputSearch, loading, pageConfig }) => {
  const { ListData } = listData;
  const originalList = ListData && ListData.map((item, index) => {
    return (
      <tr key={ item.Id }>
        <td className={ styles.name }>
          <Link to={ { pathname: '/main/articleDetail', search: `?id=${item.Id}` } } title={ item.Name } target="_blank"
                rel="noopener noreferrer">
            { item.Name }
          </Link>
        </td>
        <td className={ styles.author }>
          { item.Author }
        </td>
        <td className={ styles.date }>
          { dateFilter(item.CreateDate, "yyyy-MM-dd hh:mm:ss") }
        </td>
      </tr>
    )
  });
  return (
    <div className={ styles.tmOriginalArticleList }>
      <GeneralHead showIcon={ false } title={ "学员心声" }></GeneralHead>
      <div className={ styles.pollContent }>
        <Breadcrumb>
          <Breadcrumb.Item><Icon type="setting" style={ { fontSize: 16, color: '#656565' } }/> 您的当前位置：</Breadcrumb.Item>
          <Breadcrumb.Item><Link to="/">首页</Link></Breadcrumb.Item>
          <Breadcrumb.Item>学员心声</Breadcrumb.Item>
        </Breadcrumb>
        <div className={ styles.publish }>
          <Button type={ "primary" }><Link to={ "/main/addOriginalArticle" } target="_blank">+发表心声</Link></Button>
        </div>
        <div>
          <Spin spinning={ loading }>
            <table className="table">
              <thead>
              <tr>
                <th className={ styles.name }>文章名称</th>
                <th className={ styles.author }>作者</th>
                <th className={ styles.date }>发布时间</th>
              </tr>
              </thead>
              <tbody>
              { originalList }
              </tbody>
            </table>
            <div className="pagination">
              {
                pageConfig.total > 0 ?
                  <Pagination
                    showQuickJumper
                    showTotal={ total => `共 ${total} 条` }
                    current={ pageConfig.current }
                    total={ pageConfig.total }
                    pageSize={ pageConfig.pageSize }
                    onChange={
                      (pageNumber) => {
                        inputSearch({ page: pageNumber })
                      }
                    }
                  />
                  :
                  <p className="noData">暂无文章</p>
              }
            
            </div>
          </Spin>
        </div>
      </div>
    </div>
  )
}


TmOriginalArticleList.propTypes = {
  listData: PropTypes.object,
  pageConfig: PropTypes.object,
  inputSearch: PropTypes.func,
  loading: PropTypes.bool,
};
export default TmOriginalArticleList;
