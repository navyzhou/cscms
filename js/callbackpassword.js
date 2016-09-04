$(function() {
	/*邮箱*/
	$("#email").blur(function(){
		$(".rcodeInfo strong").text($(this).val());
	});
	
	$('#navigation').show();
    $('#navigation #accountinfo').bind('click',function(e){
		var $this=$(this);
		if($this.attr("href")!="#"){
			return;
		}else{
			$this.closest('ul').find('li').removeClass('selected');
			$this.parent().addClass('selected');
			$this.parent().find("span").addClass("checked").removeClass("error");
			
			var num=$this.data("type-name");
			$('#steps').stop().animate({marginLeft:'-'+num*600+'px'},500);
			
			$('#navigation #accountinfo').bind('click',function(e){
				var $this=$(this);
				if($this.attr("href")!="#"){
					return;
				}else{
					$this.closest('ul').find('li').removeClass('selected');
					$this.parent().addClass('selected');
					$this.parent().find("span").addClass("checked").removeClass("error");
					
					var num=$this.data("type-name");
					$('#steps').stop().animate({marginLeft:'-'+num*600+'px'},500);
				}
		    });
		}
    });
});

/*输入验证码后的下一步，即新密码设置*/
function nextstep(){
	$("#navigation li").removeClass("selected");
	$("#newpwdli").addClass("selected");
	$("#newpwdli a").attr("href","#");
	$("#newpwdli span").addClass("checked").removeClass("error");
	$('#steps').stop().animate({marginLeft:'-1200px'},500);
}

/*获取验证码*/
function getCodeInfo(){
	var email=$("#a").val();
	$.post("AdminLogin_getCodeInfo.action",{'adminInfo.email':email},function(data){
		if(data.length>5){
			$("#navigation li").removeClass("selected");
			$("#navigation li:eq(1)").addClass("selected");
//			$("#navigation li span:eq(1)").addClass("correct").removeClass("error");
			$('#steps').stop().animate({marginLeft:'-600px'},500);
			
			$('#navigation #inputyzm').bind('click',function(e){
				var $this=$(this);
				if($this.attr("href")!="#"){
					return;
				}else{
					$this.closest('ul').find('li').removeClass('selected');
					$this.parent().addClass('selected');
					$this.parent().find("span").addClass("checked").removeClass("error");
					
					var num=$this.data("type-name");
					$('#steps').stop().animate({marginLeft:'-'+num*600+'px'},500);
				}
		    });
		}else{
			return;
		}
		
	});
	
	
	
}

function changepwdCheck(){
	var uname=$("#username").val();
	var email=$("#a").val();
	if(uname!=null && uname!="" && email!=null && email!=""){
		$.post("AdminLogin_changePwdCheck.action",{'adminInfo.aname':uname,'adminInfo.email':email},function(data){
			if(parseInt(data)>0){
				$("#aidss").val(data);
				$("#aswe").addClass("correct").removeClass("error");
				$("#aswe1").addClass("checked").removeClass("error");
				$("#callbackemail").text("点击获取验证码");
				$("#callbackemail").css("color","#008000");
				$("#getthecode").attr("disabled",false);
			}else{
				return;
			}
		});
	}else{
		$("#callbackemail").text("此页信息必须填满...");
		$("#callbackemail").css("color","#FF0000");
	}
}
function onblurcode(){
	var code2=$("#rcode").val();
	$.post("AdminLogin_changeCodes.action",{'code':code2},function(data){
		if(parseInt(data)>0){
			$("#Thenext1").attr("disabled",false);
			$("#aswe1").addClass("correct").removeClass("checked");
			$("#callbackcheckcode").text("验证码正确");
			$("#callbackcheckcode").css("color","#008000");
			
			$('#navigation #newpassword').bind('click',function(e){
				var $this=$(this);
				if($this.attr("href")!="#"){
					return;
				}else{
					$this.closest('ul').find('li').removeClass('selected');
					$this.parent().addClass('selected');
					$this.parent().find("span").addClass("checked").removeClass("error");
					
					var num=$this.data("type-name");
					$('#steps').stop().animate({marginLeft:'-'+num*600+'px'},500);
				}
		    });
		}else{
			$("#rcode").val("");
			$("#callbackcheckcode").text("验证码错误...");
			$("#callbackcheckcode").css("color","#FF0000");
			return;
		}
	});
}

function checknewpwd(){
	var pwd=$.trim($("#newpwd").val());
	var reg=/^([a-zA-Z0-9_-]{6,20})/;
	if(pwd.match(reg)){
		$("#pwdmsg").text("您设置的密码格式正确可以使用 ");
		$("#pwdmsg").css("color","#008000");
	}else{
		$("#newpwd").val("");
		$("#pwdmsg").text("您设置的密码格式错误  请修改... ");
		$("#pwdmsg").css("color","#FF0000");
	}
}

function checknewpwdagain(){
	var pwd=$.trim($("#rpwds").val());
	var pwd2=$.trim($("#newpwd").val());
	if(pwd==pwd2){
		$("#pwdmsg").text("两次密码输入一致,可以进行下一步");
		$("#pwdmsg").css("color","#008000");
		$("#lastcheck").attr("disabled",false);
		$("#aswe2").addClass("correct").removeClass("checked");
	}else{
		$("#rpwds").val("");
		$("#pwdmsg").text("两次密码不一致 ,请修改... ");
		$("#pwdmsg").css("color","#FF0000");
	}
}
function changeadminpwd(){
	var pwd=$.trim($("#rpwds").val());
	var aid=$.trim($("#aidss").val());
	$.post("AdminLogin_changeAdminPwd.action",{'adminInfo.aid':aid,'adminInfo.pwd':pwd},function(data){
		if(parseInt(data)>0){
			alert("恭喜您,密码修改成功!!!");
			$("#lastcheck").attr("disabled",true);
		}else{
			alert("对不起,密码修改失败...");
			return;
		}
	});
}