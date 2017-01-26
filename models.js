const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/supercooldevteam');

const Dev = db.define('dev', {

	name: {
		type: Sequelize.STRING,
		allowNull: false
	},

	birthday: {
		type: Sequelize.STRING,
		allowNull: false,
		defaultValue: '1900-01-01'
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

})

// each dev instance gets a teamId;
Dev.belongsTo(Team);


// module.exports = { Dev, Team };

module.exports = db;







