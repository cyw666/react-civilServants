import dva from 'dva';
import {message} from 'antd'
import {browserHistory} from 'dva/router';
import createLoading from 'dva-loading';
// 1. Initialize
const app = dva({
  history: browserHistory,
  onError (error) {
    message.error(error.message);
  },
});

// 2. Plugins
app.use(createLoading({effects: true}));

// 3. Model
app.model(require('./models/app'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
