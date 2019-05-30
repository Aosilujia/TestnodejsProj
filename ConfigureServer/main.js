//express_demo.js 文件
var express = require('express');
var ejs = require('ejs');
var router = express.Router();

var getFacility=require('../getFacility.js');

var app = express();

//使用ejs模板
app.set('view engine','ejs');
//设定可访问的资源文件
app.use(express.static(__dirname));



app.get('/', function (req, res) {
  var data={
    name : 'webarn',
    sex : '男',
    content : 'Hello World'
  };
   res.render(__dirname+"/html/"+"index",data);
});


app.get('/wenhao', (req, res) => {
  console.log(req.query)
  res.send(req.query)
})


app.get('/index.htm', function (req, res) {
   res.sendfile( __dirname + "/html/" + "index.htm" );
})

app.get('/process_get', function (req, res) {

   // 输出 JSON 格式
   var response = {
       "first_name":req.query.first_name,
       "last_name":req.query.last_name
   };
   console.log(response);
   res.end(JSON.stringify(response));
})


app.get('/listAll',function(req,res){
  var data={};
  getFacility.getAllFacility(function(result){
    console.log(result);
    data.facilities=result;
    res.render(__dirname+"/html/"+"allFacilities",data);
  });
});

app.get('/facility',function(req,res){
  var data={};
  var param=req.query;
  getFacility.getFacility(param.name,function(result){
    data.info=result;
    res.render(__dirname+"/html/"+"Facility",data);
  })
})


//设定服务器端口
var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port

  //console.log("访问地址: http://%s:%s", host, port)

})
