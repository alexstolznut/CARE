var mongoose = require('mongoose');

var MessageSchema = mongoose.Schema({
	email: 'String',
	content: 'String',
	created: 'Date'
});

exports.Message = mongoose.model('Message', MessageSchema);
