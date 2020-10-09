require('dotenv').config();

const path = require('path');
const express = require('express');
// const morgan = require("morgan");
const methodOverride = require('method-override');
const Handlebars = require('handlebars');
const handexphbs = require('express-handlebars');
const {
    allowInsecurePrototypeAccess,
} = require('@handlebars/allow-prototype-access');

const SortMiddleware = require('./app/middlewares/SortMiddleware');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const route = require('./routes');
const db = require('./config/db');

const port = process.env.PORT || 8080;

//Connect to DB
db.connect();
const app = express();

// Template engine
app.engine(
    'hbs',
    handexphbs({
        extname: '.hbs',
        helpers: require('./helpers/hbs'),
        handlebars: allowInsecurePrototypeAccess(Handlebars),
    }),
);
app.set('views', path.join(__dirname, 'resources', 'views'));
app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser(process.env.SESSION_SECRET));

app.use(express.static(path.join(__dirname, 'public')));

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());
app.use(methodOverride('_method'));

app.use(SortMiddleware);

// HTTP logger
// app.use(morgan("combined"));

// Routes init
route(app);

app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}`),
);
