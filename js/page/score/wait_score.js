define(["jquery", "Common", "Constant", "ligerui.ligerGrid", "bootstrap.min"], function($, Common, Constant) {
	
	var stuGrid = null;
	var ledGrid = null;
	var teaGrid = null;
	var grid = null;
	var init = function() {
		/**
		 * 记载列表
		 */
		stuGrid = $("#maingrid1").ligerGrid({
	        checkbox: false,
	        columns: [
	        	{ display: '姓名', name: 'userName', minWidth:150},
		        { display: '班级', name: 'className', minWidth:150},
		        { display: '学号/工号', name: 'userNo', minWidth:150}, 
		        { display: '所在支部', name: 'teamName', minWidth:150},
		        { display: '支部书记', name: 'teamLeader', minWidth:150},
				{ display: '辅导员', name: 'teacher', minWidth:150}        
	        ], 
	        url:Constant.waitScore.queryWaitStudent,
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
	        autoCheckChildren:false
	    });
		
		ledGrid = $("#maingrid2").ligerGrid({
	        checkbox: false,
	        columns: [
		        { display: '支部', name: 'teamName', minWidth:200},
		        { display: '支部书记', name: 'teamLeader', minWidth:200},
	        	{ display: '姓名', name: 'userName', minWidth:200},
		        { display: '班级', name: 'className', minWidth:150},
		        { display: '学号/工号', name: 'userNo', minWidth:200}, 
				{ display: '辅导员', name: 'teacher', minWidth:150} 
	        ], 
	        url:Constant.waitScore.queryWaitLeader,
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
	        autoCheckChildren:false
	    });
		
		teaGrid = $("#maingrid3").ligerGrid({
	        checkbox: false,
	        columns: [
	        	{ display: '辅导员', name: 'teacher', minWidth:200} ,
	        	{ display: '姓名', name: 'userName', minWidth:200},
		        { display: '班级', name: 'className', minWidth:150},
		        { display: '学号/工号', name: 'userNo', minWidth:200}, 
		        { display: '支部', name: 'teamName', minWidth:200},
		        { display: '支部书记', name: 'teamLeader', minWidth:150}
	        ], 
	        url:Constant.waitScore.queryWaitTeacher,
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
	        autoCheckChildren:false
	    });
		
		grid = stuGrid;
		
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
	

	$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
        var activeTab = $(e.target).attr("href");
        if(activeTab == "#student") {
        	grid = stuGrid;
        } else if(activeTab == "#leader") {
        	grid = ledGrid;
        } else if(activeTab == "#teacher") {
        	grid = teaGrid;
        }
        
        grid.loadData(stuGrid.url);
    });
	
	$("#bntSearch").click(function(){		
		grid.setParm("userName", $("#username").val());
		grid.setParm("userNo", $("#userno").val());
		grid.setParm("teamName", $("#teamname").val());
		grid.setParm("className", $("#classname").val());
		grid.loadData(stuGrid.url);
	});
	
	$("#bntClear").click(function() {
		$("#username").val("");
		$("#userno").val("");
		$("#teamname").val("");
		$("#classname").val("");
	});

	return {
		init:init
	};
});




		