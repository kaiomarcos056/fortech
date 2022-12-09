const sqlite3 = require('sqlite3');
const {open} = require('sqlite');

exports.openDb = () => {
	return open({
		filename: './api/db/database.db',
		driver: sqlite3.Database
	})
}