const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const sequelize = require('../config/connection');

router.get('/', (req, res) => {
  console.log(req.session);
  Post.findAll({
      order: [['created_at', 'DESC']], 
      attributes: [
          'id',
          'post_url', 
          'title', 
          'created_at'
      ],
      include: [
          {
              model: Comment,
              attributes: [
                  'id',
                  'comment_text',
                  'post_id',
                  'user_id',
                  'created_at'
              ],
              include: {
                  model: User,
                  attributes: ['username']
              }
          },
          {
          model: User,
          attributes: ['username']
          }
      ]
  })
      .then(dbPostData => {
          const posts = dbPostData.map(post => post.get({ plain: true }));
          // pass a single post object into the homepage template
          res.render('homepage', { 
              posts,
              loggedIn: req.session.loggedIn
          });
      })
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});

//Login Route
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
      res.redirect('/');
      return;
  }

  res.render('login');
});

router.get('/post/:id', (req, res) => {
  Post.findOne({
      where: {
          id: req.params.id
      },
      attributes: ['id', 'post_url', 'title', 'created_at'],
      include: [
          {
              model: Comment,
              attributes: [
                  'id',
                  'comment_text',
                  'post_id',
                  'user_id',
                  'created_at'
              ],
              include: {
                  model: User,
                  attributes: ['username']
              }
          },
          {
          model: User,
          attributes: ['username']
          }
      ]
      })
      .then(dbPostData => {
          if (!dbPostData) {
              res.status(404).json({ message: 'No post found with this id' });
              return;
          }

          const post =dbPostData.get({ plain: true });

          res.render('single-post', { 
              post,
              loggedIn: req.session.loggedIn
          });
      })
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});


module.exports = router;