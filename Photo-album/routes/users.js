const express = require('express');
const router = express.Router();
const usersController = require('../controllers/album_controller');
const albumValidationRules = require('../validation/example');

/* Get all resources */
router.get('/', usersController.index);

/* Get a specific resource */
router.get('/:albumId', usersController.show);

/* Store a new resource */
router.post('/', albumValidationRules.createRules, usersController.storeAlbum);

/* Update a specific resource */
router.put('/:albumId', albumValidationRules.updateRules, usersController.updateAlbum);



module.exports = router;
