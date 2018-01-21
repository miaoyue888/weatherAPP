/*
* @Author: Administrator
* @Date:   2018-01-20 09:00:45
* @Last Modified by:   Administrator
* @Last Modified time: 2018-01-20 17:37:23
*/
//1.引入远程数据
//2.关于城市的信息
var city;
var tianqi;
$.ajax({
	url:"https://www.toutiao.com/stream/widget/local_weather/city/",
	dataType:"jsonp",
	method:"get",
	success:function(obj){
		city=obj.data;
		console.log(city);
	}
});
//获取天气信息
$.ajax({
    url:"https://www.toutiao.com/stream/widget/local_weather/data/?city=太原",
    dataType:"jsonp",
    mwthod:"get",
    success:function(obj){
    	tianqi=obj.data;
    	console.log(tianqi);
    }
})
//页面加载函数
window.onload=function(){
    update();


    //页面交互
    var pos=document.getElementsByClassName("pos")[0];
    var cityBox=document.getElementsByClassName("city")[0];
    //点击城市出现城市详情页
    pos.onclick=function(){
    	cityBox.style.display="block";
    }
    //点击城市详情，跳转首页，出现该城市的天气状况
    var BOX=$(".city .citys .con .box");
    for(let i in BOX){
    	BOX[i].onclick=function(){
    		var chengshi=this.innerHTML;
    		//调用AJAX函数
    		AJAX(chengshi);
    		cityBox.style.display="none";
    	}
   
    //搜索部分
    var searchBox=document.getElementsByClassName("searchBox")[0];
    var button=document.getElementsByClassName("button")[0];
    var text;
    searchBox.onfocus=function(){
        button.innerHTML="确认";
        console.log(text);
        
    }
        button.onclick=function(){
        var neirong=button.innerHTML;
        if(neirong=="取消"){
        	var city3=document.getElementsByClassName("city")[0];
        	city3.style.display="none";
        }else{
        	for(let i in city){
        		for(let j in city[i]){
        			if(text==j){
        				AJAX(text);
        				return;
        			}else{
        				alert("没有此城市天气状况");
        				return;
        			}
        		}
        	}

        }
    }
} 

}


//获取点击城市的天气信息函数
function AJAX(str){
	$.ajax({
    url:`https://www.toutiao.com/stream/widget/local_weather/data/?city=${str}`,
    dataType:"jsonp",
    method:"get",
    success:function(obj){
    	tianqi=obj.data;
    	update();
    	var city2=$(".city")[0];
        city2.style.diaplay="none";
       }
    })
}






//获取数据的函数
function update(){
    var pos=document.getElementsByClassName("pos")[0];
    console.log(pos);
    pos.innerHTML=tianqi.city;
    //当前空气质量
    var quality_level=document.getElementsByTagName("h5")[0];
    console.log(quality_level);
    quality_level.innerHTML=tianqi.weather.quality_level;
    //当前温度
    var current_temperature=document.getElementsByClassName("title1")[0];
    console.log(current_temperature);
    current_temperature.innerHTML=tianqi.weather.current_temperature+"°";
    //当前天气状况
    var current_condition=document.getElementsByClassName("title2")[0];
    current_condition.innerHTML=tianqi.weather.current_condition;
    //当前风的湿度
    var wind_direction=document.getElementsByClassName("wind_der")[0];
    wind_direction.innerHTML=tianqi.weather.wind_direction;
    //当前风的等级
    var wind_level=document.getElementsByClassName("wind_level")[0];
    wind_level.innerHTML=tianqi.weather. wind_level+"级"; 
    //今天的天气情况图标
    var today_icon=document.getElementsByClassName("conPic")[0];
    today_icon.style=`background-image:url("img/${tianqi.weather.dat_weather_icon_id}.png")`;
    //明天的天气情况图标
    var tomorrow_icon=document.getElementsByClassName("conPic1")[0];
    tomorrow_icon.style=`background-image:url("img/${tianqi.weather.tomorrow_weather_icon_id}.png")`;




    //获取每小时的天气情况
    var box1=document.createElement("div");
    box1.className="box";
    var wrap=document.getElementsByClassName("wrap")[0];
  //wrap.appendChild(box1);

    var time=document.createElement("div");
    time.className="time";
    box1.appendChild(time);

    var icon=document.createElement("div");
    icon.className="icon";
    box1.appendChild(icon);

    var timeTem=document.createElement("div");
    timeTem.className="timeTem";
    box1.appendChild(timeTem);

    var hourlyArr=tianqi.weather.hourly_forecast;
    var wrap=document.getElementsByClassName("wrap")[0];
    for (let i in hourlyArr){
    	//创建box
    	var box1=document.createElement("div");
        box1.className="box";
        //创建time块
        var time=document.createElement("div");
        //添加类名
        time.className="time";
        //
        box1.appendChild(time);
        //
        time.innerHTML=hourlyArr[i].hour+":00";
        //创建图标块
        var icon=document.createElement("div");
        icon.className="icon";
        box1.appendChild(icon);
        icon.style=`background-image:url("img/${hourlyArr[i].weather_icon_id}.png")`;

        var timeTem=document.createElement("div");
        timeTem.className="timeTem";
        box1.appendChild(timeTem); 
        timeTem.innerHTML=hourlyArr[i].temperature+"°";

        wrap.appendChild(box1);
    } 
    
    //未来15天天气状况
    var dayArr=tianqi.weather.forecast_list;
    var wrap1=document.getElementsByClassName("wrap1")[0];
    for (let i in dayArr){
    	var box2=document.createElement("div");
        box2.className="box";

        var date=document.createElement("div");
        date.className="date";
        box2.appendChild(date); 
        date.innerHTML=dayArr[i].date;

        var weather=document.createElement("div");
        weather.className="weather";
        box2.appendChild(weather); 
        weather.innerHTML=dayArr[i].condition;


        var photo=document.createElement("div");
        photo.className="photo";
        box2.appendChild(photo); 
        photo.style=`background-image:url("img/${dayArr[i].weather_icon_id}.png")`;

        var heighter=document.createElement("div");
        heighter.className="heighter";
        box2.appendChild(heighter); 
        heighter.innerHTML=dayArr[i].high_temperature;

        var lower=document.createElement("div");
        lower.className=" lower";
        box2.appendChild( lower); 
        lower.innerHTML=dayArr[i].low_temperature;

        var wind=document.createElement("div");
        wind.className="wind";
        box2.appendChild(wind); 
        wind.innerHTML=dayArr[i].wind_direction;

        var rank=document.createElement("div");
        rank.className="rank";
        box2.appendChild(rank); 
        rank.innerHTML=dayArr[i].wind_level;
        

        wrap1.appendChild(box2);
    }


    //关于城市的信息
    var city1=document.getElementsByClassName("city")[0];
    for(let i in city){
	    var citys=document.createElement("div");
	    citys.className="citys";

	    var title=document.createElement("div");
	    title.className="title";
	    title.innerHTML=i;
	    citys.appendChild(title);

        var con=document.createElement("div");
        con.className="con";

        for(let j in city[i]){
    	    var box=document.createElement("div");
    	    box.className="box";
    	    box.innerHTML=j;
    	    con.appendChild(box);
        }
        citys.appendChild(con);
        city1.appendChild(citys);
        }
    }





