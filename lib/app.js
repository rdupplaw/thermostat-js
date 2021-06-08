'use strict'

const Thermostat = require('./thermostat')

// Helper functions

const updateTemperature = () => {
  document.getElementById('temperature').innerHTML = thermostat.temperature
  document.getElementById('temperature').className = thermostat.currentEnergyUsage
}

const updatePowerSavingModeStatus = () => {
  document.getElementById('psm-status').innerHTML = thermostat.powerSavingModeEnabled ? 'Enabled' : 'Disabled'
}

const updateWeatherTemperature = (city) => {
  const url = new URL('https://api.openweathermap.org/data/2.5/weather')
  const appid = 'APP_ID'
  const params = { q: city, appid: appid, units: 'metric' }
  url.search = new URLSearchParams(params).toString()
  fetch(url)
    .then(response => response.json())
    .then(responseData => {
      document.getElementById('weather-temperature').innerHTML = responseData.main.temp
    })
}

// Initial page data setup

const thermostat = new Thermostat()
updateTemperature()
updatePowerSavingModeStatus()
updateWeatherTemperature('London')

// Event listeners

document.getElementById('city-form').addEventListener('submit', (event) => {
  event.preventDefault()
  const city = event.target.elements.city.value
  updateWeatherTemperature(city)
})

document.getElementById('temperature-up').addEventListener('click', () => {
  thermostat.up()
  updateTemperature()
})

document.getElementById('temperature-down').addEventListener('click', () => {
  thermostat.down()
  updateTemperature()
})

document.getElementById('temperature-reset').addEventListener('click', () => {
  thermostat.resetTemperature()
  updateTemperature()
})

document.getElementById('enable-psm').addEventListener('click', () => {
  thermostat.enablePowerSavingMode()
  updatePowerSavingModeStatus()
})

document.getElementById('disable-psm').addEventListener('click', () => {
  thermostat.disablePowerSavingMode()
  updatePowerSavingModeStatus()
})
