//显示专业
var maj="";
var susheId="";
var classs="";
var hoseID="";
var sidnum="";
var provincecity="";
var nation="";
var prole="";
var pinkun="";
var status="";
var sedu="";
var ssex="";
var stuName="";
var stuID="";
var houseID="";
var department="";
var addres="";
//所有学院和专业
var academy=[];		 //二维数组  '学院'->'专业'
var Jsons="";		 //json数组
var major=[];
var zmximgPath;     //图片修改的路径
var sizes;
var jclassInfo = []; //班级数组
var lp_jclassInfo = []; //班级数组
var lnation=[];      //名族
var lprovincecity=[];//籍贯
var lpSnumAndLevel=[];//学号和关注等级

//分页数据
var pageNums=1;
var pageSize=40;    //后台每页大小
var sizes;          //后台总数据条数
var count=1;        //计数，后台分页 
var flag=1;
var pages="";

var numPaper=8;     //前台每页的数
var imgStuSnum;     //学生对应的ID
//重置
function updataSelect(){
	maj="";
	classs="";
	susheId="";
	sidnum="";
    stuName="";
    stuID="";
    houseID="";
    jclassInfo = []; //班级数组
    lp_jclassInfo = []; //班级数组
    lnation=[];      //名族
    lprovincecity=[];//籍贯
    //心理
    $('#birthDate').val("");
    $('#lp_stuPsyName').val("");
    $('#lp_PsystuID').val("");
    //getInform();
}
//表单重置控制
function resetForm(){
	updataSelect();
	$('#stu_form')[0].reset();
	$('#stu_dialogForm')[0].reset();
}

function getInform(){
	maj=$('.lp_major option:selected').text();
	classs=$('.lp_class').val();
	susheId=$('.lp_hoseID').val();
	sidnum=$('.lp_sidnum').val();
	provincecity=$('.lp_nation option:selected').text();
	nation=$('.lp_minzu option:selected').text();
	prole=$('.lp_politics option:selected').text();
	pinkun=$('.lp_pinkun option:selected').text();
	status=$('.lp_status option:selected').text();
	sedu=$('.lp_sclYear option:selected').text();
	ssex=$('.lp_sex option:selected').text();
}
//其他的查询条件
function otherSelect(){
	getInform();
	selectStuInfo(pageNums);
}

//间接调用
function selectStuInfo(){
	displayNone();
	$("#zxk_maintable").css("display","block");    //查询学生数据table
	$("#querywindow").css("display","block");
	selectStuInfos(pageNums);	
}

function selectTimeOuts(){
	$("#lp_keyup").attr("disabled",false);
}
//查询数据的主方法
function selectStuInfos(pageNums){
		//otherSelect();
		$("#lp_keyup").attr("disabled",true);
	    setTimeout("selectTimeOuts();",2000);
	
		var stuName=$('#lp_stuName').val();
		var stuID=$('.lp_stuID').val();
		var houseID=$('#lp_stuHome').val();
		var department=$("#myOption option:selected").text();
		var pageNum=pageNums;
		
//		alert(maj+"lp"+classs+"lp"+ susheId+"lp"+  sidnum+"lp"+ provincecity+"lp"+ nation+"lp"+ prole +"lp"+pinkun +"lp"+status +"lp"+sedu +"lp"+ssex
//				+"lp"+stuName+"lp"+ stuID +"lp"+houseID+"lp"+ department);
		$.getJSON("StuInfo_selectStuInfo?t="+new Date(),{
			'information.maname':maj, 
			'information.cname':classs,
			'information.dormitory':susheId,
			'information.sidnum':sidnum,
			'information.provincecity':provincecity,
			'information.nation':nation,
			'information.prole':prole,
			'information.difficults':pinkun,
			'information.isSchool':status,
			'information.edu':sedu,
			'information.sex':ssex,
			'information.sname':stuName,
			'information.snum':stuID,
			'information.hoursenum':houseID,
			'information.dname':department,
			'pageNum':pageNum,
			'pageSize':pageSize
			},function(data){
				var stuInfo="<table class=\"mytable table table-condensed table-hover table-striped table-bordered\" id='studentInfoTableDkaij'><thead>"+
                    "<tr><td><input type='checkbox' name='selectallstuInfo' id='selectallstuInfo' /></td>" +
                    "<td class=\"lp_tid titleBgColor\">学生学号</td>" +
                    "<td class=\"titleBgColor\">学生姓名</td>"+
                    "<td class=\"titleBgColor\">学院</td>"+
                    "<td class=\"titleBgColor\">专业</td>"+
                    "<td class=\"titleBgColor\">班级</td>"+
                    "<td class=\"titleBgColor\">楼号</td>"+
                    "<td class=\"titleBgColor\">宿舍号</td>"+
                    "<td class=\"titleBgColor\">身份证号</td>"+
                    "<td class=\"titleBgColor\">民族</td>"+
                    "<td class=\"titleBgColor\">籍贯</td>"+
                    "<td class=\"titleBgColor\">电话</td>"+
                    "<td class=\"titleBgColor\">政治面貌</td>"+
                    "<td class=\"titleBgColor\">状态</td></tr></thead><tbody class=\"Stu_detail\">";
				if(data.stuInfo==""){
					alert("查无此数据");
					return;
				}
				$.each(data.stuInfo,function(index,entry){
					stuInfo+="<tr><td><input type='checkbox' name='selectonestuInfo' id='selectonestuInfo' value='"+entry.snum+"' /></td>";
					stuInfo+="<td class='stuId'>"+entry.snum+"</td>";
					stuInfo+="<td name='sname' class='stuNid' data-academy='"+entry.xuejain+"' data-stime='"+entry.btime+"' data-sphoto='"+entry.photo+"'>"+entry.sname+"</td>";
					stuInfo+="<td name='dname'>"+entry.dname+"</td>";
					stuInfo+="<td>"+entry.maname+"</td>";
					stuInfo+="<td>"+entry.cname+"</td>";
					stuInfo+="<td>"+entry.hoursenum+"</td>";
					stuInfo+="<td>"+entry.dormitory+"</td>";
					stuInfo+="<td>"+entry.sidnum+"</td>";
					stuInfo+="<td>"+entry.nation+"</td>";
					stuInfo+="<td>"+entry.provincecity+"</td>";
					stuInfo+="<td>"+entry.tel+"</td>";
					stuInfo+="<td>"+entry.prole+"</td>";
					stuInfo+="<td>"+entry.isSchool+"</td></tr>";
					
					var obj = new Object();
					obj["snum"] = entry.snum;
					obj["levels"] = entry.levels;
					lpSnumAndLevel.push(obj);
					
				});
				
				$.each(data.allpageSize,function(index,entry){
					sizes=entry.sizes;
				});
				stuInfo+="</tbody></table>";
				$("#zxk_maintable").html(stuInfo);
				stuFenye('#zxk_maintable','#myFenye');
				$('#allPage a').text("共"+Math.ceil(sizes/numPaper)+"页");//设置总页数
				lp_rightClick();
				showInfo();
				selectstu();
	  });
	}

//全选或不选
function selectstu(){
	var obj=document.getElementsByName("selectallstuInfo");
	$("#selectallstuInfo").change(function(){
		if(obj[0].checked){
			var obj2=document.getElementsByName("selectonestuInfo");
			for(var i=0;i<obj2.length;i++){
				obj2[i].checked=true;
			}
		}else{
			var obj2=document.getElementsByName("selectonestuInfo");
			for(var i=0;i<obj2.length;i++){
				obj2[i].checked=false;
			}
		}
	});
	$("#lp_check").click(function(){
		if( $(this).attr("checked")){
			alert("dfd");
		}
	});
}
//前台分页操作
function stuFenye(tableName,todiv){
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
		var backnumPages=Math.ceil(sizes/pageSize);
		var $page=$('<ul class="pagination"></ul>');
		$('<li id="allPage"><a></a></li>').appendTo($page);
		$('<li><a href="javascript:lp_fist()">首页</a></li>').appendTo($page);
		if(count>=1){
			$('<li><a href="javascript:lp_previous()">&laquo;</a></li>').appendTo($page);
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
				$('#temp a').text("当前是第："+(pages+eachHeadNum)+"页|每页"+numPaper+"条");
				pageUser();
			}).appendTo($page).addClass('clickable');
		}	
		if(count<=backnumPages){
			$('<li><a href="javascript:lp_next()">&raquo;</a></li>').appendTo($page);
 		}else{
 			$('<li><a>&raquo;</a></li>').appendTo($page);
 		}
		
	 	$('<li><a href="javascript:lp_end()">末页</a></li>').appendTo($page);
	 	$('<li id="temp"><a>当前页面</a></li>').appendTo($page);
	 	$('<li><a>跳到第</a></li>').appendTo($page);
	 	$('<li><input type="text" class="lp_stuFenyeGoTo" style="width:40px;height:30px;margin-top:2px;"></li>').appendTo($page);
	 	$('<li>页&nbsp;&nbsp;</li>').appendTo($page);
	 	$('<li><input type="button" onclick="lp_goToPage()" value="GO"></li>').appendTo($page);
	 	
   	 	//'#myFenye'
		$(todiv).html($page);
	});
	//首页
	lp_fist=function(){
		selectStuInfos(1);
		count=1;
	}
	//最后一页
	 lp_end=function(){
		selectStuInfos(Math.ceil(sizes/pageSize));
		count=Math.ceil(sizes/pageSize);
	}
	//前一页
	lp_previous=function(){
	 	count--;
	 	if(count<=0){
	 		count=1;
	 		alert("当前是第一页");
	 		return;
	 	}
	 	selectStuInfos(count);
	 }
	 //下一页
	lp_next=function(){
	 	count++;
	 	if(count>=Math.ceil(sizes/pageSize)){
	 		count=Math.ceil(sizes/pageSize);
	 		alert("当前是最后一页");
	 		return;
	 	}
	 	selectStuInfos(count);
	 }
	//goTo
	lp_goToPage=function(){
		var lp_stuFenyeGoTo=$('.lp_stuFenyeGoTo').val().trim();
		var checkNum=/^[0-9]*[1-9][0-9]*$/;
		if(lp_stuFenyeGoTo==""){
			alert("跳转页为空！");
			return;
		}
		if(!checkNum.test(lp_stuFenyeGoTo)){
			alert("跳转页格式不对！请输入有效数字(正整数)");
			return;
		}
		if(lp_stuFenyeGoTo>=Math.ceil(sizes/numPaper)+1){
			alert("请求的页数不存在！最大页数为："+(Math.ceil(sizes/numPaper)));
			return;
		}
		if(lp_stuFenyeGoTo==Math.ceil(lp_stuFenyeGoTo/2) && lp_stuFenyeGoTo!=1){
			alert("您正在当前页");
			return;
		}
		//重新调用前台分页
		var currenpages=lp_stuFenyeGoTo-1;
		var endPages=(pageSize/numPaper)*(count);
		
		if(lp_stuFenyeGoTo>((pageSize/numPaper)*(count-1)+1) &&  lp_stuFenyeGoTo<= endPages   ){
			$('table.mytable').find('tbody tr').hide()
			.slice(currenpages * numPaper,(currenpages+1) * numPaper)
			.show();
		}else if(lp_stuFenyeGoTo<=(pageSize/numPaper)){
			lp_fist();//调用首页
		}else{
			lp_stuFenyeGoTo=Math.ceil(lp_stuFenyeGoTo/(pageSize/numPaper));
			count=lp_stuFenyeGoTo;
			selectStuInfos(lp_stuFenyeGoTo); 
		}
	}
	
	$("#zxk_maintable").css("display","block");    //修改密码页面
	$('#myFenye').css("display","block");   //分页页面
}

//心理查询右键属性
var sname;
var snums;
var temp;
function lp_rightClick(){
	if("辅导员"==lp_role || "学工处"==lp_role){
		$(".mytable tbody tr").mouseup(function(e){
			if( e.button==2 ){
				 sname=$(this).find("td").eq(2).text();
				 snums=$(this).find("td").eq(1).text();
				var flag = true;
				var m_left = e.pageX;
				var m_top = e.pageY;
				$(document).on("contextmenu", function() {
					if(flag){
						$("#lp_menu").css({"left":m_left-180,"top":m_top-70,display:'block',"width":"120px"});//.show();
						flag = false;
						return false;
					}else{
						return true;
					}
				}).on("click", function() {
					$("#lp_menu").hide();
			    });
			}
			if("辅导员"==lp_role){
				for(var i=0;i<lpSnumAndLevel.length;i++){
					//alert(lpSnumAndLevel[i].levels);
					if(snums==lpSnumAndLevel[i].snum){
						temp=lpSnumAndLevel[i].levels;
						if(temp==1 || temp==2){
							var right_click="<div id=\"lp_menu\"><span class=\"label label-warning\">此人已关注！</span></div>";
							$("#right_menu").html(right_click);
							return;
						}
					}
				}
			}
			
			if("学工处"==lp_role){
				$.getJSON('StuInfo_stuPsyHelp?t='+new Date(),{
					'hosttable.snum':snums,
					'hosttable.aname':lp_role
				},function(data){
					if(data.stuPsyHelp==""){
						$("#lp_shuJiSugs").val("未审核或无此人数据！");
						return;
					}
					$.each(data.stuPsyHelp,function(index,entry){
						$("#lp_shuJiSugs").val(entry.opInfo1);
					});
				});
				var right_click="";
				right_click+="<div id=\"lp_menu\"><textarea class=\"form-control\" id=\"lp_shuJiSugs\" rows=\"3\" placeholder=\"审核意见栏\"></textarea></div>";
			}else{
				var right_click="";
				right_click+="<ul id=\"lp_menu\" class=\"rightclick\" >";
				right_click+="<li><a data-toggle=\"modal\" class=\"btn-success\" type=\"btn\" data-target=\"#lp_stuPsyInfosAdd\" onclick=\"javascript:findPsyType('"+snums+"','"+sname+"')\" id=\"lp_addStuPsys\">心理关注</a></li>";
				right_click+="<li><a class=\"btn-info\" type=\"btn\" onclick=\"javascript:showStuPsyInfoList()\">查看关注</a></li></ul>";
			}
			$("#right_menu").html(right_click);
		});
	}
	
}
//显示个人信息
function showInfo(){
	var stuImg='';
	$('.Stu_detail tr td.stuNid').bind('mouseover',function(e){
		var x=e.pageX;
		var y=e.pageY;//data-academy,data-stime,data-sphoto
		stuImg='<img src="../../dataInfo/'+$(this).attr('data-academy')+'/'+$(this).attr('data-stime').split("-")[0]+'/'+$(this).attr('data-sphoto')+'" width="114px" height="156px" />';		
		$('#tab_show').html(stuImg);
		$('#tab_show').css({'position':'absolute',left:x-180,top:y-70,display:'block'});
	});
	//控制鼠标移开列之后隐藏图片
	$('.Stu_detail tr').hover(function(){
	 },function(){
		$('#tab_show').hide();
	});
	//点击表格获取详细信息
	$('.Stu_detail tr .stuId').click(function(){		
		var num = $.trim($(this).text());
		imgStuSnum=num;
		if(num==null){
			return;			
		}
		var myMajors = "";
		for(var i=0;i<academy.length;i++){
			myMajors+="<li>"+academy[i]+"</li>";
		}
		$("#academyUl").html(myMajors);
		$.getJSON("StuInfo_findStudentInfoById?t="+new Date(),{'stuInfo.snum':num},function(data){
			if(data==null){
				return;
			}else{	
				var res = eval(data);
				//基本信息表
				$.each(data.sndif,function(index,entry){
					//性别sex
					if(entry.sex=="男"){					
						$("#boy").attr("checked","checked");
					}else{
						$("#girl").attr("checked","checked");
					}
					$("#stunm").val(num);//学号
					$("#sname").val(entry.sname);//姓名
					$("#tel").val(entry.phone);//联系方式
					$("#zmacademy").append("<option selected>"+entry.dname+"</option>");//学院	zmmajor
					$("#zmmajor").append("<option selected>"+entry.mname+"</option>");//专业
					$("#zmgrades").append("<option value='"+entry.cid+"' selected>"+entry.cname+"</option>");//班级
					$("#dorm").val(entry.hoursenum+"-"+entry.dormitory+"-"+entry.bednum);//宿舍
					$("#sqq").val(entry.qqnum);//QQ
					$("#emial").val(entry.email);//邮箱
					$("#Birthplace").val(entry.provincecity);//籍贯
					$("#parentName").val(entry.parent);//父母名称
					$("#ptel").val(entry.tel);//父母电话
					$("#idcared").val(entry.sidnum);//身份证
					$("#birthDate").val(entry.birth);//出生年月
					$("#cdate").val(entry.btime);//入学日期
					$("#zmaddress").val(entry.addr);//住址
					addres=entry.addr;
					$("#englishGrade").val(entry.cetprocess);//英语等级
					$("#englishGrade").val(entry.ctname);//英语等级
					$("#politics").val(entry.prole);//政治等级
					$("#ischoolsystem").val(entry.stime);//学制
					$("#meducation").val(entry.edu);//学历
					zmximgPath = 'dataInfo/'+entry.djname+'/'+entry.btime.split("-")[0];
					$("#stuImag").attr('src','../../dataInfo/'+entry.djname+'/'+entry.btime.split("-")[0]+'/'+entry.photo+'');
					$("#zmCondition").append("<option value='"+entry.sstatus+"' selected>"+entry.dsname+"</option>");//在校状态
					$("#zmDifficults").append("<option value='"+entry.difficults+"' selected>"+entry.ddname+"</option>");//在校状态
				});
				//荣誉列表
				
				var hornorlist="";
				hournors=data.honor;
				if(hournors!=null && hournors!=""){
					$.each(data.honor,function(index,entry){
						var item = entry.term==1?'上学期':'下学期';
						var levels = entry.levels==1?'校级荣誉':'院级荣誉';
						hornorlist+= "<tr><td>"+entry.times+"</td><td>"+item+"</td><td>"+entry.hname+"</td><td>"+levels+"</td><td><a class='zmbgbtn btn-success' href='javascript:editHornor("+entry.hid+")'><span class='zmopbg zmhornorbg1'></span></a><a class='zmbgbtn btn-warning' onclick='deleteHornor(this,"+entry.hid+")' href='javascript:void(0)'><span class='zmopbg zmhornorbg2'></span></a></td></tr>";
					});					
					$("#zmdialogHornorList").html(hornorlist);
					$('#zmHounorTimes').val(res.honor[0].times);//zmHounorL
					$('#zmHounorXname').val(res.honor[0].hname);//zmHounorL				
					$('#honorHid').val(res.honor[0].hid);
					if(res.honor[0].term==1){//获得学校的荣誉是上学期1还是下学期2					
						document.getElementById("zmHounoritemX").options[0].selected=true;
					}else{					
						document.getElementById("zmHounoritemX").options[1].selected=true;
					}				
					if(res.honor[0].levels==1){//获得学校的荣誉是校级1还是院级2					
						document.getElementById("zmHounorL").options[0].selected=true;
					}else{					
						document.getElementById("zmHounorL").options[1].selected=true;
					}
				}else{
					hornorlist+= "<tr><td colspan='5'><font class='zxksfont1'>暂无信息</font></td></tr>";
					$("#zmdialogHornorList").html(hornorlist);
				}
				//英语列表
				var englishlist="";
				zmpassEnglish=data.englishs;
				if(zmpassEnglish!=null && zmpassEnglish!=""){
					$.each(data.englishs,function(index,entry){
						var item = entry.term==1?'上学期':'下学期';					
						englishlist+= "<tr><td>"+entry.times+"</td><td>"+item+"</td><td>"+entry.cettype+"</td><td>"+entry.score+"</td><td><a class='zmbgbtn btn-success' href='javascript:editEnglish("+entry.cid+")'><span class='zmopbg zmhornorbg1'></span></a><a class='zmbgbtn btn-warning' onclick='deleteEnglish(this,"+entry.cid+")' href='javascript:void(0)'><span class='zmopbg zmhornorbg2'></span></a></td></tr>";
					});
				
					$("#zmdialogEnglishList").html(englishlist);
					$('#zmEglishTimes').val(res.englishs[0].times);//考试时间
					$('#zmEglishtype').val(res.englishs[0].cettype);//考试类型				
					$('#zmEglishCid').val(res.englishs[0].cid);//英语考试的
					$('#zmEglishScore').val(res.englishs[0].score);//考试时间
					if(res.englishs[0].term==1){//d获得学校的荣誉是上学期1还是下学期2					
						document.getElementById("zmEglishItem").options[0].selected=true;
					}else{					
						document.getElementById("zmEglishItem").options[1].selected=true;
					}
				}else{
					englishlist+="<tr><td colspan='5'><font class='zxksfont1'>暂无信息</font></td></tr>";
					$("#zmdialogEnglishList").html(englishlist);
				}
				//证书列表
				var zmCFlist="";
				zmGainCFlist=data.allCertificate;
				
				if(zmGainCFlist!=null && zmGainCFlist!=""){
					$.each(data.allCertificate,function(index,entry){
						var item = entry.term==1?'上学期':'下学期';					
						zmCFlist+= "<tr><td>"+entry.times+"</td><td>"+item+"</td><td>"+entry.name+"</td><td>"+entry.temp1+"</td><td>"+entry.score+"</td><td><a class='zmbgbtn btn-success' href='javascript:editACF("+entry.hid+")'><span class='zmopbg zmhornorbg1'></span></a><a class='zmbgbtn btn-warning' onclick='deleteGrades(this,"+entry.hid+")' href='javascript:void(0)'><span class='zmopbg zmhornorbg2'></span></a></td></tr>";
					});
					$("#zmdialogACFList").html(zmCFlist);//更多信息
					$('#zmCfDates').val(res.allCertificate[0].times);//考试时间
					$('#zmCFName').val(res.allCertificate[0].name);//证书名称				
					$('#zmCFHid').val(res.allCertificate[0].hid);//证书的id
					$('#zmCFScore').val(res.allCertificate[0].score);//考试成绩
				}else{
					zmCFlist+="<tr><td colspan='6'><font class='zxksfont1'>暂无信息</font></td></tr>";
					$("#zmdialogACFList").html(zmCFlist);
				}
				var zmCFtypes="";	
				zmAllCtype = data.cetype;
				if(zmAllCtype!=null && zmAllCtype!=""){
					if(res.allCertificate.length>0){
						$.each(data.cetype,function(index,entry){//类型表
							
							if(entry.tid==res.allCertificate[0].tid){
								zmCFtypes+= "<option value='"+entry.tid+"' selected>"+entry.tname+"</option>";
							}else{
								zmCFtypes+= "<option value='"+entry.tid+"'>"+entry.tname+"</option>";
							}									
						});	
						$("#zmCFType").html(zmCFtypes);	
						if(res.allCertificate[0].term==1){//获得学校的证书是上学期1还是下学期2					
							document.getElementById("zmCFItem").options[0].selected=true;
						}else{					
							document.getElementById("zmCFItem").options[1].selected=true;
						}						
					}									

				}
				//寝室通报信息
				var zmHCFlist="";
				zmGainHCFlist=data.hourseChufen;
				if(zmGainHCFlist!=null && zmGainHCFlist!=""){
					$.each(data.hourseChufen,function(index,entry){
						var item = entry.term==1?'上学期':'下学期';	
						var level = entry.levels==1?'校级通报':'院级通报';
						zmHCFlist+= "<tr><td>"+entry.times+"</td><td>"+item+"</td><td>"+entry.hnum+"-"+entry.dormitory+"</td><td>"+level+"</td><td>"+entry.content+"</td><td><a class='zmbgbtn btn-success' href='javascript:editHCF("+entry.hid+")'><span class='zmopbg zmhornorbg1'></span></a><a class='zmbgbtn btn-warning' onclick='deleteHourseCF(this,"+entry.hid+")' href='javascript:void(0)'><span class='zmopbg zmhornorbg2'></span></a></td></tr>";
					});
					$("#zmdialogHCFList").html(zmHCFlist);//更多信息
					if(res.hourseChufen.length>0){
						$('#zmHCFDate').val(res.hourseChufen[0].times);//通报时间
						$('#zmCFHousre').val(res.hourseChufen[0].hnum+"-"+res.hourseChufen[0].dormitory);//通报寝室			
						$('#zmHCFHid').val(res.hourseChufen[0].hid);//通报的id
						$('#zmHCFreason').val(res.hourseChufen[0].content);//通报内容
						if(res.hourseChufen[0].term==1){//通报时间是上学期1还是下学期2					
							document.getElementById("zmHCFItem").options[0].selected=true;
						}else{					
							document.getElementById("zmHCFItem").options[1].selected=true;
						}
						if(res.hourseChufen[0].levels==1){//通报时间是校级1还是院级2					
							document.getElementById("zmHCFLv").options[0].selected=true;
						}else{					
							document.getElementById("zmHCFLv").options[1].selected=true;
						}						
					}	
				}else{
					zmHCFlist+="<tr><td colspan='6'><font class='zxksfont1'>暂无信息</font></td></tr>";
					$("#zmdialogHCFList").html(zmHCFlist);
				}
				//学生处罚信息
				var zmXHCFlist="";
				zmgainXHCFlist=data.chuFen;		
				if(zmgainXHCFlist!=null && zmgainXHCFlist!=""){
					$.each(data.chuFen,function(index,entry){				
						var level = entry.levels==1?'校级通报':'院级通报';
						zmXHCFlist+= "<tr><td>"+entry.dates+"</td><td>"+level+"</td><td>"+entry.content+"</td><td><a class='zmbgbtn btn-success' href='javascript:editXHCF("+entry.cid+")'><span class='zmopbg zmhornorbg1'></span></a><a class='zmbgbtn btn-warning' onclick='deleteStuCF(this,"+entry.cid+")' href='javascript:void(0)'><span class='zmopbg zmhornorbg2'></span></a></td></tr>";
					});
					$("#zmdialogXCFList").html(zmXHCFlist);//更多信息
					if(res.chuFen.length>0){
						$('#zmXCFDate').val(res.chuFen[0].dates);//处罚时间						
						$('#zmXCFHid').val(res.chuFen[0].cid);//通报的id
						$('#zmXCFReason').val(res.chuFen[0].content);//通报内容
						if(res.chuFen[0].levels==1){//通报时间是校级1还是院级2					
							document.getElementById("zmXCFLevel").options[0].selected=true;
						}else{					
							document.getElementById("zmXCFLevel").options[1].selected=true;
						}	
						//学生详细信息
						$("#zmFDid").val(res.stuDetailInfo[0].did);//id
						$("#zmFZF").val(res.stuDetailInfo[0].direction);//发展方向
						$("#zmKY").val(res.stuDetailInfo[0].ktname);//考研机构
						$("#zmZYF").val(res.stuDetailInfo[0].mname);//专业方向
						$("#zmZYPX").val(res.stuDetailInfo[0].mcname);//培训机构
						$("#zmZXBX").val(res.stuDetailInfo[0].performance);//在校表现
						$("#zmXXQK").val(res.stuDetailInfo[0].learing);//学习情况
						$("#zmPZXX").val(res.stuDetailInfo[0].intro);//学习情况						
					}
				}else{
					zmXHCFlist+="<tr><td colspan='4'><font class='zxksfont1'>暂无信息</font></td></tr>";
					$("#zmdialogXCFList").html(zmXHCFlist);
				}
				//学生职务信息
				var zmMPlist="";
				zmMMPlist=data.positionInfo;
				if(zmMMPlist!=null && zmMMPlist!=""){
					$.each(data.positionInfo,function(index,entry){
						var item = entry.term==1?'上学期':'下学期';	
						var level = entry.levels==1?'校级干部':'院级干部';
						zmMPlist+= "<tr><td>"+entry.times+"</td><td>"+item+"</td><td>"+entry.pname+"</td><td>"+level+"</td><td><a class='zmbgbtn btn-success' href='javascript:editPosition("+entry.pid+")'><span class='zmopbg zmhornorbg1'></span></a><a class='zmbgbtn btn-warning' onclick='deletePositions(this,"+entry.pid+")' href='javascript:void(0)'><span class='zmopbg zmhornorbg2'></span></a></td></tr>";
					});
					if(res.positionInfo.length>0){
						$("#zmdialogMPList").html(zmMPlist);//更多信息
						$('#zmPositionDate').val(res.positionInfo[0].times);//任职时间
						$('#zmPSName').val(res.positionInfo[0].pname);//任职名称
						$('#zmMPID').val(res.positionInfo[0].pid);//职务id				
						if(res.positionInfo[0].term==1){//通报时间是上学期1还是下学期2					
							document.getElementById("zmPMItem").options[0].selected=true;
						}else{					
							document.getElementById("zmPMItem").options[1].selected=true;
						}
						if(res.positionInfo[0].levels==1){//通报时间是校级1还是院级2					
							document.getElementById("zmPLevels").options[0].selected=true;
						}else{					
							document.getElementById("zmPLevels").options[1].selected=true;
						}
						//学生就业
						$("#zmJobWID").val(res.worksInfo[0].wid);//就业时间
						$("#zmJobDate").val(res.worksInfo[0].times);//就业时间
						$("#zmJobName").val(res.worksInfo[0].company);//公司名称
						$("#zmJobSaray").val(res.worksInfo[0].salary);//公司名称
						$("#zmJobCity").val(res.worksInfo[0].city);//公司名称
						$("#zmJonDes").val(res.worksInfo[0].position);//公司名称						
					}
		
				}else{
					zmMPlist+="<tr><td colspan='4'><font class='zxksfont1'>暂无信息</font></td></tr>";
					$("#zmdialogMPList").html(zmXHCFlist);
				}
			}
		});
		//效果修改
		$('.lp_table').hide();
		$('#showStudentDetilInfo').show();
		$('.lp_fenye').hide();
	});	
}
//一加载页面获取学生专业和学院信息
$(function(){
	$('.zmcarousel').carousel({//信息界面切换 默认切换时间两分钟
		  interval: 2000000,
		  wrap:true
	});
	$.getJSON('StuInfo_findDpaAndMajor?t='+new Date(),function(data){
		var deInfo="<option>"+""+"</option>";	
		var jacademyinfo = "";
		var zmImageAcademy = "<option>学院</option>";
		var stuPsyInfo="";
		var zmcondition = "<option></option>";
		var zmDifficults = "<option></option>";
		Jsons=data;
		strzmMajor=data.majorInfo;
		$.each(data.departInfo,function(index,entry){
			deInfo+="<option value='"+entry.did+"'>"+entry.dname+"</option>";
			zmImageAcademy+="<option value='"+entry.sname+"'>"+entry.dname+"</option>";
			jacademyinfo += "<li>"+entry.dname+"</li>";
			stuPsyInfo+="<li>"+entry.dname+"</li>";
			academy[index]=entry.dname;
		});	
		//在校情况
		$.each(data.condition,function(index,entry){
			zmcondition+="<option value='"+entry.did+"'>"+entry.dname+"</option>";
		});
		//贫困等级
		$.each(data.poverty,function(index,entry){
			zmDifficults+="<option value='"+entry.did+"'>"+entry.dname+"</option>";
		});
		$.each(data.classInfo,function(index,entry){
			var obj = new Object();
			obj["cid"] = entry.cid;
			obj["cname"] = entry.cname;
			obj["mname"] = entry.mname;
			lp_jclassInfo.push(obj);
		});
		
		$("#zmDifficults").append(zmDifficults);
		$("#zmCondition").append(zmcondition);
		$(".lp_pinkun").append(zmDifficults);
		$('.lp_department').html(deInfo);
		$('.lp_status').html(zmcondition);
		$("#zmacademy").append(deInfo);
		$("#zmImageAcademy").append(zmImageAcademy);
		//心理跟踪模块
		$("#lp_stuPsy_1").html(stuPsyInfo);//心理
		//专业级联班级
		
		var lp_stuPsy_1= $("#lp_stuPsy_1 > li");
		lp_stuPsy_1.click(function(){  //学院选择事件
			var lp_stuPsy_1text = $.trim($(this).text());
			$("#lp_stuPsy_1_val").val(lp_stuPsy_1text); 
			major=[];
			var jmajorinfos = "";
			$.each(data.majorInfo,function(index,entry){
				if(lp_stuPsy_1text==$.trim(entry.dname)){
					jmajorinfos +="<li>"+entry.maname+"</li>";
					major.push(entry.maname);
				}
				$("#lp_stuPsy_2").html(jmajorinfos);
				
				var lp_stuPsy_2 = $("#lp_stuPsy_2 > li");  //专业选择事件
				lp_stuPsy_2.click(function(){
					var lp_stuPsy_2 = $.trim($(this).text());
					$("#lp_stuPsy_2_val").val(lp_stuPsy_2);
				
					var lp_jsltinfo = "";
					$.each(data.classInfo,function(index,entry){
						if(lp_stuPsy_2==$.trim(entry.mname)){
							lp_jsltinfo +="<li>"+entry.cname+"</li>";
						}
					});
					//$("#jclassname").val("");
					$("#lp_stuPsy_3").html(lp_jsltinfo);
					var lp_jgradeul = $("#lp_stuPsy_3 > li");  //班级选择事件
					lp_jgradeul.click(function(){
						var jgradetext = $.trim($(this).text());
						$("#lp_stuPsy_3_val").val(jgradetext);
			  		});
				});
			});
		});
		var lp_level = $("#lp_stuPsy_4 > li"); 
		lp_level.click(function(){
			var jgradetext = $.trim($(this).text());
			$("#lp_stuPsy_4_val").val(jgradetext);
  		});
		
		//个人信息添加块
		$("#jacademyUl").html(jacademyinfo);
		var jacademyul = $("#jacademyUl > li");
		jacademyul.click(function(){  //学院选择事件
			var jacademytext = $.trim($(this).text());
			$("#jacademy").val(jacademytext); 
			major=[];
			var jmajorinfo = "";
			$.each(data.majorInfo,function(index,entry){
				if(jacademytext==$.trim(entry.dname)){
					jmajorinfo +="<li>"+entry.maname+"</li>";
					major.push(entry.maname);
				}
			});
			$("#jspecialty").html(jmajorinfo);
			$("#jgrades").html("");
			$("#jmajor").val("");
			$("#jclassname").val("");
			
			var jsltyul = $("#jspecialty > li");  //专业选择事件
			jsltyul.click(function(){
				var jsltext = $.trim($(this).text());
				$("#jmajor").val(jsltext);
				var jsltinfo = "";
				jclassInfo.splice(0,jclassInfo.length);
				$.each(data.classInfo,function(index,entry){
					if(jsltext==$.trim(entry.mname)){
						jsltinfo +="<li>"+entry.cname+"</li>";
						var obj = new Object();
						obj["cid"] = entry.cid;
						obj["cname"] = entry.cname;
						obj["mname"] = entry.maname;
						jclassInfo.push(obj);
						major.push(entry.maname);
					}
				});
				$("#jclassname").val("");
				$("#jgrades").html(jsltinfo);
				
				var jgradeul = $("#jgrades > li");  //班级选择事件
				jgradeul.click(function(){
					var jgradetext = $.trim($(this).text());
					$("#jclassname").val(jgradetext);
				});
			});
			
		});
		
		$('.lp_department').html(deInfo);
		//change事件career
		showMajor();
		$('.lp_department').change(function(){showMajor();});
		//将学院数据存到数组
		showMajor=function(){
			major=[];
			$.each(data.majorInfo,function(index,entry){
				if($("#myOption option:selected").text()==entry.dname+""){
					major.push(entry.maname);
				}
			});
		}
		$.each(data.nation,function(index,entry){
				lnation.push(entry.nation);
		});
		$.each(data.provincecity,function(index,entry){
			lprovincecity.push(entry.provincecity);
		});
		
		var jmconultext = "";
		$.each(data.condition,function(index,entry){
			jmconultext += "<li>"+"（"+entry.did+"）"+entry.dname+"</li>";
		});
		$("#jmconditionul").html(jmconultext);
		$("#jmconditionul li").click(function(){
			$("#jmcondition").val( $.trim($(this).text()) );
		});
		
		var jpolitultext = "";
		$.each(data.poverty,function(index,entry){
			jpolitultext += "<li>"+"（"+entry.did+"）"+entry.dname+"</li>";
		});
		$("#jmpovertyul").html(jpolitultext);
		$("#jmpovertyul li").click(function(){
			$("#jmpoverty").val( $.trim($(this).text()) );
		});
		
		$("#jpoliticsul li").click(function(){
			$("#jpolitics").val( $.trim($(this).text()) );
		});
		
	});
	
	//点击修改地址效果
	var res=true;
    $("#addressChange").click(function() {    	
    	if(res){
    		res=false;
    		$("#scollorContent").css("top","-42px");
    	}else{
    		res=true;
    		$("#scollorContent").css("top","0px");
    		var naddres =$("#sr1").val()+$("#ci1").val()+$("#co1").val()+$("#Townaddress").val();    	
    		if(naddres==""){        			
    			$("#zmaddress").val(addres);
    		}else{
        		$("#zmaddress").val("");
        		$("#zmaddress").val(naddres);
    		}

    	}        	
	});
	//专业
    $("#zmacademy").change(function(){//zmmajor
    	var acedamyzm = $.trim($(this).val());
    	var majorzm = "<option></option>";	
    	$("#zmmajor").html("");
    	$.each(Jsons.majorInfo,function(index,entry){
    		if(acedamyzm==entry.did){
    			majorzm+="<option value='"+entry.did+"'>"+entry.maname+"</option>";
    		}
    	});
    	$("#zmmajor").append(majorzm);
    });
    //图片专业
    $("#zmImageAcademy").change(function(){
    	var acedamyzm = $.trim($(this).val());    	
    	var zmImageMajor = "<option></option>";	
    	$("#zmImageMajor").html("");
    	$.each(Jsons.majorInfo,function(index,entry){
    		if(acedamyzm==entry.did){
    			zmImageMajor+="<option value='"+entry.did+"'>"+entry.maname+"</option>";
    		}
    	});
    	$("#zmImageMajor").append(zmImageMajor);
    });    
	//班级zmgrades  zmImageMajor
	$("#zmmajor").change(function(){//zmmajor
    	var majorszm = $.trim($(this).val());
    	var classzm = "<option></option>";	
    	$("#zmgrades").html("");
    	$.each(Jsons.classInfo,function(index,entry){
    		if(majorszm==entry.mid){
    			classzm+="<option value='"+entry.cid+"'>"+entry.cname+"</option>";
    		}
    	});
    	$("#zmgrades").append(classzm);    	
    });
	//图片改变  zmImageMajor
	$("#zmImageMajor").change(function(){//zmmajor
    	var majorszm = $.trim($(this).val());
    	var zmImageClass = "<option></option>";	
    	$("#zmImageClass").html("");
    	$.each(Jsons.classInfo,function(index,entry){
    		if(majorszm==entry.mid){
    			zmImageClass+="<option value='"+entry.cid+"'>"+entry.cname+"</option>";
    		}
    	});
    	$("#zmImageClass").append(zmImageClass);    	
    });	
	//政治面貌ischoolsystem
	$("#Mpolitics").bind('hide.bs.dropdown', function () {
		$("#Mpolitics li").click(function(){			
			$("#politics").val($.trim($(this).html()));
		});
	});	
	//学制
	$("#schoolsystem").bind('hide.bs.dropdown', function () {
		$("#schoolsystem li").click(function(){		
			$("#ischoolsystem").val($.trim($(this).html()));
		});
	});	
	//学历
	$("#education").bind('hide.bs.dropdown', function () {
		$("#education li").click(function(){							
			$("#meducation").val($.trim($(this).html()));
		});
	});	
	//上传头像
	$("#jphotofile").change(function(){
		var jphotofile = $("#jphotofile").val();
		var jphotofileformat = jphotofile.substring(jphotofile.lastIndexOf('.')+1,jphotofile.length);
		if(jphotofileformat=="jpg"){
			var fileObj = document.getElementById("jphotofile").files[0]; // 获取文件
			//上传文件的大小
			var totalFileSize = fileObj.size;
			//上传文件的大小
			if(totalFileSize>2048000){
				$("#jphotofile").val("");
				alert("图片过大，请选用小于2M大小的图片文件！");
				return;
			}
			//图片预览
			var oImage = document.getElementById('jphoto');
		    var oReader = new FileReader();
		    oReader.onload = function(e){
		        oImage.src = e.target.result;
		        oImage.onload = function(){};
		    };
		    oReader.readAsDataURL(fileObj);
		    
			 var FileController = "StuInfo_uploadHead";                    // 接收上传文件的后台地址
	         var form = new FormData();
	         form.append("uploadFile", fileObj);                           // 文件对象
	         var xhr = new XMLHttpRequest();								 // XMLHttpRequest 对象
	         xhr.open("post", FileController, true);
	         xhr.onload = function(){};   //头像上传成功执行函数
	         xhr.send(form);
		}else{
			$("#jphotofile").val("");
			alert("头像格式不对，请选用jpg图片！");
		}
	});	
	//修改学生图片
	$("#zphotofile").change(function(){
	    // 获得的图片
	    var oFile = document.getElementById('zphotofile').files[0];

	    // 文件格式
	    var rFilter = /^(image\/jpeg)$/i;
	    if (! rFilter.test(oFile.type)) {
	        alert("图片格式必须JPG");
	        return;
	    }
	    // 文件大小
	    if (oFile.size > 2048000) {
	        alert("图片不能超过2M");
	        return;
	    }
	    // 预览
	    var oImage = document.getElementById('stuImag');
	    //图片读取流
	    var oReader = new FileReader();
	        oReader.onload = function(e){	       
	        	oImage.src = e.target.result;
	        	oImage.onload = function () { // 读取成功
	        	};
	    };
	    oReader.readAsDataURL(oFile);
	    //上传	    
	    var oXHR = new XMLHttpRequest();	
        var form = new FormData();
        form.append("zmxImgObj", oFile);  
        form.append("zmxImgSnum",imgStuSnum);
        form.append("zmximgPath",zmximgPath);
	    oXHR.open('POST', 'StuInfo_zmupdateImage');
	    oXHR.send(form);
	    
	});
	//修改荣誉表
	$("#zmHornorForm").submit(function(){
		var jsonValue = ZmJSON("zmHornorForm");//序列化表单		
		$.post("StuInfo_updateHornorInfo?t="+new Date(),{
			'hornor':jsonValue			
		},function(data){
			if(data>0){
				$('#zmShowResult').modal('show');
			}else{
				alert("修改失败");
			}
			
		});
		return false;
	});
	//修改英语等级表zmCertificateForm
	$("#zmEnglishForm").submit(function(){
		var jsonValue = ZmJSON("zmEnglishForm");//序列化表单		
		$.post("StuInfo_updateEnglishInfo?t="+new Date(),{
			'englishInfo':jsonValue			
		},function(data){
			if(data>0){
				$('#zmShowResult').modal('show');
			}else{
				alert("修改失败");
			}
			
		});
		return false;
	});
	//修改证书表
	$("#zmCertificateForm").submit(function(){
		var jsonValue = ZmJSON("zmCertificateForm");//序列化表单		
		$.post("StuInfo_updateCertificateInfo?t="+new Date(),{
			'certificateInfo':jsonValue			
		},function(data){
			if(data>0){
				$('#zmShowResult').modal('show');
			}else{
				alert("修改失败");
			}
			
		});
		return false;
	});
	//修改寝室信息表
	$("#zmHouseCFForm").submit(function(){
		var jsonValue = ZmJSON("zmHouseCFForm");//序列化表单		
		$.post("StuInfo_updateHourseChufenInfo?t="+new Date(),{
			'hourseChufenInfo':jsonValue			
		},function(data){
			if(data>0){
				$('#zmShowResult').modal('show');
			}else{
				alert("修改失败");
			}
			
		});
		return false;
	});	
	//修改寝室信息表
	$("#zmStudnetCFForm").submit(function(){
		var jsonValue = ZmJSON("zmStudnetCFForm");//序列化表单		
		$.post("StuInfo_updateStudnetChufenInfo?t="+new Date(),{
			'studnetChufenInfo':jsonValue			
		},function(data){
			if(data>0){
				$('#zmShowResult').modal('show');
			}else{
				alert("修改失败");
			}
			
		});
		return false;
	});	
	//修改寝室信息表
	$("#zmStudnetExpressForm").submit(function(){
		var jsonValue = ZmJSON("zmStudnetExpressForm");//序列化表单		
		$.post("StuInfo_updateStudnetDetailInfo?t="+new Date(),{
			'studnetDetaiJSON':jsonValue			
		},function(data){
			if(data>0){
				$('#zmShowResult').modal('show');
			}else{
				alert("修改失败");
			}
			
		});
		return false;
	});	
	//修改职务信息表
	$("#zmPositionForm").submit(function(){
		var jsonValue = ZmJSON("zmPositionForm");//序列化表单		
		$.post("StuInfo_updateStudnetPositionInfo?t="+new Date(),{
			'studnetPositionJSON':jsonValue			
		},function(data){
			if(data>0){
				$('#zmShowResult').modal('show');
			}else{
				alert("修改失败");
			}
			
		});
		return false;
	});	
	//修改学生就业信息表
	$("#zmJopForm").submit(function(){
		var jsonValue = ZmJSON("zmJopForm");//序列化表单		
		$.post("StuInfo_updateStudnetJopInfo?t="+new Date(),{
			'studnetJopJSON':jsonValue			
		},function(data){
			if(data>0){
				$('#zmShowResult').modal('show');
			}else{
				alert("修改失败");
			}
			
		});
		return false;
	});	
});
//荣誉编辑
function editHornor(hid){
	//hournors
	$.each(hournors,function(index,entry){
		if(entry.hid==hid){
			$('#zmHounorTimes').val(entry.times);//zmHounorL
			$('#zmHounorXname').val(entry.hname);//zmHounorL
			$('#honorHid').val(entry.hid);
			if(entry.term==1){//获得学校的荣誉是上学期1还是下学期2					
				document.getElementById("zmHounoritemX").options[0].selected=true;
			}else{								
				document.getElementById("zmHounoritemX").options[1].selected=true;
			}				
			if(entry.levels==1){//获得学校的荣誉是校级1还是院级2				
				document.getElementById("zmHounorL").options[0].selected=true;
			}else{				
				document.getElementById("zmHounorL").options[1].selected=true;
			}			
		}
	});

	$('#zmHornorList').modal('hide');
}
//删除荣誉信息
function deleteHornor(obj,hid){	  
	var rowIndex = obj.parentNode.parentNode.rowIndex;//获得行下标	
	document.getElementById('myHTables').deleteRow(rowIndex);//通过行索引删除行	
	$.post("StuInfo_deleteHonorInfo?t="+new Date(),{
		'Hid':hid			
	},function(data){
		if(data>0){
			$('#zmDeleteResult').modal('show');
		}else{
			alert("删除失败");
		}
		
	});	
}
//删除英语证书信息
function deleteEnglish(obj,cid){	
	var rowIndex = obj.parentNode.parentNode.rowIndex;//获得行下标	
	document.getElementById('myEnglish').deleteRow(rowIndex);//通过行索引删除行	
	$.post("StuInfo_deleteEnglishInfo?t="+new Date(),{
		'englishCid':cid			
	},function(data){
		if(data>0){
			$('#zmDeleteResult').modal('show');
		}else{
			alert("删除失败");
		}
		
	});	
}
//删除证书信息
function deleteGrades(obj,hid){	
	var rowIndex = obj.parentNode.parentNode.rowIndex;//获得行下标	
	document.getElementById('zmGradesTb').deleteRow(rowIndex);//通过行索引删除行	
	$.post("StuInfo_deleteGradesTbInfo?t="+new Date(),{
		'gradeshid':hid			
	},function(data){
		if(data>0){
			$('#zmDeleteResult').modal('show');
		}else{
			alert("删除失败");
		}
		
	});	
}
//删除寝室处罚信息
function deleteHourseCF(obj,hid){	
	var rowIndex = obj.parentNode.parentNode.rowIndex;//获得行下标	
	document.getElementById('zmHourseCF').deleteRow(rowIndex);//通过行索引删除行	
	$.post("StuInfo_deleteHourseCFTbInfo?t="+new Date(),{
		'hourseCFHid':hid			
	},function(data){
		if(data>0){
			$('#zmDeleteResult').modal('show');
		}else{
			alert("删除失败");
		}
		
	});	
}
//删除学生处罚信息
function deleteStuCF(obj,cid){	
	var rowIndex = obj.parentNode.parentNode.rowIndex;//获得行下标	
	document.getElementById('zmStuCF').deleteRow(rowIndex);//通过行索引删除行	
	$.post("StuInfo_deleteStuCFTbInfo?t="+new Date(),{
		'stuCFCid':cid			
	},function(data){
		if(data>0){
			$('#zmDeleteResult').modal('show');
		}else{
			alert("删除失败");
		}
		
	});	
}
//删除学生职务处罚信息
function deletePositions(obj,pid){	
	var rowIndex = obj.parentNode.parentNode.rowIndex;//获得行下标	
	document.getElementById('zmPositionTb').deleteRow(rowIndex);//通过行索引删除行	
	$.post("StuInfo_deleteStuPositionInfo?t="+new Date(),{
		'stuPid':pid			
	},function(data){
		if(data>0){
			$('#zmDeleteResult').modal('show');
		}else{
			alert("删除失败");
		}
		
	});	
}
//英语编辑
function editEnglish(cid){
	$.each(zmpassEnglish,function(index,entry){									
		if(entry.cid==cid){
			$('#zmEglishTimes').val(entry.times);//考试时间
			$('#zmEglishtype').val(entry.cettype);//考试类型				
			$('#zmEglishCid').val(entry.cid);//英语考试的
			$('#zmEglishScore').val(entry.score);//考试时间
			if(entry.term==1){//获得学校的荣誉是上学期1还是下学期2				
				document.getElementById("zmEglishItem").options[0].selected=true;
			}else{				
				document.getElementById("zmEglishItem").options[1].selected=true;
			}			
		}
	});

	$('#zmEngligshList').modal('hide');
}
//编辑所有的证书
function editACF(hid){
	$.each(zmGainCFlist,function(index,entry){	
		if(hid==entry.hid){
			$('#zmCfDates').val(entry.times);//考试时间
			$('#zmCFName').val(entry.name);//证书名称				
			$('#zmCFHid').val(entry.hid);//证书的id
			$('#zmCFScore').val(entry.score);//考试成绩
			var zmCFtypes="";
			
			$.each(zmAllCtype,function(indexs,entrys){//类型表	
				if(entry.tid==entrys.tid){
					zmCFtypes+= "<option value='"+entrys.tid+"' selected>"+entrys.tname+"</option>";
				}else{
					zmCFtypes+= "<option value='"+entrys.tid+"'>"+entrys.tname+"</option>";
				}					
			});
			$("#zmCFType").html(zmCFtypes);
			if(entry.term==1){//获得学校的证书是上学期1还是下学期2				
				document.getElementById("zmCFItem").options[0].selected=true;
			}else{				
				document.getElementById("zmCFItem").options[1].selected=true;
			}
		}
	});
	
	$('#zmACFList').modal('hide');
}
//编辑寝室通报
function editHCF(hid){
	$.each(zmGainHCFlist,function(index,entry){
		if(hid==entry.hid){			
			$('#zmHCFDate').val(entry.times);//通报时间
			$('#zmCFHousre').val(entry.hnum+"-"+entry.dormitory);//通报寝室			
			$('#zmHCFHid').val(entry.hid);//通报的id
			$('#zmHCFreason').val(entry.content);//通报内容
			if(entry.term==1){//通报时间是上学期1还是下学期2				
				document.getElementById("zmHCFItem").options[0].selected=true;
			}else{				
				document.getElementById("zmHCFItem").options[1].selected=true;
			}
			if(entry.levels==1){//通报时间是校级1还是院级2				
				document.getElementById("zmHCFLv").options[0].selected=true;
			}else{				
				document.getElementById("zmHCFLv").options[1].selected=true;
			}			
		}
	});	
	$('#zmCFHList').modal('hide');
}
//编辑处罚信息表
function editXHCF(cid){
	$.each(zmgainXHCFlist,function(index,entry){
		if(cid==entry.cid){
			$('#zmXCFDate').val(entry.dates);//处罚时间						
			$('#zmXCFHid').val(entry.cid);//通报的id
			$('#zmXCFReason').val(entry.content);//通报内容
			if(entry.levels==1){//通报时间是校级1还是院级2				
				document.getElementById("zmXCFLevel").options[0].selected=true;
			}else{				
				document.getElementById("zmXCFLevel").options[1].selected=true;
			}			
		}
	});
			
	$('#zmXCFList').modal('hide');
}
//编辑职务信息表
function editPosition(pid){	

	$.each(zmMMPlist,function(index,entry){
		if(pid==entry.pid){			
			$('#zmPositionDate').val(entry.times);//任职时间
			$('#zmPSName').val(entry.pname);//任职名称
			$('#zmMPID').val(entry.pid);//职务id				
			if(entry.term==1){//通报时间是上学期1还是下学期2				
				document.getElementById("zmPMItem").options[0].selected=true;
			}else{				
				document.getElementById("zmPMItem").options[1].selected=true;
			}
			if(entry.levels==1){//通报时间是校级1还是院级2				
				document.getElementById("zmPLevels").options[0].selected=true;
			}else{				
				document.getElementById("zmPLevels").options[1].selected=true;
			}			
		}
	});
	$('#zmMPList').modal('hide');
}
//多条件查询弹出并显示专业信息
function showMajor(){
	var majors="<option></option>";
	for(var i=0;i<major.length;i++){
		majors+="<option>"+major[i]+"</option>";
	}	
	$('#lp_major').html(majors);
 }
 Array.prototype.zmunique = function() {
	    var res = [], hash = {};
	    for(var i=0, elem; (elem = this[i]) != null; i++)  {
	        if (!hash[elem])
	        {
	            res.push(elem);
	            hash[elem] = true;
	        }
	    }
	    return res;
	};
//其他条件查询
 function showOtherSelect(){
	var majors="<option></option>";
	var nations="<option></option>";
	var provincecitys="<option></option>";
	var stuClass="<option></option>";
	$('#lp_findClass').html("");
	if(""==$("#myOption option:selected").text()){
		$('#lp_major').attr('disabled',true);
	}else{
		$('#lp_major').attr('disabled',false);
	}
	for(var i=0;i<major.length;i++){
		majors+="<option>"+major[i]+"</option>";
	}	
	$('#lp_major').html(majors);
	
	$('#lp_major').change(function(){
		stuClass ="<option></option>";
		var lp_majors=$(this).val();
		for(var i=0;i<lp_jclassInfo.length;i++){
			if((""!=lp_majors) && (lp_majors==lp_jclassInfo[i].mname)  ){
				stuClass +="<option>"+lp_jclassInfo[i].cname+"</option>"
			}
		}
		$('#lp_findClass').html(stuClass);
	});
	
	for(var i=0;i<lnation.length;i++){
		nations+="<option>"+lnation[i]+"</option>";
	}	
	$('#lp_minzu').html(nations);
	
	for(var i=0;i<lprovincecity.length;i++){
		provincecitys+="<option>"+lprovincecity[i]+"</option>";
	}	
	$('#lp_nation').html(provincecitys);
	
 }
 
 //添加单个学生
function addstuInfo(){
	//获取数据
	var snum = $.trim( $("#jstunm").val() );
	var sname = $.trim( $("#jsname").val() );
	var sex=$('input:radio[name="jstusex"]:checked').val();
	var phone = $.trim( $("#jtel").val() );
	var classname = $.trim( $("#jclassname").val() );
	var cid;
	for(var i=0; i<jclassInfo.length;i++){
		var jcls = jclassInfo[i];
		if(jcls.cname==classname){
			cid = jcls.cid;
			break;
		}
	}
	var jdorm =  $.trim( $("#jdorm").val() );
	var dorm = jdorm.split("-");
	var hoursenum = dorm[0];
	var dormitory = dorm[1];
	var bednum = dorm[2];
	var qqunm = $.trim( $("#jsqq").val() );
	var email = $.trim( $("#jemial").val() );
	var prole = $.trim( $("#jpolitics").val() );
	var provincecity=$.trim( $("#jbirthplace").val() );
	var parent = $.trim( $("#jparentName").val() );
	var tel = $.trim( $("#jptel").val() );
	var birth = $.trim( $("#jbirthDate").val() );
	var jmcondition = $.trim( $("#jmcondition").val() );
	var sstatus = jmcondition.substring(1,jmcondition.lastIndexOf('）'));
	var nation = $.trim( $("#jprovin").val() );
	var jmpoverty = $.trim( $("#jmpoverty").val() );
	var difficults = jmpoverty.substring(1,jmpoverty.lastIndexOf('）'));
	var sidnum = $.trim( $("#jidcared").val() );
	var jsr1 = $.trim( $("#jsr1").val() );
	var jci1 = $.trim( $("#jci1").val() );
	var jco1 = $.trim( $("#jco1").val() );
	var muyinputwdd = $.trim( $("#jTownaddress").val() );
	var addr = jsr1+jci1+jco1+muyinputwdd;
	
	$.post("StuInfo_addSingleStu",
		{"stuInfo.snum":snum,"stuInfo.sname":sname,
		"stuInfo.sex":sex,"stuInfo.birth":birth,
		"stuInfo.phone":phone,"stuInfo.qqunm":qqunm,
		"stuInfo.email":email,"stuInfo.hoursenum":hoursenum,
		"stuInfo.dormitory":dormitory,"stuInfo.bednum":bednum,
		"stuInfo.sidnum":sidnum,"stuInfo.nation":nation,
		"stuInfo.provincecity":provincecity,"stuInfo.addr":addr,
		"stuInfo.prole":prole,"stuInfo.difficults":difficults,
		"stuInfo.tel":tel,"stuInfo.parent":parent,
		"stuInfo.cid":cid,"stuInfo.sstatus":sstatus,"stuInfo.leavschool":""},
		function(data){
			if(data==0){
				alert("该学生存在，不能重复添加！")
			}else{
//				alert("添加成功！");
				$("#addStuInfocz").click();
			}
		}
	);
	
	return false;
}
//弹出确认消息
function Confirms(){  
	if(confirm("是否保存并退出？")){		
		var jsonValue = ZmJSON("zmform");			
		$.post("StuInfo_updatestudentInfo?t="+new Date(),{
			'stu':jsonValue			
		},function(data){			
			$('#showStudentDetilInfo').hide();
			$('.tab').show();
			$('.lp_fenye').show();
			$('#zxk_maintable').show();
		});
		/*功能扩张*/
	}else{
		return false;
	}
	return false;
}

function showStuInfo(){
	$('#showStudentDetilInfo').hide();
	$('.tab').show();
	$('.lp_fenye').show();
	$('#zxk_maintable').show();
} 
/*json格式传递参数 zm*/
function ZmJSON(formid){
	var fields = $("#"+formid).serialize();
	fields = decodeURIComponent(fields,true);//字符串转编码
	var dataResult =fields;
    var tmp = dataResult.replace(/&/g, "\",");
    tmp = tmp.replace(/=/g, ":\"");
    var jsonValue ="{" + tmp + "\"}";   
    return jsonValue;
}

 /*改变Input的默认提示信息zm*/

 function Inputout(i,tip){  
     var v = i.validity;  
     if(true === v.valueMessing){  
         i.setCustomValidity("请填写此字段");  
     }else{  
         if(true === v.patternMismatch){  

             i.setCustomValidity(tip);  
         }else{  
             i.setCustomValidity("");  
         }  
     }  
}  


/*数组取掉重复的值zm*/
 Array.prototype.zmunique = function() {
	    var res = [], hash = {};
	    for(var i=0, elem; (elem = this[i]) != null; i++)  {
	        if (!hash[elem])
	        {
	            res.push(elem);
	            hash[elem] = true;
	        }
	    }
	    return res;
	}
 //学生信息查信键盘事件绑定
$(document).keydown(function(event){
	switch(event.keyCode){
		case 13:
			$("#lp_keyup").click(selectStuInfo());
			break;
	}
});

//学生心理方面
/**
 * NocancelStuPsy
 */
function NocancelStuPsy(){
	alert("此人未关注！");
}

/**
 * 取消关注
 */
function cancelStuPsy(canNum){
	$("#lp_keyup").attr("disabled",true);
    setTimeout("selectTimeOuts();",2000);
	var lp_confirmed = window.confirm("取消将不能恢复，您确定取消?"); 
	if(lp_confirmed){
		var num=canNum;
		$.post('StuInfo_cancelStuPsy?t='+new Date(),{
			"hosttable.snum":canNum
		},function(data){
			if(data==1){
				alert("取消成功！如需再次关注请到学生查询处重新关注！");
				showStuPsyInfoList(); //查看关注的学生
			}else{
				alert("取消失败！请查看网络是否连接");
			}
		});
	}
}

/**
 * 找到心理类型
 */
var lp_stuPsyTypeInfo=[];
var lp_stuNums;
var lp_stuName;
function findPsyType(stuNums,stuNames){
	lp_stuNums=stuNums;
	lp_stuName=stuNames;
	
	$("#lp_stuPsyType option").remove();
	$.getJSON('StuInfo_findStuPsyTypeInfo?t='+new Date(),{},function(data){
		if(data.hostTypes==""){
			alert("查无此数据");
			return;
		}
		var styPsyType="";
		$.each(data.hostTypes,function(index,entry){
			styPsyType+="<option>"+entry.hname+"</option>";
			var obj = new Object();
			obj["hid"] = entry.hid;
			obj["hname"] = entry.hname;
			lp_stuPsyTypeInfo.push(obj);
		});
		$("#lp_stuPsyType").append(styPsyType);
		
		$("#lp_conmitNum").val("");
		$("#lp_conmitName").val("");
		$("#lp_conmitNum").val( lp_stuNums);
		$("#lp_conmitName").val(lp_stuName );
		
	});
}
/**
 * 添加学生心理类型
 */
function lp_addPsyType(){
	var lp_stuPsyType=$("#lp_stuPsyTypes").val().trim();
	var lp_stuPsyMiaoshu=$("#lp_stuPsyMiaoshu").val().trim();
	$.post("StuInfo_addStuPsyType?t="+new Date(),{
		'hostType.hname':lp_stuPsyType,
		'hostType.descs':lp_stuPsyMiaoshu
	},function(data){
		if(data==1){
			alert("添加成功");
		}else{
			alert("添加失败");
		}
	});
	$("#lp_stuPsyType option").remove();
	//注意：这里需重新发请求，，会有缓存影响数据
	$.getJSON('StuInfo_findStuPsyTypeInfo?t='+new Date(),{},function(data){
		if(data.hostTypes==""){
			alert("查无此数据");
			return;
		}
		var styPsyType="";
		$.each(data.hostTypes,function(index,entry){
			styPsyType+="<option>"+entry.hname+"</option>";
			lp_stuPsyTypeInfo=[];
			var obj = new Object();
			obj["hid"] = entry.hid;
			obj["hname"] = entry.hname;
			lp_stuPsyTypeInfo.push(obj);
			
		});
		$("#lp_stuPsyType").append(styPsyType);
		$("#lp_conmitNum").val( lp_stuNums);
		$("#lp_conmitName").val(lp_stuName );
	});
}
//确认关注某个学生
function lp_addStuPsys(){
	var lp_confirmed = window.confirm("您确定关注?"); 
	if(lp_confirmed){
		var lever=$('#lp_stuPsyLevle').val().trim();
		var lp_lever;
		if( lever=="一般关注" ){
			lp_lever=2;
		}else if( lever=="重点关注" ){
			lp_lever=3;
		}
		var lp_stuId=lp_stuNums;
		var lp_stuPsyType="";
		var lp_hid;
		var adminIds=lp_adminId;  //申请人
		var status=0;
		$("#lp_stuPsyType option:selected").each(function(){
	        lp_stuPsyType=$(this).text();
	       for(var i=0;i<lp_stuPsyTypeInfo.length;i++){
	    	   if(lp_stuPsyTypeInfo[i].hname==lp_stuPsyType){
	    		   lp_hid=lp_stuPsyTypeInfo[i].hid;
	           }
	       }
	    });
		//alert(lp_hid+"lp"+lp_lever+"lp"+adminIds+"lp"+lp_stuId+"lp"+status);
		$.post('StuInfo_addStuPsyInfo?t='+new Date(),{
			'hosttable.hid':lp_hid,
			'hosttable.aid':adminIds,
			'hosttable.snum':lp_stuId,  
			'hosttable.levels':lp_lever,
			'hosttable.status':status
		},function(data){
			if(data==1){
				alert("关注成功！");
				$("#lp_stuPsyInfosAdd").modal("hide");
				//showStuPsyInfoList();
				$("#lp_stuPsyInfosAdd").on("hidden.bs.modal", function() {
				    $(this).removeData("bs.modal");
				});
			}else{
				alert("添加失败！请确认条件是否正确！");
			}
		});
	}
}
//查询以关注或以提交的学生
function showStuPsyInfoList(){
	var adminId=lp_adminId;
	var adminName=lp_adminName;
	var stuId=$('#lp_stuPsyNum').val();
	var lp_stuPsyType=$('#lp_stuPsyType').val();
	var lp_stuPsyMiaoshu=$('#lp_stuPsyMiaoshu').val();
	$.getJSON('StuInfo_stuPsyHelp?t='+new Date(),{
		 'hostType.hname':lp_stuPsyType,
		 'hostType.descs':lp_stuPsyMiaoshu,
		 'hosttable.snum':stuId,
		 'hosttable.aid':adminId,
		 'hosttable.aname':lp_role
		 },function(data){
			if(data){
				displayNone();
				$("#lp_stuPsyInfosAdd").css("display","none");
				$(".modal-backdrop ").css("display","none");
				$("#stuPsyTitle").css("display","block");
				
				var stuPsyInfo="";
				stuPsyInfo="<table id=\"mytable\" class=\"mytable table table-condensed table-hover table-striped table-bordered\"><thead>"+
                "<tr><td class=\"titleBgColor\"><input type=\"checkbox\" id=\"checkAll\" name=\"checkAll\"></td>"+
				"<td class=\"titleBgColor\">学生学号</td>" +
                "<td class=\"titleBgColor\">学生姓名</td>"+
                "<td class=\"titleBgColor\">班级</td>"+
                "<td class=\"titleBgColor\">状况类型</td>"+
                "<td class=\"titleBgColor\">状态描述</td>"+
                "<td class=\"titleBgColor\">关注等级</td>"+
                "<td class=\"titleBgColor\">状态</td>"+
                "<td class=\"titleBgColor\">申请人</td>"+
                "<td class=\"titleBgColor\">申请时间</td>" +
                "<td class=\"titleBgColor\">操作</td></tr><tbody>";
					
				if("辅导员"==lp_role){
					$.each(data.stuPsyHelp,function(index,entry){
						stuPsyInfo+="<tr><td><input type=\"checkbox\" id=\"checkStuPsy\" name=\"checkStuPsy\"></td>";
						stuPsyInfo+="<td id="+entry.snum+">"+entry.snum+"</td>";
						stuPsyInfo+="<td>"+entry.sname+"</td>";
						stuPsyInfo+="<td>"+entry.cname+"</td>";
						stuPsyInfo+="<td>"+entry.hname+"</td>";
						stuPsyInfo+="<td>"+entry.descs+"</td>";
						if(entry.levels==1){
							stuPsyInfo+="<td>不关注</td>";
						}
						if(entry.levels==2){
							stuPsyInfo+="<td>一般关注</td>";
						}
						if(entry.levels==3){
							stuPsyInfo+="<td>重点关注</td>";
						}
						if(entry.status==0){
							stuPsyInfo+="<td>未审核</td>";
						}else{
							stuPsyInfo+="<td>已审核</td>";
						}
						stuPsyInfo+="<td>"+entry.aname+"</td>";
						stuPsyInfo+="<td>"+entry.rdate+"</td>";
						
						if(entry.temp3!="" && entry.temp3==0){
							stuPsyInfo+="<td>"+
							"<button type=\"button\" disabled=\"true\" class=\"btn btn-danger\">驳回</button>"+
							"<button id="+entry.sname+" type=\"button\" class=\"lp_btn btn btn-primary\" onclick=\"commitStuPsy("+entry.snum+","+entry.sname+","+entry.temp3+")\">重提交</button>" +
							"<button type=\"button\" class=\"btn btn-danger\" onclick=\"cancelStuPsy("+entry.snum+")\">删除</button>"+
							"</td></tr>"; 
						}else if((entry.flag==1 || entry.flag==2) && entry.temp3!=1){
							stuPsyInfo+="<td>"+
							"<button id="+entry.sname+" type=\"button\"  disabled=\"true\" class=\"lp_btn btn btn-primary\" onclick=\"commitStuPsy("+entry.snum+","+entry.sname+")\">已提交</button>" +
							"<button type=\"button\" class=\"btn btn-danger\" onclick=\"cancelStuPsy("+entry.snum+")\">删除</button>"+
							"</td></tr>"; 
						}else if( (entry.flag==1 || entry.flag==2) && entry.temp3==1){
							stuPsyInfo+="<td>"+
							"<button id="+entry.sname+" type=\"button\" value="+entry.sname+"  class=\"lp_btn btn btn-primary\" onclick=\"addDetailInfo("+entry.wid+","+entry.sname+")\">添加跟踪信息</button>" +
							"<button type=\"button\" class=\"btn btn-danger\" onclick=\"cancelStuPsy("+entry.snum+")\">删除</button>"+
							"</td></tr>";
						}else{
							stuPsyInfo+="<td>"+
							"<button id="+entry.sname+" type=\"button\" class=\"lp_btn btn btn-primary\" onclick=\"commitStuPsy("+entry.snum+","+entry.sname+")\">提交</button>" +
							"<button type=\"button\" class=\"btn btn-danger\" onclick=\"cancelStuPsy("+entry.snum+")\">删除</button>"+
							"</td></tr>";
						} 
						
					});
					$("#lp_title").text("全部提交");
				}
					
				if("书记"==lp_role){
					$.each(data.stuPsyHelp,function(index,entry){
						if(entry.flag==1 ||entry.flag==2){
							stuPsyInfo+="<tr><td><input type=\"checkbox\" id=\"checkStuPsy\" name=\"checkStuPsy\"></td>";
							stuPsyInfo+="<td id="+entry.snum+">"+entry.snum+"</td>";
							stuPsyInfo+="<td id="+entry.sname+">"+entry.sname+"</td>";
							stuPsyInfo+="<td>"+entry.cname+"</td>";
							stuPsyInfo+="<td>"+entry.hname+"</td>";
							stuPsyInfo+="<td>"+entry.descs+"</td>";
							if(entry.levels==1){
								stuPsyInfo+="<td>不关注</td>";
							}
							if(entry.levels==2){
								stuPsyInfo+="<td>一般关注</td>";
							}
							if(entry.levels==3){
								stuPsyInfo+="<td>重点关注</td>";
							}
							if(entry.status==0){
								stuPsyInfo+="<td>未审核</td>";
							}else{
								stuPsyInfo+="<td>已审核</td>";
							}
							stuPsyInfo+="<td>"+entry.aname+"</td>";
							stuPsyInfo+="<td>"+entry.rdate+"</td>";
							if(entry.temp3!="" && entry.temp3==0){
								alert(entry.temp3);
								stuPsyInfo+="<td>"+
								"<button type=\"button\" disabled=\"true\" class=\"btn btn-danger\">已驳回</button>"+
								"</td></tr>"; 
							}else if(entry.flag==2){
								stuPsyInfo+="<td>"+
								"<button data-toggle=\"modal\" data-target=\"#lp_stuPsyInfosAdd\" disabled=\"true\" type=\"button\" class=\"lp_btn btn btn-primary\" onclick=\"shuji_SheHe("+entry.snum+","+entry.sname+")\">已审核</button>" +
								"<button type=\"button\" class=\"btn btn-danger\" onclick=\"cancelStuPsy("+entry.snum+")\">删除</button>"+
								"</td></tr>"; 
							}else{
								stuPsyInfo+="<td>"+
								"<button data-toggle=\"modal\" data-target=\"#lp_stuPsyInfosAdd\" type=\"button\" class=\"lp_btn btn btn-primary\" onclick=\"shuji_SheHe("+entry.snum+","+entry.sname+")\">审核</button>" +
								"<button data-toggle=\"modal\" data-target=\"#lp_stuPsyInfosAdd\" type=\"button\" class=\"btn btn-danger\" onclick=\"cancelStuPsys("+entry.snum+","+entry.sname+")\">驳回</button>"+
								"</td></tr>"; 
							}
							
						}
					});
					$("#lp_title").text("学生信息审核").attr("disabled",true);
				}
				if("学工处"==lp_role){
					$.each(data.stuPsyHelp,function(index,entry){
						if(entry.flag==2){
							stuPsyInfo+="<tr><td><input type=\"checkbox\" id=\"checkStuPsy\" name=\"checkStuPsy\"></td>";
							stuPsyInfo+="<td id="+entry.snum+">"+entry.snum+"</td>";
							stuPsyInfo+="<td id="+entry.sname+">"+entry.sname+"</td>";
							stuPsyInfo+="<td>"+entry.cname+"</td>";
							stuPsyInfo+="<td>"+entry.hname+"</td>";
							stuPsyInfo+="<td>"+entry.descs+"</td>";
							if(entry.levels==1){
								stuPsyInfo+="<td>不关注</td>";
							}
							if(entry.levels==2){
								stuPsyInfo+="<td>一般关注</td>";
							}
							if(entry.levels==3){
								stuPsyInfo+="<td>重点关注</td>";
							}
							if(entry.temp3==1){
								stuPsyInfo+="<td>已审核</td>";
							}else{
								stuPsyInfo+="<td>未审核</td>";
							}
							stuPsyInfo+="<td>"+entry.aname+"</td>";
							stuPsyInfo+="<td>"+entry.rdate+"</td>";
							if(entry.temp3==1){
								stuPsyInfo+="<td>"+
								"<button data-toggle=\"modal\" type=\"button\" onclick=\"lookFollowInfo("+entry.snum+","+entry.sname+")\" class=\"lp_btn btn btn-primary\">查看</button>" +
								"<button type=\"button\" class=\"btn btn-danger\" onclick=\"lp_finishStuPsy("+entry.snum+")\">完结</button>"+
								"</td></tr>"; 
							}else if(entry.temp3==2){
								stuPsyInfo+="<td>"+
								"<button data-toggle=\"modal\" disabled=\"true\" data-target=\"#lp_stuPsyInfosAdd\" type=\"button\" class=\"lp_btn btn btn-primary\">已完结</button>" +
								"<button type=\"button\" class=\"btn btn-danger\" onclick=\"cancelStuPsy("+entry.snum+")\">删除</button>"+
								"</td></tr>"; 
							}else{
								stuPsyInfo+="<td>"+
								"<button data-toggle=\"modal\" data-target=\"#lp_stuPsyInfosAdd\" type=\"button\" class=\"lp_btn btn btn-primary\" onclick=\"lp_allSuggest("+entry.snum+","+entry.sname+")\">跟踪</button>" +
								"<button type=\"button\" class=\"btn btn-danger\" onclick=\"cancelStuPsy("+entry.snum+")\">删除</button>"+
								"</td></tr>"; 
							}
						}
					});
					$("#lp_title").text("学生心理跟踪").attr("disabled",true);
				}
				stuPsyInfo+="</tbody></table>";
				$("#zxk_maintable").html(stuPsyInfo);
				simpleFenye("#mytable");
				$("#myFenye").css('display','block');
			    $("#zxk_maintable").css("display","block");
			    if("学工处"==lp_role){
			    	lp_rightClick();
			    }
			    selectAll();
			}else{
				alert("添加失败");
			}	
	});
}

//提交申请
function commitStuPsy(snums,snames,flags){

	var lp_confirmed = window.confirm("提交将不能修改，您确定提交?"); 
	if(lp_confirmed){
//		$('#'+snames).attr("disabled",true);
//	    setTimeout("selectTimeOuts();",2000);
		if(flags==0){
			$.post("StuInfo_comShenHeReturn",{
				'hosttable.snum':snums
			},function(data){
				if(data==1){
					alert("以提交待审核！");
					$(snames).text("已提交");
					$(snames).attr("disabled",true); 
				}else{
					alert("提交失败！");
				}
			});
			return;
		}
		
		$.post("StuInfo_comShenHe",{
			'hosttable.snum':snums
		},function(data){
			if(data==1){
				alert("以提交待审核！");
				$(snames).text("已提交");
				$(snames).attr("disabled",true); 
			}else{
				alert("提交失败！");
			}
		});
	}
}
//书记审核
function shuji_SheHe(nums,names){
	var shuJiShenHe="";
	var footComit="";
	var Studname=$(names).text();
	$("#changeText h4").text("书记审核");
	$("#lp_removeChild").children().remove();
	$("#removeFoot").children().remove();
	
	shuJiShenHe+="<div class=\"col-xs-4\"><input type=\"text\" class=\"lp_conmitName form-control\" value="+Studname+" readonly=\"readonly\" id=\"lp_Names\"></div>";
	shuJiShenHe+="<div class=\"col-xs-4\"><input type=\"text\" class=\"lp_conmitName form-control\" value="+nums+" readonly=\"readonly\" id=\"lp_Nums\"></div><br/><br/><br/>";
	shuJiShenHe+="<div><input class=\"btn btn-default\" disabled=\"true\" type=\"button\" value=\"书记意见\">";
	shuJiShenHe+="<textarea class=\"form-control\" id=\"lp_shuJiSug\" rows=\"3\" placeholder=\"在这填写建议\"></textarea></div>";
	
	footComit+="<button type=\"button\" class=\"btn btn-default\" id=\"cancel\" data-dismiss=\"modal\">取消</button>";
	footComit+="<button type=\"button\" id=\"lp_shuJi\" class=\"btn btn-primary\" onclick=\"lp_addShuJiStuPsys()\">确定</button>";
	
	$("#lp_removeChild").append(shuJiShenHe);
	$("#removeFoot").append(footComit);
}
//书记驳回理由
function cancelStuPsys(nums,names){
	var shuJiShenHe="";
	var footComit="";
	var Studname=$(names).text();
	$("#changeText h4").text("书记驳回");
	$("#lp_removeChild").children().remove();
	$("#removeFoot").children().remove();
	
	shuJiShenHe+="<div class=\"col-xs-4\"><input type=\"text\" class=\"lp_conmitName form-control\" value="+Studname+" readonly=\"readonly\" id=\"lp_Names\"></div>";
	shuJiShenHe+="<div class=\"col-xs-4\"><input type=\"text\" class=\"lp_conmitName form-control\" value="+nums+" readonly=\"readonly\" id=\"lp_Nums\"></div><br/><br/><br/>";
	shuJiShenHe+="<div><input class=\"btn btn-default\" disabled=\"true\" type=\"button\" value=\"书记意见\">";
	shuJiShenHe+="<textarea class=\"form-control\" id=\"lp_shuJiSug\" rows=\"3\" placeholder=\"在这填写建议\"></textarea></div>";
	
	footComit+="<button type=\"button\" class=\"btn btn-default\" id=\"cancel\" data-dismiss=\"modal\">取消</button>";
	footComit+="<button type=\"button\" id=\"lp_shuJi\" class=\"btn btn-primary\" onclick=\"conFirmcancelStuPsys()\">确定</button>";
	
	$("#lp_removeChild").append(shuJiShenHe);
	$("#removeFoot").append(footComit);
}
//书记驳回确认
function conFirmcancelStuPsys(){
	$("#lp_shuJi").attr("disabled",true);
    setTimeout("selectTimeOuts();",2000);
	var adminName=lp_adminName;
	var lp_shuJiSug=$("#lp_shuJiSug").val().trim();
	var lp_stuNum=$("#lp_Nums").val().trim();
	$.post("StuInfo_shuJiBohui",{
		"hosttable.opInfo1":lp_shuJiSug,
		"hosttable.snum":lp_stuNum
	},function(data){
		 if(data==1){
			 alert("驳回成功！");
			 $('#lp_stuPsyInfosAdd').modal('hide');
			 showStuPsyInfoList();
			 $("#lp_stuPsyInfosAdd").on("hidden.bs.modal", function() {
				    $(this).removeData("bs.modal");
			 });
		 }else{
			 alert("驳回失败，请重试！");
		 }
	});
	
}
//书记意见
function lp_addShuJiStuPsys(){
	$("#lp_shuJi").attr("disabled",true);
    setTimeout("selectTimeOuts();",2000);
	var adminId=lp_adminId;
	var adminName=lp_adminName;
	var lp_shuJiSug=$("#lp_shuJiSug").val().trim();
	var lp_stuNum=$("#lp_Nums").val().trim();
	$.post("StuInfo_shuJiShenHe",{
		"hosttable.opInfo1":lp_shuJiSug,
		"hosttable.snum":lp_stuNum,
		'hosttable.aid1':adminId
	},function(data){
		 if(data==1){
			 alert("审核成功！");
			 $('#lp_stuPsyInfosAdd').modal('hide');
			 showStuPsyInfoList();
			 $("#lp_stuPsyInfosAdd").on("hidden.bs.modal", function() {
				    $(this).removeData("bs.modal");
			 });
		 }else{
			 alert("审核失败！");
		 }
	});
}

//学工处意见
function lp_addXueGongChuStuPsys(){
	$("#lp_xueGong").attr("disabled",true);
    setTimeout("selectTimeOuts();",2000);
    var adminId=lp_adminId;
	var lp_xuGongChuSug=$("#lp_xuGongChuSug").val().trim();
	var lp_stuNum=$("#lp_Nums").val().trim();
	$.post("StuInfo_xueGongChuShenHe",{
		"hosttable.aid2":adminId,
		"hosttable.opInfo2":lp_xuGongChuSug,
		"hosttable.snum":lp_stuNum
	},function(data){
		 if(data==1){
			 alert("审核成功！");
			 $('#lp_stuPsyInfosAdd').modal('hide');
			 showStuPsyInfoList();
		 }else{
			 alert("审核失败！");
		 }
	});
}
//完结
function lp_finishStuPsy(stuNum){
	var lp_confirmed = window.confirm("您的操作将会取消对此学生的，确认完结？"); 
	var lp_stuNums=stuNum;
	if(lp_confirmed){
		$.post("StuInfo_finishStuPsy",{
			"hosttable.snum":lp_stuNums
		},function(data){
			 if(data==1){
				 alert("此学生心理暂时恢复正常！");
				 showStuPsyInfoList();
			 }else{
				 alert("完结失败，请查看网络！");
			 }
		});
	}
}

//所有意见
function lp_allSuggest(nums,names){
	var allSuggested="";
	var footComit="";
	var Studname=$(names).text();
	
	$("#changeText h4").text("跟踪意见栏");
	$("#lp_removeChild").children().remove();
	$("#removeFoot").children().remove();
	
	$.getJSON('StuInfo_stuPsyHelp?t='+new Date(),{
		'hosttable.snum':nums,
		'hosttable.aname':lp_role
	},function(data){
		if(data.stuPsyHelp==""){
			alert("查无此数据");
			return;
		}
		$.each(data.stuPsyHelp,function(index,entry){
			$("#lp_shuJiSugs").text(entry.opInfo1);
		});
	});
	
	allSuggested+="<div class=\"col-xs-4\"><input type=\"text\" class=\"lp_conmitName form-control\" value="+Studname+" readonly=\"readonly\" id=\"lp_Names\"></div>";
	allSuggested+="<div class=\"col-xs-4\"><input type=\"text\" class=\"lp_conmitName form-control\" value="+nums+" readonly=\"readonly\" id=\"lp_Nums\"></div><br/><br/><br/>";
	allSuggested+="<div><input class=\"btn btn-default\" disabled=\"true\" type=\"button\" value=\"书记意见\">";
	allSuggested+="<textarea class=\"form-control\" id=\"lp_shuJiSugs\" rows=\"3\" placeholder=\"无意见\" readonly=\"readonly\"></textarea></div>";
	allSuggested+="<div><input class=\"btn btn-default\" disabled=\"true\" type=\"button\" value=\"学工处意见\">";
	allSuggested+="<textarea class=\"form-control\" id=\"lp_xuGongChuSug\" rows=\"3\" placeholder=\"无意见\"></textarea></div>";
	
	footComit+="<button type=\"button\" class=\"btn btn-default\" id=\"cancel\" data-dismiss=\"modal\">取消</button>";
	footComit+="<button type=\"button\" class=\"btn btn-primary\" id=\"lp_xueGong\" onclick=\"lp_addXueGongChuStuPsys()\">确定</button>";
	$("#lp_removeChild").append(allSuggested);
	$("#removeFoot").append(footComit);

}


//简单的前台分页
//

function simpleFenye(table){
	$(table).each( function(){
		var currentPage=0;
		var numPaper=4;
		var pageUser=function(){
			$(table).find('tbody tr').hide()
				.slice(currentPage * numPaper,(currentPage+1) * numPaper)
				.show();
		};
		pageUser();
		var numRows=$(this).find('tbody tr').length;
		var perPapersNum=Math.ceil(numRows/numPaper);
		//=Math.ceil(numRows/numPaper);
		//var eachHeadNum=(numPaper)*(counts-1)+1;
		var $page=$('<ul class="pagination"></ul>');
		$('<li><a>首页</a></li>').appendTo($page);
		$('<li id="lp_qian"><a>&laquo;</a></li>').appendTo($page);
		for(var page=0;page<perPapersNum;page++){
			$('<li id="lp_p"><a id="fenYe"></a></li>').find('a').text(page+1).end()
			.bind('click',{newPage:page},function(event){
				currentPage=event.data['newPage'];
				pages=event.data['newPage'];
				//$('#temp a').text("当前是第："+(pages)+"页|每页"+numPaper+"条");
				pageUser();
			}).appendTo($page);
		}	
		
 		$('<li><a>&raquo;</a></li>').appendTo($page);
	 	$('<li><a>末页</a></li>').appendTo($page);
	 	$('<li id="temp"><a>当前页面</a></li>').appendTo($page);
   	 	//'#myFenye'
	 	$('#myFenye').html($page);
	});
}
//全选
function selectAll(){
	var obj=document.getElementsByName("checkAll");
	$("#checkAll").change(function(){
		if(obj[0].checked){
			var obj2=document.getElementsByName("checkStuPsy");
			for(var i=0;i<obj2.length;i++){
				obj2[i].checked=true;
			}
		}else{
			var obj2=document.getElementsByName("checkStuPsy");
			for(var i=0;i<obj2.length;i++){
				obj2[i].checked=false;
			}
		}
	});
}
//学工处查询跟踪的信息
function findFollowStuPsy(){
	var stuNum=$('#lp_PsystuID').val().trim();
	var stuName=$('#lp_stuPsyName').val().trim();
	var rtime=$('#birthDate').val().trim();
	var isFinish=$('#lp_StuPsyOption option:selected').text().trim();
	var levels=$('#lp_StuPsyLevel option:selected').text().trim();
	
	var imforHtml="";
	
	var levelsNum;
	var isFinishNum;
	
	if(isFinish=="已完结"){
		isFinishNum=2;
	}else if(isFinish=="正在跟踪"){
		isFinishNum=1;
	}
	
	if(levels=="一般关注"){
		levelsNum=2;
	}else if(levels=="重点关注"){
		levelsNum=3;
	}
	//alert(stuNum+"lp"+stuName+"lp"+rtime+"lp"+isFinishNum+"lp"+levelsNum);
	
	$.getJSON('StuInfo_findFollowStuPsy',{
		'hosttable.snum':stuNum,
		'hosttable.sname':stuName,
		'hosttable.rdate':rtime,
		'hosttable.levels':levelsNum,
		'hosttable.temp3':isFinishNum
	},function(data){
		if(data.findFollowStuPsy==""){
			alert("查无此数据！");
			return;
		}
		$.each(data.findFollowStuPsy,function(index,entry){
			if(entry.opInfo1!=""){
				imforHtml+="<tr><td>"+entry.snum+"</td>";
				imforHtml+="<td>"+entry.sname+"</td>";
				imforHtml+="<td>"+entry.aname+"</td>";
				imforHtml+="<td>"+entry.opInfo1+"</td>";
				imforHtml+="<td>"+entry.temp2+"</td>";
				if(entry.temp3==1){
					imforHtml+="<td>正在跟踪</td>";
				}else if(entry.temp3==2){
					imforHtml+="<td>已完结</td>";
				}else{
					imforHtml+="<td>未跟踪</td>";
				}
				if(entry.levels==2){
					imforHtml+="<td>一般关注</td>";
				}else if(entry.levels==3){
					imforHtml+="<td>重点关注</td>";
				}
				imforHtml+="<td>"+entry.rdate+"</td></tr>";
			}
		});
		$('#lp_stuPsyFinishInfo').html(imforHtml);
		simpleFenye("#stuPsyShows_table");
		$("#myFenye").css('display','block');
	    $("#lp_stuPsyShows").css("display","block");
	});
}


//查看跟踪信息
function lookFollowInfo(snum,sname){
	//alert(snum);
	$('#showfollowInfos').html("");
	displayNone();
	var snames=$(sname).text();
    $('#lp_followStuInfo').css("display", "block");
   
    var infor="";
    
    $.getJSON('StuInfo_showFollowInfos',{
       'hosttable.snum':snum
    },function(data){
    	if(data.showAllFollowInfo==""){
			alert("查无此数据！");
			return;
		}
    	$.each(data.showAllFollowInfo,function(index,entry){
    		infor+="<tr><td>"+entry.ddate+"</td>";
    		infor+="<td>"+entry.descript+"</td>";
    		infor+="<td>"+entry.aname+"</td></tr>";
    		//alert(infor);
    	});
    	$('#showfollowInfos').html(infor);
    	$('#lp_followTable').find('tr td').css('font-size','16px');
    });
    $('#lp_followStuInfo').find('h4').text(snames+" 同学的跟踪信息：");
}

//辅导员添加跟踪信息
function addDetailInfo(id,name){
	$("#lp_addDetalInfos").modal("show");
	var lp_setName=$(name).val();
	var htmls='<input type="text" class="lp_conmitName form-control" value="'+lp_setName+'" readonly="readonly" id="lp_getNames"><br>';
	 htmls+='<textarea class="form-control" id="lp_getDetalsInfo" rows="5" placeholder="在这填写跟踪信息..."></textarea></div>"';
	$('#lp_addDetailBody').html(htmls);
	var btn='<button type="button" class="btn btn-default" onclick="addFollowInfo('+id+')">确认添加</button>';
	$('#lp_addDetailBtn').html(btn);
}

function addFollowInfo(id){
	var content=$('#lp_getDetalsInfo').val();
	
	$.post("StuInfo_addFollowInfo",{
		'detailInfo.wid':id,
		'detailInfo.descript':content
	},function(data){
		if(data>=1){
			alert("添加成功！");
			$("#lp_addDetalInfos").modal("hide");
		}else{
			alert("添加失败！");
		}
	});
}

//跳转到学生心理查询
function findFollowStuPsys(){
	displayNone();
	$('#lp_stuPsyInfo').css('display','block');
}
//全部提交
function allStuPsyInfoTiJiao(){
//	var lp_confirmed = window.confirm("您将提交全部未提交的数据，您确定提交?"); 
//	if( $('#checkStuPsy :checked') ){
//		alert( $(this).next().val()    );
//	}else{
//		alert("dfdfdfdf");
//	}
	alert("禁止操作");
}






