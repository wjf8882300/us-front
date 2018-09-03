
/**
 * 常量
 */
define(function() {
	return {
		
		/**
		 * 公用
		 */
		constants: {
			
		},
		
		/**
		 * 用户管理
		 */
		user: {
			list:"list.html", //列表页面
			queryAll:"/university/user/queryAll", //列表页面表格数据
			uploadExcel:"/university/user/import", // 导入用户,
			queryTeam:"/university/user/queryTeam", // 查询支部
			queryClass:"/university/user/queryClass"// 查询班级
		},
		
		/**
		 * 试题管理
		 */
		question: {
			list:"/html/role/list.html",
			queryAll:"/university/question/queryAll",
			uploadExcel:"/university/question/import"		
		},
		
		/**
		 * 评分管理
		 */
		score: {
			list:"/html/menu/list.html",
			queryAllStudent:"/university/answer/queryAllStudent",
			queryAllLeader:"/university/answer/queryAllLeader",
			queryAllTeacher:"/university/answer/queryAllTeacher",
			exportAllStudent:"/university/answer/exportAllStudent",
			exportAllLeader:"/university/answer/exportAllLeader",
			exportAllTeacher:"/university/answer/exportAllTeacher",
		},
		/**
		 * 附件管理
		 */
		attachement: {
			list:"/html/files/list.html", //列表页面
			query:"/university/attachement/query", //列表页面表格数据
		},
		/**
		 * 未评分管理
		 */
		waitScore: {
			list:"/html/score/wait.html",
			queryWaitStudent:"/university/answer/queryNotScoreStudent",
			queryWaitLeader:"/university/answer/queryNotScoreLeader",
			queryWaitTeacher:"/university/answer/queryNotScoreTeacher",
		},
	};
});