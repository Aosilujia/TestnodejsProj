var getFacility=require('./getFacility.js');

var statusEnum=require('./statusEnum.js')

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

function handleAllFacilityRequest(callback){
  getFacility.getAllFacility(function(result){
    console.log(result);
    callback(result);
  });
}

function handleAllInterfacesRequest(obj,callback){
  var name=obj.消息内容.请求目标;
  console.log(name);
  getFacility.getAllInterfaces(name,function(result){
    callback(result);
  });
}



function requestThingaddress(obj,callback){
  var name=obj.消息内容.请求目标;
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

function requestInterfacename(obj,callback){
  var name=obj[statusEnum.packProt.DATA].请求目标;
  var interface_name=obj.消息内容.请求数据;
  console.log("请求接口："+interface_name);
  var route="";
  var reqstat=statusEnum.requestStat.SUCCESS;
  getFacility.getInterface(name,interface_name,function (result) {
        if (!result || result==""){
          reqstat=statusEnum.requestStat.NOINTERFACE;
        }
        else{
          //console.log(result);
          route=result[statusEnum.thingInterface.INTERFACEADDRESS];
        }//物设备地址
        console.log(route);
        callback(reqstat,route);
  })
}


exports.handleRequest=handleRequest;
exports.handleAllFacilityRequest=handleAllFacilityRequest;
exports.handleAllInterfacesRequest=handleAllInterfacesRequest;
