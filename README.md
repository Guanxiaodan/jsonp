# JSONP
对JSONP的学习!
##### 原始网址：<http://api.money.126.net/data/feed/0000001,1399001>
### 原理
1.浏览器允许跨域引用JavaScript资源
（即给JavaScript文件开了特殊通道，只有JavaScript文件才有特权跨域）

2.JSONP以函数调用的形式返回

### 限制
1.只能用GET请求

2.要求返回JavaScript

### 正文
先看一个极简版jsonp例子
```
<script>
  // 函数refreshPrice对应下面的script标签里src后面的回调函数
  // 查看浏览器控制台，打印出了数据
  function refreshPrice(data) {
    console.log(data);
  }

</script>
<script src="http://api.money.126.net/data/feed/0000001,1399001?callback=refreshPrice"></script>
```
上面这个例子，你先打开原始网站看一下数据，以*_ntes_quote_callback({"0000001":*开头，再打开上述例子里面的网址，
发现以*refreshPrice({"0000001"*开头，就是网址后面带的callback函数，浏览器里面显示出对*refreshPrice*函数的调用，传进来的参数正是我们所需要的数据。
