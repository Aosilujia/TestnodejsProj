var handleRequest=require('./handleRequest.js')

var statusEnum=require('./statusEnum.js')



function handlePackage(data,callback){
  var responsepackage={};
  var obj=JSON.parse(data);
  //console.log("coding standard:"+obj["coding standard"]);


  responsepackage["coding standard"]=obj["coding standard"];
  responsepackage.消息类型="回复";

  var type=obj.消息类型;
  if (type==statusEnum.packProt.CONNECTREQUEST){
    handleRequest.handleRequest(obj,function(x,y){
      console.log("handleRequest returns:"+x);
      if (x==statusEnum.requestStat.SUCCESS){//
        console.log(y);
        callback(JSON.stringify(responsepackage));
      }
      else if (x==statusEnum.requestStat.NOFACILITY){
        console.log("handlePackage:no facility");
        handleRequest.handleAllFacilityRequest(function(x){
          console.log("handlePackage, all facility:"+x);
        });
      }
      else if (x==statusEnum.requestStat.NOINTERFACE){
        console.log("handlePackage no interface");
        handleRequest.handleAllInterfacesRequest(obj,function(x){
          console.log("handlePackage, all interfaces:");
          console.log(x);
        });
      }
    });
  }
  else if (type==""){


  }
};

module.exports.handlePackage=handlePackage;
