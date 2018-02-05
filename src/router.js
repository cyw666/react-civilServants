import React from 'react';
import { Router } from 'dva/router';
import dynamic from 'dva/dynamic';
import { renderRoutes } from 'react-router-config'
import Main from './routes/Main';
import App from './routes/App';
import PendingNavDataLoader from './utils/PendingNavDataLoader'

const RouterConfig = ({ history, app }) => {
  const Error = dynamic({
    app,
    component: () => import('./routes/error/'),
  });
  const dynamicFunc = function ({ models, component }) {
    return (
      dynamic({ app, models, component })
    )
  }
  const routes = [
    {
      component: Main,
      routes: [
        {
          path: '/',
          exact: true,
          component: App,
          routes: [
            {
              component: dynamicFunc({
                models: () => [ import('./models/indexPage') ],
                component: () => import('./routes/IndexPage/'),
              })
            }
          ]
        },
        {
          path: '/main/:child',
          component: App,
          routes: [
            {
              path: '/main/login',
              exact: true,
              component: dynamicFunc({
                models: () => [ import('./models/login') ],
                component: () => import('./routes/login/'),
              })
            },
            {
              path: '/main/noticeList',
              exact: true,
              component: dynamicFunc({
                models: () => [ import('./models/noticeList') ],
                component: () => import('./routes/noticeList/'),
              })
            },
            {
              path: '/main/noticeDetail',
              exact: false,
              component: dynamicFunc({
                models: () => [ import('./models/noticeDetail') ],
                component: () => import('./routes/noticeDetail/'),
              })
            },
            {
              path: '/main/trainingClass',
              exact: true,
              component: dynamicFunc({
                models: () => [ import('./models/trainingClass') ],
                component: () => import('./routes/trainingClass/'),
              })
            },
            {
              path: '/main/courseCenter',
              exact: false,
              component: dynamicFunc({
                models: () => [ import('./models/courseCenter') ],
                component: () => import('./routes/courseCenter/'),
              })
            },
            {
              path: '/main/personalCenter',
              exact: true,
              component: dynamicFunc({
                models: () => [ import('./models/personalCenter') ],
                component: () => import('./routes/personalCenter/'),
              })
            },
            {
              path: '/main/testCenter',
              exact: true,
              component: dynamicFunc({
                models: () => [ import('./models/testCenter') ],
                component: () => import('./routes/testCenter/'),
              })
            },
            {
              path: '/main/article',
              exact: true,
              component: dynamicFunc({
                models: () => [ import('./models/article') ],
                component: () => import('./routes/article/'),
              })
            },
            {
              path: '/main/articleDetail',
              exact: false,
              component: dynamicFunc({
                models: () => [ import('./models/articleDetail') ],
                component: () => import('./routes/articleDetail/'),
              })
            },
            {
              path: '/main/courseDetail',
              exact: false,
              component: dynamicFunc({
                models: () => [ import('./models/courseDetail') ],
                component: () => import('./routes/courseDetail/'),
              })
            },
            {
              path: '/main/register',
              exact: true,
              component: dynamicFunc({
                models: () => [ import('./models/register') ],
                component: () => import('./routes/register/'),
              })
            },
            {
              path: '/main/modifyPassword',
              exact: true,
              component: dynamicFunc({
                models: () => [ import('./models/modifyPassword') ],
                component: () => import('./routes/modifyPassword/'),
              })
            },
            {
              path: '/main/securitySetting',
              exact: true,
              component: dynamicFunc({
                models: () => [ import('./models/securitySetting') ],
                component: () => import('./routes/securitySetting/'),
              })
            },
            {
              path: '/main/changeInfor',
              exact: true,
              component: dynamicFunc({
                models: () => [ import('./models/changeInfor') ],
                component: () => import('./routes/changeInfor/'),
              })
            },
            {
              path: '/main/personalFile',
              exact: true,
              component: dynamicFunc({
                models: () => [ import('./models/personalFile') ],
                component: () => import('./routes/personalFile/'),
              })
            },
            {
              path: '/main/personalNotice',
              exact: true,
              component: dynamicFunc({
                models: () => [ import('./models/personalNotice') ],
                component: () => import('./routes/personalNotice/'),
              })
            },
            {
              path: '/main/classList',
              exact: true,
              component: dynamicFunc({
                models: () => [ import('./models/classList') ],
                component: () => import('./routes/classList/'),
              })
            },
            {
              path: '/main/grade/:children',
              exact: false,
              component: dynamicFunc({
                models: () => [ import('./models/grade') ],
                component: () => import('./routes/grade/'),
              }),
              routes: [
                {
                  path: '/main/grade/classDetail',
                  exact: false,
                  component: dynamicFunc({
                    models: () => [ import('./models/classDetail') ],
                    component: () => import('./routes/classDetail/'),
                  }),
                },
                {
                  path: '/main/grade/classPlan',
                  exact: false,
                  component: dynamicFunc({
                    models: () => [ import('./models/classPlan') ],
                    component: () => import('./routes/classPlan/'),
                  }),
                },
                {
                  path: '/main/grade/classStudent',
                  exact: false,
                  component: dynamicFunc({
                    models: () => [ import('./models/classStudent') ],
                    component: () => import('./routes/classStudent/'),
                  }),
                },
                {
                  path: '/main/grade/classPaperList',
                  exact: false,
                  component: dynamicFunc({
                    models: () => [ import('./models/classPaperList') ],
                    component: () => import('./routes/classPaperList/'),
                  }),
                },
                {
                  path: '/main/grade/classTopicList',
                  exact: false,
                  component: dynamicFunc({
                    models: () => [ import('./models/classTopicList') ],
                    component: () => import('./routes/classTopicList/'),
                  }),
                },
                {
                  path: '/main/grade/classNotice',
                  exact: false,
                  component: dynamicFunc({
                    models: () => [ import('./models/classNotice') ],
                    component: () => import('./routes/classNotice/'),
                  }),
                },
                {
                  path: '/main/grade/classCourse',
                  exact: false,
                  component: dynamicFunc({
                    models: () => [ import('./models/classCourse') ],
                    component: () => import('./routes/classCourse/'),
                  }),
                },
                {
                  path: '/main/grade/classExam',
                  exact: false,
                  component: dynamicFunc({
                    models: () => [ import('./models/classExam') ],
                    component: () => import('./routes/classExam/'),
                  }),
                },
                {
                  path: '/main/grade/photoAlbumList',
                  exact: false,
                  component: dynamicFunc({
                    models: () => [ import('./models/photoAlbumList') ],
                    component: () => import('./routes/photoAlbumList/'),
                  }),
                },
                {
                  path: '/main/grade/photoPreview',
                  exact: false,
                  component: dynamicFunc({
                    models: () => [ import('./models/photoPreview') ],
                    component: () => import('./routes/photoPreview/'),
                  }),
                },
              ]
            },
            {
              path: '/main/searchGloable',
              exact: false,
              component: dynamicFunc({
                models: () => [ import('./models/searchGloable') ],
                component: () => import('./routes/searchGloable/'),
              })
            },
            {
              path: '/main/classTopicAdd',
              exact: false,
              component: dynamicFunc({
                models: () => [ import('./models/classTopicAdd') ],
                component: () => import('./routes/classTopicAdd/'),
              })
            },
            {
              path: '/main/classPaperAdd',
              exact: false,
              component: dynamicFunc({
                models: () => [ import('./models/classPaperAdd') ],
                component: () => import('./routes/classPaperAdd/'),
              })
            },
            {
              path: '/main/photoAlbumAdd',
              exact: false,
              component: dynamicFunc({
                models: () => [ import('./models/photoAlbumAdd') ],
                component: () => import('./routes/photoAlbumAdd/'),
              })
            },
            {
              path: '/main/collegeinfo',
              exact: false,
              component: dynamicFunc({
                models: () => [ import('./models/collegeinfo') ],
                component: () => import('./routes/collegeinfo/'),
              })
            },
            {
              path: '/main/exam',
              exact: false,
              component: dynamicFunc({
                models: () => [ import('./models/exam') ],
                component: () => import('./routes/exam/'),
              })
            },
            {
              path: '/main/examReview',
              exact: false,
              component: dynamicFunc({
                models: () => [ import('./models/examReview') ],
                component: () => import('./routes/examReview/'),
              })
            },
            {
              path: '/main/pollList',
              exact: false,
              component: dynamicFunc({
                models: () => [ import('./models/pollList') ],
                component: () => import('./routes/pollList/'),
              })
            },
            {
              path: '/main/originalarticlelist',
              exact: true,
              component: dynamicFunc({
                models: () => [ import('./models/originalarticlelist') ],
                component: () => import('./routes/originalarticlelist/'),
              })
            },
            {
              path: '/main/addOriginalArticle',
              exact: true,
              component: dynamicFunc({
                models: () => [ import('./models/addOriginalArticle') ],
                component: () => import('./routes/addOriginalArticle/'),
              })
            },
            {
              path: '/main/messageList',
              exact: true,
              component: dynamicFunc({
                models: () => [ import('./models/messageList') ],
                component: () => import('./routes/messageList/'),
              })
            },
          ]
        },
        {
          path: '/play',
          exact: false,
          component: dynamicFunc({
            models: () => [ import('./models/play') ],
            component: () => import('./routes/play/'),
          })
        },
        {
          component: Error
        },
      ]
    }
  ]
  return (
    <Router history={ history }>
      <PendingNavDataLoader routes={ routes }>
        { renderRoutes(routes) }
      </PendingNavDataLoader>
    </Router>
  );
}
export default RouterConfig;
