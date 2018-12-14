var express = require('express');
var router = express.Router();
var BlogController = require('../controllers/BlogController.js');

/*
 * GET
 */
router.get('/', BlogController.list);

/*
 * GET
 */
router.get('/:id', BlogController.show);

/*
 * POST
 */
router.post('/', BlogController.create);

/*
 * PUT
 */
router.put('/:id', BlogController.update);

/*
 * DELETE
 */
router.delete('/:id', BlogController.remove);

module.exports = router;
