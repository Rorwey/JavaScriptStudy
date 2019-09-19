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

//定义一个函数,向元素中添加指定的class属性值
/**
 * 参数:
 *  - obj 要添加class属性的元素
 * 	- cn 要添加的class值
 */
function addClass(obj, cn) {
	//先检查obj中是否含有cn
	if (!hasClass(obj, cn)) {
		obj.className += " " + cn;
	}
};
//判断一个元素中是否含有指定的class值
/**
 * 参数:
 *  - obj 要判断class属性的元素
 * 	- cn 要判断的class值
 * 返回值：
 * 	- 有则true,否则false
 */
function hasClass(obj, cn) {
	// var reg == "/\bb2\b/";
	var reg = new RegExp("\\b" + cn + "\\b");
	return reg.test(obj.className);
};
//删除一个元素中指定的class属性
/**
 * 参数:
 *  - obj 要判断class属性的元素
 * 	- cn 要判断的class值
 */
function removeClass(obj, cn) {
	var reg = new RegExp("\\b" + cn + "\\b");
	obj.className = obj.className.replace(reg, "");
};
//切换一个类:如果元素中有该类则删除,否则添加.
/**
 * 参数:
 *  - obj 要切换class属性的元素
 * 	- cn 要切换的class值
 */
function toogleClass(obj, cn) {
	if (hasClass(obj, cn)) {
		removeClass(obj, cn);
	} else {
		addClass(obj, cn);
	}
}
