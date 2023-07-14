// Get references to the input fields and submit button
const cityInput = document.getElementById('cityInput');
const countryInput = document.getElementById('countryInput');
const submitBtn = document.getElementById('submitBtn');
const locationHeader = document.getElementById("locationHeader");
var prayerTimesContainer = document.getElementById('prayerTimesContainer');
var weatherContainer = document.getElementById('weatherContainer');
var timeContainer = document.getElementById('timeContainer');

prayerTimesContainer.style.display = 'none';
weatherContainer.style.display = 'none';
timeContainer.style.display = 'none';

prayerTimesContainer.classList.add('show');
weatherContainer.classList.add('show');
timeContainer.classList.add('show');

// Add an event listener to the submit button
document.getElementById("submitBtn").addEventListener("click", updateLocationHeader);

// Function to update the location header with the user input
function updateLocationHeader() {
    const city = cityInput.value;
    const country = countryInput.value;
    locationHeader.textContent = city + ", " + country;
}

function fetchPrayerTimes() {
  const city = cityInput.value;
  const country = countryInput.value;
  const method = 2;

  const url = `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=${method}`;

  prayerTimesContainer.style.display = 'block';
  weatherContainer.style.display = 'block';
  timeContainer.style.display = 'block';
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
    const formattedTime = formatTime(prayerTime);
    const listItem = document.createElement('li');
    listItem.textContent = `${prayer}: ${formattedTime}`;
    prayerTimesList.appendChild(listItem);
  }

  // Append the list to the container
  prayerTimesContainer.appendChild(prayerTimesList);
}

// Function to format the time from 24-hour to 12-hour format
function formatTime(time) {
  const [hours, minutes] = time.split(':');
  let formattedHours = parseInt(hours);
  let period = 'AM';

  if (formattedHours >= 12) {
    formattedHours -= 12;
    period = 'PM';
  }

  if (formattedHours === 0) {
    formattedHours = 12;
  }

  return `${formattedHours}:${minutes} ${period}`;
}

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
  weatherContainer.innerHTML = `The temperature is <br> ${weather.temp_c}°C<br> and the condition is <br>${weather.condition.text}`;
}

submitBtn.addEventListener('click', fetchWeather);

function fetchCurrentTime(){
  const city = cityInput.value;
  const country = countryInput.value;
  const method = 2;

  const urlAladhan = `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=${method}`;

  fetch(urlAladhan)
    .then(response => response.json())
    .then(data => {
      // Access the prayer times data from the response
      const zone = data.data.meta;

      // Display the prayer times in the container
      displayCurrentTime(zone);
    })
    .catch(error => {
      console.error('Error fetching prayer times:', error);
    });

}

function displayCurrentTime(zone){
  const date = new Date();

  const options = {
    hour: 'numeric',
    minute: 'numeric',
    timeZone: zone.timezone
  };
  const time = new Intl.DateTimeFormat('en-US', options).format(date);
  const currentTimeContainer = document.getElementById('timeContainer');
  currentTimeContainer.innerHTML = `The time is <br>${time}`;
}

submitBtn.addEventListener('click', fetchCurrentTime);


