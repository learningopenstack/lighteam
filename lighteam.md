
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

### 1.2、系统通知 用户点击action ###

根据用户登录返回的Notice字段来判断是否有通知，跳转到通知页面；没有则直接显示“没有系统通知”，有通知则进行如下请求获取通知内容；

	  url: 'https://{domain}/lighteam/notice',
	  method: "POST",
	  data: {如下 请求参数说明}
	  header: {
	  	"Content-Type": "application/x-www-form-urlencoded"
	  },
	
	  请求参数：
		- userid    用户id
		- key       用户key
	
	  返回值：
		- notice   通知内容

### 1.3、金币 用户点击action ###

	  url: 'https://{domain}/lighteam/coin',
	  method: "POST",
	  data: {如下 请求参数说明}
	  header: {
	  	"Content-Type": "application/x-www-form-urlencoded"
	  },
	
	  请求参数：
		- userid    用户id
		- key       用户key
	
	  返回值：
		- coin  通知内容

### 1.4、历史记录 用户点击action ###

	  url: 'https://{domain}/lighteam/histroy',
	  method: "POST",
	  data: {如下 请求参数说明}
	  header: {
	  	"Content-Type": "application/x-www-form-urlencoded"
	  },
	
	  请求参数：
		- userid    用户id
		- key       用户key
	
	返回值：（对象数组）
	    - Id     视频id
	    - Userid 上传该视频的用户id【id为0则为管理员上传】
	    - Topicid 该视频所属主题id 【该Topicid应该等于传入的主题id值】
	    - Topid   该视频所属分类id 【分类为一级，主题为二级，分类包含主题】
	    - Title  视频标题
	    - Name   视频名称
	    - Pic    视频首页图片名称
	    - Zan    视频“赞”个数
	    - View   视频观看次数
	    - Create 视频创建时间

	根据https//{domain}/lightema/pic/{Pic} 拼接得到图片url地址；循环出来展示即可；
	此处样式同需求文档中“社区”页面

### 1.5 我的作品 用户点击action（即用户上传的视频） ###
	  
      url: 'https://{domain}/lighteam/myvideo',
	  method: "POST",
	  data: {如下 请求参数说明}
	  header: {
	  	"Content-Type": "application/x-www-form-urlencoded"
	  },
	
	  请求参数：
		- userid    用户id
		- key       用户key
	
	返回值：（对象数组）
	    - Id     视频id
	    - Userid 上传该视频的用户id【id为0则为管理员上传】
	    - Topicid 该视频所属主题id 【该Topicid应该等于传入的主题id值】
	    - Topid   该视频所属分类id 【分类为一级，主题为二级，分类包含主题】
	    - Title  视频标题
	    - Name   视频名称
	    - Pic    视频首页图片名称
	    - Zan    视频“赞”个数
	    - View   视频观看次数
	    - Create 视频创建时间

	根据https//{domain}/lightema/pic/{Pic} 拼接得到图片url地址；循环出来展示即可；
	此处样式同需求文档中“社区”页面


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

	  url: 'https://{domain}/lighteam/hotvideo',
	  method: "GET",
	  header: {
	  	"Content-Type": "application/x-www-form-urlencoded"
	  },
	
	请求参数：
		无
	返回值：（对象数组）
	    - Id     视频id
	    - Userid 上传该视频的用户id【id为0则为管理员上传】
	    - Topicid 该视频所属主题id
	    - Topid   该视频所属分类id 【分类为一级，主题为二级，分类包含主题】
	    - Title  视频标题
	    - Name   视频名称
	    - Pic    视频首页图片名称
	    - Zan    视频“赞”个数
	    - View   视频观看次数
	    - Create 视频创建时间

	根据https//{domain}/lightema/pic/{Pic} 拼接得到图片url地址；循环出来展示即可；

### 用户点击某一热门视频 action ###

	根据“热门视频”中携带的信息，跳转到视频播放页面，并做相应的展示；
	视频url地址： https://{domain}/lighteam/video/{Name} 
	与此同时，发送请求获取该视频的评论；
	### 详细见如下： 视频播放页面 ###

	

### 热门视频 “试一试” ###

	  url: 'https://{domain}/lighteam/tryhotvideo',
	  method: "GET",
	  header: {
	  	"Content-Type": "application/x-www-form-urlencoded"
	  },
	
	请求参数：
		无
	返回值：（对象数组）
	    - Id     视频id
	    - Userid 上传该视频的用户id【id为0则为管理员上传】
	    - Topicid 该视频所属主题id
	    - Topid   该视频所属分类id 【分类为一级，主题为二级，分类包含主题】
	    - Title  视频标题
	    - Name   视频名称
	    - Pic    视频首页图片名称
	    - Zan    视频“赞”个数
	    - View   视频观看次数
	    - Create 视频创建时间

	根据https//{domain}/lightema/pic/{Pic} 拼接得到图片url地址；循环出来展示即可；

### 热门主题 ###

	  url: 'https://{domain}/lighteam/hottopic',
	  method: "GET",
	  header: {
	  	"Content-Type": "application/x-www-form-urlencoded"
	  },
	
	请求参数：
		无
	返回值：（对象数组）
	    - Id     主题id
	    - Name   主题名字
	    - Topid  主题所属大类id（主题是属于某个大类的）
	    - Count  暂时保留
	    - Pic    主题展示的图片
	    - Assign 管理员是否指定显示该主题【0为不指定，1为指定】
	    
	根据https//{domain}/lightema/pic/{Pic} 拼接得到图片url地址；循环出来展示即可；

## 用户点击某一热门主题 action ###

	根据“热门主题”中携带的信息，跳转到主题展示页面；展示主题名称，简介等信息
	与此同时，发送请求获取该主题下的所有视频列表；

	  url: 'https://{domain}/lighteam/topicinfo',
	  method: "GET",
	  data： {Topicid}
	  header: {
	  	"Content-Type": "application/x-www-form-urlencoded"
	  },
	
	请求参数：
		主题id
	返回值：（对象数组）
	    - Id     视频id
	    - Userid 上传该视频的用户id【id为0则为管理员上传】
	    - Topicid 该视频所属主题id 【该Topicid应该等于传入的主题id值】
	    - Topid   该视频所属分类id 【分类为一级，主题为二级，分类包含主题】
	    - Title  视频标题
	    - Name   视频名称
	    - Pic    视频首页图片名称
	    - Zan    视频“赞”个数
	    - View   视频观看次数
	    - Create 视频创建时间

	根据https//{domain}/lightema/pic/{Pic} 拼接得到图片url地址；循环出来展示即可；
	此处样式同需求文档中“社区”页面

### 热门主题 试一试 ###

	  url: 'https://{domain}/lighteam/tryhottopic',
	  method: "GET",
	  header: {
	  	"Content-Type": "application/x-www-form-urlencoded"
	  },
	
	请求参数：
		无
	返回值：（对象数组）
	    - Id     主题id
	    - Name   主题名字
	    - Topid  主题所属大类id（主题是属于某个大类的）
	    - Count  暂时保留
	    - Pic    主题展示的图片
	    - Assign 管理员是否指定显示该主题【0为不指定，1为指定】
	    
	根据https//{domain}/lightema/pic/{Pic} 拼接得到图片url地址；循环出来展示即可；

### 视频播放 页面 ###

	根据上级跳转自带的视频信息；并做相应的展示，展示内容如下；
	- 视频名称
	- 视频播放  //用户点击支持全屏播放
	- 该视频的观看数量，点赞 数量
	- 评论总数
	- 评论框
	- 用户评论展示
	
	视频url地址： https://{domain}/lighteam/video/{Name} 
	与此同时，发送请求获取该视频的评论；

【以下暂定，可协商】

评论需要做分页处理（此处涉及到用户信息，请求必须添加用户id， key），请求分两次：

第一次请求
  
	url: 'https://{domain}/lighteam/videocomment',
	method: "GET",
	data：{视频id}
	header: {
		"Content-Type": "application/x-www-form-urlencoded"
	},
	
	请求参数：
		- userid  用户id
		- key     用户key
		- videoid  视频id
		- start    评论开始 比如从第一条开始 start=1，当start=1时，返回值中带有all（评论总条数)
		- count    此处获取的评论数量 数量为5， count=5； 返回为1，2，3，4，5条评论
		 
	返回值：（对象）
	    - all    该视频的评论总条数，用于分页，展示N个下一页；
	    - Nickname 评论者的昵称：
	    - Imgurl   评论者头像url
	    - comment  评论内容
	    - create   创建时间
	    - Pic      [string 数组]评论图像  #可能有,最多6张图片

第二次请求： 【根据第一次请求中的评论总数来确定是否需要第二次请求】
	    
	url: 'https://{domain}/lighteam/videocomment2',
	method: "GET",
	data：{视频id}
	header: {
		"Content-Type": "application/x-www-form-urlencoded"
	},
	
	请求参数：
		- videoid  视频id
		- start    评论开始 比如从第一条开始 start=8
		- count    此处获取的评论数量 数量为5， count=5； 返回为8，9，10，11，12条评论
				   若只有9，10，11条则只返回3条；
		 
	返回值：（对象数组）
	    - all      此时为0
	    - Nickname 评论者的昵称：
	    - Imgurl   评论者头像url
	    - comment  评论内容
	    - create   创建时间
	    - Pic      [string 数组]评论图像  #可能有,最多6张图片

### 用户提交评论 ###
分两次请求，第一次仅提交评论内容，并获取上传文件的uploadkey用于第二次上传图片；

#### 第一次 ####
	url: 'https://{domain}/lighteam/commentcommit',
	method: "POST",
	data：{如下说明}
	header: {
		"Content-Type": "application/x-www-form-urlencoded"
	},
	
	请求参数：
		- userid   用户id
		- key      用户key
		- videoid  视频id
		- comment  评论内容，50字之内，否则返回400参数错误
        - piccount 图片数量（0-6，至多6张图片,不在0-6之间则返回400参数错误）
		 
	返回值：（对象）
	    - uploadkey   piccount为0则为空，参数piccount属于1-6时候；返回文件（视频，图片）上传的key，该key在server端保存5分钟；过期则无效
	    - data        “success”

#### 第二次 ####
	
	** 上传失败则需要重新尝试一次；再给客户端弹框报错； **

	url: 'https://{domain}/lighteam/uploadfile',
	method: "POST",
	data：{如下说明}
	
	请求参数：[参见如下示例]
        - name       固定参数为"file"
        表单数据：
		- uploadkey  上传文件的key【获取之后5分钟之内有效】
		- order      上传的参数picount中的第几张，1/2/3/4/5/6

		 
	返回值：（对象）
	    - data        “success”

	示例如下：
      wx.uploadFile({
        url: 'https://{domain}/lighteam/uploadfile', //仅为示例，非真实的接口地址
        filePath: tempFilePaths[0],
        name: 'file',                     #固定为file
        formData: {
            order:      '1'
			uploadkey： 'XXXXXXXXXXXXXXXXXXXX'
        },
        success: function (res) {
          console.log("uploadfile success")
          console.log(res)
          //do something
        }，
		failed: function(res){
		  //再尝试一次，如果第二次再失败则弹框报错
		}

## 社区页面 ##

【主题需要分页展示， 每个主题下展示4个视频信息； 之后加"更多"图标来获取该主题下视频】
小程序端onload方法中，请求：

	url: 'https://{domain}/lighteam/topic',
	method: "GET",
	data：{参见如下说明}
	header: {
		"Content-Type": "application/x-www-form-urlencoded"
	},
	
	请求参数：
		- start    从第一条开始 start=1
		- count    此主题数量 数量为5， count=5； 每次获取最多为5
		 
	返回值：（对象）
	    - all      主题总数，只有当start=1时，才返回，其他请求则该参数返回0；
		- []video  视频信息，数组长度为4；这个是定值；

更多 >>> 