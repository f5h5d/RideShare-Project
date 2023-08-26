const connection = require('./db'); // Adjust the path if needed

const createTableQuery = `
    CREATE TABLE IF NOT EXISTS drivers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        fullName VARCHAR(255) NOT NULL,
        startLocation VARCHAR(30) NOT NULL,
        endLocation VARCHAR(30) NOT NULL,
        date VARCHAR(40) NOT NULL,
        phoneNumber VARCHAR(15) NOT NULL,
        seats VARCHAR(50) NOT NULL
    )
`;

connection.query(createTableQuery, (err, results) => {
    if (err) {
        console.error('Error creating table:', err);
    } else {
        console.log('Table created successfully');
    }
    connection.end(); // Close the connection
});