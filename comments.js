// Create web server
const express = require('express');
const app = express();
const PORT = 3000;

// Import Comments model
const Comments = require('./models/comments');

// Import comments data
const commentsData = require('./data/comments');

// GET /comments
app.get('/comments', (req, res) => {
  res.json(commentsData);
});

// GET /comments/:id
app.get('/comments/:id', (req, res) => {
  const id = Number(req.params.id);
  const comment = commentsData.find(comment => comment.id === id);
  res.json(comment);
});

// POST /comments
app.post('/comments', (req, res) => {
  const { body } = req;
  const newComment = Comments.create(body);
  commentsData.push(newComment);
  res.json(newComment);
});

// PUT /comments/:id
app.put('/comments/:id', (req, res) => {
  const id = Number(req.params.id);
  const { body } = req;
  const updatedComment = Comments.update(id, body);
  res.json(updatedComment);
});

// DELETE /comments/:id
app.delete('/comments/:id', (req, res) => {
  const id = Number(req.params.id);
  Comments.delete(id);
  res.json({
    message: 'Comment deleted successfully'
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});