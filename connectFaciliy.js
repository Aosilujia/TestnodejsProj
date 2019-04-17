var fs=require('fs');

var getFacility=require('./getFacility.js');


var testjson="Test/iotpack.json";


fs.readFile(testjson,'utf-8',function(err,data){
  if (err){
    return console.log(err);
  }
  console.log(data);
  var obj=JSON.parse(data)
    console.log("coding standard:"+obj["coding standard"]);
  var type=obj.消息类型;
  if (type=="请求连接"){
    var thing_address
    var interface_address
    requestThingaddress(obj,function(x){
      thing_address=x;
      requestInterfacename(obj,function(a){
        interface_address=a;
        console.log(address+a)
      });
    })
  }

});

function requestThingaddress(obj,callback){
  var name=obj.消息内容.请求目标;
  console.log(name)
  getFacility.getAddress(name,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
        console.log(result.length);
        if (result.length==0){
          address="";
        }
        else{
          address=result[0].address;//物设备地址
        }
        callback(address);
  });
}

function requestInterfacename(obj,callback){
  var name=obj.消息内容.请求目标;
  var interface_name=obj.消息内容.请求数据;
  console.log(interface_name)
  getFacility.getInterface(name,interface_name,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
        if (result.length==0){
          route="";
        }
        else{
          route=result[0].route;
        }//物设备地址
        console.log(route);
        callback(route);
  })
}
