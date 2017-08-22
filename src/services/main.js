import {fetch, config} from '../utils/index'
const {api} = config;
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
/*判断能否访问页面接口*/
export function authorization() {
  return fetch.post(api.Authorization.url);
}
/*登陆*/
export function login(data) {
  return fetch.post(api.LoginCode.url, { ...api.LoginCode.data, ...data});
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
/*实时数据*/
export function leftRealTimeData(data) {
  return fetch.post(api.LeftRealTimeData.url, {...api.LeftRealTimeData.data, ...data});
}
/*课程列表*/
export function courseList(data) {
  return fetch.post(api.CourseList.url, {...api.CourseList.data, ...data});
}
/*课程分类*/
export function courseCategory(data) {
  return fetch.post(api.CourseCategory.url, {...api.CourseCategory.data, ...data});
}
/*专题学习*/
export function studySpecial(data) {
  return fetch.post(api.StudySpecial.url, {...api.StudySpecial.data, ...data});
}
/*班级分类*/
export function getTrainingClassTypeList(data) {
  return fetch.post(api.GetTrainingClassTypeList.url, {...api.GetTrainingClassTypeList.data, ...data});
}
/*班级列表*/
export function getClassList(data) {
  return fetch.post(api.GetClassList.url, {...api.GetClassList.data, ...data});
}
/*报名培训班*/
export function updateTrainingStudentup(data) {
  return fetch.post(api.UpdateTrainingStudentup.url, {...api.UpdateTrainingStudentup.data, ...data});
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
