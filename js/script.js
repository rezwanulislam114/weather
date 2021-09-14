const loadWeather = () => {
    const cityInput = document.getElementById('city-input');
    const city = cityInput.value;
    const weatherSection = document.getElementById('weather-section'); 
    weatherSection.textContent = '';

    // conditon for search empty 
    if (cityInput.value == '') { 
        const div = document.createElement('div');
        div.classList.add('weather-status', 'text-white', 'text-center');
        div.innerHTML = '<h2>Please input a city name.</h2>';
        weatherSection.appendChild(div);
    }

    // call api
    else {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8d0a3d039169fd05def41aef0c1b3e6f&units=metric`
        fetch(url)
            .then(response => response.json())
            .then(data => dispalyWeather(data));
    }

    // seach input clear 
    cityInput.value = '';
}


// show weather update in ui 

const dispalyWeather = weather => {
    const weatherSection = document.getElementById('weather-section');
    const div = document.createElement('div');
    div.classList.add('weather-status', 'text-white', 'text-center');

    // conditon when city is not found 
    if (weather.cod == 404) {
        div.innerHTML = '<h2>Sorry, there is no city by this name. <br> Please type a valid city name.</h2>';
        weatherSection.appendChild(div);
    }

    // ui design and update 
    else {
        const temp = weather.main.temp;
        const icon = weather.weather[0].icon;
        const lead = weather.weather[0].main;
        const cityName = weather.name;

        div.innerHTML = `
        <img src="http://openweathermap.org/img/w/${icon}.png" alt="">
        <h1>${cityName}</h1>
        <h3><span>${temp}</span>&deg;C</h3>
        <h1 class="lead">${lead}</h1>
        `
        weatherSection.appendChild(div);
    }

}
