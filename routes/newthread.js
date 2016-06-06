exports.view = function(req, res) {
	if(req.user)
		res.render('newthread',{user: req.user});
	else
		res.redirect('/');
}

