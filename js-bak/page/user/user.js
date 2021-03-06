define(["jquery", "Common", "Constant", "ligerui.ligerGrid"], function($, Common, Constant) {
	
	var grid = null;
	var uploading = false;
	var init = function() {
		/**
		 * 记载列表
		 */
		grid = $("#maingrid4").ligerGrid({
	        checkbox: true,
	        columns: [
	        { display: '类型', name: 'userType'},	
	        { display: '姓名', name: 'userName'},
	        { display: '班级', name: 'className'},
	        { display: '学号/工号', name: 'userNo'}, 
	        { display: '所在支部', name: 'teamName' },
			{ display: '支部书记', name: 'teamLeader'},
			{ display: '辅导员', name: 'teacher'},
			{ display: '上传时间', name: 'createDate'}
			
	        ], 
	        url:Constant.user.queryAll,
	        parms:null,
	        contentType:"application/json",
	        root:"rows",
	        record:"total",
	        rownumbers:false,
	        pageParmName:"start",
	        pagesizeParmName:"length",
	        page:0,
	        pageSize:10,
	        width: '100%',
	        height:'97%',
	        onSuccess:function(data, grid) {
				console.log(data);
				if(data.code == 200) {
					if(data.hasOwnProperty("data")){
						data = {Rows:data.data.list, Total:data.data.total}; 
					}  
				}
	        	Common.gridCheck.checkedCustomer = [];
	        },
			onCheckRow: Common.gridCheck.f_onCheckRow, 
			onCheckAllRow: Common.gridCheck.f_onCheckAllRow
	    });
		
		$.ajax({
	        url: Constant.user.queryTeam,
	        type: 'POST',
	        contentType:'application/json',
	        cache: false,
	        data: {},
	        processData: false,
	        dataType:"json",
	        success : function(data) {
	            if (data.code == 200) {
	            	var result = data.data;
	            	$("#teamname").html("");
				 	$("#teamname").append($("<option value=\"\">全部</option>"));
				 	for(var i = 0; i < result.length; i++){
						$("#teamname").append($("<option value=\""+result[i].teamName+"\">"+result[i].teamName+"</option>"));
					}
	            } else {
	            	Common.warnMsg(data.message);
	            }	            
	        }
	    });
		
		$.ajax({
	        url: Constant.user.queryClass,
	        type: 'POST',
	        contentType:'application/json',
	        cache: false,
	        data: {},
	        processData: false,
	        dataType:"json",
	        success : function(data) {
	            if (data.code == 200) {
	            	var result = data.data;
	            	$("#classname").html("");
				 	$("#classname").append($("<option value=\"\">全部</option>"));
				 	for(var i = 0; i < result.length; i++){
						$("#classname").append($("<option value=\""+result[i].className+"\">"+result[i].className+"</option>"));
					}
	            } else {
	            	Common.warnMsg(data.message);
	            }	            
	        }
	    });
	};
	
	$("#ctn-input-file").on("change", function(){
		if(uploading){
			Common.warnMsg("文件正在上传中，请稍后");
	        return false;
	    }
	    $.ajax({
	        url: Constant.user.uploadExcel,
	        type: 'POST',
	        cache: false,
	        data: new FormData($('#uploadForm')[0]),
	        processData: false,
	        contentType: false,
	        dataType:"json",
	        beforeSend: function(){
	            uploading = true;
	            $.ligerDialog.waitting("文件正在上传中，请稍后");
	        },
	        success : function(data) {
	        	$.ligerDialog.closeWaitting();
	            if (data.code == 200) {
	            	Common.successMsg("上传成功");
	            	this.value = '';
	            	$("#maingrid4").ligerGrid("reload");
	            } else {
	            	Common.warnMsg(data.message);
	            }
	            uploading = false;
	            
	        }
	    });
	});

	$("#bntSearch").click(function()
	{
		grid.setParm("userType", $("#userType").val());
		grid.setParm("userName", $("#username").val());
		grid.setParm("userNo", $("#userno").val());
		grid.setParm("teamName", $("#teamname").val());
		grid.setParm("className", $("#classname").val());
		grid.loadData(grid.url);
	});
	
	$("#bntClear").click(function() {
		$("#userType").val("");
		$("#username").val("");
		$("#userno").val("");
		$("#teamname").val("");
		$("#classname").val("");
	});
	

	return {
		init:init
	};
});




		