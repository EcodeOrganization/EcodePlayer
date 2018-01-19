var mysql = require('mysql')
var pool  = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: 'root',
	port: '3306',
	database: 'music'
})
module.exports = pool