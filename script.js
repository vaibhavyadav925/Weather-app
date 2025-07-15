document.addEventListener("DOMContentLoaded", () => {
  const API_KEY = "0d658c0f2c0247e3a6c81101252206" // Your API key
  const BASE_URL = "http://api.weatherapi.com/v1"

  const locationInput = document.getElementById("location-input")
  const searchButton = document.getElementById("search-button")
  const loadingState = document.getElementById("loading-state")
  const weatherContent = document.getElementById("weather-content")

  const locationName = document.getElementById("location-name")
  const weatherCondition = document.getElementById("weather-condition")
  const temperatureSpan = document.getElementById("temperature")
  const weatherIcon = document.getElementById("weather-icon")
  const feelsLikeTempSpan = document.getElementById("feels-like-temp")
  const windSpeedSpan = document.getElementById("wind-speed")
  const humiditySpan = document.getElementById("humidity")
  const pressureSpan = document.getElementById("pressure")
  const visibilitySpan = document.getElementById("visibility")

  const fetchWeatherData = async (location) => {
    loadingState.style.display = "block"
    weatherContent.style.display = "none"

    try {
      const response = await fetch(`${BASE_URL}/current.json?key=${API_KEY}&q=${location}&aqi=yes`)
      const data = await response.json()

      if (response.ok) {
        updateWeatherUI(data)
      } else {
        console.error("Weather API error:", data.error.message)
        loadingState.textContent = `Error: ${data.error.message}`
        clearWeatherUI()
      }
    } catch (error) {
      console.error("Failed to fetch weather data:", error)
      loadingState.textContent = "Failed to fetch weather data. Please check your internet connection or try again."
      clearWeatherUI()
    } finally {
      loadingState.style.display = "none"
      weatherContent.style.display = "flex"
    }
  }

  const updateWeatherUI = (data) => {
    const { current, location } = data

    locationName.textContent = location.name
    weatherCondition.textContent = current.condition.text
    temperatureSpan.textContent = `${current.temp_c}°`
    weatherIcon.src = `https:${current.condition.icon}`
    weatherIcon.alt = current.condition.text
    feelsLikeTempSpan.textContent = `${current.feelslike_c}`

    windSpeedSpan.textContent = `${current.wind_kph} km/h`
    humiditySpan.textContent = `${current.humidity} %`
    pressureSpan.textContent = `${current.pressure_mb} hPa`
    visibilitySpan.textContent = `${current.vis_km} km`
  }

  const clearWeatherUI = () => {
    locationName.textContent = "--"
    weatherCondition.textContent = "--"
    temperatureSpan.textContent = "--"
    weatherIcon.src = "/placeholder.svg?height=80&width=80"
    weatherIcon.alt = "Weather Icon"
    feelsLikeTempSpan.textContent = "--"
    windSpeedSpan.textContent = "-- km/h"
    humiditySpan.textContent = "-- %"
    pressureSpan.textContent = "-- hPa"
    visibilitySpan.textContent = "-- km"
  }

  // Initial fetch for London when the page loads
  fetchWeatherData(locationInput.value)

  // Event listener for search button
  searchButton.addEventListener("click", () => {
    const location = locationInput.value.trim()
    if (location) {
      fetchWeatherData(location)
    } else {
      alert("Please enter a location.")
    }
  })

  // Allow searching by pressing Enter key
  locationInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      searchButton.click()
    }
  })
})
