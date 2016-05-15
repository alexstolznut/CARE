'use strict';

var models = require('../models');

exports.send = function(req, res) {
	//your solution here
	var form_data = req.body;
	var d = new Date();
	new Date(1995, 11, 17);
	var date = new Date(d.getFullYear().toString() + ", " + d.getMonth().toString() + ", " + d.getDate().toString());
	//console.log(date); // help you see what is the date


	let message = new models.Message({
		email: form_data.email,
		content: form_data.content,
		created: date,
	});

	message.save(function(err){
		if (err) res.send(err);
		else res.redirect('/');
	});

}
