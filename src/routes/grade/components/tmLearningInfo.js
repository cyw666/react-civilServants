/**
 * 个人学习信息
 */
import React from 'react'
import PropTypes from 'prop-types'
import styles from './tmLearningInfo.less'
import GeneralHead from '../../../components/GeneralHead/GeneralHead'

const TmLearningInfo = ({infoData, loading}) => {
  const {Model, ViewBag} = infoData;
  return (
    <div className={styles.tmLearningInfo}>
      <GeneralHead showIcon={false} title={'个人学习信息'}></GeneralHead>
      <div className={styles.content}>
        {
          Model.RemainingTime ?
            <p className={styles.title}>班级还有<span className="highlight">【{Model.RemainingTime}】</span>结束</p> :
            <p className={styles.title}>班级 <span className="highlight">【已结束】</span></p>
        }
        <p>必修课(已学 | 总课数):
          <span className="highlight">{Model.FinishRequiredCount}</span> |&nbsp;
          <span className="highlight">{Model.RequiredCount}</span></p>
        <p>选修课(已学 | 总课数 | 必学课数)：
          <span className="highlight">{Model.FinishElectiveCount}</span> |&nbsp;
          <span className="highlight">{Model.ElectiveCount}</span> |&nbsp;
          <span className="highlight">{Model.ElectivePassCount}</span>
        </p>
        <p>
          考试：
          {
            Model.ExamCount > 0 ?
              <span>
                (已完成 | 考试数 | 必考数)：
                <span className="highlight">{Model.FinishExamCount}</span> |&nbsp;
                <span className="highlight">{Model.ExamCount}</span> |&nbsp;
                <span className="highlight">{Model.ExamPassCount}</span>
              </span> :
              <span className="highlight">未安排</span>
          }
        </p>
        <p>
          <span>培训班考核状态：</span>
          {
            ViewBag.PassStatus == 'Pass' ? <span className="highlight">通过</span> :
              ViewBag.PassStatus == 'UnPass' ? <span className="highlight">未通过</span> :
                ViewBag.PassStatus == 'UnFinish' ? <span className="highlight">未结业</span> : <span></span>
          }
        </p>
      </div>
    </div>
  )
}


TmLearningInfo.propTypes = {
  infoData: PropTypes.object,
  loading: PropTypes.bool,
};
export default TmLearningInfo;
