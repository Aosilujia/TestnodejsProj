var fs=require("fs");
var mysql=require('mysql');

var connection= mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'19971231a',
  port:'3306',
  database:'thingsmanager'
}
)

connection.connect();

var data;
var name="显微镜1";
connection.query('select * from things where name=\"'+name+'\"',function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }

       console.log('--------------------------SELECT----------------------------');
       data=result;
       console.log(data);
       console.log(result);
       console.log('------------------------------------------------------------\n\n');
});

connection.end();

fs.readFile('Test/temp.txt',function (err,data){
  if (err) return console.error(err);
  console.log(data.toString());
});


const buf=Buffer.from('yeah呀','utf8');

console.log(buf.toString('hex'));

console.log(buf.toString());

console.log("result");
