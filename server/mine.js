var router = require('./router.js')
var pool = require('./pool.js')

// menu
// /menu/findall
router.get('/menu/findAll', (req, res) => {
	var sql = 'select * from menu'
	pool.getConnection(function(err, connection) {
		connection.query(sql, (err, data, fields) => {
			if (err) {
				res.status(500).send(err)
			} else {
				res.send(data)
				console.log(data)
			}
			connection.release();
		})
	})
})
// menuSong
router.get('/menuSong/findAll/:id', (req, res) => {
	var sql = 'select * from song where menuId=?'
	pool.getConnection(function(err, connection) {
		connection.query(sql, [req.params.id], (err, data, fields) => {
			if (err) {
				res.status(500).send(err)
			} else {
				res.send(data)
				console.log(data)
			}
			connection.release();
		})
	})
})



module.exports = router