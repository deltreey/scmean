'use strict';

var express = require('express');
var controller = require('./repository.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);
router.get('/:id/:branch', controller.showBranch);
router.post('/:id/git-receive/pack', controller.recievePack);
router.get('/:id/info/refs', controller.refs);

module.exports = router;