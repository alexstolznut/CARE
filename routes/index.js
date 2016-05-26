var models = require('../models');

exports.view = function(req, res) {

	models.Message.find({level:0},function(err, mes){
		if (err) res.send(err);
		else res.render('index', {data: mes});
	});

}

