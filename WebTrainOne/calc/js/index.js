////放置计算出来的结果
//var result = null;
////放置数字
//var num = null;
////
//var type = null;
////放置历史显示
//var hisstr = "0";
////放置正在输入的
//var ining = "0";

var obj = {
	_result: null,
	_num: null,
	_type: null,
	_count: false,
	_hisstr: "0",
	_ining: "0"
}
//数据绑定
Object.defineProperty(obj, "ining", {
	get: function() {
		return this._ining;
	},
	set: function(newvalue) {
		this._ining = newvalue;
		$("#inputs").text(newvalue)
	}
})
Object.defineProperty(obj, "hisstr", {
	get: function() {
		return this._hisstr
	},
	set: function(newvalue) {
		this._hisstr = newvalue;
		$("#calc-his").text(newvalue)
	}
})
Object.defineProperty(obj, "num", {
	get: function() {
		return this._num
	},
	set: function(newvalue) {
		this._num = newvalue;
		obj._hisstr = newvalue;
	}
})
Object.defineProperty(obj, "type", {
	get: function() {
		return this._type
	},
	set: function(newvalue) {
		this._type = newvalue;
		if(obj.num != null) {
			obj.hisstr = obj.num.toString() + newvalue
		} else {
			obj.hisstr = obj.num + newvalue
		}
	}
})
Object.defineProperty(obj, "result", {
	get: function() {
		return this._result
	},
	set: function(newvalue) {
		this._result = newvalue;
		$("#calc-his").text(newvalue)
	}
})
//加载完毕后按钮事件处理
window.onload = function() {
	//清空按钮事件
	$(".btn").select(0).on('click', function() {
		obj.hisstr = "0";
		obj.ining = "0";
		obj.type = null;
		obj.result = null;
		obj.num = null;
	})
	//后退按钮事件
	$(".btn").select(1).on('click', function() {
		if(Number(obj.ining) == 0) {
			return;
		} else if(obj.ining.length != 1) {
			var arr = obj.ining.split("");
			arr.pop();
			obj.ining = arr.join("")
		} else if(obj.ining.length == 1) {
			obj.ining = "0"
		}
	})
	//小数点按钮事件
	$(".btn").select(2).on('click', function() {
		if(obj.ining.length == 0) {
			obj.ining = "0.";
		} else if(obj.ining.indexOf(".") >= 0) {
			return;
		} else {
			obj.ining = obj.ining + "."
		}
	})
	//数字0按钮事件
	$(".btn").select(3).on('click', function() {
		if(Number(obj.ining) == 0 && obj.ining.indexOf(".") < 0) {
			return;
		} else {
			obj.ining += "0"
		}
	})
	//	//数字1按钮事件
	//	$(".btn").select(4).on('click', function() {
	//		if(Number(obj.ining) == 0 && obj.ining.indexOf(".") < 0) {
	//			obj.ining = "1";
	//		} else {
	//			obj.ining = obj.ining + "1"
	//		}
	//	})
	//数字2到9按钮事件
	var btns = document.getElementsByClassName("btn");
	for(var i = 0; i < btns.length; i++) {
		if(i >= 4 && i <= 12) {
			(function(i) {
				btns[i].onclick = function() {
					if(Number(obj.ining) == 0 && obj.ining.indexOf(".") < 0) {
						obj.ining = Number(i - 3).toString();
					} else {
						obj.ining = obj.ining + Number(i - 3).toString();
					}
				}
			})(i)
		}

	}
	// +按钮事件
	$(".btn").select(13).on('click', function() {
		//判断是否有存在的数据和算法
		if(Number(obj.ining) == 0) {
			if(obj.result == null) {
				if(obj.ining.indexOf(".") == obj.ining.length - 1) {
					var arr = obj.ining.split("");
					arr.pop();
					obj.num = arr.join("");
				} else {
					obj.num = obj.ining;
				}
				obj.type = "+";
				obj.ining = "0"
			} else {
				obj.num = obj.result;
				obj.type = "+";
			}
		} else {
			if(obj.num != null && obj.type != null) {
				dataProcessing();
			} else {
				if(obj.ining.indexOf(".") == obj.ining.length - 1) {
					var arr = obj.ining.split("");
					arr.pop();
					obj.num = arr.join("");
				} else {
					obj.num = obj.ining;
				}
				obj.type = "+";
			}
			obj.ining = "0"
		}
	})
	// -按钮事件
	$(".btn").select(14).on('click', function() {
		//判断是否有存在的数据和算法
		if(Number(obj.ining) == 0) {
			if(obj.result == null) {
				if(obj.ining.indexOf(".") == obj.ining.length - 1) {
					var arr = obj.ining.split("");
					arr.pop();
					obj.num = arr.join("");
				} else {
					obj.num = obj.ining;
				}
				obj.type = "-";
				obj.ining = "0"
			} else {
				obj.num = obj.result;
				obj.type = "-";
			}
		} else {
			if(obj.num != null && obj.type != null) {
				dataProcessing();
			} else {
				if(obj.ining.indexOf(".") == obj.ining.length - 1) {
					var arr = obj.ining.split("");
					arr.pop();
					obj.num = arr.join("");
				} else {
					obj.num = obj.ining;
				}
				obj.type = "-";
			}
			obj.ining = "0"
		}
	})
	// *按钮事件
	$(".btn").select(15).on('click', function() {
		//判断是否有存在的数据和算法
		if(Number(obj.ining) == 0) {
			if(obj.result == null) {
				if(obj.ining.indexOf(".") == obj.ining.length - 1) {
					var arr = obj.ining.split("");
					arr.pop();
					obj.num = arr.join("");
				} else {
					obj.num = obj.ining;
				}
				obj.type = "*";
				obj.ining = "0"
			} else {
				obj.num = obj.result;
				obj.type = "*";
			}
		} else {
			if(obj.num != null && obj.type != null) {
				dataProcessing();
			} else {
				if(obj.ining.indexOf(".") == obj.ining.length - 1) {
					var arr = obj.ining.split("");
					arr.pop();
					obj.num = arr.join("");
				} else {
					obj.num = obj.ining;
				}
				obj.type = "*";
			}
			obj.ining = "0"
		}

		//		if(obj.type != null || obj.num != null) {
		//			dataProcessing()
		//		} else if(obj.result != null && Number(obj.ining) == 0) {
		//			obj.num = obj.ining;
		//			obj.type = "*"
		//		} else if(obj.result != null && Number(obj.ining) != 0) {
		//			if(obj.type == null) {
		//				obj.num = obj.ining;
		//				obj.type = "*"
		//				obj.ining = "0"
		//			} else {
		//				obj.num = obj.ining;
		//				obj.type = "*"
		//				dataProcessing()
		//			}
		//
		//		} else {
		//			if(obj.ining.indexOf(".") == obj.ining.length - 1) {
		//				var arr = obj.ining.split("");
		//				arr.pop();
		//				obj.num = arr.join("");
		//				obj.type = "*"
		//			} else {
		//				obj.num = obj.ining;
		//				obj.type = "*";
		//			}
		//			obj.ining = "0"
		//		}
	})
	// /按钮事件
	$(".btn").select(16).on('click', function() {
		//判断是否有存在的数据和算法
		if(Number(obj.ining) == 0) {
			if(obj.result == null) {
				if(obj.ining.indexOf(".") == obj.ining.length - 1) {
					var arr = obj.ining.split("");
					arr.pop();
					obj.num = arr.join("");
				} else {
					obj.num = obj.ining;
				}
				obj.type = "/";
				obj.ining = "0"
			} else {
				obj.num = obj.result;
				obj.type = "/";
			}
		} else {
			if(obj.num != null && obj.type != null) {
				dataProcessing();
			} else {
				if(obj.ining.indexOf(".") == obj.ining.length - 1) {
					var arr = obj.ining.split("");
					arr.pop();
					obj.num = arr.join("");
				} else {
					obj.num = obj.ining;
				}
				obj.type = "/";
			}
			obj.ining = "0"
		}
		//		//判断是否有存在的数据和算法
		//		if(obj.type != null && obj.num != null) {
		//			dataProcessing()
		//		} else if(obj.result != null && Number(obj.ining) != 0) {
		//			obj.num = obj.result;
		//			obj.type = "/"
		//			dataProcessing();
		//		} else if(obj.result != null && Number(obj.ining) == 0) {
		//			obj.num = obj.result;
		//			obj.type = "/"
		//		} else {
		//			if(obj.ining.indexOf(".") == obj.ining.length - 1) {
		//				var arr = obj.ining.split("");
		//				arr.pop();
		//				obj.num = arr.join("");
		//				obj.type = "/"
		//			} else {
		//				obj.num = obj.ining;
		//				obj.type = "/";
		//			}
		//			obj.ining = "0"
		//		}
	})
	// =按钮事件
	$(".btn").select(17).on('click', function() {
		//判断是否有存在的数据和算法
		dataJisuan()
	})

}

function dataProcessing() {
	switch(obj.type) {
		case "+":
			temp = numberChange(Number(obj.num) + Number(obj.ining));
			obj.result = temp
			obj.num = temp;
			obj.type = "+";
			break;
		case "-":
			temp = numberChange(Number(obj.num) - Number(obj.ining));
			obj.result = temp
			obj.num = temp;
			obj.type = "-";
			break;
		case "*":
			temp = numberChange(Number(obj.num) * Number(obj.ining));

			obj.result = temp
			obj.num = temp;
			obj.type = "*";
			break;
		case "/":
			temp = numberChange(Number(obj.num) / Number(obj.ining));
			obj.result = temp
			obj.num = temp;
			obj.type = "/";
			break;
	}
	obj.ining = "0";
}
//等于按钮数值处理
function dataJisuan() {
	var temp = null;
	switch(obj.type) {
		case "+":
			temp = numberChange(Number(obj.num) + Number(obj.ining));
			break;
		case "-":
			temp = numberChange(Number(obj.num) - Number(obj.ining));
			break;
		case "*":
			temp = numberChange(Number(obj.num) * Number(obj.ining));
			break;
		case "/":
			temp = numberChange(Number(obj.num) / Number(obj.ining));
			break;
		default:
			temp = obj.ining;
			break;
	}
	obj.num = null;
	obj.type = null;
	obj.result = temp;
	obj.ining = "0"
}
//对数值进行四舍五入，留小数点
function numberChange(results) {
	if(results.toString().indexOf(".") < 0) {
		return results;
	} else {
		//计算结果的数组
		var resultArr = results.toString().split("");
		// 排在前面值得数组
		var firstNum = obj.num.toString().split("");
		// 排在后面的值
		var lastNum = obj.ining.toString().split("");
		var firstLen
		
		if(resultArr.indexOf("-")==0){
			resultArr.shift();
		}
		
		if(firstNum.indexOf(".") < 0) {
			firstLen = 0;
		} else {
			firstLen = (firstNum.length - 1) - (firstNum.indexOf("."));
		}

		var lastLen
		if(lastNum.indexOf(".") < 0) {
			lastLen = 0;
		} else {
			lastLen = (lastNum.length - 1) - (lastNum.indexOf("."));
		}
		var len = firstLen > lastLen ? firstLen : lastLen;

		var resultlen = (resultArr.length - 1) - (resultArr.indexOf("."));
		
		var resultindexOf=resultArr.indexOf(".");
		if(len == 0) {
			resultArr.splice(resultindexOf);
			return Number(resultArr.join(""));
		}else{
			if(resultlen<=len){
				return results;
			}else{
				var temp=resultArr[Number(resultArr.indexOf("."))+len];
				var jinsi=resultArr[Number(resultArr.indexOf("."))+len+1];
				if(jinsi<=4){
					resultArr.splice(resultArr.indexOf(".")+len+1);
					return resultArr.join("")
				}else{
					var str="0.";
					for(var i=0;i<len-1;i++){
						str+="0";
					}
					str+="1";
					resultArr.splice(resultArr.indexOf(".")+len+1);
					var tempnum=resultArr.join("");
					var a=Number(str)+Number(tempnum);
					str="-"+a.toString();
					return str;
				}
			}
		}
	}

}