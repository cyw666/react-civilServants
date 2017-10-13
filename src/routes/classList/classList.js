/*
* 班级列表
* */
import React from 'react';
import {connect} from 'dva';
import PropTypes from 'prop-types';
import cs from 'classnames';
import styles from './classList.less';
import UserInformation from '../../components/userInformation/userInformation'
import TmClassList from './components/tmClassList'

const ClassList = ({app, classList, dispatch, loading}) => {
  const userInforProps = {
    information: app.userInformation,
    loginOut: () => {
      dispatch({type: 'app/loginOut', payload: classList.token});
    },
    loading: loading.effects['app/getUserInformation']
  }
  const noticeListProps = {
    listData: classList.classListData,
    listParams: classList.classParams,
    inputSearch: (options) => {
      let params = Object.assign({}, classList.classParams, options)
      dispatch({
        type: 'classList/getClassList',
        payload: params
      });
    },
    pageConfig: classList.pageConfig,
    loading: loading.effects['classList/getClassList'],
    linkUrl: '/classDetail',
  }
  return (
    <div className={styles.noticeList}>
      <div className={cs(["container_24"])}>
        <div className="grid_7">
          <UserInformation {...userInforProps}></UserInformation>
        </div>
        <div className="grid_17">
          <TmClassList {...noticeListProps}></TmClassList>
        </div>
      </div>
    </div>
  );
};
ClassList.propTypes = {
  app: PropTypes.object.isRequired,
  classList: PropTypes.object.isRequired,
  dispatch: PropTypes.func,
  loading: PropTypes.object
};

export default connect(({app, classList, loading}) => ({app, classList, loading}))(ClassList);
