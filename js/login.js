/**
 * Created by dkaij on 14-1-11.
 */
window.onload=function(){
	$(window).resize(function(){
		$(".container").css("position","fixed").css("top",($(window).height()-$(".container").height())/2)
		.css("left",($(window).width()-$(".container").width())/2);
	});
	$.getJSON("AdminLogin_indexdb.action",function(data){
		if( data!=""){
			if(data.departments!=null){
				var info="";
				$.each(data.departments,function(index,item){
					info+="<li><a id='part"+(index+1)+"' href='javascript:part(\"part"+(index+1)+"\",\"part\")'>"+item.dname+"("+item.did+")</a></li>";
				});
				$(".school_part").html(info);
			}
		}
	});
}
$(function(){ 
		$(".container").css("position","fixed").css("top",($(window).height()-$(".container").height())/2)
		.css("left",($(window).width()-$(".container").width())/2);
		
		$('.close-button').click(function(){
			$(this).parent().removeClass("slidePageInFromLeft").addClass("slidePageBackLeft");
		});		
	});
	
	

	function login(id,role) {
    	var flag = $("#"+id).text();
    	$("#"+role).val(flag);
	}
	
	function part(id,part) {
    	var flag = $("#"+id).text();
    	$("#"+part).val(flag);
	}
	
	function showRegisterPage(){
		$(".register-page").addClass("slidePageInFromLeft").removeClass("slidePageBackLeft");
	}
	
	function backlogin(){
		$(".register-page").removeClass("slidePageInFromLeft").addClass("slidePageBackLeft");
	}
	
	function showloginbut(){
		$(".adlogins").attr("disabled",false);
	}
//管理员登陆
function adminLogin() {
	var role=$.trim($("#loginrole").val());
	var aname=$.trim($("#uname").val());
	var pwd=$.trim($("#pwd").val());
	if(role==null || aname==null || pwd==null || role=="" || aname=="" || pwd==""){
		alert("信息不完整!!!");
		return;
	}
	$(".adlogins").attr("disabled",true);
	timelogs=setTimeout("showloginbut();",3000);
	$.post("AdminLogin_login.action?t="+new Date(),{'adminInfo.aname':aname,'adminInfo.pwd':pwd,'adminInfo.urname':role},function(data){
		if(parseInt(data)>0){
			location.href="/cscms/admin/index.html";
		}else if(data==0){
			var a = window.prompt("您的申请未通过，如需继续申请请填写理由!"); 
			if(a){
				$.post("AdminLogin_shenqinagain.action?t="+new Date(),{'adminInfo.aname':aname,'adminInfo.reason':a},function(data){
					if(parseInt(data)>0){
						alert("再次申请成功，请等待上级管理员审核!");
					}else{
						alert("再次申请失败...");
					}
				});		
			}else{
				$.post("AdminLogin_shenqinQuxiao.action?t="+new Date(),{'adminInfo.aname':aname},function(data){
					if(parseInt(data)>0){
						alert("您已取消此次申请!");
					}else{
						alert("操作失败...");
					}
				});		
				return;
			}
		}else{
			alert("登录失败,请确认用户名和密码!");
		}
	});
}
//换验证码图片
function changeVilidateCode(obj){
	var timenow=new Date().getTime();
	obj.src="template/valiCodeImg.jsp?d="+timenow;
}

$(function (){
	$("#vcode").keyup(function(){
		var text=$("#vcode").val();
		if(text.length==4){
			checkcode();
		}
	});
})

function checkcode(){
	var vcode=$("#vcode").val();
	$.post("AdminLogin_checkCode.action?t="+new Date(),{'adminInfo.temp1':vcode},function(data){
		if(parseInt(data)>0){
			$(".adlogins").attr("disabled",false);
			$("#vcode").attr("placeholder","验证码正确 !!!");
		}else{
			$("#vcode").val("");
			$("#vcode").attr("placeholder","验证码错误 请重试...");
			$(".adlogins").attr("disabled",true);
		}
	});
}
//
function checkname(){
	var uname=$("#rname").val();
	var reg=/^([a-zA-Z0-9\u4E00-\u9FA5_-]{2,12})/;
	if(uname.match(reg)){
		$("#ckaname").text("该用户名格式正确可以使用 ");
		$("#ckaname").css("color","#008000");
	}else{
		$("#rname").val("");
		$("#ckaname").text("用户名格式错误  请修改 ...");
		$("#ckaname").css("color","#FF0000");
	}
}

function checkpassword(){
	var pwd=$("#rpwd").val();
	var reg=/^([a-zA-Z0-9_-]{6,20})/;
	if(pwd.match(reg)){
		$("#ckpassword").text("您设置的密码格式正确可以使用 ");
		$("#ckpassword").css("color","#008000");
	}else{
		$("#rpwd").val("");
		$("#ckpassword").text("您设置的密码格式错误  请修改... ");
		$("#ckpassword").css("color","#FF0000");
	}
}

function checkpasswordagain(){
	var pwd=$("#rpwd").val();
	var pwdag=$("#rpwds").val();
	if(pwd==pwdag){
		$("#ckpasswordagain").text("两次输入的密码一致可以使用");
		$("#ckpasswordagain").css("color","#008000");
	}else{
		$("#rpwds").val("");
		$("#ckpasswordagain").text("两次输入的密码不一致请检查后再次填写 ...");
		$("#ckpasswordagain").css("color","#FF0000");
	}
}

function checkemail(){
	var email=$("#email").val();
	var reg=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
	if(email.match(reg)){
		$("#ckemail").text("您输入的邮箱格式正确  可以使用");
		$("#ckemail").css("color","#008000");
	}else{
		$("#email").val("");
		$("#ckemail").text("您输入的邮箱格式不正确  请检查修改...");
		$("#ckemail").css("color","#FF0000");
	}
}

function checktel(){
	var tel=$("#tel").val();
	var reg=/^([0-9]{7,12})/;
	if(tel.match(reg)){
		$("#cktel").text("您输入的电话格式正确  可以使用");
		$("#cktel").css("color","#008000");
	}else{
		$("#tel").val("");
		$("#cktel").text("您输入的电话格式不正确  请检查修改...");
		$("#cktel").css("color","#FF0000");
	}
}

function checkreson(){
	var reson=$("#reson").val();
	if(reson==null || reson==""){
		$("#ckreson").text("您必须填写申请信息,以便管理员审核...");
		$("#ckreson").css("color","#FF0000");
		return;
	}else{
		$("#ckreson").text("申请信息通过验证");
		$("#ckreson").css("color","#008000");
	}
}
function adminreg(){
	$(".user-register").attr("disabled",false);
}
function adminregister(){
	var uname=$("#rname").val();
	var pwd=$("#rpwd").val();
	var email=$("#email").val();
	var reson=$("#reson").val();
	var role=$("#role").val();
	var part=$("#part").val();
	var tel=$("#tel").val();
	if(uname==null||uname=="" || pwd==null || pwd=="" ||email==null||email==""||reson==null ||reson=="" ||role==null||role==""||part==null||part=="" || tel=="" ||tel==null){
		alert("信息不完整 请检查...");
	}else{
		$(".user-register").attr("disabled",true);
		zcout=setTimeout("adminreg();",3000);
		$.post("AdminLogin_adminRegister.action?t="+new Date(),{'adminInfo.aname':uname,'adminInfo.pwd':pwd,'adminInfo.email':email,'adminInfo.reason':reson,'adminInfo.phone':tel,'adminInfo.temp1':role,'adminInfo.temp2':part},function(data){
			if(parseInt(data)>0){
				alert("恭喜您,管理员注册成功!!!");
				location.href="/cscms/login.html";
			}else{
				alert("管理员注册失败,请重试...");
			}
		});
		$("#rname").val("");
		$("#rpwd").val("");
		$("#rpwds").val("");
		$("#email").val("");
		$("#reson").val("");
		$("#role").val("");
		$("#part").val("");
		$("#tel").val("");
	}
}
//Enter登录
$(document).keydown(function(event){
	
	switch(event.keyCode){
		case 13:
			var asd=$(".adlogins").attr("disabled");
			if(!asd){
				$("#lp_login").click(adminLogin());
				break;
			}else{
				break;
			}
	}
});
