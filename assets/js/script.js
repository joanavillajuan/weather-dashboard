var apiKey = "96afe7baabf498c617995a358459ddde";
 

function getWeather () { 

getCurrentWeather();
getFutureWeather();

// var city = document.getElementById("search-input").value; 

function getCurrentWeather() {

  // var city = "sydney"; // city default sydney
  
 var city = document.getElementById("search-input").value; 

  var apiCity = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(apiCity)
    .then((response) => response.json())
    .then((currentData) => {

      var currentCity = document.getElementById("current-city");
      var weatherIcon = document.getElementById("weather-icon");
      var temp = document.getElementById("temp");
      var humidity = document.getElementById("humidity");
      var windSpeed = document.getElementById("wind");

      // Date
      var unixDt = currentData.dt;
      var conDate = new Date(unixDt * 1000);
      var date = conDate.toLocaleDateString("en-GB");

      currentCity.innerHTML = currentData.name + " " + `(${date})`;
      weatherIcon.src = `https://openweathermap.org/img/wn/${currentData.weather[0].icon}@2x.png`;
      temp.innerHTML = currentData.main.temp + " " + "\xB0C.";
      humidity.innerHTML = currentData.main.humidity + " " + "%";
      windSpeed.innerHTML = currentData.wind.speed;

    })

   
    .catch((error) => {
      console.error("Error:", error);
    });
}

function getFutureWeather() {

  var city = document.getElementById("search-input").value; // city default sydney
 

  var apiForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  fetch(apiForecast)
    .then((response) => response.json())
    .then((future) => {

      var forecast = document.getElementById("forecast");

      for(var i=5; i < future.list.length; i=i+8)

      
      {

        console.log("working .   .   .    .     .     .     .     .     .")

        var day = future.list[i];

        var unixDt = day.dt;
        var conDate = new Date(unixDt * 1000);
        var date = conDate.toLocaleDateString("en-GB");
        var weatherIcon = `https://openweathermap.org/img/wn/${day.weather[0].icon}.png`;
   

        var forecastCard = document.createElement("div");
        forecastCard.setAttribute("class", "col-sm-2 bg-primary text-white m-2 rounded");
        forecast.append(forecastCard);

        var forecastDate = document.createElement("p");
        forecastDate.setAttribute("class", "font-weight-bold")
        forecastDate.style.textAlign = "center";
        forecastDate.innerHTML = date
        forecastCard.append(forecastDate);

        var forecastIcon = document.createElement("img");
        forecastIcon.setAttribute("src", weatherIcon)
        forecastIcon.setAttribute("alt", "weatherIcon")
        forecastCard.append(forecastIcon);

        var forecastTemp = document.createElement("p");
        forecastTemp.innerHTML = "Temp:" + " " + day.main.temp + " " + "\xB0C";
        forecastCard.append(forecastTemp);

        var forecastHumidity = document.createElement("p");
        forecastHumidity.innerHTML = "Humidity:" + " " + day.main.humidity;
        forecastCard.append(forecastHumidity);

        var forecastWind = document.createElement("p");
        forecastWind.innerHTML = "Wind: " + " " + day.wind.speed;
        forecastCard.append(forecastWind);
        
      }

      

    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
}





// function savedCity () {

//   var storedcities = [];

//   var newCity = document.getElementById('search-input').value;

//   storedcities.push(newCity);

//   localStorage.setItem("cities", storedcities );


// }

// function savedCity () {


//   // var newCity = document.getElementById('search-input').value;
//   //       // searchHistory.push(newCity);
//   //       localStorage.setItem("search", searchHistory);
//   //       renderSearch();

//   var newCity = document.getElementById('search-input').value;

//   // // console.log(storedcities);


//     localStorage.setItem('cities', newCity );

 


// }



function renderSearch () {

  document.getElementById('history').innerHTML = "";
  for (let i = 0; i < searchHistory.length; i++) {
      const historyItem = document.createElement("input");
      historyItem.setAttribute("type", "text");
      historyItem.setAttribute("readonly", true);
      historyItem.setAttribute("class", "form-control d-block bg-white m-1");
      historyItem.setAttribute("value", searchHistory[i]);
      historyItem.addEventListener("click", function () {
          getWeather(historyItem.value);
      })
      document.getElementById('history').append(historyItem);
  }

}


var searchHistory = JSON.parse(localStorage.getItem("search")) || [];
console.log(searchHistory);

document.getElementById('searchBtn').addEventListener('click', (event) => {
  event.preventDefault();

  var newCity = document.getElementById('search-input').value;
  getWeather(newCity);
  searchHistory.push(newCity);
  localStorage.setItem("search", JSON.stringify(searchHistory));
  renderSearch();
   
})

 // Clear History button
 document.getElementById('clearBtn').addEventListener("click", () => {
  localStorage.clear();
  searchHistory = [];
  renderSearch();
});