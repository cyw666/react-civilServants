/**
 * 个人档案
 */
import React from 'react';
import {connect} from 'dva';
import PropTypes from 'prop-types';
import cs from 'classnames';
import moment from 'moment';
import {
  Form,
  Input,
  Breadcrumb,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Collapse,
  Button,
  DatePicker,
  Table
} from 'antd';
import styles from './personalFile.less';
import GeneralHead from '../../components/GeneralHead/GeneralHead'
import {dateFilter} from '../../utils/index'
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
const Panel = Collapse.Panel;
const PersonalFile = ({
  personalFile:{
    personalFileData:{
      Model,
      ViewBag
    },
    params
  },
  form: {
    getFieldDecorator,
    validateFieldsAndScroll,
    getFieldValue,
    validateFields,
  },
  dispatch,
  loading
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    validateFieldsAndScroll((err, values) => {
      if (!err) {
        const rangeValue = values['range-picker'];
        const returnValue = {
          startDate: rangeValue[0].format('YYYY-MM-DD'),
          endDate: rangeValue[1].format('YYYY-MM-DD'),
        }
        let payload = {...params,...returnValue};
        dispatch({type:'personalFile/getStudyStatistics',payload})
        console.log('Received values of form: ', payload);
      }
    });
  }
  const studyCourseSource = Model.StudyCourseModel && Model.StudyCourseModel.map((item, index) => {
      let sourse = {...item, ...{key: index}}
      return sourse
    });
  const pageConfig = {
    pageSize: 5,
    showQuickJumper: true,
    showTotal: total => `共 ${total} 条`
  }
  const studyCourseColumns = [
    {
      title: '课程名称	',
      dataIndex: 'CourseName',
      width: 300,
      render: (text, record, index) => (
        <p className={styles.courseName}>
          {text}
        </p>
      )
    },
    {
      title: '开始时间	',
      dataIndex: 'StartDate',
      render: (text, record, index) => (
        <span>
        {dateFilter(text, 'yyyy-MM-dd')}
      </span>
      )
    },
    {
      title: '完成时间	',
      dataIndex: 'FinishDate',
      render: (text, record, index) => (
        <span>
        {dateFilter(text, 'yyyy-MM-dd')}
      </span>
      )
    },
    {
      title: '学习状态	',
      dataIndex: 'Status',
    },
    {
      title: '学习进度	',
      dataIndex: 'BrowseScore',
      render: (text, record, index) => (
        <span>
        {text.toFixed(1)}%
      </span>
      )
    },
    {
      title: '获得学时	',
      dataIndex: 'Credit',
    },
    {
      title: '来源	',
      dataIndex: 'CreditSource',
    },
    {
      title: '评论学时	',
      dataIndex: 'CommentCredit',
    }
  ];
  const examSource = Model.ExamCreditModel && Model.ExamCreditModel.map((item, index) => {
      let sourse = {...item, ...{key: index}}
      return sourse
    });
  const examColumns = [
    {
      title: '序号	',
      render: (text, record, index) => (
        <span>{index+1}</span>
      )
    },
    {
      title: '测试名称	',
      dataIndex: 'ExamName',
      width: 300,
      render: (text, record, index) => (
        <p className={styles.courseName}>
          {text}
        </p>
      )
    },
    {
      title: '测试成绩	',
      dataIndex: 'ExamSorce',
    },
    {
      title: '获得学时	',
      dataIndex: 'Credit',
    }
  ];
  const trainSource = Model.TrainCreditModel && Model.TrainCreditModel.map((item, index) => {
      let sourse = {...item, ...{key: index}}
      return sourse
    });
  const trainColumns = [
    {
      title: '姓名	',
      dataIndex: 'UserName'
    },
    {
      title: '培训项目名称	',
      dataIndex: 'TrainName',
      width: 300,
      render: (text, record, index) => (
        <p className={styles.courseName}>
          {text}
        </p>
      )
    },
    {
      title: '培训类别	',
      dataIndex: 'TrainType',
    },
    {
      title: '开始时间	',
      dataIndex: 'StartDate',
      render: (text, record, index) => (
        <span>
        {dateFilter(text, 'yyyy-MM-dd')}
      </span>
      )
    },
    {
      title: '完成时间	',
      dataIndex: 'FinishDate',
      render: (text, record, index) => (
        <span>
        {dateFilter(text, 'yyyy-MM-dd')}
      </span>
      )
    },
    {
      title: '培训项目分	',
      dataIndex: 'Score',
    },
    {
      title: '获得学时	',
      dataIndex: 'Credit',
    }
  ];
  
  return (
    <div className={cs(["container_24"])}>
      <div className="grid_24">
        <GeneralHead showIcon={false} title="个人学习档案"></GeneralHead>
        <div className={styles.personalFile}>
          <Breadcrumb>
            <Breadcrumb.Item><Icon type="setting" style={{fontSize: 16, color: '#656565'}}/> 您的当前位置：</Breadcrumb.Item>
            <Breadcrumb.Item><a href="/indexPage">首页</a></Breadcrumb.Item>
            <Breadcrumb.Item>个人学习档案</Breadcrumb.Item>
          </Breadcrumb>
          <div className={styles.content}>
            <div className={styles.infor}>
              <p>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;尊敬的&nbsp;<span className="red">{Model.Name}</span>&nbsp;学员，截止至今，
                您总选修&nbsp;<span className="red">{Model.ElectiveCount}</span>&nbsp;门课程，
                已学完&nbsp;<span className="red">{Model.FinishCount}</span>&nbsp;门，
                <span className="red">{Model.UnFinishCount}</span>&nbsp;门未学完，
                累计参加&nbsp;<span className="red">{Model.TestCount}</span>&nbsp;次测试，
                修满&nbsp;<span className="red">{Model.SumCredit}</span>&nbsp;学时，
                祝您学有所成！
                
                固网获得学时：<span className="red">{Model.PcCredit}</span>，
                移动获得学时：<span className="red">{Model.MobileCredit}</span>，
                指定获得学时：<span className="red">{Model.AppointCredit}</span>，
                文章获得学时：<span className="red">{Model.ArticleCredit}</span>，
                考试获得学时：<span className="red">{Model.ExamCredit}</span>，
                评论获得学时：<span className="red">{Model.CommentCredit}</span>，
                培训获得学时：<span className="red">{Model.TrainingCredit}</span>,
                规定指定学时：<span className="red">{Model.RegulationsAppointCredit}</span>，
                规定文章学时：<span className="red">{Model.RegulationsArticleCredit}</span>，
                规定考试学时：<span className="red">{Model.RegulationsExamCredit}</span>，
                规定总学时：<span className="red">{Model.RegulationsSumCredit}。</span>
              </p>
              <fieldset>
                <legend>基本信息:</legend>
                <Form layout="inline" onSubmit={handleSubmit}>
                  <FormItem
                    label="查询日期"
                  >
                    {getFieldDecorator('range-picker', {
                      rules: [{type: 'array', required: false, message: '请选择日期!'}],
                      initialValue: [moment('2019/09/01', 'YYYY/MM/DD'), moment('2017/09/25', 'YYYY/MM/DD')]
                    })(
                      <RangePicker />
                    )}
                  </FormItem>
                  <FormItem>
                    <Button type="primary" htmlType="submit">查询</Button>
                  </FormItem>
                </Form>
                <p className={styles.inforCont}>
                  <span className={styles.label}>用户名</span>
                  <span>{Model.Name}</span>
                  <span className={styles.label}>单位</span>
                  <span>{Model.Department}</span>
                </p>
              </fieldset>
              <fieldset>
                <legend>学习课程获得学时:</legend>
                <div className={styles.courseCredit}>
                  <table className={cs(["table", "table-bordered"])}>
                    <thead>
                    <tr>
                      <td>选择课程数</td>
                      <td>完成课程数</td>
                      <td>获得总学时</td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <td>{ViewBag.StudyCount}</td>
                      <td>{ViewBag.StudyFinishCount}</td>
                      <td>{ViewBag.StudyCreditSum}</td>
                    </tr>
                    </tbody>
                  
                  </table>
                  <Collapse>
                    <Panel header="详细内容" key="course">
                      <Table dataSource={studyCourseSource} columns={studyCourseColumns} pagination={pageConfig}/>
                    </Panel>
                  </Collapse>
                </div>
              </fieldset>
              <fieldset>
                <legend>参加测试获得学时:</legend>
                <div className={styles.courseCredit}>
                  <table className={cs(["table", "table-bordered"])}>
                    <thead>
                    <tr>
                      <td>总成绩分</td>
                      <td>平均成绩分</td>
                      <td>总学时</td>
                      <td>平均学时</td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <td>{ViewBag.ExamScoreSum}</td>
                      <td>{ViewBag.ExamScoreAvg}</td>
                      <td>{ViewBag.ExamCreditSum}</td>
                      <td>{ViewBag.ExamCreditAvg}</td>
                    </tr>
                    </tbody>
                  
                  </table>
                  <Collapse>
                    <Panel header="详细内容" key="exam">
                      <Table dataSource={examSource} columns={examColumns} pagination={pageConfig}/>
                    </Panel>
                  </Collapse>
                </div>
              </fieldset>
              <fieldset>
                <legend>培训获得学时:</legend>
                <div className={styles.courseCredit}>
                  <table className={cs(["table", "table-bordered"])}>
                    <thead>
                    <tr>
                      <td>选学培训项目数</td>
                      <td>完成培训项目数</td>
                      <td>获得总学时</td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <td>{ViewBag.TrainingCount}</td>
                      <td>{ViewBag.TrainingFinishCount}</td>
                      <td>{ViewBag.TrainingCredit}</td>
                    </tr>
                    </tbody>
                  
                  </table>
                  <Collapse>
                    <Panel header="详细内容" key="training">
                      <Table dataSource={trainSource} columns={trainColumns} pagination={pageConfig}/>
                    </Panel>
                  </Collapse>
                </div>
              </fieldset>
            </div>
          </div>
        
        </div>
      </div>
    </div>
  );
};
PersonalFile.propTypes = {
  personalFile: PropTypes.object.isRequired,
  form: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object
};

export default connect(({personalFile, loading}) => ({personalFile, loading}))(Form.create()(PersonalFile));
