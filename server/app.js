const express = require('express');
const bodyParser = require('body-parser');
const mysqlConnection = require('./db'); // Import your database connection
const cors = require('cors'); // Import the cors package

const app = express();
app.use(bodyParser.json());

app.use(cors());

// Check if email exists in the database
function checkEmailExists(email) {
    return new Promise((resolve, reject) => {
        const selectQuery = 'SELECT * FROM users WHERE username = ?';
        mysqlConnection.query(selectQuery, [email], (err, results) => {
            if (err) {
                reject(err);
            } else {
                if (results.length > 0) {
                    resolve(true); // Email exists
                } else {
                    resolve(false); // Email does not exist
                }
            }
        });
    });
}

app.post('/api/register', async (req, res) => {
    const { email, password, postalCode } = req.body;

    try {
        const emailExists = await checkEmailExists(email);
        if (emailExists) {
            res.json({ message: 'Email already exists' });
        } else {
            const insertQuery = 'INSERT INTO users (username, password, postal_code) VALUES (?, ?, ?)';
            mysqlConnection.query(insertQuery, [email, password, postalCode], (err, results) => {
                if (err) {
                    console.error('Error inserting data:', err);
                    res.status(500).json({ error: 'Error registering user' });
                } else {
                    console.log('User registered successfully');
                    res.json({ email, password, postalCode }); // Send user data
                }
            });
        }
    } catch (error) {
        console.error('Error checking email:', error);
        res.status(500).json({ error: 'Error checking email' });
    }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
      const emailExists = await checkEmailExists(email);
      if (emailExists) {
          const selectQuery = 'SELECT * FROM users WHERE username = ?';
          mysqlConnection.query(selectQuery, [email], (err, results) => {
              if (err) {
                  console.error('Error fetching user data:', err);
                  res.status(500).json({ error: 'Error fetching user data' });
              } else {
                  const user = results[0];
                  if (user.password === password) {
                      res.json({ message: 'Login successful', user });
                  } else {
                      res.json({ message: 'Incorrect password' });
                  }
              }
          });
      } else {
          res.json({ message: 'Email not found' });
      }
  } catch (error) {
      console.error('Error checking email:', error);
      res.status(500).json({ error: 'Error checking email' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
