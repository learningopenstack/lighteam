
## lighteam ##

### 1.1、 登录 ###

	  url: 'https://cephcp.ztgame.com.cn/lighteam/login',
	  method: "POST",
	  data: rt,
	  header: {
	  	"Content-Type": "application/x-www-form-urlencoded"
	  },
	
	  请求参数：
		- code      js登录返回的code
		- imgurl    用户头像url
		- nickname  用户昵称
	
	  返回值：
		- Userid  用户id
		- Key	  用户key，每次登录获取的key不一样，key有效期3600s
		- Role    用户角色； 仅有0和非0值，0表示该用户为管理员，非0为普通用户；该参数现在仅保留，以后使用
		- Words   用户的说说；
		- Notice  该用户是否存在通知； 仅有0和1值，0表示没有通知，1表示有通知；有通知需要在该行显示一个红点用来提醒用户

	注意： 之后涉及到用户身份的请求都需要带上userid和key