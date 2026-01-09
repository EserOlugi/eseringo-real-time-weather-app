const apiKey = "ed8770f7f04dfac462a74994d4621875";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&lang=tr&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon-main");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    
    if(response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        var data = await response.json();

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/s";

        // Hava durumuna göre ikon güncelleme
        if(data.weather[0].main == "Clouds") weatherIcon.className = "fas fa-cloud weather-icon-main";
        else if(data.weather[0].main == "Clear") weatherIcon.className = "fas fa-sun weather-icon-main";
        else if(data.weather[0].main == "Rain") weatherIcon.className = "fas fa-cloud-showers-heavy weather-icon-main";
        else if(data.weather[0].main == "Drizzle") weatherIcon.className = "fas fa-cloud-rain weather-icon-main";
        else if(data.weather[0].main == "Mist") weatherIcon.className = "fas fa-smog weather-icon-main";

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

// Varsayılan açılış
checkWeather("Istanbul");
