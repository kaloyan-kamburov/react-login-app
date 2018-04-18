const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

const passportInstance = require('./config/passport')(passport)

global.__basedir = __dirname;

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
const User = require('./models/user');

const app = express();

const users = require('./routes/users');
const products = require('./routes/products')
const admin = require('./routes/admin')
const categories = require('./routes/categories')

//port Number
const port = 8080;
 
// CORS middleware
app.use(cors());

//set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

//passport middleware
app.use(passportInstance.initialize());
app.use(passportInstance.session());


require('./config/passport')(passportInstance);

app.use('/users', users);
app.use('/products', products);
app.use('/admin', admin);
app.use('/categories', categories);
app.use('/', (req, res, send) => {
    res.end()
});



//Index route 
// app.get('/', (req, res) => {
//     res.send('invalid endpoint');
// });

//start server
app.listen(port, () => {
    console.log('Server started on port ' + 8080);
}); 
