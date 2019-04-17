var fs=require('fs');

var testjson="Test/显微镜.json";

var data;


fs.readFile(testjson,'utf-8',function(err,data){
  if (err){
    return console.log(err);
  }
  console.log(data);
  var obj=JSON.parse(data);
  var name=obj.设备名称;
  console.log(name);

});
