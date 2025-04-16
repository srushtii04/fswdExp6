const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

// Mock dataset
let users = [
  { id: 1, name: "Alice" },
  { id: 2, name: "Bob" }
];

//Middleware: Basic Validation
function validateUser(req, res, next) {
  if (!req.body.name) {
    return res.status(400).json({ error: "Name is required" });
  }
  next();
}

//CREATE - POST /users
app.post('/users', validateUser, (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

//READ ALL - GET /users
app.get('/users', (req, res) => {
  res.json(users);
});

//READ ONE - GET /users/:id
app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
});

//UPDATE - PUT /users/:id
app.put('/users/:id', validateUser, (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: "User not found" });

  user.name = req.body.name;
  res.json(user);
});

//DELETE - DELETE /users/:id
app.delete('/users/:id', (req, res) => {
  const index = users.findIndex(u => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: "User not found" });

  const deletedUser = users.splice(index, 1);
  res.json(deletedUser[0]);
});

//Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
