/**
 * api
 */
// const API = 'http://test10.jy365.net/api';
const API = '/api';
const PLATFORM = '/page';
const config = {
  /*mock 测试*/
  tags: {
    url: `${PLATFORM}/tags`,
    data: {}
  },
  /*判断能否访问页面接口*/
  Authorization: {
    url: `${API}${PLATFORM}/Authorization`,
    data: {}
  },
  /*保持在线*/
  KeepOnline: {
    url: `${API}${PLATFORM}/KeepOnline`,
  },
  /*友情链接*/
  Blogroll: {
    url: `${API}${PLATFORM}/Blogroll`,
    data: {}
  },
  /*登陆*/
  LoginCode: {
    url: `${API}${PLATFORM}/LoginCode`,
    data: {}
  },
  /*踢出*/
  KickOut: {
    url: `${API}${PLATFORM}/KickOut`,
    data: { kickUserId: '' }
  },
  /*验证码登陆*/
  Login: {
    url: `${API}${PLATFORM}/Login`,
    data: {}
  },
  /*获取验证码*/
  GetVerifyCode: {
    url: `${API}/Common/GetVerifyCode`,
    data: {}
  },
  /*修改密码*/
  UpdatePwd: {
    url: `${API}${PLATFORM}/UpdatePwd`,
    data: { newPwd: "", oldPwd: "" }
  },
  /*设置密保--密码验证*/
  SetPasswordQuestion: {
    url: `${API}${PLATFORM}/SetPasswordQuestion`,
    data: { pwd: "" }
  },
  /*设置密保--添加密保问题*/
  AddPasswordQuestion: {
    url: `${API}${PLATFORM}/AddPasswordQuestion`,
    data: { pwd: "", questions: '' }
  },
  /*获取用户信息（修改信息）*/
  GetUserInfo: {
    url: `${API}${PLATFORM}/GetUserInfo`,
    data: {}
  },
  /*获取职位列表*/
  GetGradeList: {
    url: `${API}/Common/GetGradeList`,
    data: {}
  },
  /*修改用户信息*/
  UpdateUserInfo: {
    url: `${API}${PLATFORM}/UpdateUserInfo`,
    data: {}
  },
  /*获取token*/
  AntiForgeryToken: {
    url: `${API}${PLATFORM}/AntiForgeryToken`,
    data: {}
  },
  /*用户信息1*/
  LoginShort: {
    url: `${API}${PLATFORM}/LoginShort`,
    data: {}
  },
  /*退出登录*/
  LoginOut: {
    url: `${API}${PLATFORM}/LoginOut`,
    data: {}
  },
  /*通知公告*/
  LeftNotice: {
    url: `${API}${PLATFORM}/LeftNotice`,
    data: { page: 1, rows: 4, sort: 'Sort', order: 'desc', wordLimt: 15 }
  },
  /*文章列表*/
  ArticleList: {
    url: `${API}${PLATFORM}/ArticleList`,
    data: { page: 1, rows: 7, search: '', sort: 'Sort', order: 'desc', wordLimt: 20, categoryCode: '', categoryId: '' }
  },
  /*文章分类*/
  ArticleCategory: {
    url: `${API}${PLATFORM}/ArticleCategory`,
    data: { sort: 'sort', order: 'desc', titleNav: '文章分类' }
  },
  /*实时数据*/
  LeftRealTimeData: {
    url: `${API}${PLATFORM}/LeftRealTimeData`,
    data: {}
  },
  /*课程列表*/
  CourseList: {
    url: `${API}${PLATFORM}/CourseList`,
    data: {
      page: 1,
      rows: 10,
      teacher: '',
      courseType: 'All',
      channelId: '',
      channelCode: '',
      title: '',
      sort: 'Sort',
      order: 'desc',
      titleNav: '课程中心',
      wordLimt: 35
    }
  },
  /*课程分类*/
  CourseCategory: {
    url: `${API}${PLATFORM}/CourseCategory`,
    data: { page: 1, rows: '', titleNav: '课程分类', sort: 'Sort', order: 'Desc' }
  },
  /*我的课程*/
  MyCenter: {
    url: `${API}${PLATFORM}/MyCenter`,
    data: { page: 1, rows: 10, courseType: 'All', title: '', titleNav: '个人中心', sort: 'browseScore', order: 'desc' }
  },
  /*删除所选课程*/
  DelUserCourseReg: {
    url: `${API}${PLATFORM}/DelUserCourseReg`,
    data: { courseId: '' }
  },
  /*批量选课*/
  AddStudyCourse: {
    url: `${API}${PLATFORM}/AddStudyCourse`,
    data: { checkValue: '' }
  },
  /*专题学习*/
  StudySpecial: {
    url: `${API}${PLATFORM}/StudySpecial`,
    data: { page: 1, rows: '', titleNav: '专题学习', sort: 'Sort', order: 'Desc' }
  },
  /*班级分类*/
  GetTrainingClassTypeList: {
    url: `${API}${PLATFORM}/GetTrainingClassTypeList`,
    data: { page: 1, rows: '', titleNav: "培训班分类", sort: 'Sort', order: 'Desc' }
  },
  /*班级列表*/
  GetClassList: {
    url: `${API}${PLATFORM}/GetClassList`,
    data: { page: 1, rows: 6, title: '', categoryId: '', type: 'All', titleNav: "班级列表", sort: 'Sort', order: 'Desc' }
  },
  /*报名培训班*/
  UpdateTrainingStudentup: {
    url: `${API}/Guid/UpdateTrainingStudentup`,
    data: { id: '' }
  },
  /*取消报名培训班*/
  UpdateTrainingStudentdown: {
    url: `${API}/Guid/UpdateTrainingStudentdown`,
    data: { id: '' }
  },
  /*查看培训班权限*/
  CheckUserClass: {
    url: `${API}${PLATFORM}/CheckUserClass`,
    data: { trainingId: '' }
  },
  //单位排行
  LeftGroupRank: {
    url: `${API}${PLATFORM}/LeftGroupRank`,
    data: { page: 1, rows: 6, sort: 'AvgCredit', order: 'desc', titleNav: '单位排行', wordLimt: 9 }
  },
  //个人排行
  RankUserList: {
    url: `${API}${PLATFORM}/RankUserList`,
    data: { page: 1, rows: 6, sort: 'TotalCredit', order: 'desc', titleNav: '个人排行', wordLimt: 9 }
  },
  //课程点击排行
  CourseClickRank: {
    url: `${API}${PLATFORM}/CourseClickRank`,
    data: {
      page: 1,
      rows: 6,
      sort: 'ClickCount',
      order: 'desc',
      courseType: 'All',
      flag: 'All',
      titleNav: '课程点击排行',
      wordLimt: 9
    }
  },
  //电子书
  BookList: {
    url: `${API}${PLATFORM}/BookList`,
    data: {
      page: 1,
      rows: 8,
      sort: 'Sort',
      order: 'asc',
      categoryId: '',
      ptitle: '',
      title: '',
      titleNav: '电子书',
      wordLimt: 30
    }
  },
  /*个人信息long*/
  LoginLong: {
    url: `${API}${PLATFORM}/LoginLong`,
    data: {}
  },
  /*通知公告列表*/
  NoticeList: {
    url: `${API}${PLATFORM}/NoticeList`,
    data: { page: 1, rows: 10, sort: 'Id', search: '', order: 'desc', categoryId: 0, titleNav: '通知公告', wordLimt: 30 }
  },
  /*通知公告内容*/
  NoticeContent: {
    url: `${API}${PLATFORM}/NoticeContent`,
    data: { id: 1, titleNav: '通知内容' }
  },
  /*收藏*/
  FavoriteAdd: {
    url: `${API}${PLATFORM}/FavoriteAdd`,
    data: { mainId: '', type: '', title: '', remark: '' }
  },
  /*取消收藏*/
  FavoriteDelete: {
    url: `${API}${PLATFORM}/FavoriteDelete`,
    data: { id: '' }
  },
  /*我的班级*/
  ClassMy: {
    url: `${API}${PLATFORM}/ClassMy`,
    data: { page: 1, rows: 10, sort: 'Id', order: 'desc', titleNav: '我的班级', title: '' }
  },
  /*活跃班级*/
  ClassActive: {
    url: `${API}${PLATFORM}/ClassActive`,
    data: { page: 1, rows: 10, sort: 'CurrentUser', order: 'desc', titleNav: '活跃班级' }
  },
  /*近期班级*/
  ClassRecent: {
    url: `${API}${PLATFORM}/ClassRecent`,
    data: { page: 1, rows: 10, sort: 'StartDate', order: 'desc', titleNav: '近期班级' }
  },
  /*班级文章*/
  ClassArticleDetail: {
    url: `${API}${PLATFORM}/ClassArticleDetail`,
    data: { id: '' }
  },
  /*获取笔记*/
  NoteAdd: {
    url: `${API}/Home/NoteAdd`,
    data: { courseId: '' }
  },
  /*提交笔记*/
  AddNote: {
    url: `${API}${PLATFORM}/AddNote`,
    data: { name: '', content: '', courseId: '' }
  },
  /*笔记列表*/
  CourseNoteList: {
    url: `${API}${PLATFORM}/CourseNoteList`,
    data: { courseId: '' }
  },
  /*查看笔记详情*/
  NoteUpdate: {
    url: `${API}${PLATFORM}/NoteUpdate`,
    data: { noteid: '' }
  },
  /*提交编辑笔记*/
  NoteEditUpdate: {
    url: `${API}${PLATFORM}/NoteUpdate`,
    data: { id: '', content: '', name: '' }
  },
  /*删除笔记*/
  DelNote: {
    url: `${API}${PLATFORM}/DelNote`,
    data: { id: '' }
  },
  /*添加计划*/
  StudyPlanAdd: {
    url: `${API}/Home/StudyPlanAdd`,
    data: { courseId: '' }
  },
  /*提交编辑计划*/
  EditStudyPlan: {
    url: `${API}${PLATFORM}/StudyPlanAdd`,
    data: { planFinishDate: '', remindDate: '', remindCycle: '', remark: '', courseId: '' }
  },
  /*查看计划*/
  StudyPlanUpdate: {
    url: `${API}/Home/StudyPlanUpdate`,
    data: { courseId: '' }
  },
  /*考试列表查看*/
  CourseExamList: {
    url: `${API}${PLATFORM}/CourseExamList`,
    data: { courseId: '' }
  },
  /*在线考试考试列表*/
  ExamList: {
    url: `${API}${PLATFORM}/ExamList`,
    data: { page: 1, rows: 5, examType: 'All', title: '', sort: 'id', order: 'desc', titleNav: '在线考试' }
  },
  /*参加测试*/
  Exam: {
    url: `${API}/Exam/Exam`,
    data: { parameter1: '' }
  },
  /*提交考试*/
  PostExam: {
    url: `${API}/Exam/PostExam`,
    data: {}
  },
  /*考试记录详情*/
  ExamReview: {
    url: `${API}/Exam/ExamReview`,
    data: { parameter1: '', parameter2: '' }
  },
  /*文章详情*/
  ArticleContent: {
    url: `${API}${PLATFORM}/ArticleContent`,
    data: { id: '' }
  },
  /*课程详情*/
  CourseContent: {
    url: `${API}${PLATFORM}/CourseContent`,
    data: { id: '', titleNav: '课程详情' }
  },
  /*相关课程*/
  RelatedCourse: {
    url: `${API}/Guid/RelatedCourse`,
    data: { page: 1, rows: 10, courseId: '' }
  },
  /*课程评论*/
  CourseComment: {
    url: `${API}${PLATFORM}/CourseComment`,
    data: { id: '', page: 1, rows: 10, sort: 'Id', order: 'Desc' }
  },
  /*获取单位*/
  GetGroupList: {
    url: `${API}/Common/GetGroupList`,
    data: { id: '' }
  },
  /*注册*/
  Register: {
    url: `${API}${PLATFORM}/Register`,
    data: { account: '', name: '', password: '', mobile: '', idcard: '', email: '', groupid: '', smgcode: '' }
  },
  /*发送验证码*/
  SendMsg: {
    url: `${API}${PLATFORM}/SendMsg`,
    data: { mobileNo: '' }
  },
  /*个人档案*/
  StudyStatistics: {
    url: `${API}${PLATFORM}/StudyStatistics`,
    data: {
      page: 1,
      rows: 5,
      sort: 'Id',
      order: 'desc',
      type: '',
      startDate: '',
      endDate: '',
      wordLimt: 24,
      titleNav: '个人学习档案'
    }
  },
  /*个人通知*/
  NoticeUnReadList: {
    url: `${API}${PLATFORM}/NoticeUnReadList`,
    data: { page: 1, rows: 7, sort: 'Id', order: 'desc', titleNav: '个人通知', wordLimt: 30 }
  },
  /*班级列表（type："my" 我的班级 type："recent" 近期班级 type："active" 活跃班级）*/
  ClassList: {
    url: `${API}${PLATFORM}/ClassList`,
    data: { page: 1, rows: 20, sort: 'Id', order: 'desc', title: "", type: "", wordLimt: 30 }
  },
  /*全局搜索*/
  SearchAll: {
    url: `${API}${PLATFORM}/SearchAll`,
    data: { page: 1, rows: 20, key: '', }
  },
  /*平台介绍*/
  CollegeInfo: {
    url: `${API}${PLATFORM}/CollegeInfo`,
    data: { sort: "sort" }
  },
  /*播放信息*/
  Play: {
    url: `${API}/Home/Play`,
    data: { id: "" }
  },
  /*添加评论*/
  CourseCommentAdd: {
    url: `${API}${PLATFORM}/CourseCommentAdd`,
    data: { mainId: "", parentId: 0, content: '', rate: '' }
  },
  /*播放mp4*/
  PlayJwplay: {
    url: `${API}/Home/PlayJwplay`,
    data: { courseId: '' }
  },
  /*单视频播放进度*/
  SingleProcess: {
    url: `${API}/CourseProcess/SingleProcess`,
    data: { portalId: '', userId: '', courseId: '', positionen: '' }
  },
  /*播放Jy*/
  PlayJY: {
    url: `${API}/Home/PlayJY`,
    data: { courseId: '' }
  },
  /*Jy播放进度*/
  JYProcess: {
    url: `${API}/CourseProcess/JYProcess`,
    data: { portalId: '', userId: '', courseId: '', positionen: '' }
  },
  /*播放Scorm*/
  PlayScorm: {
    url: `${API}/Home/PlayScorm`,
    data: { courseId: '' }
  },
  /*Scorm播放进度*/
  ScormProcess: {
    url: `${API}/CourseProcess/ScormProcess`,
    data: { portalId: '', userId: '', courseId: '', position: '' }
  },
  /*班级详情*/
  ClassDetail: {
    url: `${API}${PLATFORM}/ClassDetail`,
    data: { id: '', titleNav: '培训班详情', page: 1, rows: 9, sort: 'Id', order: 'desc' }
  },
  /*个人学习信息*/
  ClassInformation: {
    url: `${API}${PLATFORM}/ClassInformation`,
    data: { id: '', titleNav: '个人学习信息' }
  },
  /*教学计划*/
  ClassPlan: {
    url: `${API}${PLATFORM}/ClassPlan`,
    data: { id: '', titleNav: '教学计划' }
  },
  /*同学名录*/
  ClassStudent: {
    url: `${API}${PLATFORM}/ClassStudent`,
    data: { id: '', page: 1, rows: 12, sort: 'Id', order: 'desc', titleNav: '同学名录' }
  },
  /*班级论文*/
  ClassPaperList: {
    url: `${API}${PLATFORM}/ClassPaperList`,
    data: { id: '', page: 1, rows: 12, sort: 'Id', order: 'desc', titleNav: '班级论文', wordLimt: 30 }
  },
  /*班级话题*/
  ClassTopicList: {
    url: `${API}${PLATFORM}/ClassTopicList`,
    data: { id: '', page: 1, rows: 12, sort: 'Id', order: 'desc', titleNav: '班级话题', wordLimt: 30 }
  },
  /*班级公告*/
  ClassNoticeList: {
    url: `${API}${PLATFORM}/ClassNoticeList`,
    data: { id: '', page: 1, rows: 12, sort: 'Id', order: 'desc', titleNav: '班级公告', wordLimt: 30 }
  },
  /*班级课程*/
  ClassCourse: {
    url: `${API}${PLATFORM}/ClassCourse`,
    data: { id: '', page: 1, rows: 12, sort: 'Id', order: 'desc', titleNav: '班级课程', wordLimt: 30 }
  },
  /*班级考试*/
  ClassExam: {
    url: `${API}${PLATFORM}/ClassExam`,
    data: { id: '', page: 1, rows: 12, sort: 'Id', order: 'desc', titleNav: '班级考试', wordLimt: 30 }
  },
  /*班级相册*/
  PhotoAlbumList: {
    url: `${API}${PLATFORM}/PhotoAlbumList`,
    data: { id: '', page: 1, rows: 9, sort: 'Id', order: 'desc', titleNav: '班级相册' }
  },
  /*班级相册 照片*/
  PhotoPreview: {
    url: `${API}${PLATFORM}/PhotoPreview`,
    data: { albumId: "", trainingId: "", page: 1, rows: 9, sort: 'Id', order: 'desc', titleNav: '班级照片' }
  },
  /*添加话题*/
  ClassTopicAdd: {
    url: `${API}${PLATFORM}/ClassTopicAdd`,
    data: { id: "", page: 1, rows: 9, sort: 'Id', order: 'desc', titleNav: '添加话题' }
  },
  /*发布文章 话题 type: topic paper*/
  ClassPublishArticle: {
    url: `${API}${PLATFORM}/ClassPublishArticle`,
    data: { type: '', trainingId: "", name: "", categoryId: "", content: "" }
  },
  /*培训班--获取分类 type: topic paper*/
  GetTrainingArticleCategory: {
    url: `${API}${PLATFORM}/GetTrainingArticleCategory`,
    data: { type: '', trainingId: "" }
  },
  /*添加论文*/
  ClassPaperAdd: {
    url: `${API}${PLATFORM}/ClassPaperAdd`,
    data: { id: "", page: 1, rows: 9, sort: 'Id', order: 'desc', titleNav: '添加论文' }
  },
  /*添加相册*/
  PhotoAlbumAdd: {
    url: `${API}${PLATFORM}/PhotoAlbumAdd`,
    data: { trainingId: "", titleNav: '添加相册' }
  },
  /*添加相册-提交*/
  GetPhotoAlbumAdd: {
    url: `${API}${PLATFORM}/GetPhotoAlbumAdd`,
    data: { name: "", description: "", imgUrl: "", trainingId: "" }
  },
  /*问卷调查列表*/
  PollList: {
    url: `${API}${PLATFORM}/PollList`,
    data: {
      page: 1,
      rows: 10,
      sort: 'Id',
      order: 'desc',
      titleNav: "问卷调查",
      examType: "All",
      title: "",
      trainingId: "",
      wordLimt: 30
    }
  },
  /*原创文章列表(学员心声)*/
  OriginalArticleList: {
    url: `${API}${PLATFORM}/OriginalArticleList`,
    data: { page: 1, rows: 9, sort: 'Id', order: 'desc', titleNav: '学员心声列表' }
  },
  /*原创文章添加（发表心声）*/
  AddOriginalArticle: {
    url: `${API}${PLATFORM}/AddOriginalArticle`,
    data: { name: '', content: '' }
  },
  /*留言板*/
  MessageList: {
    url: `${API}${PLATFORM}/MessageList`,
    data: { page: 1, rows: 10, sort: 'CreateDate', order: 'desc', titleNav: '留言板', wordLimt: '35' }
  },
  /*留言信息详情*/
  MessageDetail: {
    url: `${API}${PLATFORM}/MessageDetail`,
    data: { id: '', titleNav: '留言详情' }
  },
  /*提交添加留言*/
  GetMessageAdd: {
    url: `${API}${PLATFORM}/GetMessageAdd`,
    data: { name: '', class: '', content: '' }
  },
};

export default config;
