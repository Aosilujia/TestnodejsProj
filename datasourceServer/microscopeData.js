var fs=require("fs");

var microscope;

function readData(callback){
  fs.readFile('./data','utf8',function(err,data){
    console.log("读取数据文件："+data);
    microscope=JSON.parse(data);
    callback();
  })
}

function writedata(){
  fs.writeFile('./data', JSON.stringify(microscope),function(err){
      if(err) console.log('写文件操作失败');
      else console.log('写文件操作成功');
  });
}

function getLight(callback){
  readData(function(){
    callback(microscope.light);
  });
}

function setLight(l){
  readData(function(){
    microscope.light=l;
    writedata();
  });
}

function getHeight(callback){
  readData(function(){
    callback(microscope.height);
  });
}

function setHeight(h){
  readData(function(){
    microscope.height=h;
    writedata();
  });
}

function getX(callback){
  readData(function(){
    callback(microscope.x);
  });
}

function setX(x){
  readData(function(){
    microscope.x=x;
    writedata();
  });
}

function getY(callback){
  readData(function(){
    callback(microscope.y);
  });
}

function setY(y){
  readData(function(){
    microscope.y=y;
    writedata();
  });
}

function getScope(callback){
  readData(function(){
    callback(microscope.scope);
  });
}

function setScope(s){
  readData(function(){
    microscope.scope=s;
    writedata();
  });
}


//同步方法
//fs.writeFileSync('./message.txt','这是第一行');

module.exports.getLight=getLight;
module.exports.setLight=setLight;
module.exports.getHeight=getHeight;
module.exports.setHeight=setHeight;
module.exports.getX=getX;
module.exports.setX=setX;
module.exports.getY=getY;
module.exports.setY=setY;
module.exports.getScope=getScope;
module.exports.setScope=setScope;
