//api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key} fetch by city name instead of lon/lat pts

//build query function

function buildQuery(){
    var query = "https://api.openweathermap.org/data/2.5/forecast?cnt=5&units=imperial&";
    
    var weatherKey = {"appid": "7996605503241f352888cc4a4b202067"};

    //get user input from id city and put it in the request query
    weatherKey.q = $("#city")
        .val()
        .toLowerCase()
        .trim();
    return query + $.param(weatherKey);
    
}

//build forecast days functions
    //append page

function pageInfo(cityData){

    var icon1 = 
        "https://openweathermap.org/img/wn/" + cityData.list[0].weather[0].icon + "@2px.png";
    var cityName = cityData.city.name;
    var dateEpochts = cityData.list[0].dt * 1000;
    var date = new Date(dateEpochts);
    var month = date.getMonth() + 1;
    var day = date.getDate()
    var year = date.getFullYear();
    var todayDate = "(" + month + "/" + day "/" + year + ")";

    var icon1 = $("#icon1").attr({
        src: icon1,
        alt: cityData.list[0].weather[0].description,
    }); 
    
    $("h3").text(cityName + " " + todayDate);
    $(".temp").text("Temperature " + cityData.list[0].main.temp + "°");
    $(".humidity").text("Humidity " + cityData.list[0].main.humidity + "%");
    $(".wind").text("Wind speed: " + cityData.list[0].wind.speed + "mph");
    $("h3").append(icon1);

    //set 

    var icon2 = 
        "https://openweathermap.org/img/wn/" + cityData.list[1].weather[0].icon + "@2px.png";

    var dateEpochts4 = cityData.list[1].dt * 1000;
    var date2 = new Date(dateEpochts2);
    var month2 = date2.getMonth() + 1;
    var day2 = date2.getDate();
    var todayDate2 = month2 + "/" + day2 + "/" + year;

    $("#icon2").attr({
        src: icon2,
        alt: cityData.list[1].weather[0].description,
    });

    $("#day2").text(todayDate2);
    $("#temp2").text("Temp: " + cityData.list[1].main.temp + "°");
    $("#humidity2").text("Humidity " + cityData.list[1].main.humidity + "%");
    $("#wind2").text("Wind speed: " + cityData.list[1].wind.speed + "mph");

    var icon3 = 
    "https://openweathermap.org/img/wn/" + cityData.list[2].weather[0].icon + "@2px.png";

    var dateEpochts3 = cityData.list[2].dt * 1000;
    var date3 = new Date(dateEpochts3);
    var month3 = date3.getMonth() + 1;
    var day3 = date3.getDate();
    var todayDate3 = month3 + "/" + day3 + "/" + year;

    $("#icon3").attr({
        src: icon3,
        alt: cityData.list[2].weather[0].description,
    });

    $("#day3").text(todayDate3);
    $("#temp3").text("Temp: " + cityData.list[2].main.temp + "°");
    $("#humidity3").text("Humidity " + cityData.list[2].main.humidity + "%");
    $("#wind3").text("Wind speed: " + cityData.list[2].wind.speed + "mph"); 

    var icon4 = 
    "https://openweathermap.org/img/wn/" + cityData.list[3].weather[0].icon + "@2px.png";

    var dateEpochts4 = cityData.list[3].dt * 1000;
    var date4 = new Date(dateEpochts4);
    var month4 = date4.getMonth() + 1;
    var day4 = date4.getDate();
    var todayDate4 = month4 + "/" + day4 + "/" + year;

    $("#icon4").attr({
        src: icon4,
        alt: cityData.list[3].weather[0].description,
    });

    $("#day4").text(todayDate4);
    $("#temp4").text("Temp: " + cityData.list[3].main.temp + "°");
    $("#humidity4").text("Humidity " + cityData.list[3].main.humidity + "%");
    $("#wind4").text("Wind speed: " + cityData.list[3].wind.speed + "mph");

    var icon5 = 
    "https://openweathermap.org/img/wn/" + cityData.list[4].weather[0].icon + "@2px.png";

    var dateEpochts5 = cityData.list[4].dt * 1000;
    var date5 = new Date(dateEpochts5);
    var month5 = date5.getMonth() + 1;
    var day5 = date5.getDate();
    var todayDate5 = month5 + "/" + day5 + "/" + year;

    $("#icon5").attr({
        src: icon5,
        alt: cityData.list[4].weather[0].description,
    });

    $("#day5").text(todayDate5);
    $("#temp5").text("Temp: " + cityData.list[4].main.temp + "°");
    $("#humidity5").text("Humidity " + cityData.list[4].main.humidity + "%");
    $("#wind5").text("Wind speed: " + cityData.list[4].wind.speed + "mph");

};


//event handlers
$("#searchBtn").on("click", function (event) {
    event.preventDefault();

    var userCity = $("#city").val();
    var makeList = $("<li>").addClass("list-group-city");
    $("#searchedCities").prepend(makeList);
    makeList.text(userCity);

    $("#display").css("visibility", "visible");

    var callQuery = buildQuery();

    $.ajax({
        url: callQuery,
        method: "GET"
    }).then(pageInfo);

});

//GIVEN a weather dashboard with form inputs
//WHEN I search for a city
//THEN I am presented with current and future conditions for that city and that city is added to the search history()
//WHEN I view current weather conditions for that city
//THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the the wind speed()
//WHEN I view future weather conditions for that city
//THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity()
//WHEN I click on a city in the search history
//THEN I am again presented with current and future conditions for that city()