var sizesc;

var delnum;		//删除用

var zxkxscfInfo = [];  //查询出来的处分数据

var pageInit_zxk_1;  //学生处分分页对象

var pageXscfDatas = []; //处分分页用的数据对象


//前一页
function oth_previous(id){
	if(count<=0){
		alert("已经是第一页");
		count=1;
		return;
	}else{
		if(id==3){
			adminbackright2(count);
		}else if(id==1){
			findSusheChufen(count);
		}else if(id==2){
			adminAlter(count);
		}
	}
}
//下一页
function oth_next(id){
	if(count>=(Math.ceil(sizesc/pageSize))+1){
		count=Math.ceil(sizesc/pageSize);
		alert("已经是最后一页");
		return;
	}else{
		if(id==3){
			adminbackright2(count);
		}else if(id==1){
			findSusheChufen(count);
		}else if(id==2){
			adminAlter(count);
		}
	}
}
//首页
function oth_fist(id){
	if(id==3){
		adminbackright2(count);
	}else if(id==1){
		findSusheChufen(count);
	}else if(id==2){
		adminAlter(count);
	}
	count=1;
}
//最后一页
function oth_end(id){
	if(id==3){
		adminbackright2(Math.ceil(sizesc/pageSize));
	}else if(id==1){
		findSusheChufen(Math.ceil(sizesc/pageSize));
	}else if(id==2){
		adminAlter(Math.ceil(sizesc/pageSize));
	}
	count=Math.ceil(sizesc/pageSize);
}
//goTo
function oth_goToPage(id){
	var oth_stuFenyeGoTo=$('.oth_stuFenyeGoTo').val().trim();
	var checkNum=/^[0-9]*[1-9][0-9]*$/;
	if(oth_stuFenyeGoTo==""){
		alert("跳转页为空！");
		return;
	}
	if(!checkNum.test(oth_stuFenyeGoTo)){
		alert("跳转页格式不对！请输入有效数字(正整数)");
		return;
	}
	if(oth_stuFenyeGoTo>=Math.ceil(sizesc/5)+1){
		alert("请求的页数不存在！最大页数为："+(Math.ceil(sizesc/5)));
		return;
	}
	if(oth_stuFenyeGoTo==Math.ceil(oth_stuFenyeGoTo/2) && oth_stuFenyeGoTo!=1){
		alert("您正在当前页");
		return;
	}
	//重新调用前台分页
	var currenpages=oth_stuFenyeGoTo-1;
	var endPages=(40/5)*(count);
	
	if(oth_stuFenyeGoTo>((40/5)*(count-1)+1) &&  oth_stuFenyeGoTo<= endPages   ){
		$('table.mytablezxkother'+id).find('tbody tr').hide()
		.slice(currenpages * 5,(currenpages+1) * 5)
		.show();
	//8为前台每页条数
	}else if(oth_stuFenyeGoTo<=5){
	//currenpages为想要跳转的页，2为numpapers前台每页大小，相除向上取整得到跳转页所在后台分页的区间
		oth_fist(id);
	}else{
		oth_stuFenyeGoTo=Math.ceil(oth_stuFenyeGoTo/8);
		count=oth_stuFenyeGoTo;
		if(id==3){
			adminbackright2(count);
		}else if(id==1){
			findSusheChufen(count);
		}else if(id==2){
			adminAlter(count);
		}
	}
}

//前台分页操作
function OthFenye(tableName,todiv,id){
	//'table.mytable'
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
		var backnumPages=Math.ceil(sizesc/pageSize);
		var $page=$('<ul class="pagination"></ul>');
		
		$('<li><a href="javascript:oth_fist('+id+')">首页</a></li>').appendTo($page);
		if(count>=1){
			$('<li><a href="javascript:oth_previous('+id+')">&laquo;</a></li>').bind('click',function(){
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
				$('#temp a').text("当前是第："+(pages+eachHeadNum)+"/"+Math.ceil(sizesc/5)+"页");
				pageUser();
				
			}).appendTo($page).addClass('fenyes');
		}	
		if(count<=backnumPages){
			$('<li><a href="javascript:oth_next('+id+')">&raquo;</a></li>').bind('click',function(){
 		 		count++;
 		 	}).appendTo($page);
 		}else{
 	
 			$('<li><a>&raquo;</a></li>').appendTo($page);
 		}
		
	 	$('<li><a href="javascript:oth_end('+id+')">末页</a></li>').appendTo($page);
	 	$('<li id="temp"><a>当前页面</a></li>').appendTo($page);
	 	$('<li><input type="text" class="oth_stuFenyeGoTo" style="width:40px;height:30px;margin-top:2px;"></li>').appendTo($page);
	 	$('<li>页</li>').appendTo($page);
	 	$('<li><a href="javascript:oth_goToPage('+id+')">GO</a></li>').appendTo($page);
   	 	//'#myFenye'
		$(todiv).html($page);
	});
}
function findSusheChufen(id){
	var pageNum=id;
	var aa=$("#zxk-chufengongyu").val();
	var bb=$("#zxk-chufenloudong").val();
	var cc=$("#zxk-sushechufen-times").val();
	var dd=$("#zxk-sushechufen-term").val();
	var text="";
	$.getJSON("AdminLogin_findSusheChufen.action?t="+new Date(),{'hourseChufen.hnum':aa,'hourseChufen.dormitory':bb,'hourseChufen.times':cc,'hourseChufen.term':dd,'pageNum':pageNum,'pageSize':pageSize},function(data){
		if(data.sushechufen!=null && data.sushechufen!=""){
			text+="";
			text+="<table class=\"mytablezxkother1 table table-condensed table-hover table-striped table-bordered\"><thead>"+
		    "<tr><td><input type='checkbox' name='selectallaccommchufen' id='selectallaccommchufen' /></td><td class=\"titleBgColor\">处分编号</td>" +
		    "<td class=\"titleBgColor\">宿舍名</td>"+
		    "<td class=\"titleBgColor\">处分时间</td>" +
		    "<td class=\"titleBgColor\">处分内容</td>"+
		    "<td class=\"titleBgColor\">处分等级</td>" +
		    "</tr></thead><tbody class=\"accom_detail\">";
    		
    		$.each(data.sushechufen,function(index,item){
    			text+="<tr>";
    			text+="<td><input type='checkbox' name='selectsschufen' value='"+item.hid+"' /></td>";
    			text+="<td class='xiugaiaccommcf'>"+item.hid+"</td>";
    			text+="<td>"+item.hnum+"-"+item.dormitory+"</td>";
    			text+="<td>"+item.times+"-"+item.term+"</td>";
    			text+="<td>"+item.content+"</td>";
    			text+="<td>"+item.levels+"</td></tr>";
    		});
    		$.each(data.allpageSize,function(index,item){
    			sizesc=item;
    		});
    		text+="</tbody></table><div id='zxkFenyeaccomchufen' style='margin-left:300px;'></div>"
    		$("#accomchufen_main").html(text);
    		OthFenye("#accomchufen_main","#zxkFenyeaccomchufen",1);
    		addotherss();
		}else{
			alert("查无数据");
		}
	});
	$("#zxk-sscfid").val("");
	$("#zxk-sscfname").val("");
	$("#zxk-sscftimes").val("");
	$("#zxk-sscfneirong").val("");
	$("#zxk-sscfdengji").val("");
	$("#sscfxgbtn").attr("disabled",true);
	$("#sscfdelbtn").attr("disabled",true);
	$("#sscftjbtn").attr("disabled",false);
}
function addotherss(){
	$(".xiugaiaccommcf").click(function(){
		removezxkaddClass();
		var obj=$(this).parent();
		$("#zxk-sscfid").val(obj.children().eq(1).text());
		$("#zxk-sscfname").val(obj.children().eq(2).text());
		$("#zxk-sscftimes").val(obj.children().eq(3).text());
		$("#zxk-sscfneirong").val(obj.children().eq(4).text());
		$("#zxk-sscfdengji").val(obj.children().eq(5).text());
		obj.addClass("zxksscfselect");
		$("#sscfxgbtn").attr("disabled",false);
		$("#sscfdelbtn").attr("disabled",false);
		$("#sscftjbtn").attr("disabled",true);
	});
}
function removezxkaddClass(){
	var a=$(".mytablezxkother1 tbody tr");
	for(var i=0;i<a.length;i++){
		$(".mytablezxkother1 tbody tr:eq("+i+")").removeClass("zxksscfselect");
	}
}
function xiugaisscf(){
	var aa=$("#zxk-sscfid").val();
	var bb=$("#zxk-sscfname").val();
	var cc=$("#zxk-sscftimes").val();
	var dd=$("#zxk-sscfneirong").val();
	var ee=$("#zxk-sscfdengji").val();
	if(aa==null || aa=="" || bb==null || bb=="" || cc==null || cc=="" || dd==null || dd=="" || ee==null || ee==""){
		alert("数据不完整...");
		return;
	}
	if(ee!=1 && ee!=2){
		return;
	}
	$.post("AdminLogin_xiuGaiSscf.action?t="+new Date(),{'hourseChufen.hid':aa,'hourseChufen.dormitory':bb,'hourseChufen.times':cc,'hourseChufen.content':dd,'hourseChufen.levels':ee},function(data){
    	if(parseInt(data)>0){
    		alert("修改成功！");
    	}else{
    		alert("修改失败...");
    	}
	});
	$("#zxk-sscfid").val("");
	$("#zxk-sscfname").val("");
	$("#zxk-sscftimes").val("");
	$("#zxk-sscfneirong").val("");
	$("#zxk-sscfdengji").val("");
	$("#sscfxgbtn").attr("disabled",true);
	$("#sscfdelbtn").attr("disabled",true);
	$("#sscftjbtn").attr("disabled",false);
}

function zxkdelsscf(){
	var a = window.confirm("你真的要删除此记录吗?该操作不可逆！");
	if(a){
		var aa=$("#zxk-sscfid").val();
		if(aa==null || aa==""){
			alert("未选中任何数据...");
			return;
		}
		$.post("AdminLogin_deleteSscf.action?t="+new Date(),{'hourseChufen.hid':aa},function(data){
	    	if(parseInt(data)>0){
	    		$(".mytablezxkother1 tbody .zxksscfselect").remove();
	    	}else{
	    		alert("删除失败...");
	    	}
		});
	}else{
		alert("else");
	}
	$("#zxk-sscfid").val("");
	$("#zxk-sscfname").val("");
	$("#zxk-sscftimes").val("");
	$("#zxk-sscfneirong").val("");
	$("#zxk-sscfdengji").val("");
	$("#sscfxgbtn").attr("disabled",true);
	$("#sscfdelbtn").attr("disabled",true);
	$("#sscftjbtn").attr("disabled",false);
}

function tianjiasscf(){
	var bb=$("#zxk-sscfname").val();
	var cc=$("#zxk-sscftimes").val();
	var dd=$("#zxk-sscfneirong").val();
	var ee=$("#zxk-sscfdengji").val();
	if(bb==null || bb=="" || cc==null || cc=="" || dd==null || dd=="" || ee==null || ee==""){
		alert("数据不完整...");
		return;
	}
	$.post("AdminLogin_tianJiaSscf.action?t="+new Date(),{'hourseChufen.dormitory':bb,'hourseChufen.times':cc,'hourseChufen.content':dd,'hourseChufen.levels':ee},function(data){
    	if(parseInt(data)>0){
    		alert("添加成功！");
    	}else{
    		alert("添加失败...");
    	}
	});
	$("#zxk-sscfid").val("");
	$("#zxk-sscfname").val("");
	$("#zxk-sscftimes").val("");
	$("#zxk-sscfneirong").val("");
	$("#zxk-sscfdengji").val("");
}


function findxueshengcf(){
	displayNone();
	$("#zxk_xschufen").css("display","block");
}
function findXuesChufen(){
	var aa=$.trim($("#zxk-xschufensnum").val());
	var bb=$.trim($("#zxk-xscfshijian").val());
	var cc=$.trim($("#zxk-xscfname").val());
	var dd=$.trim($("#zxk-xscflevels").val());
	var ee=$.trim($("#zxk-xscfclname").val());
	if("时间"==bb){
		bb="";
	}
	$.getJSON("AdminLogin_findXscf.action?t="+new Date(),{'chuFen.snum':aa,'chuFen.dates':bb,'chuFen.temp1':ee,'chuFen.temp2':cc,'chuFen.levels':dd},function(data){
		if(data.xscfPage==null || data.xscfPage==""){
			$("#zxk-xscf-datial table tbody").html("<tr><td colspan='9'>暂无数据，请确认后再查询！</td></tr>");
		}else{
			zxkxscfInfo=[];
			zxkxscfInfo=data.xscfPage;
			ZxkXsCfPage();
			xscfadd();
		}
	});
	
}
function zxkxscfchongzhi1(){
	$("#zxk-xschufensnum").val("");
	$("#zxk-xscfshijian").val("");
	$("#zxk-xscfname").val("");
	$("#zxk-xscflevels").val("");
	$("#zxk-xscfclname").val("");
}
function zxksscfchongzhi(){
	$("#zxk-chufengongyu").val("");
	$("#zxk-chufenloudong").val("");
	$("#zxk-sushechufen-times").val("");
	$("#zxk-sushechufen-term").val("");
}
function pageXscfData(cid,snum,dates,content,levels,temp1,temp2,temp3,hindex){
    this.cid=cid;
    this.snum=snum;
    this.dates=dates;
    this.content=content;
    this.levels=levels;
    this.temp1=temp1;
    this.temp2=temp2;
    this.temp3=temp3;
    this.hindex=hindex;
    this.getAttr = function( attr ){ //最重要的就是这个函数  因为JSON数据只能通过.属性名 才能获取属性值  分页时并不方便  只能添加这个函数来取值
          if(attr=="cid"){
        	  return this.cid;
          }else if( attr=="snum" ){
        	  return this.snum;
          }else if( attr=="dates" ){
        	  return this.dates;
          }else if( attr=="content" ){
        	  return this.content;
          }else if( attr=="levels" ){
        	  return this.levels;
          }else if( attr=="temp1" ){
        	  return this.temp1;
          }else if( attr=="temp2" ){
        	  return this.temp2;
          }else if( attr=="temp3" ){
        	  return this.temp3;
          }else if( attr=="hindex" ){
        	  return this.hindex;
          }
    }
}
//分页
function ZxkXsCfPage(){
	//自己定义好属性  一一对应
	pageXscfDatas = [];
	for( var i=0; i<zxkxscfInfo.length;i++ ){
		var pd = new pageXscfData(zxkxscfInfo[i].cid,zxkxscfInfo[i].snum,zxkxscfInfo[i].dates,zxkxscfInfo[i].content,
				zxkxscfInfo[i].levels,zxkxscfInfo[i].temp1,zxkxscfInfo[i].temp2,zxkxscfInfo[i].temp3,i+1  );
		pageXscfDatas.push( pd );
	}
	jpageInit =new JpageInit( pageXscfDatas,"zxk-xscf-datial",50,8);  //调用这个函数 就可以分页了
}
//为学生处分绑定点击事件
function xscfadd(){
	var obj=$("#zxk-xscf-datial table tbody tr");
	for(var i=0;i<obj.length;i++){
		var obj2=$("#zxk-xscf-datial table tbody tr:eq("+i+")");
		obj2.find("td:eq(2)").bind("click",function(){
			var obj3=$(this).parent();
			delnum=obj3.find("td:eq(0)").text();
			$("#zxk-xscfid1").val($(this).text());
			$("#zxk-xscfsnum1").val(obj3.find("td:eq(3)").text());
			$("#zxk-xscfshijian1").val(obj3.find("td:eq(7)").text());
			$("#zxk-xscfcontent1").val(obj3.find("td:eq(8)").text());
			$("#zxk-xscfdengji1").val(obj3.find("td:eq(9)").text());
			$("#xscfxgbtn").attr("disabled",false);
			$("#xscftjbtn").attr("disabled",true);
			$("#xscfscbtn").attr("disabled",false);
		});
	}
}
//修改学生处分
function xiugaixscf(){
	var aa=$("#zxk-xscfid1").val();
	var bb=$("#zxk-xscfsnum1").val();
	var cc=$("#zxk-xscfshijian1").val();
	var dd=$("#zxk-xscfcontent1").val();
	var ee=$("#zxk-xscfdengji1").val();
	$.post("AdminLogin_xiugaiXscf.action?t="+new Date(),{'chuFen.cid':aa,'chuFen.snum':bb,'chuFen.dates':cc,'chuFen.content':dd,'chuFen.levels':ee},function(data){
		if(parseInt(data)>0){
			alert("修改成功！");
		}else{
			alert("修改失败...");
		}
	});
	$("#zxk-xscfid1").val("");
	$("#zxk-xscfsnum1").val("");
	$("#zxk-xscfshijian1").val("");
	$("#zxk-xscfcontent1").val("");
	$("#zxk-xscfdengji1").val("");
	$("#xscfxgbtn").attr("disabled",true);
	$("#xscftjbtn").attr("disabled",false);
	$("#xscfscbtn").attr("disabled",true);
}
//添加学生处分
function tianjiaxscf(){
	var bb=$("#zxk-xscfsnum1").val();
	var cc=$("#zxk-xscfshijian1").val();
	var dd=$("#zxk-xscfcontent1").val();
	var ee=$("#zxk-xscfdengji1").val();
	if(bb=="" || cc=="" || dd=="" || ee=="" ||bb==null || cc==null || dd==null || ee==null){
		alert("信息不完整...");
		return;
	}
	$.post("AdminLogin_tianjiaXscf.action?t="+new Date(),{'chuFen.snum':bb,'chuFen.dates':cc,'chuFen.content':dd,'chuFen.levels':ee},function(data){
		if(parseInt(data)>0){
			alert("添加成功！");
			findXuesChufen();
		}else{
			alert("添加失败...");
		}
	});
	$("#zxk-xscfid1").val("");
	$("#zxk-xscfsnum1").val("");
	$("#zxk-xscfshijian1").val("");
	$("#zxk-xscfcontent1").val("");
	$("#zxk-xscfdengji1").val("");
	$("#xscfxgbtn").attr("disabled",true);
	$("#xscftjbtn").attr("disabled",false);
	$("#xscfscbtn").attr("disabled",true);
}
//删除
function shanchuxscf(){
	var a = window.confirm("你真的要删除此记录吗?该操作不可逆！"); 
	if(a){
		var aa=$("#zxk-xscfid1").val();
		$.post("AdminLogin_shanchuXscf.action?t="+new Date(),{'chuFen.cid':aa},function(data){
			if(parseInt(data)<=0){
				alert("删除失败...");
			}else{
				delnum=delnum-1;
				var obj=$("#zxk-xscf-datial table tbody tr:eq("+delnum+")");
				obj.remove();
			}
		});
	}else{
		return;
	}
	$("#zxk-xscfid1").val("");
	$("#zxk-xscfsnum1").val("");
	$("#zxk-xscfshijian1").val("");
	$("#zxk-xscfcontent1").val("");
	$("#zxk-xscfdengji1").val("");
	$("#xscfxgbtn").attr("disabled",true);
	$("#xscftjbtn").attr("disabled",false);
	$("#xscfscbtn").attr("disabled",true);
}
//宿舍分配得到院系信息
function getFenpeidept(){
	var textss="";
	$.getJSON("AdminLogin_indexdb.action?t="+new Date(),function(data){
		if(data!=null && data!=""){
			$.each(data.departments,function(index,item){
				textss+="<option value='"+item.did+"'>"+item.dname+"</option>";
			});
		}
		$("#ssfp-zxk-json").html(textss);
	});
}
function getFenpeidept2(){
	var textss="<option value='0'>请选择院系</option>";
	$.getJSON("AdminLogin_indexdb.action?t="+new Date(),function(data){
		if(data!=null && data!=""){
			$.each(data.departments,function(index,item){
				textss+="<option value='"+item.did+"'>"+item.dname+"</option>";
			});
		}
		$("#zxk-cwxy1").html(textss);
	});
}
//得到选中的班级信息
function ssfp(){
	var str="";
	var id=$("#ssfp-zxk-json").val();
	var temp=document.getElementsByName("selectoneaccomm");
	var num=temp.length;
	for(var i=0;i<num;i++){
		if(temp[i].checked==true){
			str+=temp[i].value+",";
		}
	}
	str=str.substring(0,str.length-1);
	if(str==null || str==""){
		alert("请先选择宿舍");
		return;
	}
	$.post("AdminLogin_ssFenpei.action?t="+new Date(),{'userString.ssfp':str,'userString.did':id},function(data){
		if(parseInt(data)>0){
			findKongChuang(1);
			alert("分配成功！");
		}else{
			alert("分配失败...");
		}
	});
}