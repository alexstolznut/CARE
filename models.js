var mongoose = require('mongoose');

var MessageSchema = mongoose.Schema({
	name: 'String',
	content: 'String',
	created: 'Date',
	description: 'String',
	level: 'Number',
	parentId: 'String',
	facebookID: 'String',
	active: 'String',
	replies: [],
	temp: []
});

exports.Message = mongoose.model('Message', MessageSchema);
