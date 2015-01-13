'use strict';

var express = require('express');
var controller = require('./repository.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.get('/:id/HEAD', controller.showHead);
router.get('/:id/info/refs', controller.refs);
router.get('/:id//objects/info/:objectType', controller.objects);
router.get('/:id/objects/pack/:pack', controller.getPack);
router.get('/:id/objects/:group/:object', controller.looseObject);
router.post('/', controller.create);
router.post('/:id/git-upload-pack', controller.uploadPack);
router.post('/:id/git-receive-pack', controller.recievePack);
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);
//router.propfind('/:id', controller.propfind);

module.exports = router;