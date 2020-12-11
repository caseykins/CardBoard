require('dotenv').config();
const express = require('express');
const layouts = require('express-ejs-layouts');
const passport = require('./config/ppConfig')
const flash = require('connect-flash');
const isLoggedIn = require('./middleware/isLoggedIn');
const session = require('express-session');

const app = express();

app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(layouts);

app.use(session({
  secret: 'SessionsSuck',
  resave: false,
  saveUninitialized: true,
}))

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/profile', (req, res) => {
  res.render('profile');
});

app.use('/auth', require('./routes/auth'));
app.use('/board', isLoggedIn, require('./routes/board'));

var server = app.listen(process.env.PORT || 3000, ()=> console.log(`🎧You're listening to the smooth sounds of port ${process.env.PORT || 3000}🎧`));

module.exports = server;
