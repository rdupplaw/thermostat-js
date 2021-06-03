'use strict'

class Thermostat {
  constructor () {
    this.temperature = 20
    this.powerSavingModeEnabled = true
  }

  up () {
    if (this.powerSavingModeEnabled) {
      if (this.temperature < 25) { this.temperature++ }
    } else {
      if (this.temperature < 32) { this.temperature++ }
    }
  }

  down () {
    if (this.temperature > 10) { this.temperature-- }
  }

  resetTemperature () {
    this.temperature = 20
  }

  disablePowerSavingMode () {
    this.powerSavingModeEnabled = false
  }

  enablePowerSavingMode () {
    this.powerSavingModeEnabled = true
  }

  get currentEnergyUsage () {
    return this.temperature < 18
      ? 'low-usage'
      : this.temperature <= 25
        ? 'medium-usage'
        : 'high-usage'
  }
}

module.exports = Thermostat
