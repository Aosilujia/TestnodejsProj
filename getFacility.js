/*
  getFacility.js：
  读取物管理下物设备信息的函数；
  这个函数实现下物设备信息直接用文件系统储存为.json文件，物设备名称即为文件名。
  各个函数的主要工作是分析JSON中的内容。
  ××getMysqlFacility.js是使用mysql的版本，不保证运行，可作参考
*/
var fs=require('fs');
var path=require('path');

var statusEnum=require('./statusEnum.js');
var config=require('./configure.js')



//物设备信息文件所在的路径 filepath:the filepath storing json setting files
var filepath=config.facilityspath;

//获得叫做name的物设备的地址(ip)
function getAddress(name,callback){
  readJSON(filepath+name+'.json',function(obj){
    callback(obj[config.thingInterface.ADDRESS]);
  });
}

//获得叫做name的物设备下叫做interface的接口访问方式
function getInterface(name,interface,callback){
  readJSON(filepath+name+'.json',function(obj){
    var allInterface=obj[config.thingInterface.INTERFACES];
    for (var i=0;i<allInterface.length;i++){
      if (allInterface[i][config.thingInterface.INTERFACENAME]==interface){
        //console.log("interface"+interface);
        callback(allInterface[i]);
      }
      else if (i==allInterface.length-1){
        callback("");
      }
    }
    //console.log("interface"+interface);

  });
}

/*
  getAllFacility：
  获得物管理器下的所有物设备名称：
  这个函数的通过fs文件系统与path文件路径模块实现，读取物信息文件夹下的所有文件名称。
*/
function getAllFacility(callback){
  var results=new Array();
  var i=0;
  fs.readdir(filepath,function(err,menu){
    if(!menu) {
      callback(results);
    }
    else {
      for (var j=0;j<menu.length;j++){
        if (path.extname(menu[j])=='.json'){
          results[i]=menu[j].substring(0,menu[j].length-5);
          i++;
        }
      }
      callback(results);
    }
  });
};

//获得物设备的所有信息
function getFacility(name,callback){
  readJSON(filepath+name+'.json',function(obj){
    if (obj=="" || !obj){
      callback("");
      return;
    }
    else{
      callback(obj);
    }
    //console.log("interface"+interface);
  });
}




//获得叫做name的物设备的所有接口名称
function getAllInterfaces(name,callback){
  var results=new Array();
  readJSON(filepath+name+'.json',function(obj){
    var allInterface=obj[config.thingInterface.INTERFACES];
    for (var i=0;i<allInterface.length;i++){
      results[i]=allInterface[i][config.thingInterface.INTERFACENAME];
    }
    callback(results);
  });
}


//读.json文件返回JSON对象 read json file returns obj
function readJSON(filename,callback){
  var codingStandard='utf8';
  fs.readFile(filename,codingStandard,function(err,data){
    if (err){
      callback("");
      console.log(err);
      return;
    }
    var obj=JSON.parse(data);
    var encoding=obj["coding standard"];
    //console.log(encoding);
    if (encoding!=codingStandard){//read different coding standard 编码不一致
      fs.readFile(filename,codingStandard,function(err,data){
        if (err){
          callback("");
          return console.log(err);
        }
        var obj=JSON.parse(data);
        callback(obj);
        return;
      })
    }
    else {
      callback(obj);
      return;
    }
  });
}

//下面是测试debug用代码
var temp="显微镜"
/*getAddress(temp,function(x){
  console.log(x);
});*/

/*getInterface(temp,'瞬间图像',function(x){
  console.log(x);
});*/

/*getAllInterfaces(temp,function(x){
  console.log(x);
});*/

getFacility(temp,function(x){
  console.log(x);
})

module.exports.getAddress=getAddress;
module.exports.getInterface=getInterface;
module.exports.getAllFacility=getAllFacility;
module.exports.getAllInterfaces=getAllInterfaces;
module.exports.getFacility=getFacility;
