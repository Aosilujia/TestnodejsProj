/*
  handleRequest.js:
  处理各种请求的具体逻辑，对getFacility.js获得的数据进行再处理。
*/

var getFacility=require('./getFacility.js');

var statusEnum=require('./statusEnum.js')
var config=require('./configure.js')

function handleRequest(obj,callback){//处理连接到具体接口的请求
  var naddress;
  var nroute;
  var reqresult=statusEnum.requestStat.NONE;
  requestThingaddress(obj,function(result,address){
    if (result==statusEnum.requestStat.NOFACILITY){//物设备不存在
      console.log("HandleRequest: no such facility");
      callback(result,"");
    }
    else if (result==statusEnum.requestStat.SUCCESS){//物设备存在
      naddress=address;
      console.log("HandleRequest: facility exists");
      requestInterfacename(obj,function(result,route){
        if (result==statusEnum.requestStat.NOINTERFACE){//物接口不存在
            console.log("HandleRequest: no such interface");
            callback(result);
        }
        //console.log(naddress+route);
        else{
          console.log("HandleRequest: handle result successful");
          callback(result,naddress+route);
        }
      })
    }
  });
}

function handleAllFacilityRequest(callback){//获得所有物设备的请求
  getFacility.getAllFacility(function(result){
    console.log(result);
    callback(result);
  });
}

function handleAllInterfacesRequest(obj,callback){//获得所有物设备下接口的请求
  var name=obj[config.packProt.DATA][config.packProt.REQUESTTARGET];
  console.log("请求目标"+name);
  getFacility.getAllInterfaces(name,function(result){
    callback(result);
  });
}



function requestThingaddress(obj,callback){//获得物设备地址
  var name=obj[config.packProt.DATA][config.packProt.REQUESTTARGET];
  console.log("请求目标:"+name);
  var address="";
  var reqstat=statusEnum.requestStat.SUCCESS;
  getFacility.getAddress(name,function (result) {
        if (result=="" || !result){
          reqstat=statusEnum.requestStat.NOFACILITY;
        }
        else{
          address=result;//物设备地址
        }
        callback(reqstat,address);
  });
}

function requestInterfacename(obj,callback){//获得物接口地址
  var name=obj[config.packProt.DATA][config.packProt.REQUESTTARGET];
  var interface_name=obj[config.packProt.DATA][config.packProt.REQUESTINTERFACE];
  console.log("请求接口："+interface_name);
  var route="";
  var reqstat=statusEnum.requestStat.SUCCESS;
  getFacility.getInterface(name,interface_name,function (result) {
        if (!result || result==""){
          reqstat=statusEnum.requestStat.NOINTERFACE;
        }
        else{
          //console.log(result);
          route=result[config.thingInterface.INTERFACEADDRESS];
        }//物设备地址
        console.log(route);
        callback(reqstat,route);
  })
}


exports.handleRequest=handleRequest;
exports.handleAllFacilityRequest=handleAllFacilityRequest;
exports.handleAllInterfacesRequest=handleAllInterfacesRequest;
