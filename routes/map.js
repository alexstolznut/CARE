exports.view = function(req, res) {    
	if(req.user)
	{
		res.render('map',{});
	}
	else
	{
		res.redirect('/');
	}
}

