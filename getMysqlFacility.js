var mysql=require('mysql');

var pool= mysql.createPool({
  host:'localhost',
  user:'root',
  password:'19971231a',
  port:'3306',
  database:'thingsmanager'
}
)

var connected=0;

function connectdb(){
  if (connected=0){
    connection.connect()
  }
}

function unconnectdb(){
  if (connected=1){
    connection.end()
    connected=0
  }
}

function getAddress(name,callback){
  pool.getConnection(function(err,connection){
        if(err){throw err;return;}
        connection.query('select address from things where name="'+name+'"',callback);
        connection.release();
  })
};

function getInterface(thing,interface,callback){
  pool.getConnection(function(err,connection){
        if(err){throw err;return;}
        connection.query('select route from thingsinterfaces where thing_name="'+thing+'" and interface_name="'+interface+'"',callback);
        connection.release();
  })
  //console.log('select * from thingsinterfaces where thing_name="'+thing+'" and interface_name="'+interface+'"');
}

function getAllFacility(callback){
  pool.getConnection(function(err,connection){
        if(err){throw err;return;}
        connection.query('select name from things' ,callback);
        connection.release();
  })
};

exports.getAddress=getAddress;
exports.getInterface=getInterface;
exports.getAllFacility=getAllFacility;
