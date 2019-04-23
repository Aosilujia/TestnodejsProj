var fs=require('fs');
var path=require('path');

var statusEnum=require('./statusEnum.js');
var config=require('./configure.js')

//filepath:the filepath storing json setting files
var filepath=config.facilityspath;

function getAddress(name,callback){
  readJSON(filepath+name+'.json',function(obj){
    callback(obj[config.thingInterface.ADDRESS]);
  });
}

function getInterface(name,interface,callback){
  readJSON(filepath+name+'.json',function(obj){
    var allInterface=obj[statusEnum.thingInterface.INTERFACES];
    for (var i=0;i<allInterface.length;i++){
      if (allInterface[i][statusEnum.thingInterface.INTERFACENAME]==interface){
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
  })
}

function getAllInterfaces(name,callback){
  readJSON(filepath+name+'.json',function(obj){
    var allInterface=obj[statusEnum.thingInterface.INTERFACES];
    callback(allInterface);
  });
}


//读json文件返回对象 read json file returns obj
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


//var temp="显微镜"
/*getAddress(temp,function(x){
  console.log(x);
});

getInterface(temp,'瞬间图像',function(x){
  console.log(x);
});*/

module.exports.getAddress=getAddress;
module.exports.getInterface=getInterface;
module.exports.getAllFacility=getAllFacility;
module.exports.getAllInterfaces=getAllInterfaces;
