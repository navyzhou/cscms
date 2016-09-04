// JavaScript Document
$(document).ready(function() {
	//日期控制
	$('.form_date').datetimepicker({
		language:  'zh-CN',
		weekStart: 1,
		todayBtn:  1,
		autoclose: 1,
		todayHighlight: 1,
		startView: 2,
		minView: 2,
		pickerPosition: "right",
		forceParse: 0
		});
	//学生在校获得荣誉信息表yyyy
	$('#zmHounorDate,#zmHouserPdate,#zmPMdate,#zmImageDate,#lp_honor').datetimepicker({
		language:  'zh-CN',
		autoclose: 1,
		minView: 4,
		startView: 4
		});
	//英语考试时间yyyy-ddd 和 学生证书时间 和寝室通报
	$('#zmEglishDate,#zmCertificateDate').datetimepicker({
		language:  'zh-CN',
		autoclose: 1,
		minView: 4,
		startView: 3
		});	
	//鼠标放在列表上出现学生图片
	$('.tab_show').hide();
	//下面的实现在stuInfo.js中
	
});
	//关闭精确查询下拉菜单
function close(){
	$('.select_info').slideToggle();
}




