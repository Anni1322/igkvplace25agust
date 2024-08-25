// db.js
const sql = require("mssql/msnodesqlv8");


// Anil database 
var config = {
server: "ANNI\\SQLEXPRESS",
database: "placementcell",
driver: "msnodesqlv8",
options: {
    trustedConnection: true
}
};





// Connect to the database
//sql.connect(config, function(err) {
//    if (err) console.log(err);
//    else console.log("Database connected successfully");
//});

// Export the sql object to be used in other modules
//module.exports = sql;


//Roshni database
//    var config = {
//        user: "igkv",
//        database: "placementcell",
//        server:"DESKTOP-NDU9JS5",
//        password: "igkv@123",
//           options: {
//           trustedConnection: true
//      }
//   };


// Connect to the database
sql.connect(config, function(err) {
    if (err) console.log(err);
    else console.log("Database connected successfully");
});

// Export the sql object to be used in other modules
module.exports = sql;






// const config = {
//     user: 'ANNI\SQLEXPRESS',
//     password: '',
//     server: 'ANNI\SQLEXPRESS',
//     database: 'a',
//     options: {
//         encrypt: true // Use this if you're on Windows Azure
//     }
// };


// async function connect() {
//     try {
//         await pool.connect();
//         console.log('Connected to SQL Server');
//     } catch (error) {
//         console.error('Error connecting to SQL Server:', error);
//     }
// }

// module.exports = {
//     connect,
//     pool
// };
