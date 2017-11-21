/*原创文章列表(学员心声)*/
import React from 'react';
import {connect} from 'dva';
import PropTypes from 'prop-types';
import cs from 'classnames';
import styles from './originalarticlelist.less';
import UserInformation from '../../components/userInformation/userInformation'
import TmOriginalarticlelist from './components/tmOriginalarticlelist'

const OriginalArticleList = ({app, originalArticleList, dispatch, loading}) => {
  const userInforProps = {
    information: app.userInformation,
    loginOut: () => {
      dispatch({type: 'app/loginOut', payload: originalArticleList.token});
    },
    loading: loading.effects['app/getUserInformation']
  }
  const originalListProps = {
    listData: originalArticleList.originalData,
    pageConfig: originalArticleList.pageConfig,
    inputSearch: (options) => {
      // let params = Object.assign({}, pollList.pollParams, options)
      dispatch({
        type: 'originalArticleList/getOriginalArticleList',
        payload: options
      });
    },
    loading: loading.effects['originalArticleList/getOriginalArticleList'],
  }
  return (
    <div className={styles.originalArticleList}>
      <div className={cs(["container_24"])}>
        <div className="grid_7">
          <UserInformation {...userInforProps}></UserInformation>
        </div>
        <div className="grid_17">
          <TmOriginalarticlelist {...originalListProps}></TmOriginalarticlelist>
        </div>
      </div>
    </div>
  );
};
OriginalArticleList.propTypes = {
  app: PropTypes.object.isRequired,
  originalArticleList: PropTypes.object.isRequired,
  dispatch: PropTypes.func,
  loading: PropTypes.object
};

export default connect(({app, originalArticleList, loading}) => ({
  app,
  originalArticleList,
  loading
}))(OriginalArticleList);
