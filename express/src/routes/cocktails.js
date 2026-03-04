const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const ctrl = require('../controllers/cocktailController');
const { authenticate, requireRole } = require('../middleware/auth');

// Public - anyone can read
router.get('/',     ctrl.getAll);
router.get('/:id',  ctrl.getOne);

// Protected - must be logged in
router.post('/',    authenticate, upload.single('image'), ctrl.create);
router.put('/:id',  authenticate, upload.single('image'), ctrl.update);

// Protected + admin role only
router.delete('/:id', authenticate, requireRole('admin'), ctrl.remove);

module.exports = router;