define(["jquery", "Common", "Constant", "ligerui.ligerGrid"], function($, Common, Constant) {
	
	var grid = null;
	var init = function() {
		/**
		 * 记载列表
		 */
		grid = $("#maingrid4").ligerGrid({
	        checkbox: true,
	        columns: [
	        { display: '姓名', name: 'userName'},
	        { display: '班级', name: 'className'},
	        { display: '学号/工号', name: 'userNo'}, 
	        { display: '所在支部', name: 'teamName' },
			{ display: '支部书记', name: 'teamLeader'},
			{ display: '辅导员', name: 'teacher'}
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
	};
	
	$("#bntAdd").click(function()
	{
	    $.ligerDialog.open({
	        height:398,
	        width: 700,
	        title : '新增用户',
	        url: Constant.user.detail, 
	        showMax: false,
	        showToggle: true,
	        showMin: false,
	        isResize: true,
	        slide: false,
	        data: {
	        	name: "add"
	        }
	    });
	}); 

	$("#bntUpdate").click(function()
	{
		if(Common.gridCheck.checkedCustomer.length == 0) {
			Common.warnMsg("编辑时必须至少选中一行");
			return;
		}
		else if(Common.gridCheck.checkedCustomer.length > 1) {
			Common.warnMsg("编辑时不能选中多行");
			return;
		}
		
	    $.ligerDialog.open({
	        height:398,
	        width: 700,
	        title : '编辑用户',
	        url: Constant.user.detail, 
	        showMax: false,
	        showToggle: true,
	        showMin: false,
	        isResize: true,
	        slide: false,
	        data: {
	            name: "update",
	            id:Common.gridCheck.checkedCustomer[0]
	        }
	    });
	    
	}); 
				

	$("#bntDelete").click(function()
	{
		if(Common.gridCheck.checkedCustomer.length == 0) {
			Common.warnMsg("删除时必须至少选中一行");
			return;
		}
		
		Common.showMsg("confirm", "您确定删除选中的数据?", function(yes) {
			if(yes) { 
				var delList = [];
				$.each(Common.gridCheck.checkedCustomer, function(i, item)
	            {
					delList.push({id:item});
	            });
				Common.saveData(Constant.user.del, {delList:delList}, function(data){
					Common.successMsg("删除成功");
					Common.gridCheck.checkedCustomer.splice(0, Common.gridCheck.checkedCustomer.length);
					$("#maingrid4").ligerGrid("reload");
				});
			}
		});
	});

	$("#bntSearch").click(function()
	{
		grid.setParm("loginName", $("#username").val());
		grid.loadData(grid.url);
	});

	return {
		init:init
	};
});




		