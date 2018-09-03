define(["jquery", "Common", "Constant", "ligerui.ligerGrid"], function($, Common, Constant) {
	var grid = null;
	var uploading = false;
	var init = function() {
		grid =$("#maingrid4").ligerGrid({
			checkbox:true,
			columns:[
			     { display: '题目名称', name:'questionContent',width:500},
			     { display: '分值', name:'questionScore',width:150},
			     { display: '说明',name:'questionDesc',width:250},
			     { display: '创建时间',name:'createDate',width:200}
			],
			url:Constant.question.queryAll,
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
			onSuccess:function(data,grid){
				Common.gridCheck.checkedCustomer = [];
			},
			onCheckRow: Common.gridCheck.f_onCheckRow, 
			onCheckAllRow: Common.gridCheck.f_onCheckAllRow,
		})
	};
	
	var uploadExcel = function(type) {
		
		if(uploading){
			Common.warnMsg("文件正在上传中，请稍后");
	        return false;
	    }
		
		var formData = new FormData();
		formData.append('file', $('#ctn-input-file-0' + type)[0].files[0]);
		
	    $.ajax({
	        url: Constant.question.uploadExcel + "/" + type,
	        type: 'POST',
	        cache: false,
	        data: formData,
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
	};
	
	$("#ctn-input-file-00").on("change", function(){
		uploadExcel(0);
	});
	$("#ctn-input-file-01").on("change", function(){
		console.log($('#ctn-input-file-01'));
		uploadExcel(1);
	});
	$("#ctn-input-file-02").on("change", function(){
		console.log($('#ctn-input-file-02'));
		uploadExcel(2);
	});


	$("#bntSearch").click(function()
	{
		grid.setParm("questionGroup", $("#questionGroup").val());
		grid.setParm("keys", $("#keys").val());
		grid.loadData(grid.url);
	});

	return {
		init:init
	};
	
 
});

