
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
			detail:"detail.html", //详细页面
			queryAll:"/university/user/queryAll", //列表页面表格数据
			uploadExcel:"/university/user/import" // 导入用户
		},
		
		/**
		 * 角色管理
		 */
		question: {
			list:"/html/role/list.html",
			detail:"/html/role/detail.html",
			queryAll:"/university/question/queryAll",
			uploadExcel:"/university/question/import"		
		},
		
		/**
		 * 菜单管理
		 */
		menu: {
			list:"/html/menu/list.html",
			detail:"/html/menu/detail.html",
			queryAll:"/university/menu/queryAll",
			save:"/university/menu/saveMenu",
			del:"/university/menu/deleteMenu",
			queryById:"/university/menu/queryById",
			queryByRoleId:"/university/menu/queryByRoleId"
		}
	};
});