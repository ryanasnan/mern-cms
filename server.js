const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const passport = require('passport');
const errorHandler = require('./middlewares/error');
const connectDB = require('./config/db');

const auth = require('./routes/api/auth');
const story = require('./routes/api/story');
const user = require('./routes/api/user');
const { getRandomStory } = require('./controllers/story');
const path = require('path');

// dotenv (for load the environment setting and insert into process.env)
dotenv.config({ path: './config/config.env' });

const app = express();

// Body parser
app.use(express.json());

// Connect to Database
connectDB();

app.use(passport.initialize());

require('./config/passport')(passport);

// dev logging middleware
if (process.env.NODE_ENV == 'development') {
	app.use(morgan('dev'));
}

// if the application deployed, DO NOT using this route, because the path root ('/') must be redirect on /index.html
//app.get('/', (req, res) => res.send('Hello world'));

// Use routes middleware
app.use('/api/auth', auth);
app.use('/api/story', story);
app.use('/api/user', user);
app.get('/api/randomstory', getRandomStory)

app.use(errorHandler);

// if the application deployed('production'), use this to access static page (front end) and to create all the path route redirect on front end html
if (process.env.NODE_ENV === 'production') {
	// to access static page DO NOT use the html file, ext 'client/build/index.html'
	app.use(express.static(path.join(__dirname, 'client/build')));

	// to access in all route path DO NOT use the directory, exp '/client/build'
	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname + '/client/build/index.html'));
	});
}


const port = process.env.PORT || 5000;

const server = app.listen(port, () => console.log(`Server running in ${process.env.NODE_ENV} on port ${port}`));

// Handle unhandled promise rejection
process.on('unhandledRejection', (err, promise) => {
	console.log(`Error ${err.message}`.red);
	// Close server & exit process
	server.close(() => process.exit(1));
})