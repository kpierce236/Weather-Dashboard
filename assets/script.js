var searchBtn =$('.searchBtn');
var clearBtn =$('.clearBtn');
var APIkey = "ab74206522f65109633d42c234243129";

$( document ).ready(function() {
  var local = Object.keys(localStorage);
   for (var i = 0; i < local.length; i++) {
    var key = localStorage.getItem(local[i]);
    if (localTest(local[i])) {
      $('.storedCities-container').append(key);
    } 
   }
});


//fetch lat and long of city
var getCoords = function (city) {
    

    var apiUrl = 'http://api.openweathermap.org/geo/1.0/direct?q='+encodeURIComponent(city)+'&appid='+APIkey;

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

searchBtn.click(function() {
  var cityVal = $('input').val();
  getCoords(cityVal)
});

//fetch weather data 
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

//display weather on top dashboard

var displayTopWeather = function (data) {
  $(".cityInfo").html("");
  var name = data.name;
  var temp = data.main.temp;
  var windSpeed = data.wind.speed;
  var humidity = data.main.humidity;
  //add date and wether emoji condtional
  var date = dayjs().format('M/D/YYYY');
  var icon = data.weather[0].icon;
  var iconUrl = "https://openweathermap.org/img/wn/"+icon+"@2x.png";
  

  var content = "<h1>"+name+" ("+date+")"+"<img src='"+iconUrl+"'></h1><p>Temp: "+temp+"&degF</p><p>Wind: "+windSpeed+" MPH</p><p>Humidity: "+humidity+"%</p>";
  $(".cityInfo").append(content);
}

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

var addToLocal = function (city) {
  if (matchCity(city)) {
    console.log("true");
  } else {
    localStorage.setItem(city, "<div class=cityBtn>"+city+"</div>");
    $('.storedCities-container').append("<div class=cityBtn>"+city+"</div>");
  }
}

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
  //cityBtn click event
  $('.storedCities-container').on('click','div',function () {
    var city = $(this).text();
    getCoords(city);
  })

  //clear storage
  clearBtn.click(function() {
    localStorage.clear()
    $('.storedCities-container').html("");
  })