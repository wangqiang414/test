let path=require("path");
const mimeTypes = {
  js: "application/javascript",
  css: "text/css",
  html: "text/html",
  txt: "text/plain",
  gif: "image/gif",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  icon: "image/x-icon",
  svg: "image/svg+xml",
  json: "application/json",
  mp3: "audio/mp3",
  mp4: "video/mp4"
};
module.exports=function getFileType (filePath) {
	let extname=path.extname(filePath).slice(1);
	return mimeTypes[extname];
}