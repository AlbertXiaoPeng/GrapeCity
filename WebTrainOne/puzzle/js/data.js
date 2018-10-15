var dataGlobal = {
	_imgWidth: 284,
	_imgHeight: 177,
	_thunkWidth: 0,
	_thunkHeight: 0,
	thunkFourData: [],
	//存放thunk9个的列表
	thunkList: [],
	//不允许图片重叠
	notrepeat: false
}

Object.defineProperties(dataGlobal, {
	imgWidth: {
		get: function() {
			return this._imgWidth;
		},
		set: function(newValue) {
			this._imgWidth = newValue;
		}
	},
	imgHeight: {
		get: function() {
			return this._imgHeight
		},
		set: function(newValue) {
			this._imgHeight = newValue;
		}
	},
	thunkWidth: {
		get: function() {
			return this._thunkWidth;
		},
		set: function(newValue) {
			this._thunkWidth = newValue;
		}
	},
	thunkHeight: {
		get: function() {
			return this._thunkHeight
		},
		set: function(newValue) {
			this._thunkHeight = newValue;
		}
	}
})

var methodList = {
	//使矩形不重复函数
	rectangleIntersection: function() {
		var lastDoc = dataGlobal.thunkList[dataGlobal.thunkList.length - 1];
		var arr = dataGlobal.thunkList.concat([]);
		arr.splice(dataGlobal.thunkList.length - 1);
		dataGlobal.thunkFourData = [];
		var bol = false;
		for(var i = 0; i < arr.length; i++) {
			var objTemp = arr[i].getBoundingClientRect();
			if(methodList.JudgeRectangleIntersection(objTemp, lastDoc.getBoundingClientRect())) {
				//相交
				bol = true;
			}
		}
		if(bol) {
			//相交
			methodList.setRandom(lastDoc);
			return methodList.rectangleIntersection()
		} else {
			return true;
		}
	},
	//查找节点兄弟图片节点
	elementSiblingFind: function(doc) {
		var arr=[];
		var a=doc;
		var b=doc;
		for(var i=0;i<10;i++){
			if(a.previousElementSibling == null){
				break;
			}else{
				arr.push(a.previousElementSibling)
				a=a.previousElementSibling;
			}
		}
		for(var i=0;i<10;i++){
			if(b.nextElementSibling.className.indexOf("thunk") < 0){
				break;
			}else{
				arr.push(b.nextElementSibling);
				b=b.nextElementSibling
			}
		}
		var newArr=[];
		for(var i=0;i<arr.length;i++){
			if(methodList.JudgeRectangleIntersection(doc, arr[i])){
				newArr.push(arr[i])
			}
		}
		return newArr
	},
	//找出点击图片与轮询图片的四个坐标点，以及XY轴距离
	JudgeRectangleIntersection: function(m, n) {
		var a = m.getBoundingClientRect();
		var b = n.getBoundingClientRect();
		var x1 = a.left,
			x2 = a.right,
			x3 = a.right,
			x4 = a.left;
		var y1 = a.top,
			y2 = a.top,
			y3 = a.bottom,
			y4 = a.bottom;
		var yt = a.top,
			xr = a.right,
			yb = a.bottom,
			xl = a.left;

		var m1 = b.left - 20,
			m2 = b.right + 20,
			m3 = b.right + 20,
			m4 = b.left - 20;
		var n1 = b.top - 20,
			n2 = b.top - 20,
			n3 = b.bottom + 20,
			n4 = b.bottom + 20;
		var nt = b.top - 20,
			mr = b.right + 20,
			nb = b.bottom + 20,
			ml = b.left - 20;

		var bol = methodList.JudgeSegmentsIntersection(x1, x2, yt, n2, n3, mr) ||
			methodList.JudgeSegmentsIntersection(x1, x2, yt, n1, n4, ml) ||
			methodList.JudgeSegmentsIntersection(x4, x3, yb, n2, n3, mr) ||
			methodList.JudgeSegmentsIntersection(x4, x3, yb, n1, n4, ml) ||
			methodList.JudgeSegmentsIntersection(m1, m2, nt, y2, y3, xr) ||
			methodList.JudgeSegmentsIntersection(m1, m2, nt, y1, y4, xl) ||
			methodList.JudgeSegmentsIntersection(m4, m3, nb, y2, y3, xr) ||
			methodList.JudgeSegmentsIntersection(m4, m3, nb, y1, y4, xl)
		return bol;
	},
	//判断两条线是否相交
	JudgeSegmentsIntersection: function(x1, x2, y, n1, n2, m) {
		//线段相交
		var bol = (x1 < m && x2 > m) && (n1 < y && n2 > y);
		return bol;
	},
	//计算四点相对近点
	nearDirection:function(a,b){
		var obja=a.getBoundingClientRect();
		var objb=b.getBoundingClientRect();
		
		var topNear=(obja.bottom-objb.top)<0?-(obja.bottom-objb.top):(obja.bottom-objb.top);
		var rightNear=(obja.left-objb.right)<0?-(obja.left-objb.right):(obja.left-objb.right);
		var bottomNear=(obja.top-objb.bottom)<0?-(obja.top-objb.bottom):(obja.top-objb.bottom);
		var leftNear=(obja.right-objb.left)<0?-(obja.right-objb.left):(obja.right-objb.left);
		
		var nearLena=(topNear<=rightNear)?topNear:rightNear;
		var nearLenb=(bottomNear<=leftNear)?bottomNear:leftNear;
		
		var nearLen=(nearLena<=nearLenb)?nearLena:nearLenb;
		
		switch(nearLen){
			case topNear:
				methodList.moveNearDirectionTop(a,b);
			break;
			case rightNear:
				methodList.moveNearDirectionRight(a,b);
			break;
			case bottomNear:
				methodList.moveNearDirectionBottom(a,b);
			break;
			case leftNear:
				methodList.moveNearDirectionLeft(a,b);
			break;
		}
	},
	//当贴近顶部时
	moveNearDirectionTop:function(a,b){
		a.style.transition="all 0.2s";
		a.style.top=(b.getBoundingClientRect().top-a.getBoundingClientRect().height)+"px";
		a.style.left=b.getBoundingClientRect().left+"px";
		var c=setTimeout(function(){
			a.style.transition="all 0s";
			clearTimeout(c);
		},205)
	},
	moveNearDirectionRight:function(a,b){
		a.style.transition="all 0.2s";
		a.style.top=b.getBoundingClientRect().top+"px";
		a.style.left=b.getBoundingClientRect().right+"px";
		var c=setTimeout(function(){
			a.style.transition="all 0s";
			clearTimeout(c);
		},205)
	},
	moveNearDirectionBottom:function(a,b){
		a.style.transition="all 0.2s";
		a.style.top=b.getBoundingClientRect().bottom+"px";
		a.style.left=b.getBoundingClientRect().left+"px";
		var c=setTimeout(function(){
			a.style.transition="all 0s";
			clearTimeout(c);
		},205)
	},
	moveNearDirectionLeft:function(a,b){
		a.style.transition="all 0.2s";
		a.style.top=b.getBoundingClientRect().top+"px";
		a.style.left=(b.getBoundingClientRect().left-a.getBoundingClientRect().width)+"px";
		var c=setTimeout(function(){
			a.style.transition="all 0s";
			clearTimeout(c);
		},205)
		
	},
	//判断是否完成拼图
	isFinish:function(){
		var thunk=document.getElementsByClassName("thunk");
		var firstThunk=thunk[0];
		var bol=[0];
		for(var i=1;i<thunk.length;i++){
			switch(i){
				case 1:
					bol[i-1]=(thunk[0].getBoundingClientRect().top==thunk[1].getBoundingClientRect().top) && (thunk[0].getBoundingClientRect().right==thunk[1].getBoundingClientRect().left);
				break;
				case 2:
					bol[i-1]=(thunk[0].getBoundingClientRect().top==thunk[2].getBoundingClientRect().top) && (thunk[1].getBoundingClientRect().right==thunk[2].getBoundingClientRect().left);
				break;
				
				case 3:
					bol[i-1]=(thunk[0].getBoundingClientRect().left==thunk[3].getBoundingClientRect().left) && (thunk[0].getBoundingClientRect().bottom==thunk[3].getBoundingClientRect().top);
				break;
				case 4:
					bol[i-1]=(thunk[3].getBoundingClientRect().top==thunk[4].getBoundingClientRect().top) && (thunk[3].getBoundingClientRect().right==thunk[4].getBoundingClientRect().left);
				break;
				case 5:
					bol[i-1]=(thunk[4].getBoundingClientRect().top==thunk[5].getBoundingClientRect().top) && (thunk[4].getBoundingClientRect().right==thunk[5].getBoundingClientRect().left);
				break;
				
				case 6:
					bol[i-1]=(thunk[3].getBoundingClientRect().left==thunk[6].getBoundingClientRect().left) && (thunk[3].getBoundingClientRect().bottom==thunk[6].getBoundingClientRect().top);
				break;
				case 7:
					bol[i-1]=(thunk[6].getBoundingClientRect().top==thunk[7].getBoundingClientRect().top) && (thunk[6].getBoundingClientRect().right==thunk[7].getBoundingClientRect().left);
				break;
				case 8:
					bol[i-1]=(thunk[7].getBoundingClientRect().top==thunk[8].getBoundingClientRect().top) && (thunk[7].getBoundingClientRect().right==thunk[8].getBoundingClientRect().left);
				break;
			}
			
		}
		if(bol.indexOf(false)<0){
			alert("恭喜完成")
		}
	},
	//随机点位置
	setRandom: function(doc) {
		//设置随机点
		var body = document.getElementsByTagName("body")[0];

		var bodyWidth = body.offsetWidth;
		var bodyHeight = body.offsetHeight;
		var minWidth = 0;
		var maxWidth = Number(bodyWidth) - Number(dataGlobal.thunkWidth);
		var minHeight = 0;
		var maxHeight = Number(bodyHeight) - Number(dataGlobal.thunkHeight);

		var random1 = parseInt(Math.random() * 3000);
		var random2 = parseInt(Math.random() * 3000);
		if(random1 >= minWidth && random1 < maxWidth && random2 >= minHeight && random2 < maxHeight) {
			doc.style.top = random2 + "px";
			doc.style.left = random1 + "px";
			return;
		} else {
			return methodList.setRandom(doc);
		}

	}
}
//var setInt = setInterval(function() {
//	console.log(Math.random() * 3000)
//}, 1)
//
//function clear(){
//	clearInterval(setInt)
//}