// import mongoose from 'mongoose';
import mysql from 'mysql';

const hostname = "localhost";
const username = "root";
const userpassword = "Fr@nk@ndB3@n5!";
const dbName = "mydb2dddd";


let con = mysql.createConnection({
    host: hostname,
    user: username,
    password: userpassword,
    database: dbName
});

con.connect((err) => {
    if (err) {
        console.log(`${err.errno}: ${err.code}`);
    }
});

// let checkServer = async () => {
//     let con1 = mysql.createConnection({
//         host: hostname,
//         user: username,
//         password: userpassword
//     });
// }


// console.log(await checkServer());



// con.connect(function (err) {
//     if (err) {
//         console.log(`${err.errno}: ${err.code}`);

//         if (err.errno === 1045) {
//             // Access denied
//             console.log('Invalid credentials');
//             throw err;
//         }
//         else if (err.errno === -3008) {
//             // Server not found
//             console.log('Server not found')
//             throw err;
//         }
//         else if (err.errno === 1049) {
//             console.log('Database does not exist, creating new database');
//             con.destroy(function (err) {
//                 if (err) {
//                     console.log('Dstrpoying connection');
//                     console.log(`${err.errno}: ${err.code}`);
//                 }
//             });
//             // delete con.database;

//             // console.log(con.database);

//             con.connect(function (err) {
//                 if (err) {
//                     console.log('Creating new database...');
//                     console.log(`${err.errno}: ${err.code}`);
//                 }
//             });

//         }
//     }
//     else {
//         // Server exists and credentials are good
//         console.log("Connected to server!");
//     }
// });
