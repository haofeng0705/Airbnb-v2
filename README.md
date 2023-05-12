# 部署地址

https://hfbnb.vercel.app

# 技术栈

- React + TS

- next 13 服务端渲染
- next-auth 身份验证
- next-cloudinary 图片上传
- prisma TypeScript ORM
- Mangodb Atlas 数据库
- bcrypt 密码加密
- date-fns 日期工具
- leaflet 轻量级地图
- react-hook-form 表单验证
- react-hot-toast 消息弹窗
- axios 网络请求
- tailwindcss + postcss + autoprefixer 响应式样式
- zustand 代替 redux



# Features

- 主界面展示房源信息

  ![image-20230427204611695](http://rts0rcjxp.hn-bkt.clouddn.com/image-20230427204611695.png)

- 响应式布局

  ![image-20230427204750433](http://rts0rcjxp.hn-bkt.clouddn.com/image-20230427204750433.png)

  ![image-20230427204805474](http://rts0rcjxp.hn-bkt.clouddn.com/image-20230427204805474.png)

- 登录注册界面

  ![image-20230427204920157](http://rts0rcjxp.hn-bkt.clouddn.com/image-20230427204920157.png)

  支持三种方式：邮箱、Google、GIthub

  登录后从 OAuth 中获得用户头像，解锁下拉菜单

  使用 next-auth 中间件实现路由守卫

  ![image-20230427205307680](http://rts0rcjxp.hn-bkt.clouddn.com/image-20230427205307680.png)

  



- 用户可以喜欢房源并预定 available 的房源

  ![image-20230427205505050](http://rts0rcjxp.hn-bkt.clouddn.com/image-20230427205505050.png)

- 房源详情界面可以看到其他房东的房源，选择日期预定

  ![image-20230427210257759](http://rts0rcjxp.hn-bkt.clouddn.com/image-20230427210257759.png)

  ![image-20230427210324036](http://rts0rcjxp.hn-bkt.clouddn.com/image-20230427210324036.png)

  

- 预定完成可以访问到 Trip 页面

  ![image-20230427210424111](http://rts0rcjxp.hn-bkt.clouddn.com/image-20230427210424111.png)

- 精准搜索房源（根据 available 日期地点人数···）

  ![image-20230427210531792](http://rts0rcjxp.hn-bkt.clouddn.com/image-20230427210531792.png)

  ![image-20230427210554889](http://rts0rcjxp.hn-bkt.clouddn.com/image-20230427210554889.png)

- 用户可以发布自己的房源信息（可以查看别的用户的预订信息，删除信息等操作）

  ![image-20230427210706568](http://rts0rcjxp.hn-bkt.clouddn.com/image-20230427210706568.png)






# TODOs

- 在房东的 my reservation 界面,显示预定者的用户名
- 增加 i18n 多语言切换
- 增加 dark mode
- 点击 user menu 的时候自动关闭 dropdown
- 优化样式
- 优化 ImageUploader 渲染卡顿的问题

 
