
## lighteam ##

## 我的 页面 ##
### 1.1、 登录 ###

	  url: 'https://{domain}/lighteam/login',
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

## 首页 ##

### 轮播图 ###

	图一: 'https://{domain}/lighteam/roll1.jpeg'
	图二: 'https://{domain}/lighteam/roll2.jpeg'
	图三: 'https://{domain}/lighteam/roll3.jpeg'
	图四: 'https://{domain}/lighteam/roll4.jpeg'
	图五: 'https://{domain}/lighteam/roll4.jpeg'	

### 分类展示【需求文档第8处】 ### 
	
	  url: 'https://{domain}/lighteam/classes',
	  method: "GET",
	  header: {
	  	"Content-Type": "application/x-www-form-urlencoded"
	  },
	
	请求参数：
		无
	返回值：（对象数组）
		- Id  		分类id
		- Name 		分类名字
		- Reference 分类说明
		- Pic       图片名称
	
	根据https//{domain}/lightema/pic/{Pic} 拼接得到图片url地址；循环出来展示即可；

### 热门视频 ###
