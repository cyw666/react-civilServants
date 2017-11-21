import dva from 'dva';
import {message} from 'antd'
import {browserHistory} from 'dva/router';
import createLoading from 'dva-loading';
// 1. Initialize
const app = dva({
  history: browserHistory,
  onError(error) {
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

String.prototype.rsaEnscrypt = function (publicKey) {
  if (!publicKey) {
    publicKey = "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCa4KHNwDX44gGmmIAtRu4gjVYtGWZzcm4t+1wjUD4dn7fMLPvuK7ai4UrfDeEJE1RPwudJw+lJ6crql8wSIg7/DbTlG3ihsCT6dT9H5B9OoeR7K9VWUesaW/iyVL6HXiYOANabW14pvJATDmdq91Tfgp6PSQyvdfiRdV4r07crpQIDAQAB";
  }
  var rsaProvider = new JSEncrypt();
  rsaProvider.setPublicKey(publicKey);
  var strEncrypt = rsaProvider.encrypt(this.replace(/\+/g, '%2B'));
  return strEncrypt;
};