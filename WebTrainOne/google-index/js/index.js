window.onload = function() {
	var tips = document.getElementById("tips");
	var hidul = document.getElementById("hid-ul");

	var more = document.getElementById("more");
	var san = document.getElementById("san");
	var navfloat = document.getElementById("nav-float");

	san.style.display = "none";
	navfloat.style.display = "none";

	var ulshow = document.getElementById("ul-show");
	tips.onclick = function() {

		tips.style["display"] = "none";
		hidul.style["display"] = "block";
		var b = setInterval(function() {
			navfloat.scrollTop += 5;
		}, 1)
		var a = setTimeout(function() {
			clearInterval(b);
		}, 300);

	}
	navfloat.onwheel = function(e) {
		if(navfloat.scrollTop == 0 && e.deltaY < 0) {
			tips.style["display"] = "block";
			hidul.style["display"] = "none";
		} else if(navfloat.scrollTop == 0 && e.deltaY > 0) {
			tips.style["display"] = "none";
			hidul.style["display"] = "block";
		}
	}
	//默认事件冒泡
	document.onclick = function(e) {
//		console.log(e.target)

		if(e.target == more || more.childNodes[0] == e.target) {
			if(navfloat.style.display == "none" && san.style.display == "none") {
				san.style.display = "block";
				navfloat.style.display = "block";
			} else {
				san.style.display = "none";
				navfloat.style.display = "none";
			}
		} else if(e.target == document.getElementsByTagName("body")[0]) {
			san.style.display = "none";
			navfloat.style.display = "none";
		} else {
			var bol = isChild(e.target, navfloat)
			if(!bol) {
				san.style.display = "none";
				navfloat.style.display = "none";
			}
		}
	}
}

//判断old是否为new的子节点
function isChild(child, parent) {
	//	console.log("child-----",child)
	//	console.log("child.parentNode-----",child.parentNode)
	//	console.log("parent-----",parent)
	if(child.parentNode != parent) {
		if(child.parentNode == document.getElementsByTagName("body")[0]) {
			return false;
		} else {
			return isChild(child.parentNode, parent);
		}
	} else {
		return true;
	}
}