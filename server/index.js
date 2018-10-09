const express = require('express');
const bodyParser = require('body-parser');

const { mongoose } = require('./db/mongoose');
const Todo = require('./models/todo');
const User = require('./models/user');

const app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  let todo = new Todo({
    text: req.body.text
  });
  todo.save().then((document) => {
    res.send(document);  //returning the saved body to the client
  }, e => res.status(400).send(e));
});

app.get('/todos', (req, res) => {
  Todo.find().then( docs => {
    res.send({ todos: docs });  //returning all db results to the client
  }).
  catch( e => res.status(400).send(e));
});

app.listen(3000, () => console.log('Server runing on port 3000.'));

module.exports = { app };
