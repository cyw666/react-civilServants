import {fetch, config} from '../utils/index'
const {api} = config;
/*mock 测试*/
export function tags(data) {
  return fetch.post(api.tags.url, {...api.tags.data, ...data});
}
/*获取token*/
export function antiForgeryToken() {
  return fetch.post(api.AntiForgeryToken.url).then(function (response) {
      let token = new Object();
      let reg1 = new RegExp('name="([^& \/\>]*)"', 'i');
      let reg2 = new RegExp('value="([^& \/\>]*)"', 'i');
      let name = response.html.match(reg1)[1];
      let value = response.html.match(reg2)[1];
      token[name] = value;
      return token;
    }
  );
}
/*友情链接*/
export function blogroll() {
  return fetch.post(api.Blogroll.url);
}
/*保持在线*/
export function keepOnline() {
  return fetch.get(api.KeepOnline.url);
}
/*判断能否访问页面接口*/
export function authorization() {
  return fetch.post(api.Authorization.url);
}
/*登陆*/
export function login(data) {
  return fetch.post(api.LoginCode.url, {...api.LoginCode.data, ...data});
}
/*踢出*/
export function kickOut(data) {
  return fetch.post(api.KickOut.url, {...api.KickOut.data, ...data});
}
/*验证码登陆*/
export function LoginCode(data) {
  return fetch.post(api.Login.url, {...api.Login.data, ...data});
}
/*修改密码*/
export function updatePwd(data) {
  return fetch.post(api.UpdatePwd.url, {...api.UpdatePwd.data, ...data});
}
/*设置密保--密码验证*/
export function setPasswordQuestion(data) {
  return fetch.post(api.SetPasswordQuestion.url, {...api.SetPasswordQuestion.data, ...data});
}
/*设置密保--添加密保问题*/
export function addPasswordQuestion(data) {
  return fetch.post(api.AddPasswordQuestion.url, {...api.AddPasswordQuestion.data, ...data});
}
/*获取用户信息（修改信息）*/
export function getUserInfo(data) {
  return fetch.post(api.GetUserInfo.url, {...api.GetUserInfo.data, ...data});
}
/*获取职位列表*/
export function getGradeList(data) {
  return fetch.post(api.GetGradeList.url, {...api.GetGradeList.data, ...data});
}
/*修改用户信息*/
export function updateUserInfo(data) {
  return fetch.post(api.UpdateUserInfo.url, {...api.UpdateUserInfo.data, ...data});
}
/*获取验证码*/
export function getVerifyCode() {
  return fetch.get(api.GetVerifyCode.url);
}
/*用户信息1*/
export function userMessage(data) {
  return fetch.post(api.LoginShort.url, {...api.LoginShort.data, ...data});
}
/*退出登录*/
export function loginOut(data) {
  return fetch.post(api.LoginOut.url, {...api.LoginOut.data, ...data});
}
/*通知公告*/
export function leftNotice(data) {
  return fetch.post(api.LeftNotice.url, {...api.LeftNotice.data, ...data});
}
/*文章列表*/
export function articleList(data) {
  return fetch.post(api.ArticleList.url, {...api.ArticleList.data, ...data});
}
/*文章分类*/
export function articleCategory(data) {
  return fetch.post(api.ArticleCategory.url, {...api.ArticleCategory.data, ...data});
}
/*实时数据*/
export function leftRealTimeData(data) {
  return fetch.post(api.LeftRealTimeData.url, {...api.LeftRealTimeData.data, ...data});
}
/*课程列表*/
export function courseList(data) {
  return fetch.post(api.CourseList.url, {...api.CourseList.data, ...data});
}
/*我的课程*/
export function myCenter(data) {
  return fetch.post(api.MyCenter.url, {...api.MyCenter.data, ...data});
}
/*删除所选课程*/
export function delUserCourseReg(data) {
  return fetch.post(api.DelUserCourseReg.url, {...api.DelUserCourseReg.data, ...data});
}
/*课程分类*/
export function courseCategory(data) {
  return fetch.post(api.CourseCategory.url, {...api.CourseCategory.data, ...data});
}
/*批量选课*/
export function addStudyCourse(data) {
  return fetch.post(api.AddStudyCourse.url, {...api.AddStudyCourse.data, ...data});
}
/*专题学习*/
export function studySpecial(data) {
  return fetch.post(api.StudySpecial.url, {...api.StudySpecial.data, ...data});
}
/*班级列表*/
export function getClassList(data) {
  return fetch.post(api.GetClassList.url, {...api.GetClassList.data, ...data});
}
/*报名培训班*/
export function updateTrainingStudentup(data) {
  return fetch.post(api.UpdateTrainingStudentup.url, {...api.UpdateTrainingStudentup.data, ...data});
}
/*报名培训班*/
export function updateTrainingStudentdown(data) {
  return fetch.post(api.UpdateTrainingStudentdown.url, {...api.UpdateTrainingStudentdown.data, ...data});
}
/*查看培训班权限*/
export function checkUserClass(data) {
  return fetch.post(api.CheckUserClass.url, {...api.CheckUserClass.data, ...data});
}
/*单位排行*/
export function leftGroupRank(data) {
  return fetch.post(api.LeftGroupRank.url, {...api.LeftGroupRank.data, ...data});
}
/*个人排行*/
export function rankUserList(data) {
  return fetch.post(api.RankUserList.url, {...api.RankUserList.data, ...data});
}
/*课程点击排行*/
export function courseClickRank(data) {
  return fetch.post(api.CourseClickRank.url, {...api.CourseClickRank.data, ...data});
}
/*电子书*/
export function bookList(data) {
  return fetch.post(api.BookList.url, {...api.BookList.data, ...data});
}
/*个人信息long*/
export function loginLong(data) {
  return fetch.post(api.LoginLong.url, {...api.LoginLong.data, ...data});
}
/*通知公告列表*/
export function noticeList(data) {
  return fetch.post(api.NoticeList.url, {...api.NoticeList.data, ...data});
}
/*通知公告内容*/
export function noticeContent(data) {
  return fetch.post(api.NoticeContent.url, {...api.NoticeContent.data, ...data});
}
/*收藏*/
export function favoriteAdd(data) {
  return fetch.post(api.FavoriteAdd.url, {...api.FavoriteAdd.data, ...data});
}
/*取消收藏*/
export function favoriteDelete(data) {
  return fetch.post(api.FavoriteDelete.url, {...api.FavoriteDelete.data, ...data});
}
/*培训班分类*/
export function getTrainingClassTypeList(data) {
  return fetch.post(api.GetTrainingClassTypeList.url, {...api.GetTrainingClassTypeList.data, ...data});
}
/*我的班级*/
export function classMy(data) {
  return fetch.post(api.ClassMy.url, {...api.ClassMy.data, ...data});
}
/*活跃班级*/
export function classActive(data) {
  return fetch.post(api.ClassActive.url, {...api.ClassActive.data, ...data});
}
/*近期班级*/
export function classRecent(data) {
  return fetch.post(api.ClassRecent.url, {...api.ClassRecent.data, ...data});
}
/*获取笔记*/
export function noteAdd(data) {
  return fetch.post(api.NoteAdd.url, {...api.NoteAdd.data, ...data});
}
/*提交笔记*/
export function addNote(data) {
  return fetch.post(api.AddNote.url, {...api.AddNote.data, ...data});
}
/*笔记列表*/
export function courseNoteList(data) {
  return fetch.post(api.CourseNoteList.url, {...api.CourseNoteList.data, ...data});
}
/*查看笔记详情*/
export function noteUpdate(data) {
  return fetch.get(api.NoteUpdate.url, {...api.NoteUpdate.data, ...data});
}
/*提交编辑笔记*/
export function noteEditUpdate(data) {
  return fetch.post(api.NoteEditUpdate.url, {...api.NoteEditUpdate.data, ...data});
}
/*删除笔记*/
export function delNote(data) {
  return fetch.post(api.DelNote.url, {...api.DelNote.data, ...data});
}
/*添加计划*/
export function studyPlanAdd(data) {
  return fetch.post(api.StudyPlanAdd.url, {...api.StudyPlanAdd.data, ...data});
}
/*提交编辑计划*/
export function editStudyPlan(data) {
  return fetch.post(api.EditStudyPlan.url, {...api.EditStudyPlan.data, ...data});
}
/*查看计划*/
export function studyPlanUpdate(data) {
  return fetch.post(api.StudyPlanUpdate.url, {...api.StudyPlanUpdate.data, ...data});
}
/*考试列表查看*/
export function courseExamList(data) {
  return fetch.post(api.CourseExamList.url, {...api.CourseExamList.data, ...data});
}
/*在线考试考试列表*/
export function examList(data) {
  return fetch.post(api.ExamList.url, {...api.ExamList.data, ...data});
}
/*参加测试*/
export function exam(data) {
  return fetch.post(api.Exam.url, {...api.Exam.data, ...data});
}
/*提交考试*/
export function postExam(data) {
  return fetch.post(api.PostExam.url, {...api.PostExam.data, ...data});
}
/*考试记录详情*/
export function examReview(data) {
  return fetch.post(api.ExamReview.url, {...api.ExamReview.data, ...data});
}
/*文章详情*/
export function articleContent(data) {
  return fetch.post(api.ArticleContent.url, {...api.ArticleContent.data, ...data});
}
/*课程详情*/
export function courseContent(data) {
  return fetch.post(api.CourseContent.url, {...api.CourseContent.data, ...data});
}
/*相关课程*/
export function relatedCourse(data) {
  return fetch.post(api.RelatedCourse.url, {...api.RelatedCourse.data, ...data});
}
/*课程评论*/
export function courseComment(data) {
  return fetch.post(api.CourseComment.url, {...api.CourseComment.data, ...data});
}
/*获取单位*/
export function getGroupList(data) {
  return fetch.post(api.GetGroupList.url, {...api.GetGroupList.data, ...data});
}
/*注册*/
export function register(data) {
  return fetch.post(api.Register.url, {...api.Register.data, ...data});
}
/*发送验证码*/
export function sendMsg(data) {
  return fetch.post(api.SendMsg.url, {...api.SendMsg.data, ...data});
}
/*个人档案*/
export function studyStatistics(data) {
  return fetch.post(api.StudyStatistics.url, {...api.StudyStatistics.data, ...data});
}
/*个人通知*/
export function noticeUnReadList(data) {
  return fetch.post(api.NoticeUnReadList.url, {...api.NoticeUnReadList.data, ...data});
}
/*班级列表（type："my" 我的班级 type："recent" 近期班级 type："active" 活跃班级）*/
export function classList(data) {
  return fetch.post(api.ClassList.url, {...api.ClassList.data, ...data});
}
/*全局搜索*/
export function searchAll(data) {
  return fetch.post(api.SearchAll.url, {...api.SearchAll.data, ...data});
}
/*平台介绍*/
export function collegeInfo(data) {
  return fetch.post(api.CollegeInfo.url, {...api.CollegeInfo.data, ...data});
}
/*播放信息*/
export function play(data) {
  return fetch.post(api.Play.url, {...api.Play.data, ...data});
}
/*添加评论*/
export function courseCommentAdd(data) {
  return fetch.post(api.CourseCommentAdd.url, {...api.CourseCommentAdd.data, ...data});
}
/*播放mp4*/
export function playJwplay(data) {
  return fetch.post(api.PlayJwplay.url, {...api.PlayJwplay.data, ...data});
}
/*单视频播放进度*/
export function singleProcess(data) {
  return fetch.post(api.SingleProcess.url, {...api.SingleProcess.data, ...data});
}
/*播放Jy*/
export function playJY(data) {
  return fetch.post(api.PlayJY.url, {...api.PlayJY.data, ...data});
}
/*Jy播放进度*/
export function jYProcess(data) {
  return fetch.post(api.JYProcess.url, {...api.JYProcess.data, ...data});
}
/*播放Scorm*/
export function playScorm(data) {
  return fetch.post(api.PlayScorm.url, {...api.PlayScorm.data, ...data});
}
/*Scorm播放进度*/
export function scormProcess(url,data) {
  return fetch.post(url, {...api.ScormProcess.data, ...data});
}
/*班级详情*/
export function classDetail(data) {
  return fetch.post(api.ClassDetail.url, {...api.ClassDetail.data, ...data});
}
/*个人学习信息*/
export function classInformation(data) {
  return fetch.post(api.ClassInformation.url, {...api.ClassInformation.data, ...data});
}
/*教学计划*/
export function classPlan(data) {
  return fetch.post(api.ClassPlan.url, {...api.ClassPlan.data, ...data});
}
/*同学名录*/
export function classStudent(data) {
  return fetch.post(api.ClassStudent.url, {...api.ClassStudent.data, ...data});
}
/*班级论文*/
export function classPaperList(data) {
  return fetch.post(api.ClassPaperList.url, {...api.ClassPaperList.data, ...data});
}
/*班级话题*/
export function classTopicList(data) {
  return fetch.post(api.ClassTopicList.url, {...api.ClassTopicList.data, ...data});
}
/*班级公告*/
export function classNoticeList(data) {
  return fetch.post(api.ClassNoticeList.url, {...api.ClassNoticeList.data, ...data});
}
/*班级课程*/
export function classCourse(data) {
  return fetch.post(api.ClassCourse.url, {...api.ClassCourse.data, ...data});
}
/*班级考试*/
export function classExam(data) {
  return fetch.post(api.ClassExam.url, {...api.ClassExam.data, ...data});
}