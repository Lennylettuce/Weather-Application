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

$("#search-city").on("click", function (event) {
	event.preventDefault();
	
	var city = $("#city-input").val();
	console.log(city);

	var query1 =
		"https://api.openweathermap.org/data/2.5/weather?q=" +
		city +
		"&appid=" +
		APIKey;

	
	$.ajax({
		url: query1,
		method: "GET",
	}).then(function (response) {
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
		APIKey;

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
	var iconUrl = "http://openweathermap.org/img/wn/" + iconCode + ".png";
	iconImg.attr("src", iconUrl);
	$(".card-title").append(iconImg);
}


function renderCityByLoc(lat, lon) {
	var query2 =
		"https://api.openweathermap.org/data/2.5/onecall?lat=" +
		lat +
		"&lon=" +
		lon +
		"&units=imperial&appid=" +
		APIKey;

	$.ajax({
		url: query2,
		method: "GET",
	}).then(function (response) {
		
		$("#temperature").text(`Temperature: ${response.current.temp} \xB0F`);
		$("#humidity").text(`Humidity: ${response.current.humidity}%`);
		$("#wind-speed").text(`Wind Speed: ${response.current.wind_speed} MPH`);

		renderForecastCards(response);
	});
}

function renderForecastCards(response) {
	$("#forecast-cards").empty();
	
	var dayCardInfo = response.daily;
	
	dayCardInfo.slice(1, 6).map((day) => {
		var dayCards = $("<div>");
		dayCards.addClass("card col-md-4 daycard");
		dayCards.css("background-color", "white");
		dayCards.css("margin-right", "5px");
		dayCards.css("font-size", "15px");

		var cardBody = $("<div>");
		cardBody.addClass("card-body");
		dayCards.append(cardBody);

		var cardName = $("<h6>");
		cardName.addClass("card-title");
		var datestamp = moment.unix(day.dt);
		var forecastDate = datestamp.format("L");
		cardName.text(forecastDate);
		cardBody.append(cardName);

		var iconImg = $("<img>");
		var iconCode = day.weather[0].icon;
		var iconUrl = "http://openweathermap.org/img/wn/" + iconCode + ".png";
		iconImg.attr("src", iconUrl);
		cardBody.append(iconImg);

		var temp = $("<p>");
		temp.text(`Temp: ${day.temp.max} \xB0F`);
		cardBody.append(temp);

		var humidity = $("<p>");
		humidity.text(`Humidity: ${day.humidity}%`);
		cardBody.append(humidity);

		$("#forecast-cards").append(dayCards);
	});
}