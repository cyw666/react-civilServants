import React from 'react';
import {Router, Route} from 'dva/router';
import App from './routes/App';
import {authorization,keepOnline} from './services/main';
/*注册model*/
const registerModel = (app, model) => {
  if (!(app._models.filter(m => m.namespace === model.namespace).length === 1)) {
    app.model(model)
  }
}
/*设置title*/
const setTitle = (title,cb) => {
  document.title=title;
  cb();
}
function RouterConfig({history, app}) {
  const routes = [
    {
      path: '/',
      component: App,
      onChange (prevState,nextState, replace, cb) {
        if(nextState.location.pathname==="/indexPage"){
          cb();
        }else {
          authorization().then((data)=>{
            if(!data.isauth) {
              if (data.Type == 3) {
                alert("在其他设备上已经登录");
                replace('/indexPage');
              }
              else if (data.Type == 9) {
                alert("在其他平台登录或被其他人登录");
                replace('/indexPage');
              }
              else if (data.Type == 10) {
                alert("您还不是本平台会员，将前往您所在的平台" + ":" + data.Message);
                window.location = "http://" + data.Message;
              }
              else if (data.Type == 11) {
                alert("过期了");
                replace('/indexPage');
              }
              else if (data.Type == 13) {
                event.preventDefault();
                replace('/indexPage');
              }
              else if (data.Type == 15) {
                alert(data.Type + ":" + data.Message);
              }
              else {
                alert('请登录！');
                replace('/indexPage');
              }
    
            }
            cb();
          }).catch(error => {
            cb(error);
          });
        }
      },
      onEnter (nextState, replace, cb) {
        //保持在线
        setInterval(function () {
          keepOnline().then((data)=>{
            cb();
          }).catch(error => {
            cb(error);
          });
        }, 60000);
        cb();
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
            setTitle("干部教育网络学院-基准3.0",cb);
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
            setTitle("通知公告",cb);
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
            setTitle("通知内容",cb);
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
            setTitle("班级园地",cb);
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
            setTitle("课程中心",cb);
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
            setTitle("个人中心",cb);
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
            setTitle("在线考试",cb);
          }
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
  ]
  
  return (
    <Router history={history} routes={routes}/>
  );
}
export default RouterConfig;
