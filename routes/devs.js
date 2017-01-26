const express = require('express');
const router = express.Router();

const db = require('../models');
const Dev = db.model('dev');

// return an array of all the devs
router.get('/', (req, res, next) => {
	
	res.send('welcome!');
})


module.exports = router;
