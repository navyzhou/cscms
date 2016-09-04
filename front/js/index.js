var tableInit="<tr>"+
    "<td class=\"titleBgColor width80\">学号</td><td width=\"150px\">${snum}</td>"+
    "<td class=\"titleBgColor\" width=\"100px\">姓名</td><td width=\"140px\">${sname}</td>"+
    "<td class=\"titleBgColor width110\">联系方式</td><td width=\"110px\">${phone}</td>"+
    "<td class=\"titleBgColor width80\">性别</td><td>${sex}</td>"+
    "<td rowspan=\"7\" width=\"130px\"><img src=\"${photo}\" width=\"120px\" height=\"150px\" alt=\"${photo}\" title=\"${sname}\"/><p><a href=\"#\">修改图像</a></p></td>"+
"</tr>"+
    "<tr>"+
    "<td class=\"titleBgColor\">学院</td><td>${dname}</td>"+
    "<td class=\"titleBgColor\">专业</td><td>${mname}</td>"+
    "<td class=\"titleBgColor\">所在班级</td><td>${cname}</td>"+
    "<td class=\"titleBgColor\">宿舍</td><td>${dorm}</td>"+
"</tr>"+
    "<tr>"+
    "<td class=\"titleBgColor\">QQ</td><td>${qqnum}</td>"+
    "<td class=\"titleBgColor\">邮箱</td><td>${email}</td>"+
    "<td class=\"titleBgColor\">政治面貌</td><td>${prole}</td>"+
    "<td class=\"titleBgColor\">学制</td><td>${stime}</td>"+
"</tr>"+
    "<tr>"+
    "<td class=\"titleBgColor\">籍贯</td><td>${provincecity}</td>"+
    "<td class=\"titleBgColor\">父母姓名</td><td>${parent}</td>"+
    "<td class=\"titleBgColor\">父母电话</td><td>${tel}</td>"+
    "<td class=\"titleBgColor\">学历</td><td>${edu}</td>"+
"</tr>"+
    "<tr>"+
    "<td class=\"titleBgColor\">身份证</td><td>${sidnum}</td>"+
    "<td class=\"titleBgColor\">出生年月</td><td>${birth}</td>"+
    "<td class=\"titleBgColor\">入学日期</td><td>${btime}</td>"+
    "<td class=\"titleBgColor\">状态</td><td>${dsname}</td>"+
"</tr>"+
    "<tr>"+
    "<td class=\"titleBgColor\">住址</td><td colspan=\"5\" class=\"contentstyle\">${addr}</td>"+
    "<td class=\"titleBgColor\">贫困等级</td><td>${difficults}</td>"+
"</tr>"+
    "<tr>"+
    "<td class=\"titleBgColor\">过级</td><td colspan=\"7\" class=\"contentstyle\">${cetprocess}</td>"+
"</tr>"+
    "<tr>"+
    "<td class=\"titleBgColor\">考证</td><td colspan=\"8\" class=\"contentstyle\">${ctname}</td>"+
"</tr>";

$(init());

//页面一加载完成，执行该方法
function init() {
    $.post("Front_init","",function(msg){
        if(msg!=0){
            //显示欢迎框，隐藏登录框
            $("#showLoginSname").text("欢迎您："+msg.sname);
            $("#showLogin").css("display", "block");
            $("#initLogin").css("display", "none");
            //取出表格字符串
            var table=tableInit;
            //拼接寝室信息
            var dorm=msg.hoursenum+msg.dormitory+msg.bednum;
            //替换填充表格数据
            table=table.replace("${snum}", msg.snum).replace("${sname}", msg.sname).replace("${phone}",msg.phone).replace("${sex}",msg.sex).replace("${dname}",msg.dname).replace("${mname}",msg.mname).replace("${cname}",msg.cname).replace("${qqnum}",msg.qqnum).replace("${email}",msg.email).replace("${prole}",msg.prole).replace("${stime}",msg.stime)
                .replace("${provincecity}",msg.provincecity).replace("${parent}",msg.parent).replace("${tel}", msg.tel).replace("${edu}",msg.edu).replace("${sidnum}",msg.sidnum).replace("${birth}",msg.birth).replace("${btime}",msg.btime).replace("${dsname}",msg.dsname).replace("${addr}",msg.addr).replace("${difficults}",msg.ddname)
                .replace("${cetprocess}",msg.cetprocess).replace("${ctname}",msg.ctname).replace("${dorm}",dorm);
            $("#tbody").html("").html(table);
            //显示表格信息
            $("#initMain").attr("style", "display:none");
            $("#showBody").attr("style", "display:block");
        }else{
            $("#showLogin").attr("style", "display:none");
            $("#initLogin").attr("style", "display:block");
            $("#initMain").attr("style", "display:block");
            $("#showBody").attr("style", "display:none");
        }
    },"json");
}
//登录按钮函数
function login(){
	//取值
    var snum = $("#snum").val();
    var pwd = $("#pwd").val();

    //非空判断
    if(snum==""){
        addError('snum');
        return;
    }
    if(pwd==""){
        addError('pwd');
        return;
    }

    //登录请求
    $.post("Front_login",{"snum":snum,"pwd":pwd},function(msg){
        if(msg==0){
            //密码错误
            addError( 'pwd' );
            $("#pwd").val("");
        }else if(msg==1){
            addError('snum');
            //学号错误
            $("#pwd").val("");
        }else{
            //显示欢迎框，隐藏登录框
            $("#showLoginSname").text("欢迎您："+msg.sname);
            $("#showLogin").css("display", "block");
            $("#initLogin").css("display", "none");
            //取出表格字符串
            var table=tableInit;
            //拼接寝室信息
            var dorm=msg.hoursenum+msg.dormitory+msg.bednum;
            //替换填充表格数据
            table=table.replace("${snum}", msg.snum).replace("${sname}", msg.sname).replace("${phone}",msg.phone).replace("${sex}",msg.sex).replace("${dname}",msg.dname).replace("${mname}",msg.mname).replace("${cname}",msg.cname).replace("${qqnum}",msg.qqnum).replace("${email}",msg.email).replace("${prole}",msg.prole).replace("${stime}",msg.stime)
                .replace("${provincecity}",msg.provincecity).replace("${parent}",msg.parent).replace("${tel}", msg.tel).replace("${edu}",msg.edu).replace("${sidnum}",msg.sidnum).replace("${birth}",msg.birth).replace("${btime}",msg.btime).replace("${dsname}",msg.dsname).replace("${addr}",msg.addr).replace("${difficults}",msg.ddname)
                .replace("${cetprocess}",msg.cetprocess).replace("${ctname}",msg.ctname).replace("${dorm}",dorm);
            $("#tbody").html("").html(table);
            //显示表格信息
            $("#initMain").hide(1000);
            $("#showBody").show(1000);
        }
    },"json");
}

//退出按钮函数
function quit(){

    $.post("Front_quit");

    //清空输入框
    $("#snum").val("");
    $("#pwd").val("");

    $("#showLogin").css("display", "none");
    $("#initLogin").css("display", "block");
    $("#showLoginSname").text("");

    $("#initMain").show(1000);
    $("#showBody").hide(1000);
    $("#tbody").html("").html(tableInit);
}

//忘记密码确认函数
function forget(){
	var snum = $("#sumForget").val();
    var IdCard=$("#IdCard").val();
    
    if(snum==""){
    	addError('sumForget');
    	return;
    }
    if(IdCard==""){
        addError('IdCard');
    	return;
    }
    var error=validateIdCard(IdCard);
    if(error>0) {
        addError('IdCard');
        return;
    }else{
    	$.post("Front_forget",{"snum":snum,"IdCard":IdCard},function(data){
    		if(data==1){
    			$("#sumForget").val("");
                $("#IdCard").val("");
                $("#jien-pwd-info").text("密码已重置为身份证后六位");
                window.setTimeout(hideForget, 1000);
    		}else{
                $("#sumForget").css("border", "red 1px solid");
                $("#IdCard").css("border", "red 1px solid");
            }
    	});
    }
}


//修改密码确认函数
function alter(){
	var oldPwd = $("#oldPwd").val();
	var newPwd = $("#newPwd").val();
	var affPwd = $("#affPwd").val();
	var snum = $("#snum").val();
	if( oldPwd=="" ){
        addError('oldPwd');
		return;
	}
	if(newPwd==""){
        addError('newPwd');
        return;
	}
    if(affPwd!=newPwd){
        addError('newPwd');
        addError('affPwd');
        return;
    }
	$.post("Front_alter",{"snum":snum,"oldPwd":oldPwd,"newPwd":newPwd},function(data){
		if(data>0){
			$("#oldPwd").val("");
			$("#newPwd").val("");
			$("#affPwd").val("");
            $("#jien-alter-pwd").text("密码修改成功");
			window.setTimeout(hideAlter, 1000);
        }else if(data==-1) {
            addError('oldPwd');
            $("#oldPwd").val("");
            $("#newPwd").val("");
            $("#affPwd").val("");
        }else{
            //密码更新失败
        }
	});
}


//降下忘记密码框
function showForget(){
    $("#jien-pwd-info").text("忘记密码")
    $("#forget").animate(
        {top: 120},
        1000
    );
}
//升上忘记密码框
function hideAlter(){
    $("#forget").animate(
        {top: -370},
        1000
    );
}
//降下修改密码框
function showAlter(){
    $("#jien-alter-pwd").text("密码修改")
    $("#alter").animate(
        {top: 140},
        1000
    );
}
//升上修改密码框
function hideAlter(){
	$("#alter").animate(
	        {top: -370},
	        1000,function(){
	        	$("#oldPwd").val("");
	            $("#newPwd").val("");
	            $("#affPwd").val("");
	            $("#jien-alter-pwd").text("修改密码");
	        });
}

//升上忘记密码框
function hideForget(){
    $("#forget").animate(
        {top: -370},
        1000,function(){
        	$("#sumForget").val("");
            $("#IdCard").val("");
            $("#jien-pwd-info").text("重置密码");
        });
}

//身份证校验
function validateIdCard( IdCard ){
    var error=0;
    if(IdCard.value!=""){
        if (!(/(^\d{15}$)|(^\d{17}([0-9]|X|x)$)/.test(IdCard))){
            error=1;
        }
    }else{
        error=1;
    }
    return error;
}

//添加错误提示
function addError( id ){
//    $("#"+id).onfocus();
    $("#"+id).css("border", "red 1px solid");
}

//移除错误提示
function removeError( id ){
    $("#"+id).css("border", "");
}
function removeError2( id1, id2){
    $("#"+id1).css("border", "");
    $("#"+id2).css("border", "");
}

function test() {
    $.ajax({
        type: "post",
        url: "Export_test",
        success: function(msg) {
            alert(msg);
        }
    });
}
