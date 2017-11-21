/**
 * Created by admin on 2017/8/4.
 */
const API = 'http://test10.jy365.net/api';
// const API = '/api';
module.exports = {
  api: {
    /*mock 测试*/
    tags: {
      url: `${API}/page/tags`,
      data: {}
    },
    /*判断能否访问页面接口*/
    Authorization: {
      url: `${API}/Page/Authorization`,
      data: {}
    },
    /*保持在线*/
    KeepOnline: {
      url: `${API}/Page/KeepOnline`,
    },
    /*友情链接*/
    Blogroll: {
      url: `${API}/Page/Blogroll`,
      data: {}
    },
    /*登陆*/
    LoginCode: {
      url: `${API}/Page/LoginCode`,
      data: {}
    },
    /*踢出*/
    KickOut: {
      url: `${API}/Page/KickOut`,
      data: {kickUserId: ''}
    },
    /*验证码登陆*/
    Login: {
      url: `${API}/Page/Login`,
      data: {}
    },
    /*获取验证码*/
    GetVerifyCode: {
      url: `${API}/Common/GetVerifyCode`,
      data: {}
    },
    /*修改密码*/
    UpdatePwd: {
      url: `${API}/Page/UpdatePwd`,
      data: {newPwd: "", oldPwd: ""}
    },
    /*设置密保--密码验证*/
    SetPasswordQuestion: {
      url: `${API}/Page/SetPasswordQuestion`,
      data: {pwd: ""}
    },
    /*设置密保--添加密保问题*/
    AddPasswordQuestion: {
      url: `${API}/Page/AddPasswordQuestion`,
      data: {pwd: "", questions: ''}
    },
    /*获取用户信息（修改信息）*/
    GetUserInfo: {
      url: `${API}/Page/GetUserInfo`,
      data: {}
    },
    /*获取职位列表*/
    GetGradeList: {
      url: `${API}/Common/GetGradeList`,
      data: {}
    },
    /*修改用户信息*/
    UpdateUserInfo: {
      url: `${API}/Page/UpdateUserInfo`,
      data: {}
    },
    /*获取token*/
    AntiForgeryToken: {
      url: `${API}/Page/AntiForgeryToken`,
      data: {}
    },
    /*用户信息1*/
    LoginShort: {
      url: `${API}/Page/LoginShort`,
      data: {}
    },
    /*退出登录*/
    LoginOut: {
      url: `${API}/Page/LoginOut`,
      data: {}
    },
    /*通知公告*/
    LeftNotice: {
      url: `${API}/Page/LeftNotice`,
      data: {page: 1, rows: 4, sort: 'Sort', order: 'desc', wordLimt: 15}
    },
    /*文章列表*/
    ArticleList: {
      url: `${API}/Page/ArticleList`,
      data: {page: 1, rows: 7, search: '', sort: 'Sort', order: 'desc', wordLimt: 20, categoryCode: '', categoryId: ''}
    },
    /*文章分类*/
    ArticleCategory: {
      url: `${API}/Page/ArticleCategory`,
      data: {sort: 'sort', order: 'desc', titleNav: '文章分类'}
    },
    /*实时数据*/
    LeftRealTimeData: {
      url: `${API}/Page/LeftRealTimeData`,
      data: {}
    },
    /*课程列表*/
    CourseList: {
      url: `${API}/Page/CourseList`,
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
      url: `${API}/Page/CourseCategory`,
      data: {page: 1, rows: '', titleNav: '课程分类', sort: 'Sort', order: 'Desc'}
    },
    /*我的课程*/
    MyCenter: {
      url: `${API}/Page/MyCenter`,
      data: {page: 1, rows: 10, courseType: 'All', title: '', titleNav: '个人中心', sort: 'browseScore', order: 'desc'}
    },
    /*删除所选课程*/
    DelUserCourseReg: {
      url: `${API}/Page/DelUserCourseReg`,
      data: {courseId: ''}
    },
    /*批量选课*/
    AddStudyCourse: {
      url: `${API}/Page/AddStudyCourse`,
      data: {checkValue: ''}
    },
    /*专题学习*/
    StudySpecial: {
      url: `${API}/Page/StudySpecial`,
      data: {page: 1, rows: '', titleNav: '专题学习', sort: 'Sort', order: 'Desc'}
    },
    /*班级分类*/
    GetTrainingClassTypeList: {
      url: `${API}/Page/GetTrainingClassTypeList`,
      data: {page: 1, rows: '', titleNav: "培训班分类", sort: 'Sort', order: 'Desc'}
    },
    /*班级列表*/
    GetClassList: {
      url: `${API}/Page/GetClassList`,
      data: {page: 1, rows: 6, title: '', categoryId: '', type: 'All', titleNav: "班级列表", sort: 'Sort', order: 'Desc'}
    },
    /*报名培训班*/
    UpdateTrainingStudentup: {
      url: `${API}/Guid/UpdateTrainingStudentup`,
      data: {id: ''}
    },
    /*取消报名培训班*/
    UpdateTrainingStudentdown: {
      url: `${API}/Guid/UpdateTrainingStudentdown`,
      data: {id: ''}
    },
    /*查看培训班权限*/
    CheckUserClass: {
      url: `${API}/Page/CheckUserClass`,
      data: {trainingId: ''}
    },
    //单位排行
    LeftGroupRank: {
      url: `${API}/Page/LeftGroupRank`,
      data: {page: 1, rows: 6, sort: 'AvgCredit', order: 'desc', titleNav: '单位排行', wordLimt: 9}
    },
    //个人排行
    RankUserList: {
      url: `${API}/Page/RankUserList`,
      data: {page: 1, rows: 6, sort: 'TotalCredit', order: 'desc', titleNav: '个人排行', wordLimt: 9}
    },
    //课程点击排行
    CourseClickRank: {
      url: `${API}/Page/CourseClickRank`,
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
      url: `${API}/Page/BookList`,
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
      url: `${API}/Page/LoginLong`,
      data: {}
    },
    /*通知公告列表*/
    NoticeList: {
      url: `${API}/Page/NoticeList`,
      data: {page: 1, rows: 10, sort: 'Id', search: '', order: 'desc', categoryId: 0, titleNav: '通知公告', wordLimt: 30}
    },
    /*通知公告内容*/
    NoticeContent: {
      url: `${API}/Page/NoticeContent`,
      data: {id: 1, titleNav: '通知内容'}
    },
    /*收藏*/
    FavoriteAdd: {
      url: `${API}/Page/FavoriteAdd`,
      data: {mainId: '', type: '', title: '', remark: ''}
    },
    /*取消收藏*/
    FavoriteDelete: {
      url: `${API}/Page/FavoriteDelete`,
      data: {id: ''}
    },
    /*我的班级*/
    ClassMy: {
      url: `${API}/Page/ClassMy`,
      data: {page: 1, rows: 10, sort: 'Id', order: 'desc', titleNav: '我的班级', title: ''}
    },
    /*活跃班级*/
    ClassActive: {
      url: `${API}/Page/ClassActive`,
      data: {page: 1, rows: 10, sort: 'CurrentUser', order: 'desc', titleNav: '活跃班级'}
    },
    /*近期班级*/
    ClassRecent: {
      url: `${API}/Page/ClassRecent`,
      data: {page: 1, rows: 10, sort: 'StartDate', order: 'desc', titleNav: '近期班级'}
    },
    /*获取笔记*/
    NoteAdd: {
      url: `${API}/Home/NoteAdd`,
      data: {courseId: ''}
    },
    /*提交笔记*/
    AddNote: {
      url: `${API}/Page/AddNote`,
      data: {name: '', content: '', courseId: ''}
    },
    /*笔记列表*/
    CourseNoteList: {
      url: `${API}/Page/CourseNoteList`,
      data: {courseId: ''}
    },
    /*查看笔记详情*/
    NoteUpdate: {
      url: `${API}/Page/NoteUpdate`,
      data: {noteid: ''}
    },
    /*提交编辑笔记*/
    NoteEditUpdate: {
      url: `${API}/Page/NoteUpdate`,
      data: {id: '', content: '', name}
    },
    /*删除笔记*/
    DelNote: {
      url: `${API}/Page/DelNote`,
      data: {id: ''}
    },
    /*添加计划*/
    StudyPlanAdd: {
      url: `${API}/Home/StudyPlanAdd`,
      data: {courseId: ''}
    },
    /*提交编辑计划*/
    EditStudyPlan: {
      url: `${API}/Page/StudyPlanAdd`,
      data: {planFinishDate: '', remindDate: '', remindCycle: '', remark: '', courseId: ''}
    },
    /*查看计划*/
    StudyPlanUpdate: {
      url: `${API}/Home/StudyPlanUpdate`,
      data: {courseId: ''}
    },
    /*考试列表查看*/
    CourseExamList: {
      url: `${API}/Page/CourseExamList`,
      data: {courseId: ''}
    },
    /*在线考试考试列表*/
    ExamList: {
      url: `${API}/Page/ExamList`,
      data: {page: 1, rows: 5, examType: 'All', title: '', sort: 'id', order: 'desc', titleNav: '在线考试'}
    },
    /*参加测试*/
    Exam: {
      url: `${API}/Exam/Exam`,
      data: {parameter1: ''}
    },
    /*提交考试*/
    PostExam: {
      url: `${API}/Exam/PostExam`,
      data: {}
    },
    /*考试记录详情*/
    ExamReview: {
      url: `${API}/Exam/ExamReview`,
      data: {parameter1: '', parameter2: ''}
    },
    /*文章详情*/
    ArticleContent: {
      url: `${API}/Page/ArticleContent`,
      data: {id: ''}
    },
    /*课程详情*/
    CourseContent: {
      url: `${API}/Page/CourseContent`,
      data: {id: '', titleNav: '课程详情'}
    },
    /*相关课程*/
    RelatedCourse: {
      url: `${API}/Guid/RelatedCourse`,
      data: {page: 1, rows: 10, courseId: ''}
    },
    /*课程评论*/
    CourseComment: {
      url: `${API}/Page/CourseComment`,
      data: {id: '', page: 1, rows: 10, sort: 'Id', order: 'Desc'}
    },
    /*获取单位*/
    GetGroupList: {
      url: `${API}/Common/GetGroupList`,
      data: {id: ''}
    },
    /*注册*/
    Register: {
      url: `${API}/Page/Register`,
      data: {account: '', name: '', password: '', mobile: '', idcard: '', email: '', groupid: '', smgcode: ''}
    },
    /*发送验证码*/
    SendMsg: {
      url: `${API}/Page/SendMsg`,
      data: {mobileNo: ''}
    },
    /*个人档案*/
    StudyStatistics: {
      url: `${API}/Page/StudyStatistics`,
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
      url: `${API}/Page/NoticeUnReadList`,
      data: {page: 1, rows: 7, sort: 'Id', order: 'desc', titleNav: '个人通知', wordLimt: 30}
    },
    /*班级列表（type："my" 我的班级 type："recent" 近期班级 type："active" 活跃班级）*/
    ClassList: {
      url: `${API}/Page/ClassList`,
      data: {page: 1, rows: 20, sort: 'Id', order: 'desc', title: "", type: "", wordLimt: 30}
    },
    /*全局搜索*/
    SearchAll: {
      url: `${API}/Page/SearchAll`,
      data: {page: 1, rows: 20, key: '',}
    },
    /*平台介绍*/
    CollegeInfo: {
      url: `${API}/Page/CollegeInfo`,
      data: {sort: "sort"}
    },
    /*播放信息*/
    Play: {
      url: `${API}/Home/Play`,
      data: {id: ""}
    },
    /*添加评论*/
    CourseCommentAdd: {
      url: `${API}/Page/CourseCommentAdd`,
      data: {mainId: "", parentId: 0, content: '', rate: ''}
    },
    /*播放mp4*/
    PlayJwplay: {
      url: `${API}/Home/PlayJwplay`,
      data: {courseId: ''}
    },
    /*单视频播放进度*/
    SingleProcess: {
      url: `${API}/CourseProcess/SingleProcess`,
      data: {portalId: '', userId: '', courseId: '', positionen: ''}
    },
    /*播放Jy*/
    PlayJY: {
      url: `${API}/Home/PlayJY`,
      data: {courseId: ''}
    },
    /*Jy播放进度*/
    JYProcess: {
      url: `${API}/CourseProcess/JYProcess`,
      data: {portalId: '', userId: '', courseId: '', positionen: ''}
    },
    /*播放Scorm*/
    PlayScorm: {
      url: `${API}/Home/PlayScorm`,
      data: {courseId: ''}
    },
    /*Scorm播放进度*/
    ScormProcess: {
      url: `${API}/CourseProcess/ScormProcess`,
      data: {portalId: '', userId: '', courseId: '', position: ''}
    },
    /*班级详情*/
    ClassDetail: {
      url: `${API}/Page/ClassDetail`,
      data: {id: '', titleNav: '培训班详情', page: 1, rows: 9, sort: 'Id', order: 'desc'}
    },
    /*个人学习信息*/
    ClassInformation: {
      url: `${API}/Page/ClassInformation`,
      data: {id: '', titleNav: '个人学习信息'}
    },
    /*教学计划*/
    ClassPlan: {
      url: `${API}/Page/ClassPlan`,
      data: {id: '', titleNav: '教学计划'}
    },
    /*同学名录*/
    ClassStudent: {
      url: `${API}/Page/ClassStudent`,
      data: {id: '', page: 1, rows: 12, sort: 'Id', order: 'desc', titleNav: '同学名录'}
    },
    /*班级论文*/
    ClassPaperList: {
      url: `${API}/Page/ClassPaperList`,
      data: {id: '', page: 1, rows: 12, sort: 'Id', order: 'desc', titleNav: '班级论文', wordLimt: 30}
    },
    /*班级话题*/
    ClassTopicList: {
      url: `${API}/Page/ClassTopicList`,
      data: {id: '', page: 1, rows: 12, sort: 'Id', order: 'desc', titleNav: '班级话题', wordLimt: 30}
    },
    /*班级公告*/
    ClassNoticeList: {
      url: `${API}/Page/ClassNoticeList`,
      data: {id: '', page: 1, rows: 12, sort: 'Id', order: 'desc', titleNav: '班级公告', wordLimt: 30}
    },
    /*班级课程*/
    ClassCourse: {
      url: `${API}/Page/ClassCourse`,
      data: {id: '', page: 1, rows: 12, sort: 'Id', order: 'desc', titleNav: '班级课程', wordLimt: 30}
    },
    /*班级考试*/
    ClassExam: {
      url: `${API}/Page/ClassExam`,
      data: {id: '', page: 1, rows: 12, sort: 'Id', order: 'desc', titleNav: '班级考试', wordLimt: 30}
    },
    /*班级相册*/
    PhotoAlbumList: {
      url: `${API}/Page/PhotoAlbumList`,
      data: {id: '', page: 1, rows: 9, sort: 'Id', order: 'desc', titleNav: '班级相册'}
    },
    /*班级相册 照片*/
    PhotoPreview: {
      url: `${API}/Page/PhotoPreview`,
      data: {albumId: "", trainingId: "", page: 1, rows: 9, sort: 'Id', order: 'desc', titleNav: '班级照片'}
    },
    /*添加话题*/
    ClassTopicAdd: {
      url: `${API}/Page/ClassTopicAdd`,
      data: {id: "", page: 1, rows: 9, sort: 'Id', order: 'desc', titleNav: '添加话题'}
    },
    /*发布文章 话题 type: topic paper*/
    ClassPublishArticle: {
      url: `${API}/Page/ClassPublishArticle`,
      data: {type: '', trainingId: "", name: "", categoryId: "", content: ""}
    },
    /*培训班--获取分类 type: topic paper*/
    GetTrainingArticleCategory: {
      url: `${API}/Page/GetTrainingArticleCategory`,
      data: {type: '', trainingId: ""}
    },
    /*添加论文*/
    ClassPaperAdd: {
      url: `${API}/Page/ClassPaperAdd`,
      data: {id: "", page: 1, rows: 9, sort: 'Id', order: 'desc', titleNav: '添加论文'}
    },
  }
}
