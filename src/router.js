import React from 'react';
import {Router, Route} from 'dva/router';
import App from './routes/App';
import {authorization} from './services/main';

const registerModel = (app, model) => {
  if (!(app._models.filter(m => m.namespace === model.namespace).length === 1)) {
    app.model(model)
  }
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
      getIndexRoute (nextState, cb) {
        require.ensure([], (require) => {
          registerModel(app, require('./models/indexPage'))
          cb(null, {component: require('./routes/IndexPage/IndexPage')})
        }, 'indexPage')
      },
      childRoutes: [
        {
          path: 'indexPage',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/indexPage'))
              cb(null, require('./routes/IndexPage/IndexPage'))
            }, 'indexPage')
          },
        },
        {
          path: 'noticeList',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/noticeList'))
              cb(null, require('./routes/noticeList/noticeList'))
            }, 'noticeList')
          },
        },
        {
          path: 'noticeDetail(/:id)',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/noticeDetail'))
              cb(null, require('./routes/noticeDetail/noticeDetail'))
            }, 'noticeDetail')
          },
        },
        {
          path: 'Products(/:search)',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              registerModel(app, require('./models/products'))
              cb(null, require('./routes/Products/Products'))
            }, 'Products')
          },
        },
        {
          path: '*',
          getComponent (nextState, cb) {
            require.ensure([], (require) => {
              cb(null, require('./routes/error/index'))
            }, 'error')
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
