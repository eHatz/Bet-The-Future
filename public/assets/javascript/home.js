
module.exports = function modalIt(message, $){

	//Grab modal text area
	var modalTextDiv = $("#modalText");

	//Attach error message
	modalTextDiv.text(message);

	//Activate the modal
	console.log("go modal!");
	$("#modalDiv").modal("show");
}