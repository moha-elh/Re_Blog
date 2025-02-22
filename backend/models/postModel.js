const pool = require('../db');

async function getAllPosts() {
  const result = await pool.query('SELECT * FROM Poste ORDER BY date_creation DESC');
  return result.rows;
}

async function addPost(titre, contenu) {
  const result = await pool.query(
    'INSERT INTO Poste (titre, date_creation, contenu) VALUES ($1, NOW(), $2) RETURNING *',
    [titre, contenu]
  );
  return result.rows[0];
}

async function deletePost(id) {
  await pool.query('DELETE FROM Poste WHERE id_p = $1', [id]);
}

module.exports = { getAllPosts, addPost, deletePost };
