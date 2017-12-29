/**
 * 考试记录查看
 */
import React from 'react';
import {connect} from 'dva';
import PropTypes from 'prop-types';
import cs from 'classnames';
import styles from './examReview.less';
import examTop from '../../assets/exam_top.png'
import {examAllScore, countIf, rightScore} from '../../utils/index'

const ExamReview = ({examReview, dispatch, loading}) => {
  const {Exam, Type0Questions, Type1Questions, Type2Questions, Type3Questions, examid, UserExamDetail} = examReview.examReviewData;
  /*判断题*/
  const checkingList = Type0Questions.length > 0 && Type0Questions.map((item, index) => {
    return (
      <tr key={item.Id}>
        <td className="tibg">
          <div>
            第<span> {index + 1} </span>题、 {item.Question.Name} （分值：{item.Question.Score}）
            <span>正确选项： {item.Question.Answer} ,</span>
            <span className="xxys">您的选项 <span className="highlight">{item.UserAnswer}</span>,&nbsp;&nbsp;您的得分 <span
              className="highlight">{item.UserScore}</span></span>
            <table>
              <tbody>
              {
                item.Question.QuestionsItems.map((question, i) => {
                  return (
                    <tr key={question.Id}>
                      <td>{question.ItemFlag} . {question.Name}</td>
                    </tr>
                  )
                })
              }
              </tbody>
            </table>
          </div>
        </td>
      </tr>
    )
  })
  /*单选题*/
  const singleList = Type1Questions.length > 0 && Type1Questions.map((item, index) => {
    return (
      <tr key={item.Id}>
        <td className="tibg">
          <div>
            第<span> {index + 1} </span>题、 {item.Question.Name} （分值：{item.Question.Score}）
            <span>正确选项： {item.Question.Answer} ,</span>
            <span className="xxys">您的选项 <span className="highlight">{item.UserAnswer}</span>,&nbsp;&nbsp;您的得分 <span
              className="highlight">{item.UserScore}</span></span>
            <table>
              <tbody>
              {
                item.Question.QuestionsItems.map((question, i) => {
                  return (
                    <tr key={question.Id}>
                      <td>{question.ItemFlag} . {question.Name}</td>
                    </tr>
                  )
                })
              }
              </tbody>
            </table>
          </div>
        </td>
      </tr>
    )
  })
  /*多选题*/
  const multipleList = Type2Questions.length > 0 && Type2Questions.map((item, index) => {
    return (
      <tr key={index}>
        <td className="tibg">
          <div>
            第<span> {index + 1} </span>题、 {item.Question.Name} （分值：{item.Question.Score}）
            <span>正确选项： {item.Question.Answer} ,</span>
            <span className="xxys">您的选项 <span className="highlight">{item.UserAnswer}</span>,&nbsp;&nbsp;您的得分 <span
              className="highlight">{item.UserScore}</span></span>
            <table>
              <tbody>
              {
                item.Question.QuestionsItems.map((question, i) => {
                  return (
                    <tr key={question.Id}>
                      <td>{question.ItemFlag} . {question.Name}</td>
                    </tr>
                  )
                })
              }
              </tbody>
            </table>
          </div>
        </td>
      </tr>
    )
  })
  
  return (
    <div className={styles.examReview}>
      <div className={cs(["container_24"])}>
        <div className="grid_24">
          <div className={styles.examTop}><img src={examTop} alt=""/></div>
          <table>
            <tbody>
            <tr>
              <td>
                <div className={styles.xz}>
                  <ul>
                    <li>考试名称：</li>
                    <li className="highlight">{Exam.Name}</li>
                    <li>考试类型：</li>
                    <li className="highlight">{Exam.ExamTypeName}</li>
                    <li>总分：</li>
                    <li className="highlight">{Exam.TotalScore}</li>
                    <li>及格分：</li>
                    <li className="highlight">{Exam.PassingScore}</li>
                  </ul>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className={styles.xz}>
                  <ul>
                    <li>您的得分：</li>
                    <li className="highlight">{UserExamDetail.Score}</li>
                  </ul>
                </div>
              </td>
            </tr>
            {
              Type0Questions.length > 0 &&
              <tr>
                <td className="biaoti">判断题、(共 {Type0Questions.length} 题，共 {examAllScore(Type0Questions)})
                  题，答对 {countIf(Type0Questions)} 题，共 {rightScore(Type0Questions)} 分
                </td>
              </tr>
            }
            {checkingList}
            {
              Type1Questions.length > 0 &&
              <tr>
                <td className="biaoti">单选题、(共 {Type1Questions.length} 题，共 {examAllScore(Type1Questions)})
                  题，答对 {countIf(Type1Questions)} 题，共 {rightScore(Type1Questions)} 分
                </td>
              </tr>
            }
            {singleList}
            {
              Type2Questions.length > 0 &&
              <tr>
                <td className="biaoti">多选题、(共 {Type2Questions.length} 题，共 {examAllScore(Type2Questions)})
                  题，答对 {countIf(Type2Questions)} 题，共 {rightScore(Type2Questions)} 分
                </td>
              </tr>
            }
            {multipleList}
            </tbody>
          </table>
        
        </div>
      </div>
    </div>
  );
};
ExamReview.propTypes = {
  examReview: PropTypes.object.isRequired,
  dispatch: PropTypes.func,
  loading: PropTypes.object
};

export default connect(({examReview, loading}) => ({examReview, loading}))(ExamReview);
