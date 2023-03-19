var APIKey = "82faa98034ea8ecbf01993a2cd1d2848";
var lastSearch;
var savedCities;
var cities = [];


if (localStorage.getItem("cities")) {
	savedCities = JSON.parse(localStorage.getItem("cities"));
	console.log(savedCities);
	for (var i = 0; i < savedCities.length; i++) {
		lastSearch = savedCities.length - 1;
		var lastCity = savedCities[lastSearch];
	}
} else {
	cities;
}
renderCityInfo();2
console.log("cities", cities);

