const express = require('express');
const app = express();
const port = 3000;
const ejs = require("ejs");
const mongoose = require('mongoose');

app.set('view engine', 'ejs');
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static('public'))

mongoose.connect('mongodb://localhost:27017/wikiDB');
const articleSchemma = new mongoose.Schema({
    title: String,
    content: String
});
const Article = mongoose.model('article', articleSchemma);

app.route('/articles').get(function (req, res) {
    Article.find({}, function (err, resp) {
        if (!err) res.send(resp);
        else res.send(err);
    });
}).post(function (req, res) {
    const article = new Article({
        title: req.body.title,
        content: req.body.content
    });
    article.save(function (err, resp) {
        if (!err) res.send(resp);
        else res.send(err);
    })
}).delete(function (req, res) {
    Article.deleteMany(function (err, resp) {
        if (!err) res.send(resp);
        else res.send(err);
    })
});

app.route('/articles/:articleTitle')
    .get((req, res) => {
        articleTitle = req.params.articleTitle;
        Article.findOne({
            title: articleTitle
        }, function (err, resp) {
            if (!err) res.send(resp);
            else res.send(err);
        })
    })
    .put((req, res) => {
        Article.replaceOne({
            title: req.params.articleTitle
        }, {
            title: req.body.title
        }, function (err, resp) {
            if (!err) res.send(resp);
            else res.send(err);
        })
    })
    .patch((req, res) => {
        Article.updateOne({
            title: req.params.articleTitle
        }, {
            title: req.body.title
        }, function (err, resp) {
            if (!err) res.send(resp);
            else res.send(err);
        })
    }).delete(function (req, res) {
        Article.deleteOne({
                title: req.params.articleTitle
            },
            function (err, resp) {
                if (!err) {
                    res.send(resp);
                } else {
                    res.send(err);
                }
            }
        );
    });


app.listen(port, () => {
    console.log("server is running on port %d", port);
})