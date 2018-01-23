//外网域名:https://www.52mvp.com/ 
//测试域名:https://beta.52mvp.com/

var ip = 'https://beta.52mvp.com/';

export default {
  getSessionIdUrl:ip + 'yue/shrinterface.php?action=wxs_login',
  getNameAndPwd:  ip + 'yue/shrinterface.php?action=wxs_loginsuccess',
  getUserInfoUrl: ip + 'yue/shrinterface.php?action=getuserinfo',
  getBallListUrl: ip + 'yue/shrinterface.php?action=getballround',
  getroundinfo:   ip + 'yue/shrinterface.php?action=getroundinfo',
}