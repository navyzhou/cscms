
var Cicies="";
var types = "";//FE:FedEx;IN:InTime;TN:TNT;AR:ARAMEX
var zmCictypes="";
function showAllCice(){
	$.getJSON('StuInfo_findFDCices?t='+new Date(),function(data){
		if(data!="null"){
			zmCictypes=data.cetypes;//初始化证书类型
			$.each(data.Cicies,function(index,entry){
				entry.term==1?entry.term='上学期':entry.term='下学期';
				$.each(data.cetypes,function(indexs,entrys){					
					if(entry.tid==entrys.tid){
						entry.tid=entrys.tname;
					}
				});
			});
			$.each(data.cetypes,function(index,entry){
				types+=entry.tid+":"+entry.tname+";";
			});
			types=types.substring(0,types.length-1);						
			Cicies=JSON.stringify(data.Cicies);
			Cicies=eval(Cicies);
			jQuery(function($) {
				var grid_selector = "#grid-table";
				var pager_selector = "#grid-pager";					
				jQuery(grid_selector).jqGrid({
					//direction: "rtl",

				data: Cicies,//显示的JSON数据
				datatype: "local",//显示的数据的类型 可以是JSON和XML
				height: 360,//框的宽度
				colNames:['编 号','学 号','获取时间','证书名称', '获得学期', '证书类型','考试分数'],//列名
				colModel:[
				          {name:'hid',index:'hid', width:60,align:'center',sorttype:"int", editable: true,editoptions:{readonly:true}},
				          {name:'snum',index:'snum', width:150,align:'center',editable: true,editoptions:{size:"20",maxlength:"30"},editrules:{required:true}},
				          {name:'times',index:'times',width:90,align:'center', editable:true, sorttype:"date",unformat: pickDate},
				          {name:'name',index:'name', width:150,align:'center',editable: true,editoptions:{size:"20",maxlength:"30"},editrules:{required:true}},
				          {name:'term',index:'term', width:70,align:'center', editable: true,edittype:"select",editoptions: {value:"1:上学期;2:下学期"}},
				          {name:'tid',index:'tid', width:90,align:'center', editable: true,edittype:"select",editoptions:{value:types}},
				          {name:'score',index:'score',align:'center', width:150, sortable:true,sorttype:"int",editable: true,editrules:{required:true,number:true,minValue:0,maxValue:1000} } 
				          ], 
		          gridview:true,//加速显示
		          viewrecords : true,//显示记录的条数
		          recordtext :"查看从{0} - {1}总共{2}条",//自定义显示的风格
		          rowNum:10,//第一次显示多少
		          rowList:[10,20,30,40],//每页显示的数组
		          pager : pager_selector,//对话框显示的div
		          altRows: true,//设置为交替行表格
		          //toppager: true,					          
		          multiselect: true,//是否显示多选的按钮
		          //multikey: "ctrlKey",
		          multiboxonly: false,//是否允许多选 如果是true不能多选.append('<button type="button" class="btn btn-warning">导出Excel</button>');			
		          loadComplete : function() {
		        	  var table = this;	
		        	  $(".ui-jqgrid-title").append('<button type="button" class="zmbtn btn-warning">Excel导出</button>');
		        	  setTimeout(function(){		        		  				
		        		  updateActionIcons(table);
		        		  updatePagerIcons(table);
		        		  enableTooltips(table);
		        	  }, 0);
		          },
		          //cellsubmit:'clientArray',
		          editurl: "StuInfo_showResult?Status=add",//添加,删除,增加的地址
		          caption: "学生证书管理",//改表的名称						
		          autowidth: true//是否自适应

				});

				//enable search/filter toolbar
				//jQuery(grid_selector).jqGrid('filterToolbar',{defaultSearch:true,stringResult:true})
				//enable datepicker
				function pickDate( cellvalue, options, cell ) {
					setTimeout(function(){
						$(cell) .find('input[type=text]')
						.datepicker({format:'yyyy-mm-dd' ,language:'zh-CN', autoclose:true}); 
					}, 0);
				}


				//navButtons   
				jQuery(grid_selector).jqGrid('navGrid',pager_selector,
						{ 	//navbar options
					edit: true,
					editicon : 'icon-pencil blue',
					edittitle :'编辑证书',
					add: true,
					addicon : 'icon-plus-sign purple',
					addtitle :'添加证书',
					del: true,
					delicon : 'icon-trash red',
					deltitle :'删除证书',
					search: true,
					searchicon : 'icon-search orange',
					searchtitle :'搜索证书',
					refresh: true,
					refreshicon : 'icon-refresh green',
					refreshtitle :'刷新',
					view: true,
					viewicon : 'icon-zoom-in grey',
					viewtitle :'查看证书信息',
					alertcap: '温馨提示',
					alerttext: '请至少选择一行!'
						},
						{
							//edit record form
							//closeAfterEdit: true,
							editCaption: "编辑证书信息",
							closeAfterEdit:true,
							bSubmit: "确 定",
							bCancel: "取 消",
							key:true,							
							url:"StuInfo_showResult?Status=update",
							recreateForm: true,
							beforeShowForm : function(e) {
								var form = $(e[0]);
								form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
								style_edit_form(form);
							},
							onclickSubmit :function(params,postdata) {//更新啊
								var selectedId = $(grid_selector).jqGrid("getGridParam", "selrow");  
								var cssprop = {color : "#FC9849"};	
								selectedId=parseInt(eval(selectedId));								
								var str = JSON.stringify(postdata);									
								$.post("StuInfo_updateCertificateInfo",{'certificateInfo':str},function(data){									
									if(data>0){										
										postdata.term==1?postdata.term='上学期':postdata.term='下学期';																			
										$.each(zmCictypes,function(index,entry){
											if(postdata.tid==entry.tid){
												postdata.tid=entry.tname;
												return false;
											}
										});										
										$(grid_selector).jqGrid('setRowData', selectedId, postdata, cssprop);
									}else{
										alert("修改失败");
										return;
									}
								});
								 
							}						
						},
						{
							//new record form
							addCaption: "添加证书信息",
							bSubmit: "添 加",
							bCancel: "取 消",
							processData: "请稍等...",
							url:"StuInfo_showResult?Status=add",
							closeAfterAdd: true,
							recreateForm: true,
							viewPagerButtons: false,
							beforeShowForm : function(e) {
								var form = $(e[0]);
								form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
								style_edit_form(form);
							},
							onclickSubmit :function(params,postdata) {//添加信息 
								//alert("添加"+JSON.stringify(postdata));	
								var str = JSON.stringify(postdata);									
								$.post("StuInfo_addCertificateInfo",{'certificateInfo':str},function(data){									
									if(data>0){										
										postdata.term==1?postdata.term='上学期':postdata.term='下学期';
										postdata.hid=parseInt(eval(data));
										postdata.id=parseInt(eval(data));
										$.each(zmCictypes,function(index,entry){
											if(postdata.tid==entry.tid){
												postdata.tid=entry.tname;
												return false;
											}
										});																																						
										$(grid_selector).jqGrid("addRowData","0", postdata, "first"); 
									}else{
										alert("添加失败");
										return;
									}
								});

							}

						},
						{
							//delete record form
							recreateForm: true,
							caption:"删除操作",
							top:'150',
							left:'550',							
							url:"StuInfo_showResult?Status=del",
							msg:'删除选择的证书信息吗?',
							bSubmit:"删除",
							bCancel:"取消",												
							beforeShowForm : function(e) {
								var form = $(e[0]);							
								if(form.data('styled')) return false;

								form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
								style_delete_form(form);

								form.data('styled', true);
							},	
							onclickSubmit :function(params,postdata) {//删除操作 								
								var ids=$(grid_selector).jqGrid("getGridParam","selarrrow");	
								var length=ids.length;
								if(length==1){										
									var rowid=$(grid_selector).jqGrid("getGridParam","selrow");
									 var hid = $(grid_selector).jqGrid("getRowData",rowid).hid;									 
									$.post("StuInfo_deleteGradesTbInfo?t="+new Date(),{'gradeshid':hid},function(data){
										if(data>0){
											$(grid_selector).jqGrid("delRowData", rowid);
										}else{
											alert("删除失败");
											return;
										}
										
									});									
								}else{
									var cids = "";
									for(var i=0;i<length;i++){
										cids+=$(grid_selector).jqGrid("getRowData",ids[i]).hid+',';
									}
									cids=cids.substring(0,cids.length - 1);									
									$.post("StuInfo_delteCcies?t="+new Date(),{'CciesIds':cids},function(data){
										if(data>0){
											for(var i=0;i<length;i++){									
												$(grid_selector).jqGrid("delRowData", ids[0]);
											}											
										}else{
											alert("删除失败");
											return;
										}
										
									});										
								}							
							}
						},
						{
							//表格搜索
							caption: "精确查找证书信息",
							Find: "查 找",					
							Reset: "重 置",
							odata: [{ oper:'eq', text:'等于'},{ oper:'ne', text:'不等于'},{ oper:'lt', text:'少于'},{ oper:'le', text:'少于等于'},{ oper:'gt', text:'大于'},{ oper:'ge', text:'大于或大于'},{ oper:'bw', text:'首字母开始'},{ oper:'bn', text:'不以什么开始'},{ oper:'in', text:'存在'},{ oper:'ni', text:'不存在'},{ oper:'ew', text:'以什么结束'},{ oper:'en', text:'不以什么结束'},{ oper:'cn', text:'包含'},{ oper:'nc', text:'不包含'}],
							groupOps: [	{ op: "AND", text: "所有" },	{ op: "OR",  text: "其中" }	],
							recreateForm: true,
							afterShowSearch: function(e){
								var form = $(e[0]);
								form.closest('.ui-jqdialog').find('.ui-jqdialog-title').wrap('<div class="widget-header" />')
								style_search_form(form);
							},
							afterRedraw: function(){
								style_search_filters($(this));
							}
							,
							multipleSearch: true,
							/**
											multipleGroup:true,
											showQuery: true
							 */
						},
						{
							//view record form
							recreateForm: true,
							caption:'查看证书信息',
							bClose:'关 闭',
							beforeShowForm: function(e){							
								var form = $(e[0]);									
								form.closest('.ui-jqdialog').find('.ui-jqdialog-title').wrap('<div class="widget-header" />');
								var buttons = form.next().find('.navButton a');
								buttons.find('.ui-icon').remove();
								buttons.eq(0).addClass('btn btn-success').append('<i class="icon-chevron-left"></i>');
								buttons.eq(1).addClass('btn btn-success').append('<i class="icon-chevron-right"></i>');
								buttons = form.next().find('.EditButton a');
								buttons.addClass('btn btn-info');
								
							}
						}					
				);				
				function style_edit_form(form) {
					//enable datepicker on "sdate" field and switches for "stock" field
					form.find('input[name=times]').datepicker({format:'yyyy-mm-dd' , autoclose:true});			
					//update buttons classes
					var buttons = form.next().find('.EditButton .fm-button');
					buttons.addClass('btn').find('[class*="-icon"]').remove();//ui-icon, s-icon
					buttons.eq(0).addClass('btn-success').prepend('<i class="icon-ok"></i>');
					buttons.eq(1).addClass('btn-danger').prepend('<i class="icon-cancle"></i>');

					buttons = form.next().find('.navButton a');
					buttons.find('.ui-icon').remove();
					buttons.eq(0).addClass('btn btn-success').append('<i class="icon-chevron-left"></i>');
					buttons.eq(1).addClass('btn btn-success').append('<i class="icon-chevron-right"></i>');	
				}

				function style_delete_form(form) {					
					var buttons = form.next().find('.EditButton .fm-button');
					buttons.addClass('btn btn-sm').find('[class*="-icon"]').remove();//ui-icon, s-icon
					buttons.eq(0).addClass('btn-danger').prepend('<i class="icon-trash"></i>');
					buttons.eq(1).addClass('btn-success').prepend('<i class="icon-cancle"></i>');
				}

				function style_search_filters(form) {					
					form.find('.columns>select').addClass('chselect');
					form.find('.selectopts').addClass('chselect');
					form.find('.input-elm').addClass('chinput');
					form.find('.delete-rule').addClass('btn btn-warning').val('X');
					form.find('.add-rule').addClass('btn btn-info ');
					form.find('.add-group').addClass('btn btn-success');
					form.find('.delete-group').addClass('btn btn-warning');
				}
				function style_search_form(form) {
					var dialog = form.closest('.ui-jqdialog');
					var buttons = dialog.find('.EditTable');
					buttons.find('.EditButton a[id*="_reset"]').addClass('btn btn-info').find('.ui-icon').attr('class', 'icon-retweet');
					buttons.find('.EditButton a[id*="_query"]').addClass('btn btn-warning').find('.ui-icon').attr('class', 'icon-comment-alt');
					buttons.find('.EditButton a[id*="_search"]').addClass('btn btn-success').find('.ui-icon').attr('class', 'icon-search');
					
				}

				function beforeDeleteCallback(e) {
					var form = $(e[0]);
					if(form.data('styled')) return false;

					form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />');
					style_delete_form(form);

					form.data('styled', true);
				}

				function beforeEditCallback(e) {
					var form = $(e[0]);						
					form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />');
					style_edit_form(form);
				}



				//it causes some flicker when reloading or navigating grid
				//it may be possible to have some custom formatter to do this as the grid is being created to prevent this
				//or go back to default browser checkbox styles for the grid

				//unlike navButtons icons, action icons in rows seem to be hard-coded
				//you can change them like this in here if you want
				function updateActionIcons(table) {
					/**
										var replacement = 
										{
											'ui-icon-pencil' : 'icon-pencil blue',
											'ui-icon-trash' : 'icon-trash red',
											'ui-icon-disk' : 'icon-ok green',
											'ui-icon-cancel' : 'icon-remove red'
										};
										$(table).find('.ui-pg-div span.ui-icon').each(function(){
											var icon = $(this);
											var $class = $.trim(icon.attr('class').replace('ui-icon', ''));
											if($class in replacement) icon.attr('class', 'ui-icon '+replacement[$class]);
										})
					 */
				}

				//replace icons with FontAwesome icons like above
				function updatePagerIcons(table) {
					var replacement = 
					{
							'ui-icon-seek-first' : 'icon-double-angle-left bigger-140',
							'ui-icon-seek-prev' : 'icon-angle-left bigger-140',
							'ui-icon-seek-next' : 'icon-angle-right bigger-140',
							'ui-icon-seek-end' : 'icon-double-angle-right bigger-140'
					};
					$('.ui-pg-table:not(.navtable) > tbody > tr > .ui-pg-button > .ui-icon').each(function(){
						var icon = $(this);
						var $class = $.trim(icon.attr('class').replace('ui-icon', ''));

						if($class in replacement) icon.attr('class', 'ui-icon '+replacement[$class]);
					});
				}

				function enableTooltips(table) {
					$('.navtable .ui-pg-button').tooltip({container:'body'});
					$(table).find('.ui-pg-div').tooltip({container:'body'});
				}
				//var selr = jQuery(grid_selector).jqGrid('getGridParam','selrow');												

			});			
		}else{
			alert("数据暂无!");
		}
	});	
}
