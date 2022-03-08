const express = require('express');
const router = express.Router();
const albumController = require('../controllers/album_controller');
const albumValidationRules = require('../validation/example');

/* Get all resources */
router.get('/', albumController.index);

/* Get a specific resource */
router.get('/:albumId', albumController.show);

/* Store a new resource */
router.post('/', albumValidationRules.createRules, albumController.storeAlbum);

/* Update a specific resource */
router.put('/:albumId', albumValidationRules.updateRules, albumController.updateAlbum);



module.exports = router;
