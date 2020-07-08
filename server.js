const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './config.env' });
const app = require('./app');
const Article = require('./models/articleModel');

//**************************************************************************
//connecting to the DB
const DB = process.env.DB_URL.replace('<password>', `${process.env.DB_PASS}`);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    // eslint-disable-next-line no-console
    console.log('DB connection successfull');
  });

//**************************************************************************
//run server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`App running on port ${port}`);
});

//my code with models

Article.create({
  title: 'PUG about',
  author: 'Alexander',
  text: 'about pug',
}).then((doc) => {
  console.log(doc);
});
