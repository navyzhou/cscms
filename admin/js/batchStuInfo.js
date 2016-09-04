// JavaScript Document
var process;   //操作  1代表导入  2代表修改
var tabletype;  //操作学生的什么信息
var maxFileSize = 100000000;  //上传文件的最大值    这里设定为100M
var percentComplete = 0;
var fileformat = "xls";   //文件上传的格式
var timeout = 2;  //倒计时关闭窗口
var myInterval; 
function guide(pro ,type) {
	process = pro;
	tabletype = type;
}
function progressFunction(evt) {
	if(evt.lengthComputable){
		percentComplete = Math.round(evt.loaded *100 / evt.total);
		$("#progress-bar").css("width",percentComplete+"%");
	}else{
		$("#jien-file").val("");
		$("#file-info").html("<div class='alert alert-danger' style='width:550px;'>文件上传失败！给您造成不便敬请谅解，请与系统管理员联系</div>");
	}
}
function JfontRoll(){
	if(timeout==0){
		$("#jien-close").click();
		clearInterval(myInterval);
		timeout = 3;
		$("#file-info").html("<div class='alert alert-info' style='width:550px;'>请选择文件！</div>");
		$("#progress-bar").css("width","0%");
	}else{
		$("#file-info").html("<div class='alert alert-success' style='width:550px;'>文件上传成功！系统正在进行处理（"+(timeout--)+"秒后关闭）</div>");
	}
}
$(document).ready(function() {
	$("#jien-file").change(function(){
		$("#file-info").html("<div class='alert alert-warning' style='width:550px;'>即将倒入的文件是："+$(this).val()+"</div>");
	});
	
	$("#jien-sure").click(function(){
		var tablefile = $("#jien-file").val();
		if(tablefile==""){
			$("#file-info").html("<div class='alert alert-warning' style='width:550px;'>未选择文件！</div>");
			return;
		}
		var tableformat = tablefile.substring(tablefile.lastIndexOf('.')+1,tablefile.length);
		
		if( tableformat==fileformat ){
			var fileObj = document.getElementById("jien-file").files[0]; // 获取文件
			//上传文件的大小
			var totalFileSize = fileObj.size;
			//上传文件的大小
			if(totalFileSize>maxFileSize){
				$("#jien-file").val("");
				$("#file-info").html("<div class='alert alert-danger' style='width:550px;'>上传文件过大，请不要超过10M！</div>");
			}
            var FileController = "BatchUpload_StuBatchUpload";                    // 接收上传文件的后台地址
            var form = new FormData();
            form.append("process", process); 
            form.append("tabletype", tabletype);                        // 后台操作对象
            form.append("uploadFile", fileObj);                           // 文件对象
            var xhr = new XMLHttpRequest();								 // XMLHttpRequest 对象
            xhr.open("post", FileController, true);
            xhr.onload = function (data) {
                if(data.target.responseText==0){
                	$("#progress-bar").css("width","100%");
	            	$("#jien-file").val("");
	            	$("#file-info").html("<div class='alert alert-warning' style='width:550px;'>数据错误，请检查后重新操作</div>");
                }else{
	            	$("#progress-bar").css("width","100%");
	            	$("#jien-file").val("");
	            	$("#file-info").html("<div class='alert alert-success' style='width:550px;'>文件上传成功！系统正在进行处理（3秒后关闭）</div>");
	            	myInterval = window.setInterval(JfontRoll,1000);
                }
            };
            
            xhr.upload.addEventListener("progress", progressFunction, false);
            xhr.send(form);
		}else{
			$("#jien-file").val("");
			$("#file-info").html("<div class='alert alert-danger' style='width:550px;'>文件格式错误，请上传后缀名为XLS格式的文件</div>");
		}
	});	
});

