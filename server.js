const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStategy = require('passport-local').Strategy;
const User = require('./models/User');
const multer = require('multer');
require('dotenv').config();

const DB_URI = process.env.DB_URI;

const app = express();
app.set('view engine', 'ejs');

(async () => {
    try {
        mongoose.connect(DB_URI);
        console.log("Connection established");
    } catch(error) {
        console.log("Error: " + error.message);
    }
}) ();


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads'); 
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Unique filename
    }
});

const upload = multer({ storage });
module.exports = upload;

app.use('/uploads', express.static('uploads')); 

passport.use(new LocalStategy(async (USERNAME, password, done) =>  {
    try {
        const user = await User.findOne({username: USERNAME});
        if (!user) {
            return done(null, false, {message: 'Incorrect Username'});
        }
        const isPasswordMatch = user.password == password ? true : false;
        if (isPasswordMatch) {
            return done(null, user);
        } else {
            return done(null, false, {message: 'Incorrect password'});
        }
    } catch(error) {
        return done(err);
    }
}))

app.use(passport.initialize());


app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));

// routes

app.use('/', require('./routes/home.route'));


const PORT = 8081;

app.listen(PORT, () => {
    console.log("Server is runnning now.....");
})