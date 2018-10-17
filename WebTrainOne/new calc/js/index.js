(function() {
	var btn = document.getElementById("btn");
	var showHistory = document.getElementById("show-history");
	var showBeing = document.getElementById("show-being");
	var calcBtnValue = {
		numList: "1234567890",
		fourOperator: "+-*/",
		bracket: "()",
		tools: "cad",
		equality: "="
	}
	var dataGlobal = {
		operationList: [],
		inputQueue: ["0"],
		result: false,
		historyOperation: [],
		historyResult: []
	}
	var historyList = []

	function render() {
		showHistory.innerText = dataGlobal.operationList.join(" ");
		showBeing.innerText = dataGlobal.inputQueue.join(" ");
	}
	btn.onclick = function() {
		if(event.target.className.indexOf("btn-child") >= 0) {
			var v = event.target.dataset.v;

			if(calcBtnValue.numList.indexOf(v) >= 0) {
				if(dataGlobal.result) {
					init(v)
				} else {
					//为数值
					if(v == "0") {
						if(dataGlobal.inputQueue.length > 1 || dataGlobal.inputQueue[0] != "0") {
							dataGlobal.inputQueue.push(v);
						} else {
							dataGlobal.inputQueue = ["0"];
						}
					} else {
						if(dataGlobal.inputQueue.length == 1 && dataGlobal.inputQueue[0] == "0") {
							dataGlobal.inputQueue = [v];
						} else {
							dataGlobal.inputQueue.push(v);
						}
					}
				}

			} else if(v == ".") {
				//小数点操作
				if(dataGlobal.inputQueue.indexOf(".") >= 0) {
					alert("不可多次输入")
				} else {
					dataGlobal.inputQueue.push(v);
				}

			} else if(calcBtnValue.tools.indexOf(v) >= 0) {
				//判断清空和删除
				if(v == "ca") {
					init();
				} else {
					if(dataGlobal.inputQueue.length == 1) {
						if(dataGlobal.inputQueue[0] != "0") {
							dataGlobal.inputQueue = ["0"];
						}
					} else {
						dataGlobal.inputQueue.pop()
					}
				}
			} else if(calcBtnValue.fourOperator.indexOf(v) >= 0) {
				//四则符号
				var arr = dataGlobal.operationList.concat([]);
				var pop = arr.pop()
				if(calcBtnValue.bracket.indexOf(pop) >= 0) {
					//前方为左括号时，需要先push值，在加运算符
					if(pop == "(") {
						var str = dataGlobal.inputQueue.join("");
						dataGlobal.operationList.push(str);
						dataGlobal.operationList.push(v)
						dataGlobal.inputQueue = ["0"]
					} else {
						//前方为右括号，直接push运算符
						dataGlobal.operationList.push(v)
					}

				} else {
					var str = dataGlobal.inputQueue.join("");
					dataGlobal.operationList.push(str);
					dataGlobal.operationList.push(v)
					dataGlobal.inputQueue = ["0"]
				}

			} else if(calcBtnValue.bracket.indexOf(v) >= 0) {
				//括号
				var arr = dataGlobal.operationList.concat([]);
				if(v == "(") {
					//前方为运算符时左括号才好使
					if(calcBtnValue.fourOperator.indexOf(arr.pop()) >= 0) {
						dataGlobal.operationList.push(v)
					} else {
						if(dataGlobal.operationList.length==0){
							dataGlobal.operationList.push(v)
						}else{
							alert("请在左括号前放置四则运算符")
						}
					}
				} else {
					var pop = arr.pop();
					//前方为运算符时右括号不对，所以需要将输入的值进行push在进行关闭括号
					if(calcBtnValue.fourOperator.indexOf(pop) >= 0) {
						dataGlobal.operationList.push(dataGlobal.inputQueue.join(""));
						dataGlobal.inputQueue = ["0"]
						dataGlobal.operationList.push(v);
					} else if(calcBtnValue.bracket.indexOf(pop) >= 0) {
						alert("请在其中存在表达式")
					}

				}

			} else if(v == "=") {
				var str = dataGlobal.inputQueue.join("");
				dataGlobal.operationList.push(str);
				//赋值于新数组
				var arr = dataGlobal.operationList.concat([]);
				var temp = dataGlobal.operationList.concat([]);
				var result = operation.conversion(arr);
				var obj = {
					historyOperation: temp.join(" "),
					historyResult: result,
					historyTime: new Date()
				}
				historyList.push(obj);
				dataGlobal.inputQueue = result.toString().split("")
				dataGlobal.result = true
			}
			render()
		}
	}

	function init(v) {
		if(v != undefined) {
			dataGlobal.inputQueue = [v];
		} else {
			dataGlobal.inputQueue = ["0"];
		}
		dataGlobal.result = false;
		dataGlobal.operationList = [];
		showHistory.innerText = dataGlobal.operationList.join(" ");
		showBeing.innerText = dataGlobal.inputQueue.join(" ");
	}
	init()
	window.historyList = historyList;

})();