var BlogModel = require('../models/BlogModel.js');

/**
 * BlogController.js
 *
 * @description :: Server-side logic for managing Blogs.
 */
module.exports = {

  /**
   * BlogController.list()
   */
  list: function(req, res) {
    BlogModel.find(function(err, Blogs) {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting Blog.',
          error: err
        });
      }
      return res.json(Blogs);
    }).sort([
      ['_id', -1]
    ]);
  },

  /**
   * BlogController.show()
   */
  show: function(req, res) {
    var id = req.params.id;
    BlogModel.findOne({
      _id: id
    }, function(err, Blog) {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting Blog.',
          error: err
        });
      }
      if (!Blog) {
        return res.status(404).json({
          message: 'No such Blog'
        });
      }
      return res.json(Blog);
    });
  },

  /**
   * BlogController.create()
   */
  create: function(req, res) {
    var Blog = new BlogModel({
      title: req.body.title,
      content: req.body.content,
      aurthor: req.body.aurthor

    });

    Blog.save(function(err, Blog) {
      if (err) {
        return res.status(500).json({
          message: 'Error when creating Blog',
          error: err
        });
      }
      return res.status(201).json(Blog);
    });
  },

  /**
   * BlogController.update()
   */
  update: function(req, res) {
    var id = req.params.id;
    BlogModel.findOne({
      _id: id
    }, function(err, Blog) {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting Blog',
          error: err
        });
      }
      if (!Blog) {
        return res.status(404).json({
          message: 'No such Blog'
        });
      }

      Blog.title = req.body.title ? req.body.title : Blog.title;
      Blog.content = req.body.content ? req.body.content : Blog.content;
      Blog.aurthor = req.body.aurthor ? req.body.aurthor : Blog.aurthor;

      Blog.save(function(err, Blog) {
        if (err) {
          return res.status(500).json({
            message: 'Error when updating Blog.',
            error: err
          });
        }

        return res.json(Blog);
      });
    });
  },

  /**
   * BlogController.remove()
   */
  remove: function(req, res) {
    var id = req.params.id;
    BlogModel.findByIdAndRemove(id, function(err, Blog) {
      if (err) {
        return res.status(500).json({
          message: 'Error when deleting the Blog.',
          error: err
        });
      }
      return res.status(204).json();
    });
  }
};