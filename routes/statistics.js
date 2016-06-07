exports.view = function(req, res) {
	if(req.user)
	{
	res.render('statistics',{});
	}
	else
	{
		res.redirect('/');
	}

}

