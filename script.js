const weather = {
    apiKey: "55e94c8d303ac68b469d46fc98398d4a",
    fetchWeather: function (city) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("No weather found.");
          }
          return response.json();
        })
        .then((data) => this.displayWeather(data))
        .catch((error) => {
          console.error("Error fetching weather data:", error);
          this.displayLoadingError();
        });
    },
    displayWeather: function (data) {
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { temp, humidity } = data.main;
      const { speed } = data.wind;
  
      document.querySelector(".city").innerText = "Weather in " + name;
      document.querySelector(".icon").src =
        `https://openweathermap.org/img/wn/${icon}.png`;
      document.querySelector(".description").innerText = description;
      document.querySelector(".temp").innerText = temp + "°C";
      document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
      document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/h";
      document.querySelector(".weather").classList.remove("loading");
      document.body.style.backgroundImage =
        `url('https://source.unsplash.com/1600x900/?${name}')`;
    },
    displayLoadingError: function() {
      document.querySelector(".city").innerText = "Weather data not found";
      document.querySelector(".temp").innerText = "--°C";
      document.querySelector(".icon").src = "";
      document.querySelector(".description").innerText = "";
      document.querySelector(".humidity").innerText = "Humidity: --%";
      document.querySelector(".wind").innerText = "Wind speed: -- km/h";
      document.querySelector(".weather").classList.remove("loading");
    },
    search: function () {
      const searchBar = document.querySelector(".search-bar");
      if (searchBar.value) {
        document.querySelector(".weather").classList.add("loading");
        this.fetchWeather(searchBar.value);
      }
    },
};

document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        weather.search();
    }
});
