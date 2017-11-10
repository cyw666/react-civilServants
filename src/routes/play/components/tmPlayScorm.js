/**
 * scorm视频播放
 */
import React from 'react'
import PropTypes from 'prop-types'
import styles from './tmPlayScorm.less'
const TmPlayScorm = ({data,sendProgress}) => {
  const {
    BatchId,
    PortalURL,
    CourseId,
    LastPostion,
    PortalId,
    Url,
    UserId,
  } = data;
  
  var paraName;
  function LMSInitialize(value) {
    var reCode = "";
    return true;
  }
  
  function LMSSetValue(name, value) {
    var reCode = "";
    var params = {portalId: PortalId, userid: UserId, courseid: CourseId, position: value}
    switch (name) {
      case "cmi.core.student_id":
        paraName = "cmi.core.student_id";
        break;
      case "cmi.core.student_name":
        paraName = "cmi.core.student_name";
        break;
      case "cmi.core.lesson_location":
        paraName = "cmi.core.lesson_location";
        sendProgress({
          url: `/api/CourseProcess/ScormProcess?m=${paraName}&v=${value}`,
          options: params
        })
        /*fetch.post(`/api/CourseProcess/ScormProcess?m=${paraName}&v=${value}`, params).then((response)=>{
        }).catch(()=>{
          console.log("请求失败！scorm课程记录进度失败！")
        })*/
        break;
      case "cmi.core.credit":
        paraName = "cmi.core.credit";
        break;
      case "cmi.core.lesson_status":
        paraName = "cmi.core.lesson_status";
        break;
      case "cmi.core.entry":
        paraName = "cmi.core.entry";
        break;
      case "cmi.core.score":
        paraName = "cmi.core.score";
        break;
      case "cmi.core.score.raw":
        paraName = "cmi.core.score.raw";
        break;
      case "cmi.core.total_time":
        paraName = "cmi.core.total_time";
        break;
      case "cmi.core.lesson_mode":
        paraName = "cmi.core.lesson_mode";
        break;
      case "cmi.core.exit":
        paraName = "";
        break;
      case "cmi.core.session_time":
        paraName = "cmi.core.session_time";
        paraName = "cmi.core.lesson_location";
        sendProgress({
          url: `/api/CourseProcess/ScormProcess?m=${paraName}&v=${value}`,
          options: params
        })
        /*fetch.post(`/api/CourseProcess/ScormProcess?m=${paraName}&v=${value}`, params)
          .then((response)=>{
          }).catch(()=>{
          console.log("请求失败！scorm课程记录进度失败！")
        })*/
        break;
      case "cmi.suspend_data":
        paraName = "cmi.suspend_data";
        break;
      default:
        break;
    }
    reCode = "true";
    return reCode;
  }
  
  function LMSGetValue(name) {
    var reCode = "";
    switch (name) {
      case "cmi.core.student_id":
        reCode = "get.cmi.core.student_id";
        break;
      case "cmi.core.student_name":
        reCode = "get.cmi.core.student_name";
        break;
      case "cmi.core.lesson_location":
        reCode = "get.cmi.core.lesson_location";
        return LastPostion;
        break;
      case "cmi.core.credit":
        reCode = "get.cmi.core.credit";
        break;
      case "cmi.core.lesson_status":
        reCode = "get.cmi.core.lesson_status";
        return "true";
        break;
      case "cmi.core.entry":
        reCode = "get.cmi.core.entry";
        break;
      case "cmi.core.score":
        reCode = "get.cmi.core.score";
        break;
      case "cmi.core.score.raw":
        reCode = "get.cmi.core.score.raw";
        break;
      case "cmi.core.total_time":
        reCode = "get.cmi.core.total_time";
        break;
      case "cmi.core.lesson_mode":
        reCode = "get.cmi.core.lesson_mode";
        break;
      case "cmi.core.exit":
        reCode = "get.cmi.core.exit";
        break;
      case "cmi.core.session_time":
        reCode = "get.cmi.core.session_time";
        
        break;
      case "cmi.suspend_data":
        reCode = "get.cmi.suspend_data";
        break;
      default:
        break;
    }
    reCode = "true";
    return reCode;
  }
  
  function LMSCommit(value) {
    var reCode = "";
    return reCode;
  }
  
  function LMSFinish(value) {
    var reCode = LMSCommit(value);
    return reCode;
  }
  
  function LMSGetLastError() {
    var reCode = "0";
    return reCode;
  }
  
  function LMSGetErrorString(value) {
    var reCode = "";
    return reCode;
  }
  
  
  window.API = new Object();
  
  API.LMSInitialize = LMSInitialize;
  API.LMSSetValue = LMSSetValue;
  API.LMSGetValue = LMSGetValue;
  API.LMSCommit = LMSCommit;
  API.LMSFinish = LMSFinish;
  API.LMSGetLastError = LMSGetLastError;
  API.LMSGetErrorString = LMSGetErrorString;
  return (
    <div className={styles.TmPlayScorm}>
      <iframe frameBorder="0" src={Url}></iframe>
    </div>
  )
}


TmPlayScorm.propTypes = {
  data: PropTypes.object,
  sendProgress: PropTypes.func,
};
export default TmPlayScorm;
