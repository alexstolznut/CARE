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
    function renderParent(data)
	{
	var id = "'"+ data._id + "'";
	return '<div class = "level-0">' +
     '<h3>'+data.content+'</h3>'+
    	'<p>'+ data.description+'</p>'+
    	'<a onclick = "showReply('+id+')">Reply</a>'+
    	'<form method="post" action="/message">'+
    		'<input type="hidden" name = "content" value="'+data.content+'">'+
    		'<input type="hidden" name = "level" value="'+ (data.level+1) +'">'+
    		'<input type="hidden" name = "parent_id" value="'+data._id+'">'+
    		'<input type="hidden" name = "top" value="'+getUrlParameter('id')+'">'+
    		 '<input type="textarea" id="name'+data._id+'" name="name" style="display:none" placeholder="Post as...">'+
            '<textarea type="textarea" id="description'+data._id+'" name="description" style="display:none;margin-top:10px">Description</textarea>'+
            '<input type="submit" id = "submit'+data._id+'" value="Reply" style="display:none">'+
            '<input onclick = "showReply('+id+')" type="button" id = "cancel'+data._id+'" value="Cancel" style="margin-left: 5px;display:none">'+
        '</form>'+
    '</div>';
	}
	function renderReplies(children)
	{

	var template = '';
	var i;
	for(i = 0; i < children.length; i++)
	{
	  var data = children[i];
	  var id = "'"+ data._id + "'";
	  var c = getChildren(data._id);
	 template += '<div class = "level-1">' +
     '<p><b>'+ data.name + '</b> RE:'+data.content+'</p>'+
    	'<p>'+ data.description+'</p>'+
    	'<a href = "/thread?id='+data._id+'">See Full Conversation </a> | '+
    	'<a onclick = "showReply('+id+')">Reply</a>'+
    	'<form method="post" action="/message">'+
    		'<input type="hidden" name = "content" value="'+data.content+'">'+
    		'<input type="hidden" name = "level" value="'+ (data.level+1) +'">'+
    		'<input type="hidden" name = "parent_id" value="'+data._id+'">'+
    		'<input type="hidden" name = "top" value="'+getUrlParameter('id')+'">'+
    		 '<input type="textarea" id="name'+data._id+'" name="name" style="display:none" placeholder="Post as...">'+
            '<textarea type="textarea" id="description'+data._id+'" name="description" style="display:none;margin-top:10px">Description</textarea>'+
            '<input type="submit" id = "submit'+data._id+'" value="Reply" style="display:none">'+
                     '<input onclick = "showReply('+id+')" type="button" id = "cancel'+data._id+'" value="Cancel" style="margin-left: 5px;display:none">'+

        '</form>'+
        renderChildren(c)+
    '</div>';
    	//console.log(template);
		}
		return template;
	}
	function renderChildren(children)
	{

	var template = '';
	var i;
	for(i = 0; i < children.length; i++)
	{
	  var data = children[i];
	  var id = "'"+ data._id + "'";
	  var c = getChildren(data._id);
	 template += '<div class = "level-2">' +
     '<p><b>'+ data.name + '</b> RE:RE:'+data.content+'</p>'+
    	'<p>'+ data.description+'</p>'+
    	'<a href = "/thread?id='+data._id+'">See Full Conversation </a> | '+
    	'<a onclick = "showReply('+id+')">Reply</a>'+
    	'<form method="post" action="/message">'+
    		'<input type="hidden" name = "content" value="'+data.content+'">'+
    		'<input type="hidden" name = "level" value="'+ (data.level+1) +'">'+
    		'<input type="hidden" name = "parent_id" value="'+data._id+'">'+
    		'<input type="hidden" name = "top" value="'+getUrlParameter('id')+'">'+
    		 '<input type="textarea" id="name'+data._id+'" name="name" style="display:none" placeholder="Post as...">'+
            '<textarea type="textarea" id="description'+data._id+'" name="description" style="display:none;margin-top:10px">Description</textarea>'+
            '<input type="submit" id = "submit'+data._id+'" value="Reply" style="display:none">'+
                   '<input onclick = "showReply('+id+')" type="button" id = "cancel'+data._id+'" value="Cancel" style="margin-left: 5px;display:none">'+

        '</form>'+ renderGrandChildren(c) +
    '</div>';
    	//console.log(template);
		}
		return template;
	}
	function renderGrandChildren(children)
	{

	var template = '';
	var i;
	for(i = 0; i < children.length; i++)
	{
	  var data = children[i];
	  var id = "'"+ data._id + "'";
	 template += '<div class = "level-3">' +
     '<p><b>'+ data.name + '</b> RE:RE:RE:'+data.content+'</p>'+
    	'<p>'+ data.description+'</p>'+
    	'<a href = "/thread?id='+data._id+'">Continue This Thread to Reply &gt; </a>  '+

    	'<form method="post" action="/message">'+
    		'<input type="hidden" name = "content" value="'+data.content+'">'+
    		'<input type="hidden" name = "level" value="'+ (data.level+1) +'">'+
    		'<input type="hidden" name = "parent_id" value="'+data._id+'">'+
    		'<input type="hidden" name = "top" value="'+getUrlParameter('id')+'">'+
    		 '<input type="textarea" id="name'+data._id+'" name="name" style="display:none" placeholder="Post as...">'+
            '<textarea type="textarea" id="description'+data._id+'" name="description" style="display:none;margin-top:10px">Description</textarea>'+
            '<input type="submit" id = "submit'+data._id+'" value="Reply" style="display:none">'+
                    '<input onclick = "showReply('+id+')" type="button" id = "cancel'+data._id+'" value="Cancel" style="margin-left: 5px; display:none">'+

        '</form>' +
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
    var parent = getParent(getUrlParameter('id'));
    var parentHTML = renderParent(parent);

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
    parentHTML += renderReplies(children);
    console.log(parentHTML);
    document.getElementById('display').innerHTML = parentHTML;

});
