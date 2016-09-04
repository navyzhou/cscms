
var lp_adminId;
var lp_adminName;
var lp_role;
//根据角色不同刷出不同菜单栏
window.onload=function(){
	
	$.getJSON("AdminLogin_right.action",function(data){
		var text="";
		var role=data.admin[0].temp1;
		lp_role=data.admin[0].temp1;
		if(data!=""){
			if("超级管理员"==role){
				text="<button type='button' class='zxk_mag btn btn-lg btn-primary' style='width: 153px;' disabled='disabled'>模块管理</button><div class='btn-group zxk_mag'><button type='button' class='btn btn-info dropdown-toggle btn-lg' data-toggle='dropdown'>授权管理模块<span id='mycaret'></span></button><ul class='dropdown-menu zxk_work_mag' role='menu'><li><a href='javascript:adminAlter(1)'>用户审核</a></li><li class='divider'></li><li><a href='javascript:adminbackadd()'>用户添加</a></li><li class='divider'></li><li><a href='javascript:adminbackright2(1)'>用户管理</a></li> </ul></div>  <div class='btn-group zxk_mag'><button type='button' class='btn btn-info dropdown-toggle btn-lg' data-toggle='dropdown'>数据备份还原<span id='mycaret'></span></button><ul class='dropdown-menu zxk_work_mag' role='menu'><li><a href='javascript:backupadnbackup()'>数据备份</a></li><li class='divider'></li><li><a href='javascript:backupadnresore()'>数据还原</a></li></ul></div>  <div class='btn-group zxk_mag'><button type='button' class='btn btn-info dropdown-toggle btn-lg' data-toggle='dropdown'>个人密码修改<span id='mycaret'></span></button><ul class='dropdown-menu zxk_work_mag' role='menu'><li><a href='javascript:adminchangepwd()'>修改密码</a></li>  <li class='divider'></li>  </ul></div>";
				$("#left").html(text);
				displayNone();
			}else if("学工处"==role){
				text="<button type='button' class='zxk_mag btn btn-lg btn-primary' style='width: 153px;' disabled='disabled'>模块管理</button><div class='btn-group zxk_mag'><button type='button' class='btn btn-info dropdown-toggle btn-lg' data-toggle='dropdown'>授权管理模块<span id='mycaret'></span></button><ul class='dropdown-menu zxk_work_mag' role='menu'><li><a href='javascript:adminAlter(1)'>用户审核</a></li><li class='divider'></li><li><a href='javascript:adminbackright2(1)'>用户管理</a></li> </ul></div>  <div class='btn-group zxk_mag'><button type='button' class='btn btn-info dropdown-toggle btn-lg' data-toggle='dropdown'>学生信息查询<span id='mycaret'></span></button><ul class='dropdown-menu zxk_work_mag' role='menu'><li><a href='javascript:findStuInfoShow()'>学生信息查询</a></li> </ul></div> <div class='btn-group zxk_mag'><button type='button' class='btn btn-info dropdown-toggle btn-lg' data-toggle='dropdown'>宿舍信息管理<span id='mycaret'></span></button><ul class='dropdown-menu zxk_work_mag' role='menu'>  <li><a href='javascript:findKongdou(1)'>查询空宿舍</a></li>   <li class='divider'></li>  <li><a href='#' onclick='zxkcxalreadyss()' >查询已分配宿舍</a></li> <li class='divider'></li>  <li><a href='#' onclick='zxkxgcssdr()' >宿舍导入</a></li> <li class='divider'></li>  <li><a href='#' onclick='zxksshuishou()' >宿舍回收</a></li> </ul></div>   <div class='btn-group zxk_mag'><button type='button' class='btn btn-info dropdown-toggle btn-lg' data-toggle='dropdown'>数据字典信息<span id='mycaret'></span></button><ul class='dropdown-menu zxk_work_mag' role='menu'><li><a href='javascript:showDataDictonary()'>数据字典查询</a></li></ul></div>" +
						"<div class='btn-group zxk_mag'><button type='button' class='btn btn-info dropdown-toggle btn-lg' data-toggle='dropdown'>学生心理跟踪<span id='mycaret'></span></button><ul class='dropdown-menu zxk_work_mag' role='menu'><li><a href='javascript:showStuPsyInfoList()'>学生心理跟踪</a></li><li class='divider'></li><li><a href='javascript:findFollowStuPsys()'>学生心理跟踪查询</a></li></ul></div>" +
						"<div class='btn-group zxk_mag'><button type='button' class='btn btn-info dropdown-toggle btn-lg' data-toggle='dropdown'>个人密码修改<span id='mycaret'></span></button><ul class='dropdown-menu zxk_work_mag' role='menu'><li><a href='javascript:adminchangepwd()'>修改密码</a></li><li class='divider'></li></ul></div>   <div class='btn-group zxk_mag'><button type='button' class='btn btn-info dropdown-toggle btn-lg' data-toggle='dropdown'>数据支持查询<span id='mycaret'></span></button><ul class='dropdown-menu zxk_work_mag' role='menu'><li><a href='alldata.html' target='_block' >数据ID查询</a></li> </ul></div>";
				$("#left").html(text);
			}else if("书记"==role){
				text="<button type='button' class='zxk_mag btn btn-lg btn-primary' style='width: 153px;' disabled='disabled'>模块管理</button><div class='btn-group zxk_mag'><button type='button' class='btn btn-info dropdown-toggle btn-lg' data-toggle='dropdown'>授权管理模块<span id='mycaret'></span></button><ul class='dropdown-menu zxk_work_mag' role='menu'><li><a href='javascript:adminAlter(1)'>用户审核</a></li><li class='divider'></li><li><a href='javascript:adminbackright(1)'>用户管理</a></li> </ul></div> <div class='btn-group zxk_mag'><button type='button' class='btn btn-info dropdown-toggle btn-lg' data-toggle='dropdown'>学生信息查询<span id='mycaret'></span></button><ul class='dropdown-menu zxk_work_mag' role='menu'><li><a href='javascript:findStuInfoShow()'>学生信息查询</a></li> <li class='divider'></li>  <li><a href='#' onclick='zxkcxkfpssshow()' >可分配宿舍查询</a></li> </ul></div> <div class='btn-group zxk_mag'><button type='button' class='btn btn-info dropdown-toggle btn-lg' data-toggle='dropdown'>信息批量导入<span id='mycaret'></span></button><ul class='dropdown-menu zxk_work_mag' role='menu'><li><a href='javascript:batchUploadShow()'>信息批量导入</a></li>  <li class='divider'></li>  <li><a data-toggle=\"modal\" data-target=\"#typeExcelModel\" href='javascript:showTypeExcel()'>模板表格下载</a></li></ul></div>     <div class='btn-group zxk_mag'><button type='button' class='btn btn-info dropdown-toggle btn-lg' data-toggle='dropdown'>数据字典信息<span id='mycaret'></span></button><ul class='dropdown-menu zxk_work_mag' role='menu'><li><a href='javascript:showDataDictonary()'>数据字典查询</a></li></ul></div>" +
					 "<div class='btn-group zxk_mag'><button type='button' class='btn btn-info dropdown-toggle btn-lg' data-toggle='dropdown'>学生心理跟踪<span id='mycaret'></span></button><ul class='dropdown-menu zxk_work_mag' role='menu'><li><a href='javascript:showStuPsyInfoList()'>学生心理跟踪</a></li><li class='divider'></li></ul></div> " +
					 "<div class='btn-group zxk_mag'><button type='button' class='btn btn-info dropdown-toggle btn-lg' data-toggle='dropdown'>个人密码修改<span id='mycaret'></span></button><ul class='dropdown-menu zxk_work_mag' role='menu'><li><a href='javascript:adminchangepwd()'>修改密码</a></li><li class='divider'></li></ul></div>    <div class='btn-group zxk_mag'><button type='button' class='btn btn-info dropdown-toggle btn-lg' data-toggle='dropdown'>数据支持查询<span id='mycaret'></span></button><ul class='dropdown-menu zxk_work_mag' role='menu'><li><a href='alldata.html' target='_block' >数据ID查询</a></li> </ul></div>  ";
				$("#left").html(text);
			}else if("保卫处"==role){
				text="<button type='button' class='zxk_mag btn btn-lg btn-primary' style='width: 153px;' disabled='disabled'>模块管理</button><div class='btn-group zxk_mag'><button type='button' class='btn btn-info dropdown-toggle btn-lg' data-toggle='dropdown'>学生信息查询<span id='mycaret'></span></button><ul class='dropdown-menu zxk_work_mag' role='menu'><li><a href='javascript:findStuInfoShow()'>学生信息查询</a></li> </ul></div>     <div class='btn-group zxk_mag'><button type='button' class='btn btn-info dropdown-toggle btn-lg' data-toggle='dropdown'>宿舍信息查询<span id='mycaret'></span></button><ul class='dropdown-menu zxk_work_mag' role='menu'><li><a href='#'>宿舍信息查询</a></li><li class='divider'></li> </ul></div>  <div class='btn-group zxk_mag'><button type='button' class='btn btn-info dropdown-toggle btn-lg' data-toggle='dropdown'>个人密码修改<span id='mycaret'></span></button><ul class='dropdown-menu zxk_work_mag' role='menu'><li><a href='javascript:adminchangepwd()'>修改密码</a></li><li class='divider'></li></ul></div>  <div class='btn-group zxk_mag'><button type='button' class='btn btn-info dropdown-toggle btn-lg' data-toggle='dropdown'>数据支持查询<span id='mycaret'></span></button><ul class='dropdown-menu zxk_work_mag' role='menu'><li><a href='alldata.html' target='_block' >数据ID查询</a></li> </ul></div>";
				$("#left").html(text);
			}else if("辅导员"==role){
				text="<button type='button' class='zxk_mag btn btn-lg btn-primary' style='width: 153px;' disabled='disabled'>模块管理</button><div class='btn-group zxk_mag'><button type='button' class='btn btn-info dropdown-toggle btn-lg' data-toggle='dropdown'>基本信息查询<span id='mycaret'></span></button><ul class='dropdown-menu zxk_work_mag' role='menu'><li><a href='javascript:findStuInfoShow()'>学生信息查询</a></li>   <li class='divider'></li><li><a href='javascript:LpHonerShow()'>学生荣誉查询</a></li> <li class='divider'></li><li><a href='javascript:workwindowShow()'>就业信息查询</a></li>  <li class='divider'></li> <li><a href='javascript:jhelpwindowShow()'>贷款信息查询</a></li> <li class='divider'></li> <li><a href='javascript:jien_jobwindowShow()'>勤工助学查询</a></li> </ul></div>   <div class='btn-group zxk_mag'><button type='button' class='btn btn-info dropdown-toggle btn-lg' data-toggle='dropdown'>过级考证查询<span id='mycaret'></span></button><ul class='dropdown-menu zxk_work_mag' role='menu'>  <li onclick='showAllCice()'><a href='javascript:CcieInfo()'>证书信息查询</a></li>  <li class='divider'></li><li><a href='javascript:showCetDiv()'>英语过级查询</a></li>  </ul></div>     <div class='btn-group zxk_mag'><button type='button' class='btn btn-info dropdown-toggle btn-lg' data-toggle='dropdown'>处分信息查询<span id='mycaret'></span></button><ul class='dropdown-menu zxk_work_mag' role='menu'> <li><a href='javascript:findaccomchufen()'>宿舍处分查询</a></li>  <li class='divider'></li><li><a href='javascript:findxueshengcf()'>学生处分查询</a></li>  </ul></div>     <div class='btn-group zxk_mag'><button type='button' class='btn btn-info dropdown-toggle btn-lg' data-toggle='dropdown'>信息添加模块<span id='mycaret'></span></button><ul class='dropdown-menu zxk_work_mag' role='menu'> <li><a href='javascript:addSdInfoShow()'>学生信息添加</a></li><li class='divider'></li> <li><a href='javascript:addImgBatch()'>头像批量导入</a></li></ul></div>" +
				" <div class='btn-group zxk_mag'><button type='button' class='btn btn-info dropdown-toggle btn-lg' data-toggle='dropdown'>学生心理跟踪<span id='mycaret'></span></button><ul class='dropdown-menu zxk_work_mag' role='menu'><li><a href='javascript:showStuPsyInfoList()'>查看已关注的学生</a></li></ul></div>" +
				" <div class='btn-group zxk_mag'><button type='button' class='btn btn-info dropdown-toggle btn-lg' data-toggle='dropdown'>个人密码修改<span id='mycaret'></span></button><ul class='dropdown-menu zxk_work_mag' role='menu'><li><a href='javascript:adminchangepwd()'>修改密码</a></li><li class='divider'></li></ul></div>  <div class='btn-group zxk_mag'><button type='button' class='btn btn-info dropdown-toggle btn-lg' data-toggle='dropdown'>数据支持查询<span id='mycaret'></span></button><ul class='dropdown-menu zxk_work_mag' role='menu'><li><a href='alldata.html' target='_block' >数据ID查询</a></li> </ul></div>";
				$("#left").html(text);
			}
			$("#realname").val(data.admin[0].aname);
			$("#telnum").val(data.admin[0].phone);
			$("#emailaddr").val(data.admin[0].email);
			$("#qqnum").val(data.admin[0].qq);
			$("#adminsaid").val(data.admin[0].aid);
			$("#admininfoshow").text(role+" - "+data.admin[0].aname);
			
			lp_adminId=data.admin[0].aid;
			lp_adminName=data.admin[0].aname;
			
		}
	});
}

//前一页
function zxk_previous(id){
	if(count<=0){
		alert("已经是第一页");
		count=1;
		return;
	}else{
		if(id==3){
			adminbackright2(count);
		}else if(id==1){
			adminbackright(count);
		}else if(id==2){
			adminAlter(count);
		}
	}
}
//下一页
function zxk_next(id){
	if(count>=(Math.ceil(sizes/pageSize))+1){
		count=Math.ceil(sizes/pageSize);
		alert("已经是最后一页");
		return;
	}else{
		if(id==3){
			adminbackright2(count);
		}else if(id==1){
			adminbackright(count);
		}else if(id==2){
			adminAlter(count);
		}
	}
}
//首页
function zxk_fist(id){
	if(id==3){
		adminbackright2(count);
	}else if(id==1){
		adminbackright(count);
	}else if(id==2){
		adminAlter(count);
	}
	count=1;
}
//最后一页
function zxk_end(id){
	if(id==3){
		adminbackright2(Math.ceil(sizes/pageSize));
	}else if(id==1){
		adminbackright(Math.ceil(sizes/pageSize));
	}else if(id==2){
		adminAlter(Math.ceil(sizes/pageSize));
	}
	count=Math.ceil(sizes/pageSize);
}
//goTo
function zxk_goToPage(id){
	var zxk_stuFenyeGoTo=$('.zxk_stuFenyeGoTo').val().trim();
	var checkNum=/^[0-9]*[1-9][0-9]*$/;
	if(zxk_stuFenyeGoTo==""){
		alert("跳转页为空！");
		return;
	}
	if(!checkNum.test(zxk_stuFenyeGoTo)){
		alert("跳转页格式不对！请输入有效数字(正整数)");
		return;
	}
	if(zxk_stuFenyeGoTo>=Math.ceil(sizes/5)+1){
		alert("请求的页数不存在！最大页数为："+(Math.ceil(sizes/5)));
		return;
	}
	if(zxk_stuFenyeGoTo==Math.ceil(zxk_stuFenyeGoTo/2) && zxk_stuFenyeGoTo!=1){
		alert("您正在当前页");
		return;
	}
	//重新调用前台分页
	var currenpages=zxk_stuFenyeGoTo-1;
	var endPages=(40/5)*(count);
	
	if(zxk_stuFenyeGoTo>((40/5)*(count-1)+1) &&  zxk_stuFenyeGoTo<= endPages   ){
		$('table.mytable').find('tbody tr').hide()
		.slice(currenpages * 5,(currenpages+1) * 5)
		.show();
	//8为前台每页条数
	}else if(zxk_stuFenyeGoTo<=5){
	//currenpages为想要跳转的页，2为numpapers前台每页大小，相除向上取整得到跳转页所在后台分页的区间
		zxk_fist(id);
	}else{
		zxk_stuFenyeGoTo=Math.ceil(zxk_stuFenyeGoTo/8);
		count=zxk_stuFenyeGoTo;
		if(id==3){
			adminbackright2(count);
		}else if(id==1){
			adminbackright(count);
		}else if(id==2){
			adminAlter(count);
		}
	}
}
//前台分页操作
function AdmFenye(tableName,todiv,id){
	//'table.mytable'
	$('#myFenye').css("display","block");   //分页页面
	$(tableName).each(function(){
		var currentPage=0;
		var numPaper=5;
		var pageUser=function(){
			$(tableName).find('tbody tr').hide()
				.slice(currentPage * numPaper,(currentPage+1) * numPaper)
				.show();
		};
		pageUser();
		var numRows=$(this).find('tbody tr').length;
		var numPages=Math.ceil(numRows/numPaper);
		var backnumPages=Math.ceil(sizes/pageSize);
		var $page=$('<ul class="pagination"></ul>');
		
		$('<li><a href="javascript:zxk_fist('+id+')">首页</a></li>').appendTo($page);
		if(count>=1){
			$('<li><a href="javascript:zxk_previous('+id+')">&laquo;</a></li>').bind('click',function(){
		 		count--;
		 	}).appendTo($page);
 		}else{
 	
 			$('<li><a>&laquo;</a></li>').appendTo($page);   
 		}				//4为后台每页条数
		var eachHeadNum=(pageSize/numPaper)*(count-1)+1;
		for(var page=0;page<numPages;page++){
			$('<li><a id="fenYe"></a></li>').find('a').text(page+eachHeadNum).end()
			.bind('click',{newPage:page},function(event){
				currentPage=event.data['newPage'];
				pages=event.data['newPage'];
				$(this).addClass('active').siblings().removeClass('active');
				$('#temp a').text("当前是第："+(pages+eachHeadNum)+"/"+Math.ceil(sizes/5)+"页");
				pageUser();
			}).appendTo($page).addClass('clickable');
		}	
		if(count<=backnumPages){
			$('<li><a href="javascript:zxk_next('+id+')">&raquo;</a></li>').bind('click',function(){
 		 		count++;
 		 	}).appendTo($page);
 		}else{
 	
 			$('<li><a>&raquo;</a></li>').appendTo($page);
 		}
		
	 	$('<li><a href="javascript:zxk_end('+id+')">末页</a></li>').appendTo($page);
	 	$('<li id="temp"><a>当前页面</a></li>').appendTo($page);
	 	$('<li><input type="text" class="zxk_stuFenyeGoTo" style="width:40px;height:30px;margin-top:2px;"></li>').appendTo($page);
	 	$('<li>页</li>').appendTo($page);
	 	$('<li><a href="javascript:zxk_goToPage('+id+')">GO</a></li>').appendTo($page);
   	 	//'#myFenye'
		$(todiv).html($page);
	});
}

//这里写一个所有窗口隐藏的函数
function displayNone(){
	$("#showStudentDetilInfo").css("display","none");  //学生页面隐藏
	$("#zxk_maintable").css("display","none");    //查询学生数据table
	$('#myFenye').css("display","none");   //分页页面
	$("#querywindow").css("display","none");  //查询窗口
	$("#querywindow_1").css("display","none");  //查询窗口
	$("#lp_stuPsyInfo").css("display","none"); 
	$("#lp_stuPsyShows").css("display","none"); //查询学生心理信息
	$("#addSdInfo").css("display","none");  //添加学生信息
	$("#jien-batch").css("display","none");  //批量上传页面
	$("#changepwdwindow").css("display","none");//修改密码页面
	$("#jhelpwindow").css("display","none");  //贷款信息界面
	$("#lp_searchHonour").css("display","none");  //荣誉信息界面 lp_searchHonourDetail
	$("#zxk_dataDictonray").css("display","none");   //数据字典页面
	$("#zxk_dataAccommdation").css("display","none");  //宿舍页面
	$("#zxk_xiugaiQinshi").css("display","none");
	$("#stuPsyTitle").css("display","none");
	$("#jien_jobwindow").css("display","none");  //勤工助学主页面
	$("#zxk-sushe-batch").css("display","none");
	$("#addImages").css("display","none");//图片批量导入
	$("#zxk_sushechufen").css("display","none");//查询宿舍处分信息
	$("#jworkwindow").css("display","none"); //就业主页面
	$("#zxk_xschufen").css("display","none");//查询学生处分信息
	$("#showCcieInfo").css("display","none");//学生证书信息
    $("#cetDiv").css("display", "none");//英语考证信息
    $("#zxk_dataAccommdation1").css("display", "none");  //学工处查询已分配宿舍
//	$('#myFenye').html("");   //分页页面
    $('#lp_followStuInfo').css("display", "none");
}

function addImgBatch(){
	displayNone();	
	$("#addImages").css("display","block");//图片批量导入
}
function findStuInfoShow(){
	displayNone();
	$("#querywindow").css("display","block");
	$("#zxk_maintable").html(""); 
	$("#zxk_maintable").css("display","block");    //修改密码页面
	$('#myFenye').css("display","block");   //分页页面
	$("#myFenye").html(""); 
}
//学生心理的信息
$(function(){
	$('#querywindow_1').css("display","none");
});
//显示心理查询
function stuPsy(){
	displayNone();
	$('#querywindow_1').css("display","block");
}
//打开添加学生信息的页面
function addSdInfoShow(){
	displayNone();
	var text = "<button type='button' class='btn btn-lg btn-default' disabled='disabled'>单个学生基本信息添加</button>";
	$(".navbar-static-top").html(text);
	$("#addSdInfo").css("display","block");
}
//打开证书信息查询的div
function CcieInfo(){
	displayNone();
	$("#showCcieInfo").css("display","block");
}
//打开批量上传的页面
function batchUploadShow(){
	displayNone();  //在打开页面之前 先隐藏所有的界面
	text="<button type='button' class='btn btn-lg btn-default' disabled='disabled'>学生信息批处理管理</button>";
	$(".navbar-static-top").html(text);
	$("#jien-batch").css("display","block");
}
//管理员赋权查询
function adminAlter(id){
	displayNone();
	var pageNum=id;
	$.getJSON("AdminLogin_adminAlter.action?t="+new Date(),{'pageNum':pageNum,'pageSize':pageSize},function(data){
		var text="";
		var ddd=data.adminAlter[0].temp1;
		if(data.adminAlter[0].aname==""){
			alert(ddd);
			$("#zxk_maintable").css("display","block");
			$("#zxk_maintable").html("");
			$('#myFenye').html("");
		}else{
			text="<nav class='navbar navbar-static-topzxk' role='navigation'><button class='btn btn-lg btn-default' disabled='disabled' type='button'>管理员赋权</button></nav>";
			text+="<table class='table mytable table-condensed table-hover table-striped' style='margin-left:10px;'><thead><tr><td class='titleBgColor'>角色名</td><td class='titleBgColor'>姓名</td><td class='titleBgColor'>申请权限</td><td class='titleBgColor'>申请信息</td><td class='titleBgColor'>操作</td></tr></thead><tbody>";
			$.each(data.adminAlter,function(index,item){
				text+="<tr id='trs"+item.aid+"'><td valign='middle' class='js-Order'>"+item.urname+"</td><td valign='middle' class='js-Name'>"+item.aname+"</td><td valign='middle' class='js-Code'><abbr title='"+item.urname+"'>"+item.urname+"</abbr></td><td valign='middle' class='js-Code'><abbr title='"+item.reason+"'>"+item.reason+"</abbr></td><td valign='middle' class='js-Order'> <button type='button' class='btn btn-info' onclick='adminpass("+item.aid+")'>通过</button> <button type='button' class='btn btn-warning' data-toggle='modal' data-target='#myModals' onclick='bohui("+item.aid+")'>驳回</button> </td>  </tr>";
			});
			$.each(data.allpageSize,function(index,entry){
				sizes=entry;
			});
			text+="</tbody></table>";
			$('#myFenye').html("");
			$("#zxk_maintable").css("display","block");
			$("#zxk_maintable").html(text);
			AdmFenye("#zxk_maintable","#myFenye",2);
		}
	});
}
//驳回管理员申请
function adminbohui(){
	var reason=$("#bohuiliyou").val();
	var aid=$("#hiddenbohuiid").val();
	$.getJSON("AdminLogin_adminSheHe.action?t="+new Date(),{'adminInfo.aid':aid,'adminInfo.flag':0,'adminInfo.reason':reason},function(data){
		if(parseInt(data)>0){
			alert("已驳回该申请!");
			$("#trs"+aid).remove();
		}else{
			alert("驳回失败，请重试...");
		}
		
	});
}
//前台分页无后台（用于管理备份文件）
function fenye(tableName,todiv){
	//'table.mytable'
	$(tableName).each(function(){
		var currentPage=0;
		var numPaper=7;
		var pageUser=function(){
			$(tableName).find('tbody tr').hide()
				.slice(currentPage * numPaper,(currentPage+1) * numPaper)
				.show();
		};
		pageUser();
		var numRows=$(this).find('tbody tr').length;
		var numPages=Math.ceil(numRows/numPaper);
		var $page=$('<ul class="pagination"></ul>');
		$('<li><a href="#">首页</a></li>').appendTo($page);
		$page.append('<li><a href="#">&laquo;</a></li>');
		for(var page=0;page<numPages;page++){
			$('<li><a id="fenYe"></a></li>').find('a').text(page+1).end()
			.bind('click',{newPage:page},function(event){
				currentPage=event.data['newPage'];
				pageUser();
			}).appendTo($page).addClass('fenyes');
		}		
	 	$page.append('<li><a href="#">&raquo;</a></li>');
	 	$('<li><a href="#">末页</a></li>').appendTo($page);
	 	$('<li><input type="text" style="width:40px;height:30px;margin-top:2px;"></li>').appendTo($page);
	 	$('<li><a href="#">GO</a></li>').appendTo($page);
	 	
	 	$(todiv).css("display","block");
		$(todiv).html($page);
	});
}

//验证驳回信息是否为空
function checkbohuireason(){
	var reason=$("#bohuiliyou").val();
	if(""==reason){
		alert("驳回信息不能为空!!!");
		return;
	}else{
		$("#alterbtn111").attr("disabled",false);
	}
}
//驳回
function bohui(id){
	$("#hiddenbohuiid").val(id);
}
//管理员赋权通过
function adminpass(id){
	$.getJSON("AdminLogin_adminSheHe.action?t="+new Date(),{'adminInfo.aid':id,'adminInfo.flag':1},function(data){
		if(parseInt(data)>0){
			alert("赋权成功!");
			$("#trs"+id).remove();
		}else{
			alert("赋权失败，请重试...");
		}
		
	});
}
//管理员注销
function adminloginoutouts(){
	$("#adminloginout").attr("disabled",false);
}
function loginout(){    //确认框
	var a = window.confirm("你真的要退出登录吗?"); 
	if(a){
		loginouts();
	}else{
		return;
	}
}
//注销操作
function loginouts(){
	$("#adminloginout").attr("disabled",true);
	timename=setTimeout("adminloginoutouts();",3000);
	$.getJSON("AdminLogin_loginOut.action?t="+new Date(),function(data){
		if(parseInt(data)>0){
			location.href="/cscms/login.html";
			return;
		}else{
			location.href="/cscms/login.html";
			return;
		}
	});
}
//修改个人信息
function changeinfo(){
	var name=$("#realname").val();
	var tel=$("#telnum").val();
	var addr=$("#emailaddr").val();
	var qq=$("#qqnum").val();
	var aid=$("#adminsaid").val();
	$.getJSON("AdminLogin_changeInfo.action",{'adminInfo.aname':name,'adminInfo.phone':tel,'adminInfo.qq':qq,'adminInfo.email':addr,'adminInfo.aid':aid},function(data){
		if(parseInt(data)>0){
			alert("修改成功!");
		}else{
			alert("修改失败，请重试！");
		}
		
	});
}
//修改密码
function adminchangepwd(){
	displayNone();
	var text="<button type='button' class='btn btn-lg btn-default' disabled='disabled'>管理员密码修改</button>";
	$(".navbar-static-top").html(text);
	text="";
	
	text="<br /><br /><form class='form-group col-lg-8 col-lg-offset-1' action='' method='post' role='form' ><div class='input-group'><label for='oldpwd' class='input-group-addon'><font color=red>* </font>原&nbsp;&nbsp;密&nbsp;&nbsp;&nbsp;码</label><input type='password' class='form-control' name='oldpwd' id='oldpwd' onblur='checkoldpwd()' required  placeholder='请输入原密码' maxlength='16'/> <label class='input-group-addon promptinfo' id='ckoldpassword'>请输入原来的密码...</label></div><br /><div class='input-group'><label for='newpwd' class='input-group-addon'><font color=red>* </font>新&nbsp;&nbsp;密&nbsp;&nbsp;码</label><input type='password' class='form-control' name='newpwd' id='newpwd' onblur='checknewspwd()' required  placeholder='请输入原密码' maxlength='16'/> <label class='input-group-addon promptinfo' id='cknewpassword'>由6-16位的字母、数字和下划线组成</label></div><br /><div class='input-group'><label for='pwdagain' class='input-group-addon'><font color=red>* </font>确认密码</label><input type='password' class='form-control' name='pwdagain' id='pwdagain' onblur='checkoldpwdagain()' required placeholder='请再输入一次密码，以确认' maxlength='16'/><label class='input-group-addon promptinfo' id='ckpasswordagain' >请再输入一次密码，以确认</label></div><br/><div class='input-group'><input type='button' disabled='true' id='btn_zxk_pwd' onclick='adminbackchangepwd()' value='修改' class='btn btn-success user-register' />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type='reset' value='重置' class='btn btn-danger mybtn'/></div></form>";
	$("#changepwdwindow").css("display","block");
	$("#changepwdInfo").html(text);
	
	
//	text+="<form class='form-horizontal' style='margin-top:70px; margin-left:90px;' role='form'><div class='form-group'><label for='oldpwd' class='col-sm-2 control-label'>原密码</label><div class='col-sm-7'><input type='password' class='form-control' id='oldpwd' placeholder='原密码' onblur='checkoldpwd()' ></div></div> <div class='form-group'><label for='newpwd' class='col-sm-2 control-label'>新密码</label><div class='col-sm-7'> <input type='password' class='form-control' id='newpwd' onblur='checknewspwd()' placeholder='新密码'></div></div><div class='form-group'><label for='pwdagain' class='col-sm-2 control-label'>重新输入新密码</label><div class='col-sm-7'><input type='password' class='form-control' id='pwdagain' onblur='checkoldpwdagain()' placeholder='重新输入'></div></div> <div class='form-group'> <div class='col-sm-offset-2 col-sm-10'><button type='button' id='btn_zxk_pwd' class='btn btn-info btn-lg' disabled='true' onclick='adminbackchangepwd()'>修改</button></div></div></form>";
//	$("#zxk_maintable").css("display","block");
//	$("#zxk_maintable").html(text);
}
//验证原密码
function checkoldpwd(){
	var pwd=$("#oldpwd").val();
	$.getJSON("AdminLogin_oldPwd.action",{'adminInfo.pwd':pwd},function(data){
		if(parseInt(data)<0){
			$("#oldpwd").val("");
			$("#oldpwd").attr("placeholder","原密码错误，请重新填写...");
			$("#ckoldpassword").text("原密码错误，请重新填写...");
			$("#ckoldpassword").css("color","#FF0000");
		}else{
			$("#ckoldpassword").text("原密码正确，可执行下一步!");
			$("#ckoldpassword").css("color","#008000");
		}
	});
}
//验证新 码的格式
function checknewspwd(){
	var pwd=$("#newpwd").val();
	var reg=/^([a-zA-Z0-9_-]{6,16})/;
	if(pwd.match(reg)){
		$("#cknewpassword").text("新密码格式正确，可执行下一步!");
		$("#cknewpassword").css("color","#008000");
		return;
	}else{
		$("#newpwd").val("");
		$("#newpwd").attr("placeholder","新密码格式错误...");
		$("#cknewpassword").text("新密码格式错误...");
		$("#cknewpassword").css("color","#FF0000");
	}
}
//验证两次密码是否一致
function checkoldpwdagain(){
	var pwd=$("#newpwd").val();
	var pwd1=$("#pwdagain").val();
	if(pwd==pwd1 && pwd!=null && pwd!="" && typeof pwd!=undefined){
		$("#ckpasswordagain").text("您两次输入的密码一致，可以修改!");
		$("#ckpasswordagain").css("color","#008000");
		$("#btn_zxk_pwd").attr("disabled",false);
	}else{
		$("#pwdagain").val("");
		$("#pwdagain").attr("placeholder","两次密码不一致...");
		$("#ckpasswordagain").text("您两次输入的密码不一致...");
		$("#ckpasswordagain").css("color","#FF0000");
	}
}
//管理员修改自己的密码
function adminbackchangepwd(){
	var aid=$("#adminsaid").val();
	var pwd=$("#newpwd").val();
	$("#btn_zxk_pwd").attr("disabled",true);
	$.getJSON("AdminLogin_changeAdminPwd.action",{'adminInfo.aid':aid,'adminInfo.pwd':pwd},function(data){
		if(parseInt(data)>0){
			alert("密码修改成功!!!");
		}else{
			alert("密码修改失败...");
		}
	});
}
//管理与那后台直接添加用户
function adminbackadd(){
	//$("#showStudentDetilInfo").css("display","none");
	displayNone();
	var text="<button type='button' class='btn btn-lg btn-default' disabled='disabled'>添加学工处用户</button><br/><br/>";
//	$(".navbar-static-top").html(text);
//	text="";
	$('#myFenye').html("");
	text+="<form class='form-group col-lg-8 col-lg-offset-1' action='' method='post' role='form'><div class='input-group'><div class='input-group-btn'><button type='button' class='btn btn-default dropdown-toggle' data-toggle='dropdown'><font color=red>* </font>角&nbsp;&nbsp;色<span id='mycaret'></span></button> </div><input id='z_role' type='text' class='form-control' disabled='disabled' value='学工处' required placeholder='请选择角色'/><label class='input-group-addon' >管理员角色</label></div><br /> <div class='input-group'><label for='z_rname' class='input-group-addon'><font color=red>* </font>用户名</label><input type='text' class='form-control' name='z_uname' id='z_rname' onblur='zcheckname()' required placeholder='请输入用户名' maxlength='12'/ ><label class='input-group-addon promptinfo' id='ckaname'>由2-12位的中文、字母、数字和下划线组成</label></div><br /><div class='input-group'><label for='z_rpwd' class='input-group-addon'><font color=red>* </font>密&nbsp;&nbsp;&nbsp;码</label><input type='password' class='form-control' name='z_rpwd' id='z_rpwd' onblur='zcheckpassword()' required  placeholder='请输入密码' maxlength='16'/> <label class='input-group-addon promptinfo' id='ckpassword'>由6-16位的字母、数字和下划线组成</label></div><br /><div class='input-group'><label for='z_rpwds' class='input-group-addon'><font color=red>* </font>确认密码</label><input type='password' class='form-control' name='z_rpwds' id='z_rpwds' onblur='zcheckpasswordagain()' required placeholder='请再输入一次密码，以确认' maxlength='16'/><label class='input-group-addon promptinfo' id='ckpasswordagain' >请再输入一次密码，以确认</label></div><br/><div class='input-group'><label for='z_email' class='input-group-addon'><font color=red>* </font>邮&nbsp;&nbsp;&nbsp;箱</label><input type='z_email' class='form-control' name='z_email' id='z_email' onblur='zcheckemail()' required placeholder='请输入您的邮箱账号'/><label class='input-group-addon promptinfo' id='ckemail'>请输入邮箱账号，以便忘记密码时找回</label></div><br/><div class='input-group'><label for='z_tel' class='input-group-addon'><font color=red>* </font>联系方式</label><input type='number' class='form-control' name='z_tel' id='z_tel' maxlength='12' onblur='zchecktel()' required placeholder='请输入您联系方式'/><label class='input-group-addon promptinfo' id='cktel'>请输您的联系方式</label></div><br/><div class='input-group'><input type='button' onclick='zadminregister()' value='添加' class='btn btn-success user-register' />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type='reset' value='重置' class='btn btn-danger mybtn'/></div></form>";
	$("#zxk_maintable").css("display","block");
	$("#zxk_maintable").html(text);
}
//用户名验证
function zcheckname(){
	var uname=$("#z_rname").val();
	var reg=/^([a-zA-Z0-9\u4E00-\u9FA5_-]{2,12})/;
	if(uname.match(reg)){
		$("#ckaname").text("该用户名格式正确可以使用 ");
		$("#ckaname").css("color","#008000");
	}else{
		$("#z_rname").val("");
		$("#ckaname").text("用户名格式错误  请修改 ...");
		$("#ckaname").css("color","#FF0000");
	}
}
//密码验证
function zcheckpassword(){
	var pwd=$("#z_rpwd").val();
	var reg=/^([a-zA-Z0-9_-]{6,16})/;
	if(pwd.match(reg)){
		$("#ckpassword").text("您设置的密码格式正确可以使用 ");
		$("#ckpassword").css("color","#008000");
	}else{
		$("#z_rpwd").val("");
		$("#ckpassword").text("您设置的密码格式错误  请修改... ");
		$("#ckpassword").css("color","#FF0000");
	}
}

function zcheckpasswordagain(){
	var pwd=$("#z_rpwd").val();
	var pwdag=$("#z_rpwds").val();
	if(pwd==pwdag){
		$("#ckpasswordagain").text("两次输入的密码一致可以使用");
		$("#ckpasswordagain").css("color","#008000");
	}else{
		$("#z_rpwds").val("");
		$("#ckpasswordagain").text("两次输入的密码不一致请检查后再次填写 ...");
		$("#ckpasswordagain").css("color","#FF0000");
	}
}
//email验证
function zcheckemail(){
	var email=$("#z_email").val();
	var reg=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
	if(email.match(reg)){
		$("#ckemail").text("您输入的邮箱格式正确  可以使用");
		$("#ckemail").css("color","#008000");
	}else{
		$("#z_email").val("");
		$("#ckemail").text("您输入的邮箱格式不正确  请检查修改...");
		$("#ckemail").css("color","#FF0000");
	}
}
//电话号码验证
function zchecktel(){
	var tel=$("#z_tel").val();
	var reg=/^([0-9]{7,12})/;
	if(tel.match(reg)){
		$("#cktel").text("您输入的电话格式正确  可以使用");
		$("#cktel").css("color","#008000");
	}else{
		$("#z_tel").val("");
		$("#cktel").text("您输入的电话格式不正确  请检查修改...");
		$("#cktel").css("color","#FF0000");
	}
}
//注册按钮     接触控制
function adminreg(){
	$(".user-register").attr("disabled",false);
}
//用户注册
function zadminregister(){
	var uname=$("#z_rname").val();
	var pwd=$("#z_rpwd").val();
	var email=$("#z_email").val();
	var role=$("#z_role").val();
	var tel=$("#z_tel").val();
	if(uname==null||uname=="" || pwd==null || pwd=="" ||role==null||role=="" ||email==null || email=="" || tel==null || tel==""){
		alert("信息不完整 请检查...");
	}else{
		$(".user-register").attr("disabled",true);
		zcout=setTimeout("adminreg();",3000);
		$.post("AdminLogin_adminRegister.action",{'adminInfo.flag':1,'adminInfo.aname':uname,'adminInfo.pwd':pwd,'adminInfo.email':email,'adminInfo.phone':tel,'adminInfo.temp1':role},function(data){
			if(parseInt(data)>0){
				alert("恭喜您,管理员注册成功!!!");
			}else{
				alert("管理员注册失败,请重试...");
			}
		});
		$("#z_rname").val("");
		$("#z_rpwd").val("");
		$("#z_rpwds").val("");
		$("#z_email").val("");
		$("#z_role").val("");
		$("#z_tel").val("");
	}
}
//查看备份文件
function backupadnresore(){
	$("#showStudentDetilInfo").css("display","none");
	$.getJSON("AdminLogin_backUpInit.action?t="+new Date(),function(data){
		var text="";
		var ddd=data.backupfiles;
		if(ddd=="" || ddd==null){
			text="<center><h1>暂无备份</h1></center>"
			$("#zxk_maintable").html(text);
		}else{
			text="<nav class='navbar navbar-static-topzxk' role='navigation'><button class='btn btn-lg btn-default' disabled='disabled' type='button'>数据库还原</button></nav>";
			text+="<table class='table mytable table-condensed table-hover table-striped' style='margin-left:10px;'><thead><tr><td class='titleBgColor'>编号</td><td class='titleBgColor'>备份名字</td><td class='titleBgColor'>备份日期</td><td class='titleBgColor'>备份大小(KB)</td><td class='titleBgColor'>操作</td></tr></thead><tbody>";
			$.each(data.backupfiles,function(index,item){
				text+="<tr id='trs"+item.id+"'><td class='js-Order'>"+item.id+"</td><td valign='middle' class='js-Order'>"+item.name+"</td><td valign='middle' valign='middle' class='js-Name'>"+item.time+"</td><td class='js-Code'>"+item.length+"</td><td valign='middle' valign='middle' class='js-Order'> <button id='bak"+item.name+"' type='button' class='btn btn-info' onclick='datarestored(\""+item.name+"\")'>还原</button> <button type='button' class='btn btn-warning' onclick='delbackup(\""+item.id+"\",\""+item.name+"\")'>删除</button> </td>  </tr>";
			});
			text+="</tbody></table>";
			$("#zxk_maintable").css("display","block");
			$("#zxk_maintable").html(text);
			fenye("#zxk_maintable","#myFenye");
			$("#myFenye").css("display","block");
		}
	});
}
//打开数据备份页面
function backupadnbackup(){
	displayNone();
	text="<button type='button' class='btn btn-lg btn-default' disabled='disabled'>数据备份还原</button>   <br/><br/><span>数据备份存放在服务器端，需要还原请拷贝备份文件到本地...</span> <br/><br/>  <button id='aller' type='button' onclick='databackup()' class='btn btn-lg btn-info' style='float:right;margin-right:100px;'>一键备份数据库</button>";
	$("#zxk_maintable").css("display","block");
	$("#zxk_maintable").html(text);
}
//数据备份
function databackup(){
	$("#aller").attr("disabled",true);
	timelogs=setTimeout("setout(aller);",5000);
	$.getJSON("AdminLogin_databaseBackUp.action?t="+new Date(),function(data){
		if(parseInt(data)<0){
			alert("备份失败,请重试...");
		}else{
			alert("备份成功！");
		}
	});
}
var a1;
var t=10;
//数据还原进度条（无实际作用）
function time(){
	if(t<100){
		var str=(t+20);
		t=t+20;
		$(".progress-bar").css("width",str+"%");
		$("#dbrestored").html("<h1 ><small>即将完成...</small></h1>");
	}else{
		window.clearInterval(a1);
		$("#dbrestored").html("<h1 ><small>已完成...</small></h1>");
		$(".bg").hide();
		$(".progress-bar").css("width",10+"%");
		t=10;
	}
}
//定时器
function time2(){
	if(t<100){
		var str=(t+20);
		t=t+20;
		$(".progress-bar").css("width",str+"%");
		$("#dbrestored").html("<h1 ><small>执行失败...</small></h1>");
	}else{
		window.clearInterval(a1);
		$("#dbrestored").html("<h1 ><small>失败...</small></h1>");
		$(".bg").hide();
		$(".progress-bar").css("width",10+"%");
		t=10;
	}
}
//调用定时器
function datarestored(name){
	$(".bg").css("display","block");
	$.post("AdminLogin_databaseRestored.action?t="+new Date(),{'backupFile.name':name},function(data){
		if(parseInt(data)>0){
			a1=window.setInterval("time()",500);
		}else{
			a1=window.setInterval("time2()",500);
		}
	});
}
//删除备份文件
function delbackup(id,name){
	$.post("AdminLogin_delBackup.action?t="+new Date(),{'backupFile.name':name},function(data){
		if(parseInt(data)>0){
			$("#trs"+id).remove();
			fenye("#zxk_maintable","#myFenye");
			alert("备份删除成功!!!");
		}else{
			alert("删除失败,请重试...");
		}
	});
}
//管理员查询和管理下级用户
function adminbackright(pageNums){
	displayNone();
	$('#myFenye').css("display","block");
	var pageNum=pageNums;
	$.getJSON("AdminLogin_adminBackRight.action?t="+new Date(),{'pageNum':pageNum,'pageSize':pageSize},function(data){
		var ddd=data.findAllLower[0].temp1;
		if(data.findAllLower[0].aname=="" || data.findAllLower[0].aname==null ){
			alert(ddd);
			$('#myFenye').html("");
			$("#zxk_maintable").css("display","block");
			$("#zxk_maintable").html("");
		}else{
			text="<nav class='navbar navbar-static-topzxk' role='navigation'><button class='btn btn-lg btn-default' disabled='disabled' type='button'>管理员密码修改</button></nav>";
//			$(".navbar-static-top").html(text);
			text+="<table class='table mytable table-condensed table-hover table-striped' style='margin-left:10px;'><thead><tr><td class='titleBgColor'>角色名</td><td class='titleBgColor'>姓名</td><td class='titleBgColor'>联系电话</td><td class='titleBgColor'>权限id</td><td class='titleBgColor'>状态</td><td class='titleBgColor'>操作</td></tr></thead><tbody>";
			$.each(data.findAllLower,function(index,item){
				text+="<tr valign='middle' id='trs"+item.aid+"'><td class='js-Order'>"+item.urname+"</td><td class='js-Name'>"+item.aname+"</td><td class='js-Code'><abbr title='"+item.phone+"'>"+item.phone+"</abbr></td><td class='js-Code' ><abbr id='authonabbr"+item.aid+"' class='authonabbr' title='"+item.auth+"'>"+item.auth+"</abbr></td> "
				if(item.flag==1){
					text+="<td valign='middle' class='js-Name'> <img id='rightpic"+item.aid+"' src=\"../img/onCorrect.gif\"/> </td>   <td class='js-Order'> <button type='button' id='zxk_btn_work"+item.aid+"' class='btn btn-warning' onclick='jinyong("+item.aid+")'>禁用</button>   <button type='button' class='btn btn-info' data-toggle='modal' data-target='#myModal-zxk-fudaoyuan' onclick='fuquan("+item.aid+")'>赋权</button>   <button type='button' class='btn btn-info' data-toggle='modal' data-target='#myModal-zxk-fudaoyuanxiugai' onclick='xiugairight("+item.aid+")'>修改</button>   </td>  </tr>";
				}else if(item.flag==2){
					text+="<td valign='middle' class='js-Name'> <img id='rightpic"+item.aid+"' src=\"../img/onError.gif\"/></td>  <td class='js-Order'> <button type='button' id='zxk_btn_work"+item.aid+"' class='btn btn-warning' onclick='qiyong("+item.aid+")'>启用</button>      <button type='button' class='btn btn-info' data-toggle='modal' data-target='#myModal-zxk-fudaoyuan' onclick='fuquan("+item.aid+")'>赋权</button>  <button type='button' class='btn btn-info' data-toggle='modal' data-target='#myModal-zxk-fudaoyuanxiugai' onclick='xiugairight("+item.aid+")'>修改</button>   </td>  </tr>";
				}else{
					text+="<td valign='middle' class='js-Name'> <img id='rightpic"+item.aid+"' src=\"../img/onFocus.gif\"/></td> <td class='js-Order'> <button type='button' class='btn btn-info' onclick='adminpass("+item.aid+")'>通过</button> <button type='button' class='btn btn-warning' data-toggle='modal' data-target='#myModals' onclick='bohui("+item.aid+")'>驳回</button> </td></tr> ";
				}
			});
			$.each(data.allpageSize,function(index,entry){
				sizes=entry;
			});
			text+="</tbody></table>";
			$('#myFenye').html("");
			$("#zxk_maintable").css("display","block");
			$("#zxk_maintable").html(text);
			AdmFenye("#zxk_maintable","#myFenye",1);
			backrightaddfun();
		}
	});
}
//加载辅导员所带的班级
function backrightaddfun(){
	var asd=$(".authonabbr").bind("mouseover",function(){
		var obja=$(this);
		if(obja.attr("class")=="authonabbr"){
			var context=$(this).parent().text();
//			alert(context);
			$.post("AdminLogin_mouseGetAuth.action?t="+new Date(),{'adminInfo.auth':context},function(data){
				if(data!=null && data!="" && data!="查询失败"){
					obja.attr("title",data);
					obja.attr("class","zxk-yhas");
				}else{
					return;
				}
			});
		}else{
			return;
		}
	});
}
//
function adminbackright2(pageNums){
	var pageNum=pageNums;
	displayNone();
	$.getJSON("AdminLogin_adminBackRight.action?t="+new Date(),{'pageNum':pageNum,'pageSize':pageSize},function(data){
		var ddd=data.findAllLower[0].temp1;
		if(data.findAllLower[0].aname=="" || data.findAllLower[0].aname==null ){
			alert(ddd);
			$('#myFenye').html("");
			$("#zxk_maintable").css("display","block");
			$("#zxk_maintable").html("");
		}else{
			text="<nav class='navbar navbar-static-topzxk' role='navigation'><button class='btn btn-lg btn-default' disabled='disabled' type='button'>管理员权限修改</button></nav>";
			$('#myFenye').html("");
			text+="<table class='table mytable table-condensed table-hover table-striped' style='margin-left:10px;'><thead><tr><td class='titleBgColor'>角色名</td><td class='titleBgColor'>姓名</td><td class='titleBgColor'>联系电话</td><td class='titleBgColor'>权限id</td><td class='titleBgColor'>状态</td><td class='titleBgColor'>操作</td></tr></thead><tbody>";
			$.each(data.findAllLower,function(index,item){
				text+="<tr id='trs"+item.aid+"'><td class='js-Order'>"+item.urname+"</td><td class='js-Name'>"+item.aname+"</td><td class='js-Code'><abbr title='"+item.phone+"'>"+item.phone+"</abbr></td><td class='js-Code' id='authon' ><abbr title='"+item.auth+"'>"+item.auth+"</abbr></td> "
				if(item.flag==1){
					text+="<td valign='middle' class='js-Name'> <img id='rightpic"+item.aid+"' src=\"../img/onCorrect.gif\"/> </td>   <td class='js-Order'> <button type='button' id='zxk_btn_work"+item.aid+"' class='btn btn-warning' onclick='jinyong("+item.aid+")'>禁用</button>    </tr>";
				}else if(item.flag==2){
					text+="<td valign='middle' class='js-Name'> <img id='rightpic"+item.aid+"' src=\"../img/onError.gif\"/></td>  <td class='js-Order'> <button type='button' id='zxk_btn_work"+item.aid+"' class='btn btn-warning' onclick='qiyong("+item.aid+")'>启用</button>     </tr>";
				}else{
					text+="<td valign='middle' class='js-Name'> <img id='rightpic"+item.aid+"' src=\"../img/onFocus.gif\"/></td>   <td class='js-Order'> <button type='button' id='zxk_btn_work"+item.aid+"' class='btn btn-warning' onclick='adminpass("+item.aid+")'>赋权</button>     </tr> ";
				}
			});
			$.each(data.allpageSize,function(index,entry){
				sizes=entry;
			});
			text+="</tbody></table>";
			$('#myFenye').html("");
			$("#zxk_maintable").css("display","block");
			$("#zxk_maintable").html(text);
			AdmFenye("#zxk_maintable","#myFenye",3);
		}
	});
}
function jinyong(id){
	$.post("AdminLogin_adminJinYong.action?t="+new Date(),{'adminInfo.aid':id},function(data){
		if(parseInt(data)>0){
			$("#rightpic"+id).attr("src","../img/onError.gif");
			$("#zxk_btn_work"+id).text("启用");
			$("#zxk_btn_work"+id).attr("onclick","qiyong("+id+")");
		}else{
			$("#rightpic"+id).attr("src","../img/onCorrect.gif");
			$("#zxk_btn_work"+id).text("禁用");
			$("#zxk_btn_work"+id).attr("onclick","jinyong("+id+")");
		}
	});
}

function qiyong(id){
	$.post("AdminLogin_adminQiYong.action?t="+new Date(),{'adminInfo.aid':id},function(data){
		if(parseInt(data)>0){
			$("#rightpic"+id).attr("src","../img/onCorrect.gif");
			$("#zxk_btn_work"+id).text("禁用");
			$("#zxk_btn_work"+id).attr("onclick","jinyong("+id+")");
		}else{
			$("#rightpic"+id).attr("src","../img/onError.gif");
			$("#zxk_btn_work"+id).text("启用");
			$("#zxk_btn_work"+id).attr("onclick","qiyong("+id+")");
		}
	});
}

//赋权
function fuquan(id){
	$("#hiddenfuquan").val(id);
	$.getJSON("AdminLogin_adminFuDaoYuan.action?t="+new Date(),{'adminInfo.aid':id},function(data){
		var text="<option>请选择专业</option>";
		if(data.major[0]!=null || data.major[0]!=""){
			$.each(data.major,function(index,item){
				text+="<option>"+item.mname+"</option>";
			});
			$("#xuanzezhuanye").html(text);
			$("#nianfen-zxk").html("<option>请选择开学时间</option>");
		}else{
			$("#xuanzezhuanye").html(text);
		}
		$("#hiddenfuquan-zxk").val(id);
	});
}
$(function (){
	$("#jdorm").keyup(function(e){
		if(e.keyCode==8){
			return;
		}
		var jdorm = $("#jdorm").val();
		if(jdorm.length==2 || jdorm.length==6){
			$("#jdorm").val(jdorm+"-");
		}
	});
	
//	var jmpovertyul = $("#jmpovertyul > li");
//	jmpovertyul.click(function(){
//		$("#jmpoverty").val($.trim($(this).text()));
//	});
	
	$("#xuanzezhuanye").change(function(){
		var aname=$("#xuanzezhuanye").val();
		var text="<option>请选择开学时间</option>";
		$.getJSON("AdminLogin_adminGetTime.action?t="+new Date(),{'adminInfo.aname':aname},function(data){
			if(data.classtime[0]!=null && data.classtime[0]!="" ){
				$.each(data.classtime,function(index,item){
					text+="<option>"+item.btime+"</option>";
				});
				$("#nianfen-zxk").html(text);
			}else{
				$("#nianfen-zxk").html(text);
			}
		});
	});
	
	$("#nianfen-zxk").change(function(){
		var timess=$("#nianfen-zxk").val();
		var aname=$("#xuanzezhuanye").val();
		var text="";
		$.getJSON("AdminLogin_adminGetClasses.action?t="+new Date(),{'classes.btime':timess,'classes.temp1':aname},function(data){
			if(data.finalclass[0]!=null && data.finalclass[0]!="" ){
				$.each(data.finalclass,function(index,item){
					text+="<label><input type='checkbox' name='class_zxk_chose' value='"+item.cid+"'>"+item.cname+"</label>";
				});
				$("#zxk_checkbox").html(text);
			}else{
				$("#zxk_checkbox").html(text);
			}
		});
	});
	
	$("#zxk-data-dtype").change(function(){
		findByDtype();
	});
});

//添加辅导员班级
function adminaddfdyclass(){
	var aid=$("#hiddenfuquan-zxk").val();
	var temp=document.getElementsByName("class_zxk_chose");
	var str="";
    for(var i=0;i<temp.length;i++){
        	if(temp[i].checked==true){
        	str+=temp[i].value+",";
        }
    }
    str=str.substring(0, str.length-1);
    $.getJSON("AdminLogin_adminSetClasses.action?t="+new Date(),{'adminInfo.auth':str,'adminInfo.aid':aid},function(data){
    	if(parseInt(data)>0){
    		alert("赋权成功!");
    		var as = $("#trs"+aid+" td:eq(3)").text();
    		if(as==null || as==""){
    			$("#trs"+aid+" td:eq(3)").text(str);
    		}else{
    			$("#trs"+aid+" td:eq(3)").text(as+","+str);
    		}
    	}else{
    		alert("赋权失败!");
    	}
	});
    $("#zxk_checkbox").html("班级显示区域");
}
//修改管理员权限
function xiugairight(id){
	$("#hiddennianfenxiugai").val(id);
	$("#zxk_checkboxxiugai").html("");
	var text="";
	$.getJSON("AdminLogin_adminSetClassesXiugai.action?t="+new Date(),{'adminInfo.aid':id},function(data){
    	if(data.hasclasses[0]!=null && data.hasclasses[0]!=""){
    		$.each(data.hasclasses,function(index,item){
				text+="<label><input type='checkbox' checked='checked' name='class_zxk_choses' value='"+item.cid+"'>"+item.cname+"</label>";
			});
			$("#zxk_checkboxxiugai").html(text);
    	}else{
    		alert("暂无班级");
    	}
	});
}
//修改管理员权限
function changeright(){
	var temp=document.getElementsByName("class_zxk_choses");
	var aid=$("#hiddennianfenxiugai").val();
	var str="";
	var str1="";
    for(var i=0;i<temp.length;i++){
    	if(temp[i].checked==true){
    		str+=temp[i].value+",";
    	}else{
    		str1+=temp[i].value+",";
    	}
    }
    str=str.substring(0, str.length-1);
    str1=str1.substring(0, str1.length-1);
    $.getJSON("AdminLogin_adminChangeRight.action?t="+new Date(),{'adminInfo.aid':aid,'adminInfo.auth':str,'adminInfo.temp1':str1},function(data){
    	if(parseInt(data)>0){
    		alert("修改成功!");
    		$("#trs"+aid+" td:eq(3)").text(str);
    	}else{
    		alert("修改失败...");
    	}
	});
    $("#zxk_checkboxxiugai").html("班级显示区域");
}
function showDataDictonary(){
	displayNone();
	$("#zxk_dataDictonray").css("display","block");
}
//查询数据字典
function findByDtype(){
	var text="";
	var ssid=$("#zxk-data-dtype").val();
	if(ssid=="请选择类型"){
		return;
	}else{
		$.getJSON("AdminLogin_findAllDataDictionaryByType.action?t="+new Date(),{'dataDictionary.dtype':ssid},function(data){
	    	if(data.dataDictonary[0]==null || ""==data.dataDictonary[0]){
	    		$("#zxk_ddfing").html("暂无任何信息");
	    	}else{
	    		text+="<table id='zxk_data_op' class=\"mytablezxk table table-condensed table-hover table-striped table-bordered\"><thead>"+
    		    "<tr><td class=\"titleBgColor\">数据ID</td>" +
    		    "<td class=\"titleBgColor\">数据类型</td>"+
    		    "<td class=\"titleBgColor\">数据名称</td>"+
    		    "<td class=\"titleBgColor\">数据描述</td></tr></thead><tbody class=\"Stu_detail\">";
	    		$.each(data.dataDictonary,function(index,item){
	    			text+="<tr><td>"+item.did+"</td>";
	    			text+="<td>"+item.dtype+"</td>";
	    			text+="<td>"+item.dname+"</td>";
	    			text+="<td>"+item.intro+"</td></tr>";
	    		});
	    		text+="</tbody></table><div id='zxkFenye' style='margin-left:300px;'></div>"
	    		$("#zxk_ddfing").html(text);
	    		fenye("#zxk_ddfing","#zxkFenye");
	    	}
		});
	}
}
//查询数据字典
function findByDtypes(idsss){
	var text="";
		$.getJSON("AdminLogin_findAllDataDictionaryByType.action?t="+new Date(),{'dataDictionary.dtype':idsss},function(data){
	    	if(data.dataDictonary[0]==null || ""==data.dataDictonary[0]){
	    		$("#zxk_ddfing").html("暂无任何信息");
	    	}else{
	    		text+="<table id='zxk_data_op' class=\"mytablezxk table table-condensed table-hover table-striped table-bordered\"><thead>"+
    		    "<tr><td class=\"titleBgColor\">数据ID</td>" +
    		    "<td class=\"titleBgColor\">数据类型</td>"+
    		    "<td class=\"titleBgColor\">数据名称</td>"+
    		    "<td class=\"titleBgColor\">数据描述</td></tr></thead><tbody class=\"Stu_detail\">";
	    		$.each(data.dataDictonary,function(index,item){
	    			text+="<tr><td>"+item.did+"</td>";
	    			text+="<td>"+item.dtype+"</td>";
	    			text+="<td>"+item.dname+"</td>";
	    			text+="<td>"+item.intro+"</td></tr>";
	    		});
	    		text+="</tbody></table><div id='zxkFenye' style='margin-left:300px;'></div>"
	    		$("#zxk_ddfing").html(text);
	    		fenye("#zxk_ddfing","#zxkFenye");
	    	}
		});
}
//添加数据字典
function addDataDictionary(){
	var types=$("#zxk-dleixing").val();
	var dname=$("#zxk-dmingzi").val();
	var dintro=$("#zxk-dintro").val();
	if(types=="请选择类型" || dname=="" || dname==null){
		return;
	}else{
		$.post("AdminLogin_addDictionary.action?t="+new Date(),{'dataDictionary.dtype':types,'dataDictionary.dname':dname,'dataDictionary.intro':dintro},function(data){
	    	if(parseInt(data)>0){
	    		alert("添加数据字典成功!");
	    		$("#zxk-dleixing").val("");
	    		$("#zxk-dmingzi").val("");
	    		$("#zxk-dintro").val("");
	    		findByDtypes(types)
	    	}else{
	    		alert("添加数据字典失败...");
	    	}
		});
	}
}

function zxkxgcssdr(){
	displayNone();
	$("#zxk-sushe-batch").css("display","block");
}
//书记查本院宿舍界面
function sjfindkyss(){
	
} 

//查询宿舍处分
function findaccomchufen(){
	displayNone();
	$("#zxk_sushechufen").css("display","block");//查询宿舍处分信息
	$("#zxk-sscfid").val("");
	$("#zxk-sscfname").val("");
	$("#zxk-sscftimes").val("");
	$("#zxk-sscfneirong").val("");
	$("#zxk-sscfdengji").val("");
}
function showTypeExcel(){

}
//宿舍回收
function zxksshuishou(){
	var a=window.confirm("宿舍回收操作将回收各院未分配的宿舍，确认回收吗？");
	if(a){
		$.post("AdminLogin_zxksshuishou.action?t="+new Date(),function(data){
			if(parseInt(data)>0){
				alert("宿舍回收成功！");
			}else{
				alert("宿舍回收失败...");
			}
		});
	}else{
		return;
	}
}

function zchongzhixscf(){
	$("#zxk-xscfid1").val("");
	$("#zxk-xscfsnum1").val("");
	$("#zxk-xscfshijian1").val("");
	$("#zxk-xscfcontent1").val("");
	$("#zxk-xscfdengji1").val("");
	$("#xscfxgbtn").attr("disabled",true);
	$("#xscftjbtn").attr("disabled",false);
	$("#xscfscbtn").attr("disabled",true);
}

function zchongzhisscf(){
	$("#zxk-sscfid").val("");
	$("#zxk-sscfname").val("");
	$("#zxk-sscftimes").val("");
	$("#zxk-sscfneirong").val("");
	$("#zxk-sscfdengji").val("");
	$("#sscfxgbtn").attr("disabled",true);
	$("#sscfdelbtn").attr("disabled",true);
	$("#sscftjbtn").attr("disabled",false);
}