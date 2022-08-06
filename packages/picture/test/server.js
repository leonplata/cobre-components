const express = require('express');
const app = express();
const port = 3100

const delay = function (req, res, next) {
  if (req.url.match(/.placeholder.(jpg|jpeg|png|svg|gif)$/ig) === null) {
    setTimeout(next, Math.ceil(Math.random() * 5000));
  } else {
    next();
  }
};

app.use(delay, express.static(__dirname + '/assets'));

app.listen(port, () => console.log(`Listening at http://localhost:${port}`))