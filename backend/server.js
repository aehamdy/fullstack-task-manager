const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./database'); // make sure database.js exists

const app = express();
app.use(cors());
app.use(express.json());

const SECRET = 'your_jwt_secret_key'; // change this if you want

// ===== Test route =====
app.get('/', (req, res) => {
  res.send('Backend is working!');
});

// ===== Register =====
app.post('/api/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ message: 'All fields required' });

  const hashedPassword = await bcrypt.hash(password, 10);

  db.run(
    `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`,
    [name, email, hashedPassword],
    function (err) {
      if (err) return res.status(400).json({ message: 'Email already exists' });
      const token = jwt.sign({ id: this.lastID }, SECRET);
      res.json({ user: { id: this.lastID, name, email }, token });
    }
  );
});

// ===== Login =====
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: 'Email and password required' });

  db.get(`SELECT * FROM users WHERE email = ?`, [email], async (err, user) => {
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user.id }, SECRET);
    res.json({ user: { id: user.id, name: user.name, email: user.email }, token });
  });
});

// ===== JWT authentication middleware =====
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// ===== Tasks CRUD =====

// Get all tasks for logged-in user
app.get('/api/tasks', authenticateToken, (req, res) => {
  db.all(`SELECT * FROM tasks WHERE user_id = ?`, [req.user.id], (err, rows) => {
    res.json(rows);
  });
});

// Create a new task
app.post('/api/tasks', authenticateToken, (req, res) => {
  const { title, description } = req.body;
  if (!title) return res.status(400).json({ message: 'Title required' });

  db.run(
    `INSERT INTO tasks (user_id, title, description) VALUES (?, ?, ?)`,
    [req.user.id, title, description || null],
    function (err) {
      db.get(`SELECT * FROM tasks WHERE id = ?`, [this.lastID], (err, task) => {
        res.status(201).json(task);
      });
    }
  );
});

// Update a task
app.put('/api/tasks/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;

  db.run(
    `UPDATE tasks SET title = COALESCE(?, title),
                       description = COALESCE(?, description),
                       status = COALESCE(?, status)
     WHERE id = ? AND user_id = ?`,
    [title, description, status, id, req.user.id],
    function (err) {
      db.get(`SELECT * FROM tasks WHERE id = ?`, [id], (err, task) => {
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.json(task);
      });
    }
  );
});

// Delete a task
app.delete('/api/tasks/:id', authenticateToken, (req, res) => {
  const { id } = req.params;

  db.run(`DELETE FROM tasks WHERE id = ? AND user_id = ?`, [id, req.user.id], function (err) {
    res.json({ message: 'Task deleted successfully' });
  });
});

// ===== Start server =====
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
