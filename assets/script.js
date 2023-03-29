var apiKey = "f7815e0c66f7fbe10bf92ac5a66f9787";
var lastSearch;
var savedCities;
var cities = [];

//localStorage display
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
renderCityInfo();

$("#search").on("click", function (event) {
	event.preventDefault();
	
	var city = $("#city-input").val();

	var query1 =
		"https://api.openweathermap.org/data/2.5/weather?q=" +
		city +
		"&appid=" +
		apiKey +
		"&units=imperial";

	
	$.ajax({
		url: query1,
		method: "GET",
	}).then(function (response) {
		console.log(response);
		//set lat to each search's response's coord and lat data
		lat = response.coord.lat;
		lon = response.coord.lon;

		//push responses to array for localStorage
		cities.push(city);
	
		localStorage.setItem("cities", JSON.stringify(cities));

		//make list
		var cityList = $("<li>");
		cityList.addClass("list-group-item city-item");
		cityList.text(response.name);
		cityList.attr("lat", response.coord.lat);
		cityList.attr("lon", response.coord.lon);
		$("#list-cities").prepend(cityList);

		//use prev location stats
		cityList.on("click", function () {
			lat = $(this).attr("lat");
			lon = $(this).attr("lon");
			renderCityName(response);
			renderCityByLoc(lat, lon);
		});
		renderCityName(response);
		renderCityByLoc(lat, lon);
	});
});

function renderCityInfo() {
	$("#list-citites").clear;
	var query1 =
		"https://api.openweathermap.org/data/2.5/weather?q=" +
		lastCity +
		"&appid=" +
		apiKey +
		"&units=imperial";

	$.ajax({
		url: query1,
		method: "GET",
	}).then(function (response) {
		console.log(response);
		lat = response.coord.lat;
		lon = response.coord.lon;

		renderCityName(response);
		renderCityByLoc(lat, lon);
	});
}

function renderCityName(response) {
	
	var currentDate = moment().format("L");
	
	$(".card-title").text(`${response.name} (${currentDate})`);
	var iconImg = $("<img>");
	var iconCode = response.weather[0].icon;
	var iconUrl = "https://openweathermap.org/img/wn/" + iconCode + ".png";
	iconImg.attr("src", iconUrl);
	$(".card-title").append(iconImg);
}


function renderCityByLoc(lat, lon) {
	var query2 =
	"https://api.openweathermap.org/data/2.5/weather?lat=" +
		lat +
		"&lon=" +
		lon +
		"&appid=" +
		apiKey +
		"&units=imperial";

	$.ajax({
		url: query2,
		method: "GET",
	}).then(function (response) {
		console.log(response);
		$("#temperature").text(`Temperature: ${response.main.temp} F`);
		$("#humidity").text(`Humidity: ${response.main.humidity}%`);
		$("#wind-speed").text(`Wind Speed: ${response.wind.speed} MPH`);

		for (var i = 0; i < days; i++) {
			$("#temperature").text(`Temperature: ${response.main.temp} F`);
			$("#humidity").text(`Humidity: ${response.main.humidity}%`);
			$("#wind-speed").text(`Wind Speed: ${response.wind.speed} MPH`);
		}
	
	});
}



