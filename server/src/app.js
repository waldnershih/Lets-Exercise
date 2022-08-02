const express = require('express');
const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');
const helmet = require('helmet');
const LocalStrategy = require('passport-local');
const passportConfigJWT = require('./config/passport');
const User = require('./models/collections/users');
const { errorHandler } = require('./utils/error');
const api = require('./routes');
const app = express();

app.use(
	cors({
		origin: 'http://localhost:3000',
	}),
);
app.use(morgan('combined'));
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(passport.initialize());

passport.use(
	new LocalStrategy(
		{
			usernameField: 'email',
		},
		User.authenticate(),
	),
);
passportConfigJWT(passport);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(helmet());

app.use('/v1', api);

app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.use((err, req, res, next) => {
	errorHandler(err, res, req);
});

module.exports = app;
