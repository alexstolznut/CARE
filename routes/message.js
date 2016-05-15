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
		name: form_data.name,
		content: form_data.content,
		created: date,
		description: form_data.description
	});

	message.save(function(err){
		if (err) res.send(err);
		else res.redirect('/');
	});

}
