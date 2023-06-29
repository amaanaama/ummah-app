// Get references to the input fields and submit button
const cityInput = document.getElementById('cityInput');
const countryInput = document.getElementById('countryInput');
const submitBtn = document.getElementById('submitBtn');
const prayerTimesContainer = document.getElementById('prayerTimesContainer');

// Function to fetch prayer times data
function fetchPrayerTimes() {
  const city = cityInput.value;
  const country = countryInput.value;
  const method = 2;

  const url = `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=${method}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      // Access the prayer times data from the response
      const prayerTimes = data.data.timings;

      // Display the prayer times in the container
      displayPrayerTimes(prayerTimes);
    })
    .catch(error => {
      console.error('Error fetching prayer times:', error);
    });
}

// Function to display the prayer times in the container
function displayPrayerTimes(prayerTimes) {
  // Clear previous prayer times
  prayerTimesContainer.innerHTML = '';

  const selectedPrayers = {
    Fajr: prayerTimes.Fajr,
    Dhuhr: prayerTimes.Dhuhr,
    Asr: prayerTimes.Asr,
    Maghrib: prayerTimes.Maghrib,
    Isha: prayerTimes.Isha
  };

  // Create a list of prayer times
  const prayerTimesList = document.createElement('ul');

  // Iterate over the prayer times and create list items
  for (const prayer in selectedPrayers) {
    const prayerTime = selectedPrayers[prayer];
    const listItem = document.createElement('li');
    listItem.textContent = `${prayer}: ${prayerTime}`;
    prayerTimesList.appendChild(listItem);
  }

  // Append the list to the container
  prayerTimesContainer.appendChild(prayerTimesList);
}

// Add a click event listener to the submit button
submitBtn.addEventListener('click', fetchPrayerTimes);


//Weather API Key
const weatherAPI = 'db62a041f75146f89d4152610232906'

// Function to fetch weather data
function fetchWeather() {
  const city = cityInput.value;
  const country = countryInput.value;

  const url = `https://api.weatherapi.com/v1/current.json?key=${weatherAPI}&q=${city},${country}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      // Access the weather data from the response
      const weather = data.current;

      // Display the weather in the container
      displayWeather(weather);
    })
    .catch(error => {
      console.error('Error fetching weather:', error);
    });
}

// Function to display the weather in the container
function displayWeather(weather) {
  const weatherContainer = document.getElementById('weatherContainer');
  weatherContainer.innerHTML = 'Temperature: ${weather.temp_c}°C Condition: ${weather.condition.text}';
}

submitBtn.addEventListener('click', fetchWeather);