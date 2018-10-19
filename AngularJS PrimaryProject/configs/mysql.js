const mysql=require('mysql');

var pool=mysql.createPool({
    host:"127.0.0.1",
    port:3306,
    user:"VWl3CxCbqfDkUyH6",
    password:"nvOwaw546GpmR1FU",
    database:"grape_city_web_train"
})

module.exports=pool;