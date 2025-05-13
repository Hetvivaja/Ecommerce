const mysql=require('mysql2');
const conn=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'ecommerce'
});

conn.connect(err=>{
    if(err) throw err;
    console.log('Mysql connected');
});

module.exports=conn.promise();
