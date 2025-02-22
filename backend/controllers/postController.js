const Post = require('../models/postModel');

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.getAllPosts();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.addPost = async (req, res) => {
  const { titre, contenu } = req.body;
  try {
    const post = await Post.addPost(titre, contenu);
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: 'Could not create post' });
  }
};

exports.deletePost = async (req, res) => {
  try {
    await Post.deletePost(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Could not delete post' });
  }
};
