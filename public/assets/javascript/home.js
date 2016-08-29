//Possibly unneeded modal function
function modalIt(message){

	//Grab modal text area
	var modalTextDiv = $("#modalText");

	//Attach error message
	modalTextDiv.text(message);

	//Activate the modal
	console.log("go modal!");
	$("#errorModal").modal("show");
}

// id="inputPassword"
// id="confirmPassword"

//Check password matching
$(document).ready(function(){
	$("#confirmPassword").onchange = matchPassword;
});

function matchPassword(){
	var inputPassword = $("#inputPassword").val();
	var confirmPassword = $("#confirmPassword").val();

	if (inputPassword != confirmPassword){
		confirmPassword.setCustomValidity("Passwords must match");
	} else {
		confirmPassword.setCustomValidity("");
	}
};

