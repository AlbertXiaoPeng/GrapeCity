var operation = {
	/**
	 * 判断是否为操作符
	 *
	 * @param {*} value
	 * @returns true 为值 false 为操作符
	 */
	isOperator: function(value) {
		var operatorString = "+-*/()";
		return operatorString.indexOf(value) > -1;
	},
	/**
	 * 赋予四则运算符优先级值
	 * 
	 * @param {*} value
	 * @returns
	 */
	getPrioraty: function(value) {
		switch(value) {
			case '+':
			case '-':
				return 1;
			case '*':
			case '/':
				return 2;
			default:
				return 0;
		}
	},
	/**
	 * 判断加减乘除的优先级
	 *
	 * @param {*} o1 外围元素
	 * @param {*} o2 栈顶元素
	 * @returns true 外围运算符优先级<=栈顶运算符 false 外围运算符优先级>栈顶运算符
	 */
	prioraty: function(o1, o2) {
		return operation.getPrioraty(o1) <= operation.getPrioraty(o2);
	},
	/**
	 * 数值计算
	 * 
	 * @param {*} first
	 * @param {*} second
	 * @param {*} operator
	 * @returns
	 */
	getResult: function(first, second, operator) {
		var result = 0;
		var first = Number(first);
		var second = Number(second)
		switch(operator) {
			case '+':
				result = first + second;
				break;
			case '-':
				result = first - second;
				break;
			case '*':
				result = first * second;
				break;
			case '/':
				result = first / second;
				break;
			default:
				return 0;
		}

		//浮点数的小数位超过两位时，只保留两位小数点
		function formatFloat(f, first, second) {
			//pow(10,n) 为 10 的 n 次方
			//			var m = Math.pow(10, digit);
			//			return parseInt(f * m, 10) / m;
			var firstLen = Number(first.toString().length) - Number(first.toString().indexOf(".")) - 1;
			var secodeLen = Number(second.toString().length) - Number(second.toString().indexOf(".")) - 1;

			if(firstLen == Number(first.toString().length)) {
				firstLen = 0;
			}
			if(secodeLen == Number(second.toString().length)) {
				secodeLen = 0;
			}
			var len = firstLen > secodeLen ? firstLen : secodeLen;

			//pow(10, n) 为 10 的 n 次方 //f 12.365
			var m = Math.pow(10, len); //100
			var a = Math.round(f*m); //f*m 1236.5
			return parseInt(a,10) / m;
		}
		return(formatFloat(result, first, second));
	},
	/**
	 * 中缀表达式转逆波兰表达式
	 * 
	 * @param {*} str 传入的四则计算
	 * @returns
	 */
	conversion: function(str) {
		//入口文件
		var arr
		if(Array.isArray(str)) {
			arr = str;
		} else {
			// 将传入的str切成数组
			arr = str.split(" ");
		}
		// 堆栈
		var opStack = [];
		// 输出队列
		var reversePolish = [];

		while(arr.length > 0) {
			var temp = arr.shift();
			if(!operation.isOperator(temp)) {
				// 为值
				reversePolish.push(temp);
			} else {
				// 为操作符
				if(temp == "(") {
					opStack.push(temp);
				} else if(temp == ")") {
					// 先取一个栈顶
					var po = opStack.pop();
					while(opStack.length > 0 && po != "(") {
						reversePolish.push(po)
						po = opStack.pop();
					}
					if(po != "(") {
						console.log("输入（ 不匹配")
					}
				} else {
					while(opStack.length > 0 && operation.prioraty(temp, opStack[opStack.length - 1])) {
						reversePolish.push(opStack.pop())
					}
					opStack.push(temp);
				}
			}
		}
		while(opStack.length > 0) {
			reversePolish.push(opStack.pop())
		}
		return operation.reversePolishNotation(reversePolish);
	},
	/**
	 * 逆波兰表达式
	 * 
	 * @param {*} reversePolish 数组进行计算
	 * @returns
	 */
	reversePolishNotation: function(reversePolish) {
		var opStack = [];

		while(reversePolish.length > 0) {
			var temp = reversePolish.shift();
			if(!operation.isOperator(temp)) {
				opStack.push(temp);
			} else {
				if(opStack.length <= 1) {
					console.log("堆栈有误")
				} else {
					var sec = opStack.pop();
					var fir = opStack.pop();
					var result = operation.getResult(fir, sec, temp);
					opStack.push(result)
				}
			}
		}
		if(opStack.length > 1) {
			console.log(opStack)
		} else {
			return opStack[0]
		}
	}
}