const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',      // Change to your MySQL host
    user: 'root',  // Change to your MySQL username
    password: '93ew22es',  // Change to your MySQL password
    database: 'rideShareCarpooling',  // The name of the database you created
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('Connected to MySQL database');
    }
});

module.exports = connection;