const connection = require('./db'); // Adjust the path if needed

const userData = {
    username: 'user123',
    password: 'securepassword',
    ip_address: '123.456.789.0'
};

const insertQuery = 'INSERT INTO users SET ?';

connection.query(insertQuery, userData, (err, results) => {
    if (err) {
        console.error('Error inserting data:', err);
    } else {
        console.log('User data inserted successfully');
    }
    connection.end(); // Close the connection
}); 