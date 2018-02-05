/*问卷调查列表*/
import React from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import cs from 'classnames';
import styles from './index.less';
import UserInformation from '../../components/userInformation/userInformation'
import TmPollList from './components/tmPollList'

const PollList = ({ app, pollList, dispatch, loading }) => {
  const userInforProps = {
    information: app.userInformation,
    loginOut: () => {
      dispatch({ type: 'app/loginOut', payload: pollList.token });
    },
    loading: loading.effects[ 'app/getUserInformation' ]
  }
  const pollListProps = {
    pollListData: pollList.pollListData,
    pollParams: pollList.pollParams,
    inputSearch: (options) => {
      let params = Object.assign({}, pollList.pollParams, options)
      dispatch({
        type: 'pollList/getPollList',
        payload: params
      });
    },
    pageConfig: pollList.pageConfig,
    loading: loading.effects[ 'pollList/getPollList' ],
  }
  return (
    <div className={ styles.pollList }>
      <div className={ cs([ "container_24" ]) }>
        <div className="grid_7">
          <UserInformation { ...userInforProps }></UserInformation>
        </div>
        <div className="grid_17">
          <TmPollList { ...pollListProps }></TmPollList>
        </div>
      </div>
    </div>
  );
};
PollList.propTypes = {
  app: PropTypes.object.isRequired,
  pollList: PropTypes.object.isRequired,
  dispatch: PropTypes.func,
  loading: PropTypes.object
};

export default connect(({ app, pollList, loading }) => ({ app, pollList, loading }))(PollList);
