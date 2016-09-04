// JavaScript Document
//修改部分
function getXmlDom(){
	if(window.ActiveXObject){
			//创建最适合IE浏览器支持的xmldom
		var arr=["MSXML2.DOMDocument.6.0","MSXML2.DOMDocument.5.0","MSXML2.DOMDocument.4.0","MSXML2.DOMDocument.3.0","MSXML2.DOMDocument","Microsoft.XMLDOM"];
			for(var i=0;i<arr.length;i++){
				return new ActiveXObject(arr[i]);
			}
		}else if(document.implementation&&document.implementation.createDocument){
			return document.implementation.createDocument("","",null);
			//三个参数分别为：指定命名空间  跟标签名  doc类型
		}else{
			throw new Error("您的浏览器不支持");
		}
	}	
function xmldom(){
		var xmldom=getXmlDom();
		xmldom.async=false;
		
		//加载xml文档
		xmldom.load("city.xml");
		
		var root=xmldom.documentElement;
		//获取所有的省份
		var pro=root.childNodes;
		
		var sheng=document.getElementById("sheng");
		var city=document.getElementById("city");
		var area=document.getElementById("area");
		var opt;
		//遍历所有的省份，并添加到对象sheng里
		for(var i=0;i<pro.length;i++){
			//判断节点的类型
			
			if(pro[i].nodeType==1){
				opt=document.createElement("option");
				opt.setAttribute("value",pro[i].getAttribute("postcode")+","+pro[i].getAttribute("name"));
				opt.appendChild(document.createTextNode(pro[i].getAttribute("name")));
				sheng.appendChild(opt);
			}
		}
		//当省份改变时，获取所有的城市
		sheng.onchange=function(){
			var shengInfo=sheng.options;//获取所有省份选项
			var num=shengInfo.selectedIndex;//获取当前选中的省份的索引
			//清空市区
			city.length=0;
			area.length=0;
			var cityopt;
			//获取当前选中的省份的编号
			var str=shengInfo[num].getAttribute("value").split(",");
			var scode=str[0];
			
			//遍历所有的省份，并判断
			for(var j=0;j<pro.length;j++){
				if(pro[j].nodeType==1){
					if(scode==pro[j].getAttribute("postcode")){
						var cities=pro[j].childNodes;//获取选中的省份下的所有市
						
						for(var k=0;k<cities.length;k++){
							if(cities[k].nodeType==1){
								cityopt=document.createElement("option");
								cityopt.setAttribute("value",cities[k].getAttribute("postcode"));
								cityopt.appendChild(document.createTextNode(cities[k].getAttribute("name")));
								city.appendChild(cityopt);
								
								if(k==0){
									var qus=cities[0].childNodes;
									for(var p=0;p<qus.length;p++){
										if(qus[p].nodeType==1){
											cityopt=document.createElement("option");
											cityopt.setAttribute("value",qus[p].getAttribute("postcode"));
											cityopt.appendChild(document.createTextNode(qus[p].getAttribute("name")));
											area.appendChild(cityopt);
										}
									}
								}
							}
						}
						break;
					}
				}
			}
		}
		//当城市改变时，获取所有的地区
		city.onchange=function(){
			var shis=city.options;
			var cityindex=shis.selectedIndex; 
			var citycode=shis[cityindex].getAttribute("value");
			area.length=0;
			for(var m=0;m<pro.length;m++){
				if(pro[m].nodeType==1){
					var citys=pro[m].childNodes;
					
					for(var n=0;n<citys.length;n++){
						if(citys[n].nodeType==1){
							var codes=citys[n].getAttribute("postcode");
							if(codes==citycode){
								var areas=citys[n].childNodes;
								var areasopt;
								for(var h=0;h<areas.length;h++){
									if(areas[h].nodeType==1 ){
										areasopt=document.createElement("option");
										areasopt.setAttribute("value",areas[h].getAttribute("name"));
										areasopt.appendChild(document.createTextNode(areas[h].getAttribute("name")));
										area.appendChild(areasopt);
									}
								}
								break;
							}
						}
					}
				}
			}
		}
	}
	window.onload=xmldom;
	function change(){
		$("#change").css("display","block");
		$("#bg").css("display","block");
	}
	
	function quxiao(){
		$("#change").css("display","none");
		$("#bg").css("display","none");
	}
	
	function xiugai(){
		var shengs=$("#sheng").val().split(",");
		var sheng=shengs[1];
		var area=$("#area").val();
		
		$("#jiguan").html(sheng+area+"<input type='button' value='修改' onclick='change()'>");
		$("#change").css("display","none");
		$("#bg").css("display","none");
	}
	
	function guoji(){
		$("#cguoji").css("display","block");
		$("#bg").css("display","block");
	}
	
	function zhengshuxiugai(){
		var str=document.getElementsByName("guoji");
		
		var str1="";
		for(var i=0;i<str.length;i++){
			if(str[i].checked==true){
				str1=str[i].value+"、"+str1;
			}
		}
		var str2=$("#yiguo").html();
		$("#cguoji").css("display","none");
		$("#bg").css("display","none");
	
		$("#yiguo").html(str1+str2);
	}
	function zhengshuquxiao(){
		$("#cguoji").css("display","none");
		$("#bg").css("display","none");
	}
	
	function kaozheng(){
		$("#ckaozheng").css("display","block");
		$("#bg").css("display","block");
	}
	
	function kaozhengxiugai(){
		var str=document.getElementsByName("kaozheng");
		
		var str1="";
		for(var i=0;i<str.length;i++){
			if(str[i].checked==true){
				str1=str[i].value+"、"+str1;
			}
		}
		var str2=$("#yikao").html();
		$("#ckaozheng").css("display","none");
		$("#bg").css("display","none");
	
		$("#yikao").html(str1+str2);	
	}
	
	function kaozhengquxiao(){
		$("#ckaozheng").css("display","none");
		$("#bg").css("display","none");	
	}
	
	function checkover(){
		$("#check").css("background-image","url(images/yello1.png)");	
	}
	function checkout(){
		$("#check").css("background-image","url(images/yello.png)");	
	}