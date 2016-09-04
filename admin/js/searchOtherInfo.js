var lp_flag = false;  //用来做是否已经发送请求判断
var lp_isLoadSuccess = false; //判断是否加载失败
var lp_jhneedInfo=[];
var lp_pageHelpDatas = []; //贷款分页用的数据对象
var lp_jpageInit; 
var lp_jclsInfo = [];  //当前登录管理员管理的班级信息
var lp_clsInfoHtml="";
var lp_jhid;

//页面跳转
function LpHonerShow(){
	displayNone();
	if( !lp_flag ){
		lp_findClass();
	}
	$("#lp_searchHonour").css("display","block");  //荣誉信息界面
}
//查询数据
function lp_searchHonour(){
	var snum = $("#lp_stuHonorId").val();
	var sname = $("#lp_stuHonorName").val();
	var classes = $("#lp_class").val();
	$.getJSON("StuHonorInfo_searchHorInfo?data="+new Date(),{
			"honor.snum":snum,
			"honor.sname":sname,
			"honor.cname":classes
		},function(data){
		if(data.searchHorInfo==null || data.searchHorInfo==""){
			var jhelpdetailhtml = "<tr><td colspan='12'>查无数据，请确认查询条件！</td></tr>";
			var jhelppageshtml = "<li><a href='javascript:void(0)'>共0页</a></li>" +
			"<li><a href='javascript:void(0)'>首页</a></li>" +
			"<li><a href='javascript:void(0)'>末页</a></li>";
			$("#lp_searchHonourDetail").find("ul").html(jhelppageshtml);
			$("#lp_searchHonourDetail").find("table > tbody").html(jhelpdetailhtml);
			$("#lp_Jien_Help_P > li:eq(1)").hide();
			$("#lp_Jien_Help_P > li:eq(3)").hide();
		}else{
			 lp_jhneedInfo = [];
			 lp_jhneedInfo = data.searchHorInfo;
			$("#lp_Jien_Help_P > li:eq(1)").show();
			$("#lp_Jien_Help_P > li:eq(3)").show();
			lp_JHelpPage();
		}
		lp_isLoadSuccess = true;
		$(".btn-lp").button('complete');//登陆成功后，显示data-complete-text标记内容
	});
	return false;
}
//数据初始化
function lp_pageDate(hid,snum,sname,cname,hname,levels,term,times,sex,prole,tel){
	this.hid=hid;
	this.snum=snum;
	this.sname=sname;
	this.cname=cname;
	this.hname=hname;
	this.levels=levels;
	this.term=term;
	this.times=times;
	this.sex=sex;
	this.prole=prole;
	this.tel=tel;
	this.getAttr = function( attr ){
		if(attr=="hid"){
			return this.hid;
		}else if(attr=="snum"){
			return this.snum;
		}else if(attr=="sname"){
			return this.sname;
		}else if(attr=="cname"){
			return this.cname;
		}else if(attr=="hname"){
			return this.hname;//
		}else if(attr=="levels"){
			return this.levels;
		}else if(attr=="term"){
			return this.term;
		}else if(attr=="times"){
			return this.times;
		}else if(attr=="prole"){
			return this.prole;
		}else if(attr=="sex"){
			return this.sex;
		}else if(attr=="tel"){
			return this.tel;
		}
	}
}
//分页
function lp_JHelpPage(){
	lp_pageHelpDatas = [];
	for( var i=0; i<lp_jhneedInfo.length;i++ ){
		var obj = lp_jhneedInfo[i];
		var lp_levels;  //等级
		if(obj.levels==1){
			lp_levels="校级";
		}else if(obj.levels==2){
			lp_levels="院级";
		}else{
			lp_levels="无";
		}
		var trems;      //学期
		if(obj.term==1){
			trems="上学期";
		}else if(obj.term==2){
			trems="下学期";
		}else{
			trems="无";
		}
		var pd = new lp_pageDate(obj.hid,obj.snum,obj.sname,obj.cname,obj.hname,lp_levels,trems,
				obj.times,obj.sex,obj.prole,obj.tel);
		lp_pageHelpDatas.push( pd );
	}
	lp_jpageInit =new JpageInit( lp_pageHelpDatas,"lp_searchHonourDetail",8,5);  //调用这个函数 就可以分页了
}
//初始化班级
function lp_findClass(){
	lp_flag = true;
	$.getJSON('AdminLogin_findHelpInfo',function(data){
		if(data.clsInfo!=""){
			lp_jclsInfo = data.clsInfo;  //将当前登录管理员的管理的班级信息赋值给jclsInfo
			for( var i=0;i<lp_jclsInfo.length;i++ ){
				lp_clsInfoHtml += "<li>"+lp_jclsInfo[i].cname+"</li>";
			}
		}
		$("#lp_stuHonorClass").html(lp_clsInfoHtml);
		$("#lp_stuHonorClass > li").click(function(){
			$("#lp_class").val($.trim($(this).text()));
		});
	});
	/**
	 * 返回设置
	 */
	$("#lp_jhelpbtn").find("button:eq(1)").click(function(){ 
		$("#lp_stuHonorClass").html(""); //清空班级下拉列表
		$("#lp_stuHonorClass > li").unbind("click");   //取消序号下拉列表绑定事件
		$("#lp_jhelptable").find("input").val(""); //清空输入框
		$("#lp_jhelptable").find("input:eq(0)").attr('readonly','readonly');
		$("#lp_jhelptable").find("input:eq(1)").attr('readonly','readonly');
		$("#lp_searchHonourDetail").css("display","block");
		$("#lp_jhelptable").css("display","none");
	});
	/**
	 * 右键属性
	 */
	$("#lp_searchHonourDetail").find("table").mousedown(function(e){ //显示menu菜单栏
		if( e.button==2 ){
			var _Jien_BtnTemp = true;
			var m_left = e.pageX - $("#lp_searchHonour").position().left-12;
			var m_top = e.pageY - 140;
			$(document).on("contextmenu", function() {
				if(_Jien_BtnTemp){
					$("#lp_Jien_Help_P").css({"margin-left":m_left,"margin-top":m_top}).show();
					_Jien_BtnTemp = false;
					return false;
				}else{
					return true;
				}
			}).on("click", function() {
				$("#lp_Jien_Help_P").hide();
		    });;
		}
	});
	
	//  单个荣誉添加
	$("#lp_Jien_Help_P").find("li:eq(0)").click(function(){
		$("#lp_jhelptable").find("input:eq(0)").removeAttr('readonly');
		$("#lp_jhelptable").find("input:eq(1)").removeAttr('readonly');
		$("#lp_jhelpbtn").find("button:eq(0)").text("添加");
		$("#lp_searchHonourDetail").hide();
		$("#lp_jhelptable").show();
		
		$("#lp_jhelptable").find("ul:eq(0) > li").click(function(){
			$("#lp_jhelptable").find("input:eq(3)").val($(this).text());
		});
		$("#lp_jhelptable").find("ul:eq(1) > li").click(function(){
			$("#lp_jhelptable").find("input:eq(5)").val($(this).text());
		});
	});
	/**
	 * 批量单个修改
	 */
	$("#lp_Jien_Help_P").find("li:eq(1)").click(function(){
		var selectdid = lp_jpageInit.getSelectCheckbox();
		if( selectdid.length==0){
			alert("未选择荣誉对象！");
		}else if( selectdid.length==1 ){
			var tempTr = $("#lp_searchHonourDetail").find("table > tbody > tr:eq("+selectdid[0]+")");
			lp_jhid = $(tempTr).find("td:eq(0)").text();
			var honor_snum=$(tempTr).find("td:eq(2)").text();
			var honor_sname=$(tempTr).find("td:eq(3)").text();
			var honor_time=$(tempTr).find("td:eq(8)").text();
			var honor_hname=$(tempTr).find("td:eq(5)").text();
			var honor_levels=$(tempTr).find("td:eq(6)").text();
			var honor_term=$(tempTr).find("td:eq(7)").text();
			
			//将数据存到要修改的界面上
			var honor_rep = $("#lp_jhelptable");
			honor_rep.find("input:eq(0)").val(honor_snum);
			honor_rep.find("input:eq(1)").val(honor_sname);
			honor_rep.find("input:eq(2)").val(honor_hname);
			honor_rep.find("input:eq(3)").val(honor_term);
			honor_rep.find("input:eq(4)").val(honor_time);
			honor_rep.find("input:eq(5)").val(honor_levels);
			
			$("#lp_jhelpbtn").find("button:eq(0)").text("修改");
			$("#lp_searchHonourDetail").hide();
			$("#lp_jhelptable").show();
			
			$("#lp_jhelptable").find("ul:eq(0) > li").click(function(){
				$("#lp_jhelptable").find("input:eq(3)").val($(this).text());
			});
			$("#lp_jhelptable").find("ul:eq(1) > li").click(function(){
				$("#lp_jhelptable").find("input:eq(5)").val($(this).text());
			});
		}else{
			var lp_confirmed = window.confirm("您选了"+selectdid.length+"个对象修改，您确定修改?"); 
			
			if(lp_confirmed){
				var hid_Str1='';
				var lpshowcshtml='';
				for(var i=0;i<selectdid.length;i++){
					var tempTr = $("#lp_searchHonourDetail").find("table > tbody > tr:eq("+selectdid[i]+")");
					var lp_jhid_de = $(tempTr).find("td:eq(0)").text();
					
					var temphid = $(tempTr).find("td:eq(0)").text();
					var tempid = $(tempTr).find("td:eq(2)").text();
					var tempName = $(tempTr).find("td:eq(3)").text();
					hid_Str1+=+lp_jhid_de+',';
					lpshowcshtml += "<li><input type='checkbox' name='jhelpcs' disabled='true' checked='checked' value="+temphid+" />学号："+tempid+"  姓名："+tempName+" </li>"
				}
				var hid_Str12=hid_Str1.substring(0, hid_Str1.length-1);
				var hid_Str="("+hid_Str12+")";
				$("#lp_Jien_Help_P > li:eq(2)").click();
				$("#lp_jienshowcs").find("div:eq(0)").show();
				$("#lp_jienshowcs").find("div:eq(1)").hide();
				$("#lp_selectHonor ul").html(lpshowcshtml);
				$("#lp_Honor_Dialog_Form").show();
				//选择
				$("#lp_Honor_Dialog_Form").find("ul:eq(0) > li").click(function(){
					$("#lp_Honor_Dialog_Form").find("input:eq(1)").val($(this).text());
				});
				$("#lp_Honor_Dialog_Form").find("ul:eq(1) > li").click(function(){
					$("#lp_Honor_Dialog_Form").find("input:eq(3)").val($(this).text());
				});
				//确认修改
				$("#lp_jienshowcs").find('button').click(function(){
					var honor_rep = $("#lp_Honor_Dialog_Form");
					
					var honor_hname=honor_rep.find("input:eq(0)").val().trim();
				    var honor_term=honor_rep.find("input:eq(1)").val().trim();
					var honor_time=honor_rep.find("input:eq(2)").val().trim();
					var honor_levels=honor_rep.find("input:eq(3)").val().trim();
					//alert("lp"+honor_snum+"lp"+honor_sname+"lp"+honor_time+"lp"+honor_hname+"lp"+honor_term+"lp"+honor_levels+"lp");
					var terms;
					var leveles;
					if("上学期"==honor_term){
						terms=1;
					}else if("下学期"==honor_term){
						terms=2;
					}
					if(honor_levels=="校级"){
						leveles=1;
					}else if(honor_levels=="校级"){
						leveles=2;
					}
					//alert("lp"+honor_time+"lp"+honor_hname+"lp"+honor_term+"lp"+honor_levels+"lp");
					//批量更新
					$.post("StuHonorInfo_updataBatchStu",{
						"hid_Str_batch":hid_Str,
						"honor.hname":honor_hname,
						"honor.term":terms,
						"honor.times":honor_time,
						"honor.levels":leveles
					},function(data){
						if(data>=1){
							alert("修改成功！");
							lp_searchHonour();//刷新table
							$("#Lp_Honor_Dialog").css("display","none");
							$(".modal-backdrop ").css("display","none");
						}else{
							alert("修改出错，请重新修改！");
						}
					});
				});
			}
		}
	});
	/**
	 * 删除操作
	 */
	$("#lp_Jien_Help_P").find("li:eq(3)").click(function(){
		var selectdid = lp_jpageInit.getSelectCheckbox();
		if( selectdid.length==0){
			alert("未选择荣誉对象！");
		}else {
			var lp_confirmed = window.confirm("您选了"+selectdid.length+"个对象，删除将不能恢复，您确定删除?"); 
			
			if(lp_confirmed){
				var hid_Str1='';
				for(var i=0;i<selectdid.length;i++){
					var tempTr = $("#lp_searchHonourDetail").find("table > tbody > tr:eq("+selectdid[i]+")");
					var lp_jhid_de = $(tempTr).find("td:eq(0)").text();
					hid_Str1+=+lp_jhid_de+',';
				}
				var hid_Str12=hid_Str1.substring(0, hid_Str1.length-1);
				var hid_Str="("+hid_Str12+")";
				$.post("StuHonorInfo_deleteSingleStus",{
					"hid_Str":hid_Str
				},function(data){
					if(data>=1){
						alert("删除成功！");
						lp_searchHonour();//刷新table
					}else{
						alert("删除失败！");
					}
				});
			}
		}
	});
}
//单个修改或添加
function lp_honorPoperate(){
	var honor_rep = $("#lp_jhelptable");
	var honor_snum=honor_rep.find("input:eq(0)").val().trim();
	var honor_sname=honor_rep.find("input:eq(1)").val().trim();
	var honor_hname=honor_rep.find("input:eq(2)").val().trim();
    var honor_term=honor_rep.find("input:eq(3)").val().trim();
	var honor_time=honor_rep.find("input:eq(4)").val().trim();
	var honor_levels=honor_rep.find("input:eq(5)").val().trim();
	//alert("lp"+honor_snum+"lp"+honor_sname+"lp"+honor_time+"lp"+honor_hname+"lp"+honor_term+"lp"+honor_levels+"lp");
	var terms;
	var leveles;
	if("上学期"==honor_term){
		terms=1;
	}else if("下学期"==honor_term){
		terms=2;
	}
	if(honor_levels=="校级"){
		leveles=1;
	}else if(honor_levels=="院级"){
		leveles=2;
	}
	
	//是否是添加操作
	var flag=$("#lp_jhelpbtn").find("button:eq(0)").text();
	if("修改"==flag){
		$.post("StuHonorInfo_updataSingleStu",{
			"honor.hid":lp_jhid,
			"honor.hname":honor_hname,
			"honor.term":terms,
			"honor.times":honor_time,
			"honor.levels":leveles
		},function(data){
			if(data==1){
				alert("修改成功！");
				lp_searchHonour();//刷新table
			}else{
				alert("修改出错，请重新修改！");
			}
		});
	}else{
		$.post("StuHonorInfo_addSingleStu",{
			"honor.snum":honor_snum,
			"honor.sname":honor_sname,
			"honor.hname":honor_hname,
			"honor.term":terms,
			"honor.times":honor_time,
			"honor.levels":leveles
		},function(data){
			if(data==1){
				alert("添加成功！");
				lp_searchHonour();//刷新table
			}else{
				alert("添加失败，请确认所填信息是否正确！");
			}
		});
	}
	return false;
}





















