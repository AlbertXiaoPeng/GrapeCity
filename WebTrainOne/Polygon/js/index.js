window.onload=function(){
	function Polygon(width,height){
		this.width=width;
		this.height=height;
		return this;
	}
	Polygon.prototype.perimeter=function(){
		return Number(Number(this.width)*2)+Number(Number(this.height)*2);
	}
	Polygon.prototype.area=function(){
		return Number(this.width)*Number(this.height);
	}
	
	function Triangle(width,height,name){
		this.name=name;
		Polygon.apply(this,arguments);
	}
	
	Triangle.prototype=Object.create(Polygon.prototype);
	Triangle.prototype.constructor=Triangle;
	
	Triangle.prototype.perimeter=function(){
		var temp=Number(Number(this.width)*2)+Number(Number(this.height)*2);
		return this.name+temp;
	}
	Triangle.prototype.area=function(){
		var temp=Number(this.width)*Number(this.height);
		return this.name+temp;
	}
	
	
	window.Polygon=Polygon;
	window.Triangle=Triangle;
}
