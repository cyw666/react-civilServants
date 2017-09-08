/**
 * Created by admin on 2017/8/4.
 */
const API = 'http://test10.jy365.net/api';
module.exports = {
  api: {
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
      data: {page: 1, rows: 7, sort: 'Sort', order: 'desc', wordLimt: 20, categoryCode: '', categoryId: ''}
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
      url: `${API}/Pc/UpdateTrainingStudentup`,
      data: {id: ''}
    },
    /*取消报名培训班*/
    UpdateTrainingStudentdown: {
      url: `${API}/Pc/UpdateTrainingStudentdown`,
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
  }
}
