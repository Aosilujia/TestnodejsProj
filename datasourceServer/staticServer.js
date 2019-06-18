var http=require("http");
var express=require("express");
var url=require("url");
var fs=require("fs");

var micopr=require("./microscopeOpr.js");


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

function readJSON(filename,callback){
  var obj={};
  fs.readFile(filename,"utf8",function(err,data){
    if (err){
      callback(obj);
      console.log(err);
      return;
    }
    var obj=JSON.parse(data);
    callback(obj);
  })
};


var datajson={
  电源:"开启",
  使用者:"张三",
  实时视频状态:"不可使用",
  截图数量:"0"
}

app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});


app.get('/thingInterfacelist',function(req,res){
  readJSON("./显微镜1.json",function(data){
    var string=JSON.stringify(data);
    res.send(string);
  });
});

app.get('/物功能表',function(req,res){
  readJSON("./显微镜1.json",function(data){
    var string=JSON.stringify(data);
    res.send(string);
  });
});

app.get('/%E7%89%A9%E5%8A%9F%E8%83%BD%E8%A1%A8',function(req,res){
  readJSON("./显微镜1.json",function(data){
    var string=JSON.stringify(data);
    res.send(string);
  });
});

//图片
/*app.get('/img/*',function(req,res){
  console.log("request image:"+req.url);
  res.writeHead(200, {'Content-Type': 'video/mp4'});
  res.sendFile( defaultdir + req.url );
});*/

app.get('/img/onion1.png',function(req,res){
  console.log("request image:"+req.url);
  res.writeHead(200, {'Content-Type': 'image/png'});
  var rs = fs.createReadStream(defaultdir + req.url);
  rs.pipe(res);

  rs.on('end', function () {
      res.end();
      console.log('end call');
  });
});

app.get('/img/onion2.jpg',function(req,res){
  console.log("request image:"+req.url);
  res.writeHead(200, {'Content-Type': 'image/jpeg'});
  var rs = fs.createReadStream(defaultdir + req.url);
  rs.pipe(res);

  rs.on('end', function () {
      res.end();
      console.log('end call');
  });
});


app.get('/light',function(req,res){
  micopr.getLight(function(l){
    res.send(String(l));
  })
})

app.get('/setlight',function(req,res){
  var param=req.query;
  res.send(micopr.setLight(param.l));
})

//视频
app.get('/video', function (req, res) {
    var time = new Date();
    var videoName = req.query.name;
    console.log("-------点击查询下载" + time.getFullYear() + "/" + time.getMonth() + "/" + time.getDate() + "/" + time.getHours() + "/" + time.getMinutes() + "/" + time.getSeconds() + "-------");
    res.writeHead(200, {'Content-Type': 'video/mp4'});
    var rs = fs.createReadStream('test.mp4');
    rs.pipe(res);

    rs.on('end', function () {
        res.end();
        console.log('end call');
    });
});



var server=app.listen(8085,function(){
  console.log('server running');
})
