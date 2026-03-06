import express from 'express';
import { createServer as createViteServer } from 'vite';
import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Initialize Database
const db = new Database('todos.db');
db.exec(`
  CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT NOT NULL,
    completed BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get('/api/todos', (req, res) => {
    const todos = db.prepare('SELECT * FROM todos ORDER BY created_at DESC').all();
    res.json(todos.map((t: any) => ({ ...t, completed: !!t.completed })));
  });

  app.post('/api/todos', (req, res) => {
    const { text } = req.body;
    if (!text) return res.status(400).json({ error: 'Text is required' });
    
    const stmt = db.prepare('INSERT INTO todos (text, completed) VALUES (?, 0)');
    const info = stmt.run(text);
    const newTodo = db.prepare('SELECT * FROM todos WHERE id = ?').get(info.lastInsertRowid) as any;
    
    res.json({ ...newTodo, completed: !!newTodo.completed });
  });

  app.put('/api/todos/:id', (req, res) => {
    const { id } = req.params;
    const { completed } = req.body;
    
    const stmt = db.prepare('UPDATE todos SET completed = ? WHERE id = ?');
    stmt.run(completed ? 1 : 0, id);
    
    const updatedTodo = db.prepare('SELECT * FROM todos WHERE id = ?').get(id) as any;
    res.json({ ...updatedTodo, completed: !!updatedTodo.completed });
  });

  app.delete('/api/todos/:id', (req, res) => {
    const { id } = req.params;
    db.prepare('DELETE FROM todos WHERE id = ?').run(id);
    res.json({ success: true });
  });

  app.get('/api/stats', (req, res) => {
    const total = db.prepare('SELECT COUNT(*) as count FROM todos').get() as any;
    const completed = db.prepare('SELECT COUNT(*) as count FROM todos WHERE completed = 1').get() as any;
    const pending = db.prepare('SELECT COUNT(*) as count FROM todos WHERE completed = 0').get() as any;
    
    res.json({
      total: total.count,
      completed: completed.count,
      pending: pending.count
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production static file serving
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
