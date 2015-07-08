'use strict';

var express = require('express');
var controller = require('./repository.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.get('/:repo/hooks', auth.isAuthenticated(), controller.getHooks);
router.post('/', auth.hasRole('dev') || auth.hasRole('admin'), controller.create);
router.post('/:repo/hooks', auth.hasRole('dev') || auth.hasRole('admin'), controller.createHook);
router.put('/:repo/hooks/:hook', auth.hasRole('admin'), controller.updateHook);
router.delete('/:repo/hooks/:hook', auth.hasRole('admin'), controller.destroyHook);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);

module.exports = router;
