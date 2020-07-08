const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './config.env' });
const app = require('./app');

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

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'An article must have a title!'],
    unique: true,
  },
  rating: Number,
  author: {
    type: String,
    required: [true, 'An article must have an author!'],
  },
  text: {
    type: String,
    required: [true, 'An article must have a text'],
  },
});

const Article = mongoose.model('Article', articleSchema);

const testArticle = new Article({
  title: 'Learn HTML',
  author: 'Alex',
  text: 'This article about learning html',
});
testArticle
  .save()
  .then((doc) => {
    console.log(doc);
  })
  .catch((err) => {
    console.log(err.message);
  });
