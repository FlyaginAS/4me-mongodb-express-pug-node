const fs = require('fs');
const util = require('util');

const readFilePro = util.promisify(fs.readFile);
const writeFilePro = util.promisify(fs.writeFile);

exports.getAllArticles = async (req, res) => {
  const articles = JSON.parse(
    await readFilePro(`${__dirname}/../articles.json`, 'utf-8')
  );

  res.status(200).json({
    status: 'success',
    data: {
      articles,
    },
  });
};
exports.getArticle = async (req, res) => {
  const articles = JSON.parse(
    await readFilePro(`${__dirname}/../articles.json`, 'utf-8')
  );
  const article = articles.find((item) => {
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
exports.createArticle = async (req, res) => {
  if (!req.body.title || !req.body.author || !req.body.text) {
    return res.status(404).json({
      status: 'fail',
      message: 'you must write title, name and text of article!',
    });
  }
  const article = req.body;
  const articles = JSON.parse(
    await readFilePro(`${__dirname}/../articles.json`, 'utf-8')
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
  await writeFilePro(`${__dirname}/../articles.json`, JSON.stringify(articles));

  res.status(201).json({
    status: 'success',
    data: {
      article,
    },
  });
};
exports.updateArticle = async (req, res) => {
  const patch = req.body;
  const articles = JSON.parse(
    await readFilePro(`${__dirname}/../articles.json`, 'utf-8')
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

  const newArticle = { ...article, ...patch };

  articles.splice(index, 1, newArticle);
  await writeFilePro(`${__dirname}/../articles.json`, JSON.stringify(articles));

  res.status(201).json({
    status: 'success',
    data: {
      newArticle,
    },
  });
};
exports.deleteArticle = async (req, res) => {
  const { title } = req.params;
  const articles = JSON.parse(
    await readFilePro(`${__dirname}/../articles.json`, 'utf-8')
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
  await writeFilePro(`${__dirname}/../articles.json`, JSON.stringify(articles));
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
