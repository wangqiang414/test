let childProcess=require("child_process");
module.exports=function (url) {
	let cmd="";
	switch (process.platform){
		
		case "darwin":
			cmd="open";
			break;
		case "win32":
			cmd="start";
			break;
		case "linux":
			cmd="dgx-open";
			break;
	}
	childProcess.exec(`${cmd} ${url}`);
}