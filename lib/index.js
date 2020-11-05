// TODO: Write your JS code in here

const apiKey = "81848ad965067c2b4540dec3ab05eefe";
const form = document.querySelector("form");
const cityDisplay = document.querySelector(".city");
const dateDisplay = document.querySelector(".date");
const descDisplay = document.querySelector(".description");
const tempDisplay = document.querySelector(".temp");
const iconDisplay = document.querySelector(".weatherIcon");

const handleCityCall = (event) => {
  event.preventDefault();
  const input = form.querySelector("input").value;
  if (input !== "") {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${apiKey}`;

    fetch(url)
      .then(response => response.json())
      .then((data) => {
        const city = data.name;
        const description = data.weather[0].description;
        const kelvin = data.main.temp;
        const fahrenheit = Math.round((kelvin - 273.15) * 1.8 + 32);
        const myDate = new Date(data.dt * 1000);
        // dayOfWeek, month day, time
        // const country = data.sys.country;
        const options = {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          // timeZone: `${country}/${city}`,
        };
        console.log(data.sys.country);
        console.log(data);
        console.log(new Intl.DateTimeFormat("en-US", options).format(myDate));
        const formatDate = new Intl.DateTimeFormat("en-US", options).format(
          myDate
        );
        const icon = data.weather[0].icon;

        cityDisplay.textContent = `Weather in ${city}`;
        dateDisplay.textContent = formatDate;
        descDisplay.textContent = description;
        iconDisplay.innerHTML = `<img src=http://openweathermap.org/img/wn/${icon}@2x.png alt="">`;
        tempDisplay.textContent = `${fahrenheit}°`;
      });
  }
};

form.addEventListener("submit", handleCityCall);
