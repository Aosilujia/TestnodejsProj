var fs=require('fs');

var getFacility=require('./getFacility.js');

var testjson="./iotpack.json";

var data;


fs.readFile(testjson,'utf-8',function(err,data){
  if (err){
    return console.log(err);
  }
  console.log(data);
  var obj=JSON.parse(data);
  var type=obj.消息类型;
  if (type=="请求连接"){
    var name=obj.消息内容.请求目标;
    var interface_name=obj.消息内容.请求数据;
    console.log(name);
    console.log(interface_name);
    var address;
    getFacility.getInterface(name,interface_name,function (err, result) {
          if(err){
            console.log('[SELECT ERROR] - ',err.message);
            return;
          }
          console.log(result);
    });
  }

});
