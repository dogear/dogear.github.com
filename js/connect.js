function signin() {
	var email = $("#email").value;
	var password = $("#pass").value;
	alert('test');
	dogear.create_account(email, password, function (success) {
	  alert(success);
	  if(success){
		window.location = dogear.html;
	  }
	});
}