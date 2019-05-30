var http=require("http");
var express=require("express");
var url=require("url");
var fs=require("fs");

/*http.createServer(function(req,res){
  var pathname=url.parse(req.url).pathname;

  console.log("request resource:"+pathname);

  if (pathname=="/data"){
    res.writeHead(200,{'Content-Type':'text/html'});
    res.write("111");
  }
  else if (pathname.substr(0,5)=='/img/'){
    var imgpath="datasourceServer"+pathname;


    res.writeHead(200,{'Content-Type':'image/jpeg'});
  }
  else{
    res.writeHead(404,{'Content-Type':'text/html'});
  }
  res.end();

}).listen(8080);*/

var app=express();

var defaultdir=__dirname;

app.use(express.static(defaultdir+"/img"));

var datajson={
  电源:"开启",
  使用者:"张三",
  实时视频状态:"不可使用",
  截图数量:"0"
}

app.get('/status',function(req,res){
  res.send(datajson);
});

app.get('/img/*',function(req,res){
  console.log("request image:"+req.url);
  res.sendFile( defaultdir + req.url );
});

var server=app.listen(8080,function(){
  console.log('server running');
})
