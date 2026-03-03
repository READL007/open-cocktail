const Cocktail = require('../models/Cocktail');

// GET /cocktails
exports.getAll = async (req, res) => {
  try {
    const cocktails = await Cocktail.findAll();
    res.json(cocktails);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /cocktails/:id
exports.getOne = async (req, res) => {
  try {
    const cocktail = await Cocktail.findByPk(req.params.id);
    if (!cocktail) return res.status(404).json({ error: 'Not found' });
    res.json(cocktail);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /cocktails
exports.create = async (req, res) => {
  try {
    const data = { ...req.body };
    if (req.file) data.image = req.file.path;
    const cocktail = await Cocktail.create(data);
    res.status(201).json(cocktail);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// PUT /cocktails/:id
exports.update = async (req, res) => {
  try {
    const cocktail = await Cocktail.findByPk(req.params.id);
    if (!cocktail) return res.status(404).json({ error: 'Not found' });
    const data = { ...req.body };
    if (req.file) data.image = req.file.path;
    await cocktail.update(data);
    res.json(cocktail);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE /cocktails/:id
exports.remove = async (req, res) => {
  try {
    const cocktail = await Cocktail.findByPk(req.params.id);
    if (!cocktail) return res.status(404).json({ error: 'Not found' });
    await cocktail.destroy();
    res.json({ message: 'Deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};