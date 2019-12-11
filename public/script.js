var filterText = '';
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
		
		showSightings(data);
	});
}

function showSightings(sightings) {

	var sightingsTable = document.getElementById("sightingsTable");

	var table = document.createElement("table");
	table.className="table table-striped";
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
			alert.className = "alert alert-secondary";
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

		var cardbutton = document.createElement("a");
		cardbutton.href="flowers/" + (flowers[i].COMNAME).replace(' ', "\%20");
		cardbutton.className="btn btn-primary mt-auto";
		cardbutton.innerHTML = "Pick Me";

		card.appendChild(cardimg);
		card.appendChild(cardbody);
		cardbody.appendChild(cardtitle);
		cardbody.appendChild(cardtext);
		cardbody.appendChild(cardbutton);
		deck.appendChild(card);
	}

	if(flowers.length == 1) {
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
		$("#filterField").val(comname);
		filterText = comname;
		getFlowers();
	});
}