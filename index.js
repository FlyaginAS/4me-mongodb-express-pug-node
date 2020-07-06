const express = require('express');
const fs = require('fs');
const util = require('util');

const readFilePro = util.promisify(fs.readFile);
const writeFilePro = util.promisify(fs.writeFile);

const app = express();

//middlewares
app.use(express.json());

//controllers
const getAllArticles = async (req, res) => {
  const articles = JSON.parse(
    await readFilePro(`${__dirname}/articles.json`, 'utf-8')
  );

  res.status(200).json({
    status: 'success',
    data: {
      articles,
    },
  });
};
const getArticle = async (req, res) => {
  const articles = JSON.parse(
    await readFilePro(`${__dirname}/articles.json`, 'utf-8')
  );
  const article = articles.find((item, index, arr) => {
    if (item.title === req.params.title) return true;
    return false;
  });
  if (!article) {
    return res.status(404).json({
      status: 'fail',
      message: 'not found',
    });
  }
  res.status(200).json({
    status: 'success',
    data: {
      article,
    },
  });
};
const createArticle = async (req, res) => {
  if (!req.body.title || !req.body.author || !req.body.text) {
    return res.status(404).json({
      status: 'fail',
      message: 'you must write title, name and text of article!',
    });
  }
  const article = req.body;
  const articles = JSON.parse(
    await readFilePro(`${__dirname}/articles.json`, 'utf-8')
  );
  if (
    articles.findIndex((item) => {
      return item.title === req.body.title;
    }) > -1
  ) {
    return res.status(404).json({
      status: 'fail',
      message: 'it is dublicate, change title',
    });
  }

  articles.push(article);
  await writeFilePro(`${__dirname}/articles.json`, JSON.stringify(articles));

  res.status(201).json({
    status: 'success',
    data: {
      article,
    },
  });
};
const updateArticle = async (req, res) => {
  const patch = req.body;
  let articles = JSON.parse(
    await readFilePro(`${__dirname}/articles.json`, 'utf-8')
  );
  const article = articles.find((item) => {
    return item.title === req.params.title;
  });
  const index = articles.findIndex((item) => {
    return item.title === req.params.title;
  });
  if (index < 0) {
    return res.status(404).json({
      status: 'fail',
      message: 'not found article with this title',
    });
  }

  let newArticle = { ...article, ...patch };

  articles.splice(index, 1, newArticle);
  await writeFilePro(`${__dirname}/articles.json`, JSON.stringify(articles));

  res.status(201).json({
    status: 'success',
    data: {
      newArticle,
    },
  });
};
const deleteArticle = async (req, res) => {
  const title = req.params.title;
  let articles = JSON.parse(
    await readFilePro(`${__dirname}/articles.json`, 'utf-8')
  );
  const index = articles.findIndex((item) => {
    return item.title === title;
  });
  if (index < 0) {
    return res.status(404).json({
      status: 'fail',
      message: 'not found',
    });
  }
  articles.splice(index, 1);
  await writeFilePro(`${__dirname}/articles.json`, JSON.stringify(articles));
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

//routes
app.route('/api/v1/articles').get(getAllArticles).post(createArticle);
app
  .route('/api/v1/articles/:title')
  .get(getArticle)
  .patch(updateArticle)
  .delete(deleteArticle);

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
