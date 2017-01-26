const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
// need to bring in models
// const models = require('./models');
// const { Dev, Team } = models;
// same as const Dev = models.Dev; const Team = models.Team
const db = require('./models')


// express static

const devsRouter = require('./routes/devs');
const teamsRouter = require('./routes/teams');
app.use('/teams', teamsRouter);
app.use('/devs', devsRouter);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.use((req, res, next) => {
	const err = new Error('Page not found');
	err.status = 404;
	next(err);
})


app.use((err, req, res, next) => {
	console.error('something broke', err);
	res.status(err.status || 500);
	res.send(err);
})


const PORT = 1337;



db.sync({force: true})
.then(() => {
	console.log('synced the database!');
	app.listen(PORT, () => {
		console.log(`Rocking out on port ${PORT}`)
	})	
})
.catch(console.error);











