var data=require("./microscopeData.js");


//0-100
function setLight(l){
  if (l<0){
    return "fail";
  }
  else if (l>100){
    return "fail";
  }
  else{
    data.setLight(l);
    return "success";
  }
};

function setHeight(h){
  data.setHeight(h);
};

//0-85cm
function setX(x){
  data.setX(x);
};

//0-60cm
function setY(y){
  data.setY(y);
};

//0-3 int
function setScope(s){
  data.setScope(s);
};


function getLight(callback){
  data.getLight(function(x){
    callback(x);
  });
}

/*setScope(3);

data.getLight(function(x){
  console.log(x);
});*/

module.exports.getLight=getLight;
module.exports.setLight=setLight;
