const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const pport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

const passport = require('./config/passport')(pport)


//connect to db
mongoose.connect(config.database);

//on connection
mongoose.connection.on('connected', () => {
    console.log('connected to database ' + config.database); 
});

//on error
mongoose.connection.on('error', (err) => {
    console.log('db error: ' + err);
});

const app = express();

const users = require('./routes/users');
const products = require('./routes/products')

//port Number
const port = 8080;
 
// CORS middleware
app.use(cors());

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Body parser middlewaref
app.use(bodyParser.json());

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);
app.use('/products', products);

//Index route 
app.get('/', (req, res) => {
    res.send('invalid endpoint');
});

//start server
app.listen(port, () => {
    console.log('Server started on port ' + 8080);
}); 
