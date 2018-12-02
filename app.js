//imports
const mongoose = require('mongoose');
const express = require('express');
const pug = require('pug');
const bodyParser = require('body-parser');
const path = require('path');
const request = require('request');
const cheerio = require('cheerio');
const Article = require('./models/article');

//initializes express
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));

//connects to mlab database
mongoose.connect("mongodb://admin:password1@ds123444.mlab.com:23444/hackathon", {useNewUrlParser: true}).then(() =>
{
  console.log("Hackathon database has been connected to!");
});

//------------------------------- Scrapper -------------------------------
const data = [{
  method: 'GET',
  url: 'https://www.nytimes.com/search?query=trump'
}];

let articleInfo = { NYT : []}

request(data[0], (err, res, body) => {
  let $ = cheerio.load(body);
  let i = 10;
  let flag = true;
  while(flag) {
    let link = "https://www.nytimes.com";
    let title = $("a").eq(i).children('h4').text().trim();
    if(title === "" || title === "Have search feedback? Let us know what you think.") {
      flag = false
    }
    else {
      link += $("a").eq(i).attr('href').trim();
      let tag = $("a").eq(i).prev().text().trim();
      let individualArticle = {title : title, link : link, tag : tag};
      articleInfo.NYT.push(individualArticle);
      Article.findOne({title : title}, (error, article) => {
        if(error) {
          res.send(error);
        }
        console.log(article)
        if(article == null) {
          const article = new Article({
            title : title,
            link : link,
            tag : tag.trim(),
            publication : "NYT"
          });
          article.save((error, article) => {
            if(error) {
              res.send(error)
            }
            console.log("Succesful!");
          });
        }
      });
      i++;
    }
  }
});


//------------------------------------------------------------------------

let publications = [{id : "NYT", title : "New York Times"}];

//get request for the default page
app.get('/', (req, res) => {
  res.render('home', {title : "Home"});
});

//get request for a certain publication
app.get('/:publication', (req, res, next) => {
  for(var i = 0; i < publications.length; i++) {
    if(publications[i].id === req.params.publication.toUpperCase()) {
    Article.find({publication : req.params.publication.toUpperCase()}, (error, articles) => {
      if(error) {
        console.log(error)
      }
      console.log(articles);
      if(articles != null) {
        res.render('news', {title : "New York Times", articles : articles});
      }
      next();
    });
  }
}
});

app.post('/:publication', (req, res) => {
  for(var i = 0; i < publications.length; i++) {
    if(publications[i].id === req.params.publication.toUpperCase()) {
    Article.find({publication : req.params.publication.toUpperCase(), tag : req.body.form_tag }, (error, articles) => {
      console.log(req.body.form_tag);
      if(error) {
        console.log(error)
      }
      console.log(articles);
      if(articles != null) {
        res.render('news', {title : "New York Times", articles : articles});
      }
    });
  }
}
});

//fires if the user enters an incorrect url
app.get('/*', (req, res) => {
  res.render('error', {title : "Error", error : "Error: URL is not valid!"});
});

app.listen(80, () => console.log("Server is running!"));
