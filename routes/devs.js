const express = require('express');
const router = express.Router();

const db = require('../models');
const Dev = db.model('dev');

// return an array of all the devs
router.get('/', (req, res, next) => {
	
	Dev.findAll()
	.then((allTehDevs) => {
		res.json(allTehDevs);
	})
	.catch(next)

})

router.get('/:devId', (req, res, next) => {
	
	// same thing
	// Dev.findOne({
	// 	where: {
	// 		id: req.params.devId
	// 	}
	// })

	Dev.findById(req.params.devId)
	.then((dev) => {
		res.json(dev)
	})
	.catch(next)

})

// route for lookup by name
router.get('/name/:name', (req, res, next) => {

	Dev.findByName(req.params.name)
	.then((dev) => {
		// want to send back a message in the res body
	
		const body = {
			message: 'Great success!!!!',
			dev // same as dev: dev
		}

		res.json(body);	
	})
	.catch(next)


})




// I want a thing on dev that is a property and returns a string of 'Hi my name is ___ <-- name'








module.exports = router;
