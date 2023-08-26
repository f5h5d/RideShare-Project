const express = require("express");
const bodyParser = require("body-parser");
const mysqlConnection = require("./db"); // Import your database connection
const cors = require("cors"); // Import the cors package
const mysql = require('mysql2/promise');

const app = express();
app.use(bodyParser.json());

app.use(cors());

const dbConfig = {
    host: 'localhost', 
    user: 'root',
    password: '93ew22es', 
    database: 'rideShareCarpooling',
}

// Check if email exists in the database
function checkEmailExists(email) {
  return new Promise((resolve, reject) => {
    const selectQuery = "SELECT * FROM users WHERE username = ?";
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

app.post("/api/register", async (req, res) => {
  const { email, password, fullName } = req.body;

  try {
    const emailExists = await checkEmailExists(email);
    if (emailExists) {
      res.json({ message: "Email already exists" });
    } else {
      const insertQuery =
        "INSERT INTO users (username, password, fullName) VALUES (?, ?, ?)";
      mysqlConnection.query(
        insertQuery,
        [email, password, fullName],
        (err, results) => {
          if (err) {
            console.error("Error inserting data:", err);
            res.status(500).json({ error: "Error registering user" });
          } else {
            console.log("User registered successfully");
            res.json({ email, password, fullName }); // Send user data
          }
        }
      );
    }
  } catch (error) {
    console.error("Error checking email:", error);
    res.status(500).json({ error: "Error checking email" });
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const emailExists = await checkEmailExists(email);
    if (emailExists) {
      const selectQuery = "SELECT * FROM users WHERE username = ?";
      mysqlConnection.query(selectQuery, [email], (err, results) => {
        if (err) {
          console.error("Error fetching user data:", err);
          res.status(500).json({ error: "Error fetching user data" });
        } else {
          const user = results[0];
          if (user.password === password) {
            res.json({ message: "Login successful", user });
          } else {
            res.json({ message: "Incorrect password" });
          }
        }
      });
    } else {
      res.json({ message: "Email not found" });
    }
  } catch (error) {
    console.error("Error checking email:", error);
    res.status(500).json({ error: "Error checking email" });
  }
});

app.post("/addRider", async (req, res) => {
  try {
    const { email, fullName, startLocation, endLocation, date, phoneNumber } =
      req.body;

    console.log(email, fullName, startLocation, endLocation, date, phoneNumber);

    const insertQuery = `
            INSERT INTO riders (email, fullName, startLocation, endLocation, date, phoneNumber)
            VALUES (?, ?, ?, ?, ?, ?)
        `;
    mysqlConnection.query(
      insertQuery,
      [email, fullName, startLocation, endLocation, date, phoneNumber],
      (err, results) => {
        if (err) {
          console.error("Error inserting data:", err);
          res.status(500).json({ error: "Error registering user" });
        } else {
          console.log("User registered successfully");
          res.json({
            email,
            fullName,
            startLocation,
            endLocation,
            date,
            phoneNumber,
          }); // Send user data
        }
      }
    );
  } catch (error) {
    console.error("Error adding rider:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/addDriver", async (req, res) => {
  const { email, fullName, startLocation, endLocation, date, phoneNumber, seats } =
    req.body;

  try {
    const insertQuery = `
            INSERT INTO drivers (email, fullName, startLocation, endLocation, date, phoneNumber, seats)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

    mysqlConnection.query(
      insertQuery,
      [email, fullName, startLocation, endLocation, date, phoneNumber, seats],
      (err, results) => {
        if (err) {
          console.error("Error inserting data:", err);
          res.status(500).json({ error: "Error registering user" });
        } else {
          console.log("User registered successfully");
          res.json({
            email,
            fullName,
            startLocation,
            endLocation,
            date,
            phoneNumber,
            seats
          }); // Send user data
        }
      }
    );
  } catch (error) {
    console.error("Error adding rider:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route to fetch drivers' data
app.get('/getDrivers', async (req, res) => {
    try {
        const connection = await mysql.createConnection(dbConfig);

        const selectQuery = `SELECT * FROM drivers`;
        const [rows] = await connection.execute(selectQuery);

        await connection.end();

        res.status(200).json(rows);
    } catch (error) {
        console.error('Error fetching drivers data:', error);
        res.status(500).json({ message: 'Error fetching drivers data' });
    }
});


app.post('/decreaseSeatsByEmail', async (req, res) => {
    const { email } = req.body;

    try {
        const connection = await mysql.createConnection(dbConfig);

        // Update query to decrease seats by one and delete if seats become 0
        const updateQuery = `
            UPDATE drivers
            SET seats = seats - 1
            WHERE email = ?
        `;

        const [result] = await connection.execute(updateQuery, [email]);

        // If seats become 0, delete the data point
        if (result.affectedRows > 0) {
            if (result.changedRows > 0) {
                const deleteQuery = `
                    DELETE FROM drivers
                    WHERE email = ? AND seats = 0
                `;

                await connection.execute(deleteQuery, [email]);
                res.status(200).json({ message: 'Seats decreased and data point deleted successfully' });
            } else {
                res.status(200).json({ message: 'Seats decreased successfully' });
            }
        } else {
            res.status(404).json({ message: 'Driver not found' });
        }

        await connection.end();
    } catch (error) {
        console.error('Error decreasing seats by email:', error);
        res.status(500).json({ message: 'Error decreasing seats' });
    }
});

app.post('/deleteTripByEmail', async (req, res) => {
    const { email } = req.body;

    try {
        const connection = await mysql.createConnection(dbConfig);

        const deleteQuery = `
            DELETE FROM drivers
            WHERE email = ?
        `;

        const [result] = await connection.execute(deleteQuery, [email]);

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Trip deleted successfully' });
        } else {
            res.status(404).json({ message: 'Trip not found' });
        }

        await connection.end();
    } catch (error) {
        console.error('Error deleting trip by email:', error);
        res.status(500).json({ message: 'Error deleting trip' });
    }
});

app.get('/getUserDataByEmail', async (req, res) => {
    const { email } = req.query;

    try {
        const connection = await mysql.createConnection(dbConfig);

        const selectQuery = `
            SELECT * FROM drivers
            WHERE email = ?
        `;

        const [rows] = await connection.execute(selectQuery, [email]);

        await connection.end();

        if (rows.length > 0) {
            res.status(200).json(rows[0]);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error retrieving user data by email:', error);
        res.status(500).json({ message: 'Error retrieving user data' });
    }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
