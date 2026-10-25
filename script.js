const API_KEY = "c00297e05b8d7205d716942c55b8cfeb";

const form = document.getElementById("weatherForm");
const cityInput = document.getElementById("cityInput");
const message = document.getElementById("message");
const weatherCard = document.getElementById("weatherCard");

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const city = cityInput.value.trim();

    if (!city) {
        message.textContent = "Please enter a city name.";
        return;
    }

    if (API_KEY === "YOUR_API_KEY") {
        message.textContent = "Please add your API key.";
        return;
    }

    message.textContent = "Loading weather...";
    weatherCard.classList.add("hidden");

    try {
        const url =
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

        const response = await fetch(url);

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error("City not found. Try another city.");
            }

            if (response.status === 401) {
                throw new Error("Invalid API key. Check your key.");
            }

            throw new Error("Unable to fetch weather data.");
        }

        const data = await response.json();

        // Extract data from nested JSON
        document.getElementById("cityName").textContent =
            `${data.name}, ${data.sys.country}`;

        document.getElementById("temperature").textContent =
            `${Math.round(data.main.temp)}°C`;

        document.getElementById("description").textContent =
            data.weather[0].description;

        document.getElementById("humidity").textContent =
            `${data.main.humidity}%`;

        document.getElementById("wind").textContent =
            `${data.wind.speed} m/s`;

        document.getElementById("weatherIcon").src =
            `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

        weatherCard.classList.remove("hidden");
        message.textContent = "Weather updated successfully!";

    } catch (error) {
        message.textContent =
            error.message || "Network error. Please try again.";
    }
});