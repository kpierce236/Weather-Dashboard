//Search and Clear button elements
var searchBtn =$('.searchBtn');
var clearBtn =$('.clearBtn');
//openweather API key
var APIkey = "ab74206522f65109633d42c234243129";

//fetchs local storage buttons when page loads
$( document ).ready(function() {
  var local = Object.keys(localStorage);
   for (var i = 0; i < local.length; i++) {
    var key = localStorage.getItem(local[i]);
    if (localTest(local[i])) {
      $('.storedCities-container').append(key);
    } 
   }
});


//fetchs the latitude and longitude of the inputed city
var getCoords = function (city) {

    var apiUrl = 'https://api.openweathermap.org/geo/1.0/direct?q='+encodeURIComponent(city)+'&appid='+APIkey;

    fetch(apiUrl)
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            getCityWeather(data);
            addToLocal(city);
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      })

    };

//Click event that fetchs city coordinates when searched
searchBtn.click(function() {
  var cityVal = $('input').val();
  getCoords(cityVal)
});

//Takes the longitude and latitude of from the getCoords API of the serched city 
//    and fetchs the current weather data and five day weather data for that city
var getCityWeather =  function (data) {
 var lat= data[0].lat;
 var lon = data[0].lon;

 var currentUrl= "https://api.openweathermap.org/data/2.5/weather?units=imperial&lat="+lat+"&lon="+lon+"&appid="+APIkey;
 var fiveDayUrl= "https://api.openweathermap.org/data/3.0/onecall?units=imperial&lat="+lat+"&lon="+lon+"&appid="+APIkey;

 fetch(currentUrl)
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            displayTopWeather(data);
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      })

 fetch(fiveDayUrl)
      .then(function (response) {
        if(response.ok) {
          response.json().then(function (data) {
            displayFiveDays(data);
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      })

};

//Displays current weather data on the top of the dashboard
var displayTopWeather = function (data) {
  $(".cityInfo").html("");
  var name = data.name;
  var temp = data.main.temp;
  var windSpeed = data.wind.speed;
  var humidity = data.main.humidity;


  var date = dayjs().format('M/D/YYYY');
  var icon = data.weather[0].icon;
  var iconUrl = "https://openweathermap.org/img/wn/"+icon+"@2x.png";
  

  var content = "<h1>"+name+" ("+date+")"+"<img src='"+iconUrl+"'></h1><p>Temp: "+temp+"&degF</p><p>Wind: "+windSpeed+" MPH</p><p>Humidity: "+humidity+"%</p>";
  $(".cityInfo").append(content);
}
//Displays the five day forecast at the bottom of the weather dashboard
var displayFiveDays = function (data) {
 $(".card-container").html("");
  for (var i = 1; i < 6; i++) {
    var date = dayjs.unix(data.daily[i].dt).format('M/D/YYYY');
    var temp = data.daily[i].temp.day;
    var windSpeed = data.daily[i].wind_speed;
    var humidity = data.daily[i].humidity;
    var icon = data.daily[i].weather[0].icon;
    var iconUrl = "https://openweathermap.org/img/wn/"+icon+"@2x.png";

    var content = "<div class='card'><h2>"+date+"</h1><img src='"+iconUrl+"'><p>Temp: "+temp+"&degF</p><p>Wind: "+windSpeed+" MPH</p><p>Humidity: "+humidity+"%</p></div>";
    $(".card-container").append(content);
  }
}

//adds the searched city to local storage to access it again
var addToLocal = function (city) {
  if (matchCity(city)) {
    console.log("true");
  } else {
    localStorage.setItem(city, "<div class=cityBtn>"+city+"</div>");
    $('.storedCities-container').append("<div class=cityBtn>"+city+"</div>");
  }
}

//checks if the searched city matches any existing cities in local storage before posting
var matchCity = function(city) {
  var divArray = $('.cityBtn');
  var cityFound = false;

  divArray.each(function() {
    var divText = $(this).text(); 
    if (divText.toLowerCase() === city.toLowerCase()) {
      cityFound = true;
      return false 
    } 
});

  return cityFound;
}

//Checks for whether the local storage key connects with api
var localTest = function (city) {
  
  var apiUrl = 'http://api.openweathermap.org/geo/1.0/direct?q='+encodeURIComponent(city)+'&appid='+APIkey;

  return fetch(apiUrl)
  .then(function (response) {
    if (response.ok) {
      return response.json().then(function (data) {
        if (data.length === 0) {
          return false
          
        } else {
          return true
        }
      });
    } else {
      console.log(3);
      return false
    }
  })

  };

  //Local Sorage button click event
  $('.storedCities-container').on('click','div',function () {
    var city = $(this).text();
    getCoords(city);
  })

  //Clear Storage button click event
  clearBtn.click(function() {
    localStorage.clear()
    $('.storedCities-container').html("");
  })