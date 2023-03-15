//api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}

var weatherKey = "7996605503241f352888cc4a4b202067";

//user input for city
var city;

//api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key} fetch by city name instead of lon/lat pts




//GIVEN a weather dashboard with form inputs
//WHEN I search for a city
//THEN I am presented with current and future conditions for that city and that city is added to the search history()
//WHEN I view current weather conditions for that city
//THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the the wind speed()
//WHEN I view future weather conditions for that city
//THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity()
//WHEN I click on a city in the search history
//THEN I am again presented with current and future conditions for that city()