'use strict';

var models = require('../models');
var mongoose = require('mongoose');
exports.insert = function(req, res) {
	//your solution here
	var form_data = req.body;
	console.log(form_data);
	var d = new Date();
	new Date(1995, 11, 17);
	var date = new Date();
	//console.log(date); // help you see what is the date

	// If this is a new parent thread, the level will be 0 and should have an empty array of replies
	if (form_data.level == "0")
	{
		// Create a new thread and save in the database
		let message = new models.Message({
			name: form_data.name,
			content: form_data.content,
			created: date,
			description: form_data.description,
			facebookID: form_data.facebookId,
			level: 0,
			active: "1",
			replies: [],
			temp:[]
		});

		message.save(function(err, mess){
			if (err) res.send(err);
			else
			{
				console.log(mess._id);
				res.redirect('/forums');
			}
		});
	}

	// If this is a reply to a parent thread, you want to add the _id
	// to the replies array  of the parent and a thread to the database
	else
	{
		// Create a new thread and save in the database
		let message = new models.Message({
			name: form_data.name,
			content: form_data.content,
			created: date,
			description: form_data.description,
			facebookID: form_data.facebookId,
			level: parseInt(form_data.level),
			parentId: form_data.parent_id,
			active: "1",
			replies: [],
			temp:[]
		});

		message.save(function(err, mes){
			if (err) res.send(err);
			else
			{
				// Push the thread onto the replies array of the parent thread
				models.Message.findByIdAndUpdate(
        			form_data.parent_id,
        			{$push: {"replies": mes._id }},
        			{safe: true, upsert: true, new : true},
        			function(err, model) {
            			if(err) res.send(err);
            			else res.redirect('/thread?id='+form_data.top);
        			}
    			);
			}
		});
	}

}
exports.parent = function(req, res) {
	models.Message.findById( req.param("id") ).exec(function(err, mes){
		if(err) res.send(err);
		else res.json(mes);
	})

}

exports.children = function(req, res) {
	if(req.param("limit"))
	{
		models.Message.find({parentId: req.param("id")}).limit(req.param("limit")).exec(function(err, mes){
			if (err) res.send(err);
			else res.json(mes);
		});
	}
	models.Message.find({parentId: req.param("id")}).exec(function(err, mes){
		if (err) res.send(err);
		else res.json(mes);
	});
}
exports.user = function(req,res){
	if(req.user)
	{
		res.json(req.user);
	}
	else
	{
		var response = { message: "Not Logged In"};
		res.json( response );
	}
}
exports.update = function(req,res){
	models.Message.findOneAndUpdate({_id:req.body.id}, {name: req.body.name, description: req.body.description}, function (err, mes) {
  		res.redirect('/thread?id='+req.body.redirect);
	});
}
exports.delete = function(req,res){
	console.log(req.user.id);
	console.log(req.body.facebookId);
	if(req.user.id == req.body.facebookId)
	{
		if(req.body.level == "0")
		{
			models.Message.find({_id:req.body._id}).remove().exec( function(err) {
				if(req.body._id == req.body.redirect ) res.redirect('/forums');
				else res.redirect('/thread?id='+req.body.redirect);
			});
		}
		else
		{
			models.Message.findOneAndUpdate({_id:req.body._id}, {active: "0", name: "<span style = 'color:grey'>[ DELETED ]</span>", description: "<span style = 'color:grey'>[ DELETED ]</span>"}, function (err, mes) {
  				res.redirect('/thread?id='+req.body.redirect);
  			});
		}

	}
	else
	{
		res.redirect('/thread?id='+req.body.redirect);
	}
}