'use strict'

const Thermostat = require('../src/thermostat')

describe('Thermostat', () => {
  let thermostat

  beforeEach(() => { thermostat = new Thermostat() })

  it('has a default temperature of 20', () => {
    expect(thermostat.temperature).toBe(20)
  })

  it('temperature can be incremented', () => {
    thermostat.up()

    expect(thermostat.temperature).toBe(21)
  })

  it('temperature can be decremented', () => {
    thermostat.down()

    expect(thermostat.temperature).toBe(19)
  })

  it('temperature cannot go below 10', () => {
    for (let i = 0; i < 10; i++) {
      thermostat.down()
    }

    expect(thermostat.temperature).toBe(10)

    thermostat.down()

    expect(thermostat.temperature).toBe(10)
  })

  it('power saving mode is on by default', () => {
    expect(thermostat.powerSavingModeEnabled).toBe(true)
  })

  it('temperature can be reset to 20', () => {
    for (let i = 0; i < 5; i++) {
      thermostat.up()
    }

    expect(thermostat.temperature).toBe(25)

    thermostat.resetTemperature()

    expect(thermostat.temperature).toBe(20)
  })

  describe('when power saving mode is on', () => {
    it('temperature cannot exceed 25', () => {
      for (let i = 0; i < 5; i++) {
        thermostat.up()
      }

      expect(thermostat.temperature).toBe(25)

      thermostat.up()

      expect(thermostat.temperature).toBe(25)
    })
  })

  describe('when power saving mode is off', () => {
    beforeEach(() => { thermostat.disablePowerSavingMode() })

    it('temperature cannot exceed 32', () => {
      for (let i = 0; i < 12; i++) {
        thermostat.up()
      }

      expect(thermostat.temperature).toBe(32)

      thermostat.up()

      expect(thermostat.temperature).toBe(32)
    })

    it('power saving mode can be re-enabled', () => {
      expect(thermostat.powerSavingModeEnabled).toBe(false)
      thermostat.enablePowerSavingMode()

      expect(thermostat.powerSavingModeEnabled).toBe(true)
    })
  })

  describe('when the temperature is < 18', () => {
    it('energy usage is "low-usage"', () => {
      for (let i = 0; i < 3; i++) {
        thermostat.down()
      }

      expect(thermostat.temperature).toBe(17)
      expect(thermostat.currentEnergyUsage).toBe('low-usage')
    })
  })

  describe('when the temperature is <= 25', () => {
    it('energy usage is "medium-usage"', () => {
      for (let i = 0; i < 5; i++) {
        thermostat.up()
      }

      expect(thermostat.temperature).toBe(25)
      expect(thermostat.currentEnergyUsage).toBe('medium-usage')
    })
  })

  describe('when the temperature is > 25', () => {
    it('energy usage is "high-usage"', () => {
      thermostat.disablePowerSavingMode()
      for (let i = 0; i < 6; i++) {
        thermostat.up()
      }

      expect(thermostat.temperature).toBe(26)
      expect(thermostat.currentEnergyUsage).toBe('high-usage')
    })
  })
})
