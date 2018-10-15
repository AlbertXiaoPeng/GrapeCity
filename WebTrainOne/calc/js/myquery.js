(function(window){
	var $=function(select){
	return new Myquery(select);
}
//选择器
function Myquery(select){
	if(select.indexOf("#")>=0){
		this.eq=this.selects=document.getElementById(select.substring(1))
		return this;
	}else if(select.indexOf(".")>=0){
		this.eq=this.selects=document.getElementsByClassName(select.substring(1))
		return this;
	}else{
		this.eq=this.selects=document.getElementsByTagName(select.substring(1))
		return this;
	}
	
}

Myquery.prototype.html=function(string){
	console.log("html")
	this.eq.innerHTML=string
	return this;
}
Myquery.prototype.text=function(string){
//	console.log("text")
	this.eq.innerText=string
	return this;
}
Myquery.prototype.select=function(num){
	if(num>=this.selects.length || num<0){
		throw("错误")
	}else{
		this.eq=this.selects[num];
	}
	return this;
}
//操作css
//  ========== 
//  = key：css关键字 = 
//  = value：css值 = 
//  ========== 
Myquery.prototype.css=function(key,value){
	if(value==undefined){
		return this.eq.style[key];
	}else{
		this.eq.style[key]=value;
		return this;
	}
}
//事件
//  ========== 
//  = type：事件 = 
//  = fn：函数 = 
//  ==========
Myquery.prototype.on=function(type,fn){
	var types='on'+type;
	this.eq[types]=fn;
	return this;
}
window.$=$;
})(window)
