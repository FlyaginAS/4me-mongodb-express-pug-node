const express = require('express');
const morgan = require('morgan');
const articleRouter = require('./routes/articleRoutes');
const userRouter = require('./routes/userRoutes');

//create app***************************************************************
const app = express();

//middlewares*************************************************************
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(`${__dirname}/public`));

//routes*******************************************************************
app.use('/api/v1/articles', articleRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
