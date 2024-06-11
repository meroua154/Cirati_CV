const express = require('express');
const listEndpoints = require('express-list-endpoints');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const passport = require("passport");

const app = express();

const PORT = 4000;

app.use(cors());

app.use(passport.initialize());

require("./config/passport")(passport);
const jwtMiddleware = (req, res, next) => {
    const noAuthRoutes = [
        /^\/user\/login/,
        // /^\/job\/derniersjobs/,/user/Resetpassword2/:resetToken
        /^\/user\/Resetpassword2\/.*/,
        /^\/ciraticv\/pdfs\/cvs\/.*/,
        /^\/ciraticv\/Images\/coverpic\/.*/,
        /^\/ciraticv\/Images\/profilpic\/.*/,
        /^\/user\/Resetpassword/,
        /^\/user\/register/,
        /^\/user\/verifyemail/
    ];
    const isNoAuthRoute = noAuthRoutes.some(regex => regex.test(req.path));
    if (isNoAuthRoute) {
        return next();
    }
    passport.authenticate('jwt', { session: false })(req, res, next);
};


// Utiliser le middleware pour toutes les routes
app.use(jwtMiddleware)
// Définir les routes

var UserRouter = require("./routes/users.routes");
var JobRouter = require("./routes/job.routes");
var ApplicationRouter = require("./routes/application.routes");
var SponsorRouter=require("./routes/Sponsor.routes")

// Body-Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/ciraticv/Images/profilpic', express.static('images/profilpic'));
app.use('/ciraticv/Images/coverpic' , express.static("images/coverpic"))
app.use('/ciraticv/pdfs/cvs' , express.static("pdfs/cvs"))

// Connecter à MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/JobsPlanet', { 
    useNewUrlParser: true, useUnifiedTopology: true 
});

const connection = mongoose.connection;
connection.once('open', function() {
    console.log("MongoDB database connection established successfully !");
})

// Configurer les endpoints API

app.use("/user", UserRouter);
app.use("/job", JobRouter);
app.use("/application", ApplicationRouter);
app.use("/sponsor", SponsorRouter);
// Afficher les endpoints disponibles
console.log(listEndpoints(app));

// Démarrer le serveur
app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
