/*留言板*/
import React from 'react';
import { connect } from 'dva';
import PropTypes from 'prop-types';
import cs from 'classnames';
import styles from './index.less';
import UserInformation from '../../components/userInformation/userInformation'
import TmMessageList from './components/tmMessageList'
import AddMessage from './components/addMessage'

const MessageList = ({ app, messageList, dispatch, loading }) => {
  const userInforProps = {
    information: app.userInformation,
    loginOut: () => {
      dispatch({ type: 'app/loginOut', payload: messageList.token });
    },
    loading: loading.effects[ 'app/getUserInformation' ]
  }
  const messageListProps = {
    listData: messageList.messageListData,
    pageConfig: messageList.pageConfig,
    inputSearch: (options) => {
      dispatch({
        type: 'messageList/getMessageList',
        payload: options
      });
    },
    openModal: () => {
      dispatch({
        type: 'messageList/updateState',
        payload: { showModal: true }
      })
    },
    loading: loading.effects[ 'messageList/getMessageList' ],
  }
  /*添加留言props*/
  const addMessageProps = {
    closeModal: () => {
      dispatch({
        type: 'messageList/updateState',
        payload: { showModal: false }
      })
    },
    showModal: messageList.showModal,
    submitMessage: (options) => {
      let params = Object.assign({}, options, messageList.token)
      dispatch({ type: 'messageList/addMessage', payload: params })
    },
  }
  return (
    <div className={ styles.messageList }>
      <div className={ cs([ "container_24" ]) }>
        <div className="grid_7">
          <UserInformation { ...userInforProps }></UserInformation>
        </div>
        <div className="grid_17">
          <TmMessageList { ...messageListProps }></TmMessageList>
        </div>
        <AddMessage { ...addMessageProps }></AddMessage>
      </div>
    </div>
  );
};
MessageList.propTypes = {
  app: PropTypes.object.isRequired,
  messageList: PropTypes.object.isRequired,
  dispatch: PropTypes.func,
  loading: PropTypes.object
};

export default connect(({ app, messageList, loading }) => ({ app, messageList, loading }))(MessageList);
