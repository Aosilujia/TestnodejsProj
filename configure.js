var iotPackProtocol={
  SENDER:"发送者",
  DATA:"消息内容",
  TYPE:"消息类型",
  REQUESTSENDER:"发送名称",
  REQUESTSENDERADDRESS:"发送地址",
  REQUESTTARGET:"目标名称",
  REQUESTTARGETADDRESS:"目标地址",
  REQUESTINTERFACE:"请求数据",
//
  CONNECTREQUEST:"请求连接"

};

var thingInterface={
  ADDRESS:"设备地址",
  INTERFACES:"设备接口",
  INTERFACENAME:"接口名称",
  INTERFACEADDRESS:"接口地址",
  PROTOCOLTYPE:"协议类型",
  PROTOCOLPARAM:"协议参数",

}

//储存所有物设备设置文件的路径
var facilityspath='./';

module.exports.facilityspath=facilityspath;
module.exports.packProt=iotPackProtocol;
module.exports.thingInterface=thingInterface;
