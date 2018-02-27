const dgram = require('dgram');


let logFormat = function(str) {
	let time = new Date().Format("yyyy-MM-dd hh:mm:ss");
	return `[${ time }] - ${ str }`;
}

module.exports = class LBC {
	constructor(address, port) {
		this.address = address;
		this.port = port;
		this.client = dgram.createSocket('udp4');
		this.queue = [];   // 待发送日志队列
		this.isSending = false;   // 发送状态

		this.logLevels = {
			"emergency": 0,
			"alert": 1,
			"critical": 2,
			"error": 3,
			"warning": 4,
			"notice": 5,
			"info": 6,
			"debug": 7,
			"default": 100
		};


		/**
		 * [Format 日期格式化]
		 */
		Date.prototype.Format = function (fmt) {
			var o = {
			    "M+": this.getMonth() + 1, //月份 
			    "d+": this.getDate(), //日 
			    "h+": this.getHours(), //小时 
			    "m+": this.getMinutes(), //分 
			    "s+": this.getSeconds(), //秒 
			    "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
			    "S": this.getMilliseconds() //毫秒 
			};
			if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
			for (var k in o)
			if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
			return fmt;
		}		
	}

	/**
	 * [sendNext 发送下一条日志]
	 */
	sendNext() {
		let _this = this;
		if (this.queue.length > 0) {
			const msg = this.queue.shift();
			this.client.send(msg, this.port, this.address, function() {
				_this.sendNext();
			});
		} else {
			this.isSending = false;
		}
	}

	/**
	 * [senMsg 开始发送日志]
	 */
	senMsg() {
		if (this.isSending) {
			return;
		}
		this.isSending = true;
		this.sendNext();
	}

	/**
	 * [log 打印日志]
	 * @param  {[string]} level [日志级别]
	 * @param  {[string]} str   [日志内容]
	 */
	log(level, str) {
		let levelCode = null;
		let msg = str;
		if (str == undefined) {
			levelCode = 100;
			msg = level;
		} else {
			levelCode = this.logLevels[level];

			if (levelCode == undefined) {
				throw new Error(`level "${ level }"" is not allowed`);
			}
		}
		let PRI = 184+levelCode;
		this.queue.push(`\<${ PRI }\>${ logFormat(msg) }`);
		this.senMsg();
	}

	/**
	 * [debug 打印debug级别的日志]
	 * @param  {[type]} str [description]
	 * @return {[type]}     [description]
	 */
	debug(str) {
		this.log("debug", str);
	}

	info(str) {
		this.log("info", str);
	}

	warning(str) {
		this.log("warning", str);
	}

	error(str) {
		this.log("error", str);
	}

	notice(str) {
		this.log("notice", str);
	}

	critical(str) {
		this.log("critical", str);
	}

	alert(str) {
		this.log("alert", str);
	}

	emergency(str) {
		this.log("emergency", str);
	}
};