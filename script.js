const apiKey = "9c42ecce43406cf9ce850dde5a498ba3";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&lang=tr&q=";

async function checkWeather(city) {
    // API isteği atarken hatayı yakalamak için try-catch ekleyelim
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        const data = await response.json();

        if (response.status == 401) {
            alert("API Anahtarı henüz aktif değil veya hatalı. Lütfen bir süre bekleyin.");
            return;
        }

        if (response.status == 404) {
            alert("Şehir bulunamadı!");
            return;
        }

        // Verileri ekrana basma
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/s";
        
        // Konsola yazdır ki verinin geldiğini görelim
        console.log(data);

    } catch (error) {
        console.log("Hata oluştu:", error);
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});
// Arama butonuna basıldığında boş değer gitmesini engellemek için:
searchBtn.addEventListener("click", () => {
    if (searchBox.value.trim() !== "") {
        checkWeather(searchBox.value);
    } else {
        alert("Lütfen bir şehir ismi girin");
    }
});