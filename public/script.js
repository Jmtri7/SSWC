$("#submitSighting").click(function() {
	comnameText = $("#flowerField").val();
	memberText = $("#memberField").val();
	locationText = $("#locationField").val();
	dateText = $("#dateField").val();

	$.get("/insert/" + comnameText + "_" + memberText + "_" + locationText + "_" + dateText, function(data) {

		if(!data) {
			//console.log("Sightings not found!");
		}

		for(var i = 0; i < data.length; i++) {
			//console.log(data[i].NAME);
		}
		
		//showSightings(data);
	});

	$("#flowerField").val("");
	$("#memberField").val("");
	$("#locationField").val("");
	$("#dateField").val("");

	getFlowers();
});

$("#submitUpdate").click(function() {
	newSpecies = $("#speciesField").val();
	newGenus = $("#genusField").val();
	newComname = $("#comnameField").val();

	oldSpecies = $("#speciesField").attr("placeholder");
	oldGenus = $("#genusField").attr("placeholder");
	oldComname = $("#comnameField").attr("placeholder");


		$.get("/update/" + oldSpecies + "-" + oldGenus + "-" + oldComname + "_" + newSpecies + "-" + newGenus + "-" + newComname, function(data) {

		if(!data) {
			//console.log("Sightings not found!");
		}

		for(var i = 0; i < data.length; i++) {
			//console.log(data[i].NAME);
		}
		
		//showSightings(data);
	});

	$("#speciesField").val("");
	$("#genusField").val("");
	$("#comnameField").val("");

	getFlowers();
});

var filterText = '';
$("#filterField").val("");
$("#filterField").keyup(function(){
	filterText = $("#filterField").val();
	getFlowers();
});

getFlowers();

function getSightings() {

	$.get("/sightings/" + filterText, function(data) {

		if(!data) {
			console.log("Sightings not found!");
		}

		for(var i = 0; i < data.length; i++) {
			//console.log(data[i].NAME);
		}
		
		if(data.length > 0) {
			showSightings(data);
		} else {
			var sightingsTable = document.getElementById("sightingsTable");
			var alert = document.createElement("div");
			alert.className = "alert alert-secondary spacer";
			alert.role = "alert";
			alert.innerHTML = "No sightings for this flower!"
			sightingsTable.appendChild(alert);
		}
	});
}

function showSightings(sightings) {

	var sightingsTable = document.getElementById("sightingsTable");

	var table = document.createElement("table");
	table.className="table table-striped spacer";
	sightingsTable.appendChild(table);

	var tableHead = document.createElement("thead");
	var headRow = document.createElement("tr");
	var dateHead = document.createElement("th");
	dateHead.scope = "col";
	dateHead.innerHTML = "Date";
	var locationHead = document.createElement("th");
	locationHead.scope = "col";
	locationHead.innerHTML = "Location";
	var memberHead = document.createElement("th");
	memberHead.scope = "col";
	memberHead.innerHTML = "Member";

	table.appendChild(tableHead);
	tableHead.appendChild(headRow);
	headRow.appendChild(dateHead);
	headRow.appendChild(locationHead);
	headRow.appendChild(memberHead);

	var tableBody = document.createElement("tbody");
	table.appendChild(tableBody);

	for(var i = 0; i < sightings.length; i++) {
		console.log(sightings[i].NAME);

		var tableRow = document.createElement("tr");
		tableBody.appendChild(tableRow);

		var rowDate = document.createElement("th");
		rowDate.scope = "row";
		rowDate.innerHTML = sightings[i].SIGHTED;
		var rowLocation = document.createElement("td");
		rowLocation.innerHTML = sightings[i].LOCATION;
		var rowMember = document.createElement("td");
		rowMember.innerHTML = sightings[i].PERSON;

		tableRow.appendChild(rowDate);
		tableRow.appendChild(rowLocation);
		tableRow.appendChild(rowMember);
	}
}

function getFlowers() {

	$.get("/flowers/" + filterText, function(data) {

		if(!data) {
			console.log("Flowers not found!");
		}

		for(var i = 0; i < data.length; i++) {
			//console.log(data[i].name);
		}

		var flowersSection = document.getElementById("flowers");
		$(flowersSection).empty();

		var sightingsTable = document.getElementById("sightingsTable");
		$(sightingsTable).empty();

		if(data.length == 0) {
			var alert = document.createElement("div");
			alert.className = "alert alert-secondary spacer";
			alert.role = "alert";
			alert.innerHTML = "Flower Not Found!"
			flowersSection.appendChild(alert);
		} else {
			showFlowers(data);
		}
	});
}

function showFlowers(flowers) {

	var flowersSection = document.getElementById("flowers");

	var decksize = 3;
	for(var i = 0; i < flowers.length; i++) {
		if(i % decksize == 0) {
			var deck = document.createElement("div");
			deck.className = "card-deck spacer";
			flowersSection.appendChild(deck);
		}

		var card = document.createElement("div");
		card.className = "card";

		var cardimg = document.createElement("img");
		cardimg.className="card-img-top";
		cardimg.src="img/flower.jpg";
		cardimg.alt="Card image cap";

		var cardbody = document.createElement("div");
		cardbody.className="card-body d-flex flex-column";

		var cardtitle = document.createElement("h5");
		cardtitle.className="card-title";
		cardtitle.innerHTML = flowers[i].COMNAME;

		var cardtext = document.createElement("p");
		cardtext.className="card-text";
		cardtext.innerHTML = flowers[i].GENUS + " " + flowers[i].SPECIES;

		//var cardbutton = document.createElement("a");
		//cardbutton.href="flowers/" + (flowers[i].COMNAME).replace(' ', "\%20");
		//cardbutton.className="btn btn-primary mt-auto";
		//cardbutton.innerHTML = "Pick Me";

		var updateButton = $("<button type=\"button\" class=\"btn btn-primary\" data-toggle=\"modal\" data-target=\"#flowerModal\"></button>").text("Update");

		card.appendChild(cardimg);
		card.appendChild(cardbody);
		cardbody.appendChild(cardtitle);
		cardbody.appendChild(cardtext);
		//cardbody.appendChild(cardbutton);

		cardbody.appendChild(updateButton[0]);

		deck.appendChild(card);
	}

	flowersSection.className = "container";

	if(flowers.length == 1) {
		flowersSection.className = "col-sm";
		getSightings();
	} else

	if(flowers.length % decksize != 0) {
		for(var i = 1; i <= decksize - (flowers.length % decksize); i++) {
			var card = document.createElement("div");
			card.className = "card";
			card.style = "width: 18rem;"
			deck.appendChild(card);
		}
	}
	
	$(".card").click(this, function() {
		var comname = $(this).children(".card-body").children(".card-title").prop("innerHTML");
		var binomial = $(this).children(".card-body").children(".card-text").prop("innerHTML");

		$("#filterField").val(comname);
		filterText = comname;

		$("#comnameField").val("");
		$("#comnameField").attr("placeholder", comname);
		$("#genusField").val("");
		$("#genusField").attr("placeholder", binomial.split(' ')[0]);
		$("#speciesField").val("");
		$("#speciesField").attr("placeholder", binomial.split(' ')[1]);

		getFlowers();
	});
}