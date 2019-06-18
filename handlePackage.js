/*
  handlePackage.js:
  处理通信包的js脚本，主要任务是设置回复包的各种内容。
  处理请求类型的通信包的逻辑主要通过调用handleRequest.js。
*/
var handleRequest=require('./handleRequest.js')

var statusEnum=require('./statusEnum.js')
var config=require('./configure.js')


/*
  主要函数
  data是JSON字符串话的结果
*/
function handlePackage(data,callback){
  var responsepackage={};
  var obj=JSON.parse(data);
  //console.log("coding standard:"+obj["coding standard"]);


  responsepackage["coding standard"]=obj["coding standard"];
  responsepackage[config.packProt.TYPE]="";
  responsepackage[config.packProt.REQUESTSENDER]="3503物管理器";
  responsepackage[config.packProt.RESULT]="";

  var type=obj[config.packProt.TYPE];
  if (type==config.packProt.CONNECTREQUEST){
    responsepackage[config.packProt.TYPE]=config.packProt.CONNECTRESPONSE;
    handleRequest.handleRequest(obj,function(x,y){
      console.log("handleRequest returns:"+x);
      if (x==statusEnum.requestStat.SUCCESS){//
        console.log(y);
        responsepackage[config.packProt.RESULT]=config.packProt.SUCCESS;
        responsepackage[config.packProt.DATA]=y;
        callback(JSON.stringify(responsepackage));
      }
      else if (x==statusEnum.requestStat.NOFACILITY){
        console.log("handlePackage:no such facility");
        handleRequest.handleAllFacilityRequest(function(x){
          console.log("handlePackage, all facility:"+x);
          responsepackage[config.packProt.RESULT]=config.packProt.NOFACILITY;
          responsepackage[config.packProt.DATA]=x;
          callback(JSON.stringify(responsepackage));
        });
      }
      else if (x==statusEnum.requestStat.NOINTERFACE){
        console.log("handlePackage no interface");
        handleRequest.handleAllInterfacesRequest(obj,function(x){
          console.log("handlePackage, all interfaces:");
          console.log(x);
          responsepackage[config.packProt.RESULT]=config.packProt.NOINTERFACE;
          responsepackage[config.packProt.DATA]=x;
          callback(JSON.stringify(responsepackage));
        });
      }
    });
  }
  else if (type==""){


  }
};

module.exports.handlePackage=handlePackage;
