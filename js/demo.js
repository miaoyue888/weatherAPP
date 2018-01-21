var aa=123;
console.log(aa);
//当页面加载的时候
window.onload=function(){
	//当点击按钮出现弹框
	var button=document.getElementsByClassName("button");
	console.log(button);
	button[0].onclick=function(){
		//alert("这是一个按钮")；
		var city=document.getElementsByClassName("city");
		console.log(city);
		city[0].style.display="none";
	}
	//获取事件
	var pos=document.getElementsByClassName("pos");
	//点击事件
	pos[0].onclick=function(){
		var city=document.getElementsByClassName("city");
		console.log(city);
		city[0].style.display="block";
	}
}
//js
//1.当整个页面加载完成时才能对元素进行操作；
//2.获取元素：document.getElementByClassName("")[0];
//3.添加事件函数
//4.进行样式操作
$.ajax({
	url:"https://www.toutiao.com/stream/widget/local_weather/city/",
	dataType:"jsonp",
	method:"get",
	success:function(obj){
		console.log(obj);
		var city=obj.data;
		console.log(city);
	   }
	})
//关于天气的数据
$.ajax({
	url:"https://www.toutiao.com/stream/widget/local_weather/data/?city=太原",
	dataType:"jsonp",
	method:"get",
	success:function(obj){
		var tianqi=obj.data;
		console.log(tianqi);
		console.log(tianqi.weather.current_temperature);
		console.log(tianqi.weather.tomorrow_low_temperature);
	   }
	})
	
