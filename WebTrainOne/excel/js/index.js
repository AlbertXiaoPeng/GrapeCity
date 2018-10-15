(function() {
	document.getElementById("yesButton").setAttribute("disabled", true);
	/*
	 * 编辑列宽行高
	 */
	// 列宽设置
	function cellWidth() {
		var tab = $("#tab").eq;
		//循环第一行，也就是列头,排除第一列，也就是选项框列
		var bol = false
		var tid = undefined;
		for(var i = 1; i < tab.rows[0].cells.length; i++) {
			//指针变化
			tab.rows[0].cells[i].onmousemove = function() {
				var moveX = event.movementX;
				if(bol) {
					this.style.cursor = "e-resize";
					tid.style.width = (Number(tid.offsetWidth) + Number(moveX)).toString() + "px";
				} else {
					if(event.offsetX >= this.offsetWidth - 7) {
						this.style.cursor = "e-resize";
					} else {
						this.style.cursor = "default"
					}
				}

			}
			//鼠标下去
			tab.rows[0].cells[i].onmousedown = function() {
				if(event.offsetX >= this.offsetWidth - 7) {
					tid = this;
					bol = true;
				}

			}
			//鼠标抬起
			tab.rows[0].cells[i].onmouseup = function() {
				bol = false;
			}
		}
	}
	// 行高设置
	function rowHeight() {
		var tab = $("#tab").eq;
		var bol = false
		var tid = undefined;
		var arr = [];
		for(var i = 0; i < tab.rows.length; i++) {
			arr.push(tab.rows[i].cells[0])
		}
		for(var i = 1; i < arr.length; i++) {
			//指针变化
			arr[i].onmousemove = function() {
				var moveY = event.movementY;
				if(bol) {
					this.style.cursor = "n-resize";
					tid.style.height = (Number(tid.offsetHeight) + Number(moveY)).toString() + "px";
				} else {
					if(event.offsetY >= this.offsetHeight - 10) {
						this.style.cursor = "n-resize";
					} else {
						this.style.cursor = "default"
					}
				}

			}
			//鼠标下去
			arr[i].onmousedown = function() {
				tid = this;
				bol = true;
			}
			//鼠标抬起
			arr[i].onmouseup = function() {
				bol = false;
			}
		}
	}

	/*
	 * 多选
	 */

	//全选与全不选
	$("#checkboxAll").on('click', function() {
		if(dataGlobal.addStuts) {
			alert("请先保存在选择");
			event.preventDefault();
		} else {
			var temp = this.checked;
			var checkboxAll = document.getElementsByName("checkboxs");
			if(temp) {
				for(var i = 0; i < checkboxAll.length; i++) {
					checkboxAll[i].checked = true;
				}
				dataGlobal.checkboxNum = checkboxAll.length
			} else {
				for(var i = 0; i < checkboxAll.length; i++) {
					checkboxAll[i].checked = false
				}
				dataGlobal.checkboxNum = 0;
			}
		}

	})
	// 单个选设置
	function checkboxAddEvent() {
		var checkboxAll = document.getElementsByName("checkboxs");
		for(var i = 0; i < checkboxAll.length; i++) {

			(function(i) {
				checkboxAll[i].onclick = function() {
					
					if(this.checked) {
						dataGlobal.checkboxNum = dataGlobal.checkboxNum + 1;
						dataGlobal.selectIndex.push(i);
					} else {
						dataGlobal.checkboxNum = dataGlobal.checkboxNum - 1;
						dataGlobal.selectIndex.splice(dataGlobal.selectIndex.indexOf(i), 1);
					}
					console.log(dataGlobal.selectIndex)
				}
			})(i);
		}
	}

	/*
	 * 双击数据修改及保存
	 */

	// 双击数据进行修改
	function dbclickData() {
		var tab = $("#tab").eq;
		var tid = undefined;
		//中间内容文字
		var elementArr = [];
		for(var i = 1; i < tab.rows.length; i++) {
			for(var j = 1; j < tab.rows[i].cells.length; j++) {
				elementArr.push(tab.rows[i].cells[j])
			}
		}
		for(var i = 0; i < elementArr.length; i++) {
			elementArr[i].ondblclick = function() {
				var inputList = document.getElementsByName("inputs");
				var text = this.innerText;
				if(dataGlobal.addStuts || inputList.length > 0) {
					if(dataGlobal.addStuts) {
						alert("请将行保存后再进行编辑")
					} else {
						if(event.target == inputList[0] || isChild(inputList[0], event.target)) {} else {
							alert("已存在一个输入框，请先确定，在进行操作")
							//存在一个输入框
						}
					}
				} else {
					//不存在输入框
					var str = `<input type="text" name="inputs" class="inputs" value="${text}" />`;
					this.innerHTML = str;
					dataGlobal.inputTextNum = 1;
					setEnterEvent()
				}
			}
		}
	}

	//确认修改按钮
	document.getElementById("yesButton").onclick = function() {
		if(dataGlobal.addStuts) {
			yesAddValue();
		} else {
			yesModify()
		}
	}
	//设置回车事件
	function setEnterEvent() {
		if(dataGlobal.inputTextNum > 0) {
			//回车确认
			document.getElementsByName("inputs")[0].onfocus = function() {
				if(window.addEventListener) {
					document.addEventListener('keyup', enterEvent, false);
				} else {
					document.attachEvent('onkeyup', enterEvent)
				}
			}
		} else {
			if(window.addEventListener) {
				document.removeEventListener('keyup', enterEvent);
			} else {
				document.attachEvent('onkeyup', enterEvent)
			}
		}
	}
	//回车按键事件
	function enterEvent() {
		if(event.which == 13) {
			yesModify()
		}
	}
	//事件冒泡
	document.ondblclick = function(e) {
		var tab = $("#tab").eq;
		//		console.log(e.target, tab)
		var bol = isChild(e.target, tab);

		if(!bol) {
			yesModify()
		}
	}
	// 确认修改
	function yesModify() {
		var inputList = document.getElementsByName("inputs");
		if(inputList.length > 0) {
			//存在一个输入框
			var val = inputList[0].value;
			var temptd = inputList[0].parentNode;
			temptd.innerHTML = val;
			dataGlobal.inputTextNum = 0;
			//用于删除事件
			setEnterEvent()
		}
	}

	//判断old是否为new的子节点
	function isChild(child, parent) {
		//	console.log("child-----",child)
		//	console.log("child.parentNode-----",child.parentNode)
		//	console.log("parent-----",parent)
		if(child == document.getElementsByTagName("body")[0]) {
			return false;
		} else {
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

	}

	/*
	 * 添加行和列，以及删除行和列
	 */
	document.getElementById("addRow").onclick = function() {
		if(dataGlobal.addStuts > 0) {
			alert("请先保存正在输入的数据")
		} else {
			var tab = $("#tab").eq;
			var len = tab.rows[0].cells.length - 1;
			var tdstr = `<input type="text" name="addRowText" class="addRowText" value="" />`;
			var thstr = `<input type="checkbox" name="checkboxs" class="checkboxs" disabled />`;
			var tr = document.createElement("tr");
			tab.children[0].appendChild(tr);
			var td = document.createElement("td")
			tr.appendChild(td);
			td.innerHTML = thstr;
			for(var i = 0; i < len; i++) {
				var td = document.createElement("td")
				tr.appendChild(td);
				td.innerHTML = tdstr;
			}
			dataGlobal.addStuts = true;
		}
	}
	
	document.getElementById("removeRow").onclick=function(){
		if(dataGlobal.checkboxNum==document.getElementsByClassName("checkboxs").length){
			var tab = $("#tab").eq;
			var tbody=tab.childNodes[1];
			for(var i=tbody.childNodes.length-1;i>1;i--){
				tbody.removeChild(tbody.childNodes[i])
			}
			init()
		}else{
			var tab = $("#tab").eq;
			var tbody=tab.childNodes[1];
			var arr=[]
			for(var i=0;i<dataGlobal.selectIndex.length;i++){
				arr.push(tbody.childNodes[dataGlobal.selectIndex[i]]);
			}
			for(var i=0;i<arr.length;i++){
				tbody.removeChild(arr[i])
			}
			init()
		}
	}

	function yesAddValue() {
		var checkboxs = document.getElementsByName("checkboxs")[document.getElementsByName("checkboxs").length - 1];
		checkboxs.removeAttribute("disabled");
		var inputs = document.getElementsByClassName("addRowText");
		var arrValue = [];
		for(var i = inputs.length - 1; i >= 0; i--) {
			inputs[i].parentNode.innerHTML = inputs[i].value;
		}
		dataGlobal.addStuts = false;
		init()
	}

	/*
	 * 全局与初始化
	 */

	//全局变量存储
	var dataGlobal = {
		selectIndex: [],
		_checkboxNum: 0,
		_inputTextNum: 0,
		_addStuts: false,
		_rowNum: 0,
		_cellNum: 0
	}
	Object.defineProperties(dataGlobal, {
		checkboxNum: {
			get: function() {
				return this._checkboxNum;
			},
			set: function(newValue) {
				this._checkboxNum = newValue;
				if(newValue > 0) {
					document.getElementById("removeRow").removeAttribute("disabled")
				} else {
					document.getElementById("removeRow").setAttribute("disabled", true)
				}
			}
		},
		inputTextNum: {
			get: function() {
				return this._inputTextNum;
			},
			set: function(newValue) {
				this._inputTextNum = newValue;
				if(newValue > 0) {
					document.getElementById("yesButton").removeAttribute("disabled")
					document.getElementById("addRow").setAttribute("disabled", true)
					document.getElementById("addCell").setAttribute("disabled", true)
				} else {
					document.getElementById("yesButton").setAttribute("disabled", true)
					document.getElementById("addRow").removeAttribute("disabled")
					document.getElementById("addCell").removeAttribute("disabled")
				}
			}
		},
		addStuts: {
			get: function() {
				return this._addStuts;
			},
			set: function(newValue) {
				this._addStuts = newValue;
				if(newValue) {
					document.getElementById("yesButton").removeAttribute("disabled")
				} else {
					document.getElementById("yesButton").setAttribute("disabled", true)
				}
			}
		},
		rowNum: {
			get: function() {
				return this._rowNum;
			},
			set: function(newValue) {
				this._rowNum = newValue;
				init();
			}
		},
		cellNum: {
			get: function() {
				return this._cellNum;
			},
			set: function(newValue) {
				this._cellNum = newValue;
				init();
			}
		}
	})
	//	初始化函数执行
	function init() {
		dbclickData()
		cellWidth()
		rowHeight()
		checkboxAddEvent();
	}

	var tab = $("#tab").eq;
	//数据初始化
	dataGlobal.rowNum = tab.rows.length;
	dataGlobal.cellNum = tab.rows[0].cells.length;
})();