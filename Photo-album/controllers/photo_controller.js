/**
 * Example Controller
 */

 const debug = require('debug')('books:example_controller');
 const { matchedData, validationResult } = require('express-validator');
 const models = require('../models');
 
 /**
  * Get all resources
  *
  * GET /
  */
 const index = async (req, res) => {
     const all_photos = await models.Photo.fetchAll();
 
     res.send({
         status: 'success',
         data: all_photos,
     });
 }
 
 /**
  * Get a specific resource
  *
  * GET /:exampleId
  */
 const showPhoto = async (req, res) => {
     const photo = await new models.Photo({ id: req.params.photoId })
         .fetch();
 
     res.send({
         status: 'success',
         data: photo,
     });
 }
 
 /**
  * Store a new resource
  *
  * POST /
  */
 const storePhoto = async (req, res) => {
     // check for any validation errors
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
         return res.status(422).send({ status: 'fail', data: errors.array() });
     }
 
     // get only the validated data from the request
     const validData = matchedData(req);
 
     try {
         const example = await new models.Example(validData).save();
         debug("Created new example successfully: %O", example);
 
         res.send({
             status: 'success',
             data: example,
         });
 
     } catch (error) {
         res.status(500).send({
             status: 'error',
             message: 'Exception thrown in database when creating a new example.',
         });
         throw error;
     }
 }
 
 /**
  * Update a specific resource
  *
  * PUT /:exampleId
  */
 const update = async (req, res) => {
     const exampleId = req.params.exampleId;
 
     // make sure example exists
     const example = await new models.Example({ id: exampleId }).fetch({ require: false });
     if (!example) {
         debug("Example to update was not found. %o", { id: exampleId });
         res.status(404).send({
             status: 'fail',
             data: 'Example Not Found',
         });
         return;
     }
 
     // check for any validation errors
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
         return res.status(422).send({ status: 'fail', data: errors.array() });
     }
 
     // get only the validated data from the request
     const validData = matchedData(req);
 
     try {
         const updatedExample = await example.save(validData);
         debug("Updated example successfully: %O", updatedExample);
 
         res.send({
             status: 'success',
             data: example,
         });
 
     } catch (error) {
         res.status(500).send({
             status: 'error',
             message: 'Exception thrown in database when updating a new example.',
         });
         throw error;
     }
 }
 
 const destroy = (req, res) => {
     res.status(400).send({
         status: 'fail',
         message: 'You need to write the code for deleting this resource yourself.',
     });
 }
 
 module.exports = {
     index,
     showPhoto,
     storePhoto,
     update,
     destroy,
 }
 