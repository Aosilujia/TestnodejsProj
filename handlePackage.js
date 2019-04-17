var fs=require('fs');

var handleRequest=require('./handleRequest.js')

var statusEnum=require('./statusEnum.js')


var testjson="Test/iotpack.json";

fs.readFile(testjson,'utf-8',function(err,data){
  if (err){
    return console.log(err);
  }
  console.log(data);
  var responsepackage={};
  var obj=JSON.parse(data);
  console.log("coding standard:"+obj["coding standard"]);
  var type=obj.消息类型;
  if (type=="请求连接"){
    handleRequest.handleRequest(obj,function(x,y){
      console.log("handleRequest returns:"+x);
      if (x==statusEnum.requestStat.SUCCESS){//
        console.log(y);
      }
      else if (x==statusEnum.requestStat.NOFACILITY){
        handleRequest.handleAllFacilityRequest(function(x){
          console.log(x);
        });
      }
      else if (x==statusEnum.requestStat.NOINTERFACE){

      }
    });
  }
  else if (type==""){


  }

});
