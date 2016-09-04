window.onload=function(){
	$.getJSON("AdminLogin_indexdb.action?t="+new Date(),function(data){
		var texts="<option value='0'>请选择院系</option>";
		if(data.departments!=null && data.departments!=""){
			$.each(data.departments,function(index,item){
				texts+="<option value='"+item.did+"'>"+item.dname+"</option>";
			});
			$(".yuanxiChose").html(texts);
		}
	});
}

function findDataDiID(){
	NoDisplay();
	$.getJSON("AdminLogin_findAllDataID.action?t="+new Date(),function(data){
		var text="";
		var texts="";
		if(data.dataIDData!=null && data.dataIDData!=""){
			$.each(data.dataIDData,function(index,item){
				text+="<tr><td>"+item.did+"</td><td>"+item.dname+"</td><td>"+item.intro+"</td></tr>";
			});
			$("#mytbodyzxk").html(text);
		}else{
			$("#mytbodyzxk").html("<tr><td colspan='3'>暂无信息</td></tr>");
		}
	});
}

function findYuanXiID(){
	NoDisplay();
	$.getJSON("AdminLogin_findYuanXiID.action?t="+new Date(),function(data){
		var text="";
		if(data.dataIDData!=null && data.dataIDData!=""){
			$.each(data.dataIDData,function(index,item){
				text+="<tr><td>"+item.did+"</td><td>"+item.dname+"</td><td>"+item.sname+"</td></tr>";
			});
			$("#mytbodyzxk").html(text);
		}else{
			$("#mytbodyzxk").html("<tr><td colspan='3'>暂无信息</td></tr>");
		}
	});
}

function findZhuanYeID(){
	NoDisplay();
	$("#majorchose").css("display","block");
	$.getJSON("AdminLogin_findZhuanYeID.action?t="+new Date(),function(data){
		var text="";
		if(data.dataIDData!=null && data.dataIDData!=""){
			$.each(data.dataIDData,function(index,item){
				text+="<tr><td>"+item.mid+"</td><td>"+item.mname+"</td><td>"+item.intro+"</td></tr>";
			});
			$("#mytbodyzxk").html(text);
		}else{
			$("#mytbodyzxk").html("<tr><td colspan='3'>暂无专业</td></tr>");
		}
	});
	$("#yuanxiChose").change(function(){
		var did=$(".yuanxiChose").val();
		var text="";
		if(did==0 || did==null || did==""){
			return;
		}
		$.getJSON("AdminLogin_findZhuanYeIDByDid.action?t="+new Date(),{'department.did':did},function(data){
			if(data.dataIDData!=null && data.dataIDData!=""){
				$.each(data.dataIDData,function(index,item){
					text+="<tr><td>"+item.mid+"</td><td>"+item.mname+"</td><td>"+item.intro+"</td></tr>";
				});
				$("#mytbodyzxk").html(text);
			}else{
				$("#mytbodyzxk").html("<tr><td colspan='3'>暂无专业</td></tr>");
			}
		});
	});
}

function findBanjiID(){
	NoDisplay();
	$("#classchose").css("display","block");
	$.getJSON("AdminLogin_findBanjiID.action?t="+new Date(),function(data){
		var text="";
		if(data.dataIDData!=null && data.dataIDData!=""){
			$.each(data.dataIDData,function(index,item){
				text+="<tr><td>"+item.cid+"</td><td>"+item.cname+"</td><td>"+item.edu+"</td></tr>";
			});
			$("#mytbodyzxk").html(text);
		}else{
			$("#mytbodyzxk").html("<tr><td colspan='3'>暂无班级</td></tr>");
		}
	});
	$("#banjiChoseYuanxi").change(function(){
		var did=$("#banjiChoseYuanxi").val();
		if(did==0 || did==null || did==""){
			var text="";
			text="<option value='0'>暂无专业信息</option>";
			$(".zhuanyeChose").html(text);
			return;
		}
		$.getJSON("AdminLogin_findZhuanYeIDByDid.action?t="+new Date(),{'department.did':did},function(data){
			var text="<option value='0'>请选择专业</option>";
			if(data.dataIDData!=null && data.dataIDData!=""){
				$.each(data.dataIDData,function(index,item){
					text+="<option value='"+item.mid+"'>"+item.mname+"</option>";
				});
				$(".zhuanyeChose").html(text);
			}else{
				text="<option value='0'>暂无专业信息</option>";
				$(".zhuanyeChose").html(text);
			}
		});
	});
	$("#zhuanyeChose").change(function(){
		var mid=$("#zhuanyeChose").val();
		if(mid==0 || mid==null || mid==""){
			return;
		}
		$.getJSON("AdminLogin_findClassDByMid.action?t="+new Date(),{'major.mid':mid},function(data){
			var text="";
			if(data.dataIDData!=null && data.dataIDData!=""){
				$.each(data.dataIDData,function(index,item){
					text+="<tr><td>"+item.cid+"</td><td>"+item.cname+"</td><td>"+item.edu+"</td></tr>";
				});
				$("#mytbodyzxk").html(text);
			}else{
				$("#mytbodyzxk").html("<tr><td colspan='3'>暂无班级</td></tr>");
			}
		});
	});
}

function NoDisplay(){
	$("#majorchose").css("display","none");
	$("#classchose").css("display","none");
}