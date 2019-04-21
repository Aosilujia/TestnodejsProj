var fs=require('fs');
var statusEnum=require('./statusEnum.js');

var filepath='./'

function getAddress(name,callback){
  readJSON(name,function(obj){
    callback(obj[statusEnum.thingInterface.ADDRESS]);
  });
}

function getInterface(name,interface,callback){
  readJSON(name,function(obj){
    var allInterface=obj[statusEnum.thingInterface.INTERFACES];
    for (var i=0;i<allInterface.length;i++){
      if (allInterface[i][statusEnum.thingInterface.INTERFACENAME]==interface){
        callback(allInterface[i]);
      }
    }
    callback("");
  });
}

function getAllFacility(){}

//读json文件返回对象 read json file returns obj
function readJSON(filename,callback){
  var codingStandard='utf8';
  fs.readFile(filename,codingStandard,function(err,data){
    if (err){
      return console.log(err);
    }
    var obj=JSON.parse(data);
    var encoding=obj["coding standard"];
    //console.log(encoding);
    if (encoding!=codingStandard){//read different coding standard 编码不一致
      fs.readFile(filename,codingStandard,function(err,data){
        if (err){
          return console.log(err);
        }
        var obj=JSON.parse(data);
        callback(obj);
      })
    }
    else {
      callback(obj);
    }
  });
}


var temp="显微镜"
getAddress(filepath+temp+'.json',function(x){
  console.log(x);
});

getInterface(filepath+temp+'.json','瞬间图像',function(x){
  console.log(x);
});

exports.getAddress=getAddress;
exports.getInterface=getInterface;
exports.getAllFacility=getAllFacility;
