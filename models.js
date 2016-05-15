var mongoose = require('mongoose');

var MessageSchema = mongoose.Schema({
	name: 'String',
	content: 'String',
	created: 'Date',
	description: 'String'
});

exports.Message = mongoose.model('Message', MessageSchema);
