// set up ======================================================================
var express = require('express');
var app = express();
var mongoose = require('mongoose'); 				// mongoose for mongodb
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

const dotenv = require('dotenv');                       //.env property loader
dotenv.config();
var port = process.env.PORT || 8080; 				   // set the port if not present in .env

// configuration ===============================================================
//db
mongoose.connect(process.env.MONGO_REMOTE_URI,
    { useNewUrlParser: true }, (err) => {
        console.log('mongodb connected', err);
    })
// Middleware ================================================================
app.use(express.static('./public')); 		// set the static files location /public/img will be /img for users
app.use(morgan('dev'));                     // log every request to the console
app.use(bodyParser.urlencoded({ 'extended': 'true' })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                 // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride('X-HTTP-Method-Override'));      // override with the X-HTTP-Method-Override header in the request


// routes ======================================================================
require('./app/router/routes.js')(app);

// listen (start app with node server.js) ======================================
app.listen(port);
console.log("App listening on port " + port);
