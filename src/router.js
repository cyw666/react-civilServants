import React from 'react';
import {Router, Route} from 'dva/router';
import App from './routes/App';
import Play from './routes/play/play'
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
const goToLogin = (from,replace)=>{
  replace(`/login?from=${from}`);
  window.location.reload();
}
const isOnLine = (nextState, replace, cb) => {
  let pathName = nextState.location.pathname;
  let from = pathName + nextState.location.search;
  if (pathName === "/" || pathName === "/indexPage" || pathName === "/register" || pathName === "/login" || pathName === "/forgetPassword") {
    cb();
  } else {
    authorization().then((data) => {
      if (!data.isauth) {
        if (data.Type == 3) {
          alert("在其他设备上已经登录");
          goToLogin(from,replace);
        }
        else if (data.Type == 9) {
          alert("在其他平台登录或被其他人登录");
          goToLogin(from,replace);
        }
        else if (data.Type == 10) {
          alert("您还不是本平台会员，将前往您所在的平台" + ":" + data.Message);
          window.location = "http://" + data.Message;
        }
        else if (data.Type == 11) {
          alert("过期了");
          goToLogin(from,replace);
        }
        else if (data.Type == 13) {
          alert(data.Message);
          goToLogin(from,replace);
        }
        else if (data.Type == 15) {
          alert(data.Type + ":" + data.Message);
        }
        else {
          alert('请登录！');
          goToLogin(from,replace);
        }
        
      }
      cb();
    }).catch(error => {
      alert("服务器出错！请等待！");
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
      component: App,
      onChange (prevState, nextState, replace, cb) {
        isOnLine(nextState, replace, cb);
      },
      onEnter (nextState, replace, cb) {
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
      getIndexRoute (nextState, cb) {
        require.ensure([], (require) => {
          registerModel(app, require('./models/indexPage'))
          cb(null, {component: require('./routes/IndexPage/IndexPage')})
        })
      },
      childRoutes: [
        {
          path: 'indexPage',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/indexPage'))
              cb(null, require('./routes/IndexPage/IndexPage'))
            })
          },
          onEnter (nextState, replace, cb) {
            setTitle("干部教育网络学院-基准3.0", cb);
          },
        },
        {
          path: 'noticeList',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/noticeList'))
              cb(null, require('./routes/noticeList/noticeList'))
            })
          },
          onEnter (nextState, replace, cb) {
            setTitle("通知公告", cb);
          },
        },
        {
          path: 'noticeDetail(/:id)',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/noticeDetail'))
              cb(null, require('./routes/noticeDetail/noticeDetail'))
            })
          },
          onEnter (nextState, replace, cb) {
            setTitle("通知内容", cb);
          },
        },
        {
          path: 'trainingClass',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/trainingClass'))
              cb(null, require('./routes/trainingClass/trainingClass'))
            })
          },
          onEnter (nextState, replace, cb) {
            setTitle("班级园地", cb);
          },
        },
        {
          path: 'courseCenter',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/courseCenter'))
              cb(null, require('./routes/courseCenter/courseCenter'))
            })
          },
          onEnter (nextState, replace, cb) {
            setTitle("课程中心", cb);
          },
        },
        {
          path: 'personalCenter',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/personalCenter'))
              cb(null, require('./routes/personalCenter/personalCenter'))
            })
          },
          onEnter (nextState, replace, cb) {
            setTitle("个人中心", cb);
          }
        },
        {
          path: 'testCenter',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/testCenter'))
              cb(null, require('./routes/testCenter/testCenter'))
            })
          },
          onEnter (nextState, replace, cb) {
            setTitle("在线考试", cb);
          }
        },
        {
          path: 'article',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/article'))
              cb(null, require('./routes/article/article'))
            })
          },
          onEnter (nextState, replace, cb) {
            setTitle("文章", cb);
          }
        },
        {
          path: 'articleDetail(/:id)',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/articleDetail'))
              cb(null, require('./routes/articleDetail/articleDetail'))
            })
          },
          onEnter (nextState, replace, cb) {
            setTitle("文章详情", cb);
          },
        },
        {
          path: 'courseDetail',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/courseDetail'))
              cb(null, require('./routes/courseDetail/courseDetail'))
            })
          },
          onEnter (nextState, replace, cb) {
            setTitle("课程详情", cb);
          },
        },
        {
          path: 'play',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/play'))
              cb(null, require('./routes/play/play'))
            })
          },
          onEnter (nextState, replace, cb) {
            setTitle("课程播放", cb);
          },
        },
        {
          path: 'register',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/register'))
              cb(null, require('./routes/register/register'))
            })
          },
          onEnter (nextState, replace, cb) {
            setTitle("注册", cb);
          },
        },
        {
          path: 'login',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/login'))
              cb(null, require('./routes/login/login'))
            })
          },
          onEnter (nextState, replace, cb) {
            setTitle("登陆", cb);
          },
        },
        {
          path: '*',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('./routes/error/index'))
            })
          },
        },
      ]
    },
    {
      path: '/play2',
      component: Play
    }
  ]
  
  return (
    <Router history={history} routes={routes}/>
  );
}
export default RouterConfig;
