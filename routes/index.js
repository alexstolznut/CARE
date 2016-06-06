var models = require('../models');

exports.view = function(req, res) {
	if(req.user)
	{
	models.Message.find({level:0},function(err, mes){
		if (err) res.send(err);
		else {
			if(req.user) res.render('index', {data: mes, user:req.user});
			else res.render('index', {data:mes, user: "Guest"});
		};
	});
}
	else
	{
		res.redirect("/");
	}

}

exports.topics = function(req, res) {
	if(req.user)
	{
	models.Message.find({facebookID:req.user.id, level: 0},function(err, mes){
		if (err) res.send(err);
		else {
			if(req.user) res.render('topic', {data: mes, user:req.user});
			else res.render('index', {data:mes, user: "Guest"});
		};
	});
	}
	else
	{
		res.redirect("/");
	}

}
exports.responses = function(req, res) {
if(req.user)
	{
	models.Message.find({facebookID:req.user.id, level: {$ne: 0}, active: {$ne: "0"}},function(err, mes){
		if (err) res.send(err);
		else {
			if(req.user) res.render('response', {data: mes, user:req.user});
			else res.render('index', {data:mes, user: "Guest"});
		};
	});
}
	else
	{
		res.redirect("/");
	}

}
