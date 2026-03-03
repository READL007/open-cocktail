const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const ctrl = require('../controllers/cocktailController');

router.get('/',        ctrl.getAll);
router.get('/:id',     ctrl.getOne);
router.post('/',       upload.single('image'), ctrl.create);
router.put('/:id',     upload.single('image'), ctrl.update);
router.delete('/:id',  ctrl.remove);

module.exports = router;