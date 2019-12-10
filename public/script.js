getFlowers();

function getFlowers() {
	$.get('/flowers', function(data) {
		if(!data) {
			console.log("Flowers not found!");
		}
		for(var i = 0; i < data.length; i++) {
			console.log(data[i].name);
		}
		showFlowers(data);
	});
}

function showFlowers(flowers) {
	var flowersSection = document.getElementById("flowers");
	console.log(flowers[0])
	for(var i = 0; i < flowers.length; i++) {
		if(i % 3 == 0) {
			var deck = document.createElement("div");
			deck.className = "card-deck spacer";
			flowersSection.appendChild(deck);
		}
		var card = document.createElement("div");
		card.className = "card";
		card.style = "width: 18rem;"
		var cardimg = document.createElement("img");
		cardimg.className="card-img-top";
		cardimg.src="flower.jpg";
		cardimg.alt="Card image cap";
		var cardbody = document.createElement("div");
		cardbody.className="card-body";
		var cardtitle = document.createElement("h5");
		cardtitle.className="card-title";
		cardtitle.innerHTML = flowers[i].COMNAME;
		var cardtext = document.createElement("p");
		cardtext.className="card-text";
		cardtext.innerHTML = flowers[i].GENUS + " " + flowers[i].SPECIES;
		var cardbutton = document.createElement("a");
		cardbutton.href="#";
		cardbutton.className="btn btn-primary";
		cardbutton.innerHTML = "PICK ME";
		card.appendChild(cardimg);
		card.appendChild(cardbody);
		cardbody.appendChild(cardtitle);
		cardbody.appendChild(cardtext);
		cardbody.appendChild(cardbutton);
		deck.appendChild(card);
	}
	if(flowers.length % 3 == 2) {
		var card = document.createElement("div");
		card.className = "card";
		card.style = "width: 18rem;"
		deck.appendChild(card);
	}
	if(flowers.length % 3 == 1) {
		var card = document.createElement("div");
		card.className = "card";
		card.style = "width: 18rem;"
		deck.appendChild(card);
	}
}