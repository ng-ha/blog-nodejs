require('dotenv').config();
const path = require('path');
const express = require('express');
const handlebars = require('express-handlebars');
const morgan = require('morgan');
const methodOverride = require('method-override');
const sortMiddleWare = require('./app/middlewares/sortMiddleware');

const app = express();
const port = 3000;

const route = require('./routes');

const db = require('./config/db');
// connect to DB
db.connect();

app.use(express.static(path.join(__dirname, '/public')));

// use middleware
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.use(methodOverride('_method'));

app.use(sortMiddleWare);

// HTTP logger
app.use(morgan('dev'));

// Template engine
app.engine(
  'hbs',
  handlebars.engine({
    extname: '.hbs',
    helpers: require('./helpers/handlebars'),
  })
);
app.set('view engine', 'hbs');

// c1:
// app.set("views", "./src/resources/views");
// c2:
app.set('views', path.join(__dirname, 'resources', 'views'));

// route
route(app);

// 127.0.0.1 - localhost
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
