define(["jquery", "Common", "Constant", "ligerui.ligerGrid", "bootstrap.min"], function($, Common, Constant) {
	
	var stuGrid = null;
	var ledGrid = null;
	var teaGrid = null;
	var init = function() {
		/**
		 * 记载列表
		 */
		stuGrid = $("#maingrid1").ligerGrid({
	        checkbox: true,
	        columns: [
	        	{ display: '姓名', name: 'userName', minWidth:150},
		        { display: '班级', name: 'className', minWidth:150},
		        { display: '学号/工号', name: 'userNo', minWidth:150}, 
		        { display: '所在支部', name: 'teamName', minWidth:150},
				{ display: '成绩', name: 'answer', minWidth:150}        
	        ], 
	        url:Constant.score.queryAllStudent,
	        parms:{"userType":"0"},
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
	        	Common.gridCheck.checkedCustomer = [];
	        },
			onCheckAllRow: Common.gridCheck.f_onCheckAllRow,
	        onCheckRow: Common.gridCheck.f_onCheckRow,
	        autoCheckChildren:false
	    });
		
		ledGrid = $("#maingrid2").ligerGrid({
	        checkbox: true,
	        columns: [
	        	{ display: '姓名', name: 'userName', minWidth:150},
		        { display: '班级', name: 'className', minWidth:150},
		        { display: '学号/工号', name: 'userNo', minWidth:150}, 
		        { display: '所在支部', name: 'teamName', minWidth:150},
				{ display: '成绩', name: 'score', minWidth:150} 
	        ], 
	        url:Constant.score.queryAllLeader,
	        parms:{"userType":"1"},
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
	        	Common.gridCheck.checkedCustomer = [];
	        },
			onCheckAllRow: Common.gridCheck.f_onCheckAllRow,
	        onCheckRow: Common.gridCheck.f_onCheckRow,
	        autoCheckChildren:false
	    });
		
		teaGrid = $("#maingrid3").ligerGrid({
	        checkbox: true,
	        columns: [
	        	{ display: '姓名', name: 'userName', minWidth:150},
		        { display: '班级', name: 'className', minWidth:150},
		        { display: '学号/工号', name: 'userNo', minWidth:150}, 
		        { display: '所在支部', name: 'teamName', minWidth:150},
				{ display: '成绩', name: 'score', minWidth:150}  
	        ], 
	        url:Constant.score.queryAllTeacher,
	        parms:{"userType":"2"},
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
	        	Common.gridCheck.checkedCustomer = [];
	        },
			onCheckAllRow: Common.gridCheck.f_onCheckAllRow,
	        onCheckRow: Common.gridCheck.f_onCheckRow,
	        autoCheckChildren:false
	    });
	};
	
	$("#bntExportStudent").click(function()
	{
		$("#searchForm").attr("action", Constant.score.exportAllStudent);
	    $("#searchForm").submit();
	}); 
	
	$("#bntExportLeader").click(function()
	{
		$("#searchForm").attr("action", Constant.score.exportAllLeader);
	    $("#searchForm").submit();
	}); 
	
	$("#bntExportTeacher").click(function()
	{
		$("#searchForm").attr("action", Constant.score.exportAllTeacher);
	    $("#searchForm").submit();
	}); 

	$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        var activeTab = $(e.target).attr("href");
        if(activeTab == "#student") {
        	stuGrid.loadData(stuGrid.url);
        } else if(activeTab == "#leader") {
        	ledGrid.loadData(ledGrid.url);
        } else if(activeTab == "#teacher") {
        	teaGrid.loadData(teaGrid.url);
        }
    });

	return {
		init:init
	};
});




		