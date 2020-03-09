let path=require("path");
let fs=require("fs");
let util=require("util");
let pug=require("pug");
let getFileType=require("../utils/mime.js");
let compress=require("../utils/compress.js");
const cache = require("../utils/cache");


//封装promise函数
let stat=util.promisify(fs.stat);
let readdir=util.promisify(fs.readdir);
let readFile=util.promisify(fs.readFile);

module.exports=(root)=>{
	return async function (req,res) {
		let url=req.url;
		let filePath=path.resolve(root,`.${url}`);
		try{
			let stats=await stat(filePath);
				if (stats.isDirectory()) {
					let files=await readdir(filePath);
					
						let pugFilePath=path.resolve(__dirname,"../views/index.pug");
						let html=pug.renderFile(pugFilePath,{files,url})
						
						res.statusCode=200;
						res.setHeader("Content-Type","text/html;charset=utf8")
						res.end(html);			
				}
				if (stats.isFile()) {
					let rs = fs.createReadStream(filePath);
					// 缓存控制
			        const isCache = cache(stats, req, res);
			        // 如果命中缓存，在函数中已经设置 statusCode 和 end，就不需要接着执行了
			        if (isCache) {
			        	return;
			        }
					let extname=getFileType(filePath);
					if (extname.match(/(javascript|css|html|json)/)) {
				        // 对文件进行压缩
				        rs = compress(rs, req, res);
				      }
					res.statusCode=200;
					res.setHeader("Content-Type",`${extname};charset=utf8`)
					rs.pipe(res);
					
				}
		}catch(e){
			res.statusCode=404;
			res.setHeader("Content-Type","text/plain;charset=utf8")
			res.end(`${url} 不是一个文件或文件夹`);
		}
	}
}
