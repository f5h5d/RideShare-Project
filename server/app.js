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



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
