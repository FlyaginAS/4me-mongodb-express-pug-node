const express = require('express');
const fs = require('fs');

const app = express();
app.use(express.json());

app.get('/api/v1/articles', (req, res) => {
  const articles = JSON.parse(fs.readFileSync(`${__dirname}/articles.json`));

  res.status(200).json({
    status: 'success',
    data: {
      articles,
    },
  });
});

app.get('/api/v1/articles/:x/:y/:z?', (req, res) => {
  console.log(req.params);
  const articles = JSON.parse(fs.readFileSync(`${__dirname}/articles.json`));

  res.status(200).json({
    status: 'success',
    data: {
      articles,
    },
  });
});

app.post('/api/v1/articles', (req, res) => {
  const article = req.body;
  const articles = JSON.parse(fs.readFileSync(`${__dirname}/articles.json`));

  articles.push(article);
  fs.writeFileSync(`${__dirname}/articles.json`, JSON.stringify(articles));

  res.status(201).json({
    status: 'success',
    data: {
      article,
    },
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
