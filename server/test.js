const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',      // Change to your MySQL host
  user: 'root',  // Change to your MySQL username
  password: '93ew22es',  // Change to your MySQL password
  database: 'rideShareCarpooling',  // The name of the database you created
});

const tableName = 'users'; // Replace with the actual table name

const dropQuery = `DROP TABLE IF EXISTS ${tableName};`;

connection.query(dropQuery, (err, results) => {
    if (err) {
        console.error('Error dropping table:', err);
    } else {
        console.log('Table dropped successfully');
    }
    connection.end(); // Close the connection
});