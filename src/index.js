let http=require("http");
const defaultConfig = require("./config");
let middleware=require("./middleware");
let open=require("./utils/open.js");
// 引入命令行配置：将来用户输入 -p -h -d,都会收集并返回一个对象
const argv = require("./cli");
// 合并配置
const config = Object.assign({}, defaultConfig, argv);

const { port, host, root } = config;

//创建服务
let server=http.createServer(middleware(root));


//启动服务
server.listen(port,host,function (err) {
	if (err) {
		return
	}
	let url=`http://${host}:${port}`
	console.log("服务器启动成功:"+url);
//	open(url);
})
