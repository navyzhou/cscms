/*HTML5 多文件上传加预览*/
//文件常量
var zmiBytesUploaded = 0;
var zmiBytesTotal = 0;
var zmiPreviousBytesLoaded = 0;
var zmiMaxFilesize = 1; // 1MB
var zmoTimer = 0;
var zmsResultFileSize = '';
var zmImages = "";


function secondsToTime(secs) { // 时间格式转换
	var hr = Math.floor(secs / 3600);
	var min = Math.floor((secs - (hr * 3600))/60);
	var sec = Math.floor(secs - (hr * 3600) -  (min * 60));

	if (hr < 10) {hr = "0" + hr; }
	if (min < 10) {min = "0" + min;}
	if (sec < 10) {sec = "0" + sec;}
	if (hr) {hr = "00";}
	return hr + ':' + min + ':' + sec;
};

function bytesToSize(bytes) {//字节转换
	var sizes = ['Bytes', 'KB', 'MB'];
	if (bytes == 0) return 'n/a';
	var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
	return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
};

$(function(){
	document.getElementById('zmuploadSubmit').disabled=true;
	$("#inputBatchImgaes").change(function(){
		var oReader ="";//读取文件
		document.getElementById('zmuploadsucces').style.display = 'none';
		$("#zmuploadsucces").slideUp("slow");
		document.getElementById('zmuploadspeed').innerHTML = '';
		document.getElementById('zmcompletepercent').innerHTML = '';
		document.getElementById('zmprogress-bar').style.width = '0%';
		document.getElementById('zmuploadsize').innerHTML = '';
		document.getElementById('zmuploadtime').innerHTML = '时间:00:00:00';
		zmImages= document.getElementById('inputBatchImgaes').files;//文件列表
		var rFilter = /^(image\/bmp|image\/gif|image\/jpeg|image\/png|image\/tiff)$/i;//文件上传的格式限制
		var countimageSiz = 0;//总文件大小
		$("#zmimglists").html("");
		var pre = document.getElementById('zmimglists');//图片预览
		if(typeof FileReader=='undefined'){//如果不支持这个对象 不执行这个操作  
			zmImages.setAttribute('disabled','disabled');
			alert("你的浏览器不支持!");
			return;
		}else{
			for(var i=0,imagefile;imagefile=zmImages[i];i++){
				countimageSiz+=imagefile.size;//累加所有的图片大小 因为zmImages是个ListFile 没有size的属性
				if (! rFilter.test(imagefile.type)) {
					alert("文件类型错误"+imagefile.name);
					break;
				}else{
					oReader = new FileReader();
					oReader.onload=(function(file){
						return function(e){
							document.getElementById('zmuploadSubmit').disabled=false;
							var span =document.createElement('span');	
							span.innerHTML='<img src="'+this.result+'" alt="'+file.name+'" title="'+file.name+'" class="img-thumbnail"/>';
							pre.insertBefore(span,null);
						};
					})(imagefile);					
					oReader.onprogress=function(e){	//文件读取进行中
					};
					oReader.onabort=function(e){
						
					};
					oReader.onerror=function(e){
					};
					oReader.onloadstart=function(e){
						
					};
					oReader.onloadend=function(e){
						
					};
					oReader.readAsDataURL(imagefile);
				}
			}
			zmsResultFileSize = bytesToSize(countimageSiz);
		}
	});
	//图片批量上传
	$("#zmuploadSubmit").click(function(){	
		// 清除所有的效果
		zmiPreviousBytesLoaded = 0;			
		$("#addImageNav").slideDown("fast");
		document.getElementById('zmcompletepercent').innerHTML = '';
		var oProgress = document.getElementById('zmprogress-bar');
		oProgress.style.display = 'block';
		oProgress.style.width = '0px';		
		var zmvFD = new FormData(document.getElementById('zmImageForm')); 
		var zmoXHR = new XMLHttpRequest();
		zmoXHR.upload.addEventListener('progress', zmuploadProgress, false);
		zmoXHR.addEventListener('load', zmuploadFinish, false);
		zmoXHR.addEventListener('error', zmuploadError, false);
		zmoXHR.addEventListener('abort', zmuploadAbort, false);
		zmoXHR.open('POST', 'ImageBatch_ImageBatchUpload');
		zmoXHR.send(zmvFD);
		zmoTimer = setInterval(doInnerUpdates, 300);
	});
});

function doInnerUpdates() { // 上传速度更新
	var iCB = zmiBytesUploaded;
	var iDiff = iCB - zmiPreviousBytesLoaded;
	// 如果没有上传的文件则退出
	if (iDiff == 0){
		return;
	}
	zmiPreviousBytesLoaded = iCB;
	iDiff = iDiff * 2;
	var iBytesRem = zmiBytesTotal - zmiPreviousBytesLoaded;
	var secondsRemaining = iBytesRem / iDiff;
	var iSpeed = iDiff.toString() + 'B/s';
	if (iDiff > 1024 * 1024) {
		iSpeed = (Math.round(iDiff * 100/(1024*1024))/100).toString() + 'MB/s';
	} else if (iDiff > 1024) {
		iSpeed =  (Math.round(iDiff * 100/1024)/100).toString() + 'KB/s';
	}		
	document.getElementById('zmuploadspeed').innerHTML = iSpeed;
	document.getElementById('zmuploadtime').innerHTML = '时间:' + secondsToTime(secondsRemaining);
}

function zmuploadProgress(e) { // 上传进行中
	if (e.lengthComputable) {//上传的文件有长度
		zmiBytesUploaded = e.loaded;
		zmiBytesTotal = e.total;
		var iPercentComplete = Math.round(e.loaded * 100 / e.total);
		var iBytesTransfered = bytesToSize(zmiBytesUploaded);

		document.getElementById('zmcompletepercent').innerHTML = iPercentComplete.toString() + '%';
		document.getElementById('zmprogress-bar').style.width = (iPercentComplete * 4).toString() + '%';
		document.getElementById('zmuploadsize').innerHTML = iBytesTransfered;
		if (iPercentComplete == 100) {
			alert("上传成功");
		}
	} else {
		alert("上传有问题");
	}
}

function zmuploadFinish(e) { // 上传完成
	document.getElementById('zmuploadSubmit').disabled=true;
	var oUploadResponse = document.getElementById('zmuploadsucces');
	oUploadResponse.innerHTML = e.target.responseText;
	$("#addImageNav").slideUp("fast");
	$("#zmimglists").html("");
	$("#zmuploadsucces").slideDown("slow");
	document.getElementById('zmcompletepercent').innerHTML = '100%';
	document.getElementById('zmprogress-bar').style.width = '100%';
	document.getElementById('zmuploadsize').innerHTML = zmsResultFileSize;
	document.getElementById('zmuploadtime').innerHTML = '时间:00:00:00';
	clearInterval(zmoTimer);
}

function zmuploadError(e) { // 上传错误
	alert("上传错误");
	clearInterval(zmoTimer);
}  

function zmuploadAbort(e) { // 上传中断
	alert("上传中断");
	clearInterval(zmoTimer);
}