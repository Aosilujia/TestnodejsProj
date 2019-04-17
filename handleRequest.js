var getFacility=require('./getFacility.js');

var statusEnum=require('./statusEnum.js')

function handleRequest(obj,callback){//处理连接到具体接口的请求
  var naddress;
  var nroute;
  var reqresult=statusEnum.requestStat.NONE;
  requestThingaddress(obj,function(result,address){
    if (result==statusEnum.requestStat.NOFACILITY){//物设备不存在
      console.log("HandleRequest: no such facility");
      reqresult=result;
      callback(result);
    }
    else if (result==statusEnum.requestStat.SUCCESS){//物设备存在
      naddress=address;
      requestInterfacename(obj,function(result,route){
        if (result==statusEnum.requestStat.NOINTERFACE){//物接口不存在
            console.log("HandleRequest: no such interface");
            reqresult=result;
            callback(result);
        }
        //console.log(naddress+route);
        reqresult=statusEnum.requestStat.SUCCESS;
        callback(result,naddress+route);
      })
    }
  });
}

function handleAllFacilityRequest(callback){
  getFacility.getAllFacility(function(err,result){
    if(err){
      console.log('[SELECT ERROR] - ',err.message);
      return;
    }
    console.log(result);
    callback(result);
  });
}

function requestThingaddress(obj,callback){
  var name=obj.消息内容.请求目标;
  console.log(name);
  var address="";
  var reqstat=statusEnum.requestStat.SUCCESS;
  getFacility.getAddress(name,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);

          return;
        }
        if (result.length==0){
          reqstat=statusEnum.requestStat.NOFACILITY;
        }
        else{
          address=result[0].address;//物设备地址
        }
        callback(reqstat,address);
  });
}

function requestInterfacename(obj,callback){
  var name=obj[statusEnum.packProt.DATA].请求目标;
  var interface_name=obj.消息内容.请求数据;
  console.log(interface_name);
  var route="";
  var reqstat=statusEnum.requestStat.SUCCESS;
  getFacility.getInterface(name,interface_name,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
        if (result.length==0){
          reqstat=statusEnum.requestStat.NOINTERFACE;
        }
        else{
          route=result[0].route;
        }//物设备地址
        console.log(route);
        callback(reqstat,route);
  })
}


exports.handleRequest=handleRequest;
exports.handleAllFacilityRequest=handleAllFacilityRequest;
