/*
  filePackage.js:
  从文件导入一个JSON的通信包，丢给handlepackage进行处理，
  主要用于代码测试
*/
var fs=require('fs');

var handlePackage=require('./handlePackage.js')

var testjson="./iotpack.json";

fs.readFile(testjson,'utf-8',function(err,data){
  if (err){
    return console.log(err);
  }
  console.log(data);
  handlePackage.handlePackage(data,function(x){
    console.log(x);

  });

});
