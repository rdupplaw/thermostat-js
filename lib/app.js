'use strict'

const Thermostat = require('./thermostat')
const thermostat = new Thermostat()

const updateTemperature = () => {
  document.getElementById('temperature').innerHTML = thermostat.temperature
  document.getElementById('temperature').className = thermostat.currentEnergyUsage
  document.getElementById('current-energy-usage').innerHTML = thermostat.currentEnergyUsage
}

const updatePowerSavingModeStatus = () => {
  document.getElementById('psm-status').innerHTML = thermostat.powerSavingModeEnabled
}

updateTemperature()
updatePowerSavingModeStatus()

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
