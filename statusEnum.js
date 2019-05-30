var requestStat={
  SUCCESS:0,  //成功
  NOFACILITY:1, //无此物设备
  NOINTERFACE:2,  //无此接口
  NONE:3  //
};

var iotPackProtocol={
  DATA:"消息内容",
  CONNECTREQUEST:"请求连接",
  REQUESTRESULT:"请求响应"
};

var thingInterface={
  ADDRESS:"设备地址",
  INTERFACES:"设备接口",
  INTERFACENAME:"接口名称",
  INTERFACEADDRESS:"接口地址",
  PROTOCOLTYPE:"协议类型",
  PROTOCOLPARAM:"协议参数",

}


var array='test arrau'

module.exports.requestStat=requestStat;
module.exports.packProt=iotPackProtocol;
module.exports.thingInterface=thingInterface;
