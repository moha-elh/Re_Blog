const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// PostgreSQL Connection
const pool = new Pool({
  user: 'postgres',          
  host: 'localhost',
  database: 'blog',          
  password: 'moha',  
  port: 5432
});

// Routes
app.get('/posts', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Poste ORDER BY date_creation DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.post('/posts', async (req, res) => {
  const { titre, contenu } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO Poste (titre, contenu) VALUES ($1, $2) RETURNING *',
      [titre, contenu]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.delete('/posts/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM Poste WHERE id_p = $1', [id]);
    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

// Start the server
app.listen(5000, () => {
  console.log('Server running at http://localhost:5000');
});
