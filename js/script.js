const loadWeather = () => {
    const cityInput = document.getElementById('city-input');
    const city = cityInput.value;
    if (cityInput.value == '') {
        const weatherSection = document.getElementById('weather-section');  
        const div = document.createElement('div');
        div.classList.add('weather-status', 'text-white', 'text-center');
        div.innerHTML = '<h2>Please input a city name.</h2>';
        weatherSection.appendChild(div);
    }

    else {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8d0a3d039169fd05def41aef0c1b3e6f&units=metric`
        fetch(url)
            .then(response => response.json())
            .then(data => dispalyWeather(data));

        const weatherSection = document.getElementById('weather-section');
        weatherSection.innerHTML = '';
    }
}

const dispalyWeather = weather => {
    const weatherSection = document.getElementById('weather-section');
    const cityInput = document.getElementById('city-input');
    const city = cityInput.value;

    if (weather.cod == 404) {
        cityInput.value = '';
        const div = document.createElement('div');
        div.classList.add('weather-status', 'text-white', 'text-center');
        div.innerHTML = '<h2>Sorry, there is no city by this name. <br> Please type a valid city name.</h2>';
        weatherSection.appendChild(div);
    }

    else {
        const temp = weather.main.temp;
        const icon = weather.weather[0].icon;
        const lead = weather.weather[0].main;


        const div = document.createElement('div');
        div.classList.add('weather-status', 'text-white', 'text-center');
        div.innerHTML = `
        <img src="http://openweathermap.org/img/w/${icon}.png" alt="">
        <h1>${city}</h1>
        <h3><span>${temp}</span>&deg;C</h3>
        <h1 class="lead">${lead}</h1>
        `
        weatherSection.appendChild(div);
        cityInput.value = '';
    }

}
