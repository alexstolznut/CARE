$( document ).ready(function() {
    console.log( "ready!" );
    var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
    };
    function renderParent(data, user, parent)
	{
	var id = "'"+ data._id + "'";
    var reply = '';
    var edit = '';
    var del = '';
    if(data.active == "1")
        {
    if(user.id)
    {
        
        reply = '<a style = "display:inline" onclick = "showReply('+id+')">Reply</a>'+
        '<form method="post" action="/message">'+
            '<input type="hidden" name = "content" value="'+data.content+'">'+
            '<input type="hidden" name = "level" value="'+ (data.level+1) +'">'+
            '<input type="hidden" name = "redirect" value="'+parent+'">'+
            '<input type="hidden" name = "parent_id" value="'+data._id+'">'+
            '<input type="hidden" name = "facebookId" value="'+user.id+'">'+
            '<input type="hidden" name = "top" value="'+getUrlParameter('id')+'">'+
             '<input type="textarea" id="name'+data._id+'" name="name" style="display:none" placeholder="Post as...">'+
            '<textarea type="textarea" id="description'+data._id+'" name="description" style="display:none;margin-top:10px">Description</textarea>'+
            '<input type="submit" id = "submit'+data._id+'" value="Reply" style="display:none">'+
            '<input onclick = "showReply('+id+')" type="button" id = "cancel'+data._id+'" value="Cancel" style="margin-left: 5px;display:none">'+
        '</form>';
      
        if(user.id == data.facebookID)
        {
            edit = '<a style = "display:inline" onclick = "showEdit('+id+')">Edit</a> | ';
            del = '<a href = "#" data-toggle="modal" data-target="#myModal'+data._id+'">'
                        + 'Delete'
                    + '</a> | '
                    +'<div class="modal fade" id="myModal'+data._id+'" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">'
                    +    '<div class="modal-dialog" role="document">'
                    +        '<div class="modal-content">'
                    +            '<div class="modal-header">'
                    +                 '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
                    +                 '<h4 class="modal-title" id="myModalLabel">Delete Post</h4>'
                    +            '</div>'
                    +    '<div class="modal-body">'
                    +        'Are you sure you want to delete your post?'
                    +   ' </div>'
                    +'<div class="modal-footer">'
                + '<form method = "POST" action = "/api/message/delete">'
                +  '<input type="hidden" name = "facebookId" value="'+user.id+'">'
                + '<input type="hidden" name = "level" value="'+ data.level +'">'
                + '<input type="hidden" name = "_id" value="'+data._id+'">'
                + '<input type="hidden" name = "redirect" value="'+parent+'">'
                + '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>'
                + '<input  type="submit" class="btn btn-primary" value = "Delete">'
                + '</form>'
                + '</div>'
                + '</div>'
                + '</div>'
                + '</div>';
        }
    }
    else
    {
        reply = '<a href = "/auth/facebook">Login With Facebook to Reply</a>'
    }
    }
    
	return '<div class= "level-0">' +
     '<h3>Discussion:</h3>'+

     '<h1>'+data.content+'</h1>'+
     '<p><b>Posted by '+ data.name + '</b><br>' +
    	'<p>'+ data.description+'</p>'+
    	edit + del + reply +
        '<form method="POST" action="/api/message/update">'+
        '<input type="hidden" name = "redirect" value="'+parent+'">'+
        '<input type="hidden" name = "id" value="'+data._id+'">'+
             '<input type="textarea" id="editname'+data._id+'" name="name" style="display:none" placeholder="Post as..." value="'+data.name+'">'+
            '<textarea type="textarea" id="editdescription'+data._id+'" name="description" style="display:none;margin-top:10px">'+data.description+'</textarea>'+
            '<input type="submit" id = "editsubmit'+data._id+'" value="Edit" style="display:none">'+
            '<input onclick = "showEdit('+id+')" type="button" id = "editcancel'+data._id+'" value="Cancel" style="margin-left: 5px;display:none">'+
        '</form>'+
    '</div>';
	}
	function renderReplies(children, user, parent)
	{

	var template = '';
	var i;
	for(i = 0; i < children.length; i++)
	{
	  var data = children[i];
	  var id = "'"+ data._id + "'";
	  var c = getChildren(data._id);
      var reply = '';
      var edit = '';
      var del = '';
      
        if(data.active == "1")
        {
            if(user.id)
      {
        reply = '<a onclick = "showReply('+id+')">Reply</a>'+
        '<form method="post" action="/message">'+
            '<input type="hidden" name = "content" value="'+data.content+'">'+
            '<input type="hidden" name = "level" value="'+ (data.level+1) +'">'+
            '<input type="hidden" name = "parent_id" value="'+data._id+'">'+
            '<input type="hidden" name = "redirect" value="'+parent+'">'+
            '<input type="hidden" name = "facebookId" value="'+user.id+'">'+
            '<input type="hidden" name = "top" value="'+getUrlParameter('id')+'">'+
             '<input type="textarea" id="name'+data._id+'" name="name" style="display:none" placeholder="Post as...">'+
            '<textarea type="textarea" id="description'+data._id+'" name="description" style="display:none;margin-top:10px">Description</textarea>'+
            '<input type="submit" id = "submit'+data._id+'" value="Reply" style="display:none">'+
                     '<input onclick = "showReply('+id+')" type="button" id = "cancel'+data._id+'" value="Cancel" style="margin-left: 5px;display:none">'+
        '</form>';
        if(user.id == data.facebookID)
        {
            var edit = '<a style = "display:inline" onclick = "showEdit('+id+')">Edit</a> | ';
            del = '<a href = "#" data-toggle="modal" data-target="#myModal'+data._id+'">'
                        + 'Delete'
                    + '</a> | '
                    +'<div class="modal fade" id="myModal'+data._id+'" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">'
                    +    '<div class="modal-dialog" role="document">'
                    +        '<div class="modal-content">'
                    +            '<div class="modal-header">'
                    +                 '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
                    +                 '<h4 class="modal-title" id="myModalLabel">Delete Post</h4>'
                    +            '</div>'
                    +    '<div class="modal-body">'
                    +        'Are you sure you want to delete your post?'
                    +   ' </div>'
                    +'<div class="modal-footer">'
                + '<form method = "POST" action = "/api/message/delete">'
                +  '<input type="hidden" name = "facebookId" value="'+user.id+'">'
                + '<input type="hidden" name = "_id" value="'+data._id+'">'
                 + '<input type="hidden" name = "level" value="'+ data.level +'">'
                + '<input type="hidden" name = "redirect" value="'+parent+'">'
                + '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>'
                + '<input  type="submit" class="btn btn-primary" value = "Delete">'
                + '</form>'
                + '</div>'
                + '</div>'
                + '</div>'
                + '</div>';
        }
    }
    else
      {
        reply = '<a href = "/auth/facebook">Login With Facebook to Reply</a>';
      }
      }
      
	 template += '<div class = "level-1">' +
     '<p><b>Posted by '+ data.name + '</b><br> RE: '+data.content+'</p>'+
    	'<p>'+ data.description+'</p>'+
    	'<a href = "/thread?id='+data._id+'">See Full Conversation </a> | '+
    	edit + del + reply  +
        '<form method="POST" action="/api/message/update">'+
        '<input type="hidden" name = "redirect" value="'+parent+'">'+
        '<input type="hidden" name = "id" value="'+data._id+'">'+
             '<input type="textarea" id="editname'+data._id+'" name="name" style="display:none" placeholder="Post as..." value="'+data.name+'">'+
            '<textarea type="textarea" id="editdescription'+data._id+'" name="description" style="display:none;margin-top:10px">'+data.description+'</textarea>'+
            '<input type="submit" id = "editsubmit'+data._id+'" value="Edit" style="display:none">'+
            '<input onclick = "showEdit('+id+')" type="button" id = "editcancel'+data._id+'" value="Cancel" style="margin-left: 5px;display:none">'+
        '</form>'+
        renderChildren(c, user, parent)+
    '</div>';
    	//console.log(template);
		}
		return template;
	}
	function renderChildren(children, user, parent)
	{

	var template = '';
	var i;
	for(i = 0; i < children.length; i++)
	{
	  var data = children[i];
	  var id = "'"+ data._id + "'";
	  var c = getChildren(data._id);
      var reply = '';
      var edit = '';
      var del = '';
      
        if(data.active == "1")
        {
            if(user.id)
      {
        reply = '<a onclick = "showReply('+id+')">Reply</a>'+ 
        '<form method="post" action="/message">'+
            '<input type="hidden" name = "content" value="'+data.content+'">'+
            '<input type="hidden" name = "level" value="'+ (data.level+1) +'">'+
            '<input type="hidden" name = "parent_id" value="'+data._id+'">'+
            '<input type="hidden" name = "redirect" value="'+parent+'">'+
            '<input type="hidden" name = "facebookId" value="'+user.id+'">'+
            '<input type="hidden" name = "top" value="'+getUrlParameter('id')+'">'+
             '<input type="textarea" id="name'+data._id+'" name="name" style="display:none" placeholder="Post as...">'+
            '<textarea type="textarea" id="description'+data._id+'" name="description" style="display:none;margin-top:10px">Description</textarea>'+
            '<input type="submit" id = "submit'+data._id+'" value="Reply" style="display:none">'+
                   '<input onclick = "showReply('+id+')" type="button" id = "cancel'+data._id+'" value="Cancel" style="margin-left: 5px;display:none">'+

        '</form>';
         if(user.id == data.facebookID)
        {
            var edit = '<a style = "display:inline" onclick = "showEdit('+id+')">Edit</a> | ';
            del = '<a href = "#" data-toggle="modal" data-target="#myModal'+data._id+'">'
                        + 'Delete'
                    + '</a> | '
                    +'<div class="modal fade" id="myModal'+data._id+'" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">'
                    +    '<div class="modal-dialog" role="document">'
                    +        '<div class="modal-content">'
                    +            '<div class="modal-header">'
                    +                 '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
                    +                 '<h4 class="modal-title" id="myModalLabel">Delete Post</h4>'
                    +            '</div>'
                    +    '<div class="modal-body">'
                    +        'Are you sure you want to delete your post?'
                    +   ' </div>'
                    +'<div class="modal-footer">'
                + '<form method = "POST" action = "/api/message/delete">'
                +  '<input type="hidden" name = "facebookId" value="'+user.id+'">'
                + '<input type="hidden" name = "_id" value="'+data._id+'">'
                + '<input type="hidden" name = "redirect" value="'+parent+'">'
                 + '<input type="hidden" name = "level" value="'+ data.level +'">'
                + '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>'
                + '<input  type="submit" class="btn btn-primary" value = "Delete">'
                + '</form>'
                + '</div>'
                + '</div>'
                + '</div>'
                + '</div>';
        }
    }
    else
     {
        reply = '<a href = "/auth/facebook">Login With Facebook to Reply</a>';
     }
     }
     
	 template += '<div class = "level-2">' +
     '<p><b>Posted by '+ data.name + '</b><br> RE:RE: '+data.content+'</p>'+
    	'<p>'+ data.description+'</p>'+
    	'<a href = "/thread?id='+data._id+'">See Full Conversation </a> | '+
    	edit + del + reply +
        '<form method="POST" action="/api/message/update">'+
            '<input type="hidden" name = "redirect" value="'+parent+'">'+
            '<input type="hidden" name = "id" value="'+data._id+'">'+
             '<input type="textarea" id="editname'+data._id+'" name="name" style="display:none" placeholder="Post as..." value="'+data.name+'">'+
            '<textarea type="textarea" id="editdescription'+data._id+'" name="description" style="display:none;margin-top:10px">'+data.description+'</textarea>'+
            '<input type="submit" id = "editsubmit'+data._id+'" value="Edit" style="display:none">'+
            '<input onclick = "showEdit('+id+')" type="button" id = "editcancel'+data._id+'" value="Cancel" style="margin-left: 5px;display:none">'+
        '</form>'+ renderGrandChildren(c, user, parent) +
    '</div>';
    	//console.log(template);
		}
		return template;
	}
	function renderGrandChildren(children, user, parent)
	{

	var template = '';
	var i;
	for(i = 0; i < children.length; i++)
	{
      var reply = '';
	  var data = children[i];
	  var id = "'"+ data._id + "'";
      var edit = '';
      var del = '';
      
        if(data.active == "1")
        {
            if(user.id )
      {
        reply = '<a href = "/thread?id='+data._id+'">Continue This Thread to Reply &gt; </a>  ';
        if(user.id == data.facebookID)
        {
            var edit = '<a style = "display:inline" onclick = "showEdit('+id+')">Edit</a> | ';
            del = '<a href = "#" data-toggle="modal" data-target="#myModal'+data._id+'">'
                        + 'Delete'
                    + '</a> | '
                    +'<div class="modal fade" id="myModal'+data._id+'" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">'
                    +    '<div class="modal-dialog" role="document">'
                    +        '<div class="modal-content">'
                    +            '<div class="modal-header">'
                    +                 '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
                    +                 '<h4 class="modal-title" id="myModalLabel">Delete Post</h4>'
                    +            '</div>'
                    +    '<div class="modal-body">'
                    +        'Are you sure you want to delete your post?'
                    +   ' </div>'
                    +'<div class="modal-footer">'
                + '<form method = "POST" action = "/api/message/delete">'
                +  '<input type="hidden" name = "facebookId" value="'+user.id+'">'
                + '<input type="hidden" name = "_id" value="'+data._id+'">'
                + '<input type="hidden" name = "redirect" value="'+parent+'">'
                 + '<input type="hidden" name = "level" value="'+ data.level +'">'
                + '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>'
                + '<input  type="submit" class="btn btn-primary" value = "Delete">'
                + '</form>'
                + '</div>'
                + '</div>'
                + '</div>'
                + '</div>';
        }
    }
     else
    {
        reply = '<a href = "/thread?id='+data._id+'">Continue This Thread &gt; </a>  '
    }
      }
     
	 template += '<div class = "level-3">' +
     '<p><b>Posted by '+ data.name + '</b><br> RE:RE:RE: '+data.content+'</p>'+
    	'<p>'+ data.description+'</p>'+
    	 edit + del + reply  +
        '<form method="POST" action="/api/message/update">'+
            '<input type="hidden" name = "redirect" value="'+parent+'">'+
            '<input type="hidden" name = "id" value="'+data._id+'">'+
             '<input type="textarea" id="editname'+data._id+'" name="name" style="display:none" placeholder="Post as..." value="'+data.name+'">'+
            '<textarea type="textarea" id="editdescription'+data._id+'" name="description" style="display:none;margin-top:10px">'+data.description+'</textarea>'+
            '<input type="submit" id = "editsubmit'+data._id+'" value="Edit" style="display:none">'+
            '<input onclick = "showEdit('+id+')" type="button" id = "editcancel'+data._id+'" value="Cancel" style="margin-left: 5px;display:none">'+
        '</form>'+
    '</div>';
    	//console.log(template);
		}
		return template;
	}
    function getParent(id){
    	var json;
    	$.ajax({
            dataType: 'json',
            type: 'GET',
            data: $('#response').serialize(),
            async: false,
            url: '/api/message/parent?id='+id,
            success: function(response) {
                json = response;
                //console.log(response);
            }
        });
        return json;
    }
    function getUser(){
        var json;
        $.ajax({
            dataType: 'json',
            type: 'GET',
            data: $('#response').serialize(),
            async: false,
            url: '/api/user',
            success: function(response) {
                json = response;
                //console.log(response);
            }
        });
        return json;
    }
    var user = getUser();
    var parent = getParent(getUrlParameter('id'));
    var parentHTML = renderParent(parent,user,getUrlParameter('id') );

    function getChildren(id){
    	var json;
    	$.ajax({
            dataType: 'json',
            type: 'GET',
            data: $('#response').serialize(),
            async: false,
            url: '/api/message/children?id='+id,
            success: function(response) {
                json = response;
                //console.log(response);
            }
        });
        return json;
    }
    var children = getChildren(getUrlParameter('id'));
    parentHTML += renderReplies(children,user, getUrlParameter('id'));
    //console.log(parentHTML);
    document.getElementById('display').innerHTML = parentHTML;

});
