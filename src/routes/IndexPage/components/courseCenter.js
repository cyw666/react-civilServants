/**
 * 课程中心
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Radio, Spin } from 'antd';
import { Link } from 'dva/router'
import GeneralHead from '../../../components/GeneralHead/GeneralHead'
import Img from '../../../components/Img/Img'
import styles from './courseCenter.less';
import hotIcon from '../../../assets/hotIcon.png'
import notCourse from '../../../assets/notCourse.png'

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class CourseCenter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeValue: props.courseCategory.ListData[ 0 ].id || '250'
    }
  }
  
  handleSizeChange = (e) => {
    this.setState({ activeValue: e.target.value });
    this.props.activeChange(e.target.value);
  }
  
  render() {
    const activeValue = this.state.activeValue;
    let {
      loading,
      courseListData,
      courseCategory
    } = this.props;
    let courseCenterData = courseListData[ 'ListData' ];
    let baseImgPath = courseListData[ 'ImageCourse' ];
    let radioButtonList = courseCategory[ 'ListData' ].map((item, index) => {
      return (
        <RadioButton key={ index } value={ String(item.id) }>{ item.text }</RadioButton>
      )
    });
    let courseCenterList = courseCenterData.map((item, index) => {
      return (
        <li key={ item.Id }>
          <Link to={ { pathname: '/main/courseDetail', search: `?id=${item.Id}` } } title={ item.Name } target="_blank"
                rel="noopener noreferrer">
            <Img src={ baseImgPath + '/' + item.Img } alt="" errSrc={ notCourse }/>
          </Link>
          {
            index < 2
            &&
            <div className={ styles.hotCourse }>
              <p className={ styles.bg }></p>
              <p className={ styles.content }>
                <img src={ hotIcon } alt="hot"/>
                <span>{ item.ClickCount }次</span>
              </p>
            </div>
          }
          
          <div className={ styles.desc }>
            <p>
              <Link to={ { pathname: '/main/courseDetail', search: `?id=${item.Id}` } } title={ item.Name }
                    target="_blank"
                    rel="noopener noreferrer">{ item.Name }</Link>
            </p>
            <p>
              <span className={ styles.teacher }>讲师：{ item.Teacher }</span>
              <span className={ styles.red }>学分：{ item.Credit }分</span>
            </p>
            <p>时长：{ item.Time }小时</p>
          </div>
        </li>
      )
    });
    
    return (
      <div className={ styles.courseCenter }>
        <Spin spinning={ loading }>
          <GeneralHead showIcon={ true } url="/main/courseCenter" title="课程中心"></GeneralHead>
          <RadioGroup value={ activeValue } size="large" onChange={ this.handleSizeChange }>
            { radioButtonList }
          </RadioGroup>
          <div className={ styles.courseList }>
            <ul>
              { courseCenterList }
            </ul>
          </div>
        </Spin>
      </div>
    )
  }
}
;
CourseCenter.propTypes = {
  loading: PropTypes.bool,
  courseListData: PropTypes.object.isRequired,
  courseCategory: PropTypes.object.isRequired,
  activeChange: PropTypes.func.isRequired,
};

export default CourseCenter;
