$(document).ready(function(){
	var messages = [];
	var socket = io.connect('http://127.0.0.1:3700');
	var field  = $('#field');
	var name   = $('#name');
	
	socket.on("message", function(data){
		if(data.message){
			messages.push(data);
			
			var html = '';
			
			for(var i = 0; i < messages.length; i++){
				html += '<b>' + (messages[i].username ? messages[i].username : 'Server') + ': </b>';
				html += messages[i].message + '<br />';
			}
			
			$('#content').html(html);
		}else {
			console.log("Hay un problema", data);
		}
	});
	
	$('#send').click(function(){
		if(name.val() == ""){
			alert("Ingrese su nombre.");
		}else{
			$('#name').attr('disabled', 'disabled');
			
			var texto = field.val();
			socket.emit('send', {message: texto, username: name.val()});
			field.val("");
	    }
	});
});