const express = require('express');
const path = require('path');
const collection = require("./config");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set EJS as the view engine
app.set('view engine', 'ejs');


app.use(express.static("public"));

app.get('', (req, res) => {
    res.render('login');
});

app.get('/signup', (req, res) => {
    res.render('signup');
});

// Register user
app.post("/signup", async (req, res) => {
    try {
        // Log the incoming request body
        console.log('Request Body:', req.body);

        // Check if username already exists
        const existingUser = await collection.findOne({ name: req.body.username });
        if (existingUser) {
            
            res.send('Signup wasn\'t successful. Maybe the username is already used.');
        } else {
            // Create a new user object with the raw password
            const data = {
                name: req.body.username,
                password: req.body.password
            };

        //    checking what kind of data been saved in the db 
            console.log('User Data:', data);

            // Save the user data to the db
            const newUser = new collection(data);
            await newUser.save();

            // Log the saved user data
            console.log('Saved User:', newUser);

            // Redirect to the login page after successful signup
            res.redirect('/');
        }
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Server 
const port = 5000;
app.listen(port, () => {
    console.log('Server running on port: ' + port);
});
