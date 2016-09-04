var jbankInfo = [];  //数据字典中银行的数据
var jjobInfo = [];  //数据字典中工作岗位的数据
var jclsInfo = [];  //当前登录管理员管理的班级信息
var jstuInfo = [];  //当前登录管理员管理的学生信息

var clsInfoHtml = ""; //班级信息<li></li>
var jjobInfoHtml = ""; //将数据生成<li></li>形式
var jbankInfoHtml = "";//将数据生成<li></li>形式

var jhid = ""; //操作贷款信息表中的主键id
var jjid = ""; //操作勤工信息表中的主键id
var jwid = ""; //操作就业信息表中的主键id

var jhneedInfo = [];  //查询出来的贷款数据
var jjneedInfo = [];  //查询出来的勤工数据
var jwneedInfo = [];  //查询出来的就业数据

var jpageInit;  //贷款分页对象
var jpageInit_Job;	//勤工分页对象
var jpageInit_Work; //就业分页对象

var pageHelpDatas = []; //贷款分页用的数据对象
var pageJobDatas = []; //勤工用数据对象
var pageWorkDatas = []; //就业用数据对象

var jflag = false;  //用来做是否已经发送请求判断

var jloadTimeOut = 20;  //当在多少秒内还没有查出来时显示查询失败 
var isLoadSuccess = false; //判断是否加载失败


//批量导出用
var Jclazz; //对象名
var JsessionValue;  //session中存的键名
var JmodelTableName;  //模板表名


function workwindowShow(){
	displayNone();
	if( !jflag ){
		JfindUseInfo();
	}
	$("#jworkwindow").show();
}




 
function jhelpwindowShow(){
	displayNone();
	//可以做一下判空处理
	if( !jflag ){
		JfindUseInfo();
	}
	$("#jhelpwindow").css("display","block");  //贷款信息界面
}

function jqueryhelp( obj ){
	Btn_JienLoading();  //显示正在查询
	var snum = $(obj).find("input:eq(0)").val();
	var cls = $(obj).find("input:eq(1)").val();
	var clsid = cls.substring(1,cls.lastIndexOf('）'));
	var bank = $(obj).find("input:eq(2)").val();
	var bankid = bank.substring(1,bank.lastIndexOf('）'));
	$.getJSON("StuInfo_queryStuHelp?data="+new Date(),{"helperQueryInfo.snum":snum,"helperQueryInfo.cid":clsid,"helperQueryInfo.bank":bankid},function(data){
		if(data.hnInfo==null || data.hnInfo==""){
			var jhelpdetailhtml = "<tr><td colspan='12'>查无数据，请确认查询条件！</td></tr>";
			var jhelppageshtml = "<li><a href='javascript:void(0)'>共0页</a></li>" +
			"<li><a href='javascript:void(0)'>首页</a></li>" +
			"<li><a href='javascript:void(0)'>末页</a></li>";
			$("#jhelpalldetail").find("ul").html(jhelppageshtml);
			$("#jhelpalldetail").find("table > tbody").html(jhelpdetailhtml);
			$("#Jien_Help_P > li:eq(1)").hide();
			$("#Jien_Help_P > li:eq(3)").hide();
		}else{
			jhneedInfo = [];
			jhneedInfo = data.hnInfo;
			$("#Jien_Help_P > li:eq(1)").show();
			$("#Jien_Help_P > li:eq(3)").show();
			JHelpPage();
		}
		isLoadSuccess = true;
		$(".btn-jien").button('complete');//登陆成功后，显示data-complete-text标记内容
	});
	return false;
}

//添加或者修改学生贷款信息
function jhelpoperate(){
	var jbtn1 = $("#jhelpbtn").find("button:eq(0)");
	var jhelptable = $("#jhelptable");
	//取值
	var snum = jhelptable.find("input:eq(1)").val();
	var contract = jhelptable.find("input:eq(7)").val();
	var bank = jhelptable.find("input:eq(4)").val();
	bank = bank.substring(1,bank.lastIndexOf('）'));
	var times = jhelptable.find("input:eq(5)").val();
	var money = jhelptable.find("input:eq(6)").val();
	var phone = jhelptable.find("input:eq(3)").val();
	if( snum==""|| bank==""||times=="" ){
		alert("贷款信息不完整，请确认后重新操作！");
		return false;
	}
	var operate = jbtn1.text();
	if( operate=="修改" ){
		$.post('HelpInfo_UpdateHelper?t='+new Date(),{"helper.hid":jhid,"helper.snum":snum,"helper.contract":contract,
			"helper.times":times,"helper.bank":bank,"helper.money":money,"helper.phone":phone},function(result){
				if(result==1){
					alert("修改成功！");
					for(var i=0;i<jhneedInfo.length;i++){
						//修改数据
						if( jhneedInfo[i].hid==jhid ){//修改的hid
							jhneedInfo[i].contract = contract;
							jhneedInfo[i].times = times;
							for(var j=0;j<jbankInfo.length;j++){
								if(jbankInfo[j].did == bank){
									jhneedInfo[i].bank = jbankInfo[j].dname;
								}
							}
							jhneedInfo[i].money = money;
							jhneedInfo[i].phone = phone;
						}
					}
					pageHelpDatas = [];
					for( var i=0; i<jhneedInfo.length;i++ ){
						var pd = new pageHelpData(jhneedInfo[i].bank,jhneedInfo[i].cname,jhneedInfo[i].contract,jhneedInfo[i].hid,
								jhneedInfo[i].idcard,jhneedInfo[i].money,jhneedInfo[i].phone,jhneedInfo[i].sex,jhneedInfo[i].sname,
								jhneedInfo[i].snum,jhneedInfo[i].status,jhneedInfo[i].times,i+1  );
						pageHelpDatas.push( pd );
					}
					jpageInit.changeData( pageHelpDatas );
					
				}else{
					alert("修改失败！错误原因（数据有冲突，请联系管理员查看错误日志）");
				}
		});
	}else if(operate=="添加"){
		// 添加的话 需要把新添加的学生贷款信息添加到jhneedInfo数组中
		$.getJSON('HelpInfo_AddHelper?t='+new Date(),{"helper.snum":snum,"helper.contract":contract,"helper.times":times,
			"helper.bank":bank,"helper.money":money,"helper.phone":phone},function(data){
				if(data.hnInfo){// 如果有添加信息
					alert("添加成功！");
					$("#jhelptable").find("input").val("");
					jhneedInfo[jhneedInfo.length] = data.hnInfo[0];
					var obj = data.hnInfo[0];
					var pd = new pageHelpData(obj.bank,obj.cname,obj.contract,obj.hid,obj.idcard,obj.money,obj.phone,
							obj.sex,obj.sname,obj.snum,obj.status,obj.times,jhneedInfo.length  );
					if( jpageInit!=null ){
						jpageInit.addSingData(pd);
					}
				}else{// 添加失败
					alert("添加失败！错误原因（数据有冲突，请联系管理员查看错误日志）");
				}
		});
	}
	return false;
}

//勤工助学模块
function jien_jobwindowShow(){ //显示勤工助学块
	displayNone();
	if(!jflag){
		JfindUseInfo();
	}
	$("#jien_jobwindow").css("display","block");
}

function jQueryJob(obj){  //根据条件查询勤工信息
	Btn_JienLoading();  //显示正在查询
	var snum = $(obj).find("input:eq(0)").val();
	var cls = $(obj).find("input:eq(1)").val();
	var clsid = cls.substring(1,cls.lastIndexOf('）'));
	var pos = $(obj).find("input:eq(2)").val();
	var posid = pos.substring(1,pos.lastIndexOf('）'));
	var begindate = $(obj).find("input:eq(3)").val();
	var enddate = $(obj).find("input:eq(4)").val();
	
	$.getJSON("JobInfo_findJobNeedInfo?t="+new Date(),{"jobQueryInfo.snum":snum,"jobQueryInfo.cid":clsid,"jobQueryInfo.position":posid,"jobQueryInfo.begindate":begindate,"jobQueryInfo.enddate":enddate},
			function(data){
		if(data.jobNeedInfo==null || data.jobNeedInfo==""){
			var jjobdetailhtml = "<tr><td colspan='12'>查无数据，请确认查询条件！</td></tr>";
			var jjobpageshtml = "<li><a href='javascript:void(0)'>共0页</a></li>" +
			"<li><a href='javascript:void(0)'>首页</a></li>" +
			"<li><a href='javascript:void(0)'>末页</a></li>";
			$("#jjoballtail").find("ul").html(jjobpageshtml);
			$("#jjoballtail").find("table > tbody").html(jjobdetailhtml);
			$("#Jien_Job_P").find("li:eq(1)").hide();
			$("#Jien_Job_P").find("li:eq(3)").hide();
		}else{
			$("#Jien_Job_P").find("li:eq(1)").show();
			$("#Jien_Job_P").find("li:eq(3)").show();
			jjneedInfo = [];
			jjneedInfo = data.jobNeedInfo;
			JJobPage();
		}
		isLoadSuccess = true;
		$(".btn-jien").button('complete');//登陆成功后，显示data-complete-text标记内容
	});
	return false;
}

//添加或修改单个勤工信息
function jjoboperate(){
	var snum = $("#jjobform").find("input:eq(1)").val();
	var position = $("#jjobform").find("input:eq(3)").val();
	var positionname = position.substring(position.lastIndexOf('）')+1,position.length);
	position = position.substring(1,position.lastIndexOf('）'));
	var begindate = $("#jjobform").find("input:eq(4)").val();
	var enddate = $("#jjobform").find("input:eq(5)").val();
	if( snum==""||position==""||begindate==""||enddate==""){
		alert("信息不完整！");
		return false;
	}
	if( $("#jjobbtn").find("button:eq(0)").text()=="添加" ){
		$.getJSON("JobInfo_addSingJob",{"jobInfo.snum":snum,"jobInfo.position":position,"jobInfo.begindate":begindate,"jobInfo.enddate":enddate},function(data){
			if(data.jobNeedInfo==null||data.jobNeedInfo==""){
				alert("添加失败！错误原因（数据有冲突，请联系管理员查看错误日志）");
			}else{
				alert("添加成功！");
				jjneedInfo[ jjneedInfo.length ] = data.jobNeedInfo[0];
				var obj = data.jobNeedInfo[0];
				var pjd = new pageJobData( obj.jid,obj.begindate,obj.cname,obj.enddate,obj.idCard,obj.phone,obj.position,obj.sex,obj.sname,obj.snum,jjneedInfo.length );
				if( jpageInit_Job!=null ){
					jpageInit_Job.addSingData(pjd);
				}
				$("#jjobform").find("input").val("");
			}
		})
	}else{
		$.getJSON("JobInfo_updataSingJob",{"jobInfo.jid":jjid,"jobInfo.snum":snum,"jobInfo.position":position,"jobInfo.begindate":begindate,"jobInfo.enddate":enddate},function(data){
			if(data==1){
				alert("修改成功！");
				for( var i=0; i<jjneedInfo.length;i++ ){
					if( jjneedInfo[i].jid==jjid ){
						jjneedInfo[i].position = positionname;
						jjneedInfo[i].begindate = begindate;
						jjneedInfo[i].enddate = enddate;
						break;
					}
				}
				pageJobDatas = [];
				for( var i=0; i<jjneedInfo.length;i++ ){
					var obj = jjneedInfo[i];
					var pjd = new pageJobData( obj.jid,obj.begindate,obj.cname,obj.enddate,obj.idCard,obj.phone,obj.position,obj.sex,obj.sname,obj.snum,i+1 );
					pageJobDatas.push( pjd );
				}
				jpageInit_Job.changeData(pageJobDatas);
				$("#jjobform").find("input").val("");
			}else{
				alert("修改失败！错误原因（数据有冲突，请联系管理员查看错误日志）");
			}
		});
	}
	
	return false;
}

//在贷款界面添加班级信息 然后级联出学生信息
function cascadeHelp(){
	$("#jaddhelpul").html(clsInfoHtml);
	$("#jaddhelpul > li").click(function(){
		var jselectCls = $(this).text(); //当前选择的班级
		$("#jstunumul").html("");
		$("#jstunum").val("");
		$("#jhelptable").find("input:eq(2)").val( "" );
		$("#jaddhelp").val( $(this).text() );
		var jselectCid = jselectCls.substring(1,jselectCls.lastIndexOf('）'));
		var jstunumulhtml = "";
		for( var i=0; i<jstuInfo.length;i++ ){
			if( jstuInfo[i].cid==jselectCid ){
				jstunumulhtml +="<li>"+jstuInfo[i].snum+"</li>";
			}
		}
		$("#jstunumul").html(jstunumulhtml);
		$("#jstunumul > li").click(function(){
			var jselectsnum = $(this).text();
			$("#jstunum").val( jselectsnum );
			for( var i=0;i<jstuInfo.length;i++ ){
				if( jstuInfo[i].snum==jselectsnum ){
					$("#jhelptable").find("input:eq(2)").val( jstuInfo[i].sname );
				}
			}
		});
	});
}

//在勤工界面添加班级信息 然后级联出学生信息
function cascadeJob(){
	$("#jjobform").find("ul:eq(0)").html(clsInfoHtml);
	$("#jjobform").find("ul:eq(0) > li").click(function(){
		$("#jjobform").find("input:eq(0)").val( $(this).text() );//当前选择的班级
		$("#jjobform").find("input:eq(1)").val("");
		$("#jjobform").find("input:eq(2)").val("");
		var jselectCls = $(this).text(); 
		var jselectCid = jselectCls.substring(1,jselectCls.lastIndexOf('）'));
		var jstunumulhtml = "";
		for( var i=0; i<jstuInfo.length;i++ ){
			if( jstuInfo[i].cid==jselectCid ){
				jstunumulhtml +="<li>"+jstuInfo[i].snum+"</li>";
			}
		}
		$("#jjobform").find("ul:eq(1)").html(jstunumulhtml);
		$("#jjobform").find("ul:eq(1) > li").click(function(){
			$("#jjobform").find("input:eq(1)").val($(this).text());
			var jselectsnum = $(this).text();
			for( var i=0;i<jstuInfo.length;i++ ){
				if( jstuInfo[i].snum==jselectsnum ){
					$("#jjobform").find("input:eq(2)").val( jstuInfo[i].sname );
				}
			}
		});
	});
}

//在就业界面添加班级信息 然后级联出学生信息
function cascadeWork(){
	$("#jworkform").find("ul:eq(0)").html(clsInfoHtml);
	$("#jworkform").find("ul:eq(0) > li").click(function(){
		$("#jworkform").find("input:eq(0)").val( $(this).text() );//当前选择的班级
		$("#jworkform").find("input:eq(1)").val("");
		$("#jworkform").find("input:eq(2)").val("");
		var jselectCls = $(this).text(); 
		var jselectCid = jselectCls.substring(1,jselectCls.lastIndexOf('）'));
		var jstunumulhtml = "";
		for( var i=0; i<jstuInfo.length;i++ ){
			if( jstuInfo[i].cid==jselectCid ){
				jstunumulhtml +="<li>"+jstuInfo[i].snum+"</li>";
			}
		}
		$("#jworkform").find("ul:eq(1)").html(jstunumulhtml);
		$("#jworkform").find("ul:eq(1) > li").click(function(){
			$("#jworkform").find("input:eq(1)").val($(this).text());
			var jselectsnum = $(this).text();
			for( var i=0;i<jstuInfo.length;i++ ){
				if( jstuInfo[i].snum==jselectsnum ){
					$("#jworkform").find("input:eq(2)").val( jstuInfo[i].sname );
				}
			}
		});
	});
}

//当第一次操作贷款信息块或者勤工信息块是需要执行的函数
function JfindUseInfo(){
	jflag = true;
	$.getJSON('AdminLogin_findHelpInfo',function(data){
		if(data.stuInfo!=""){
			jstuInfo = data.stuInfo; //将信息赋值给jstuInfo
		}
		if(data.jobInfo!=""){
			jjobInfo = data.jobInfo;  //将工作岗位信息赋值给jjobInfo
			for( var i=0;i<jjobInfo.length;i++ ){
				jjobInfoHtml += "<li>（"+jjobInfo[i].did+"）"+jjobInfo[i].dname+"</li>";
			}
		}
		if(data.clsInfo!=""){
			jclsInfo = data.clsInfo;  //将当前登录管理员的管理的班级信息赋值给jclsInfo
			for( var i=0;i<jclsInfo.length;i++ ){
				clsInfoHtml += "<li>（"+jclsInfo[i].cid+"）"+jclsInfo[i].cname+"</li>";
			}
		}
		if(data.dataDict!=""){
			jbankInfo = data.dataDict; //将银行数据赋值给jbankInfo
			for( var i=0; i<jbankInfo.length;i++){
				jbankInfoHtml += "<li>（"+jbankInfo[i].did+"）"+jbankInfo[i].dname+"</li>";
			}
		}
		$("#jhelpulclass").html(clsInfoHtml);
		$("#jhelpulclass > li").click(function(){
			$("#jhelpclass").val($.trim($(this).text()));
		});
		$("#jjobulclass").html(clsInfoHtml);
		$("#jjobulclass > li").click(function(){
			$("#jjobclass").val($.trim($(this).text()));
		});
		$("#jhelpulbank").html(jbankInfoHtml);
		$("#jhelpulbank > li").click(function(){
			$("#jhelpbank").val($.trim($(this).text()));
		});
		$("#jjobulpos").html( jjobInfoHtml );
		$("#jjobulpos > li").click(function(){
			$("#jjobpos").val( $(this).text() );
		});
		
		$("#jhelptable").find("ul:eq(2)").html(jbankInfoHtml);
		$("#jhelptable").find("ul:eq(2) > li").click(function(){
			$("#jhelptable").find("input:eq(4)").val( $(this).text() );
		});
		
		$("#Jien_Help_Dialog_Form").find("ul:eq(0)").html(jbankInfoHtml);
		$("#Jien_Help_Dialog_Form").find("ul:eq(0) > li").click(function(){
			$("#Jien_Help_Dialog_Form").find("input:eq(0)").val( $(this).text() );
		});
		
		$("#Jien_Job_Dialog_Form").find("ul:eq(0)").html(jjobInfoHtml);
		$("#Jien_Job_Dialog_Form").find("ul:eq(0) > li").click(function(){
			$("#Jien_Job_Dialog_Form").find("input:eq(0)").val( $(this).text() );
		});
		
		$("#jjobform").find("ul:eq(2)").html(jjobInfoHtml);
		$("#jjobform").find("ul:eq(2) > li").click(function(){
			$("#jjobform").find("input:eq(3)").val( $(this).text() );
		});
		
		$("#jworkwindow").find("ul:eq(0)").html(clsInfoHtml);
		$("#jworkwindow").find("ul:eq(0)>li").click(function(){
			$("#jworkwindow").find("input:eq(1)").val( $(this).text() );
		});
	});
	
	$("#jhelpbtn").find("button:eq(1)").click(function(){ //贷款form表单的返回按钮  并将form表单的值清空
		$("#jaddhelpul").html(""); //清空班级下拉列表
		$("#jaddhelpul > li").unbind("click");  //取消下拉列表绑定事件
		$("#jstunumul").html(""); //清空学号下拉列表
		$("#jstunumul > li").unbind("click");   //取消序号下拉列表绑定事件
		$("#jhelptable").find("input").val(""); //清空输入框
		$("#jhelpalldetail").css("display","block");
		$("#jhelptable").css("display","none");
	});
	 
	$("#jhelpalldetail").find("table").mousedown(function(e){  //贷款table右击弹出menu菜单栏
			if( e.button==2 ){
				var _Jien_BtnTemp = true;
				var m_left = e.pageX - $("#jhelpwindow").position().left-12;
				var m_top = e.pageY - 140;
				$(document).on("contextmenu", function() {
					if(_Jien_BtnTemp){
						$("#Jien_Help_P").css({"margin-left":m_left,"margin-top":m_top}).show();
						_Jien_BtnTemp = false;
						return false;
					}else{
						return true;
					}
				}).on("click", function() {
					$("#Jien_Help_P").hide();
			    });;
			}
	});
		
	$("#Jien_Help_P > li:eq(0)").click(function(){ //贷款菜单栏添加按钮
			cascadeHelp();
			$("#jhelptable").find("input").val("");
			$("#jhelpbtn").find("button:eq(0)").text("添加");
			$("#jhelpalldetail").hide();
			$("#jhelptable").show();
	});
		
		
	$("#Jien_Help_P > li:eq(1)").click(function(){  //贷款菜单栏修改按钮
			var _Jien_select_td = jpageInit.getSelectCheckbox();
			if( _Jien_select_td.length == 0  ){
				alert("未选择贷款对象！");
			}else if(_Jien_select_td.length==1){  // 选择单个触发事件
				var jhelptrtemp = $("#jhelpalldetail").find("table > tbody").find("tr:eq("+_Jien_select_td[0]+")"); // 选择当前第i页
				jhid = jhelptrtemp.find("td:eq(0)").text();
				var jcname = jhelptrtemp.find("td:eq(2)").text();
				var jcontract = jhelptrtemp.find("td:eq(3)").text();
				var jsnum = jhelptrtemp.find("td:eq(4)").text();
				var jsname = jhelptrtemp.find("td:eq(5)").text();
				var jtimes = jhelptrtemp.find("td:eq(9)").text();
				var jbank = jhelptrtemp.find("td:eq(10)").text();
				for(var k=0;k<jbankInfo.length;k++  ){
					if(jbankInfo[k].dname==jbank ){
						jbank = "（"+jbankInfo[k].did+"）"+jbankInfo[k].dname;
						break;
					}
				}
				var jmoney = jhelptrtemp.find("td:eq(11)").text();
				var jphone = jhelptrtemp.find("td:eq(12)").text();
				var jhelptable_1 = $("#jhelptable");
				
				jhelptable_1.find("input:eq(0)").val(jcname);
				jhelptable_1.find("input:eq(1)").val(jsnum);
				jhelptable_1.find("input:eq(2)").val(jsname);
				jhelptable_1.find("input:eq(3)").val(jphone);
				jhelptable_1.find("input:eq(4)").val(jbank);
				jhelptable_1.find("input:eq(5)").val(jtimes);
				jhelptable_1.find("input:eq(6)").val(jmoney);
				jhelptable_1.find("input:eq(7)").val(jcontract);
				$("#jhelpbtn").find("button:eq(0)").text("修改");
				$("#jhelpalldetail").hide();
				$("#jhelptable").show();
			}else{
				var jienshowcshtml = "";
				jhid = "";
				for( var i=0;i<_Jien_select_td.length;i++ ){
					var jhelptrtemp = $("#jhelpalldetail").find("table > tbody").find("tr:eq("+_Jien_select_td[i]+")");
					var temphid = $(jhelptrtemp).find("td:eq(0)").text();
					var tempsnum = $(jhelptrtemp).find("td:eq(4)").text();
					var tempsname =$(jhelptrtemp).find("td:eq(5)").text();
					jhid += temphid + ","
					jienshowcshtml += "<li><input type='checkbox' name='jhelpcs' checked='checked' value="+temphid+" />学号："+tempsnum+"  姓名："+tempsname+" </li>"
				}
				jhid = jhid.substring(0, jhid.length-1);
				$("#Jien_Help_P > li:eq(2)").click(); // 激活函数 显示弹出框
				$("#jienshowcs").find("div:eq(0)").show();
				$("#jienshowcs").find("div:eq(1)").hide();
				$("#jienshowcs").find("ul:eq(0)").html(jienshowcshtml);
				$("#jienshowcs").find("button").text("确认");
				$("#jienshowcs").find("button").show();
				var jhelpcsli = $("input[name='jhelpcs']");
				jhelpcsli.click(function(){
					jhid = "";
					for(var i=0;i<jhelpcsli.length;i++  ){
						if(jhelpcsli.eq(i).prop("checked")){// 表示这一列选择
							jhid += $(jhelpcsli.eq(i)).val() + ","
						}
					}
					jhid = jhid.substring(0, jhid.length-1);
					if( jhid=="" ){
						$("#jienshowcs").find("button").hide();
					}else{
						$("#jienshowcs").find("button").show();
					}
				});
			}
	}); 
	
	$("#Jien_Help_P > li:eq(3)").click(function(){  //贷款菜单栏删除按钮
		alert("暂不容许删除！");
	});
	
	$("#jienshowcs").find("button").click(function(){ //贷款批量修改按钮  这里为何不用form表单onsubmit() 调用函数  因为我在一个按钮上根据这个按钮的值做了两个不同的事件
		if( $(this).text()=="确认"  ){
			$("#jienshowcs").find("div:eq(0)").hide();
			$("#jienshowcs").find("table").find("input").val("");
			$("#jienshowcs").find("div:eq(1)").slideDown(500);
			 $(this).text("批量修改");
		}else{
			var jtempbank = $("#jienshowcs").find("form").find("input:eq(0)").val();
			var jtempbankname = jtempbank.substring(jtempbank.lastIndexOf('）')+1,jtempbank.length);
			jtempbank = jtempbank.substring(1,jtempbank.lastIndexOf('）'));
			var jtemptimes = $("#jienshowcs").find("form").find("input:eq(1)").val();
			var jtempmoney = $("#jienshowcs").find("form").find("input:eq(2)").val();
			
			if( jtempbank==""&&jtemptimes==""&&jtempmoney=="" ){
				alert("未选择需要修改的贷款字段");
				return;
			}
			$.getJSON('HelpInfo_batchUpdateHelper?t='+new Date(),{"jhid":jhid,"helper.times":jtemptimes,"helper.bank":jtempbank,"helper.money":jtempmoney},function(data){
				if(data==0){
					alert("批量修改失败，可能原因，修改后存在重复对象，请重新选择！");
					$("#jienshowcs").find("div:eq(0)").slideDown(500); //重新选择
					$("#jienshowcs").find("div:eq(1)").hide();
					$(this).text("确认");
				}else{
					alert("批量修改成功");
					//重置数据
					var jhids = jhid.split(",");
					for( var i=0;i<jhids.length;i++ ){
						for( var k=0;k<jhneedInfo.length;k++ ){
							if( jhneedInfo[k].hid == jhids[i]   ){
								if( jtempbankname!="" )
									jhneedInfo[k].bank = jtempbankname;
								if( jtempmoney!="")
									jhneedInfo[k].money = jtempmoney;
								if( jtemptimes!="")
									jhneedInfo[k].times = jtemptimes;
								break;
							}
						}
					}
					pageHelpDatas = [];
					for( var i=0; i<jhneedInfo.length;i++ ){
						var pd = new pageHelpData(jhneedInfo[i].bank,jhneedInfo[i].cname,jhneedInfo[i].contract,jhneedInfo[i].hid,
								jhneedInfo[i].idcard,jhneedInfo[i].money,jhneedInfo[i].phone,jhneedInfo[i].sex,jhneedInfo[i].sname,
								jhneedInfo[i].snum,jhneedInfo[i].status,jhneedInfo[i].times,i+1  );
						pageHelpDatas.push( pd );
					}
					jpageInit.changeData( pageHelpDatas );
					$("#Jien_Help_Dialog").find("button:eq(0)").click(); //关闭窗口
				}
			});
		}
		
	});
	
	
	//勤工操作
	$("#jjoballtail").find("table").mousedown(function(e){ //显示menu菜单栏
		if( e.button==2 ){
			var _Jien_BtnTemp = true;
			var m_left = e.pageX - $("#jien_jobwindow").position().left-12;
			var m_top = e.pageY - 140;
			$(document).on("contextmenu", function() {
				if(_Jien_BtnTemp){
					$("#Jien_Job_P").css({"margin-left":m_left,"margin-top":m_top}).show();
					_Jien_BtnTemp = false;
					return false;
				}else{
					return true;
				}
			}).on("click", function() {
				$("#Jien_Job_P").hide();
		    });;
		}
	});
	
	$("#Jien_Job_P").find("li:eq(0)").click(function(){ //勤工menu添加按钮点击事件
		cascadeJob(); //因为修改把级联事件取消了 重新级联
		$("#jjobform").find("button:eq(0)").text("添加");
		$("#jjobform").show();
		$("#jjoballtail").hide();
	});
	
	$("#Jien_Job_P").find("li:eq(1)").click(function(){ //勤工menu修改按钮点击事件
		var jidSelect = jpageInit_Job.getSelectCheckbox();
		if( jidSelect.length==0){
			alert("未选择勤工对象");
		}else if( jidSelect.length==1 ){  //表示值选中一个时的执行函数
			var tempJobtr = $("#jjoballtail").find("table > tbody > tr:eq("+jidSelect[0]+")")
			jjid = tempJobtr.find("td:eq(0)").text();  //修改单个把主键存起来
			$("#jjobform").find("input:eq(0)").val( tempJobtr.find("td:eq(3)").text()  );
			$("#jjobform").find("input:eq(1)").val( tempJobtr.find("td:eq(4)").text()  );
			$("#jjobform").find("input:eq(2)").val( tempJobtr.find("td:eq(5)").text()  );
			var tempJobInfo = tempJobtr.find("td:eq(9)").text();
			for( var i=0;i<jjobInfo.length;i++ ){
				if( jjobInfo[i].dname==tempJobInfo ){
					tempJobInfo = "（"+jjobInfo[i].did+"）"+tempJobInfo;
					break;
				}
			}
			$("#jjobform").find("input:eq(3)").val( tempJobInfo );
			$("#jjobform").find("input:eq(4)").val( tempJobtr.find("td:eq(10)").text()  );
			$("#jjobform").find("input:eq(5)").val( tempJobtr.find("td:eq(11)").text()  );
			$("#jjobform").find("button:eq(0)").text("修改");
			$("#jjobform").show();
			$("#jjoballtail").hide();
		}else{
			var tempJobHtml = "";
			for( var i=0; i<jidSelect.length;i++ ){
				var tempJobtr = $("#jjoballtail").find("table > tbody > tr:eq("+jidSelect[i]+")");
				var tempjid = tempJobtr.find("td:eq(0)").text();
				var tempsnum = tempJobtr.find("td:eq(4)").text();
				var temppos = tempJobtr.find("td:eq(9)").text();
				tempJobHtml += "<li><input type='checkbox' name='jjobcs' checked='checked' value="+tempjid+" />学号："+tempsnum+" 岗位："+temppos+"</li>"
			}
			$("#Jien_Job_Dialog_Body").find("div:eq(0)").show();
			$("#Jien_Job_Dialog_Body").find("div:eq(1)").hide();
			$("#Jien_Job_Dialog").find("button:eq(1)").text("确认");
			$("#Jien_Job_Dialog").find("ul:eq(0)").html(tempJobHtml);
			$("#Jien_Job_P").find("li:eq(2)").click();
		}
	});
	
	
	$("#Jien_Job_Dialog").find("button:eq(1)").click(function(){  //勤工助学批量处理
		if( $(this).text()=="确认" ){
			jjid = "";
			$("input[name='jjobcs']:checked").each(function(){
				jjid += $(this).val()+",";
			});
			jjid = jjid.substring(0, jjid.length-1);
			$("#Jien_Job_Dialog_Body").find("div:eq(0)").hide();
			$("#Jien_Job_Dialog_Body").find("div:eq(1)").slideDown(500);
			$(this).text("批量修改");
		}else{
			var position = $("#Jien_Job_Dialog_Form").find("input:eq(0)").val();
			var posname = position.substring(position.lastIndexOf('）')+1,position.length );
			position = position.substring(1,position.lastIndexOf('）'));
			var begindate = $("#Jien_Job_Dialog_Form").find("input:eq(1)").val();
			var enddate = $("#Jien_Job_Dialog_Form").find("input:eq(2)").val();
			if( position==""&&begindate==""&&enddate=="" ){
				alert("未选择需要修改的勤工信息字段");
				return;
			}
			if( begindate!=""&&enddate!="" ){
				var begintime = new Date( begindate );
				var endtime = new Date( enddate );
				if( begintime>endtime ){
					alert("开始时间晚于结束时间！");
					return;
				}
			}
			$.getJSON("JobInfo_batchUpdateJob?t="+new Date(),{"jids":jjid,"jobInfo.position":position,"jobInfo.begindate":begindate,"jobInfo.enddate":enddate},function(data){
				if(data==0){
					alert("批量修改失败，可能原因，修改后存在重复对象，请重新选择！");
					$("#Jien_Job_Dialog_Form").find("input").val("");
					$("#Jien_Job_Dialog_Body").find("div:eq(0)").slideDown(500);
					$("#Jien_Job_Dialog_Body").find("div:eq(1)").hide();
					$(this).text("确认");
				}else{
					//数据重置
					alert("批量修改成功");
					var jid = jjid.split(",");
					for( var i=0; i<jjneedInfo.length;i++ ){
						for( var k=0; k<jid.length;k++ ){
							if( parseInt( jid[k] )==jjneedInfo[i].jid ){
								if(position!=""){
									jjneedInfo[i].position = posname;
								}
								if(begindate!=""){
									jjneedInfo[i].begindate = begindate;
								}
								if(enddate!=""){
									jjneedInfo[i].enddate = enddate;
								}
								break;
							}
						}
					}
					pageJobDatas = [];
					for( var i=0; i<jjneedInfo.length;i++ ){
						var obj = jjneedInfo[i];
						var pjd = new pageJobData( obj.jid,obj.begindate,obj.cname,obj.enddate,obj.idCard,obj.phone,obj.position,obj.sex,obj.sname,obj.snum,i+1 );
						pageJobDatas.push( pjd );
					}
					jpageInit_Job.changeData( pageJobDatas );
					$("#Jien_Job_Dialog_Form").find("input").val("");
					$("#Jien_Job_Dialog").find("button:eq(0)").click();  //关闭窗口
				}
			});
		}
	});
	
	$("#Jien_Job_P").find("li:eq(3)").click(function(){ //勤工menu删除按钮点击事件
		alert( "暂不容许删除" );
	});
	
	$("#jjobbtn").find("button:eq(1)").click(function(){ //勤工 form表单页返回按钮点击事件
		$("#jjobform").find("ul:eq(0)").html("");
		$("#jjobform").find("ul:eq(0) > li").unbind("click");
		$("#jjobform").find("ul:eq(1)").html("");
		$("#jjobform").find("ul:eq(1) > li").unbind("click");
		$("#jjobform").find("input").val("");
		$("#jjobform").hide();
		$("#jjoballtail").show();
	});
	
	
	$("#jworkwindow").find("form:eq(0)").find("input:eq(3)").click(function(){ //显示薪水区间
		$("#salary-region").slideDown(500);
	});
	
	$("#salary-region").find("button:eq(1)").click(function(){ //关闭薪水区间
		$("#salary-region").find("input").val("");
		$("#salary-region").hide();
	});
	
	$("#salary-region").find("input").keyup(function(){ //校验输入是否为数字
		var sale = $.trim($(this).val());
		if(!parseInt(sale)){
			$(this).val("");
		}
	});
	
	$("#salary-region").find("button:eq(0)").click(function(){ //关闭薪水区间
		var minsa = $("#salary-region").find("input:eq(0)").val();
		var maxsa = $("#salary-region").find("input:eq(1)").val();
		if( minsa == ""&&maxsa=="" ){
			$("#salary-region").hide();
			return;
		}
		if( minsa!="" )
			minsa = parseInt( minsa );
		if( maxsa!="")
			maxsa = parseInt( maxsa );
		if( minsa!=""&&maxsa!=""){
			if( minsa > maxsa ){
				minsa = maxsa + minsa;
				maxsa = minsa - maxsa;
				minsa = minsa - maxsa;
			}
		}
		$("#jworkwindow").find("form:eq(0)").find("input:eq(3)").val( minsa+"-"+maxsa );
		$("#salary-region").find("input").val("");
		$("#salary-region").hide();
	});
	
	$("#jworkalldetail").find("table").mousedown(function(e){ //显示menu菜单栏
		if( e.button==2 ){
			var _Jien_BtnTemp = true;
			var m_left = e.pageX - $("#jworkwindow").position().left-12;
			var m_top = e.pageY - 140;
			$(document).on("contextmenu", function() {
				if(_Jien_BtnTemp){
					$("#Jien_Work_P").css({"margin-left":m_left,"margin-top":m_top}).show();
					_Jien_BtnTemp = false;
					return false;
				}else{
					return true;
				}
			}).on("click", function() {
				$("#Jien_Work_P").hide();
		    });;
		}
	});
	
	$("#Jien_Work_P").find("li:eq(0)").click(function(){  //就业添加按钮
		cascadeWork();
		$("#jworkform").find("button:eq(0)").text("添加");
		$("#jworkalldetail").hide();
		$("#jworkform").show();
	});
	
	$("#Jien_Work_P").find("li:eq(1)").click(function(){  //就业修改按钮
		var selectWid = jpageInit_Work.getSelectCheckbox();
		if( selectWid.length==0){
			alert("未选择就业对象！");
		}else if( selectWid.length==1 ){
			var tempTr = $("#jworkalldetail").find("table > tbody > tr:eq("+selectWid[0]+")");
			jwid = $(tempTr).find("td:eq(0)").text();
			$("#jworkform").find("input:eq(0)").val( $(tempTr).find("td:eq(3)").text() );
			$("#jworkform").find("input:eq(1)").val( $(tempTr).find("td:eq(4)").text() );
			$("#jworkform").find("input:eq(2)").val( $(tempTr).find("td:eq(5)").text() );
			$("#jworkform").find("input:eq(3)").val( $(tempTr).find("td:eq(9)").text() );
			$("#jworkform").find("input:eq(4)").val( $(tempTr).find("td:eq(10)").text() );
			$("#jworkform").find("input:eq(5)").val( $(tempTr).find("td:eq(8)").text() );
			$("#jworkform").find("input:eq(6)").val( $(tempTr).find("td:eq(11)").text() );
			$("#jworkform").find("input:eq(7)").val( $(tempTr).find("td:eq(12)").text() );
			$("#jworkform").find("button:eq(0)").text("修改");
			$("#jworkalldetail").hide();
			$("#jworkform").show();
		}else{
			var tempWorkHtml = "";
			for( var i=0;i<selectWid.length;i++ ){
				var tempTr = $("#jworkalldetail").find("table > tbody > tr:eq("+selectWid[i]+")");
				var tempwid = tempTr.find("td:eq(0)").text();
				var tempsnum = tempTr.find("td:eq(4)").text();
				var tempsname = tempTr.find("td:eq(5)").text();
				tempWorkHtml += "<li><input type='checkbox' name='jworkcs' checked='checked' value="+tempwid+" />学号："+tempsnum+" 姓名："+tempsname+"</li>"
			}
			$("#Jien_Work_Dialog_Body").find("ul:eq(0)").html(tempWorkHtml);
			$("#Jien_Work_Dialog_Body").find("button:eq(1)").text("确认");
			$("#Jien_Work_Dialog_Body").find("div:eq(0)").show();
			$("#Jien_Work_Dialog_Body").find("div:eq(1)").hide();
			$("#Jien_Work_P").find("li:eq(2)").click();
		}
	});
	
	$("#Jien_Work_Dialog_Body").find("button:eq(1)").click(function(){
		if( $(this).text()=="确认" ){
			jwid = "";
			$("input[name='jworkcs']:checked").each(function(){
				jwid += $(this).val()+",";
			});
			jwid = jwid.substring(0, jwid.length-1);
			$("#Jien_Work_Form").find("input").val("");
			$("#Jien_Work_Dialog_Body").find("div:eq(0)").hide();
			$("#Jien_Work_Dialog_Body").find("div:eq(1)").slideDown(500);
			$(this).text("批量修改");
		}else{
			$("#Jien_Work_Dialog_Body").find("button:eq(0)").click();
		}
	});
	
	$("#jworkbtn").find("button:eq(1)").click(function(){ //就业form表单返回按钮
		$("#jworkform").find("ul:eq(0)").html("");
		$("#jworkform").find("ul:eq(0) > li").unbind("click");
		$("#jworkform").find("ul:eq(1)").html("");
		$("#jworkform").find("ul:eq(1) > li").unbind("click");
		$("#jworkform").find("input").val("");
		$("#jworkalldetail").show();
		$("#jworkform").hide();
	});
}

function jQueryWork( obj ){
	Btn_JienLoading();  //显示正在查询
	var snum = $(obj).find("input:eq(0)").val();
	var cls = $(obj).find("input:eq(1)").val();
	var clsid = cls.substring(1,cls.lastIndexOf('）') );
	var times = $(obj).find("input:eq(2)").val();
	var salery = $(obj).find("input:eq(3)").val();
	var minsa = "";
	var maxsa = "";
	if( salery!="" ){
		var saly = salery.split("-");
		minsa = saly[0];
		maxsa = saly[1];
	}
	var city = $(obj).find("input:eq(6)").val();
	
	$.getJSON("WorkInfo_findWorkNeedInfo?t="+new Date(),{"queryInfo.snum":snum,"queryInfo.cid":clsid,"queryInfo.times":times,"queryInfo.minsa":minsa,
		"queryInfo.maxsa":maxsa,"queryInfo.city":city},function(data){
			isLoadSuccess = true;
			$(".btn-jien").button('complete');//显示data-complete-text标记内容
			if(data.worksInfo==null || data.worksInfo==""){
				var jworkdetailhtml = "<tr><td colspan='12'>查无数据，请确认查询条件！</td></tr>";
				var jworkpageshtml = "<li><a href='javascript:void(0)'>共0页</a></li>" +
				"<li><a href='javascript:void(0)'>首页</a></li>" +
				"<li><a href='javascript:void(0)'>末页</a></li>";
				$("#jworkalldetail").find("ul").html(jworkpageshtml);
				$("#jworkalldetail").find("table > tbody").html(jworkdetailhtml);
				$("#Jien_Work_P > li:eq(1)").hide();
				$("#Jien_Work_P > li:eq(3)").hide();
			}else{
				jwneedInfo = [];
				jwneedInfo = data.worksInfo;
				$("#Jien_Work_P > li:eq(1)").show();
				$("#Jien_Work_P > li:eq(3)").show();
				JWorkPage();
			}
		});
	
	return false;
}

function jworkoperate( obj ){
	var snum =  $(obj).find("input:eq(1)").val();
	var city =  $(obj).find("input:eq(3)").val();
	var company =  $(obj).find("input:eq(4)").val();
	var times =  $(obj).find("input:eq(5)").val();
	var position =  $(obj).find("input:eq(6)").val();
	var salary =  $(obj).find("input:eq(7)").val();
	if( snum=="" ||times=="" ){
		alert("就业信息不完整！");
		return false;
	}
	if( $(obj).find("button:eq(0)").text()=="添加" ){
		$.getJSON("WorkInfo_addSingWorks?t="+new Date(),{"worksInfo.snum":snum,"worksInfo.city":city,"worksInfo.company":company,
			"worksInfo.times":times,"worksInfo.position":position,"worksInfo.salary":salary},function(data){
				if(data.worksInfo==null||data.worksInfo==""){
					alert("添加失败！错误原因（数据有冲突，请联系管理员查看错误日志）");
				}else{
					alert("添加成功！");
					$("#jworkform").find("input").val("");
					if( jpageInit_Work!=null ){
						jwneedInfo[ jwneedInfo.length ] = data.worksInfo[0];
						var obj = data.worksInfo[0];
						var pwd = new pageWorkData(obj.city,obj.cname,obj.company,obj.idCard,obj.position,obj.salary,obj.sex,obj.sname,obj.snum,obj.times,obj.wid,jwneedInfo.length);
						jpageInit_Work.addSingData(pwd);
					}
				}
			});
	}else{
		$.getJSON("WorkInfo_updateSingWorks?t="+new Date(),{"worksInfo.wid":jwid,"worksInfo.city":city,"worksInfo.company":company,
			"worksInfo.times":times,"worksInfo.position":position,"worksInfo.salary":salary},function(data){
				if(data==0){
					alert("修改失败！错误原因（数据有冲突，请联系管理员查看错误日志）");
				}else{
					alert("修改成功！");
					if( jpageInit_Work!=null ){
						for(var i=0;i<jwneedInfo.length;i++  ){
							if( jwneedInfo[i].wid==jwid ){
								jwneedInfo[i].city = city;
								jwneedInfo[i].company = company;
								jwneedInfo[i].times = times;
								jwneedInfo[i].position = position;
								jwneedInfo[i].salary = salary;
								break;
							}
						}
						
						pageWorkDatas = [];
						for( var i=0; i<jwneedInfo.length;i++ ){
							var obj = jwneedInfo[i];
							var pwd = new pageWorkData(obj.city,obj.cname,obj.company,obj.idCard,obj.position,obj.salary,obj.sex,obj.sname,obj.snum,obj.times,obj.wid,i+1);
							pageWorkDatas.push(  pwd );
						}
						jpageInit_Work.changeData( pageWorkDatas );
					}
				}
			});
	}
	return false;
}

function batchUploadWork( obj ){
	var city = $(obj).find("input:eq(0)").val();
	var company = $(obj).find("input:eq(1)").val();
	var times = $(obj).find("input:eq(2)").val();
	var position = $(obj).find("input:eq(3)").val();
	var salary = $(obj).find("input:eq(4)").val();
	if( city==""&&company==""&&times==""&&position==""&&salary==""){
		alert("未选择需要修改的就业字段");
		return;
	}
	$.getJSON("WorkInfo_batchUpdateWorks?t="+new Date(),{"wids":jwid,"worksInfo.city":city,"worksInfo.company":company,"worksInfo.times":times,"worksInfo.position":position,"worksInfo.salary":salary},function(data){
		if(data==0){
			alert("批量修改失败，可能原因，修改后存在重复对象，请重新选择！");
			$("#Jien_Work_Dialog_Body").find("div:eq(0)").slideDown(500); //重新选择
			$("#Jien_Work_Dialog_Body").find("div:eq(1)").hide();
			$("#Jien_Work_Dialog_Body").find("button:eq(1)").text("确认");
		}else{
			alert("批量修改成功！");
			var wid = jwid.split(",");
			for( var i=0;i<jwneedInfo.length;i++ ){
				for( var k=0;k<wid.length;k++ ){
					if( jwneedInfo[i].wid==wid[k] ){
						if( city!="" )
							jwneedInfo[i].city = city;
						if( company!="")
							jwneedInfo[i].company = company;
						if( times!="")
							jwneedInfo[i].times = times;
						if(position!="")
							jwneedInfo[i].position = position;
						if( salary!="")
							jwneedInfo[i].salary = salary;
						break;
					}
				}
			}
			pageWorkDatas = [];
			for( var i=0; i<jwneedInfo.length;i++ ){
				var obj = jwneedInfo[i];
				var pwd = new pageWorkData(obj.city,obj.cname,obj.company,obj.idCard,obj.position,obj.salary,obj.sex,obj.sname,obj.snum,obj.times,obj.wid,i+1);
				pageWorkDatas.push(  pwd );
			}
			jpageInit_Work.changeData(pageWorkDatas);
		}
	});
	return false;
}

//勤工信息分页
function pageJobData(jid,begindate,cname,enddate,idCard,phone,position,sex,sname,snum,jindex){
    this.jid = jid;
    this.begindate = begindate;
    this.cname = cname;
    this.enddate = enddate;
    this.idCard = idCard;
    this.phone = phone;
    this.position = position;
    this.sex = sex;
    this.sname = sname;
    this.snum = snum;
    this.jindex = jindex;
    this.getAttr = function(attr){
    	if( attr=="jid" )
    		return this.jid;
    	if( attr=="begindate")
    		return this.begindate;
    	if( attr=="cname")
    		return this.cname;
    	if( attr=="enddate")
    		return this.enddate;
    	if( attr=="idCard")
    		return this.idCard;
    	if( attr=="phone")
    		return this.phone;
    	if( attr=="position")
    		return this.position;
    	if( attr=="sex")
    		return this.sex;
    	if( attr=="sname")
    		return this.sname;
    	if( attr=="snum")
    		return this.snum;
    	if( attr=="jindex")
    		return this.jindex;
    }
}


function JJobPage(){
	//自己定义好属性  一一对应
	pageJobDatas = [];
	for( var i=0; i<jjneedInfo.length;i++ ){
		var obj = jjneedInfo[i];
		var pjd = new pageJobData( obj.jid,obj.begindate,obj.cname,obj.enddate,obj.idCard,obj.phone,obj.position,obj.sex,obj.sname,obj.snum,i+1 );
		pageJobDatas.push( pjd );
	}
	
	jpageInit_Job =new JpageInit( pageJobDatas,"jjoballtail",8,5);  //调用这个函数 就可以分页了
	
}

//贷款信息分页
function pageHelpData(bank,cname,contract,hid,idcard,money,phone,sex,sname,snum,status,times,hindex){
    this.bank = bank;
    this.cname = cname;
    this.contract = contract;
    this.hid = hid;
    this.idcard = idcard;
    this.money = money;
    this.phone = phone;
    this.sex = sex;
    this.sname = sname;
    this.snum = snum;
    this.status = status;
    this.times = times;
    this.hindex = hindex;
    this.getAttr = function( attr ){ //最重要的就是这个函数  因为JSON数据只能通过.属性名 才能获取属性值  分页时并不方便  只能添加这个函数来取值
          if(attr=="hid"){
        	  return this.hid;
          }else if( attr=="bank" ){
        	  return this.bank;
          }else if( attr=="cname" ){
        	  return this.cname;
          }else if( attr=="contract" ){
        	  return this.contract;
          }else if( attr=="idcard" ){
        	  return this.idcard;
          }else if( attr=="money" ){
        	  return this.money;
          }else if( attr=="phone" ){
        	  return this.phone;
          }else if( attr=="sex" ){
        	  return this.sex;
          }else if( attr=="sname" ){
        	  return this.sname;
          }else if( attr=="snum" ){
        	  return this.snum;
          }else if( attr=="status" ){
        	  return this.status;
          }else if( attr=="times" ){
        	  return this.times;
          }else if( attr=="hindex" ){
        	  return this.hindex;
          }
    }
}

function JHelpPage(){
	//自己定义好属性  一一对应
	pageHelpDatas = [];
	for( var i=0; i<jhneedInfo.length;i++ ){
		var pd = new pageHelpData(jhneedInfo[i].bank,jhneedInfo[i].cname,jhneedInfo[i].contract,jhneedInfo[i].hid,
				jhneedInfo[i].idcard,jhneedInfo[i].money,jhneedInfo[i].phone,jhneedInfo[i].sex,jhneedInfo[i].sname,
				jhneedInfo[i].snum,jhneedInfo[i].status,jhneedInfo[i].times,i+1  );
		pageHelpDatas.push( pd );
	}
	
	jpageInit =new JpageInit( pageHelpDatas,"jhelpalldetail",8,5);  //调用这个函数 就可以分页了
}

function pageWorkData(city,cname,company,idCard,position,salary,sex,sname,snum,times,wid,windex){
	this.city = city;
	this.cname = cname;
	this.company = company;
	this.idCard = idCard;
	this.position = position;
	this.salary = salary;
	this.sex = sex;
	this.sname = sname;
	this.snum = snum;
	this.times = times;
	this.wid = wid;
	this.windex = windex;
	this.getAttr = function( attr ){
		if( attr=="city" )
			return this.city;
		if( attr=="cname" )
			return this.cname;
		if( attr=="company" )
			return this.company;
		if( attr=="idCard" )
			return this.idCard;
		if( attr=="position" )
			return this.position;
		if( attr=="salary" )
			return this.salary;
		if( attr=="sex" )
			return this.sex;
		if( attr=="sname" )
			return this.sname;
		if( attr=="snum" )
			return this.snum;
		if( attr=="times" )
			return this.times;
		if( attr=="wid")
			return this.wid;
		if( attr=="windex")
			return this.windex;
	}
}

function JWorkPage(){
	pageWorkDatas = [];
	for( var i=0; i<jwneedInfo.length;i++ ){
		var obj = jwneedInfo[i];
		var pwd = new pageWorkData(obj.city,obj.cname,obj.company,obj.idCard,obj.position,obj.salary,obj.sex,obj.sname,obj.snum,obj.times,obj.wid,i+1);
		pageWorkDatas.push(  pwd );
	}
	jpageInit_Work =new JpageInit( pageWorkDatas,"jworkalldetail",8,5);  //调用这个函数 就可以分页了
}

function pageBack( func ){    //这个是分页的回调函数  不需要改变
	this.fun = func;
}

function Btn_JienLoading( ){
	isLoadSuccess = false;
	$(".btn-jien").button('loading');//显示data-loading-text 标记内容   当查询成功之后再显示  查询
	function doFinished(){
		if( !isLoadSuccess ){
			$(".btn-jien").button('complete');//如果在规定的时间内未能成功加载  继续显示按钮
			alert("查询失败，请确认您的网络状态！");
		}
	}
	setTimeout(doFinished,jloadTimeOut*1000);//规定时间加载失败
}

//TODO  为所有导出时间   clazz:对象名  sessionValue:你查询出来时存储在session中的数据  modelTableName:模板表名(不需要后缀.xls)   ColumnName:与模板表中的对应的字段   如（学号，姓名，性别）数据以中文逗号分割
function BtnExport(clazz,sessionValue,modelTableName, ColumnName ){
	
	Jclazz = clazz;
	JsessionValue = sessionValue;
	JmodelTableName = modelTableName;
	var allColumnName = ColumnName.split("，");
	$("#Jien_ExportDialog").find("ul:eq(0)").html("");
	$("#Jien_ExportDialog").find("a:eq(0)").hide();
	$("#Jien_ExportDialog").find("a:eq(0)").attr("href","javascript:void(0)")
	var exportHtml = "";
	for(var i=0;i<allColumnName.length;i++){
		exportHtml  += "<li><input type='checkbox' checked='checked' name='selectExportCoulmn' value="+(i+1)+">"+allColumnName[i]+"</li>"
	}
	$("#Jien_ExportDialog").find("ul:eq(0)").html(exportHtml);
	$("#ExportBtn").click();
}

$(function(){
	$("#Jien_ExportDialog").find("button:eq(1)").click(function(){
		var SelectExportColumn = "";
		$("input[name='selectExportCoulmn']:checked").each(function(){
			SelectExportColumn += $(this).val() + ",";
		});
		SelectExportColumn = SelectExportColumn.substring(0, SelectExportColumn.length-1);
		
		
		$.getJSON("Export_exportData",{"Jclazz":Jclazz,"JsessionValue":JsessionValue,"JmodelTableName":JmodelTableName,"SelectExportColumn":SelectExportColumn},function(data){
			if(data.error!=null){
				alert(data.error);
			}else{
				alert("导出完成，请及时完成下载！");
				$("#Jien_ExportDialog").find("a:eq(0)").attr("href",data.file);
				$("#Jien_ExportDialog").find("a:eq(0)").show();
			}
		});
	});
});






