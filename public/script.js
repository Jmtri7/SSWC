var filterText = '';
$("#filterField").keyup(function(){
	filterText = $("#filterField").val();
	getFlowers();
});

getFlowers();

function getFlowers() {
	$.get("/flowers/" + filterText, function(data) {
		if(!data) {
			console.log("Flowers not found!");
		}
		for(var i = 0; i < data.length; i++) {
			//console.log(data[i].name);
		}
		showFlowers(data);
	});
}

function showFlowers(flowers) {
	var flowersSection = document.getElementById("flowers");
	$(flowersSection).empty();
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
		//console.log(comname);
		$("#filterField").val(comname);
		filterText = comname;
		getFlowers();
	});
}