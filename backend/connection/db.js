const mysql = require('mysql');

//Database
const db = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'SaBa@2610',
    database: 'Splitwise_273'
});

db.connect(function(err) {
    if(err){
        console.log('DB error');
        throw err;
        return false;
    }
    else{
      console.log("Succesfully connect to DB without pool")
    }
    
});

// const db = mysql.createPool({
//     connectionLimit: 100,
//     host: 'us-cdbr-east-03.cleardb.com',
//     user: 'ba265b1db19272',
//     password: 'a9c30c6a',
//     database: 'heroku_c8d35e15a098b78'
// });

// db.getConnection(function(err) {
//     if(err){
//         console.log('DB error');
//         throw err;
//         return false;
//     }
//     else{
//       console.log("Succesfully connect to DB with pool")
//     }
// });

module.exports = db;
