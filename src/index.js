const path = require('path');
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const handexphbs = require('express-handlebars');

const route = require('./routes');
const db = require('./config/db');
// const { cpuUsage } = require("process");

// const passport = require("passport");
// const flash = require("express-flash");
// const session = require("express-session");

//Connect to DB
db.connect();

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(
    express.urlencoded({
        extended: false,
    }),
);
app.use(express.json());
app.use(methodOverride('_method'));

// HTTP logger
// app.use(morgan("combined"));

// Template engine
app.engine(
    'hbs',
    handexphbs({
        extname: '.hbs',
        helpers: {
            sum: (a, b) => a + b,
        },
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Routes init
route(app);

// app.use(flash());
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//   })
// );
// app.use(passport.initialize());
// app.use(passport.session());

app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`),
);
