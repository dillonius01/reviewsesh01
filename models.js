const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/supercooldevteam');

const Dev = db.define('dev', {

	name: {
		type: Sequelize.STRING,
		allowNull: false,
		unique: true
	},


	// when we access birthday, we want it as a string formatted like this: '1900/01/01'
	birthday: {
		type: Sequelize.STRING,
		allowNull: false,
		defaultValue: '1900-01-01',
		get: function() {
			// the this context IS INDEED the instance
			return this.getDataValue('birthday').split('-').join('/')
		}
	},

	health: {
		type: Sequelize.INTEGER,
		defaultValue: 100,
		allowNull: false,
		validate: {
			min: 0,
			max: 125
		}
	}
}, {

	classMethods: {

		findByName: function(name) {
			return Dev.findOne({
				where: {
					name: name
				}
			})
		}

	},

	// a greeting is a virtual property, so it is accessed LIKE and object property
	// GOOD: someDevInstance.greeting
	// BAD: someDevInstance.greeting() <-- NONONONONONONO

	getterMethods: {

		greeting: function() {
			// the this context is a row in the table!
			return `Hi my name is ${this.name} and I am so cool`;
		}

		// could also define the custom birthday formatting here
		// reFormattedBirthday: function() {
		// 	return this.getDataVale('birthday').split('-').join('/')
		// }

	}

})




const Team = db.define('team', {

	name: {
		type: Sequelize.STRING,
		allowNull: false
	},

	mission: {
		type: Sequelize.STRING,
		allowNull: false
	}

}, {


	// after a team is added, log out the name of the team that was created

	hooks: {

		afterCreate: function(team) {

			console.log('team that was just created', team)

		}

	}


})

// each dev instance gets a teamId;
Dev.belongsTo(Team, {as: 'cohort'});

// can a team have many developers? do we need to do anything else???
// ---> YES a team can have many developers because the cohortId is on the dev.

// what other methods does a Dev instance get?
/*

	devInstance.getTeam()
	devInstance.setTeam()

*/



// module.exports = { Dev, Team };

module.exports = db;







