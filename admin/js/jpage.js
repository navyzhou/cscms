//data 分页用数据
//showDivId  显示数据用的块   包含table 和 分页ul
//pageSize  每页显示的数据的条数
//showpageCount  在页面上需要显示几个分页效果
function JpageInit(data,showDivId,pageSize,showpageCount,pageBack){
	
	var jneedInfo = [];  //数据
	var jshowpageCount = 5;  //在页面上需要显示几个分页效果
	var jpageSize = 10;  //每页显示的条数
	var jshowDivId = showDivId;
	var jnumpage = 1;
	var jpageCount = 0;	//共有多少页
	var jpageNumhtml = "";  //生成当前页的分页效果
	var jpageDetailhtml = ""; //生成当前页的html数据
	var jpageNum;  //显示分页效果的对象
	var jpageDetail;  //显示数据的对象
	var jtdProperty = []; //对应数据的属性
	var jfun;
	var jtdDisplay = []; //需要隐藏的列
	var jtdCheckBox = -1;
	var jtdSelectCheckbox = [];
	
	
	jneedInfo = data;
	jpageSize = pageSize;
	jpageCount =jneedInfo.length%jpageSize==0?parseInt(jneedInfo.length/jpageSize):parseInt(jneedInfo.length/jpageSize)+1;
	var jtdDisplayindex = 0; //索引
	var table = $("#"+showDivId).find("table");
	var tablethead = $(table).find("thead");
	var tabletheadtd = $(tablethead).find("td"); //用来求长度
	for( var i=0; i<tabletheadtd.length;i++ ){
		var tabletemp = $(tablethead).find("td:eq("+i+")");
		jtdProperty[i] = tabletemp.attr("dataProperty"); //数据初始化
		if( tabletemp.attr("dtaDisplay")=="none" ){
			jtdDisplay[jtdDisplayindex++] = i;  //表示第i列隐藏
		}
		if( tabletemp.attr("dataCheckBox")=="true" ){
			jtdCheckBox = i;
		}
	}
	jpageDetail = $(table).find("tbody");
	jpageNum = $("#"+showDivId).find("ul");
	jshowpageCount = showpageCount;
	jfun = pageBack;
	jshowPageData(jnumpage);
	
	function jshowPageData(pageNum) {
		if(pageNum<1 || pageNum>jpageCount){$("#jpageinput").val("");return;}
		jnumpage = pageNum;
		jtdSelectCheckbox =[];  //先重置选择项
		var center_page = parseInt(jshowpageCount / 2); // 往前推多少页  使当前页的按钮始终显示在中间
		var show_page = "";
		if(jpageCount<=jshowpageCount){
			for( var i=1;i<=jpageCount;i++){
				show_page +="<li><a href='javascript:void(0)'>"+ i + "</a></li>";
			}
		}else if(pageNum<=center_page && jpageCount>jshowpageCount){
			for( var i=1;i<=jshowpageCount;i++){
				show_page +="<li><a href='javascript:void(0)'>"+ i + "</a></li>";
			}
		}else if(pageNum>center_page && (jpageCount-pageNum)>center_page ){
			if(jshowpageCount%2==0){
				for(var i=pageNum-center_page+1;i<=pageNum+center_page;i++ ){
					show_page +="<li><a href='void(0)'>"+ i + "</a></li>";
				}
			}else{
				for(var i=pageNum-center_page;i<=pageNum+center_page;i++ ){
					show_page +="<li><a href='javascript:void(0)'>"+ i + "</a></li>";
				}
			}
		}else if(pageNum>center_page && (jpageCount-pageNum)<=center_page){
			for(var i=jpageCount-jshowpageCount+1;i<=jpageCount; i++ ){
				show_page +="<li><a href='javascript:void(0)'>"+ i + "</a></li>";
			}
		}
		jpageNumhtml = "<li><a href='javascript:void(0)'>共" + jpageCount+ "页</a></li>"
				+ "<li><a href='javascript:void(0)'>首页</a></li>"
				+ "<li><a href='javascript:void(0)'>&laquo;</a></li>"+show_page
				+"<li><a href='javascript:void(0)'>&raquo;</a></li>"
				+ "<li><a href='javascript:void(0)'>末页</a></li>"
				+ "<li><a href='javascript:void(0)'>当前第"+ pageNum
				+ "页|每页<input type='text' value="+jpageSize+" class='jpageinput' />条</a></li>"
				+ "<li><a href='javascript:void(0)'><input type='text' value='' id='jpageinput' class='jpageinput'/></a></li>"
				+ "<li><a href='javascript:void(0)'>跳页</a></li>";
		$(jpageNum).html(jpageNumhtml);
		$(jpageNum).find("input:eq(1)").keyup(function(event){  //跳页输入框
			var skip_page = $.trim($(this).val());
			if(!parseInt(skip_page)){
				$(this).val("");
			}
		});
		$(jpageNum).find("input:eq(0)").keyup(function(event){ //重设页数框
			var _pageSize = $.trim($(this).val());
			if(!parseInt(_pageSize)){
				$(this).val("");
			}else{
				$(this).val(parseInt(_pageSize));
			}
		});
		$(jpageNum).find("input:eq(0)").blur(function(event){
			var _pageSize = $.trim($(this).val());
			if(_pageSize==""){
				$(this).val( jpageSize );
				return;
			}
			_pageSize = parseInt(_pageSize);
			if( _pageSize==jpageSize ){
				return;
			}
			jpageSize = _pageSize;
			jpageCount =jneedInfo.length%jpageSize==0?parseInt(jneedInfo.length/jpageSize):parseInt(jneedInfo.length/jpageSize)+1;
			jshowPageData(1); //只能跳到第一页
		});
		$(jpageNum).find("li").click(function(){
			if(parseInt($.trim($(this).text())))
				jshowPageData(parseInt($.trim($(this).text())));
			if($.trim($(this).text())=="首页")
				jshowPageData(1);
			if($.trim($(this).text())=="«")
				jshowPageData(pageNum-jshowpageCount);
			if($.trim($(this).text())=="»")
				jshowPageData(pageNum+jshowpageCount);
			if($.trim($(this).text())=="末页")
				jshowPageData(jpageCount);
			if($.trim($(this).text())=="跳页"){
				var skip_page = parseInt($.trim($(jpageNum).find("input:eq(1)").val()));
				if(skip_page){
					jshowPageData(skip_page);
				}
			}
		});
		//显示这一页的数据
		var after_detail = (pageNum-1)*jpageSize;
		var before_detail = (jpageCount-pageNum)>0?after_detail+jpageSize:jneedInfo.length;
		jpageDetailhtml = "";
		for(var i=after_detail;i<before_detail;i++){
			var obj = jneedInfo[i];
			jpageDetailhtml += "<tr>";
			for( var j=0;j<jtdProperty.length;j++ ){
				jpageDetailhtml += "<td";
				var _jpageTemp = true;
				
				for( var _k=0;_k<jtdDisplay.length;_k++ ){
					if( jtdDisplay[_k]==j ){
						jpageDetailhtml += " style='display:none;'>";
						_jpageTemp = false;
						break;
					}
				}
				
				if( _jpageTemp ){
					jpageDetailhtml +=">";
				}
				
				if(jtdCheckBox==j){
					jpageDetailhtml += "<input type='checkbox' name='_jcheckbox"+jshowDivId+"' /></td>"; 
				}else{
					jpageDetailhtml += obj.getAttr( jtdProperty[j] )+"</td>";
				}
			}
			jpageDetailhtml += "</tr>";
		}
		$(jpageDetail).html(jpageDetailhtml);
		
		if( jtdCheckBox!=-1 ){   //也就是说有checkBox
			var _jtdCountCheckBox = tablethead.find("td:eq("+jtdCheckBox+")");
			_jtdCountCheckBox.html("<input type='checkbox' />");
			var _jtdCountCheckBoxInput = _jtdCountCheckBox.find("input");
			_jtdCountCheckBoxInput.prop("checked",false);
			var _tdinputCheck = $("input[name='_jcheckbox"+jshowDivId+"']");
			
			_tdinputCheck.click(function(){
				jtdSelectCheckbox =[];  //先重置选择项
				var _jindex = 0;
				for(var i=0;i<_tdinputCheck.length;i++  ){
					if(_tdinputCheck.eq(i).prop("checked")){//表示这一列选择
						jtdSelectCheckbox[_jindex++] = i;
					}
				}
				if( _jindex==0 ){
					_jtdCountCheckBoxInput.prop("checked",false);
				}
				if( _jindex==_tdinputCheck.length ){
					_jtdCountCheckBoxInput.prop("checked",true);
				}
			});
			
			_jtdCountCheckBoxInput.click(function(){
				_tdinputCheck.prop("checked",_jtdCountCheckBoxInput.prop("checked"));
				if( _jtdCountCheckBoxInput.prop("checked")  ){
					for( var i=0; i<_tdinputCheck.length;i++ ){
						jtdSelectCheckbox[i] = i;  //表示每一列都选了
					}
				}else{
					jtdSelectCheckbox =[];  //先重置选择项
				}
			});
		}
		
		if( jfun!=null ){
			//下面就是回调函数了
			jfun.fun();
		}
	}
	
	this.getSelectCheckbox = function(){ //获取选中的行
		return jtdSelectCheckbox;
	}
	
	this.addSingData = function( singData ){  //添加单个数据
		jneedInfo[ jneedInfo.length ] = singData;
		jpageCount =jneedInfo.length%jpageSize==0?parseInt(jneedInfo.length/jpageSize):parseInt(jneedInfo.length/jpageSize)+1;
		jshowPageData(jnumpage); //显示当前页
	}
	this.changeData = function( data ){  //改变数据
		jneedInfo = data;
		jpageCount =jneedInfo.length%jpageSize==0?parseInt(jneedInfo.length/jpageSize):parseInt(jneedInfo.length/jpageSize)+1;
		jshowPageData(1); //显示第一页
	}
}
