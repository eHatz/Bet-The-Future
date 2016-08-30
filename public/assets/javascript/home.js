// //Possibly unneeded modal function
// function modalIt(message){

// 	//Grab modal text area
// 	var modalTextDiv = $("#modalText");

// 	//Attach error message
// 	modalTextDiv.text(message);

// 	//Activate the modal
// 	console.log("go modal!");
// 	$("#errorModal").modal("show");
// }

$('#myTabs a').click(function (e) {
  e.preventDefault()
  $(this).tab('show')
})
$('#something').html('nope');

$('#myTabs a[href="#profile"]').tab('show') // Select tab by name
$('#myTabs a:first').tab('show') // Select first tab
$('#myTabs a:last').tab('show') // Select last tab
$('#myTabs li:eq(2) a').tab('show') // Select third tab (0-indexed)