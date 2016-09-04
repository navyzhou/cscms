var sizess;
var pageSizes=120;

//前一页
function ac_previous(id){
	count--;
	if(count<=0){
		count=1;
		alert("当前是第一页");
		return;
	}
	if(id==1){
		findKongChuang(count);
	}else if(id==2){
		findAllaccoms(count);
	}else if(id==3){
		zxkcxkfpss(count);
	}else if(id==4){
		findXgcYFChuang(count);
	}
}
//下一页
function ac_next(id){
	count++;
	if(count>Math.ceil(sizess/pageSizes)){
		count=Math.ceil(sizess/pageSizes);
		alert("当前是最后一页");
		return;
	}
	if(id==1){
		findKongChuang(count);
	}else if(id==2){
		findAllaccoms(count);
	}else if(id==3){
		zxkcxkfpss(count);
	}else if(id==4){
		findXgcYFChuang(count);
	}
}
//首页
function ac_fist(id){
	if(id==1){
		findKongChuang(count);
	}else if(id==2){
		findAllaccoms(count);
	}else if(id==3){
		zxkcxkfpss(count);
	}else if(id==4){
		findXgcYFChuang(count);
	}
	count=1;
}
//最后一页
function ac_end(id){
	count=Math.ceil(sizess/pageSizes);
	if(id==1){
		findKongChuang(count);
	}else if(id==2){
		findAllaccoms(count);
	}else if(id==3){
		zxkcxkfpss(count);
	}else if(id==4){
		findXgcYFChuang(count);
	}
		count=Math.ceil(sizess/pageSizes);
}
//goTo
function ac_goToPage(id){
	var ac_stuFenyeGoTo=$('.ac_stuFenyeGoTo').val().trim();
	var checkNum=/^[0-9]*[1-9][0-9]*$/;
	if(ac_stuFenyeGoTo==""){
		alert("跳转页为空！");
		return;
	}
	if(!checkNum.test(ac_stuFenyeGoTo)){
		alert("跳转页格式不对！请输入有效数字(正整数)");
		return;
	}
	if(ac_stuFenyeGoTo>=Math.ceil((sizess/3)/numPaper)+1){
		alert("请求的页数不存在！最大页数为："+(Math.ceil((sizess/3)/numPaper)));
		return;
	}
	if(ac_stuFenyeGoTo==Math.ceil(ac_stuFenyeGoTo/2) && ac_stuFenyeGoTo!=1){
		alert("您正在当前页");
		return;
	}
	//重新调用前台分页
	var currenpages=ac_stuFenyeGoTo-1;
	var endPages=((pageSizes/3)/numPaper)*(count);
	
	if(ac_stuFenyeGoTo>(((pageSizes/3)/numPaper)*(count-1)+1) &&  ac_stuFenyeGoTo<= endPages   ){
		$('table.mytablezxkaccom').find('tbody tr').hide()
		.slice(currenpages * numPaper,(currenpages+1) * numPaper)
		.show();
	}else if(ac_stuFenyeGoTo<=((pageSizes/3)/numPaper)){
		ac_fist(id);//调用首页
	}else{
		ac_stuFenyeGoTo=Math.ceil(ac_stuFenyeGoTo/((pageSizes/3)/numPaper));
		count=ac_stuFenyeGoTo;
		if(id==1){
			findKongChuang(ac_stuFenyeGoTo); 
		}else if(id==2){
			findAllaccoms(zxkcxkfpss);
		}else if(id==3){
			zxkcxkfpss(zxkcxkfpss);
		}else if(id==4){
			findXgcYFChuang(zxkcxkfpss);
		}
	}
}


//前台分页操作
function AcFenye(tableName,todiv,id){
	//'table.mytable'
	$(tableName).each(function(){
		var currentPage=0;
		var pageUser=function(){
			$(tableName).find('tbody tr').hide()
				.slice(currentPage * numPaper,(currentPage+1) * numPaper)
				.show();
		};
		pageUser();
		var numRows=$(this).find('tbody tr').length;
		var numPages=Math.ceil(numRows/numPaper);
		var backnumPages=Math.ceil(sizess/pageSizes);
		var $page=$('<ul class="pagination"></ul>');
		$('<li><a href="javascript:ac_fist('+id+')">首页</a></li>').appendTo($page);
		if(count>=1){
			$('<li><a href="javascript:ac_previous('+id+')">&laquo;</a></li>').appendTo($page);
 		}else{
 			$('<li><a>&laquo;</a></li>').appendTo($page);   
 		}				//4为后台每页条数
		var eachHeadNum=((pageSizes/3)/numPaper)*(count-1)+1;
		
		for(var page=0;page<numPages;page++){
			$('<li><a id="fenYe"></a></li>').find('a').text(page+eachHeadNum).end()
			.bind('click',{newPage:page},function(event){
				currentPage=event.data['newPage'];
				pages=event.data['newPage'];
				$('#temp a').text("当前是第："+(pages+eachHeadNum)+"/"+Math.ceil(((sizess/3)/numPaper))+"页|每页24条");
				pageUser();
			}).appendTo($page).addClass('fenyes');
		}	
		if(count<=backnumPages){
			$('<li><a href="javascript:ac_next('+id+')">&raquo;</a></li>').appendTo($page);
 		}else{
 			$('<li><a>&raquo;</a></li>').appendTo($page);
 		}
		
	 	$('<li><a href="javascript:ac_end('+id+')">末页</a></li>').appendTo($page);
	 	$('<li id="temp"><a>当前页面</a></li>').appendTo($page);
	 	$('<li><input type="text" class="ac_stuFenyeGoTo" style="width:40px;height:30px;margin-top:2px;"></li>').appendTo($page);
	 	$('<li>页</li>').appendTo($page);
	 	$('<li><a href="javascript:ac_goToPage('+id+')">GO</a></li>').appendTo($page);
   	 	//'#myFenye'
		$(todiv).html($page);
	});
	$(tableName).css("display","block");    	//分页显示页面
	$(todiv).css("display","block");   			//分页页面
}
function findKongdou(ids){
	displayNone();
	$("#zxk_dataAccommdation").css("display","block");
	$("#zxk-cxsyssxx").attr("disabled",false);
	$("#zxk-selectaccomm").attr("onclick","findKongChuang(1)");
}
function addfunction(){
	$(".xiugaiaccomms").click(function(){
		var aa=$.trim($(this).text());
		$.getJSON("AdminLogin_findAccommById.action?t="+new Date(),{'accommodation.aid':aa},function(data){
			if(data!=null && data!=""){
				displayNone();
				$("#zxk_xiugaiQinshi").css("display","block");
				$("#accommhidden").val(data.accommss[0].aid);
				$("#cloudong").val(data.accommss[0].hnum);
				$("#csushe").val(data.accommss[0].dormitory);
				$("#cchuangwei").val(data.accommss[0].bednum);
				$("#zxk_cjiage").val(data.accommss[0].paymoney);
				$("#zxk_cstatus").val(data.accommss[0].status);
			}else{
				alert("无此数据，请重试...");
			}
			
		});
	});
}
//查询所有空宿舍
function findKongChuang(idds){
	var aa=$("#zxk-gongyu").val();
	var bb=$("#zxk-loudong").val();
	var cc=$("#zxk-chuangwei").val();
	var dd=$("#zxk-cwjg").val();
	var pageNum=idds;
	if(idds==1){
		count=1;
	}
	var text="";
	$.getJSON("AdminLogin_findAllKongs.action?t="+new Date(),{'accommodation.hnum':aa,'accommodation.dormitory':bb,'accommodation.bednum':cc,'accommodation.paymoney':dd,'pageNum':pageNum,'pageSize':pageSizes},function(data){
    	if(data.findKongs!=null && data.findKongs!=""){
    		text+="<table class=\"mytablezxkaccom table table-condensed table-hover table-striped table-bordered\"><thead>"+
		    "<tr><td><input type='checkbox' name='selectallaccomm' id='selectallaccomm' /></td><td class=\"titleBgColor\">宿舍编号</td>" +
		    "<td class=\"titleBgColor\">公寓名</td>"+
		    "<td class=\"titleBgColor\">收费</td>"+
		    "<td></td><td class=\"titleBgColor\">宿舍编号</td>" +
		    "<td class=\"titleBgColor\">公寓名</td>"+
		    "<td class=\"titleBgColor\">收费</td>"+
		    "<td></td><td class=\"titleBgColor\">宿舍编号</td>" +
		    "<td class=\"titleBgColor\">公寓名</td>"+
		    "<td class=\"titleBgColor\">收费</td></tr>"+
		    "</thead><tbody class=\"accom_detail\">";
    		var last=0;
    		$.each(data.findKongs,function(index,item){
    			if(index%3==0){
    				text+="<tr>"
    			}
    			text+="<td><input type='checkbox' name='selectoneaccomm' value='"+item.aid+"' /></td>";
    			text+="<td class='xiugaiaccomms' title='修改'>"+item.aid+"</td>";
    			text+="<td>"+item.hnum+"-"+item.dormitory+"-"+item.bednum+"</td>";
    			text+="<td>"+item.paymoney+"</td>";
    			if(index%3==2){
    				text+="</tr>";
    			}
    		});
    		$.each(data.allpageSize,function(index,entry){
				sizess=entry;
			});
    		text+="</tbody></table><div id='zxkFenyeaccom' style='margin-left:300px;'></div>"
    		$("#accom_main").html(text);
    		AcFenye("#accom_main","#zxkFenyeaccom",1);
    		$("#zxk-ssfpbtn").attr("disabled",false);
    		addfunction();
    		selectchange();
    	}else{
    		alert("暂无信息");
    	}
	});
}
function quxiaoaccomm(){
	displayNone();
	$("#zxk_dataAccommdation").css("display","block");
	$("#zxk-cxsyssxx").attr("disabled",false);
}
function xiugaiAccomm(){
	var idds=$("#accommhidden").val();
	var aa=$("#cloudong").val();
	var bb=$("#csushe").val();
	var cc=$("#cchuangwei").val();
	var price=$("#zxk_cjiage").val();
	var status=$("#zxk_cstatus").val();
	
	$.post("AdminLogin_updateAccommById.action?t="+new Date(),{'accommodation.aid':idds,'accommodation.hnum':aa,'accommodation.dormitory':bb,'accommodation.bednum':cc,'accommodation.paymoney':price,'accommodation.status':status},function(data){
		if(parseInt(data)>0){
			alert("修改成功！");
			displayNone();
			$("#zxk_dataAccommdation").css("display","block");
		}else{
			alert("修改失败...");
		}
	});
}
//查询所有宿舍
function findAllaccoms(idds){
	var aa=$("#zxk-gongyu").val();
	var bb=$("#zxk-loudong").val();
	var cc=$("#zxk-chuangwei").val();
	var dd=$("#zxk-cwjg").val();
	var pageNum=idds;
	if(idds==1){
		count=1;
	}
	var text="";
	$.getJSON("AdminLogin_findAllAccommAll.action?t="+new Date(),{'accommodation.hnum':aa,'accommodation.dormitory':bb,'accommodation.bednum':cc,'accommodation.paymoney':dd,'pageNum':pageNum,'pageSize':pageSizes},function(data){
    	if(data.findKongs!=null && data.findKongs!=""){
    		text+="<table class=\"mytablezxkaccom table table-condensed table-hover table-striped table-bordered\"><thead>"+
		    "<tr><td><input type='checkbox' name='selectallaccomm' id='selectallaccomm' /></td><td class=\"titleBgColor\">宿舍编号</td>" +
		    "<td class=\"titleBgColor\">宿舍名</td>"+
		    "<td class=\"titleBgColor\">收费</td>" +
		    "<td class=\"titleBgColor\">状态</td>"+
		    "<td></td><td class=\"titleBgColor\">宿舍编号</td>" +
		    "<td class=\"titleBgColor\">宿舍名</td>"+
		    "<td class=\"titleBgColor\">收费</td>" +
		    "<td class=\"titleBgColor\">状态</td>"+
		    "<td></td><td class=\"titleBgColor\">宿舍编号</td>" +
		    "<td class=\"titleBgColor\">宿舍名</td>"+
		    "<td class=\"titleBgColor\">收费</td>" +
		    "<td class=\"titleBgColor\">状态</td>"+
		    "</tr></thead><tbody class=\"accom_detail\">";
    		$.each(data.findKongs,function(index,item){
    			if(index%3==0){
    				text+="<tr>"
    			}
    			text+="<td><input type='checkbox' name='selectoneaccomm' value='"+item.aid+"' /></td>";
    			text+="<td class='xiugaiaccomms'>"+item.aid+"</td>";
    			text+="<td>"+item.hnum+"-"+item.dormitory+"-"+item.bednum+"</td>";
    			text+="<td>"+item.paymoney+"</td>";
    			if(item.status==1){
    				text+="<td>已住</td>";
    			}else if(item.status==2){
    				text+="<td>未住</td>";
    			}else{
    				text+="<td>占用</td>";
    			}
    			if(index%3==2){
    				text+="</tr>"
    			}
    		});
    		
    		$.each(data.allpageSize,function(index,entry){
				sizess=entry;
			});
    		text+="</tbody></table><div id='zxkFenyeaccom' style='margin-left:300px;'></div>"
    		$("#accom_main").html(text);
    		AcFenye("#accom_main","#zxkFenyeaccom",2);
    		$("#zxk-ssfpbtn").attr("disabled",true);
    		addfunction();
    		selectchange();
    	}else{
    		alert("暂无信息");
    	}
	});
}
//checkBox的判断
function selectchange(){
	var obj=document.getElementsByName("selectallaccomm");
	$("#selectallaccomm").change(function(){
		if(obj[0].checked){
			var obj2=document.getElementsByName("selectoneaccomm");
			for(i=0;i<obj2.length;i++){
				obj2[i].checked=true;
			}
		}else{
			var obj2=document.getElementsByName("selectoneaccomm");
			for(i=0;i<obj2.length;i++){
				obj2[i].checked=false;
			}
		}
	});
}
//重置
function zxkchongzhi(){
	var aa=$("#zxk-gongyu").val("");
	var bb=$("#zxk-loudong").val("");
	var cc=$("#zxk-chuangwei").val("");
	var dd=$("#zxk-cwjg").val("");
}
function zxkcxkfpssshow(){
	displayNone();
	$("#zxk_dataAccommdation").css("display","block");
	$("#zxk-cxsyssxx").attr("disabled",true);
	$("#zxk-ssfpbtn").attr("disabled",true);
	$("#zxk-selectaccomm").attr("onclick","zxkcxkfpss(1)");
}

function zxkcxalreadyss(){
	displayNone();
	getFenpeidept2();
	$("#zxk_dataAccommdation1").css("display", "block");
	
}
function zxkchongzhix(){
	$("#zxk-gongyu1").val("");
	$("#zxk-loudong1").val("");
	$("#zxk-cwjg1").val("");
	$("#zxk-cwxy1").val("");
}

//学工处查询所有已分配宿舍
function findXgcYFChuang(idds){
	var aa=$("#zxk-gongyu1").val();
	var bb=$("#zxk-loudong1").val();
	var cc=$("#zxk-cwjg1").val();
	var dd=$("#zxk-cwxy1").val();
	if(dd==0){
		dd=null;
	}
	var pageNum=idds;
	if(idds==1){
		count=1;
	}
	var text="";
	$.getJSON("AdminLogin_xuegongchufindfpss.action?t="+new Date(),{'accommodation.hnum':aa,'accommodation.dormitory':bb,'accommodation.paymoney':cc,'accommodation.temp1':dd,'pageNum':pageNum,'pageSize':pageSizes},function(data){
    	if(data.xgcfindKongs!=null && data.xgcfindKongs!=""){
    		text+="<table class=\"mytablezxkaccom table table-condensed table-hover table-striped table-bordered\" id=\"getChosezxk\"><thead>"+
		    "<tr><td class=\"titleBgColor\">宿舍编号</td>" +
		    "<td class=\"titleBgColor\">公寓名</td>"+
		    "<td class=\"titleBgColor\">收费</td>"+
		    "<td class=\"titleBgColor\">宿舍编号</td>" +
		    "<td class=\"titleBgColor\">公寓名</td>"+
		    "<td class=\"titleBgColor\">收费</td>"+
		    "<td class=\"titleBgColor\">宿舍编号</td>" +
		    "<td class=\"titleBgColor\">公寓名</td>"+
		    "<td class=\"titleBgColor\">收费</td></tr>"+
		    "</thead><tbody class=\"accom_detail\">";
    		var last=0;
    		$.each(data.xgcfindKongs,function(index,item){
    			if(index%3==0){
    				text+="<tr>"
    			}
    			text+="<td class='xiugaiaccomms' title='修改'>"+item.aid+"</td>";
    			text+="<td>"+item.hnum+"-"+item.dormitory+"-"+item.bednum+"</td>";
    			text+="<td>"+item.paymoney+"</td>";
    			if(index%3==2){
    				text+="</tr>";
    			}
    		});
    		$.each(data.allpageSize,function(index,entry){
				sizess=entry;
			});
    		text+="</tbody></table><div id='zxkFenyeaccom1' style='margin-left:300px;'></div>"
    		$("#accom_main1").html(text);
    		AcFenye("#accom_main1","#zxkFenyeaccom1",4);
    	}else{
    		alert("暂无信息");
    	}
	});
}

//书记查询本院的宿舍
function zxkcxkfpss(idds){
	var aa=$("#zxk-gongyu").val();
	var bb=$("#zxk-loudong").val();
	var cc=$("#zxk-chuangwei").val();
	var dd=$("#zxk-cwjg").val();
	var pageNum=idds;
	if(idds==1){
		count=1;
	}
	var text="";
	$.getJSON("AdminLogin_shujifindfpss.action?t="+new Date(),{'accommodation.hnum':aa,'accommodation.dormitory':bb,'accommodation.bednum':cc,'accommodation.paymoney':dd,'pageNum':pageNum,'pageSize':pageSizes},function(data){
    	if(data.findKongs!=null && data.findKongs!=""){
    		text+="<table class=\"mytablezxkaccom table table-condensed table-hover table-striped table-bordered\" id=\"getChosezxk\"><thead>"+
		    "<tr><td><input type='checkbox' name='selectallaccomm' id='selectallaccomm' /></td><td class=\"titleBgColor\">宿舍编号</td>" +
		    "<td class=\"titleBgColor\">公寓名</td>"+
		    "<td class=\"titleBgColor\">收费</td>"+
		    "<td></td><td class=\"titleBgColor\">宿舍编号</td>" +
		    "<td class=\"titleBgColor\">公寓名</td>"+
		    "<td class=\"titleBgColor\">收费</td>"+
		    "<td></td><td class=\"titleBgColor\">宿舍编号</td>" +
		    "<td class=\"titleBgColor\">公寓名</td>"+
		    "<td class=\"titleBgColor\">收费</td></tr>"+
		    "</thead><tbody class=\"accom_detail\">";
    		var last=0;
    		$.each(data.findKongs,function(index,item){
    			if(index%3==0){
    				text+="<tr>"
    			}
    			text+="<td><input type='checkbox' name='selectoneaccomm' value='"+item.aid+"' /></td>";
    			text+="<td class='xiugaiaccomms' title='修改'>"+item.aid+"</td>";
    			text+="<td>"+item.hnum+"-"+item.dormitory+"-"+item.bednum+"</td>";
    			text+="<td>"+item.paymoney+"</td>";
    			if(index%3==2){
    				text+="</tr>";
    			}
    		});
    		$.each(data.allpageSize,function(index,entry){
				sizess=entry;
			});
    		text+="</tbody></table><div id='zxkFenyeaccom' style='margin-left:300px;'></div>"
    		$("#accom_main").html(text);
    		AcFenye("#accom_main","#zxkFenyeaccom",1);
    		addfunction();
    		selectchange();
    	}else{
    		alert("暂无信息");
    	}
	});
}
//导出空宿舍
function exportKssExport(){
    //获取选中的列
    $.getJSON("Export_exportKssChaXun.action?t="+new Date(),{'userString.did':1},function(data){
    	 if(data != null){//成功
             $("#zxkksscx-result").html("成功导出，<a href='"+data.file+"'>点我下载</a>");
         }else{
             $("#zxkksscx-result").html("导出失败");
         }
    });
}
function clearexKss(){
	$("#zxkksscx-result").html("");
}