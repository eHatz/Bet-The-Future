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

