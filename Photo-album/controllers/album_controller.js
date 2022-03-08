

 const debug = require('debug')('books:example_controller');
 const { matchedData, validationResult } = require('express-validator');
 const models = require('../models');


 const index = async (req, res) => {
     const albums = await models.Album.fetchAll();
 
     res.send({
         status: 'success',
         data: {
             albums: albums
         }
     });
 }
 
 

 const show = async (req, res) => {
     const album = await new models.Album({ id: req.params.albumId })
         .fetch();
 
     res.send({
         status: 'success',
         data: album,
     });
 }
 
 
 
const storeAlbum = async (req, res) => {

     const errors = validationResult(req);
     if (!errors.isEmpty()) {
         return res.status(422).send({ status: 'fail', data: errors.array() });
     }
 

     const validData = matchedData(req);
 
     try {
         const album = await new models.Album(validData).save();
         debug("Created new example successfully: %O", album);
 
         res.send({
             status: 'success',
             data: album,
         });
 
     } catch (error) {
         res.status(500).send({
             status: 'error',
             message: 'Exception thrown in database when creating a new album.',
         });
         throw error;
     }
 }

/* STORE A PHOTO IN AN ALBUM */

const storePhoto = async (req, res) => {
    const errors = validationResult(req);
     if (!errors.isEmpty()) {
         return res.status(422).send({ status: 'fail', data: errors.array() });
     }


}


 
    /*
        UPDATE AND ALBUM    
    */

 const updateAlbum = async (req, res) => {
     const albumId = req.params.albumId;
 

     const album = await new models.Album({ id: albumId }).fetch({ require: false });
     if (!example) {
         debug("Album to update was not found. %o", { id: albumId });
         res.status(404).send({
             status: 'fail',
             data: 'Album Not Found',
         });
         return;
     }
 

     const errors = validationResult(req);
     if (!errors.isEmpty()) {
         return res.status(422).send({ status: 'fail', data: errors.array() });
     }
 

     const validData = matchedData(req);
 
     try {
         const updatedAlbum = await album.save(validData);
         debug("Updated album successfully: %O", updatedAlbum);
 
         res.send({
             status: 'success',
             data: album,
         });
 
     } catch (error) {
         res.status(500).send({
             status: 'error',
             message: 'Exception thrown in database when updating a new album.',
         });
         throw error;
     }
 }
 
 module.exports = {
     index,
     show,
     storeAlbum,
     updateAlbum,
     storePhoto,
 }
 