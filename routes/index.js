var express = require('express');
var router = express.Router();
var controllers = require('../controllers/controls.js');


router.get('/statPub', controllers.statPubGET);

router.get('/', controllers.homeGET);

router.get('/publicStat/:channelID', controllers.publicStatChannelID_GET);

router.post('/statPub', controllers.statPubPOST)

router.post('/searchChannel', controllers.searchChannelPOST)

module.exports = router;
