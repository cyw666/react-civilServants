/**
 * 班级园地
 */
import React from 'react';
import PropTypes from 'prop-types';
import {Spin, Tabs, Button} from 'antd';
import {Link} from 'dva/router'
import GeneralHead from '../../../components/GeneralHead/GeneralHead'
import styles from './classGarden.less';
import {dateFilter, JudgeStatus} from '../../../utils/index'
const TabPane = Tabs.TabPane;
const ClassGarden = ({loading, classChange, classCategory, classListData, addClass, activeClassId}) => {
  const tabPane = classCategory['ListData'].map((item, index) => {
    return (
      <TabPane tab={item.Name} key={item.Id}></TabPane>
    )
  });
  const classList = classListData['ListData'].map((item, index) => {
    return (
      <tr key={index}>
        <td><Link to="classDetail">{item.Name}</Link></td>
        <td>{dateFilter(item.StartTime, 'yyyy-MM-dd')}~{dateFilter(item.EndTime, 'yyyy-MM-dd')}</td>
        <td>{item.Address}</td>
        <td>
          {
            !item.ApplyStatus ? <Button type="primary" value={item.Id} onClick={() => {
                addClass(item.Id)
              }}>点击报名</Button> :
              item.ApplyStatus === "Normal" ? <Button type="primary" disabled>{JudgeStatus(item.ApplyStatus)}</Button> :
                <Button type="primary" disabled>{JudgeStatus(item.ApplyStatus)}</Button>
          }
        </td>
      </tr>
    )
  });
  return (
    <div className={styles.classGarden}>
      <GeneralHead showIcon={true} title="班级园地" url="trainingClass"></GeneralHead>
      <Spin spinning={loading}>
        <Tabs activeKey={activeClassId} onChange={(key) => {
          classChange(key)
        }} type="card">
          {tabPane}
        </Tabs>
        <div className={styles.classContent}>
          <table className={styles.table}>
            <thead>
            <tr>
              <th>班级名称</th>
              <th>培训时间</th>
              <th>培训地点</th>
              <th>状态</th>
            </tr>
            </thead>
            <tbody>
            {classList}
            </tbody>
          </table>
        </div>
      </Spin>
    </div>
  );
};
ClassGarden.propTypes = {
  loading: PropTypes.bool,
  classChange: PropTypes.func,
  addClass: PropTypes.func,
  classCategory: PropTypes.object,
  classListData: PropTypes.object,
  activeClassId: PropTypes.string,
};

export default ClassGarden;
