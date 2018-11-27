'use strict'

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const ejs = require('ejs')

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, user, admin_secret");
  next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view', 'view');
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/view/index.html');
})
app.get('/pdf-js/jspdf.min.js', (req, res) => {
  res.sendFile(__dirname + '/pdf-js/jspdf.min.js');
});
app.get('/js/index.js', (req, res) => {
  res.sendFile(__dirname + '/view/js/index.js');
})

module.exports = app;
