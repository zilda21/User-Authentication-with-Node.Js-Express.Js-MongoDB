# User Authentication with Node.js, Express.js, and MongoDB

This is a simple user authentication application using Node.js, Express.js, and MongoDB. The application includes login and signup functionality with basic validations.



## Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

- Node.js installed on your machine
- MongoDB installed and running on your machine

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/User-Authentication-with-Node.Js-Express.Js-MongoDB.git
    cd User-Authentication-with-Node.Js-Express.Js-MongoDB
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

3. Create a `views` directory with the following files:
    - `login.ejs`
    - `signup.ejs`

   You can use the following basic EJS templates for testing:

   **views/login.ejs**
    ```html
    <!DOCTYPE html>
    <html>
    <head>
        <title>Login</title>
    </head>
    <body>
        <h2>Login</h2>
        <form action="/" method="POST">
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" required><br>
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required><br>
            <button type="submit">Login</button>
        </form>
        <p>Don't have an account? <a href="/signup">Sign up here</a></p>
    </body>
    </html>
    ```

   **views/signup.ejs**
    ```html
    <!DOCTYPE html>
    <html>
    <head>
        <title>Sign Up</title>
    </head>
    <body>
        <h2>Sign Up</h2>
        <form action="/signup" method="POST">
            <label for="username">Username:</label>
            <input type="text" id="username" name="username" required><br>
            <label for="password">Password:</label>
            <input type="password" id="password" name="password" required><br>
            <button type="submit">Sign Up</button>
        </form>
        <p>Already have an account? <a href="/">Login here</a></p>
    </body>
    </html>
    ```

4. Start the server:
    ```bash
    npm start
    ```

5. Open your browser and navigate to `http://localhost:5000` to access the login page.

## Usage

- The application allows users to sign up with a username and password.
- After signing up, users can log in using their credentials.

## Code Explanation

- **configDB.js**: This file contains the Mongoose configuration to connect to the MongoDB database and define the schema for user login details.

    ```javascript
    const mongoose = require("mongoose");

    mongoose.connect("mongodb://localhost:27017/Login-tut", { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log("Database connected Successfully");
        })
        .catch((err) => {
            console.error("Database cannot be connected", err);
        });

    const LoginSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    });

    const collection = mongoose.model("users", LoginSchema);

    module.exports = collection;
    ```

- **index.js**: This file sets up the Express server, configures the view engine, and defines the routes for login and signup.

    ```javascript
    const express = require('express');
    const path = require('path');
    const collection = require("./configDB");

    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    app.set('view engine', 'ejs');

    app.use(express.static("public"));

    app.get('', (req, res) => {
        res.render('login');
    });

    app.get('/signup', (req, res) => {
        res.render('signup');
    });

    app.post("/signup", async (req, res) => {
        try {
            console.log('Request Body:', req.body);

            const existingUser = await collection.findOne({ name: req.body.username });
            if (existingUser) {
                res.send('Signup wasn\'t successful. Maybe the username is already used.');
            } else {
                const data = {
                    name: req.body.username,
                    password: req.body.password
                };

                console.log('User Data:', data);

                const newUser = new collection(data);
                await newUser.save();

                console.log('Saved User:', newUser);

                res.redirect('/');
            }
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    });

    const port = 5000;
    app.listen(port, () => {
        console.log('Server running on port: ' + port);
    });
    ```

## Contributing

Feel free to fork the repository and submit pull requests.

## License

This project is licensed under the MIT License.
