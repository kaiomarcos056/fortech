const sqlite3 = require('sqlite3');
const {open} = require('sqlite');

exports.openDb = () => {
	return open({
		filename: './src/db/database.db',
		driver: sqlite3.Database
	})
}