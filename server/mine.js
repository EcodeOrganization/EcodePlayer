var router = require('./router.js')
var pool = require('./pool.js')
var fs = require("fs");
var multipart = require('connect-multiparty')
var multipartMiddleware = multipart()

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

// /user/findOne
router.get('/user/findOne', (req, res) => {
	var sql = 'select * from user where name=? and password=?'
	pool.getConnection(function(err, connection) {
		connection.query(sql, [req.query.name, req.query.password], (err, data, fields) => {
			if (err) {
				res.status(500).send(err)
			} else {
				res.send(data[0])
				console.log(data)
			}
			connection.release();
		})
	})
})
// 批量
router.get('/song/mutiple', (req, res) => {
	var sql = 'update song set image=? where menuId=?'
	pool.getConnection(function(err, connection) {
		connection.query(sql, [req.query.image, req.query.munuId], (err, data, fields) => {
			if (err) {
				console.log(err)
				res.status(500).send(err)
			} else {
				res.send(data)
				console.log(data)
			}
			connection.release();
		})
	})
})
// /user/edit
router.put('/user/edit', (req, res) => {
	var sql = 'update user set name=?, password=?, sign=?, avatar=? where id=?'
	pool.getConnection(function(err, connection) {
		connection.query(sql, [req.body.name, req.body.password, req.body.sign, req.body.avatar, req.body.id], (err, data, fields) => {
			if (err) {
				console.log(err)
				res.status(500).send(err)
			} else {
				res.send(data[0])
				console.log(data)
			}
			connection.release();
		})
	})
})

// registered
router.post('/user/add', (req, res) => {
	var sql = 'insert into user values(null, ?, "staff", ?, "一切都是最好的安排", "static/img/avatar.png", null)'
	pool.getConnection((err, connection) => {
		connection.query('select * from user where name=?', [req.body.name], (err, result) => {
			if (result.length > 0) {
				res.status(500).send({errMsg: '该昵称已存在，请取一个独一无二的哦'})
			} else {
				connection.query(sql, [req.body.name, req.body.password], (err, data) => {
					if (err) {
						res.send(err)
					} else {
						res.send(data)
					}
					connection.release()
				})
			}
		})
	}) 
})
// 上传商品封面图片
router.post('/img/menucover', multipartMiddleware, function (req, res) {
  let nowDate = new Date();
  // console.log(req.files[0]);  // 上传的文件信息
  console.log(req.files.image);  // 上传的文件信息

  // var des_file = __dirname + "/tmp/img/" + nowDate.getTime() + req.files[0].originalname;
  var des_file = "../static/avatar/" + nowDate.getTime() + req.files.image.originalFilename;
  fs.readFile( req.files.image.path, function (err, data) {
    fs.writeFile(des_file, data, function (err) {
      if( err ){
        console.log( err );
      } else {
        response = {
          message:'File uploaded successfully', 
          filename:nowDate.getTime() + req.files.image.originalFilename
        };
      }
      console.log( response.filename );
      res.status(200).send({filename: response.filename});
    });
  });
})


module.exports = router