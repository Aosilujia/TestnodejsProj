var fs=require('fs');

var handlePackage=require('./handlePackage.js')

var testjson="./iotpack.json";

fs.readFile(testjson,'utf-8',function(err,data){
  if (err){
    return console.log(err);
  }
  console.log(data);
  handlePackage.handlePackage(data,function(x){
    console.log(x);

  });

});
