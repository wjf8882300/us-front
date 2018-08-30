define(["jquery", "Common", "Constant", "ligerui.ligerGrid"], function($, Common, Constant) {
	var grid = null;
	var uploading = false;
	var init = function() {
		grid =$("#maingrid4").ligerGrid({
			checkbox:false,
			columns:[
				{ display: '学号', name:'userNo'},
			     { display: '名称', name:'userName'},
			     { display: '班级', name:'className'},
			     { display: '所在支部', name:'teamName'},
			     { display: '辅导员', name:'teacher'},
			     { display: '附件',name:'attachementPath',
			    	 render:function(rowData){
			    		 return "<img  src='/"+rowData.attachementPath+"' width='30px' height='40px' >";
                     }
			     }
			],
			url:Constant.attachement.query,
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
			//双击某行触发函数
//			onDblClickRow : function (row, index, data){
//		         $.ligerDialog.alert('选择的是' + data.attachementPath);
//            }, 
			onCheckRow: Common.gridCheck.f_onCheckRow, 
			onCheckAllRow: Common.gridCheck.f_onCheckAllRow,
		})
	};

	$("#bntSearch").click(function()
	{
		grid.setParm("username", $("#username").val());
		grid.loadData(grid.url);
	});
	
	
	
	return {
		init:init
	};
	
});

