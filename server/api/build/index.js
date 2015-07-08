'use strict';

var express = require('express');
var controller = require('./build.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.hasRole('dev') || auth.hasRole('admin'), controller.index);
router.get('/:id', auth.hasRole('dev') || auth.hasRole('admin'), controller.show);
router.get('/:id/execute', auth.hasRole('dev') || auth.hasRole('admin'), controller.execute);
router.post('/', auth.hasRole('admin'), controller.create);
router.put('/:id', auth.hasRole('admin'), controller.update);
router.patch('/:id', auth.hasRole('admin'), controller.update);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);

module.exports = router;
