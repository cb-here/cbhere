const express = require('express');
const passport = require('passport');
const upload = require('../server');

const {homepage, about, createProject, createProjectPage} = require('../controller/home.controller');

const router = express.Router();

router.get('/', homepage);
router.get('/about', about);
router.post('/', upload.single('projectImage'), createProject);
router.get('/new-project', passport.authenticate('local', {session: false}), createProjectPage);

module.exports = router;