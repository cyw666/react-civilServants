/**
 * 留言板（模板）
 */
import React from 'react'
import PropTypes from 'prop-types'
import {Button, Breadcrumb, Icon, Pagination, Spin} from 'antd';
import {Link} from 'dva/router'
import GeneralHead from '../../../components/GeneralHead/GeneralHead'
import styles from './tmMessageList.less'
import {dateFilter} from '../../../utils/index'

const TmMessageList = ({listData, inputSearch, loading, openModal, pageConfig}) => {
  const {ListData} = listData;
  const originalList = ListData && ListData.map((item, index) => {
    return (
      <tr key={index}>
        <td className={styles.number}>{index + 1}</td>
        <td className={styles.name}>
          <Link>
            {item.Name}
          </Link>
        </td>
        <td className={styles.category}>
          {item.Class == "Curricula" ? "课程建设" : item.Class == "Support" ? "支持服务" : "平台功能"}
        </td>
        <td className={styles.date}>
          {dateFilter(item.CreateDate, "yyyy-MM-dd hh:mm:ss")}
        </td>
      </tr>
    )
  });
  return (
    <div className={styles.tmMessageList}>
      <GeneralHead showIcon={false} title={"留言板"}></GeneralHead>
      <div className={styles.pollContent}>
        <Breadcrumb>
          <Breadcrumb.Item><Icon type="setting" style={{fontSize: 16, color: '#656565'}}/> 您的当前位置：</Breadcrumb.Item>
          <Breadcrumb.Item><a href="/indexPage">首页</a></Breadcrumb.Item>
          <Breadcrumb.Item>留言板</Breadcrumb.Item>
        </Breadcrumb>
        <div className={styles.publish}>
          <Button type={"primary"} onClick={openModal}>+添加留言</Button>
        </div>
        <div>
          <Spin spinning={loading}>
            <table className="table">
              <thead>
              <tr>
                <th className={styles.number}>序号</th>
                <th className={styles.name}>标题</th>
                <th className={styles.category}>分类</th>
                <th className={styles.date}>日期</th>
              </tr>
              </thead>
              <tbody>
              {originalList}
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
                        inputSearch({page: pageNumber})
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

TmMessageList.propTypes = {
  listData: PropTypes.object,
  pageConfig: PropTypes.object,
  inputSearch: PropTypes.func,
  openModal: PropTypes.func,
  loading: PropTypes.bool,
};
export default TmMessageList;
