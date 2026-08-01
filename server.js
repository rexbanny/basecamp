const express  = require('express');
const cors     = require('cors');
const session  = require('express-session');
const path     = require('path');
const { initDB } = require('./database');

const app = express();

//Middleware:
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'views')));
app.use(session({
    secret: 'basecamp-secret-key-2024',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, httpOnly: true }
}));

//Routes:
app.use('/',         require('./routes/authRoutes'));
app.use('/projects', require('./routes/projectRoutes'));
app.use('/admin',    require('./routes/adminRoutes'));

//Start:
initDB().then(() => {
    app.listen(3000, () => console.log('Server running at http://localhost:3000'));
});
