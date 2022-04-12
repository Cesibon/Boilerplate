const express = require('express');

const router = express.Router();

const authentication = require('@app/middlewares/authenticate')
const {isAdmin} = require('@app/middlewares/roles')
const {
  projectMiddleware
} = require('@app/controllers/project.controller')
const {
  systemMiddleware
} = require('@app/controllers/system.controller')


const test = require('./test/index');
const admin = require('./includes/admin');

const auth = require('./includes/auth');
const user = require('./includes/user');
const project = require('./includes/project');
const system = require('./includes/system');
const item = require('./includes/item');
const document = require('./includes/document');
const overview = require('./includes/overview');
const drawing = require('./includes/drawing');
const comment = require('./includes/comment');

const asset = require('./includes/asset');


router.get('/', (req, res) => {
  res.json({
    message: `ALIS API`
  });
});

router.use('/auth', auth);
router.use('/', asset);
/**
 * App routes
 */
router.use('/', authentication, user);
router.use('/', authentication, project);
router.use('/projects/:projectid/', authentication, projectMiddleware, system);
router.use('/projects/:projectid/', authentication, projectMiddleware, item);
router.use('/projects/:projectid/', authentication, projectMiddleware, document);
router.use('/projects/:projectid/', authentication, projectMiddleware, overview);
router.use('/projects/:projectid/', authentication, projectMiddleware, drawing);
router.use('/projects/:projectid/', authentication, projectMiddleware, comment);

router.use('/admin', authentication, isAdmin, admin);
// TESTS
router.use('/test', test);

module.exports = router;