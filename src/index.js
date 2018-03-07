import dva from 'dva';
// import {message} from 'antd'
import createHistory from 'history/createBrowserHistory';
import createLoading from 'dva-loading';
import './themes/index.less'

// 1. Initialize
const app = dva({
  history: createHistory(
    { basename: '/' }
  ),
  onError(error) {
    // console.log(error.message);
  },
});

// 2. Plugins
app.use(createLoading({ effects: true }));

// 3. Model
app.model(require('./models/app').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');