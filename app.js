window.onload = () => {
  'use strict';

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('./SW.js');
  };


  const search = document.getElementById("type");
  const result = document.getElementById("humidity");
  const button = document.getElementById("btn");
  const city = document.querySelector('.city');
  const time = document.querySelector('.date');

  //to render to the DOM when the search button is clicked
  button.addEventListener("click", getWeather);


  //fetching API

  async function getWeather(e) {
    if (search.value) {
      let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q= ${search.value}&APPID=8cdf4a846298f429f6c3539fb4e0392e`);
      let data = await response.json()

      //temperature conversion
      let tempe = data.main.temp;
      let temperature = Math.round(parseFloat(tempe - 273.15));
      let celcius = temperature;
      let f = (Math.round((celcius * 9) / 5) + 32);

      //dates
      const today = new Date();
      const year = today.getFullYear();
      const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November'];

      const day = today.getDate();
      const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

      let weekDay = week[today.getDay()];
      let months = month[today.getMonth()];

      time.innerHTML = `${weekDay}    ${day} ${months}   ${year}`;


      let img = "<img src='https://openweathermap.org/img/w/" + data.weather[0].icon + ".png' alt='Icon depicting current weather.'>";

      city.innerHTML = search.value + '<sup>' + data.sys.country + '</sup>' + ' ' + 'weather report';

      //the outputs that would be rendered to the DOM from API

      result.innerHTML = `
                <div class="current">
                <div class="img">${img} </div>
            
                <div class="temp">${temperature}<span>°C</span></div>
                <div class="weather">${data.weather[0].description}</div>
                <div class="hi-low">${parseFloat(f)}°F ~  ${temperature} °C</div>      
                   </div>  `  ;

      //Storage to the LocalStorage
      localStorage.setItem('City', search.value);
      localStorage.setItem('Temperature', temperature);



      search.value = "";
      e.preventDefault;
    }
  }
};

