const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/userRoutes");
const countryRouter = require("./routes/countryRoutes");
const salesRouter = require("./routes/salesRoutes");
const bodyParser = require('body-parser');

// Start our Express.js server.
// Load mongoose and express by adding the following code to server.js


const app = express();
app.use(express.json());

//support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: true }));

//to coonect to the database uning connect method of mongoose

mongoose.connect('mongodb://127.0.0.1:27017/Access',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS:5000,
    }
);

//make sure your url connection was successfull

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function (){
    console.log("Connected successfully..!");
});

app.use(userRouter);
app.use(countryRouter);
app.use(salesRouter);

app.listen(3001, () =>{
    console.log("Server is running at port 3001");
});

