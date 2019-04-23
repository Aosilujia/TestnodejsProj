var handleRequest=require('./handleRequest.js')

var statusEnum=require('./statusEnum.js')
var config=require('./configure.js')


function handlePackage(data,callback){
  var responsepackage={};
  var obj=JSON.parse(data);
  //console.log("coding standard:"+obj["coding standard"]);


  responsepackage["coding standard"]=obj["coding standard"];
  responsepackage[config.packProt.TYPE]="回复";
  responsepackage[config.packProt.REQUESTSENDER]="3503物管理器";

  var type=obj[config.packProt.TYPE];
  if (type==config.packProt.CONNECTREQUEST){
    handleRequest.handleRequest(obj,function(x,y){
      console.log("handleRequest returns:"+x);
      if (x==statusEnum.requestStat.SUCCESS){//
        console.log(y);
        responsepackage[config.packProt.DATA]=y;
        callback(JSON.stringify(responsepackage));
      }
      else if (x==statusEnum.requestStat.NOFACILITY){
        console.log("handlePackage:no facility");
        handleRequest.handleAllFacilityRequest(function(x){
          console.log("handlePackage, all facility:"+x);
          responsepackage[config.packProt.DATA]=x;
          callback(JSON.stringify(responsepackage));
        });
      }
      else if (x==statusEnum.requestStat.NOINTERFACE){
        console.log("handlePackage no interface");
        handleRequest.handleAllInterfacesRequest(obj,function(x){
          console.log("handlePackage, all interfaces:");
          console.log(x);
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
