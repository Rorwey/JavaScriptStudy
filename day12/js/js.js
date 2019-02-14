function bind(obj, eventStr, callback) {
	if (obj.addEventListener) {
		//大部分浏览器兼容的方式
		obj.addEventListener(eventStr, callback, false);
	} else {
		/*
		 * this由谁调用决定
		 * callback.call(obj)
		 */
		//IE8及以下
		obj.attachEvent("on" + eventStr, function() {
			//在匿名函数中调用回调函数
			callback.call(obj);
		});
	}
}
