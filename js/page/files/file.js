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
//			    		 return "<img  src='/"+rowData.attachementPath+"' width='30px' height='40px' />";
			    		 return "<img id='"+rowData.id+"'  src='/"+rowData.attachementPath+"' hint='双击行可以预览' width='30px' height='40px' onclick='getImgNaturalDimensions(this, f_open)' />";
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
			onDblClickRow : function (data, rowindex, rowobj){
				getImgNaturalDimensions(document.getElementById(data.id), f_open);
            }, 
//			onCheckRow: Common.gridCheck.f_onCheckRow, 
//			onCheckAllRow: Common.gridCheck.f_onCheckAllRow,
		});
	};

	$("#bntSearch").click(function()
	{
		grid.setParm("username", $("#username").val());
		grid.loadData(grid.url);
	});

	getImgNaturalDimensions = function(oImg, callback) {
		var nWidth, nHeight;
		if (!oImg.naturalWidth) { // 现代浏览器
			nWidth = oImg.naturalWidth;
			nHeight = oImg.naturalHeight;
			callback({
				w : nWidth,
				h : nHeight,
				url: oImg.src
			});
		} else { // IE6/7/8
			var nImg = new Image();

			nImg.onload = function() {
				var nWidth = nImg.width, nHeight = nImg.height;
				callback({
					w : nWidth,
					h : nHeight,
					url: oImg.src
				});
			}
			nImg.src = oImg.src;
		}
	}
	
	f_open = function(img) {
		
		$.ligerDialog.open({
            height:img.h,
            width: img.w,
            title : '预览',
            url: 'detail.html', 
            showMax: false,
            showToggle: true,
            showMin: false,
            isResize: true,
            slide: false,
            data: {
                url: img.url
            }
        });
	}
	
	return {
		init:init
	};
	
});

