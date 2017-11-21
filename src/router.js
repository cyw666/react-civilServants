import React from 'react';
import {Router, Route} from 'dva/router';
import {message} from 'antd'
import App from './routes/App';
import Main from './routes/Main';
import {authorization, keepOnline} from './services/main';
/*注册model*/
const registerModel = (app, model) => {
  if (!(app._models.filter(m => m.namespace === model.namespace).length === 1)) {
    app.model(model)
  }
}
/*设置title*/
const setTitle = (title, cb) => {
  document.title = title;
  cb();
}
/*判断用户是否在线*/
const goToLogin = (from, replace) => {
  replace(`/main/login?from=${from}`);
  window.location.reload();
}
const isOnLine = (nextState, replace, cb) => {
  let pathName = nextState.location.pathname;
  let from = pathName + nextState.location.search;
  if (pathName === "/" || pathName === "/main" || pathName === "/main/indexPage" || pathName === "/main/register" || pathName === "/main/login" || pathName === "/main/forgetPassword") {
    cb();
  } else {
    authorization().then((data) => {
      if (!data.isauth) {
        if (data.Type == 3) {
          message.warn("在其他设备上已经登录");
          goToLogin(from, replace);
        }
        else if (data.Type == 9) {
          message.warn("在其他平台登录或被其他人登录");
          goToLogin(from, replace);
        }
        else if (data.Type == 10) {
          message.warn("您还不是本平台会员，将前往您所在的平台" + ":" + data.Message);
          window.location = "http://" + data.Message;
        }
        else if (data.Type == 11) {
          message.warn("过期了");
          goToLogin(from, replace);
        }
        else if (data.Type == 13) {
          message.warn(data.Message);
          goToLogin(from, replace);
        }
        else if (data.Type == 15) {
          message.warn(data.Type + ":" + data.Message);
        }
        else {
          message.warn('请登录！');
          goToLogin(from, replace);
        }
        
      }
      cb();
    }).catch(error => {
      message.warn("服务器出错！请等待！");
      replace('indexPage');
      window.location.reload();
      cb(error);
    });
  }
  cb();
  
}

function RouterConfig({history, app}) {
  const routes = [
    {
      path: '/',
      component: Main,
      indexRoute: {onEnter: (nextState, replace) => replace('/main')},
      onChange(prevState, nextState, replace, cb) {
        isOnLine(nextState, replace, cb);
      },
      onEnter(nextState, replace, cb) {
        //保持在线
        setInterval(function () {
          keepOnline().then((data) => {
            cb();
          }).catch(error => {
            cb(error);
          });
        }, 60000);
        isOnLine(nextState, replace, cb);
      },
      childRoutes: [
        {
          path: '/main',
          component: App,
          getIndexRoute(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/indexPage'))
              cb(null, {component: require('./routes/IndexPage/IndexPage')})
            })
          },
          childRoutes: [
            {
              path: 'indexPage',
              getComponent(nextState, cb) {
                require.ensure([], (require) => {
                  registerModel(app, require('./models/indexPage'))
                  cb(null, require('./routes/IndexPage/IndexPage'))
                })
              },
              onEnter(nextState, replace, cb) {
                setTitle("干部教育网络学院-基准3.0", cb);
              },
            },
            {
              path: 'noticeList',
              getComponent(nextState, cb) {
                require.ensure([], (require) => {
                  registerModel(app, require('./models/noticeList'))
                  cb(null, require('./routes/noticeList/noticeList'))
                })
              },
              onEnter(nextState, replace, cb) {
                setTitle("通知公告", cb);
              },
            },
            {
              path: 'noticeDetail(/:id)',
              getComponent(nextState, cb) {
                require.ensure([], (require) => {
                  registerModel(app, require('./models/noticeDetail'))
                  cb(null, require('./routes/noticeDetail/noticeDetail'))
                })
              },
              onEnter(nextState, replace, cb) {
                setTitle("通知内容", cb);
              },
            },
            {
              path: 'trainingClass',
              getComponent(nextState, cb) {
                require.ensure([], (require) => {
                  registerModel(app, require('./models/trainingClass'))
                  cb(null, require('./routes/trainingClass/trainingClass'))
                })
              },
              onEnter(nextState, replace, cb) {
                setTitle("班级园地", cb);
              },
            },
            {
              path: 'courseCenter',
              getComponent(nextState, cb) {
                require.ensure([], (require) => {
                  registerModel(app, require('./models/courseCenter'))
                  cb(null, require('./routes/courseCenter/courseCenter'))
                })
              },
              onEnter(nextState, replace, cb) {
                setTitle("课程中心", cb);
              },
            },
            {
              path: 'personalCenter',
              getComponent(nextState, cb) {
                require.ensure([], (require) => {
                  registerModel(app, require('./models/personalCenter'))
                  cb(null, require('./routes/personalCenter/personalCenter'))
                })
              },
              onEnter(nextState, replace, cb) {
                setTitle("个人中心", cb);
              }
            },
            {
              path: 'testCenter',
              getComponent(nextState, cb) {
                require.ensure([], (require) => {
                  registerModel(app, require('./models/testCenter'))
                  cb(null, require('./routes/testCenter/testCenter'))
                })
              },
              onEnter(nextState, replace, cb) {
                setTitle("在线考试", cb);
              }
            },
            {
              path: 'article',
              getComponent(nextState, cb) {
                require.ensure([], (require) => {
                  registerModel(app, require('./models/article'))
                  cb(null, require('./routes/article/article'))
                })
              },
              onEnter(nextState, replace, cb) {
                setTitle("文章", cb);
              }
            },
            {
              path: 'articleDetail(/:id)',
              getComponent(nextState, cb) {
                require.ensure([], (require) => {
                  registerModel(app, require('./models/articleDetail'))
                  cb(null, require('./routes/articleDetail/articleDetail'))
                })
              },
              onEnter(nextState, replace, cb) {
                setTitle("文章详情", cb);
              },
            },
            {
              path: 'courseDetail',
              getComponent(nextState, cb) {
                require.ensure([], (require) => {
                  registerModel(app, require('./models/courseDetail'))
                  cb(null, require('./routes/courseDetail/courseDetail'))
                })
              },
              onEnter(nextState, replace, cb) {
                setTitle("课程详情", cb);
              },
            },
            {
              path: 'play',
              getComponent(nextState, cb) {
                require.ensure([], (require) => {
                  registerModel(app, require('./models/play'))
                  cb(null, require('./routes/play/play'))
                })
              },
              onEnter(nextState, replace, cb) {
                setTitle("课程播放", cb);
              },
            },
            {
              path: 'register',
              getComponent(nextState, cb) {
                require.ensure([], (require) => {
                  registerModel(app, require('./models/register'))
                  cb(null, require('./routes/register/register'))
                })
              },
              onEnter(nextState, replace, cb) {
                setTitle("注册", cb);
              },
            },
            {
              path: 'login',
              getComponent(nextState, cb) {
                require.ensure([], (require) => {
                  registerModel(app, require('./models/login'))
                  cb(null, require('./routes/login/login'))
                })
              },
              onEnter(nextState, replace, cb) {
                setTitle("登陆", cb);
              },
            },
            {
              path: 'modifyPassword',
              getComponent(nextState, cb) {
                require.ensure([], (require) => {
                  registerModel(app, require('./models/modifyPassword'))
                  cb(null, require('./routes/modifyPassword/modifyPassword'))
                })
              },
              onEnter(nextState, replace, cb) {
                setTitle("修改密码", cb);
              },
            },
            {
              path: 'securitySetting',
              getComponent(nextState, cb) {
                require.ensure([], (require) => {
                  registerModel(app, require('./models/securitySetting'))
                  cb(null, require('./routes/securitySetting/securitySetting'))
                })
              },
              onEnter(nextState, replace, cb) {
                setTitle("设置密保", cb);
              },
            },
            {
              path: 'changeInfor',
              getComponent(nextState, cb) {
                require.ensure([], (require) => {
                  registerModel(app, require('./models/changeInfor'))
                  cb(null, require('./routes/changeInfor/changeInfor'))
                })
              },
              onEnter(nextState, replace, cb) {
                setTitle("修改信息", cb);
              },
            },
            {
              path: 'personalFile',
              getComponent(nextState, cb) {
                require.ensure([], (require) => {
                  registerModel(app, require('./models/personalFile'))
                  cb(null, require('./routes/personalFile/personalFile'))
                })
              },
              onEnter(nextState, replace, cb) {
                setTitle("个人学习档案", cb);
              },
            },
            {
              path: 'personalNotice',
              getComponent(nextState, cb) {
                require.ensure([], (require) => {
                  registerModel(app, require('./models/personalNotice'))
                  cb(null, require('./routes/personalNotice/personalNotice'))
                })
              },
              onEnter(nextState, replace, cb) {
                setTitle("个人通知", cb);
              },
            },
            {
              path: 'classList',
              getComponent(nextState, cb) {
                require.ensure([], (require) => {
                  registerModel(app, require('./models/classList'))
                  cb(null, require('./routes/classList/classList'))
                })
              },
              onEnter(nextState, replace, cb) {
                setTitle("班级列表", cb);
              },
            },
            {
              path: 'grade',
              // component: grade,
              getComponent(nextState, cb) {
                require.ensure([], (require) => {
                  registerModel(app, require('./models/grade'))
                  cb(null, require('./routes/grade/grade'))
                })
              },
              getIndexRoute(nextState, cb) {
                require.ensure([], (require) => {
                  registerModel(app, require('./models/classDetail'))
                  cb(null, require('./routes/classDetail/classDetail'))
                })
              },
              childRoutes: [
                {
                  path: 'classDetail',
                  getComponent(nextState, cb) {
                    require.ensure([], (require) => {
                      registerModel(app, require('./models/classDetail'))
                      cb(null, require('./routes/classDetail/classDetail'))
                    })
                  },
                  onEnter(nextState, replace, cb) {
                    setTitle("课程详情", cb);
                  },
                },
                {
                  path: 'classPlan',
                  getComponent(nextState, cb) {
                    require.ensure([], (require) => {
                      registerModel(app, require('./models/classPlan'))
                      cb(null, require('./routes/classPlan/classPlan'))
                    })
                  },
                  onEnter(nextState, replace, cb) {
                    setTitle("教学计划", cb);
                  },
                },
                {
                  path: 'classStudent',
                  getComponent(nextState, cb) {
                    require.ensure([], (require) => {
                      registerModel(app, require('./models/classStudent'))
                      cb(null, require('./routes/classStudent/classStudent'))
                    })
                  },
                  onEnter(nextState, replace, cb) {
                    setTitle("同学名录", cb);
                  },
                },
                {
                  path: 'classPaperList',
                  getComponent(nextState, cb) {
                    require.ensure([], (require) => {
                      registerModel(app, require('./models/classPaperList'))
                      cb(null, require('./routes/classPaperList/classPaperList'))
                    })
                  },
                  onEnter(nextState, replace, cb) {
                    setTitle("班级论文", cb);
                  },
                },
                {
                  path: 'classTopicList',
                  getComponent(nextState, cb) {
                    require.ensure([], (require) => {
                      registerModel(app, require('./models/classTopicList'))
                      cb(null, require('./routes/classTopicList/classTopicList'))
                    })
                  },
                  onEnter(nextState, replace, cb) {
                    setTitle("班级话题", cb);
                  },
                },
                {
                  path: 'classNotice',
                  getComponent(nextState, cb) {
                    require.ensure([], (require) => {
                      registerModel(app, require('./models/classNotice'))
                      cb(null, require('./routes/classNotice/classNotice'))
                    })
                  },
                  onEnter(nextState, replace, cb) {
                    setTitle("班级公告", cb);
                  },
                },
                {
                  path: 'classCourse',
                  getComponent(nextState, cb) {
                    require.ensure([], (require) => {
                      registerModel(app, require('./models/classCourse'))
                      cb(null, require('./routes/classCourse/classCourse'))
                    })
                  },
                  onEnter(nextState, replace, cb) {
                    setTitle("班级课程", cb);
                  },
                },
                {
                  path: 'classExam',
                  getComponent(nextState, cb) {
                    require.ensure([], (require) => {
                      registerModel(app, require('./models/classExam'))
                      cb(null, require('./routes/classExam/classExam'))
                    })
                  },
                  onEnter(nextState, replace, cb) {
                    setTitle("班级考试", cb);
                  },
                },
                {
                  path: 'photoAlbumList',
                  getComponent(nextState, cb) {
                    require.ensure([], (require) => {
                      registerModel(app, require('./models/photoAlbumList'))
                      cb(null, require('./routes/photoAlbumList/photoAlbumList'))
                    })
                  },
                  onEnter(nextState, replace, cb) {
                    setTitle("班级相册", cb);
                  },
                },
                {
                  path: 'photoPreview',
                  getComponent(nextState, cb) {
                    require.ensure([], (require) => {
                      registerModel(app, require('./models/photoPreview'))
                      cb(null, require('./routes/photoPreview/photoPreview'))
                    })
                  },
                  onEnter(nextState, replace, cb) {
                    setTitle("班级照片", cb);
                  },
                },
              ]
            },
            {
              path: 'searchGloable',
              getComponent(nextState, cb) {
                require.ensure([], (require) => {
                  registerModel(app, require('./models/searchGloable'))
                  cb(null, require('./routes/searchGloable/searchGloable'))
                })
              },
              onEnter(nextState, replace, cb) {
                setTitle("搜索结果", cb);
              },
            },
            {
              path: 'classTopicAdd',
              getComponent(nextState, cb) {
                require.ensure([], (require) => {
                  registerModel(app, require('./models/classTopicAdd'))
                  cb(null, require('./routes/classTopicAdd/classTopicAdd'))
                })
              },
              onEnter(nextState, replace, cb) {
                setTitle("添加话题", cb);
              },
            },
            {
              path: 'classPaperAdd',
              getComponent(nextState, cb) {
                require.ensure([], (require) => {
                  registerModel(app, require('./models/classPaperAdd'))
                  cb(null, require('./routes/classPaperAdd/classPaperAdd'))
                })
              },
              onEnter(nextState, replace, cb) {
                setTitle("添加论文", cb);
              },
            },
            {
              path: 'photoAlbumAdd',
              getComponent(nextState, cb) {
                require.ensure([], (require) => {
                  registerModel(app, require('./models/photoAlbumAdd'))
                  cb(null, require('./routes/photoAlbumAdd/photoAlbumAdd'))
                })
              },
              onEnter(nextState, replace, cb) {
                setTitle("添加相册", cb);
              },
            },
            {
              path: 'collegeinfo',
              getComponent(nextState, cb) {
                require.ensure([], (require) => {
                  registerModel(app, require('./models/collegeinfo'))
                  cb(null, require('./routes/collegeinfo/collegeinfo'))
                })
              },
              onEnter(nextState, replace, cb) {
                setTitle("平台介绍", cb);
              },
            },
            {
              path: 'exam',
              getComponent(nextState, cb) {
                require.ensure([], (require) => {
                  registerModel(app, require('./models/exam'))
                  cb(null, require('./routes/exam/exam'))
                })
              },
              onEnter(nextState, replace, cb) {
                setTitle("考试测评", cb);
              },
            },
            {
              path: 'examReview',
              getComponent(nextState, cb) {
                require.ensure([], (require) => {
                  registerModel(app, require('./models/examReview'))
                  cb(null, require('./routes/examReview/examReview'))
                })
              },
              onEnter(nextState, replace, cb) {
                setTitle("考试详情", cb);
              },
            },
            {
              path: 'pollList',
              getComponent(nextState, cb) {
                require.ensure([], (require) => {
                  registerModel(app, require('./models/pollList'))
                  cb(null, require('./routes/pollList/pollList'))
                })
              },
              onEnter(nextState, replace, cb) {
                setTitle("问卷调查", cb);
              },
            },
            {
              path: 'originalarticlelist',
              getComponent(nextState, cb) {
                require.ensure([], (require) => {
                  registerModel(app, require('./models/originalarticlelist'))
                  cb(null, require('./routes/originalarticlelist/originalarticlelist'))
                })
              },
              onEnter(nextState, replace, cb) {
                setTitle("学员心声列表", cb);
              },
            },
            {
              path: 'addOriginalArticle',
              getComponent(nextState, cb) {
                require.ensure([], (require) => {
                  registerModel(app, require('./models/addOriginalArticle'))
                  cb(null, require('./routes/addOriginalArticle/addOriginalArticle'))
                })
              },
              onEnter(nextState, replace, cb) {
                setTitle("发表心声", cb);
              },
            },
            {
              path: 'messageList',
              getComponent(nextState, cb) {
                require.ensure([], (require) => {
                  registerModel(app, require('./models/messageList'))
                  cb(null, require('./routes/messageList/messageList'))
                })
              },
              onEnter(nextState, replace, cb) {
                setTitle("留言板", cb);
              },
            },
            {
              path: '*',
              getComponent(nextState, cb) {
                require.ensure([], (require) => {
                  cb(null, require('./routes/error/index'))
                })
              },
            },
          ]
        },
        {
          path: 'play',
          getComponent(nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/play'))
              cb(null, require('./routes/play/play'))
            })
          },
          onEnter(nextState, replace, cb) {
            setTitle("课程播放", cb);
          },
        },
      ],
    }
  ]
  
  return (
    <Router history={history} routes={routes}></Router>
  );
}

export default RouterConfig;
