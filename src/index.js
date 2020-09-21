const path = require('path');
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const handexphbs = require('express-handlebars');
const expressValidator = require('express-validator');
const expressSession = require('express-session');
const port = process.env.PORT || 3000;

const SortMiddleware = require('./app/middlewares/SortMiddleware');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const route = require('./routes');
const db = require('./config/db');

//Connect to DB
db.connect();
const app = express();

// Template engine
app.engine(
    'hbs',
    handexphbs({
        extname: '.hbs',
        helpers: require('./helpers/hbs'),
    }),
);
app.set('views', path.join(__dirname, 'resources', 'views'));
app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(expressValidator());

app.use(cookieParser('tontondeptrai'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(
    expressSession({ secret: 'max', saveUninitialized: false, resave: false }),
);
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
