/*
 * 定义一个函数，用来获取指定元素的当前样式
 * 参数
 * 	- obj 要获取样式的元素
 * 	- name 要获取的样式值
 */
function getStyle(obj, name) {
	if (window.getComputedStyle) {
		return getComputedStyle(obj, null)[name];
	} else {
		return obj.currentStyle[name];
	}
};

/**
 * 一个可以移动的简单动画的函数
 * 参数：
 * - obj: 要执行动画的对象
 * - attr: 要执行动画的样式，例如left top width height
 * - target: 执行动画的停止位置
 * - speed: 移动的速度
 * - callback: 将会在动画执行完毕以后执行
 */
function move(obj, attr, target, speed, callback) {
	clearInterval(obj.timer);
	var current = parseInt(getStyle(obj, attr));
	//如果从小向大移动,则speed为正。否则为负
	if (current > target) {
		speed = -speed;
	}
	//开启定时器,用来执行动画效果
	//向执行动画的对象中添加一个timer,用来保存他自己的定时器
	obj.timer = setInterval(function() {
			var oldValue = parseInt(getStyle(obj, attr));
			var newValue = oldValue + speed;
			if ((speed < 0 && newValue < target) || (speed > 0 && newValue > target)) {
				newValue = target;
			}
			obj.style[attr] = newValue + "px";
			//当元素移动到target,使其停止动画

			if (newValue == target) {
				clearInterval(obj.timer);
				//动画执行完毕,调用回调函数
				callback && callback();
			}
		},
		30);
}
