(function() {
	var body = document.getElementsByTagName("body")[0]

	// 设置thunk的宽高
	function setThunkWidthHeight() {
		var thunk = document.getElementsByClassName("thunk");
		for(var i = 0; i < thunk.length; i++) {
			thunk[i].style.width = dataGlobal.thunkWidth + "px";
			thunk[i].style.height = dataGlobal.thunkHeight + "px";
		}
		setRandomPoint();
	}
	var bol = false;
	var targetElement = undefined;
	//设置随机出现点
	function setRandomPoint() {
		for(var i = 1; i < 10; i++) {
			var str = "thunk" + i;
			var thunkOther = document.getElementsByClassName(str)[0];
			dataGlobal.thunkList.push(thunkOther);
			dataGlobal.thunkFourData.push(thunkOther);
			methodList.setRandom(thunkOther);
			if(dataGlobal.thunkList.length >= 2 && dataGlobal.notrepeat) {
				methodList.rectangleIntersection();
			}
		}
	}
	//鼠标移动
	document.onmousemove = function() {
		if(bol) {
			var num1 = Number(targetElement.offsetLeft) + Number(event.movementX) * 1;
			var num2 = Number(targetElement.offsetTop) + Number(event.movementY) * 1;
			if(num1 + Number(dataGlobal.thunkWidth) > body.offsetWidth || num2 + Number(dataGlobal.thunkHeight) > body.offsetHeight || num1 < 0 || num2 < 0 || event.target == document.getElementsByTagName("html")[0]) {
				body.style.cursor = "default";
				targetElement = undefined;
				bol = false;
			} else {
				targetElement.style.left = num1 + "px";
				targetElement.style.top = num2 + "px";
			}
		}

	}
	//鼠标按下
	document.onmousedown = function() {
		if(event.target.className.indexOf("thunk") >= 0) {
			targetElement = event.target;
			targetElement.style.zIndex = 100;
			body.style.cursor = "Move";
			bol = true;
		}
	}
	//鼠标抬起
	document.onmouseup = function() {
		if(bol) {
			var nearElement = undefined;

			nearElement = methodList.elementSiblingFind(targetElement);
			if(nearElement.length > 0) {
				methodList.nearDirection(targetElement, nearElement[0]);
				var a=setTimeout(function(){
					methodList.isFinish()
					clearTimeout(a);
				},300);
				
			}
			body.style.cursor = "default";
			targetElement.style.zIndex = 1;
			targetElement = undefined;
			nearElement = undefined;
			bol = false;
		}

	}
	//初始化执行
	function init() {
		dataGlobal.thunkWidth = parseInt(Number(dataGlobal.imgWidth) / 3);
		dataGlobal.thunkHeight = parseInt(Number(dataGlobal.imgHeight) / 3);
		setThunkWidthHeight()
	}

	init();
})()