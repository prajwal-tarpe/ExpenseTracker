require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const AuhtRouter = require('./Routes/AuthRouter');
const ExpenseRouter = require('./Routes/ExpenseRouter');
const EnsureAuthenticated = require('./Middlewares/Auth');
require('./Models/db')

const app = express();

const PORT = process.env.PORT || 8081;

app.use(bodyParser.json());
app.use(cors());
app.use('/auth', AuhtRouter );
app.use('/expenses', EnsureAuthenticated, ExpenseRouter);

app.listen(PORT, () => {
    console.log(`Server started at PORT: ${PORT}`)
});