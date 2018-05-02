# log-box-cli 日志收集服务客户端插件
#### 基于Nodejs的日志收集服务客户端
***
服务端插件：[log-box-core](https://www.npmjs.com/package/log-box-core)

### 安装：

```javascript
npm install log-box-cli;
```

### 使用方法：

```javascript
let LBC = require('log-box-cli');

let Logger = new LBC("IP Address", port);    // 创建实例，并指定日志服务器的IP地址和端口
Logger.log("error", "error msg");   // 打印错误日志
Logger.error("error msg");   // 打印错误日志
```


### 默认日志级别：
* emergency: 系统不可用
* alert:   必须马上采取行动的事件
* critical: 关键的事件
* error:   错误事件
* warning:  警告事件
* notice:  普通但重要的事件
* info:   有用的信息
* debug:  调试信息
* default: 默认级别，指定为default或不指定日志级别，则日志会保存在default级别。


### 自定义日志级别
 除了可以使用默认的9个日志级别之外，开发者还能自定义级别，仅需在调用Logger.log函数时，将自定义的日志级别名称传入即可，如记录用户操作日志：Logger.log("operationLog", "XXX用户将订单XXX设置为已发货");

API：

	/**
	 * @param String level  非必填 日志级别，不填则为default级别，可自定义（级别名称仅限英文和数字）。
	 * @param String msg   必填  日志内容
	 **/
	Logger.log([level,] msg);


	/**
	 * @param String msg   必填  日志内容
	 **/
	Logger.info(msg);


	/**
	 * @param String msg   必填  日志内容
	 **/
	Logger.debug(msg);


	/**
	 * @param String msg   必填  日志内容
	 **/
	Logger.warning(msg);


	/**
	 * @param String msg   必填  日志内容
	 **/
	Logger.error(msg);


	/**
	 * @param String msg   必填  日志内容
	 **/
	Logger.notice(msg);


	/**
	 * @param String msg   必填  日志内容
	 **/
	Logger.critical(msg);


	/**
	 * @param String msg   必填  日志内容
	 **/
	Logger.alert(msg);


	/**
	 * @param String msg   必填  日志内容
	 **/
	Logger.emergency(msg);