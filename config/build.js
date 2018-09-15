({
	appDir: '../js',
    baseUrl: './',
	modules: [
        {
            name: 'page/index'
        },
		{
            name: 'page/common'
        },
		{
            name: 'page/user/user'
        },
		{
            name: 'page/score/score'
        },
		{
            name: 'page/score/wait_score'
        },
		{
            name: 'page/question/question'
        },
		{
            name: 'page/files/file'
        },
		{
            name: 'page/files/detail'
        }
    ],
	mainConfigFile: '../js/main.js',
	dir: '../build'
})