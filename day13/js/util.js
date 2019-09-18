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
