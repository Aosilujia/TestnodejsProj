var mqtt = require('mqtt')

var handlePackage=require('./handlePackage.js')

var config=require('./configure.js');

//var client  = mqtt.connect('tcp://admin:password@192.168.0.118:61613');
var client =mqtt.connect('mqtt://127.0.0.1');
var testobj={};
testobj["coding standard"]="utf8";
testobj["发送者"]="服务器";
testobj["消息类型"]="请求连接";
testobj["消息内容"]={};
testobj["消息内容"]["请求人"]="物管理器1";
testobj["消息内容"]["目标名称"]="显微镜1";
testobj["消息内容"]["请求数据"]="图像数据1";

console.log(testobj);

client.on('connect', function () {
  client.subscribe('3503');
  client.publish('3503', JSON.stringify(testobj));
})

client.on('message', function (topic, message) {
  // message is Buffer
  var data=message.toString();
  console.log(data);
  //不符合JSON格式可能报错
  var data=JSON.parse(data);

  if (data[config.packProt.REQUESTSENDER]!="3503物管理器"){
    console.log(data);
    handlePackage.handlePackage(message,function(x){
      console.log("package returns:"+x);
      client.publish('3503',x);
    });
  }

})
