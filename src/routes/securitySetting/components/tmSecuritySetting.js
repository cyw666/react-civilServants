/**
 * 设置密保模块
 */
import React from 'react'
import PropTypes from 'prop-types'
import {Breadcrumb, Icon, Steps} from 'antd';
import GeneralHead from '../../../components/GeneralHead/GeneralHead'
import styles from './tmSecuritySetting.less'
const Step = Steps.Step;
const TmSecuritySetting = ({
  current,
  children1,
  children2,
}) => {
  return (
    <div className={styles.tmSecuritySetting}>
      <GeneralHead showIcon={false} title="设置密保"></GeneralHead>
      <div className={styles.content}>
        <Breadcrumb>
          <Breadcrumb.Item><Icon type="setting" style={{fontSize: 16, color: '#656565'}}/> 您的当前位置：</Breadcrumb.Item>
          <Breadcrumb.Item><a href="/indexPage">首页</a></Breadcrumb.Item>
          <Breadcrumb.Item>设置密保</Breadcrumb.Item>
        </Breadcrumb>
        <div className={styles.steps}>
          <Steps current={current} size="small">
            <Step title="输入密码" icon={<Icon type="user"/>}/>
            <Step title="密保问题" icon={<Icon type="bars"/>}/>
          </Steps>
        </div>
        
        <div className={styles.form}>
          {
            current === 0 ?
              children1
              :
              children2
          }
        </div>
      </div>
    </div>
  )
}

TmSecuritySetting.propTypes = {
  current: PropTypes.number,
  children1:PropTypes.element,
  children2:PropTypes.element,
};
export default TmSecuritySetting;
