const express = require('express');
const listEndpoints = require('express-list-endpoints');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const passport = require("passport");

const app = express();

const PORT = 4000;
app.use(passport.initialize());
require("./config/passport")(passport);

// routes
var testAPIRouter = require("./routes/testAPI");
var UserRouter = require("./routes/users.routes");
var JobRouter = require("./routes/job.routes");
var ApplicationRouter = require("./routes/application.routes");
var educatmodel=require("./models/education.model");
app.use(cors());
// Body-Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
// To localhost
mongoose.connect('mongodb://127.0.0.1:27017/JobsPlanet', { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully !");
})

// setup API endpoints
app.use("/testAPI", testAPIRouter);
app.use("/user", UserRouter);
app.use("/job", JobRouter);
app.use("/application", ApplicationRouter);
console.log(listEndpoints(app))
app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
